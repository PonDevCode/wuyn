import type { ReactNode } from 'react';
import HeroGrid from './HeroGrid';

/** Top band of inner pages: the home hero's diagonal grid with moving product icons behind the content. */
export default function PageHero({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative overflow-hidden bg-page ${className}`}>
      <HeroGrid />
      {/* Solid wash so the text stays readable over the grid */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[120%] w-[min(1100px,115%)] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(closest-side, rgba(244,246,250,0.97) 55%, rgba(244,246,250,0.85) 75%, rgba(244,246,250,0))',
        }}
      />
      {/* Fade into the page below */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-page" />
      <div className="relative">{children}</div>
    </section>
  );
}
