'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';

const links = [
  { href: '#', label: 'Trang chủ' },
  { href: '#giai-phap', label: 'Giải pháp' },
  { href: '#nganh-nghe', label: 'Ngành nghề' },
  { href: '#bang-gia', label: 'Bảng giá' },
  { href: '#', label: 'Tin tức' },
  { href: '#lien-he', label: 'Liên hệ' },
];

const ctaCls =
  'flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-brand px-[22px] text-[15px] font-semibold text-white hover:bg-[#0040cc] hover:text-white';

export default function Header() {
  const [open, setOpen] = useState(false);

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
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#E8E9EC] bg-white px-4 lg:h-20 lg:px-8 xl:px-[max(120px,calc(50%-600px))]">
      <a href="#" className="flex items-center gap-2.5 text-[21px] font-bold tracking-[-0.02em] lg:text-2xl">
        <Logo id="lgBarNav" />
        Landiger
      </a>

      <nav aria-label="Điều hướng chính" className="hidden gap-6 text-[15px] font-medium lg:flex xl:gap-9">
        {links.map((l) => (
          <a key={l.label} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-3 lg:flex">
        <a href="#" className="flex h-11 items-center px-2.5 text-[15px] font-semibold xl:px-[18px]">
          Đăng nhập
        </a>
        <a href="#" className={ctaCls}>
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
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <a
            href="#"
            onClick={close}
            tabIndex={tab}
            className="flex h-11 items-center justify-center rounded-full border border-line text-[15px] font-semibold"
          >
            Đăng nhập
          </a>
          <a href="#" onClick={close} tabIndex={tab} className={ctaCls}>
            Dùng thử miễn phí
          </a>
        </div>
      </div>
    </header>
  );
}
