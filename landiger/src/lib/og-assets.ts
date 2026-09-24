import { readFile } from 'node:fs/promises';
import path from 'node:path';

/** Be Vietnam Pro (with Vietnamese glyphs) for next/og images. */
export async function ogFonts() {
  const dir = path.join(process.cwd(), 'node_modules/@fontsource/be-vietnam-pro/files');
  const load = (file: string) => readFile(path.join(dir, file));
  const [latin700, latin800, vi700, vi800] = await Promise.all([
    load('be-vietnam-pro-latin-700-normal.woff'),
    load('be-vietnam-pro-latin-800-normal.woff'),
    load('be-vietnam-pro-vietnamese-700-normal.woff'),
    load('be-vietnam-pro-vietnamese-800-normal.woff'),
  ]);
  return [
    { name: 'BeVietnam', data: latin700, weight: 700 as const, style: 'normal' as const },
    { name: 'BeVietnam', data: latin800, weight: 800 as const, style: 'normal' as const },
    { name: 'BeVietnamVi', data: vi700, weight: 700 as const, style: 'normal' as const },
    { name: 'BeVietnamVi', data: vi800, weight: 800 as const, style: 'normal' as const },
  ];
}

/** The Landiger mark as a data URI (same paths as components/Logo.tsx). */
export const markDataUri =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="283 104 426 460"><defs><linearGradient id="g" x1="0%" y1="0%" x2="30%" y2="100%"><stop offset="0%" stop-color="#0095FE"/><stop offset="55%" stop-color="#004BEC"/><stop offset="100%" stop-color="#0238F0"/></linearGradient></defs><path d="M331 552L343 564L601 563L625 546L706 465L709 447L697 438L464 439L445 448L338 535Z" fill="#0B1424"/><path d="M411 104L397 107L292 179L284 191L283 507L296 520L314 517L413 446L425 428L426 118Z" fill="url(#g)"/><path d="M475 249L462 253L456 264L456 406L459 412L468 418L479 417L589 343L596 331L590 317Z" fill="#17A6F8"/></svg>',
  ).toString('base64');
