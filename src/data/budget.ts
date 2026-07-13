import { stations } from './stations';
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
        amountCHF: null,
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
    id: 'aktivitaeten',
    label: 'Aktivitäten & Touren',
    icon: '🎟️',
    items: [
      { id: 'akt-manta-snorkeling', label: 'Snorkeling Tour Manta Point (Nusa Penida)', amountCHF: null },
      { id: 'akt-zipline', label: 'Zipline (Ubud)', amountCHF: 15 },
    ],
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
