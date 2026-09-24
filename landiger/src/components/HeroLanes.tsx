import type { ReactNode } from 'react';
import Image from 'next/image';
import senspa from '@/assets/senspa.png';

type CardKind = 'booking' | 'customer' | 'zalo' | 'payment' | 'revenue' | 'website';

function Label({ color, children }: { color: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-[7px] text-[10px] font-bold tracking-[0.12em] text-[#6B6F78]">
      <span className="size-[7px] rounded-[2px]" style={{ background: color }} />
      {children}
    </div>
  );
}

const bookingRows = [
  ['09:30', 'Chị Thảo', 'Xác nhận', '#067647'],
  ['11:00', 'Anh Minh', 'Xác nhận', '#067647'],
  ['14:30', 'Chị Lan', 'Chờ cọc', '#93370D'],
];

const cards: Record<CardKind, ReactNode> = {
  booking: (
    <>
      <Label color="#0CA678">LỊCH HẸN · THỨ 5</Label>
      {bookingRows.map(([t, n, s, c]) => (
        <div key={t} className="flex gap-2.5 text-xs">
          <b className="w-[38px]">{t}</b>
          <span className="grow">{n}</span>
          <span className="text-[10px] font-semibold" style={{ color: c }}>
            {s}
          </span>
        </div>
      ))}
    </>
  ),
  customer: (
    <>
      <Label color="#7048E8">KHÁCH HÀNG MỚI</Label>
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-full bg-[#E8E1FB] text-xs font-bold text-[#4B2BB0]">
          L
        </span>
        <div>
          <div className="text-[13px] font-bold">Chị Lan</div>
          <div className="text-[11px] text-[#6B6F78]">Từ website · 1 lịch hẹn</div>
        </div>
      </div>
      <div className="flex gap-1.5 text-[10px] font-semibold">
        <span className="rounded-[5px] bg-[#F1F2F4] px-[7px] py-0.5">Massage</span>
        <span className="rounded-[5px] bg-[#F1F2F4] px-[7px] py-0.5">Khách mới</span>
      </div>
    </>
  ),
  zalo: (
    <>
      <div className="flex items-center gap-2 text-[11px] font-bold">
        <span className="flex size-5 items-center justify-center rounded-md bg-zalo text-[10px] font-extrabold text-white">
          Z
        </span>
        Zalo OA · nhắc lịch
      </div>
      <div className="rounded-[3px_10px_10px_10px] bg-[#F1F2F4] px-2.5 py-2 text-[11px] leading-[1.45]">
        SEN Spa nhắc lịch 14:30 hôm nay ạ.
      </div>
      <div className="text-[10px] font-semibold text-ok">✓ Đã gửi tự động</div>
    </>
  ),
  payment: (
    <>
      <Label color="#E67700">THANH TOÁN</Label>
      <div className="text-2xl font-bold text-ok">+100.000đ</div>
      <div className="text-[11px] text-[#6B6F78]">Tiền cọc · chị Lan · 09:12</div>
    </>
  ),
  revenue: (
    <>
      <Label color="#0B1424">DOANH THU TUẦN</Label>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold">8,4tr</div>
          <div className="text-[10px] font-semibold text-ok">+12%</div>
        </div>
        <div className="flex h-10 items-end gap-1">
          {[14, 22, 17, 28, 24, 38].map((h, i) => (
            <span
              key={i}
              className={`w-2 rounded-[2px] ${i === 5 ? 'bg-ink' : 'bg-[#D5D7DC]'}`}
              style={{ height: h }}
            />
          ))}
        </div>
      </div>
    </>
  ),
  website: (
    <>
      <Label color="#1C7ED6">WEBSITE</Label>
      <Image
        src={senspa}
        alt=""
        sizes="240px"
        className="block h-[110px] w-full rounded-[9px] object-cover object-top"
      />
      <div className="flex justify-between text-[10px]">
        <span className="text-[#6B6F78]">senspa.vn</span>
        <span className="font-semibold text-ok">● Đã xuất bản</span>
      </div>
    </>
  ),
};

const patterns: Record<'A' | 'B' | 'C', CardKind[]> = {
  A: ['booking', 'customer', 'zalo', 'payment', 'revenue'],
  B: ['zalo', 'payment', 'revenue', 'website', 'booking'],
  C: ['revenue', 'website', 'booking', 'customer', 'zalo'],
};

// [left, duration (s), delay (s), pattern]
const lanes: [number, number, number, keyof typeof patterns][] = [
  [-1120, 46, -28.4, 'C'],
  [-840, 40, -21.3, 'B'],
  [-560, 34, 0, 'A'],
  [-280, 40, -4.3, 'B'],
  [0, 46, -8.6, 'C'],
  [280, 34, -12.9, 'A'],
  [560, 40, -17.2, 'B'],
  [840, 46, -21.5, 'C'],
  [1120, 34, -25.8, 'A'],
  [1400, 40, -30.1, 'B'],
  [1680, 46, -34.4, 'C'],
  [1960, 34, -7.1, 'A'],
  [2240, 46, -14.2, 'C'],
];

/** Tilted, endlessly scrolling columns of app cards behind the hero headline. */
export default function HeroLanes({ shift, opacity }: { shift: number; opacity: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-0 top-0 size-0 origin-top-left"
      style={{ transform: 'matrix(1, 0.22, -0.62, 1, 520, -260)' }}
    >
      <div
        className="absolute left-0 top-0 transition-[transform,opacity] duration-[850ms] ease-[cubic-bezier(.65,0,.3,1)]"
        style={{ transform: `translateY(${shift}px)`, opacity }}
      >
        {lanes.map(([left, duration, delay, pattern]) => {
          // Three copies of the pattern so the -33.333% loop is seamless.
          const kinds = [...patterns[pattern], ...patterns[pattern], ...patterns[pattern]];
          return (
            <div key={left} className="absolute -top-[700px] w-60" style={{ left }}>
              <div className="animate-lane" style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}>
                {kinds.map((kind, i) => (
                  <div key={i} className="pb-[26px]">
                    <div className="flex w-60 flex-col gap-2 rounded-2xl bg-white px-4 py-3.5 shadow-[0_14px_28px_-16px_rgba(11,20,36,0.25)]">
                      {cards[kind]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
