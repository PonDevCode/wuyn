'use client';

import { useEffect } from 'react';

/**
 * Links whose destination doesn't exist yet use href="#". By default the browser would jump
 * back to the top of the page when they're clicked; this makes them do nothing instead.
 * Replace the "#" with a real URL once the page exists.
 */
export default function PlaceholderLinkGuard() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a');
      if (link?.getAttribute('href') === '#') e.preventDefault();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
