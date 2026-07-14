import type { StationData } from '../types';

const ubud: StationData = {
  slug: 'ubud',
  name: 'Ubud',
  country: 'Bali',
  tagline: 'Rice Terraces, Wasserfälle & Dschungel',
  intro:
    'Ubud ist das grüne Herz Balis: schier endlose Reisterrassen, dichter Dschungel, Wasserfälle und dieser unverwechselbar ruhige, spirituelle Vibe. Hier verlangsamen wir das Tempo — zwischen Wasserfall-Abenteuern, einer Vulkan-Wanderung und Streetfood-Cafés mit Blick ins Grüne.',
  area:
    'Unsere Villa liegt etwas außerhalb des turbulenten Zentrums, ruhig zwischen Reisfeldern — ideal, um abends die Grillen zu hören und tagsüber in wenigen Minuten mitten im Ubud-Trubel zu sein.',
  mapQuery: 'Ubud, Bali, Indonesia',
  dateRange: { start: '2026-08-30', end: '2026-09-03' },
  nights: 4,
  icon: '🌾',
  accent: 'jungle',
  hotel: {
    name: 'The Clifton Villas Ubud',
    dateRange: { start: '2026-08-30', end: '2026-09-03' },
    priceCHF: 480.38,
    status: 'gebucht',
  },
  itinerary: [
    { day: 1, title: 'Anreise / Schaukel, Monkey Forest, Rice Terraces' },
    { day: 2, title: 'Mount Batur' },
    { day: 3, title: 'Wasserfall & Quad fahren' },
    { day: 4, title: 'Lovina Day Trip', description: '2,5h, Delfine schwimmen' },
    { day: 5, title: 'Abreise / Elephant Park' },
  ],
  activities: [
    { id: 'ubud-waterfall', label: 'Wasserfall', description: 'Beliebter Wasserfall zum Abkühlen und Fotografieren.', booking: 'Kein Ticket nötig, Eintritt vor Ort zahlen' },
    { id: 'ubud-zipline', label: 'Zipline', description: 'Zipline durch den Dschungel.', booking: 'Vor Ort buchbar, ca. 15 CHF' },
    { id: 'ubud-rice-terraces', label: 'Rice Terraces', description: 'Ikonische Reisterrassen (z. B. Tegallalang) für den perfekten Ausblick.', booking: 'Kleiner Eintritt/Spende vor Ort' },
    { id: 'ubud-gembleng-waterfall', label: 'Gembleng Waterfall (Sidemen)', description: 'Versteckter Wasserfall in der Region Sidemen.', booking: 'Kein Ticket nötig, Eintritt vor Ort zahlen' },
    { id: 'ubud-quad', label: 'Quad fahren', description: 'Quad-Tour durch Reisfelder und Dschungel.', booking: 'Vor Ort oder online über lokalen Anbieter buchbar' },
    { id: 'ubud-rice-terrace-cafe', label: 'Rice Terrace Café', description: 'Café mit Terrasse mitten in den Reisfeldern.', booking: 'Kein Ticket nötig, einfach hingehen' },
    { id: 'ubud-lovina-dolphin-tour', label: 'Lovina Delfintour', description: 'Frühmorgens mit dem Boot raus, um Delfine zu beobachten.', booking: 'Tour vorab online oder vor Ort buchen' },
    { id: 'ubud-elephant-park', label: 'Mason Elephant Park', description: 'Park mit Elefanten zum Beobachten und Interagieren.', booking: 'Ticket vorab online empfehlenswert' },
    { id: 'ubud-mount-batur', label: 'Mount Batur', description: 'Vulkan für die Sonnenaufgangs-Wanderung.', booking: 'Guide/Tour vorab buchen (Start meist mitten in der Nacht)' },
    { id: 'ubud-cretya-pool-club', label: 'Cretya Pool Club', description: 'Pool Club zum Relaxen mit Blick ins Grüne.', booking: 'Liege vorab reservieren' },
    { id: 'ubud-kanto-lampo', label: 'Kanto Lampo Waterfall', description: 'Fotogener Wasserfall über Felsstufen.', booking: 'Kein Ticket nötig, Eintritt vor Ort zahlen' },
    { id: 'ubud-jungle-club', label: 'Jungle Club', description: 'Poolbar hoch über dem Dschungel.', booking: 'Liege/Tisch vorab reservieren' },
  ],
  restaurants: [{ name: 'Blend Café' }, { name: 'Tis Café' }, { name: 'Ambar' }],
};

export default ubud;
