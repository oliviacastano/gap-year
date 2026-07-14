import { loadOverlay, saveOverlay, makeId } from './storage';
import { activityStorageKey, mergeActivities, type ActivitySeed, type DayPlanOverlay } from './activity-merge';

interface BudgetLineItemSeed {
  id: string;
  label: string;
  amountCHF: number | null;
  note?: string;
}

interface BudgetCategorySeed {
  id: string;
  label: string;
  items: BudgetLineItemSeed[];
}

interface StationActivitySeed {
  slug: string;
  name: string;
  activities: ActivitySeed[];
}

/** The 'aktivitaeten' category sources its line items dynamically instead of from a static seed. */
const DYNAMIC_ACTIVITY_CATEGORY = 'aktivitaeten';

interface BudgetCategoryOverlay {
  overrides: Record<string, { amountCHF?: number | null; deleted?: boolean }>;
  custom: Array<{ id: string; label: string; amountCHF: number | null }>;
}

interface BudgetOverlay {
  categories: Record<string, BudgetCategoryOverlay>;
}

const STORAGE_KEY = 'bali-trip:v1:budget';

function formatCHF(amount: number): string {
  return `CHF ${amount.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

class BudgetTableIsland extends HTMLElement {
  connectedCallback() {
    const seedScript = this.querySelector<HTMLScriptElement>('script[data-seed]');
    const categories: BudgetCategorySeed[] = seedScript ? JSON.parse(seedScript.textContent || '[]') : [];

    const stationsSeedScript = this.querySelector<HTMLScriptElement>('script[data-stations-seed]');
    const stationsSeed: StationActivitySeed[] = stationsSeedScript
      ? JSON.parse(stationsSeedScript.textContent || '[]')
      : [];

    const overlay = loadOverlay<BudgetOverlay>(STORAGE_KEY, { categories: {} });
    const persist = () => saveOverlay(STORAGE_KEY, overlay);

    const catOverlay = (catId: string): BudgetCategoryOverlay => {
      if (!overlay.categories[catId]) overlay.categories[catId] = { overrides: {}, custom: [] };
      return overlay.categories[catId];
    };

    /** Activities actually scheduled onto a day (any station) — these become editable budget line items. */
    const scheduledActivityItems = (): BudgetLineItemSeed[] => {
      const items: BudgetLineItemSeed[] = [];
      for (const station of stationsSeed) {
        const activityOverlay = loadOverlay<DayPlanOverlay>(activityStorageKey(station.slug), {
          overrides: {},
          custom: [],
        });
        for (const activity of mergeActivities(station.activities, activityOverlay)) {
          if (activity.day === null || activity.day === undefined) continue;
          items.push({
            id: activity.id,
            label: `${activity.label} — ${station.name}, Tag ${activity.day}`,
            amountCHF: null,
          });
        }
      }
      return items;
    };

    const resolveItems = (catId: string): BudgetLineItemSeed[] =>
      catId === DYNAMIC_ACTIVITY_CATEGORY
        ? scheduledActivityItems()
        : (categories.find((c) => c.id === catId)?.items ?? []);

    const totalEl = this.querySelector<HTMLElement>('[data-total]');
    const openEl = this.querySelector<HTMLElement>('[data-open]');

    const categorySum = (catId: string): number => {
      const co = catOverlay(catId);
      let sum = 0;
      for (const item of resolveItems(catId)) {
        if (co.overrides[item.id]?.deleted) continue;
        const amount = co.overrides[item.id]?.amountCHF !== undefined ? co.overrides[item.id].amountCHF : item.amountCHF;
        if (amount) sum += amount;
      }
      for (const item of co.custom) {
        if (item.amountCHF) sum += item.amountCHF;
      }
      return sum;
    };

    const renderTotal = () => {
      let sum = 0;
      let openCount = 0;
      for (const cat of categories) {
        const co = catOverlay(cat.id);
        for (const item of resolveItems(cat.id)) {
          if (co.overrides[item.id]?.deleted) continue;
          const amount = co.overrides[item.id]?.amountCHF !== undefined ? co.overrides[item.id].amountCHF : item.amountCHF;
          if (amount === null || amount === undefined) openCount += 1;
          else sum += amount;
        }
        for (const item of co.custom) {
          if (item.amountCHF === null) openCount += 1;
          else sum += item.amountCHF;
        }
      }
      if (totalEl) totalEl.textContent = formatCHF(sum);
      if (openEl) openEl.textContent = openCount > 0 ? `+ ${openCount} Posten noch offen` : 'Alle Posten beziffert';

      const target = Number(this.dataset.budgetTarget) || 0;
      const travelers = Number(this.dataset.travelers) || 1;
      const targetPercentEl = this.querySelector<HTMLElement>('[data-target-percent]');
      const targetPerPersonEl = this.querySelector<HTMLElement>('[data-target-per-person]');
      const targetPct = target > 0 ? Math.round((sum / target) * 100) : 0;
      const isOverTarget = sum > target;
      if (targetPercentEl) {
        targetPercentEl.textContent = `${targetPct}%`;
        targetPercentEl.classList.toggle('is-over-target', isOverTarget);
      }
      if (targetPerPersonEl) {
        targetPerPersonEl.textContent = `${formatCHF(sum / travelers)}`;
        targetPerPersonEl.classList.toggle('is-over-target', isOverTarget);
      }

      // Bar segments show each category's share of the target budget, not of the amount
      // spent so far — so the filled portion of the bar always reads as "how much of our
      // goal is used", and the empty track is remaining headroom.
      for (const cat of categories) {
        const catSum = categorySum(cat.id);
        const subtotalEl = this.querySelector<HTMLElement>(`[data-subtotal="${cat.id}"]`);
        if (subtotalEl) subtotalEl.textContent = formatCHF(catSum);
        const legendEl = this.querySelector<HTMLElement>(`[data-legend-amount="${cat.id}"]`);
        if (legendEl) legendEl.textContent = formatCHF(catSum);
        const segmentEl = this.querySelector<HTMLElement>(`[data-segment="${cat.id}"]`);
        if (segmentEl) segmentEl.style.width = target > 0 && catSum > 0 ? `${Math.max((catSum / target) * 100, 1)}%` : '0%';
      }
    };

    const renderCategory = (catId: string) => {
      const list = this.querySelector<HTMLUListElement>(`[data-category="${catId}"]`);
      if (!list) return;
      list.innerHTML = '';
      const co = catOverlay(catId);

      const rows: Array<{ id: string; label: string; note?: string; amountCHF: number | null; custom: boolean }> = [];
      for (const item of resolveItems(catId)) {
        if (co.overrides[item.id]?.deleted) continue;
        const amountCHF = co.overrides[item.id]?.amountCHF !== undefined ? co.overrides[item.id].amountCHF! : item.amountCHF;
        rows.push({ id: item.id, label: item.label, note: item.note, amountCHF, custom: false });
      }
      for (const item of co.custom) {
        rows.push({ id: item.id, label: item.label, amountCHF: item.amountCHF, custom: true });
      }

      if (rows.length === 0 && catId === DYNAMIC_ACTIVITY_CATEGORY) {
        const empty = document.createElement('p');
        empty.className = 'budget-empty-hint';
        empty.textContent = 'Noch keine Aktivität einem Tag zugewiesen — plant welche im Tagesplan einer Station ein.';
        list.appendChild(empty);
      }

      for (const row of rows) {
        const li = document.createElement('li');
        li.className = 'budget-row';

        const info = document.createElement('div');
        info.className = 'budget-row-info';
        const name = document.createElement('span');
        name.className = 'budget-row-name';
        name.textContent = row.label;
        info.appendChild(name);
        if (row.note) {
          const note = document.createElement('span');
          note.className = 'budget-note';
          note.textContent = row.note;
          info.appendChild(note);
        }

        const amountWrap = document.createElement('div');
        amountWrap.className = 'budget-row-amount';
        const currency = document.createElement('span');
        currency.className = 'budget-currency';
        currency.textContent = 'CHF';
        const input = document.createElement('input');
        input.type = 'number';
        input.step = '0.01';
        input.placeholder = '0.00';
        input.setAttribute('aria-label', `Betrag für ${row.label}`);
        if (row.amountCHF !== null) input.value = String(row.amountCHF);
        amountWrap.append(currency, input);

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'budget-remove';
        removeBtn.setAttribute('aria-label', `${row.label} entfernen`);
        removeBtn.textContent = '×';

        li.append(info, amountWrap, removeBtn);
        list.appendChild(li);

        input.addEventListener('input', () => {
          const value = input.value.trim() === '' ? null : Number(input.value);
          if (row.custom) {
            const c = co.custom.find((x) => x.id === row.id);
            if (c) c.amountCHF = value;
          } else {
            co.overrides[row.id] = { ...co.overrides[row.id], amountCHF: value };
          }
          persist();
          renderTotal();
        });

        removeBtn.addEventListener('click', () => {
          if (row.custom) {
            co.custom = co.custom.filter((x) => x.id !== row.id);
          } else {
            co.overrides[row.id] = { ...co.overrides[row.id], deleted: true };
          }
          persist();
          renderCategory(catId);
          renderTotal();
        });
      }
    };

    for (const cat of categories) renderCategory(cat.id);
    renderTotal();

    this.querySelectorAll<HTMLFormElement>('.checklist-add').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const categoryId = form.dataset.category;
        const input = form.querySelector<HTMLInputElement>('input[name="label"]');
        if (!input || !categoryId) return;
        const label = input.value.trim();
        if (!label) return;
        catOverlay(categoryId).custom.push({ id: makeId('budget'), label, amountCHF: null });
        input.value = '';
        persist();
        renderCategory(categoryId);
        renderTotal();
      });
    });
  }
}

customElements.define('budget-table-island', BudgetTableIsland);
