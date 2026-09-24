import type { ReactNode } from 'react';
import HeroGrid from './HeroGrid';

/**
 * Top band of inner pages. The home hero's diagonal grid with moving product icons is pinned to the
 * viewport behind the whole page, so the content scrolls over a background that stays still.
 */
export default function PageHero({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <HeroGrid />
      </div>
      <section className={`relative overflow-x-clip ${className}`}>
        {/* Solid wash so the text stays readable over the grid */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[120%] w-[min(1100px,115%)] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              'radial-gradient(closest-side, rgba(244,246,250,0.97) 55%, rgba(244,246,250,0.85) 75%, rgba(244,246,250,0))',
          }}
        />
        <div className="relative">{children}</div>
      </section>
    </>
  );
}
