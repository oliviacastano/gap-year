import { stations } from './stations';
import { trip } from './trip';
import type { BudgetCategory } from './types';

const hotelItems = stations.map((s) => ({
  id: `hotel-${s.slug}`,
  label: `Hotel ${s.name}`,
  amountCHF: s.hotel.priceCHF,
  note: s.hotel.status === 'offen' ? 'noch offen' : undefined,
}));

export const budgetCategories: BudgetCategory[] = [
  {
    id: 'fluege',
    label: 'Flüge',
    icon: '✈️',
    items: [
      {
        id: 'fluege-hin-rueck',
        label: 'Flüge Zürich–Bali–Zürich (via Dubai, Emirates)',
        amountCHF: 800 * trip.travelers,
        note: `800 CHF pro Person × ${trip.travelers}`,
      },
    ],
  },
  {
    id: 'hotels',
    label: 'Hotels',
    icon: '🏨',
    items: hotelItems,
  },
  {
    // Items are sourced dynamically at runtime from activities scheduled in the
    // day planner across all stations — see budget-table-island.ts. This static
    // list only supplies id/label/icon for the category shell.
    id: 'aktivitaeten',
    label: 'Aktivitäten & Touren',
    icon: '🎟️',
    items: [],
  },
  {
    id: 'essen',
    label: 'Essen',
    icon: '🍽️',
    items: [],
  },
  {
    id: 'sonstiges',
    label: 'Sonstiges',
    icon: '🧳',
    items: [],
  },
];
