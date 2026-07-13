import type { StationData } from '../types';

const canggu: StationData = {
  slug: 'canggu',
  name: 'Canggu',
  country: 'Bali',
  tagline: 'Surf, Beach Clubs & Streetstyle',
  intro:
    'Canggu ist unser Softlanding auf Bali: Surf-Breaks, Beach Clubs bei Sonnenuntergang und ein Stadtteil voller Cafés, Boutiquen und Streetstyle. Hier holen wir uns den ersten Inselflow – zwischen Wellenreiten am Vormittag und Cocktails mit Blick aufs Meer am Abend.',
  area:
    'Unser Hotel liegt im Herzen von Canggu, nur wenige Gehminuten vom Batu Bolong Beach entfernt — umgeben von Reisfeldern, Surfshops und den angesagtesten Cafés der Gegend.',
  mapPosition: { x: 28, y: 55 },
  dateRange: { start: '2026-08-26', end: '2026-08-30' },
  nights: 4,
  icon: '🏄',
  accent: 'terracotta',
  hotel: {
    name: 'Sense Canggu Beach Hotel',
    dateRange: { start: '2026-08-26', end: '2026-08-30' },
    priceCHF: 170.27,
    status: 'gebucht',
  },
  itinerary: [],
  activities: [
    { id: 'canggu-headspa', label: 'Head Spa (Shosan Spa)', description: 'Entspannende Kopfhautmassage mit japanischer Technik.', booking: 'Termin vorab reservieren' },
    { id: 'canggu-lush-salon', label: 'Lush Bali Beauty Salon', description: 'Nagelstudio & Beauty-Treatments zum Verwöhnen.', booking: 'Termin vorab reservieren' },
    { id: 'canggu-perfume', label: 'Parfüm selbst machen (Bohe Bali Perfumery)', description: 'Workshop, um sein eigenes Parfüm zu kreieren.', booking: 'Workshop-Slot vorab online buchen' },
    { id: 'canggu-treasure-life-market', label: 'Treasure Life Market', description: 'Kleiner Markt mit Kunsthandwerk und lokalen Produkten.', booking: 'Kein Ticket nötig, einfach hingehen' },
    { id: 'canggu-dog-yoga', label: 'Hunde-Yoga', description: 'Yoga-Session zusammen mit Hunden zum Kuscheln.', booking: 'Platz vorab reservieren' },
    { id: 'canggu-miyo', label: 'MIYO Frozen Yogurt', description: 'Frozen-Yogurt-Bar für die Abkühlung zwischendurch.', booking: 'Kein Ticket nötig, einfach vorbeikommen' },
    { id: 'canggu-lestari-thrift', label: 'Lestari Thrift Shop', description: 'Second-Hand-Laden für Vintage-Schnäppchen.', booking: 'Kein Ticket nötig, reguläre Öffnungszeiten' },
    { id: 'canggu-the-lawn', label: 'Beach Club The Lawn', description: 'Bekannter Beach Club mit Liegen direkt am Strand.', booking: 'Liege/Tisch vorab reservieren, v. a. am Wochenende' },
    { id: 'canggu-la-brisa', label: 'Beach Club La Brisa', description: 'Beach Club mit Bali-typischer Bootshaus-Architektur.', booking: 'Tisch vorab reservieren, v. a. am Wochenende' },
    { id: 'canggu-echo-beach', label: 'Echo Beach', description: 'Beliebter Surf-Spot und Strand für den Sonnenuntergang.', booking: 'Kein Ticket nötig, frei zugänglich' },
    { id: 'canggu-love-anchor', label: 'Love Anchor Market', description: 'Entspannter Markt mit Streetfood und Ständen.', booking: 'Kein Ticket nötig, einfach hingehen' },
    { id: 'canggu-sunday-market', label: 'La Brisa Sunday Market', description: 'Sonntags-Markt mit Mode, Kunsthandwerk und Essen, 10–16 Uhr.', booking: 'Kein Ticket nötig, nur sonntags 10–16 Uhr geöffnet' },
    { id: 'canggu-mode-outlet', label: 'Mode Fashion Outlet', description: 'Outlet für Mode zu reduzierten Preisen.', booking: 'Kein Ticket nötig, reguläre Öffnungszeiten' },
    { id: 'canggu-stockx', label: 'StockXSneakers.id', description: 'Sneaker-Shop für Sammler und Fans.', booking: 'Kein Ticket nötig, reguläre Öffnungszeiten' },
  ],
  restaurants: [
    { name: 'Little Uji' },
    { name: 'Cøpenhagen' },
    { name: 'Kynd Community' },
    { name: 'Lusa by Suka' },
    { name: 'Aged and Butchered' },
    { name: 'Cinamor' },
  ],
};

export default canggu;
