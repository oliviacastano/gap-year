import { loadOverlay, saveOverlay, makeId } from './storage';

interface PackingItemSeed {
  id: string;
  label: string;
}

interface PackingCategorySeed {
  id: string;
  label: string;
  items: PackingItemSeed[];
}

interface PackingOverlay {
  overrides: Record<string, { done?: boolean; deleted?: boolean }>;
  custom: Array<{ id: string; label: string; done: boolean; categoryId: string }>;
}

const STORAGE_KEY = 'bali-trip:v1:packing';

class PackingListIsland extends HTMLElement {
  connectedCallback() {
    const seedScript = this.querySelector<HTMLScriptElement>('script[data-seed]');
    const categories: PackingCategorySeed[] = seedScript ? JSON.parse(seedScript.textContent || '[]') : [];
    const fillEl = this.querySelector<HTMLElement>('[data-fill]');
    const labelEl = this.querySelector<HTMLElement>('[data-progress-label]');
    const percentEl = this.querySelector<HTMLElement>('[data-percent]');

    const overlay = loadOverlay<PackingOverlay>(STORAGE_KEY, { overrides: {}, custom: [] });
    const persist = () => saveOverlay(STORAGE_KEY, overlay);

    const updateProgress = (done: number, total: number) => {
      const pct = total === 0 ? 0 : Math.round((done / total) * 100);
      if (fillEl) fillEl.style.width = `${pct}%`;
      if (labelEl) labelEl.textContent = `${done}/${total} gepackt`;
      if (percentEl) percentEl.textContent = `${pct}%`;
    };

    const updateCategoryCount = (categoryId: string) => {
      const seedCat = categories.find((c) => c.id === categoryId);
      let done = 0;
      let total = 0;
      for (const item of seedCat?.items ?? []) {
        if (overlay.overrides[item.id]?.deleted) continue;
        total += 1;
        if (overlay.overrides[item.id]?.done) done += 1;
      }
      for (const item of overlay.custom.filter((c) => c.categoryId === categoryId)) {
        total += 1;
        if (item.done) done += 1;
      }
      const countEl = this.querySelector<HTMLElement>(`[data-category-count="${categoryId}"]`);
      if (countEl) countEl.textContent = `${done}/${total}`;
    };

    const renderCategory = (categoryId: string) => {
      const listEl = this.querySelector<HTMLUListElement>(`.checklist[data-category="${categoryId}"]`);
      if (!listEl) return;
      listEl.innerHTML = '';

      const seedCat = categories.find((c) => c.id === categoryId);
      const merged: Array<{ id: string; label: string; done: boolean; custom: boolean }> = [];

      for (const item of seedCat?.items ?? []) {
        if (overlay.overrides[item.id]?.deleted) continue;
        merged.push({ id: item.id, label: item.label, done: overlay.overrides[item.id]?.done ?? false, custom: false });
      }
      for (const item of overlay.custom.filter((c) => c.categoryId === categoryId)) {
        merged.push({ id: item.id, label: item.label, done: item.done, custom: true });
      }

      for (const item of merged) {
        const li = document.createElement('li');
        li.className = 'checklist-item' + (item.done ? ' is-done' : '');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.done;
        checkbox.setAttribute('aria-label', item.label);

        const text = document.createElement('div');
        text.className = 'checklist-text';
        const labelSpan = document.createElement('span');
        labelSpan.className = 'checklist-label';
        labelSpan.textContent = item.label;
        text.appendChild(labelSpan);

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'checklist-remove';
        removeBtn.setAttribute('aria-label', `${item.label} entfernen`);
        removeBtn.textContent = '×';

        li.append(checkbox, text, removeBtn);

        checkbox.addEventListener('change', () => {
          if (item.custom) {
            const c = overlay.custom.find((x) => x.id === item.id);
            if (c) c.done = checkbox.checked;
          } else {
            overlay.overrides[item.id] = { ...overlay.overrides[item.id], done: checkbox.checked };
          }
          li.classList.toggle('is-done', checkbox.checked);
          persist();
          renderProgress();
        });

        removeBtn.addEventListener('click', () => {
          if (item.custom) {
            overlay.custom = overlay.custom.filter((x) => x.id !== item.id);
          } else {
            overlay.overrides[item.id] = { ...overlay.overrides[item.id], deleted: true };
          }
          persist();
          renderCategory(categoryId);
          renderProgress();
        });

        listEl.appendChild(li);
      }
    };

    const renderProgress = () => {
      let done = 0;
      let total = 0;
      for (const cat of categories) {
        for (const item of cat.items) {
          if (overlay.overrides[item.id]?.deleted) continue;
          total += 1;
          if (overlay.overrides[item.id]?.done) done += 1;
        }
      }
      for (const item of overlay.custom) {
        total += 1;
        if (item.done) done += 1;
      }
      updateProgress(done, total);
      for (const cat of categories) updateCategoryCount(cat.id);
    };

    for (const cat of categories) renderCategory(cat.id);
    renderProgress();

    this.querySelectorAll<HTMLFormElement>('.checklist-add').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const categoryId = form.dataset.category;
        const input = form.querySelector<HTMLInputElement>('input[name="label"]');
        if (!input || !categoryId) return;
        const label = input.value.trim();
        if (!label) return;
        overlay.custom.push({ id: makeId('packing'), label, done: false, categoryId });
        input.value = '';
        persist();
        renderCategory(categoryId);
        renderProgress();
      });
    });
  }
}

customElements.define('packing-list-island', PackingListIsland);
