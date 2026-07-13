export function loadOverlay<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveOverlay<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('bali-trip:saved'));
  } catch {
    // localStorage unavailable (private mode, storage full, etc.) — edits just won't persist.
    window.dispatchEvent(new CustomEvent('bali-trip:save-failed'));
  }
}

export function makeId(prefix: string): string {
  return `custom-${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
