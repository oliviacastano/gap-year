import canggu from './canggu';
import ubud from './ubud';
import giliTrawangan from './gili-trawangan';
import nusaPenida from './nusa-penida';
import uluwatu from './uluwatu';
import type { StationData } from '../types';

export const stations: StationData[] = [canggu, ubud, giliTrawangan, nusaPenida, uluwatu];

export function getStationBySlug(slug: string): StationData | undefined {
  return stations.find((s) => s.slug === slug);
}
