export interface ActivitySeed {
  id: string;
  label: string;
  description?: string;
  booking?: string;
  bookingLink?: string;
  done?: boolean;
  day?: number;
}

export interface CustomActivity {
  id: string;
  label: string;
  description?: string;
  booking?: string;
  done: boolean;
  day: number | null;
}

export interface DayPlanOverlay {
  overrides: Record<string, { done?: boolean; deleted?: boolean; day?: number | null }>;
  custom: CustomActivity[];
}

export interface MergedActivity {
  id: string;
  label: string;
  description?: string;
  booking?: string;
  bookingLink?: string;
  done: boolean;
  day: number | null;
  custom: boolean;
}

export function activityStorageKey(stationSlug: string): string {
  return `bali-trip:v1:activities:${stationSlug}`;
}

export function mergeActivities(seed: ActivitySeed[], overlay: DayPlanOverlay): MergedActivity[] {
  const merged: MergedActivity[] = [];
  for (const item of seed) {
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
}
