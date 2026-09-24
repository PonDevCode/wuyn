import Image from 'next/image';
import senspa from '@/assets/senspa.png';

const soft = 'shadow-card';

type MenuItem = {
  label: string;
  d: string;
  circle?: boolean;
  person?: boolean;
  /** x, y, width, height, radius */
  rect?: [number, number, number, number, number];
  badge?: string;
};

const menu: MenuItem[] = [
  { label: 'Website', d: 'M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18', circle: true },
  { label: 'Lịch hẹn', d: 'M3 10h18M8 3v4M16 3v4', rect: [3, 5, 18, 16, 3], badge: '12' },
  { label: 'Khách hàng', d: 'M2 21a7 7 0 0 1 14 0M16 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3', person: true },
  { label: 'Đơn hàng', d: 'M5 7h14l-1 13H6zM9 7a3 3 0 0 1 6 0' },
  { label: 'Marketing', d: 'M3 11l15-6v14L3 13zM7 13v5a2 2 0 0 0 4 0v-3.5' },
  { label: 'Nhân viên', d: 'M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2', rect: [3, 7, 18, 13, 2] },
];

const appointments = [
  {
    time: '09:30',
    init: 'T',
    bg: '#F4E3E7',
    fg: '#9E2A4B',
    name: 'Chị Thảo',
    desc: 'Chăm sóc da · KTV Mai',
    status: 'Đã xác nhận',
  },
  {
    time: '11:00',
    init: 'M',
    bg: '#E3EBF7',
    fg: '#1E4E8C',
    name: 'Anh Minh',
    desc: 'Gội dưỡng sinh · KTV Hằng',
    status: 'Đã xác nhận',
  },
  {
    time: '14:30',
    init: 'L',
    bg: '#F6EBD9',
    fg: '#7A4A0B',
    name: 'Chị Lan',
    desc: 'Massage body · từ website',
    status: 'Đã cọc',
    isNew: true,
  },
];

function MenuIcon({ item }: { item: MenuItem }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {item.circle && <circle cx="12" cy="12" r="9" stroke="#4B5059" strokeWidth="2" />}
      {item.person && <circle cx="9" cy="8" r="4" stroke="#4B5059" strokeWidth="2" />}
      {item.rect && (
        <rect
          x={item.rect[0]}
          y={item.rect[1]}
          width={item.rect[2]}
          height={item.rect[3]}
          rx={item.rect[4]}
          stroke="#4B5059"
          strokeWidth="2"
        />
      )}
      <path d={item.d} stroke="#4B5059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const flowPath = 'M217 70H458Q470 70 470 82V121';

/** 660×620 illustration: website → booking form → workspace dashboard. */
export default function HeroDashboard() {
  return (
    <div className="relative h-[620px] w-[660px]">
      <svg
        width="760"
        height="640"
        viewBox="-80 -20 760 640"
        className="absolute -left-20 -top-5 overflow-visible"
        aria-hidden="true"
      >
        <path d={flowPath} stroke="#BCC6D6" strokeWidth="1.4" strokeDasharray="3 4" fill="none" />
        <circle cx="217" cy="70" r="3" fill="#0B1424" />
        <circle cx="470" cy="121" r="3" fill="#0B1424" />
        <circle r="8" fill="#0095FE" fillOpacity="0.18">
          <animateMotion dur="3s" repeatCount="indefinite" path={flowPath} />
        </circle>
        <circle r="3.5" fill="#0095FE">
          <animateMotion dur="3s" repeatCount="indefinite" path={flowPath} />
        </circle>
      </svg>

      {/* App window */}
      <div className="absolute left-[47px] top-[121px] flex h-[430px] w-[590px] flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_40px_80px_-30px_rgba(11,20,36,0.28),0_2px_6px_rgba(11,20,36,0.04)]">
        <div className="flex h-10 shrink-0 items-center gap-[7px] border-b border-[#EEF0F2] bg-[#FBFBFC] px-4">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-[#E3E5E9]" />
          ))}
          <div className="mx-auto flex h-6 items-center gap-1.5 rounded-md bg-[#F1F2F4] px-3 text-[11px] text-[#6B6F78]">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="#6B6F78" strokeWidth="2.4" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#6B6F78" strokeWidth="2.4" />
            </svg>
            app.landiger.com
          </div>
          <div className="w-11" />
        </div>

        <div className="flex min-h-0 grow">
          {/* Sidebar */}
          <div className="flex w-[158px] shrink-0 flex-col gap-0.5 border-r border-[#EEF0F2] bg-[#FBFBFC] px-2.5 py-3 text-xs text-[#4B5059]">
            <div className={`mb-2 flex items-center gap-2 rounded-[10px] bg-white p-1.5 ${soft}`}>
              <div className="flex size-6 items-center justify-center rounded-[7px] bg-[#F4E3E7] text-[10px] font-bold text-[#9E2A4B]">
                HS
              </div>
              <div className="grow text-[11px] font-semibold text-ink">SEN Spa</div>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 9l5-5 5 5M7 15l5 5 5-5"
                  stroke="#6B6F78"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-ink px-2 py-[7px] font-semibold text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
              Tổng quan
            </div>
            {menu.map((m) => (
              <div key={m.label} className="flex items-center gap-2 px-2 py-[7px]">
                <MenuIcon item={m} />
                {m.label}
                {m.badge && (
                  <span className="ml-auto rounded-full bg-[#EDEEF0] px-1.5 py-px text-[10px] font-semibold">
                    {m.badge}
                  </span>
                )}
              </div>
            ))}
            <div className="mt-auto rounded-[10px] bg-[#F1F2F4] p-2.5 text-[10px] leading-[1.4]">
              <div className="mb-0.5 font-bold text-ink">Gói Pro</div>
              Còn 18 ngày dùng thử
            </div>
          </div>

          {/* Main */}
          <div className="relative flex min-w-0 grow flex-col gap-3 px-[18px] py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[15px] font-bold">Chào buổi sáng, Hà</div>
                <div className="text-[11px] text-[#6B6F78]">Thứ 5, 24/09 · 3 lịch hẹn chưa xử lý</div>
              </div>
              <div className="flex gap-1.5">
                <div className={`flex size-7 items-center justify-center rounded-lg ${soft}`}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" stroke="#4B5059" strokeWidth="2.2" />
                    <path d="M20 20l-4-4" stroke="#4B5059" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex h-7 items-center rounded-lg bg-ink px-2.5 text-[11px] font-semibold text-white">
                  + Lịch hẹn
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className={`rounded-[10px] px-3 py-2.5 ${soft}`}>
                <div className="text-[10px] text-[#6B6F78]">Lịch hẹn</div>
                <div className="text-xl font-bold leading-[1.3]">12</div>
                <div className="text-[10px] font-semibold text-ok">+3 so với hôm qua</div>
              </div>
              <div className={`rounded-[10px] px-3 py-2.5 ${soft}`}>
                <div className="text-[10px] text-[#6B6F78]">Khách mới</div>
                <div className="text-xl font-bold leading-[1.3]">5</div>
                <div className="text-[10px] text-[#6B6F78]">4 từ website</div>
              </div>
              <div className={`flex flex-col rounded-[10px] px-3 py-2.5 ${soft}`}>
                <div className="text-[10px] text-[#6B6F78]">Doanh thu</div>
                <div className="flex items-end justify-between">
                  <div className="text-xl font-bold leading-[1.3]">8,4tr</div>
                  <div className="flex h-[22px] items-end gap-0.5 pb-1">
                    {[8, 12, 9, 15, 13, 18].map((h, i) => (
                      <span
                        key={i}
                        className={`w-1 rounded-[1px] ${i === 5 ? 'bg-ink' : 'bg-[#D5D7DC]'}`}
                        style={{ height: h }}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-[10px] font-semibold text-ok">+12% tuần này</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-ink">Lịch hẹn sắp tới</div>
              <div className="text-[11px] text-[#6B6F78]">Xem tất cả</div>
            </div>
            <div className={`flex flex-col rounded-[10px] text-xs ${soft}`}>
              {appointments.map((a, i) => (
                <div
                  key={a.time}
                  className={`flex items-center gap-2.5 px-3 py-[9px] ${
                    i < 2 ? 'border-b border-[#EEF0F2]' : 'bg-[#FFFBF3]'
                  }`}
                >
                  <span className="w-[38px] font-bold">{a.time}</span>
                  <span
                    className="flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{ background: a.bg, color: a.fg }}
                  >
                    {a.init}
                  </span>
                  <span className="grow leading-[1.3]">
                    <span className="block font-semibold">
                      {a.name}{' '}
                      {a.isNew && (
                        <span className="rounded bg-ink px-[5px] py-px text-[9px] font-semibold text-white">MỚI</span>
                      )}
                    </span>
                    <span className="text-[10px] text-[#6B6F78]">{a.desc}</span>
                  </span>
                  <span className="rounded-full bg-[#E8F7EF] px-2 py-[3px] text-[10px] font-semibold text-ok">
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-[252px] top-[58px] flex h-6 items-center whitespace-nowrap rounded-full bg-ink px-2.5 text-[10px] font-semibold tracking-[0.06em] text-white">
        FORM ĐẶT LỊCH → WORKSPACE
      </div>

      {/* Floating: website card */}
      <div className="absolute -left-[15px] top-[31px] flex w-[232px] animate-float flex-col gap-[9px] rounded-[14px] bg-white p-2.5 shadow-[0_20px_40px_-16px_rgba(11,20,36,0.22)]">
        <Image
          src={senspa}
          alt="Website SEN Spa"
          sizes="232px"
          className="block h-[110px] w-full rounded-lg object-cover object-top"
        />
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#6B6F78]">senspa.vn</span>
          <span className="flex items-center gap-[5px] text-[11px] font-semibold text-ok">
            <span className="size-1.5 rounded-full bg-sky" />
            Đã xuất bản
          </span>
        </div>
      </div>

      {/* Floating: new customer notification */}
      <div
        className="absolute -right-[3px] bottom-[39px] flex w-[296px] animate-float flex-col gap-2.5 rounded-[14px] bg-white px-4 py-3.5 shadow-[0_24px_48px_-16px_rgba(11,20,36,0.26)]"
        style={{ animationDelay: '-3s' }}
      >
        <div className="flex items-start gap-3">
          <div className="flex size-[34px] shrink-0 items-center justify-center rounded-[10px] bg-ink">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M19 8v6M22 11h-6"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex grow flex-col gap-[3px]">
            <div className="flex justify-between">
              <span className="text-[13px] font-bold">Khách mới từ website</span>
              <span className="text-[10px] text-[#9CA0A8]">vừa xong</span>
            </div>
            <div className="text-xs leading-normal text-[#5B5F68]">Chị Lan đặt lịch 14:30 — đã tự thêm vào CRM.</div>
          </div>
        </div>
        <div className="flex gap-1.5 pl-[46px] text-[10px] font-semibold">
          <span className="flex h-[22px] items-center rounded-md bg-[#E8F7EF] px-2 text-ok">✓ Đã gửi nhắc Zalo</span>
          <span className="flex h-[22px] items-center rounded-md bg-[#F1F2F4] px-2 text-[#4B5059]">
            Link cọc 100.000đ
          </span>
        </div>
      </div>

      {/* Floating: reminder pill */}
      <div
        className="absolute left-[38px] top-[568px] flex h-10 animate-float items-center gap-2 rounded-full bg-white px-3.5 text-xs font-semibold shadow-[0_12px_28px_-12px_rgba(11,20,36,0.2)]"
        style={{ animationDelay: '-2s' }}
      >
        <span className="relative size-[7px] rounded-full bg-sky">
          <span className="absolute inset-0 animate-ping-dot rounded-full bg-sky" />
        </span>
        Tự động nhắc lịch · 24/7
      </div>
    </div>
  );
}
