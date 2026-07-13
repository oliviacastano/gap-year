import { loadOverlay, saveOverlay, makeId } from './storage';

interface ActivitySeed {
	id: string;
	label: string;
	description?: string;
	booking?: string;
	bookingLink?: string;
	done?: boolean;
	day?: number;
}

interface DayNoteSeed {
	day: number;
	title: string;
	description?: string;
}

interface SeedData {
	days: number;
	dayNotes: DayNoteSeed[];
	activities: ActivitySeed[];
}

interface CustomActivity {
	id: string;
	label: string;
	description?: string;
	booking?: string;
	done: boolean;
	day: number | null;
}

interface DayPlanOverlay {
	overrides: Record<string, { done?: boolean; deleted?: boolean; day?: number | null }>;
	custom: CustomActivity[];
}

interface MergedActivity {
	id: string;
	label: string;
	description?: string;
	booking?: string;
	bookingLink?: string;
	done: boolean;
	day: number | null;
	custom: boolean;
}

class DayPlannerIsland extends HTMLElement {
	connectedCallback() {
		const storageKey = this.dataset.storageKey;
		if (!storageKey) return;
		const seedScript = this.querySelector<HTMLScriptElement>('script[data-seed]');
		const seed: SeedData = seedScript
			? JSON.parse(seedScript.textContent || '{"days":0,"dayNotes":[],"activities":[]}')
			: { days: 0, dayNotes: [], activities: [] };

		const daysContainer = this.querySelector<HTMLElement>('[data-days]');
		const poolList = this.querySelector<HTMLUListElement>('[data-pool]');
		const addForm = this.querySelector<HTMLFormElement>('[data-add-pool]');
		if (!daysContainer || !poolList) return;

		const overlay = loadOverlay<DayPlanOverlay>(storageKey, { overrides: {}, custom: [] });
		const persist = () => saveOverlay(storageKey, overlay);

		const merge = (): MergedActivity[] => {
			const merged: MergedActivity[] = [];
			for (const item of seed.activities) {
				const ov = overlay.overrides[item.id];
				if (ov?.deleted) continue;
				const day = ov && ov.day !== undefined ? ov.day : (item.day ?? null);
				merged.push({
					id: item.id,
					label: item.label,
					description: item.description,
					booking: item.booking,
					bookingLink: item.bookingLink,
					done: ov?.done ?? item.done ?? false,
					day,
					custom: false,
				});
			}
			for (const item of overlay.custom) {
				merged.push({ ...item, custom: true });
			}
			return merged;
		};

		function buildItemRow(item: MergedActivity, opts: { inDay: boolean; days: number }): HTMLLIElement {
			const li = document.createElement('li');
			li.className = 'checklist-item day-planner-item' + (item.done ? ' is-done' : '');

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
			if (item.booking) {
				const booking = document.createElement('span');
				booking.className = 'checklist-booking';
				if (item.bookingLink) {
					const link = document.createElement('a');
					link.href = item.bookingLink;
					link.target = '_blank';
					link.rel = 'noopener noreferrer';
					link.textContent = `📌 ${item.booking}`;
					booking.appendChild(link);
				} else {
					booking.textContent = `📌 ${item.booking}`;
				}
				text.appendChild(booking);
			}

			const actions = document.createElement('div');
			actions.className = 'day-planner-actions';

			if (opts.inDay) {
				const backBtn = document.createElement('button');
				backBtn.type = 'button';
				backBtn.className = 'btn btn-ghost day-planner-back';
				backBtn.textContent = '↩ Pool';
				backBtn.addEventListener('click', () => {
					setDay(item, null);
				});
				actions.appendChild(backBtn);
			} else {
				const select = document.createElement('select');
				select.setAttribute('aria-label', `Tag für ${item.label} wählen`);
				for (let d = 1; d <= opts.days; d++) {
					const option = document.createElement('option');
					option.value = String(d);
					option.textContent = `Tag ${d}`;
					select.appendChild(option);
				}
				const assignBtn = document.createElement('button');
				assignBtn.type = 'button';
				assignBtn.className = 'btn btn-primary day-planner-assign';
				assignBtn.textContent = 'Einplanen';
				assignBtn.addEventListener('click', () => {
					setDay(item, Number(select.value));
				});
				actions.appendChild(select);
				actions.appendChild(assignBtn);
			}

			const removeBtn = document.createElement('button');
			removeBtn.type = 'button';
			removeBtn.className = 'checklist-remove';
			removeBtn.setAttribute('aria-label', `${item.label} entfernen`);
			removeBtn.textContent = '×';
			removeBtn.addEventListener('click', () => {
				if (item.custom) {
					overlay.custom = overlay.custom.filter((x) => x.id !== item.id);
				} else {
					overlay.overrides[item.id] = { ...overlay.overrides[item.id], deleted: true };
				}
				persist();
				render();
			});

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

			li.append(checkbox, text, actions, removeBtn);
			return li;
		}

		function setDay(item: MergedActivity, day: number | null) {
			if (item.custom) {
				const c = overlay.custom.find((x) => x.id === item.id);
				if (c) c.day = day;
			} else {
				overlay.overrides[item.id] = { ...overlay.overrides[item.id], day };
			}
			persist();
			render();
		}

		const render = () => {
			const merged = merge();

			daysContainer.innerHTML = '';
			for (let d = 1; d <= seed.days; d++) {
				const note = seed.dayNotes.find((n) => n.day === d);
				const card = document.createElement('div');
				card.className = 'day-card card card-pad';

				const header = document.createElement('div');
				header.className = 'day-card-header';
				const dayTitle = document.createElement('span');
				dayTitle.className = 'day-card-number';
				dayTitle.textContent = `Tag ${d}`;
				header.appendChild(dayTitle);
				if (note?.title) {
					const noteTitle = document.createElement('strong');
					noteTitle.className = 'day-card-note';
					noteTitle.textContent = note.title;
					header.appendChild(noteTitle);
				}
				card.appendChild(header);
				if (note?.description) {
					const noteDesc = document.createElement('p');
					noteDesc.className = 'day-card-note-desc';
					noteDesc.textContent = note.description;
					card.appendChild(noteDesc);
				}

				const dayItems = merged.filter((m) => m.day === d);
				const ul = document.createElement('ul');
				ul.className = 'checklist day-card-list';
				if (dayItems.length === 0) {
					const empty = document.createElement('p');
					empty.className = 'day-card-empty';
					empty.textContent = 'Noch nichts eingeplant.';
					card.appendChild(empty);
				} else {
					for (const item of dayItems) {
						ul.appendChild(buildItemRow(item, { inDay: true, days: seed.days }));
					}
					card.appendChild(ul);
				}

				daysContainer.appendChild(card);
			}

			poolList.innerHTML = '';
			const poolItems = merged.filter((m) => m.day === null || m.day === undefined || m.day < 1 || m.day > seed.days);
			for (const item of poolItems) {
				poolList.appendChild(buildItemRow(item, { inDay: false, days: seed.days }));
			}
		};

		render();

		addForm?.addEventListener('submit', (e) => {
			e.preventDefault();
			const input = addForm.querySelector<HTMLInputElement>('input[name="label"]');
			if (!input) return;
			const label = input.value.trim();
			if (!label) return;
			overlay.custom.push({ id: makeId('activity'), label, done: false, day: null });
			input.value = '';
			persist();
			render();
		});
	}
}

customElements.define('day-planner-island', DayPlannerIsland);
