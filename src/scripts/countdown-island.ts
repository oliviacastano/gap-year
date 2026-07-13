class CountdownIsland extends HTMLElement {
  private timer: ReturnType<typeof setInterval> | null = null;

  connectedCallback() {
    const target = new Date(this.getAttribute('target') || '').getTime();
    const daysEl = this.querySelector<HTMLElement>('[data-unit="days"]');
    const hoursEl = this.querySelector<HTMLElement>('[data-unit="hours"]');
    const minsEl = this.querySelector<HTMLElement>('[data-unit="minutes"]');
    const secsEl = this.querySelector<HTMLElement>('[data-unit="seconds"]');
    const doneEl = this.querySelector<HTMLElement>('[data-done]');
    const gridEl = this.querySelector<HTMLElement>('[data-grid]');

    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        if (gridEl) gridEl.style.display = 'none';
        if (doneEl) doneEl.hidden = false;
        if (this.timer) clearInterval(this.timer);
        return;
      }
      const seconds = Math.floor(diff / 1000);
      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      if (daysEl) daysEl.textContent = String(days);
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    };

    tick();
    this.timer = setInterval(tick, 1000);
  }

  disconnectedCallback() {
    if (this.timer) clearInterval(this.timer);
  }
}

customElements.define('countdown-island', CountdownIsland);
