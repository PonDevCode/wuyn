'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';
import Wordmark from './Wordmark';

const links = [
  { href: '#top', label: 'Trang chủ' },
  { href: '#giai-phap', label: 'Giải pháp' },
  { href: '#nganh-nghe', label: 'Ngành nghề' },
  { href: '#bang-gia', label: 'Bảng giá' },
  { href: '#', label: 'Tin tức' },
  { href: '#lien-he', label: 'Liên hệ' },
];

const ctaCls =
  'flex h-10 items-center justify-center whitespace-nowrap rounded-full bg-brand px-5 text-sm font-semibold text-white hover:bg-[#0040cc] hover:text-white';

export default function Header() {
  const [open, setOpen] = useState(false);
  // Transparent over the hero; turns into a white bar that slides down once the page is scrolled.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);
  const tab = open ? 0 : -1;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b px-4 transition-[background-color,border-color,box-shadow] duration-300 lg:h-[72px] lg:px-8 xl:px-[max(120px,calc(50%-600px))] ${
        scrolled || open
          ? 'border-[#E8E9EC] bg-white shadow-[0_8px_24px_-18px_rgba(11,20,36,0.35)]'
          : 'border-transparent bg-transparent'
      } ${scrolled ? 'animate-slide-down' : ''}`}
    >
      <a href="#top" aria-label="Landiger – Trang chủ" className="flex items-center gap-2.5 lg:gap-3">
        <Logo id="lgBarNav" size={36} className="size-8 lg:size-10" />
        <Wordmark className="h-4 w-auto lg:h-[19px]" />
      </a>

      <nav aria-label="Điều hướng chính" className="hidden gap-6 text-sm font-medium lg:flex xl:gap-8">
        {links.map((l) => (
          <a key={l.label} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-3 lg:flex">
        <a href="#" data-trial className={ctaCls}>
          Dùng thử miễn phí
        </a>
      </div>

      <button
        type="button"
        className="-mr-2.5 flex size-11 cursor-pointer items-center justify-center rounded-[10px] focus-visible:outline-2 focus-visible:outline-brand lg:hidden"
        aria-label={open ? 'Đóng menu' : 'Mở menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'}
            stroke="#0B1424"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full flex flex-col border-b border-[#E8E9EC] bg-white px-4 pb-5 pt-2 shadow-[0_24px_40px_-24px_rgba(11,20,36,0.3)] transition-all duration-200 lg:hidden ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={close}
            tabIndex={tab}
            className="flex min-h-12 items-center border-b border-[#EEF1F6] text-base font-semibold"
          >
            {l.label}
          </a>
        ))}
        <div className="mt-4">
          <a href="#" data-trial onClick={close} tabIndex={tab} className={ctaCls}>
            Dùng thử miễn phí
          </a>
        </div>
      </div>
    </header>
  );
}
