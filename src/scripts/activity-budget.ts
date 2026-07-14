import { loadOverlay, saveOverlay } from './storage';

interface BudgetCategoryOverlay {
  overrides: Record<string, { amountCHF?: number | null; deleted?: boolean }>;
  custom: Array<{ id: string; label: string; amountCHF: number | null }>;
}

interface BudgetOverlay {
  categories: Record<string, BudgetCategoryOverlay>;
}

const BUDGET_STORAGE_KEY = 'bali-trip:v1:budget';
const ACTIVITY_CATEGORY = 'aktivitaeten';

/**
 * Reads/writes the same budget overlay category the Budget page uses, keyed by activity id,
 * so a price set on a station page and one set on /budget always agree.
 */
export function getActivityPrice(activityId: string): number | null {
  const overlay = loadOverlay<BudgetOverlay>(BUDGET_STORAGE_KEY, { categories: {} });
  const amount = overlay.categories[ACTIVITY_CATEGORY]?.overrides[activityId]?.amountCHF;
  return amount ?? null;
}

export function setActivityPrice(activityId: string, amountCHF: number | null): void {
  const overlay = loadOverlay<BudgetOverlay>(BUDGET_STORAGE_KEY, { categories: {} });
  if (!overlay.categories[ACTIVITY_CATEGORY]) {
    overlay.categories[ACTIVITY_CATEGORY] = { overrides: {}, custom: [] };
  }
  overlay.categories[ACTIVITY_CATEGORY].overrides[activityId] = {
    ...overlay.categories[ACTIVITY_CATEGORY].overrides[activityId],
    amountCHF,
  };
  saveOverlay(BUDGET_STORAGE_KEY, overlay);
}
