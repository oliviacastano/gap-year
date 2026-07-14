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

/** Build-time only — finds public/<dirRel>/<slug>-N.{jpg,jpeg,png,webp}, sorted by N. */
export function findNumberedImages(dirRel: string, slug: string): string[] {
  const dir = path.join(PUBLIC_DIR, dirRel);
  if (!fs.existsSync(dir)) return [];
  const pattern = new RegExp(`^${slug}-(\\d+)\\.(jpg|jpeg|png|webp)$`, 'i');
  return fs
    .readdirSync(dir)
    .filter((f) => pattern.test(f))
    .sort((a, b) => Number(a.match(pattern)![1]) - Number(b.match(pattern)![1]))
    .map((f) => `/${dirRel}/${f}`);
}
