'use client';

import { useEffect, useRef, type SVGProps } from 'react';

/**
 * An <svg> whose SMIL animations (animateMotion etc.) only run while it is on screen.
 * SMIL repaints every frame even when scrolled out of view, which can starve Chrome's
 * rasterizer and leave parts of the page unpainted.
 */
export default function LiveSvg(props: SVGProps<SVGSVGElement>) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) svg.unpauseAnimations();
      else svg.pauseAnimations();
    });
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return <svg ref={ref} {...props} />;
}
