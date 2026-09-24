'use client';

import { useEffect, useRef, useState } from 'react';
import HeroLanes from './HeroLanes';
import HeroDashboard from './HeroDashboard';
import Scaler from './Scaler';

const primaryBtn =
  'flex items-center gap-2.5 rounded-xl bg-brand font-bold text-white shadow-btn hover:bg-[#0040cc] hover:text-white';
const secondaryBtn = 'flex items-center rounded-xl border border-line bg-white font-bold text-ink';

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const [shift, setShift] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const bannerRef = useRef(null);
  const slideRef = useRef(0);
  const lockRef = useRef(0);
  const timers = useRef([]);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const busy = () => Date.now() - lockRef.current < 1100;

  const go = (target) => {
    if (busy() || target === slideRef.current) return;
    lockRef.current = Date.now();
    if (target === 1) {
      // Lanes slide away, then the product slide fades in.
      setShift(1100);
      setOpacity(0);
      later(() => {
        slideRef.current = 1;
        setSlide(1);
      }, 700);
    } else {
      slideRef.current = 0;
      setSlide(0);
      setShift(1100);
      setOpacity(0);
      later(() => {
        setShift(0);
        setOpacity(1);
      }, 40);
    }
  };
  const goRef = useRef(go);
  goRef.current = go;

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // Desktop only: the first scroll step while the banner is at the top switches slides
  // instead of scrolling the page. Touch devices scroll normally and use the dots.
  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return undefined;

    const onWheel = (e) => {
      if (window.innerWidth < 1024 || Math.abs(e.deltaY) < 4) return;
      const top = el.getBoundingClientRect().top;
      if (top < -40 || top > 140) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const cur = slideRef.current;
      const wants = busy() || (dir > 0 && cur === 0) || (dir < 0 && cur === 1);
      if (!wants) return;
      e.preventDefault();
      goRef.current(dir > 0 ? 1 : 0);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <section
      ref={bannerRef}
      aria-label="Giới thiệu"
      className={`relative w-full overflow-hidden bg-page lg:h-[820px] ${slide === 0 ? 'h-[600px] sm:h-[700px]' : ''}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(12.4deg, #E1E7F1 0 1px, transparent 1px 62px), repeating-linear-gradient(121.8deg, #E1E7F1 0 1px, transparent 1px 62px)',
      }}
    >
      {slide === 0 && (
        <div className="absolute inset-0 animate-fade-in">
          {/* 1440px stage centred on the viewport: phones see its middle */}
          <div className="absolute left-1/2 top-0 -ml-[720px] h-full w-[1440px]">
            <HeroLanes shift={shift} opacity={opacity} />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse min(820px, 95%) 300px at 50% calc(50% - 60px), rgba(244,246,250,0.92) 0%, rgba(244,246,250,0.86) 55%, rgba(244,246,250,0.5) 78%, rgba(244,246,250,0) 100%)',
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-page to-page/0" />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[calc(50%-280px)] h-[440px] w-[min(1100px,100%)] -translate-x-1/2 rounded-[40px] backdrop-blur-[4px]"
            style={{
              maskImage: 'radial-gradient(closest-side, #000 65%, transparent)',
              WebkitMaskImage: 'radial-gradient(closest-side, #000 65%, transparent)',
            }}
          />

          <div className="absolute inset-0 flex -translate-y-5 flex-col items-center justify-center gap-5 px-4 text-center lg:-translate-y-[60px]">
            <div className="flex h-[34px] items-center gap-[9px] whitespace-nowrap rounded-full bg-white px-4 text-[10px] font-bold tracking-[0.1em] text-[#2A3348] shadow-[0_1px_2px_rgba(11,20,36,0.05),0_10px_22px_-14px_rgba(11,20,36,0.25)] sm:text-xs sm:tracking-[0.14em]">
              <span className="size-[7px] rounded-full bg-sky" />
              WORKSPACE · WEBSITE · BOOKING · CRM
            </div>
            <h1 className="text-[clamp(30px,9vw,48px)] font-extrabold uppercase leading-[1.12] tracking-[0.005em] md:whitespace-nowrap md:text-[clamp(28px,5.6vw,62px)]">
              <span className="block md:inline">Từ website</span>{' '}
              <span className="block text-brand md:inline">đến vận hành</span>
            </h1>
            <p className="max-w-[640px] text-[15px] leading-[1.65] text-[#3F4A5E] sm:text-[17px]">
              Khách đến từ website, đặt lịch, vào CRM, được nhắc hẹn và thanh toán — cả hành trình chạy tự động trong
              một workspace Landiger.
            </p>
            <div className="mt-1.5 flex flex-wrap justify-center gap-3">
              <a href="#" className={`${primaryBtn} h-[50px] px-6 text-[15px]`}>
                Bắt đầu miễn phí <span aria-hidden="true">→</span>
              </a>
              <a href="#" className={`${secondaryBtn} h-[50px] px-[22px] text-[15px]`}>
                Xem demo
              </a>
            </div>
          </div>
        </div>
      )}

      {slide === 1 && (
        <div className="relative flex animate-fade-in flex-col gap-10 px-4 pb-24 pt-10 sm:px-8 lg:absolute lg:inset-0 lg:grid lg:grid-cols-[minmax(0,600px)_minmax(0,660px)] lg:items-center lg:justify-between lg:gap-10 lg:py-0 lg:pl-[max(32px,calc(50%-600px))] lg:pr-[max(32px,calc(50%-640px))]">
          <div className="flex flex-col gap-6 lg:gap-7">
            <div className="flex h-10 items-center gap-2.5 self-start whitespace-nowrap rounded-full border border-[#D9DBE0] bg-white px-[18px] text-[10px] font-semibold tracking-[0.1em] sm:text-xs sm:tracking-[0.14em]">
              <span className="size-[7px] rounded-full bg-sky" />
              WORKSPACE · WEBSITE · BOOKING · CRM
            </div>
            <h1 className="text-[clamp(34px,5vw,72px)] font-extrabold uppercase leading-[1.16] tracking-[0.005em]">
              <span className="block">Từ website</span>
              <span className="block text-brand">đến vận hành</span>
            </h1>
            <p className="max-w-[540px] text-base leading-[1.65] text-[#3F434B] sm:text-[19px]">
              Landiger là không gian làm việc cho doanh nghiệp dịch vụ: tạo website, nhận đặt lịch, quản lý khách hàng
              và bán hàng — tất cả trên một nền tảng, không cần ghép nhiều phần mềm.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#" className={`${primaryBtn} h-[52px] px-[26px] text-base font-semibold`}>
                Bắt đầu miễn phí <span aria-hidden="true">→</span>
              </a>
              <a href="#" className={`${secondaryBtn} h-[52px] border-[#D9DBE0] px-6 text-base font-semibold`}>
                Xem demo
              </a>
            </div>
            <div className="mt-2 grid grid-cols-3 divide-x divide-[#DADCE0]">
              {[
                ['4 trong 1', 'Website, lịch hẹn, CRM, bán hàng'],
                ['9+', 'Ngành dịch vụ'],
                ['[X]+', 'Doanh nghiệp đang dùng'],
              ].map(([n, l], i) => (
                <div key={n} className={`flex flex-col gap-1 ${i === 0 ? 'pr-3 sm:pr-8' : 'px-3 sm:px-8'}`}>
                  <div className="text-xl font-bold sm:text-[28px]">{n}</div>
                  <div className="text-xs text-[#6B6F78] sm:text-sm">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <Scaler width={660} height={620}>
            <HeroDashboard />
          </Scaler>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-20 bg-gradient-to-b from-page/0 via-page/85 via-60% to-page lg:h-[180px]"
      />

      <div
        role="group"
        aria-label="Chọn slide"
        className="absolute bottom-4 left-1/2 z-[5] flex -translate-x-1/2 items-center gap-1 rounded-full border border-[#E6E7EB] bg-white/75 px-2 py-1 lg:bottom-auto lg:left-auto lg:right-8 lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2 lg:flex-col lg:px-1 lg:py-2"
      >
        {[0, 1].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            aria-current={slide === i}
            onClick={() => go(i)}
            className="flex size-6 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-brand"
          >
            <span
              className={
                slide === i
                  ? 'block size-3 rounded-full bg-brand shadow-[0_0_0_4px_rgba(0,75,236,0.15)]'
                  : 'block size-[9px] rounded-full bg-[#CFE0FD]'
              }
            />
          </button>
        ))}
      </div>
    </section>
  );
}
