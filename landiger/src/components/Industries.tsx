'use client';

import { useState } from 'react';
import Image from 'next/image';
import senspa from '@/assets/senspa.png';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import { icons } from './industries-data';

type Industry = {
  key: string;
  tab: string;
  title: string;
  tint: string;
  icon: string;
  chip: string;
  bullets: string[];
  /** Mock schedule shown for non-spa industries */
  head?: string;
  rows?: [string, string, string][];
};

const data: Industry[] = [
  {
    key: 'spa',
    tab: 'Spa & Beauty',
    title: 'Lĩnh vực Spa & Beauty',
    tint: '#FBEFF3',
    icon: icons.spa,
    chip: 'Website mẫu: SEN Spa',
    bullets: [
      'Khách tự đặt lịch theo liệu trình và kỹ thuật viên',
      'Nhắc lịch và nhắc liệu trình tiếp theo qua Zalo',
      'Quản lý thẻ liệu trình, combo và tiền cọc',
      'Doanh thu theo từng dịch vụ, từng nhân viên',
    ],
  },
  {
    key: 'salon',
    tab: 'Salon tóc',
    title: 'Lĩnh vực Salon tóc',
    tint: '#F3EFFD',
    icon: icons.salon,
    chip: 'Nhắc quay lại: 18 khách',
    head: 'Lịch thợ hôm nay',
    rows: [
      ['10:00', 'Thợ Minh · Cắt + nhuộm', 'Đã đặt'],
      ['11:30', 'Thợ Hằng · Uốn phồng', 'Đã đặt'],
      ['14:00', 'Thợ Minh · Cắt nam', 'Trống'],
    ],
    bullets: [
      'Khách đặt lịch theo thợ, xem giờ trống',
      'Lưu lịch sử kiểu tóc, màu nhuộm từng khách',
      'Tự tính hoa hồng cho thợ',
      'Nhắc khách quay lại sau 4–6 tuần',
    ],
  },
  {
    key: 'fit',
    tab: 'Fitness & Yoga',
    title: 'Lĩnh vực Fitness & Yoga',
    tint: '#EEF4FD',
    icon: icons.fitness,
    chip: 'Sắp hết gói: 7 học viên',
    head: 'Lớp hôm nay',
    rows: [
      ['06:30', 'Yoga cơ bản · 12/15 chỗ', 'Còn chỗ'],
      ['18:00', 'HIIT · 20/20 chỗ', 'Đã đầy'],
      ['19:30', 'Pilates · 8/12 chỗ', 'Còn chỗ'],
    ],
    bullets: [
      'Học viên đăng ký lớp, giữ chỗ online',
      'Quản lý gói tập và số buổi còn lại',
      'Check-in học viên, lịch huấn luyện viên',
      'Nhắc gia hạn khi gói sắp hết',
    ],
  },
  {
    key: 'clinic',
    tab: 'Phòng khám',
    title: 'Lĩnh vực Phòng khám',
    tint: '#EBF8F3',
    icon: icons.clinic,
    chip: 'Nhắc tái khám: 24 bệnh nhân',
    head: 'Lịch khám sáng nay',
    rows: [
      ['08:00', 'BS. An · Nha khoa', 'Đã đến'],
      ['09:15', 'BS. Bình · Da liễu', 'Đã xác nhận'],
      ['10:30', 'BS. An · Nha khoa', 'Chờ xác nhận'],
    ],
    bullets: [
      'Đặt lịch khám theo bác sĩ, chuyên khoa',
      'Hồ sơ bệnh nhân và lịch sử khám',
      'Tự động nhắc tái khám',
      'Thu phí, tiền cọc và báo cáo doanh thu',
    ],
  },
  {
    key: 'edu',
    tab: 'Giáo dục',
    title: 'Lĩnh vực Giáo dục',
    tint: '#FDF6E6',
    icon: icons.education,
    chip: 'Form tuyển sinh: đang mở',
    head: 'Đăng ký mới tuần này',
    rows: [
      ['T2', 'Anh Tuấn · IELTS 6.5', 'Đã tư vấn'],
      ['T3', 'Chị Ngọc · Giao tiếp', 'Đã đóng phí'],
      ['T4', 'Bạn Khoa · IELTS 7.0', 'Mới'],
    ],
    bullets: [
      'Trang tuyển sinh và form đăng ký học',
      'Quản lý lớp, học viên và lịch học',
      'Nhắc học phí, lịch học qua Zalo',
      'Theo dõi tỷ lệ đăng ký theo từng kênh',
    ],
  },
  {
    key: 'fnb',
    tab: 'F&B',
    title: 'Lĩnh vực F&B – Nhà hàng',
    tint: '#FDEEEB',
    icon: icons.fnb,
    chip: 'Khách thân thiết: 312 thành viên',
    head: 'Đặt bàn tối nay',
    rows: [
      ['18:30', 'Bàn 4 người · Anh Duy', 'Đã cọc'],
      ['19:00', 'Bàn 8 người · Công ty A', 'Đã xác nhận'],
      ['19:45', 'Bàn 2 người · Chị My', 'Mới'],
    ],
    bullets: [
      'Website menu và đặt bàn online',
      'Nhận đơn mang đi, thanh toán trước',
      'Chương trình khách thân thiết',
      'Báo cáo món bán chạy theo ngày',
    ],
  },
];

// Fades the preview out on all four edges (stronger left/right) so it blends into the page instead of sitting in a frame.
const edgeFade = {
  maskImage:
    'linear-gradient(90deg, transparent, #000 16%, #000 84%, transparent), linear-gradient(180deg, transparent, #000 12%, #000 88%, transparent)',
  WebkitMaskImage:
    'linear-gradient(90deg, transparent, #000 16%, #000 84%, transparent), linear-gradient(180deg, transparent, #000 12%, #000 88%, transparent)',
  maskComposite: 'intersect',
  WebkitMaskComposite: 'source-in',
} as const;

function Icon({ d, size, color, width = 2.8 }: { d: string; size: number; color: string; width?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d={d} stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Industries() {
  const [active, setActive] = useState(0);
  const cur = data[active];

  return (
    <section id="theo-nganh" className="relative px-4 pb-16 pt-14 sm:px-8 lg:pb-[54px] lg:pt-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_55%,rgba(0,75,236,0.07),rgba(0,75,236,0))]"
      />
      <Reveal className="relative">
        <SectionHead
          eyebrow="GIẢI PHÁP THEO NGÀNH"
          title="Nền tảng toàn diện"
          accent="cho từng ngành dịch vụ"
          sub="Mỗi ngành một cách vận hành. Landiger có sẵn công cụ phù hợp để bạn bắt đầu ngay."
        />
      </Reveal>

      <Reveal delay={150} className="relative">
        {/* Scrolls sideways on phones instead of wrapping */}
        <div
          role="tablist"
          aria-label="Chọn ngành"
          className="relative -mx-4 mt-8 flex gap-2.5 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mt-10 md:justify-center [&::-webkit-scrollbar]:hidden"
        >
          {data.map((x, i) => {
            const on = i === active;
            return (
              <button
                key={x.key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`h-11 shrink-0 cursor-pointer whitespace-nowrap rounded-xl border px-5 text-sm font-bold transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:h-12 sm:px-6 sm:text-[15px] ${
                  on
                    ? 'border-[#B9CCF4] bg-tint text-brand'
                    : 'border-[#E3E9F2] bg-white/85 text-ink shadow-[0_1px_2px_rgba(11,20,36,0.05)] backdrop-blur-sm hover:border-[#B9CCF4] hover:bg-white'
                }`}
              >
                {x.tab}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          className="relative mx-auto mt-4 flex max-w-[1120px] flex-col lg:mt-5 lg:h-[440px] lg:flex-row lg:gap-12"
        >
          <div
            key={cur.key}
            className="relative h-[300px] shrink-0 animate-rise [--frame-h:300px] sm:h-[360px] sm:[--frame-h:360px] lg:h-[440px] lg:w-1/2 lg:[--frame-h:440px]"
          >
            <div className="absolute inset-0 overflow-hidden" style={{ background: cur.tint, ...edgeFade }}>
              {cur.key === 'spa' && (
                <Image
                  src={senspa}
                  alt="Website mẫu SEN Spa"
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="absolute left-0 top-0 block h-auto w-full animate-page-scroll [animation-duration:18s]"
                />
              )}
            </div>
            {cur.key !== 'spa' && (
              <>
                <div className="absolute inset-x-[10%] top-6 flex flex-col gap-3 rounded-[18px] bg-white p-4 shadow-[0_24px_40px_-24px_rgba(11,20,36,0.35)] sm:top-10 sm:p-[18px]">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex size-9 items-center justify-center rounded-[10px]"
                      style={{ background: cur.tint }}
                    >
                      <Icon d={cur.icon} size={22} color="#004BEC" />
                    </div>
                    <span className="text-[15px] font-extrabold">{cur.head}</span>
                  </div>
                  {cur.rows?.map(([a, b, c]) => (
                    <div key={a} className="flex items-center gap-3 rounded-xl bg-page px-3 py-[11px] text-[13px]">
                      <b className="w-[46px] shrink-0">{a}</b>
                      <span className="min-w-0 grow text-[#2A3348]">{b}</span>
                      <span className="shrink-0 rounded-md bg-tint px-2 py-[3px] text-[11px] font-bold text-brand">
                        {c}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-[26px] right-[10%] flex size-20 -rotate-[8deg] items-center justify-center rounded-3xl bg-gradient-to-br from-sky to-brand shadow-[0_24px_36px_-16px_rgba(0,75,236,0.55)] sm:size-24 sm:rounded-[28px]">
                  <Icon d={cur.icon} size={52} color="#FFFFFF" width={2.6} />
                </div>
              </>
            )}
            <div className="absolute bottom-5 left-[10%] flex h-8 items-center gap-2 rounded-full bg-ink px-3 text-xs font-semibold text-white">
              <span className="size-1.5 rounded-full bg-sky" />
              {cur.chip}
            </div>
          </div>

          <div
            key={`${cur.key}-text`}
            className="flex grow animate-rise flex-col justify-center gap-4 px-2 py-6 sm:px-8 lg:py-[30px] lg:pl-0 lg:pr-4"
          >
            <div className="text-xl font-extrabold sm:text-2xl">{cur.title}</div>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {cur.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm leading-normal text-[#2A3348] sm:text-[15px]">
                  <span className="mt-px flex size-[22px] shrink-0 items-center justify-center rounded-[7px] bg-tint">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M5 12.5l4.5 4.5L19.5 6.5"
                        stroke="#004BEC"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2.5">
              <div className="text-sm font-bold">Thương hiệu tin dùng</div>
              <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex h-11 items-center justify-center rounded-[10px] border border-dashed border-[#C9D4E6] text-[10px] font-semibold text-[#8A94A8] sm:w-[110px]"
                  >
                    [LOGO KHÁCH]
                  </div>
                ))}
              </div>
            </div>
            <a
              href="#"
              className="flex h-[50px] items-center justify-center gap-2.5 rounded-xl bg-brand px-6 text-[15px] font-bold text-white shadow-[0_14px_26px_-12px_rgba(0,75,236,0.55)] hover:text-white sm:self-start"
            >
              Xem mẫu cho ngành này <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
