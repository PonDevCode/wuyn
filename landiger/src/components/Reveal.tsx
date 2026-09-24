'use client';

import type { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay of the fade-in, in ms */
  delay?: number;
};

/**
 * Fades its content up when scrolled into view. CSS animations inside stay paused
 * until then, so each section starts animating only when the visitor reaches it.
 */
export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal=""
      data-inview={inView}
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
