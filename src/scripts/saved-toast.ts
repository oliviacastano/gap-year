const toast = document.querySelector<HTMLElement>('[data-saved-toast]');

if (toast) {
  let hideTimer: ReturnType<typeof setTimeout> | null = null;

  const show = (text: string, variant: 'ok' | 'error') => {
    toast.textContent = text;
    toast.classList.toggle('is-error', variant === 'error');
    toast.classList.add('is-visible');
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => toast.classList.remove('is-visible'), variant === 'error' ? 3200 : 1400);
  };

  window.addEventListener('bali-trip:saved', () => show('✓ Gespeichert', 'ok'));
  window.addEventListener('bali-trip:save-failed', () => show('⚠ Speichern nicht möglich', 'error'));
}
