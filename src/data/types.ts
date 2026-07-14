export type BookingStatus = 'gebucht' | 'offen' | 'storniert';

export interface DateRange {
  /** ISO date, e.g. '2026-08-26' */
  start: string;
  /** ISO date, e.g. '2026-08-30' */
  end: string;
}

export interface Hotel {
  name: string;
  dateRange: DateRange;
  priceCHF: number | null;
  status: BookingStatus;
  link?: string;
  notes?: string;
}

export interface DayPlanEntry {
  /** 1-based day number within the station stay */
  day: number;
  title: string;
  description?: string;
}

/**
 * Seed id must be stable once shipped — it's the localStorage overlay key.
 * Only ever add new ids or edit label text; never rename/remove an existing id.
 */
export interface ActivityItem {
  id: string;
  label: string;
  description?: string;
  /** Short, honest booking guidance — never a fabricated specific link/phone number. */
  booking?: string;
  bookingLink?: string;
  done?: boolean;
  /** 1-based day number this activity is scheduled on; undefined = unplanned ("Weitere Aktivitäten" pool). */
  day?: number;
}

export interface Restaurant {
  name: string;
  note?: string;
  link?: string;
}

export interface FlightLeg {
  id: string;
  date: string;
  from: string;
  to: string;
  airline: string;
  flightNumber: string;
  departTime: string;
  arriveTime: string;
}

export interface BudgetLineItem {
  id: string;
  label: string;
  amountCHF: number | null;
  note?: string;
}

export type BudgetCategoryId = 'fluege' | 'hotels' | 'aktivitaeten' | 'essen' | 'sonstiges';

export interface BudgetCategory {
  id: BudgetCategoryId;
  label: string;
  icon: string;
  items: BudgetLineItem[];
}

export interface PackingItem {
  id: string;
  label: string;
}

export interface PackingCategory {
  id: string;
  label: string;
  icon: string;
  items: PackingItem[];
}

export type AccentColor = 'terracotta' | 'ocean' | 'jungle' | 'sand';

export interface StationData {
  slug: string;
  name: string;
  country: string;
  tagline: string;
  /** Short atmospheric paragraph: what there is to do, what the vibe feels like */
  intro: string;
  /** Short description of the neighbourhood/area the hotel sits in */
  area: string;
  /** Google Maps search query for this station, e.g. 'Canggu, Bali, Indonesia' */
  mapQuery: string;
  dateRange: DateRange;
  nights: number;
  icon: string;
  accent: AccentColor;
  hotel: Hotel;
  itinerary: DayPlanEntry[];
  activities: ActivityItem[];
  restaurants: Restaurant[];
}
