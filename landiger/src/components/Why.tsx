'use client';

import { useEffect, useRef, useState, type ComponentType, type CSSProperties, type ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import Logo from './Logo';
import Reveal from './Reveal';
import Scaler from './Scaler';
import SectionHead from './SectionHead';

const shadowNote = 'shadow-[0_14px_24px_-12px_rgba(11,20,36,0.35)]';
const shadowChip = 'shadow-[0_10px_20px_-12px_rgba(11,20,36,0.35)]';

type BadgeProps = { bg: string; round?: boolean; count?: string; children: ReactNode };

function Badge({ bg, round, children, count }: BadgeProps) {
  return (
    <span
      className={`relative flex size-[30px] shrink-0 items-center justify-center text-xs font-extrabold text-white ${round ? 'rounded-full' : 'rounded-[7px]'}`}
      style={{ background: bg }}
    >
      {children}
      {count && (
        <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-[9px] bg-[#E5484D] px-1 text-[10px]">
          {count}
        </span>
      )}
    </span>
  );
}

// The "before" clutter. Each note has a desktop (1120 wide) and a mobile (400 wide) placement: [left, top, width, rotate].
type Placement = [left: number, top: number, width: number, rotate: number];
type Note = { desk: Placement; mob: Placement; cls: string; body: ReactNode };
type LayerProps = { mobile?: boolean };

const notes: Note[] = [
  {
    desk: [70, 60, 190, -6],
    mob: [14, 24, 170, -6],
    cls: `bg-[#FFE58A] ${shadowNote}`,
    body: (
      <div className="p-3.5 text-sm font-semibold leading-[1.45] text-[#4A3B12]">
        Chị Lan hẹn 14h hay 15h??
        <br />
        <span className="font-normal">→ hỏi lại qua Zalo</span>
      </div>
    ),
  },
  {
    desk: [300, 40, 250, 4],
    mob: [186, 14, 205, 4],
    cls: `bg-white ${shadowChip}`,
    body: (
      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <Badge bg="#1D6F42">X</Badge>
        <div className="min-w-0">
          <div className="truncate text-xs font-bold text-[#1F2937]">doanh_thu_T9_final_v3.xlsx</div>
          <div className="text-[10px] text-[#9A8F82]">Sửa lần cuối 3 ngày trước</div>
        </div>
      </div>
    ),
  },
  {
    desk: [610, 70, 210, -3],
    mob: [196, 112, 190, -3],
    cls: `bg-white ${shadowChip}`,
    body: (
      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <Badge bg="#0068FF" round count="23">
          Z
        </Badge>
        <div className="text-xs font-bold text-[#1F2937]">23 tin chưa trả lời</div>
      </div>
    ),
  },
  {
    desk: [840, 170, 200, 6],
    mob: [212, 205, 180, 6],
    cls: `bg-white ${shadowChip}`,
    body: (
      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <Badge bg="#1877F2" round count="12">
          f
        </Badge>
        <div className="text-xs font-bold text-[#1F2937]">Khách hỏi giá lúc 23h</div>
      </div>
    ),
  },
  {
    desk: [120, 230, 230, 3],
    mob: [18, 168, 190, 3],
    cls: `bg-white ${shadowNote}`,
    body: (
      <div
        className="px-4 py-3.5 text-xs leading-[2] text-[#6B5B45]"
        style={{ backgroundImage: 'linear-gradient(#E6DCC8 1px, transparent 1px)', backgroundSize: '100% 24px' }}
      >
        <b className="text-[#4A3B12]">Sổ lịch hẹn</b>
        <br />
        9h · Thảo · da
        <br />
        <s>11h · Minh</s> → 13h?
        <br />
        14h · Lan (chưa cọc)
      </div>
    ),
  },
  {
    desk: [430, 270, 220, -5],
    mob: [22, 330, 180, -5],
    cls: `bg-[#FFE0E0] ${shadowNote}`,
    body: (
      <div className="p-3.5 text-[13px] font-semibold leading-[1.45] text-[#7A1F1F]">
        Quên nhắc khách
        <br />→ khách không đến
      </div>
    ),
  },
  {
    desk: [700, 320, 230, 4],
    mob: [205, 296, 185, 4],
    cls: `bg-white ${shadowNote}`,
    body: (
      <div className="flex flex-col gap-1.5 px-3.5 py-3">
        <div className="text-[11px] font-bold text-[#9A8F82]">WEBSITE THUÊ NGOÀI</div>
        <div className="text-xs text-[#1F2937]">“Anh ơi sửa giúp em giá dịch vụ…”</div>
        <div className="text-[10px] font-bold text-[#D2493A]">Chờ phản hồi 5 ngày</div>
      </div>
    ),
  },
  {
    desk: [900, 40, 150, -8],
    mob: [236, 392, 150, -8],
    cls: `bg-[#DDF3E6] ${shadowNote}`,
    body: <div className="p-3 text-xs font-semibold leading-[1.45] text-[#1F5135]">Chuyển khoản cọc của ai đây??</div>,
  },
];

function Before({ mobile }: LayerProps) {
  return (
    <div className="relative h-[520px]" style={{ width: mobile ? 400 : 1120 }}>
      {!mobile && (
        <svg width="1120" height="520" viewBox="0 0 1120 520" className="absolute inset-0" aria-hidden="true">
          <g fill="none" stroke="#E5484D" strokeWidth="1.6" strokeDasharray="5 5" strokeOpacity="0.4">
            <path d="M190 150C300 240 180 320 330 360S520 210 610 300" />
            <path d="M420 120C520 60 600 200 700 150S860 260 780 380" />
            <path d="M140 380C260 330 380 460 520 420" />
          </g>
        </svg>
      )}
      {notes.map((n, i) => {
        const [left, top, width, rot] = mobile ? n.mob : n.desk;
        return (
          <div key={i} className={`absolute ${n.cls}`} style={{ left, top, width, transform: `rotate(${rot}deg)` }}>
            {n.body}
          </div>
        );
      })}
      <div className="absolute bottom-[22px] left-6 flex h-[34px] items-center gap-2 rounded-full bg-white px-3.5 text-xs font-extrabold tracking-[0.08em] text-[#7A1F1F] shadow-[0_8px_16px_-10px_rgba(11,20,36,0.4)]">
        <span className="size-[7px] rounded-full bg-[#E5484D]" />
        {mobile ? 'TRƯỚC · 5 CÔNG CỤ' : 'TRƯỚC · 5 CÔNG CỤ RỜI RẠC'}
      </div>
    </div>
  );
}

const hourLabels = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
type CalEvent = { top: number; h: number; name: string; svc: string; cls: string; note?: string; inverse?: boolean };

const calEvents: CalEvent[] = [
  { top: 2, h: 62, name: 'Chị Thảo', svc: 'Chăm sóc da', cls: 'bg-tint text-[#0B3AA8]' },
  {
    top: 178,
    h: 40,
    name: 'Anh Minh',
    svc: 'Gội dưỡng sinh',
    note: 'Đã dời từ 11:00',
    cls: 'bg-[#EEF0F4] text-[#2A3348]',
  },
  {
    top: 222,
    h: 62,
    name: 'Chị Lan',
    svc: 'Massage body',
    note: 'Đã cọc 100.000đ',
    cls: 'bg-brand text-white',
    inverse: true,
  },
  { top: 310, h: 40, name: 'Chị Hà', svc: 'Liệu trình buổi 3', cls: 'bg-tint text-[#0B3AA8]' },
];

function CalendarCard({ style, id }: { style: CSSProperties; id: string }) {
  return (
    <div
      className="absolute h-[476px] overflow-hidden rounded-[20px] bg-white px-5 pt-5 shadow-[0_40px_70px_-44px_rgba(11,20,36,0.45)]"
      style={style}
    >
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] font-semibold text-faint">Thứ Năm</div>
          <div className="text-[22px] font-extrabold tracking-[-0.01em]">24 tháng 9</div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-subtle">
          <Logo id={id} size={18} />
          SEN Spa
        </div>
      </div>
      <div className="relative mt-[18px] h-[396px]">
        {hourLabels.map((h, i) => (
          <div key={h} className="absolute left-0 flex w-full items-start gap-2" style={{ top: i * 44 }}>
            <span className="-mt-1.5 w-[34px] text-[10px] text-faint">{h}</span>
            <span className="grow border-t border-[#EEF1F6]" />
          </div>
        ))}
        {calEvents.map((e) => (
          <div
            key={e.name}
            className={`absolute left-[42px] right-0 overflow-hidden rounded-lg px-2.5 py-1.5 ${e.cls}`}
            style={{ top: e.top, height: e.h }}
          >
            <div className="text-xs font-bold">
              {e.name}{' '}
              <span className={`font-medium ${e.inverse ? 'text-white/80' : 'text-[#5B6478]'}`}>· {e.svc}</span>
            </div>
            {e.note && (
              <div className={`mt-0.5 text-[10px] ${e.inverse ? 'text-white/80' : 'text-[#5B6478]'}`}>{e.note}</div>
            )}
          </div>
        ))}
        <div className="absolute left-[34px] right-0 top-[106px] h-0 border-t-[1.5px] border-[#E5484D]">
          <span className="absolute -left-1 -top-[4.5px] size-[7px] rounded-full bg-[#E5484D]" />
        </div>
      </div>
    </div>
  );
}

const automations: [time: string, title: string, detail: string, badge: string][] = [
  ['07:00', 'Gửi 18 tin nhắc lịch qua Zalo', 'Không khách nào quên hẹn', 'Z'],
  ['08:12', 'Ghép 5 khoản tiền cọc', 'Tự khớp với đúng lịch hẹn', '₫'],
  ['09:40', 'Thêm 4 khách mới từ website', 'Hồ sơ tự tạo trong CRM', '+'],
  ['11:05', 'Cập nhật giá lên senspa.vn', 'Sửa một lần, web đổi ngay', 'W'],
  ['18:00', 'Chốt doanh thu 8.400.000đ', 'Không cần mở Excel', '↗'],
];

/** Fills the left side of the desktop "after" view: what Landiger did on its own today. */
function AutomationCard() {
  return (
    <div
      className="absolute flex h-[476px] flex-col rounded-[20px] bg-white p-5 shadow-[0_40px_70px_-44px_rgba(11,20,36,0.45)]"
      style={{ left: 40, top: 22, width: 440 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold text-faint">Tự động hôm nay</div>
          <div className="text-lg font-extrabold tracking-[-0.01em]">Landiger đã làm thay bạn</div>
        </div>
        <span className="rounded-full bg-[#E8F7EF] px-2.5 py-1 text-[11px] font-bold text-ok">5 việc · 0 lỗi</span>
      </div>
      <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0">
        {automations.map(([time, title, detail, badge]) => (
          <li key={time} className="flex items-center gap-3 rounded-xl bg-page px-3 py-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-tint text-[13px] font-extrabold text-brand">
              {badge}
            </span>
            <div className="min-w-0 grow">
              <div className="truncate text-[13px] font-bold">{title}</div>
              <div className="text-[11px] text-subtle">{detail}</div>
            </div>
            <span className="text-[11px] font-semibold text-faint">{time}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-between rounded-xl bg-brand px-4 py-3 text-white">
        <div>
          <div className="text-[11px] opacity-80">Thời gian bạn tiết kiệm</div>
          <div className="text-xl font-extrabold">~2 giờ mỗi ngày</div>
        </div>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M12 7v5l3 2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

const stats = [
  ['Tin nhắn Zalo', '0', 'tin chưa trả lời'],
  ['Thu chi hôm nay', '8.400.000đ', 'Tự cộng từ lịch hẹn'],
  ['Website', 'senspa.vn', 'Cập nhật giá 2 phút trước'],
];

function After({ mobile }: LayerProps) {
  return (
    <div className="relative h-[520px]" style={{ width: mobile ? 400 : 1120 }}>
      <div
        aria-hidden="true"
        className="absolute rounded-full bg-[radial-gradient(closest-side,rgba(0,75,236,0.12),rgba(0,75,236,0))]"
        style={mobile ? { left: 0, top: 20, width: 400, height: 480 } : { left: 0, top: 20, width: 1120, height: 480 }}
      />
      {!mobile && <AutomationCard />}
      <CalendarCard
        id={mobile ? 'wyA-m' : 'wyA'}
        style={mobile ? { left: 150, top: 22, width: 236 } : { left: 520, top: 22, width: 340 }}
      />
      {stats.map(([label, value, sub], i) => (
        <div
          key={label}
          className="absolute rounded-[18px] bg-white shadow-[0_24px_40px_-34px_rgba(11,20,36,0.45)]"
          style={
            mobile
              ? { left: 12, top: 22 + i * 150, width: 128, padding: 12 }
              : { left: 880, top: [22, 166, 310][i], width: 200, padding: 16 }
          }
        >
          <div className="text-[11px] font-semibold text-subtle">{label}</div>
          <div className={`mt-1.5 font-extrabold tracking-[-0.02em] ${mobile ? 'text-base' : 'text-[26px]'}`}>
            {value}
          </div>
          <div className="mt-0.5 text-[11px] text-subtle">{sub}</div>
        </div>
      ))}
      <div className="absolute bottom-[22px] right-6 flex h-[34px] items-center gap-2 rounded-full bg-ink px-3.5 text-xs font-extrabold tracking-[0.08em] text-white">
        <span className="size-[7px] rounded-full bg-sky" />
        {mobile ? 'VỚI LANDIGER' : 'VỚI LANDIGER · 1 WORKSPACE'}
      </div>
    </div>
  );
}

// Desktop artwork shrinks on short screens so the slider and its buttons fit in one viewport.
// Desktop and mobile compositions are both rendered; CSS shows the right one (no layout flash on load).
function Stage({ Layer }: { Layer: ComponentType<LayerProps> }) {
  return (
    <>
      <div className="mx-auto hidden max-w-[clamp(640px,calc((100vh-380px)*2.15),960px)] px-4 md:block">
        <Scaler width={1120} height={520}>
          <Layer />
        </Scaler>
      </div>
      <div className="px-2 md:hidden">
        <Scaler width={400} height={520}>
          <Layer mobile />
        </Scaler>
      </div>
    </>
  );
}

const views: [label: string, pos: number][] = [
  ['Trước', 96],
  ['So sánh', 46],
  ['Sau khi dùng Landiger', 4],
];

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

export default function Why() {
  const [pos, setPos] = useState(46);
  const posRef = useRef(46);
  const frame = useRef(0);
  const [bandRef, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });

  const setBoth = (v: number) => {
    posRef.current = v;
    setPos(v);
  };

  // Tween the handle through the given stops, e.g. [25, 46] for a nudge.
  const animateTo = (stops: number[], msPerStop = 700) => {
    cancelAnimationFrame(frame.current);
    let from = posRef.current;
    let i = 0;
    let start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / msPerStop);
      setBoth(Math.round((from + (stops[i] - from) * easeInOut(t)) * 10) / 10);
      if (t < 1) {
        frame.current = requestAnimationFrame(step);
      } else if (++i < stops.length) {
        from = stops[i - 1];
        start = now;
        frame.current = requestAnimationFrame(step);
      }
    };
    frame.current = requestAnimationFrame(step);
  };

  // First time the comparison scrolls into view, nudge the handle so visitors see it can be dragged.
  useEffect(() => {
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setTimeout(() => animateTo([28, 62, 46], 650), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const nearest = views.reduce((a, b) => (Math.abs(b[1] - pos) < Math.abs(a[1] - pos) ? b : a));

  return (
    <section id="tai-sao" className="relative pb-12 pt-10 lg:pb-14 lg:pt-12">
      <Reveal className="px-4">
        <SectionHead
          eyebrow="VÌ SAO LÀ LANDIGER"
          title="Bớt rối việc,"
          accent="thêm thời gian cho khách"
          sub="Kéo thanh ở giữa để thấy một ngày làm việc thay đổi thế nào khi mọi thứ về một chỗ."
        />
      </Reveal>

      <Reveal delay={150}>
        <div ref={bandRef} className="relative mt-6 overflow-hidden border-y border-[#E1E7F1] md:mt-8">
          {/* Before */}
          <div
            className="py-2.5"
            style={{
              backgroundColor: '#E3E8F0',
              backgroundImage: 'radial-gradient(#C3CCDA 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          >
            <Stage Layer={Before} />
          </div>

          {/* After, revealed from the handle to the right */}
          <div
            className="absolute inset-0 py-2.5"
            style={{
              clipPath: `inset(0 0 0 ${pos}%)`,
              backgroundColor: '#F4F6FA',
              backgroundImage:
                'linear-gradient(#E6EBF3 1px, transparent 1px), linear-gradient(90deg, #E6EBF3 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          >
            <Stage Layer={After} />
          </div>

          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0" style={{ left: `${pos}%` }}>
            <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,75,236,0.25)]" />
            <div className="absolute -left-[22px] top-1/2 -mt-[22px] flex size-11 items-center justify-center rounded-full bg-brand shadow-[0_0_0_6px_rgba(255,255,255,0.8),0_14px_26px_-8px_rgba(0,75,236,0.6)] md:-left-[26px] md:-mt-[26px] md:size-[52px]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
              </svg>
            </div>
          </div>

          <label htmlFor="wy-range" className="sr-only">
            Kéo để so sánh trước và sau khi dùng Landiger
          </label>
          <input
            id="wy-range"
            type="range"
            min="4"
            max="96"
            step="any"
            value={pos}
            onChange={(e) => {
              cancelAnimationFrame(frame.current);
              setBoth(Number(e.target.value));
            }}
            className="absolute inset-0 m-0 size-full cursor-ew-resize opacity-0"
            style={{ touchAction: 'pan-y' }}
          />
        </div>

        {/* Quick views: jump the handle instead of dragging */}
        <div className="mt-4 flex justify-center px-4">
          <div role="group" aria-label="Chế độ xem" className="flex rounded-xl bg-[#E6ECF6] p-[3px]">
            {views.map(([label, target]) => {
              const on = nearest[1] === target;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => animateTo([target])}
                  className={`h-9 cursor-pointer rounded-[9px] border-0 px-3 text-[13px] font-semibold transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-4 sm:text-sm ${
                    on ? 'bg-white text-brand shadow-[0_1px_3px_rgba(11,20,36,0.12)]' : 'bg-transparent text-subtle'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

    </section>
  );
}
