import Image from 'next/image';
import senspa from '@/assets/senspa.png';

const soft = 'shadow-[0_1px_2px_rgba(11,20,36,0.05),0_14px_30px_-16px_rgba(11,20,36,0.25)]';
const popCard = 'animate-pop rounded-[14px] bg-white shadow-[0_18px_30px_-14px_rgba(11,20,36,0.35)]';

function WebsitePanel() {
  return (
    <div className="relative size-full overflow-hidden bg-[#F4F1EC]">
      <Image
        src={senspa}
        alt="Website mẫu SEN Spa làm trên Landiger"
        sizes="(max-width: 1024px) 100vw, 620px"
        className="block h-auto w-full animate-page-scroll"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[70px] bg-gradient-to-b from-[#F4F1EC]/0 to-[#F4F1EC]/90"
      />
      <div className="absolute bottom-[18px] right-[18px] flex h-7 animate-pop items-center gap-[7px] rounded-full bg-ink px-3 text-[11px] font-semibold text-white shadow-[0_12px_22px_-10px_rgba(11,20,36,0.5)]">
        <span className="size-1.5 rounded-full bg-[#3DDC97]" />
        Đã xuất bản · senspa.vn
      </div>
    </div>
  );
}

const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const hours = ['9:00', '11:00', '13:00', '15:00', '17:00', '19:00'];
// [day index, top, height, name, highlighted]
const events: [day: number, top: number, height: number, name: string, highlighted?: boolean][] = [
  [0, 31, 90, 'Chị Thảo'],
  [0, 175, 90, 'Anh Tú'],
  [1, 79, 42, 'Chị Mai'],
  [2, 31, 138, 'Anh Minh'],
  [3, 79, 90, 'Chị Lan', true],
  [3, 223, 42, 'Chị Hà'],
  [4, 127, 90, 'Chị Vy'],
  [5, 31, 42, 'Anh Khoa'],
  [5, 175, 90, 'Chị Ngân'],
];

function BookingPanel() {
  return (
    <div className="relative flex size-full flex-col gap-3 bg-white p-[18px]">
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-extrabold">Lịch hẹn tuần này</span>
        <span className="rounded-lg bg-ink px-2.5 py-[5px] text-[11px] font-bold text-white">+ Lịch hẹn</span>
      </div>
      <div className={`relative grow overflow-hidden rounded-xl ${soft}`}>
        <div className="absolute left-[42px] right-0 top-0 flex h-7 border-b border-[#E6EBF3]">
          {days.map((d) => (
            <div
              key={d}
              className={`flex flex-1 items-center justify-center text-[10px] font-bold ${d === 'T5' ? 'text-brand' : 'text-subtle'}`}
            >
              {d}
            </div>
          ))}
        </div>
        {hours.map((h, i) => (
          <div key={h}>
            <div className="absolute left-0 w-[42px] pt-1 text-center text-[9px] text-faint" style={{ top: 28 + i * 48 }}>
              {h}
            </div>
            <div className="absolute left-[42px] right-0 border-t border-dashed border-[#EEF1F6]" style={{ top: 28 + i * 48 }} />
          </div>
        ))}
        {events.map(([day, top, height, name, hl]) => (
          <div
            key={name}
            className={`absolute rounded-lg px-[7px] py-1.5 text-[10px] font-bold ${
              hl ? 'animate-pop bg-brand text-white' : 'bg-tint text-[#0B3AA8]'
            }`}
            style={{
              left: `calc(42px + (100% - 42px) / 6 * ${day} + 3px)`,
              width: 'calc((100% - 42px) / 6 - 6px)',
              top,
              height,
            }}
          >
            {name}
          </div>
        ))}
      </div>
      <div className={`absolute bottom-[26px] right-4 flex w-[230px] flex-col gap-[7px] px-3 py-[11px] ${popCard}`}>
        <div className="flex items-center gap-[7px]">
          <span className="flex size-[18px] items-center justify-center rounded-[5px] bg-zalo text-[9px] font-extrabold text-white">
            Z
          </span>
          <span className="text-[11px] font-bold">Zalo OA · tự động</span>
        </div>
        <div className="rounded-[3px_10px_10px_10px] bg-[#F1F4F9] px-[9px] py-[7px] text-[11px] leading-[1.45]">
          Chị Lan ơi, SEN Spa nhắc lịch 14:30 hôm nay ạ.
        </div>
      </div>
    </div>
  );
}

const bars = [68, 104, 82, 132, 116, 160, 192];
const barDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

function CustomersPanel() {
  return (
    <div className="relative flex size-full gap-3.5 bg-white p-[18px]">
      <div className={`flex w-[200px] shrink-0 flex-col gap-3 rounded-[14px] p-4 sm:w-[220px] ${soft}`}>
        <div className="flex items-center gap-2.5">
          <span className="flex size-[42px] items-center justify-center rounded-full bg-tint text-base font-extrabold text-brand">
            L
          </span>
          <div>
            <div className="text-sm font-extrabold">Chị Lan</div>
            <div className="text-[11px] text-subtle">Khách từ website</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-[9px] bg-page p-2">
            <div className="text-[10px] text-subtle">Lần đến</div>
            <div className="text-base font-extrabold">6</div>
          </div>
          <div className="rounded-[9px] bg-page p-2">
            <div className="text-[10px] text-subtle">Chi tiêu</div>
            <div className="text-base font-extrabold">2,1tr</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-[5px]">
          {['Khách thân', 'Massage', 'Hay đặt tối'].map((t) => (
            <span key={t} className="rounded-md bg-tint px-2 py-[3px] text-[10px] font-bold text-[#0B3AA8]">
              {t}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-[7px] text-[11px] text-muted">
          {[
            ['Massage body', '24/09'],
            ['Chăm sóc da', '10/09'],
            ['Massage body', '28/08'],
          ].map(([s, d]) => (
            <div key={d} className="flex justify-between">
              <span>{s}</span>
              <span className="text-faint">{d}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={`flex min-w-0 grow flex-col gap-1.5 rounded-[14px] p-4 ${soft}`}>
        <div className="text-[11px] text-subtle">Doanh thu tuần</div>
        <div className="flex items-baseline gap-2">
          <span className="text-[30px] font-extrabold">8,4tr</span>
          <span className="text-xs font-bold text-ok">+12%</span>
        </div>
        <div className="flex grow items-end gap-2.5 pt-2.5">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className="w-full origin-bottom animate-grow rounded-[7px]"
                style={{
                  height: h,
                  animationDelay: `${i * 0.06}s`,
                  background: i === 6 ? 'linear-gradient(180deg, #0095FE, #004BEC)' : '#DCE6F8',
                }}
              />
              <span className="text-[10px] text-faint">{barDays[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RetentionPanel() {
  return (
    <div className="relative flex size-full gap-3.5 bg-white p-[18px]">
      <div className={`flex grow flex-col gap-3 rounded-[14px] p-4 ${soft}`}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[15px] font-extrabold">Chiến dịch: Mời khách quay lại</span>
          <span className="shrink-0 rounded-md bg-[#E8F7EF] px-2 py-[3px] text-[10px] font-bold text-ok">Đang chạy</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="text-[10px] font-bold tracking-[0.1em] text-subtle">GỬI ĐẾN</div>
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-lg bg-tint px-2.5 py-[5px] text-[11px] font-bold text-[#0B3AA8]">
              Chưa quay lại 30 ngày
            </span>
            <span className="rounded-lg bg-page px-2.5 py-[5px] text-[11px] font-semibold text-muted">48 khách</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="text-[10px] font-bold tracking-[0.1em] text-subtle">TIN NHẮN ZALO</div>
          <div className="rounded-[4px_12px_12px_12px] bg-[#F1F4F9] px-3 py-2.5 text-xs leading-normal">
            Lâu rồi chưa gặp chị! SEN Spa tặng chị ưu đãi cho lần massage tiếp theo. Đặt lịch tại senspa.vn nhé.
          </div>
        </div>
        <div className="mt-auto grid grid-cols-3 gap-2">
          <div className="rounded-[10px] bg-page p-2.5">
            <div className="text-[10px] text-subtle">Đã gửi</div>
            <div className="text-lg font-extrabold">48</div>
          </div>
          <div className="rounded-[10px] bg-page p-2.5">
            <div className="text-[10px] text-subtle">Đã xem</div>
            <div className="text-lg font-extrabold">31</div>
          </div>
          <div className="rounded-[10px] bg-brand p-2.5 text-white">
            <div className="text-[10px] opacity-80">Đặt lại lịch</div>
            <div className="text-lg font-extrabold">9</div>
          </div>
        </div>
      </div>
      <div className={`absolute right-4 top-[70px] flex w-[200px] items-center gap-2.5 px-3 py-[11px] ${popCard}`}>
        <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-tint text-xs font-extrabold text-brand">
          T
        </span>
        <div>
          <div className="text-xs font-bold">Chị Thảo vừa đặt lại</div>
          <div className="text-[10px] text-subtle">Từ chiến dịch · 2 phút trước</div>
        </div>
      </div>
    </div>
  );
}

export const panels = [WebsitePanel, BookingPanel, CustomersPanel, RetentionPanel];
