class HotelSlider extends HTMLElement {
  connectedCallback() {
    const track = this.querySelector<HTMLElement>('.hotel-slider-track');
    const prevBtn = this.querySelector<HTMLButtonElement>('.hotel-slider-prev');
    const nextBtn = this.querySelector<HTMLButtonElement>('.hotel-slider-next');
    const dots = [...this.querySelectorAll<HTMLElement>('.hotel-slider-dot')];
    const slides = [...this.querySelectorAll<HTMLElement>('.hotel-slider-slide')];
    if (!track || slides.length === 0) return;

    let current = 0;

    const setActive = (index: number) => {
      current = index;
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    };

    const scrollToIndex = (index: number) => {
      const clamped = Math.max(0, Math.min(index, slides.length - 1));
      track.scrollTo({ left: slides[clamped].offsetLeft, behavior: 'smooth' });
      setActive(clamped);
    };

    prevBtn?.addEventListener('click', () => scrollToIndex(current - 1));
    nextBtn?.addEventListener('click', () => scrollToIndex(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => scrollToIndex(i)));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = slides.indexOf(entry.target as HTMLElement);
            if (index !== -1) setActive(index);
          }
        }
      },
      { root: track, threshold: 0.6 },
    );
    slides.forEach((slide) => observer.observe(slide));

    setActive(0);
  }
}

customElements.define('hotel-slider', HotelSlider);
