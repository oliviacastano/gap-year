import type { StationData } from '../types';

const giliTrawangan: StationData = {
  slug: 'gili-trawangan',
  name: 'Gili Trawangan',
  country: 'Lombok, Indonesien',
  tagline: 'Autofreie Insel, Schnorcheln & Sonnenuntergänge',
  intro:
    'Gili Trawangan ist die kleine, autofreie Trauminsel: keine Motoren, dafür Pferdekutschen, türkises Wasser und Sonnenuntergänge, die man nie vergisst. Hier schnorcheln wir zwischen Schildkröten und lassen es zwischendurch einfach mal richtig langsam angehen.',
  area:
    'Die Insel ist so klein, dass man sie in einer guten Stunde zu Fuß umrunden kann — unser Hotel ist unser ruhiger Ausgangspunkt für Strandtage und Schnorchel-Ausflüge.',
  mapQuery: 'Gili Trawangan, Indonesia',
  dateRange: { start: '2026-09-03', end: '2026-09-06' },
  nights: 3,
  icon: '🐢',
  accent: 'ocean',
  hotel: {
    name: 'Willson Retreat',
    address: 'North Beach, Gili Trawangan, Desa Gili Indah, Pemenang, Lombok Utara 83352',
    dateRange: { start: '2026-09-03', end: '2026-09-06' },
    priceCHF: null,
    status: 'offen',
    notes: 'Preis & Buchungsstatus noch offen',
  },
  itinerary: [
    { day: 1, title: 'Anreise / Movie Night' },
    { day: 2, title: 'Schnorchel-Tour' },
    { day: 3, title: 'Komodo-Insel-Tour' },
    { day: 4, title: 'Schnorcheln / Abreise Nachmittag' },
  ],
  activities: [
    { id: 'gili-snorkel-tour', label: 'Schnorchel-Tour', description: 'Bootstour zu den besten Schnorchel-Spots rund um die Insel.', booking: 'Tour vor Ort oder online buchen' },
    { id: 'gili-turtle-point', label: 'Turtle Point', description: 'Beliebte Stelle, um Meeresschildkröten beim Schnorcheln zu sehen.', booking: 'Kein Ticket nötig, frei zugänglich' },
    { id: 'gili-aston-movie-night', label: 'Aston Movie Night', description: 'Open-Air-Kinoabend am Strand.', booking: 'Programm vor Ort prüfen' },
    { id: 'gili-bora-bora-beach-club', label: 'Bora Bora Beach Club', description: 'Beliebter Beach Club mit Live-Musik und Sonnenuntergang.', booking: 'Tisch vorab reservieren, v. a. am Wochenende' },
  ],
  restaurants: [],
};

export default giliTrawangan;
