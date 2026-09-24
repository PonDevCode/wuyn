'use client';

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

type ScalerProps = {
  /** Design width of the artwork, in px */
  width: number;
  /** Design height of the artwork, in px */
  height: number;
  fluid?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Renders fixed-size artwork (mockups, illustrations) and shrinks it proportionally
 * when the available width is smaller than `width`.
 * With `fluid`, the child instead stretches to the container width down to `width`,
 * and only scales below that.
 */
export default function Scaler({ width, height, fluid = false, className, children }: ScalerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: width, scale: 1 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const update = () => {
      const available = el.clientWidth;
      if (!available) return;
      if (available >= width) {
        setBox({ w: fluid ? available : width, scale: 1 });
      } else {
        setBox({ w: width, scale: available / width });
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, fluid]);

  return (
    <div ref={ref} className={className} style={{ width: '100%', height: height * box.scale }}>
      <div
        style={{
          width: box.w,
          height,
          transform: box.scale === 1 ? undefined : `scale(${box.scale})`,
          transformOrigin: '0 0',
          margin: !fluid && box.scale === 1 ? '0 auto' : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}
