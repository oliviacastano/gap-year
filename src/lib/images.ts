import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const EXTS = ['jpg', 'jpeg', 'png', 'webp'];

/** Build-time only (Node fs) — checks public/<relNoExt>.{jpg,jpeg,png,webp}. */
export function findPublicImage(relNoExt: string): string | null {
  for (const ext of EXTS) {
    if (fs.existsSync(path.join(PUBLIC_DIR, `${relNoExt}.${ext}`))) return `/${relNoExt}.${ext}`;
  }
  return null;
}
