export function nightsLabel(nights: number): string {
  return `${nights} ${nights === 1 ? 'Nacht' : 'Nächte'}`;
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit' });
}
