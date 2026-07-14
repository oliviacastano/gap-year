import type { StationData } from '../types';

const uluwatu: StationData = {
  slug: 'uluwatu',
  name: 'Uluwatu',
  country: 'Bali',
  tagline: 'Klippen, Sonnenuntergänge & Surf-Spots',
  intro:
    'Uluwatu ist Balis dramatische Südspitze: hohe Kalksteinklippen, Weltklasse-Wellen und Sonnenuntergänge, die den ganzen Himmel in Orange tauchen. Zum Ausklang der Reise genießen wir hier Strände, Cliff-Restaurants und den entspannten Surfer-Vibe.',
  area:
    'Unsere Villa liegt oberhalb der Klippen von Bingin — von hier sind es nur wenige Minuten zu Fuß zu den Treppen, die runter an den Strand führen.',
  mapQuery: 'Uluwatu, Bali, Indonesia',
  dateRange: { start: '2026-09-07', end: '2026-09-11' },
  nights: 4,
  icon: '🌅',
  accent: 'ocean',
  hotel: {
    name: 'Canang Villas Bingin',
    dateRange: { start: '2026-09-07', end: '2026-09-11' },
    priceCHF: 515.62,
    status: 'gebucht',
  },
  itinerary: [
    { day: 1, title: 'Anreise abends / Sonnenuntergang schauen' },
    { day: 5, title: 'Abflug abends' },
  ],
  activities: [
    { id: 'uluwatu-savaya-club', label: 'Savaya Club', description: 'Cliffside Club mit Pool und Sonnenuntergangs-Partys.', booking: 'Liege/Tisch vorab reservieren' },
    { id: 'uluwatu-melasti-beach', label: 'Melasti Beach', description: 'Heller Sandstrand zwischen hohen Klippen.', booking: 'Kein Ticket nötig, kleine Parkgebühr vor Ort' },
    { id: 'uluwatu-padang-padang-beach', label: 'Padang Padang Beach', description: 'Kleiner, berühmter Strand mit Surf-Break.', booking: 'Kein Ticket nötig, kleine Eintrittsgebühr vor Ort' },
    { id: 'uluwatu-thomas-beach', label: 'Thomas Beach', description: 'Ruhigerer Strand, weniger überlaufen.', booking: 'Kein Ticket nötig, kleine Parkgebühr vor Ort' },
    { id: 'uluwatu-finns-beach-club', label: "Finn's Beach Club", description: 'Cliffside Beach Club mit Rutsche zum Strand.', booking: 'Liege/Tisch vorab reservieren' },
    { id: 'uluwatu-single-fin', label: 'Single Fin', description: 'Legendäre Surfer-Bar mit Sonnenuntergangsblick.', booking: 'Kein Ticket nötig, an Sonntagen früh da sein' },
    { id: 'uluwatu-nyang-nyang-beach', label: 'Nyang Nyang Beach', description: 'Langer, wilder Strand, kaum besucht.', booking: 'Kein Ticket nötig, frei zugänglich' },
    { id: 'uluwatu-dreamland-beach', label: 'Dreamland Beach', description: 'Breiter Sandstrand mit Cafés in Klippennähe.', booking: 'Kein Ticket nötig, frei zugänglich' },
    { id: 'uluwatu-suluban-beach', label: 'Suluban Beach', description: 'Strand in einer Höhle unterhalb der Klippen.', booking: 'Kein Ticket nötig, frei zugänglich' },
    { id: 'uluwatu-le-manja', label: 'Le Manja', description: 'Cliffside-Café/Restaurant mit Meerblick.', booking: 'Tisch vorab reservieren' },
    { id: 'uluwatu-bingin-beach', label: 'Bingin Beach', description: 'Surfer-Strand mit entspannter Café-Szene.', booking: 'Kein Ticket nötig, frei zugänglich' },
    { id: 'uluwatu-hatch-sunday-market', label: 'Hatch Sunday Market', description: 'Sonntagsmarkt mit Streetfood und Ständen.', booking: 'Kein Ticket nötig, nur sonntags' },
    { id: 'uluwatu-sunday-beach-clubs', label: 'Sunday Beach Clubs', description: 'Beach Clubs mit besonderem Sonntagsprogramm.', booking: 'Programm/Tisch vorab prüfen' },
    { id: 'uluwatu-tropical-temptation', label: 'Tropical Temptation', description: 'Beach Club mit Pool direkt am Klippenrand.', booking: 'Liege/Tisch vorab reservieren' },
    { id: 'uluwatu-palmilla', label: 'Palmilla', description: 'Cliffside-Restaurant mit Pool und Meerblick.', booking: 'Tisch vorab reservieren' },
    { id: 'uluwatu-white-rock-beach-club', label: 'White Rock Beach Club', description: 'Beach Club mit Infinity-Pool über dem Meer.', booking: 'Liege/Tisch vorab reservieren' },
  ],
  restaurants: [
    { name: 'Milani Cliff Restaurant' },
    { name: 'Abracadabra Cliff Restaurant' },
    { name: 'Le Cliff' },
    { name: 'Kynd' },
    { name: 'Artisan' },
  ],
};

export default uluwatu;
