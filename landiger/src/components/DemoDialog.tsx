'use client';

import { useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { useModal, useTrigger } from '@/hooks/useModal';
import { isEmail, isFilled, isPhone } from '@/lib/validate';
import Field from './FormField';
import Logo from './Logo';

/**
 * "Đặt lịch demo" popup. Any element with a `data-demo` attribute opens it.
 * Collects contact details, industry, a preferred day and time slot, and online / in-person.
 */

const industries = ['Spa & Beauty', 'Salon tóc', 'Fitness & Yoga', 'Phòng khám', 'Giáo dục', 'F&B', 'Khác'];
const slots = ['09:00', '10:30', '14:00', '15:30', '17:00'];
const modes = [
  { id: 'online', label: 'Online (Google Meet)', sub: 'Google Meet' },
  { id: 'offline', label: 'Gặp trực tiếp', sub: 'Tại cửa hàng của bạn' },
] as const;
const weekday = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']; // Sundays are never offered
const DEMO_MINUTES = 30;

/** The next 7 working days (Mon–Sat), starting tomorrow. */
function nextDays() {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (days.length < 7) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) days.push(new Date(d));
  }
  return days;
}
const dd = (d: Date) => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;

type Values = { name: string; phone: string; email: string; business: string; note: string };
const empty: Values = { name: '', phone: '', email: '', business: '', note: '' };
type Mode = (typeof modes)[number]['id'];

export default function DemoDialog() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [values, setValues] = useState<Values>(empty);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [industry, setIndustry] = useState('');
  const [day, setDay] = useState<number | null>(null);
  const [slot, setSlot] = useState('');
  const [mode, setMode] = useState<Mode>('online');
  const [tried, setTried] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const days = useMemo(() => (open ? nextDays() : []), [open]);

  const valid = {
    name: isFilled(values.name),
    phone: isPhone(values.phone),
    email: values.email.trim() === '' || isEmail(values.email),
    business: isFilled(values.business),
  };
  const complete = valid.name && valid.phone && valid.email && valid.business && industry && day !== null && slot;

  const reset = () => {
    setValues(empty);
    setTouched({});
    setIndustry('');
    setDay(null);
    setSlot('');
    setMode('online');
    setTried(false);
    setDone(false);
  };

  useTrigger('data-demo', (el) => {
    lastTrigger.current = el;
    setOpen(true);
  });

  const close = () => {
    setOpen(false);
    if (done) reset();
    lastTrigger.current?.focus();
  };
  useModal(open, dialogRef, close);

  const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));
  const blur = (key: keyof Values) => () => setTouched((t) => ({ ...t, [key]: true }));
  const showErr = (key: keyof typeof valid) => (touched[key] || tried) && !valid[key];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complete) {
      setTried(true);
      setTouched({ name: true, phone: true, email: true, business: true });
      return;
    }
    // TODO: send the booking to the CRM / sales inbox once the API exists.
    setDone(true);
  };

  if (!open) return null;
  const date = day !== null ? days[day] : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 animate-fade-in bg-ink/45" onClick={close} aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[92vh] w-full animate-rise overflow-y-auto rounded-t-3xl bg-white p-5 shadow-[0_40px_80px_-30px_rgba(11,20,36,0.45)] sm:max-w-[640px] sm:rounded-3xl sm:px-7 sm:py-6"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Đóng"
          className="absolute right-4 top-4 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full text-subtle hover:bg-page hover:text-ink"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        {done && date ? (
          <Booked
            titleId={titleId}
            name={values.name.trim()}
            phone={values.phone.trim()}
            business={values.business.trim()}
            date={date}
            slot={slot}
            mode={mode}
            onClose={close}
          />
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <div className="flex items-center gap-2.5">
              <Logo id="demoLogo" size={24} />
              <span className="rounded-full bg-tint px-2.5 py-1 text-[11px] font-bold text-brand">
                Miễn phí · {DEMO_MINUTES} phút
              </span>
            </div>
            <h2 id={titleId} className="mt-3 text-lg font-extrabold leading-tight sm:text-xl">
              Đặt lịch demo Landiger
            </h2>
            <p className="mt-1 text-[13px] text-muted">
              Chuyên viên demo đúng quy trình ngành của bạn và sẽ gọi xác nhận trước buổi hẹn.
            </p>

            <div className="mt-3 grid gap-x-3 sm:grid-cols-2">
              <Field label="Họ và tên" error={showErr('name') ? 'Nhập họ tên' : ''} ok={valid.name}>
                <input
                  autoComplete="name"
                  placeholder="Nguyễn Thu Hà"
                  value={values.name}
                  onChange={set('name')}
                  onBlur={blur('name')}
                />
              </Field>
              <Field label="Số điện thoại" error={showErr('phone') ? 'Số điện thoại gồm 10 số' : ''} ok={valid.phone}>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="0912 345 678"
                  value={values.phone}
                  onChange={set('phone')}
                  onBlur={blur('phone')}
                />
              </Field>
              <Field
                label="Email"
                hint="Không bắt buộc"
                error={showErr('email') ? 'Email chưa đúng định dạng' : ''}
                ok={values.email.trim() !== '' && valid.email}
              >
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="ban@doanhnghiep.vn"
                  value={values.email}
                  onChange={set('email')}
                  onBlur={blur('email')}
                />
              </Field>
              <Field
                label="Tên doanh nghiệp"
                error={showErr('business') ? 'Nhập tên doanh nghiệp' : ''}
                ok={valid.business}
              >
                <input
                  autoComplete="organization"
                  placeholder="Ví dụ: SEN Spa"
                  value={values.business}
                  onChange={set('business')}
                  onBlur={blur('business')}
                />
              </Field>
            </div>

            <Group label="Ngành của bạn" error={tried && !industry ? 'Chọn ngành' : ''}>
              <div className="flex flex-wrap gap-1.5">
                {industries.map((x) => (
                  <Chip key={x} on={industry === x} onClick={() => setIndustry(x)}>
                    {x}
                  </Chip>
                ))}
              </div>
            </Group>

            <Group label="Chọn ngày" error={tried && day === null ? 'Chọn ngày' : ''}>
              <div className="grid grid-cols-7 gap-1.5">
                {days.map((d, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={day === i}
                    onClick={() => setDay(i)}
                    className={`flex h-11 cursor-pointer flex-col items-center justify-center rounded-[10px] border text-xs transition-colors ${
                      day === i
                        ? 'border-brand bg-brand text-white'
                        : 'border-[#D6DEEB] bg-white text-ink hover:border-[#B9CCF4]'
                    }`}
                  >
                    <span className={`text-[10px] font-semibold ${day === i ? 'text-white/80' : 'text-subtle'}`}>
                      {weekday[d.getDay()]}
                    </span>
                    <span className="font-bold">{dd(d)}</span>
                  </button>
                ))}
              </div>
            </Group>

            <Group label="Khung giờ" error={tried && !slot ? 'Chọn giờ' : ''}>
              <div className="grid grid-cols-5 gap-1.5">
                {slots.map((t) => (
                  <Chip key={t} on={slot === t} onClick={() => setSlot(t)} block>
                    {t}
                  </Chip>
                ))}
              </div>
            </Group>

            <div className="grid gap-x-4 sm:grid-cols-[auto_1fr] [&>fieldset]:mt-3">
              <Group label="Hình thức">
                <div className="flex gap-1.5">
                  {modes.map((m) => (
                    <Chip key={m.id} on={mode === m.id} onClick={() => setMode(m.id)}>
                      {m.label}
                    </Chip>
                  ))}
                </div>
              </Group>

              <Group label="Bạn muốn xem kỹ phần nào?" hint="Không bắt buộc">
                <input
                  value={values.note}
                  onChange={set('note')}
                  placeholder="Ví dụ: đặt lịch theo kỹ thuật viên, nhắc lịch Zalo…"
                  className="block h-10 w-full rounded-[10px] border border-[#D6DEEB] px-3 text-sm outline-none placeholder:text-faint focus:border-brand focus:ring-4 focus:ring-brand/10"
                />
              </Group>
            </div>

            <button
              type="submit"
              className={`mt-3.5 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition-colors ${
                complete ? 'bg-brand hover:bg-[#0040cc]' : 'bg-[#9DB4EE] hover:bg-[#8AA6EC]'
              }`}
            >
              Đặt lịch demo <span aria-hidden="true">→</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Group({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="mt-1 min-w-0 border-0 p-0 [&+fieldset]:mt-3">
      <legend className="mb-1.5 flex w-full items-center justify-between p-0 text-xs font-semibold text-ink">
        {label}
        {error ? (
          <span className="font-normal text-[#C13A3F]" role="alert">
            {error}
          </span>
        ) : (
          hint && <span className="font-normal text-faint">{hint}</span>
        )}
      </legend>
      {children}
    </fieldset>
  );
}

function Chip({
  on,
  onClick,
  block,
  children,
}: {
  on: boolean;
  onClick: () => void;
  block?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`h-8 cursor-pointer rounded-full border px-3 text-xs font-semibold transition-colors ${block ? 'w-full px-0' : ''} ${
        on ? 'border-brand bg-brand text-white' : 'border-[#D6DEEB] bg-white text-ink hover:border-[#B9CCF4]'
      }`}
    >
      {children}
    </button>
  );
}

type BookedProps = {
  titleId: string;
  name: string;
  phone: string;
  business: string;
  date: Date;
  slot: string;
  mode: Mode;
  onClose: () => void;
};

/** Google Calendar "add event" link for the booked slot (Vietnam time). */
function calendarLink(date: Date, slot: string, mode: Mode, business: string) {
  const [h, m] = slot.split(':').map(Number);
  const start = new Date(date);
  start.setHours(h, m, 0, 0);
  const end = new Date(start.getTime() + DEMO_MINUTES * 60_000);
  const fmt = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Demo Landiger – ${business}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details:
      mode === 'online'
        ? 'Link Google Meet sẽ được gửi khi Landiger gọi xác nhận.'
        : 'Chuyên viên Landiger đến tận cửa hàng.',
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

function Booked({ titleId, name, phone, business, date, slot, mode, onClose }: BookedProps) {
  const rows: [string, ReactNode][] = [
    ['Thời gian', <b key="t">{`${slot} · Thứ ${date.getDay() + 1}, ${dd(date)}`}</b>],
    ['Hình thức', mode === 'online' ? 'Online qua Google Meet' : 'Gặp trực tiếp tại cửa hàng'],
    ['Doanh nghiệp', business],
    ['Liên hệ', `${name} · ${phone}`],
  ];
  return (
    <div className="pt-2 text-center">
      <div className="relative mx-auto flex size-14 animate-pop items-center justify-center rounded-2xl bg-tint">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="3" stroke="#004BEC" strokeWidth="2" />
          <path d="M3 10h18M8 3v4M16 3v4" stroke="#004BEC" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M8.5 15l2.5 2.5 4.5-4.5"
            stroke="#12B76A"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 id={titleId} className="mt-3 text-xl font-extrabold">
        Đã đặt lịch demo!
      </h2>
      <p className="mt-1 text-[13px] text-muted">
        Landiger sẽ gọi <b className="text-ink">{phone}</b> để xác nhận trước buổi demo.
      </p>

      <dl className="mt-4 divide-y divide-[#EEF1F6] rounded-xl border border-[#E3E9F2] px-4 text-left">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-3 py-2.5">
            <dt className="shrink-0 text-xs text-subtle">{k}</dt>
            <dd className="m-0 truncate text-right text-[13px] text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onClose}
          className="h-11 cursor-pointer rounded-xl border border-line bg-white px-5 text-sm font-bold text-ink hover:bg-page"
        >
          Đóng
        </button>
        <a
          href={calendarLink(date, slot, mode, business)}
          target="_blank"
          rel="noreferrer"
          className="flex h-11 grow items-center justify-center gap-2 rounded-xl bg-brand text-sm font-bold text-white hover:bg-[#0040cc] hover:text-white"
        >
          Thêm vào Google Calendar
        </a>
      </div>
    </div>
  );
}
