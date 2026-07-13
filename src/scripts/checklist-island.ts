import { loadOverlay, saveOverlay, makeId } from './storage';

interface ActivitySeed {
  id: string;
  label: string;
  description?: string;
  done?: boolean;
}

interface ChecklistOverlay {
  overrides: Record<string, { done?: boolean; deleted?: boolean }>;
  custom: Array<{ id: string; label: string; done: boolean }>;
}

class ChecklistIsland extends HTMLElement {
  connectedCallback() {
    const storageKey = this.dataset.storageKey;
    if (!storageKey) return;
    const seedScript = this.querySelector<HTMLScriptElement>('script[data-seed]');
    const seed: ActivitySeed[] = seedScript ? JSON.parse(seedScript.textContent || '[]') : [];
    const listEl = this.querySelector<HTMLUListElement>('.checklist');
    const form = this.querySelector<HTMLFormElement>('.checklist-add');
    if (!listEl) return;

    const overlay = loadOverlay<ChecklistOverlay>(storageKey, { overrides: {}, custom: [] });
    const persist = () => saveOverlay(storageKey, overlay);

    const render = () => {
      listEl.innerHTML = '';
      const merged: Array<{ id: string; label: string; description?: string; done: boolean; custom: boolean }> = [];

      for (const item of seed) {
        if (overlay.overrides[item.id]?.deleted) continue;
        const done = overlay.overrides[item.id]?.done ?? item.done ?? false;
        merged.push({ id: item.id, label: item.label, description: item.description, done, custom: false });
      }
      for (const item of overlay.custom) {
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
        const labelEl = document.createElement('span');
        labelEl.className = 'checklist-label';
        labelEl.textContent = item.label;
        text.appendChild(labelEl);
        if (item.description) {
          const desc = document.createElement('span');
          desc.className = 'checklist-desc';
          desc.textContent = item.description;
          text.appendChild(desc);
        }

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
        });

        removeBtn.addEventListener('click', () => {
          if (item.custom) {
            overlay.custom = overlay.custom.filter((x) => x.id !== item.id);
          } else {
            overlay.overrides[item.id] = { ...overlay.overrides[item.id], deleted: true };
          }
          persist();
          render();
        });

        listEl.appendChild(li);
      }
    };

    render();

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector<HTMLInputElement>('input[name="label"]');
      if (!input) return;
      const label = input.value.trim();
      if (!label) return;
      overlay.custom.push({ id: makeId('activity'), label, done: false });
      input.value = '';
      persist();
      render();
    });
  }
}

customElements.define('checklist-island', ChecklistIsland);
