'use client';

import { cloneElement, useEffect, useId, useRef, useState, type ReactElement, type ReactNode } from 'react';
import Logo from './Logo';

/**
 * Free-trial sign-up popup. Any element with a `data-trial` attribute opens it.
 * Fields appear one after another: each one slides in once the previous is valid
 * (email → phone → password → confirm password → business name).
 */

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
// Vietnamese mobile numbers: 0 or +84 followed by 3/5/7/8/9 and 8 more digits.
const isPhone = (v: string) => /^(0|\+84)(3|5|7|8|9)\d{8}$/.test(v.replace(/[\s.-]/g, ''));
const isPassword = (v: string) => v.length >= 8;
const isBusiness = (v: string) => v.trim().length >= 2;

type Values = { email: string; phone: string; password: string; confirm: string; business: string };
const empty: Values = { email: '', phone: '', password: '', confirm: '', business: '' };

export default function TrialDialog() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Values>(empty);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [done, setDone] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const titleId = useId();

  const valid = {
    email: isEmail(values.email),
    phone: isPhone(values.phone),
    password: isPassword(values.password),
    confirm: isPassword(values.password) && values.confirm === values.password,
    business: isBusiness(values.business),
  };
  // Each step is revealed once every step before it is valid.
  const shown = {
    email: true,
    phone: valid.email,
    password: valid.email && valid.phone,
    confirm: valid.email && valid.phone && valid.password,
    business: valid.email && valid.phone && valid.password && valid.confirm,
  };
  const complete = valid.email && valid.phone && valid.password && valid.confirm && valid.business;
  const step = [valid.email, valid.phone, valid.password, valid.confirm, valid.business].filter(Boolean).length;

  // Open from any [data-trial] element on the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as Element | null)?.closest?.('[data-trial]');
      if (!trigger) return;
      e.preventDefault();
      lastTrigger.current = trigger as HTMLElement;
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const close = () => {
    setOpen(false);
    if (done) {
      setValues(empty);
      setTouched({});
      setDone(false);
    }
    lastTrigger.current?.focus();
  };

  // While open: lock page scroll, Escape closes, Tab stays inside the dialog.
  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(
      () => dialogRef.current?.querySelector<HTMLElement>('input, button[type="submit"]')?.focus(),
      60,
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const items = [...dialogRef.current.querySelectorAll<HTMLElement>('button, input, a[href]')].filter(
        (el) => !el.hasAttribute('disabled') && el.tabIndex !== -1 && el.offsetParent !== null,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));
  const blur = (key: keyof Values) => () => setTouched((t) => ({ ...t, [key]: true }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complete) {
      setTouched({ email: true, phone: true, password: true, confirm: true, business: true });
      return;
    }
    // TODO: send `values` to the sign-up API once it exists.
    setDone(true);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 animate-fade-in bg-ink/45" onClick={close} aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative max-h-[92vh] w-full animate-rise overflow-y-auto rounded-t-3xl bg-white shadow-[0_40px_80px_-30px_rgba(11,20,36,0.45)] sm:max-w-[440px] sm:rounded-3xl ${done ? '' : 'p-6 sm:p-8'}`}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Đóng"
          className={`absolute right-4 top-4 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full ${done ? 'text-white/80 hover:bg-white/15 hover:text-white' : 'text-subtle hover:bg-page hover:text-ink'}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        {done ? (
          <SuccessView
            titleId={titleId}
            email={values.email.trim()}
            business={values.business.trim()}
            onClose={close}
          />
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <div className="flex items-center gap-2.5">
              <Logo id="trialLogo" size={28} />
              <span className="rounded-full bg-tint px-2.5 py-1 text-[11px] font-bold text-brand">
                Miễn phí 14 ngày
              </span>
            </div>
            <h2 id={titleId} className="mt-4 text-[22px] font-extrabold leading-tight">
              Dùng thử Landiger miễn phí
            </h2>
            <p className="mt-1.5 text-sm text-muted">Không cần thẻ thanh toán. Chỉ mất chưa tới một phút.</p>

            <div className="mt-5 flex gap-1.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i < step ? 'bg-brand' : 'bg-[#E6EBF3]'}`}
                />
              ))}
            </div>

            <div className="mt-5 flex flex-col">
              <Field
                show={shown.email}
                label="Email công việc"
                error={touched.email && values.email && !valid.email ? 'Email chưa đúng định dạng' : ''}
                ok={valid.email}
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
                show={shown.phone}
                label="Số điện thoại"
                error={
                  touched.phone && values.phone && !valid.phone
                    ? 'Số điện thoại Việt Nam gồm 10 số, ví dụ 0912 345 678'
                    : ''
                }
                ok={valid.phone}
              >
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
                show={shown.password}
                label="Mật khẩu tài khoản"
                hint="Tối thiểu 8 ký tự"
                error={touched.password && values.password && !valid.password ? 'Mật khẩu cần ít nhất 8 ký tự' : ''}
                ok={valid.password}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="cursor-pointer px-3 text-xs font-semibold text-subtle hover:text-ink"
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPassword ? 'Ẩn' : 'Hiện'}
                  </button>
                }
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={values.password}
                  onChange={set('password')}
                  onBlur={blur('password')}
                />
              </Field>

              <Field
                show={shown.confirm}
                label="Nhập lại mật khẩu"
                error={touched.confirm && values.confirm && !valid.confirm ? 'Mật khẩu nhập lại chưa khớp' : ''}
                ok={valid.confirm}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={values.confirm}
                  onChange={set('confirm')}
                  onBlur={blur('confirm')}
                />
              </Field>

              <Field
                show={shown.business}
                label="Tên doanh nghiệp"
                error={touched.business && values.business && !valid.business ? 'Nhập tên doanh nghiệp' : ''}
                ok={valid.business}
              >
                <input
                  type="text"
                  autoComplete="organization"
                  placeholder="Ví dụ: SEN Spa"
                  value={values.business}
                  onChange={set('business')}
                  onBlur={blur('business')}
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={!complete}
              className="mt-2 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand text-[15px] font-bold text-white transition-colors hover:bg-[#0040cc] disabled:cursor-not-allowed disabled:bg-[#C9D6F2]"
            >
              Tạo Landiger miễn phí <span aria-hidden="true">→</span>
            </button>
            <p className="mt-3 text-center text-xs text-faint">
              Bằng việc đăng ký, bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật của Landiger.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

// "SEN Spa" -> "senspa": used to preview the workspace address.
const slugify = (v: string) =>
  v
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 24) || 'workspace';

const nextSteps = [
  ['Mở email xác nhận', 'Kích hoạt tài khoản bằng đường link vừa gửi'],
  ['Chọn mẫu website theo ngành', 'Sửa chữ và ảnh, xuất bản trong vài phút'],
  ['Mời nhân viên và bật đặt lịch', 'Khách bắt đầu đặt lịch ngay trên website'],
];

type SuccessProps = { titleId: string; email: string; business: string; onClose: () => void };

function SuccessView({ titleId, email, business, onClose }: SuccessProps) {
  return (
    <div>
      {/* Brand header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0095FE] via-brand to-[#0238F0] px-6 pb-12 pt-8 text-center text-white sm:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse at 50% 30%, #000, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, #000, transparent 75%)',
          }}
        />
        <div className="relative mx-auto flex size-16 animate-pop items-center justify-center rounded-2xl bg-white shadow-[0_16px_30px_-12px_rgba(0,20,80,0.6)] [animation-delay:0.1s]">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12.5l4.5 4.5L19.5 6.5"
              stroke="#004BEC"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 id={titleId} className="relative mt-4 text-[22px] font-extrabold leading-tight">
          Chào mừng tới Landiger!
        </h2>
        <p className="relative mt-1 text-sm text-white/80">Landiger dùng thử của bạn đã được tạo.</p>
      </div>

      <div className="px-6 pb-6 sm:px-8 sm:pb-8">
        {/* Workspace card, overlapping the header */}
        <div className="relative -mt-7 rounded-2xl border border-[#E3E9F2] bg-white p-4 shadow-[0_18px_34px_-22px_rgba(11,20,36,0.4)]">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tint text-base font-extrabold text-brand">
              {business.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0 grow">
              <div className="truncate text-[15px] font-extrabold">{business}</div>
              <div className="truncate text-xs text-subtle">{slugify(business)}.landiger.com</div>
            </div>
            <span className="shrink-0 rounded-full bg-[#E8F7EF] px-2.5 py-1 text-[11px] font-bold text-ok">
              Dùng thử 14 ngày
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-page px-3 py-2 text-xs text-muted">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7488" strokeWidth="2" />
              <path d="M3.5 6.5l8.5 6 8.5-6" stroke="#6B7488" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <span className="min-w-0 truncate">
              Đã gửi hướng dẫn tới <b className="text-ink">{email}</b>
            </span>
          </div>
        </div>

        {/* Next steps */}
        <div className="mt-5 text-[11px] font-bold tracking-[0.12em] text-subtle">BƯỚC TIẾP THEO</div>
        <ol className="m-0 mt-2.5 flex list-none flex-col gap-2 p-0">
          {nextSteps.map(([title, desc], i) => (
            <li
              key={title}
              className="flex animate-pop items-start gap-3 px-1 py-1"
              style={{ animationDelay: `${0.25 + i * 0.08}s` }}
            >
              <span
                className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                  i === 0 ? 'bg-brand text-white' : 'bg-tint text-brand'
                }`}
              >
                {i + 1}
              </span>
              <div>
                <div className="text-sm font-bold">{title}</div>
                <div className="text-xs text-subtle">{desc}</div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="h-12 cursor-pointer rounded-xl border border-line bg-white px-5 text-[15px] font-bold text-ink hover:bg-page"
          >
            Để sau
          </button>
          <a
            href="#"
            onClick={onClose}
            className="flex h-12 grow items-center justify-center gap-2 rounded-xl bg-brand text-[15px] font-bold text-white hover:bg-[#0040cc] hover:text-white"
          >
            Vào Landiger <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  show: boolean;
  label: string;
  hint?: string;
  error?: string;
  ok?: boolean;
  trailing?: ReactNode;
  children: ReactElement<{ id?: string }>;
};

/** A form row that slides open when `show` turns true. */
function Field({ show, label, hint, error, ok, trailing, children }: FieldProps) {
  const id = useId();
  return (
    <div
      className={`grid transition-[grid-template-rows,opacity,transform] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
        show ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] -translate-y-2 opacity-0'
      }`}
      aria-hidden={!show}
      inert={!show}
    >
      <div className="overflow-hidden">
        <label htmlFor={id} className="mb-1.5 flex items-center justify-between text-[13px] font-semibold text-ink">
          {label}
          {hint && <span className="font-normal text-faint">{hint}</span>}
        </label>
        <div
          className={`flex h-12 items-center rounded-xl border bg-white transition-colors focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10 ${
            error ? 'border-[#E5484D]' : 'border-[#D6DEEB]'
          } [&>input]:h-full [&>input]:min-w-0 [&>input]:flex-1 [&>input]:bg-transparent [&>input]:px-3.5 [&>input]:text-[15px] [&>input]:outline-none [&>input]:placeholder:text-faint`}
        >
          {cloneElement(children, { id })}
          {trailing}
          {ok && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mr-3 shrink-0" aria-hidden="true">
              <circle cx="12" cy="12" r="10" fill="#E8F7EF" />
              <path
                d="M7.5 12.5l3 3L16.5 9"
                stroke="#067647"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <p
          className={`min-h-5 pt-1 text-xs ${error ? 'text-[#C13A3F]' : 'text-transparent'}`}
          role={error ? 'alert' : undefined}
        >
          {error || '.'}
        </p>
        <div className="h-2" />
      </div>
    </div>
  );
}
