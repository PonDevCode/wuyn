'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import Logo from './Logo';
import Reveal from './Reveal';
import Scaler from './Scaler';
import SectionHead from './SectionHead';
import { panels } from './SolutionPanels';

// [number, title, description, preview URL]
const data: [string, string, string, string][] = [
  [
    '01',
    'Website chuyên nghiệp',
    'Chọn mẫu theo ngành, sửa chữ và ảnh rồi xuất bản với tên miền riêng. Không cần biết code.',
    'landiger.com / website',
  ],
  [
    '02',
    'Đặt lịch và nhắc hẹn tự động',
    'Khách tự chọn dịch vụ và giờ trống. Landiger xếp lịch cho nhân viên và nhắc khách qua Zalo.',
    'landiger.com / lịch hẹn',
  ],
  [
    '03',
    'Khách hàng và doanh thu một chỗ',
    'Mỗi lượt đặt tự thành hồ sơ khách. Xem lịch sử, chi tiêu và doanh thu theo ngày, tuần, tháng.',
    'landiger.com / khách hàng',
  ],
  [
    '04',
    'Giữ chân khách quay lại',
    'Lọc khách lâu chưa quay lại, gửi ưu đãi qua Zalo và theo dõi ai đã đặt lại lịch.',
    'landiger.com / marketing',
  ],
];

const INTERVAL = 6000;

export default function Solution() {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const start = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => setActive((a) => (a + 1) % data.length), INTERVAL);
  }, []);

  // Tabs only start rotating once the visitor has scrolled to this section.
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.3 });

  useEffect(() => {
    if (!inView) return undefined;
    start();
    return () => clearInterval(timer.current);
  }, [start, inView]);

  const Panel = panels[active];

  return (
    <section
      ref={sectionRef}
      id="giai-phap"
      className="relative grid grid-cols-[minmax(0,1fr)] gap-10 overflow-hidden px-4 py-16 sm:px-8 lg:grid-cols-[minmax(0,470px)_minmax(0,620px)] lg:items-center lg:justify-between lg:gap-12 lg:px-[max(32px,calc(50%-580px))] lg:py-20"
    >
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0"
        style={{
          maskImage: 'linear-gradient(180deg, transparent 0%, #000 25%, #000 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 25%, #000 75%, transparent 100%)',
        }}
      />

      <Reveal className="relative flex flex-col gap-[30px]">
        <div className="flex flex-col gap-3.5">
          <SectionHead
            align="left"
            stacked
            eyebrow="GIẢI PHÁP"
            title="Một workspace,"
            accent="bốn việc tự chạy"
            sub="Những việc bạn đang làm tay mỗi ngày, Landiger gom về một chỗ và tự động hóa."
          />
        </div>
        <div className="flex flex-col gap-2.5">
          {data.map(([num, title, desc], i) => {
            const on = i === active;
            return (
              <button
                key={num}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setActive(i);
                  start();
                }}
                className={`w-full cursor-pointer rounded-2xl border border-transparent px-4 py-4 text-left transition-[background,box-shadow] duration-250 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-5 sm:py-[18px] ${
                  on
                    ? 'bg-white shadow-[0_1px_2px_rgba(11,20,36,0.05),0_18px_34px_-18px_rgba(11,20,36,0.3)]'
                    : 'bg-transparent hover:bg-white/60'
                }`}
              >
                <div className="flex items-baseline gap-3.5">
                  <span className={`text-[13px] font-extrabold ${on ? 'text-brand' : 'text-faint'}`}>{num}</span>
                  <span className={`text-[15px] font-extrabold sm:text-base ${on ? 'text-ink' : 'text-subtle'}`}>
                    {title}
                  </span>
                </div>
                {on && (
                  <>
                    <div className="mt-2 pl-9 text-[13px] leading-relaxed text-muted sm:text-sm">{desc}</div>
                    <div className="ml-9 mt-3.5 h-[3px] overflow-hidden rounded-sm bg-[#E6EBF3]">
                      <div key={active} className="h-full animate-fill rounded-sm bg-gradient-to-r from-sky to-brand" />
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={150} className="relative">
        <div
          aria-hidden="true"
          className="absolute -inset-x-10 -inset-y-12 rounded-full bg-[radial-gradient(closest-side,rgba(0,75,236,0.10),rgba(0,75,236,0))]"
        />
        <Scaler width={460} height={540} fluid className="relative">
          <div className="flex h-[540px] flex-col rounded-3xl bg-white shadow-lift">
            <div className="flex h-11 shrink-0 items-center gap-[7px] border-b border-[#EEF1F6] px-[18px]">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-2.5 rounded-full bg-[#E1E7F1]" />
              ))}
              <div className="mx-auto flex h-[26px] items-center rounded-lg bg-page px-3.5 text-[11px] text-subtle">
                {data[active][3]}
              </div>
              <div className="w-11" />
            </div>
            <div className="relative grow overflow-hidden rounded-b-3xl [--frame-h:496px]">
              <div key={active} className="size-full animate-rise">
                <Panel />
              </div>
            </div>
          </div>
        </Scaler>
        <div className="absolute -right-2 -top-6 z-[2] size-14 animate-bob rounded-[18px] bg-gradient-to-br from-white to-[#E9EEF6] p-2.5 shadow-[0_20px_30px_-14px_rgba(11,20,36,0.4)] sm:-right-[30px] sm:-top-[34px] sm:size-[68px] sm:rounded-[20px] sm:p-3">
          <Logo id="svLogo" size="100%" />
        </div>
      </Reveal>
    </section>
  );
}
