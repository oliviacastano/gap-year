import type { StationData } from '../types';

const nusaPenida: StationData = {
  slug: 'nusa-penida',
  name: 'Nusa Penida',
  country: 'Bali',
  tagline: 'Dramatische Klippen & türkise Buchten',
  intro:
    'Nusa Penida ist Balis wilde Schwester: schroffe Klippen, türkise Buchten und Aussichten wie aus dem Reisekatalog. Für unseren kurzen Zwischenstopp heißt es: möglichst viele der spektakulären Strände abklappern und einmal mit Mantarochen schwimmen.',
  area:
    'Unser Resort liegt an der Küste, praktisch gelegen für Tagestouren zu den berühmten Aussichtspunkten der Insel — die Straßen hier sind kurvig, also planen wir für jede Strecke etwas mehr Zeit ein.',
  mapQuery: 'Nusa Penida, Bali, Indonesia',
  dateRange: { start: '2026-09-06', end: '2026-09-07' },
  nights: 1,
  icon: '🏝️',
  accent: 'terracotta',
  hotel: {
    name: 'Sea La Vie Resort Nusa Penida',
    dateRange: { start: '2026-09-06', end: '2026-09-07' },
    priceCHF: 79.68,
    status: 'gebucht',
  },
  itinerary: [],
  activities: [
    { id: 'penida-kelingking-beach', label: 'Kelingking Beach', description: 'Der ikonische Aussichtspunkt mit dem Dino-förmigen Felsen.', booking: 'Kein Ticket nötig, kleine Parkgebühr vor Ort' },
    { id: 'penida-diamond-beach', label: 'Diamond Beach', description: 'Traumstrand unterhalb einer steilen Treppe.', booking: 'Kein Ticket nötig, kleine Parkgebühr vor Ort' },
    { id: 'penida-atuh-beach', label: 'Atuh Beach', description: 'Weitläufiger Strand mit Felsformationen.', booking: 'Kein Ticket nötig, kleine Parkgebühr vor Ort' },
    { id: 'penida-crystal-bay-beach', label: 'Crystal Bay Beach', description: 'Ruhige Bucht, gut zum Schwimmen und Schnorcheln.', booking: 'Kein Ticket nötig, frei zugänglich' },
    { id: 'penida-pandan-beach', label: 'Pandan Beach', description: 'Wenig besuchter Strand mit Felsformationen.', booking: 'Kein Ticket nötig, frei zugänglich' },
    { id: 'penida-puyung-beach', label: 'Puyung Beach', description: 'Abgelegener, ruhiger Strandabschnitt.', booking: 'Kein Ticket nötig, frei zugänglich' },
    { id: 'penida-angels-billabong', label: "Angel's Billabong", description: 'Natürliches Infinity-Pool-Becken in den Felsen.', booking: 'Kein Ticket nötig, kleine Parkgebühr vor Ort' },
    { id: 'penida-broken-beach', label: 'Broken Beach', description: 'Natürlicher Felsbogen mit Blick aufs Meer.', booking: 'Kein Ticket nötig, kleine Parkgebühr vor Ort' },
    { id: 'penida-dolphin-beach', label: 'Dolphin Beach', description: 'Strand, an dem man morgens oft Delfine sichten kann.', booking: 'Kein Ticket nötig, frei zugänglich' },
    { id: 'penida-tree-house', label: 'Rumah Pohon "Tree House"', description: 'Fotogenes Baumhaus mit Meerblick.', booking: 'Kleiner Eintritt vor Ort' },
    {
      id: 'penida-manta-snorkeling',
      label: 'Snorkeling Tour mit Manta Rays und Meeresschildkröten',
      description: 'Bootstour zum Schnorcheln mit Mantarochen und Schildkröten bei Manta Point.',
      booking: 'Online buchen',
      bookingLink: 'https://gyg.me/Y8yTFKL8',
    },
  ],
  restaurants: [
    { name: 'Secret Penida Restaurant & Bar' },
    { name: 'Eastside Penida Kitchen & Bar' },
    { name: 'Little Finger Kelingking' },
    { name: 'Amok Sunset Restaurant & Bar' },
  ],
};

export default nusaPenida;
