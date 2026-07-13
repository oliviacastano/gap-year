import { loadOverlay, saveOverlay, makeId } from './storage';

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

    const overlay = loadOverlay<BudgetOverlay>(STORAGE_KEY, { categories: {} });
    const persist = () => saveOverlay(STORAGE_KEY, overlay);

    const catOverlay = (catId: string): BudgetCategoryOverlay => {
      if (!overlay.categories[catId]) overlay.categories[catId] = { overrides: {}, custom: [] };
      return overlay.categories[catId];
    };

    const totalEl = this.querySelector<HTMLElement>('[data-total]');
    const openEl = this.querySelector<HTMLElement>('[data-open]');

    const categorySum = (catId: string): number => {
      const cat = categories.find((c) => c.id === catId);
      const co = catOverlay(catId);
      let sum = 0;
      for (const item of cat?.items ?? []) {
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
        for (const item of cat.items) {
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

      for (const cat of categories) {
        const catSum = categorySum(cat.id);
        const subtotalEl = this.querySelector<HTMLElement>(`[data-subtotal="${cat.id}"]`);
        if (subtotalEl) subtotalEl.textContent = formatCHF(catSum);
        const legendEl = this.querySelector<HTMLElement>(`[data-legend-amount="${cat.id}"]`);
        if (legendEl) legendEl.textContent = formatCHF(catSum);
        const segmentEl = this.querySelector<HTMLElement>(`[data-segment="${cat.id}"]`);
        if (segmentEl) segmentEl.style.width = sum > 0 ? `${Math.max((catSum / sum) * 100, catSum > 0 ? 2 : 0)}%` : '0%';
      }
    };

    const renderCategory = (catId: string) => {
      const list = this.querySelector<HTMLUListElement>(`[data-category="${catId}"]`);
      if (!list) return;
      list.innerHTML = '';
      const cat = categories.find((c) => c.id === catId);
      const co = catOverlay(catId);

      const rows: Array<{ id: string; label: string; note?: string; amountCHF: number | null; custom: boolean }> = [];
      for (const item of cat?.items ?? []) {
        if (co.overrides[item.id]?.deleted) continue;
        const amountCHF = co.overrides[item.id]?.amountCHF !== undefined ? co.overrides[item.id].amountCHF! : item.amountCHF;
        rows.push({ id: item.id, label: item.label, note: item.note, amountCHF, custom: false });
      }
      for (const item of co.custom) {
        rows.push({ id: item.id, label: item.label, amountCHF: item.amountCHF, custom: true });
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
