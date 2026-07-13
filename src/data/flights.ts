import type { FlightLeg } from './types';

export const flights: FlightLeg[] = [
  {
    id: 'zrh-dxb',
    date: '2026-08-25',
    from: 'Zürich (ZRH)',
    to: 'Dubai (DXB)',
    airline: 'Emirates',
    flightNumber: 'EK086',
    departTime: '22:00',
    arriveTime: '06:10 (+1)',
  },
  {
    id: 'dxb-dps',
    date: '2026-08-26',
    from: 'Dubai (DXB)',
    to: 'Bali / Denpasar (DPS)',
    airline: 'Emirates',
    flightNumber: 'EK398',
    departTime: '09:10',
    arriveTime: '22:25',
  },
  {
    id: 'dps-dxb',
    date: '2026-09-12',
    from: 'Bali / Denpasar (DPS)',
    to: 'Dubai (DXB)',
    airline: 'Emirates',
    flightNumber: 'EK399',
    departTime: '00:35',
    arriveTime: '05:35',
  },
  {
    id: 'dxb-zrh',
    date: '2026-09-12',
    from: 'Dubai (DXB)',
    to: 'Zürich (ZRH)',
    airline: 'Emirates',
    flightNumber: 'EK087',
    departTime: '08:40',
    arriveTime: '13:20',
  },
];
