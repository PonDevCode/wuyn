'use client';

import { useEffect, useRef, type RefObject } from 'react';

/**
 * Opens a dialog when any element matching `[attr]` is clicked; the handler receives that element
 * (so it can read data-* options).
 */
export function useTrigger(attr: string, onTrigger: (el: HTMLElement) => void) {
  const handler = useRef(onTrigger);
  handler.current = onTrigger;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.(`[${attr}]`) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      handler.current(el);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [attr]);
}

/** While `open`: lock page scroll, focus the first field, Escape closes, Tab stays inside `ref`. */
export function useModal(open: boolean, ref: RefObject<HTMLElement | null>, onClose: () => void) {
  const close = useRef(onClose);
  close.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(
      () => ref.current?.querySelector<HTMLElement>('input, textarea, button[type="submit"]')?.focus(),
      60,
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close.current();
      if (e.key !== 'Tab' || !ref.current) return;
      const items = [...ref.current.querySelectorAll<HTMLElement>('button, input, textarea, a[href]')].filter(
        (el) => !el.hasAttribute('disabled') && el.tabIndex !== -1 && el.offsetParent !== null,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, ref]);
}
