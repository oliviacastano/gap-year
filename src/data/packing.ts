import type { PackingCategory } from './types';

export const packing: PackingCategory[] = [
  {
    id: 'dokumente',
    label: 'Dokumente & Wichtiges',
    icon: '📄',
    items: [
      { id: 'doc-passport', label: 'Reisepass' },
      { id: 'doc-tickets', label: 'Flugtickets / Bordkarten' },
      { id: 'doc-hotels', label: 'Hotelbuchungen' },
      { id: 'doc-insurance', label: 'Reiseversicherung' },
      { id: 'doc-money', label: 'Kreditkarte + etwas Bargeld' },
      { id: 'doc-license', label: 'Führerschein (für Scooter)' },
    ],
  },
  {
    id: 'kleidung',
    label: 'Kleidung',
    icon: '👕',
    items: [
      { id: 'cloth-swimwear', label: 'Badeanzüge / Bikinis' },
      { id: 'cloth-light', label: 'Leichte Kleidung' },
      { id: 'cloth-evening', label: 'Ein Outfit für den Abend' },
      { id: 'cloth-rainjacket', label: 'Regenjacke (Regenzeit-Randmonate)' },
      { id: 'cloth-hat', label: 'Sonnenhut' },
      { id: 'cloth-flipflops', label: 'Flip-Flops' },
      { id: 'cloth-hiking-shoes', label: 'Bequeme Wanderschuhe' },
    ],
  },
  {
    id: 'elektronik',
    label: 'Elektronik',
    icon: '🔌',
    items: [
      { id: 'elec-charger', label: 'Handyladegerät' },
      { id: 'elec-powerbank', label: 'Powerbank' },
      { id: 'elec-adapter', label: 'Reiseadapter (Bali: Typ C/F, 230V)' },
      { id: 'elec-headphones', label: 'Kopfhörer' },
      { id: 'elec-camera', label: 'Kamera / GoPro' },
    ],
  },
  {
    id: 'gesundheit',
    label: 'Gesundheit',
    icon: '💊',
    items: [
      { id: 'health-sunscreen', label: 'Sonnencreme (hoher Lichtschutzfaktor)' },
      { id: 'health-mosquito', label: 'Mückenspray' },
      { id: 'health-firstaid', label: 'Reiseapotheke' },
      { id: 'health-malaria', label: 'Malaria-Prophylaxe / Impfungen prüfen' },
      { id: 'health-disinfectant', label: 'Desinfektionsmittel' },
    ],
  },
  {
    id: 'sonstiges',
    label: 'Sonstiges',
    icon: '🎒',
    items: [
      { id: 'misc-snorkel', label: 'Schnorchelausrüstung (optional, sonst mietbar)' },
      { id: 'misc-waterproof-case', label: 'Wasserdichte Handyhülle' },
      { id: 'misc-daypack', label: 'Rucksack für Tagesausflüge' },
      { id: 'misc-bottle', label: 'Wiederverwendbare Wasserflasche' },
    ],
  },
];
