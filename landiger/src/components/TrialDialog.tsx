'use client';

import { cloneElement, useEffect, useId, useRef, useState, type ReactElement, type ReactNode } from 'react';
import QRCode from 'qrcode';
import { findPlan, formatVnd, priceFor, type Cycle, type Plan } from '@/lib/plans';
import { newPaymentCode, PAYMENT_ACCOUNT, vietQrPayload } from '@/lib/payment';
import Logo from './Logo';

/**
 * Sign-up popup. Any element with a `data-trial` attribute opens it: as a free trial, or, with
 * `data-plan` (+ `data-cycle`), as a paid sign-up that ends with a VietQR transfer.
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
  const [view, setView] = useState<'form' | 'pay' | 'done'>('form');
  const [order, setOrder] = useState<{ plan: Plan; cycle: Cycle; amount: number; code: string } | null>(null);
  const done = view === 'done';
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
      const el = trigger as HTMLElement;
      lastTrigger.current = el;
      const plan = findPlan(el.dataset.plan);
      const cycle: Cycle = el.dataset.cycle === 'year' ? 'year' : 'month';
      const amount = plan ? priceFor(plan, cycle) : null;
      // Start a fresh form unless the visitor is coming back to one they were filling in.
      setView((v) => (v === 'form' ? v : 'form'));
      setOrder(plan && amount !== null ? { plan, cycle, amount, code: '' } : null);
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const close = () => {
    setOpen(false);
    if (view !== 'form') {
      setValues(empty);
      setTouched({});
      setView('form');
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
    // TODO: send `values` (and `order`) to the sign-up API once it exists.
    if (order) {
      setOrder({ ...order, code: newPaymentCode() });
      setView('pay');
    } else {
      setView('done');
    }
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
        className={`relative max-h-[92vh] w-full animate-rise overflow-y-auto rounded-t-3xl bg-white shadow-[0_40px_80px_-30px_rgba(11,20,36,0.45)] sm:max-w-[400px] sm:rounded-3xl ${done ? '' : 'p-5 sm:px-7 sm:py-6'}`}
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

        {view === 'pay' && order ? (
          <PayView titleId={titleId} order={order} onBack={() => setView('form')} onPaid={() => setView('done')} />
        ) : done ? (
          <SuccessView
            titleId={titleId}
            email={values.email.trim()}
            business={values.business.trim()}
            order={order}
            onClose={close}
          />
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <div className="flex items-center gap-2.5">
              <Logo id="trialLogo" size={24} />
              <span className="rounded-full bg-tint px-2.5 py-1 text-[11px] font-bold text-brand">
                {order ? `Gói ${order.plan.name} · ${order.cycle === 'year' ? 'Năm' : 'Tháng'}` : 'Miễn phí 14 ngày'}
              </span>
            </div>
            <h2 id={titleId} className="mt-3 text-lg font-extrabold leading-tight sm:text-xl">
              {order ? `Đăng ký gói ${order.plan.name}` : 'Dùng thử Landiger miễn phí'}
            </h2>
            <p className="mt-1 text-[13px] text-muted">
              {order ? (
                <>
                  <b className="text-ink">{formatVnd(order.amount)}đ</b>/{order.cycle === 'year' ? 'năm' : 'tháng'} ·
                  Nhập thông tin, rồi quét QR để thanh toán.
                </>
              ) : (
                'Không cần thẻ thanh toán, chỉ mất chưa tới một phút.'
              )}
            </p>

            <div className="mt-4 flex gap-1.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i < step ? 'bg-brand' : 'bg-[#E6EBF3]'}`}
                />
              ))}
            </div>

            <div className="mt-4 flex flex-col">
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
              className="mt-1 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand text-sm font-bold text-white transition-colors hover:bg-[#0040cc] disabled:cursor-not-allowed disabled:bg-[#C9D6F2]"
            >
              {order ? 'Tiếp tục thanh toán' : 'Tạo Landiger miễn phí'} <span aria-hidden="true">→</span>
            </button>
            <p className="mt-2.5 text-center text-[11px] leading-snug text-faint">
              Bằng việc đăng ký, bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật của Landiger.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

const PAY_WAIT = 30; // seconds before the success screen

type Order = { plan: Plan; cycle: Cycle; amount: number; code: string };

function CopyRow({ label, value, copy, strong }: { label: string; value: string; copy?: string; strong?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="shrink-0 text-xs text-subtle">{label}</span>
      <span className="flex min-w-0 items-center gap-1.5">
        <span
          className={`truncate text-right text-[13px] ${strong ? 'font-extrabold text-brand' : 'font-semibold text-ink'}`}
        >
          {value}
        </span>
        {copy && (
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(copy).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              });
            }}
            className="shrink-0 cursor-pointer rounded-md px-1.5 py-0.5 text-[11px] font-semibold text-brand hover:bg-tint"
          >
            {copied ? 'Đã chép' : 'Sao chép'}
          </button>
        )}
      </span>
    </div>
  );
}

/** VietQR transfer screen; moves on to the success screen after PAY_WAIT seconds. */
function PayView({
  titleId,
  order,
  onBack,
  onPaid,
}: {
  titleId: string;
  order: Order;
  onBack: () => void;
  onPaid: () => void;
}) {
  const [svg, setSvg] = useState('');
  const [left, setLeft] = useState(PAY_WAIT);
  const onPaidRef = useRef(onPaid);
  onPaidRef.current = onPaid;

  useEffect(() => {
    QRCode.toString(vietQrPayload({ amount: order.amount, note: order.code }), {
      type: 'svg',
      margin: 0,
      errorCorrectionLevel: 'M',
      color: { dark: '#0B1424', light: '#FFFFFF' },
    }).then(setSvg);
  }, [order.amount, order.code]);

  useEffect(() => {
    const started = Date.now();
    const t = setInterval(() => {
      const remaining = Math.max(0, PAY_WAIT - Math.floor((Date.now() - started) / 1000));
      setLeft(remaining);
      if (remaining === 0) {
        clearInterval(t);
        onPaidRef.current();
      }
    }, 250);
    return () => clearInterval(t);
  }, []);

  const { bankName, accountNo, accountName } = PAYMENT_ACCOUNT;
  const progress = (PAY_WAIT - left) / PAY_WAIT;

  return (
    <div>
      <div className="flex items-center gap-2.5">
        <Logo id="payLogo" size={24} />
        <span className="rounded-full bg-tint px-2.5 py-1 text-[11px] font-bold text-brand">
          Gói {order.plan.name} · {order.cycle === 'year' ? 'Năm' : 'Tháng'}
        </span>
      </div>
      <h2 id={titleId} className="mt-3 text-lg font-extrabold leading-tight sm:text-xl">
        Quét mã để thanh toán
      </h2>
      <p className="mt-1 text-[13px] text-muted">Mở app ngân hàng bất kỳ, quét mã VietQR bên dưới.</p>

      <div className="mt-3 flex flex-col items-center rounded-2xl border border-[#E3E9F2] bg-page px-4 pb-3 pt-4">
        <div className="relative rounded-xl bg-white p-3 shadow-[0_10px_24px_-16px_rgba(11,20,36,0.4)]">
          <div
            className="size-[128px] [&>svg]:size-full"
            aria-label={`Mã QR chuyển khoản ${formatVnd(order.amount)} đồng, nội dung ${order.code}`}
            role="img"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
          <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-white shadow-[0_0_0_3px_#FFFFFF]">
            <Logo id="qrLogo" size={22} />
          </span>
        </div>
        <div className="mt-2 text-xl font-extrabold tracking-[-0.01em]">{formatVnd(order.amount)}đ</div>
        <div className="mt-2 flex w-full items-center gap-2.5">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping-dot rounded-full bg-sky" />
            <span className="relative size-2 rounded-full bg-sky" />
          </span>
          <span className="grow text-xs text-muted">Đang chờ thanh toán…</span>
          <span className="text-xs font-bold tabular-nums text-ink">0:{String(left).padStart(2, '0')}</span>
        </div>
        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[#E6EBF3]">
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-2.5 divide-y divide-[#EEF1F6] rounded-xl border border-[#E3E9F2] px-3.5">
        <CopyRow label="Ngân hàng" value={bankName} />
        <CopyRow label="Số tài khoản" value={accountNo} copy={accountNo} />
        <CopyRow label="Chủ tài khoản" value={accountName} />
        <CopyRow label="Số tiền" value={`${formatVnd(order.amount)}đ`} copy={String(order.amount)} />
        <CopyRow label="Nội dung chuyển khoản" value={order.code} copy={order.code} strong />
      </div>
      <p className="mt-2 text-[11px] leading-snug text-subtle">
        Vui lòng giữ nguyên nội dung <b className="text-ink">{order.code}</b> để Landiger đối soát và kích hoạt gói.
      </p>

      <button
        type="button"
        onClick={onBack}
        className="mt-2.5 h-9 w-full cursor-pointer rounded-xl border border-line bg-white text-[13px] font-semibold text-ink hover:bg-page"
      >
        ← Sửa thông tin
      </button>
    </div>
  );
}

// "SEN Spa" -> "senspa": used to preview the workspace address.
const slugify = (v: string) =>
  v
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 24) || 'workspace';

const nextSteps = [
  ['Mở email xác nhận', 'Kích hoạt tài khoản bằng đường link vừa gửi'],
  ['Chọn mẫu website theo ngành', 'Sửa chữ và ảnh, xuất bản trong vài phút'],
  ['Mời nhân viên và bật đặt lịch', 'Khách bắt đầu đặt lịch ngay trên website'],
];

type SuccessProps = {
  titleId: string;
  email: string;
  business: string;
  order: { plan: Plan; cycle: Cycle; amount: number; code: string } | null;
  onClose: () => void;
};

function SuccessView({ titleId, email, business, order, onClose }: SuccessProps) {
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
        {/* Logo tile with a check badge; rings ripple out once when the screen appears */}
        <div className="relative mx-auto size-[72px]">
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-[ring_1.6s_ease-out_0.2s_both] rounded-[22px] border-2 border-white/60"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-[ring_1.6s_ease-out_0.5s_both] rounded-[22px] border-2 border-white/40"
          />
          <div className="relative flex size-full animate-pop items-center justify-center rounded-[22px] bg-white shadow-[0_18px_34px_-14px_rgba(0,20,80,0.65)] [animation-delay:0.05s]">
            <Logo id="welcomeLogo" size={40} />
          </div>
          <span className="absolute -bottom-1.5 -right-1.5 flex size-7 animate-pop items-center justify-center rounded-full bg-[#12B76A] shadow-[0_0_0_3px_#FFFFFF] [animation-delay:0.35s]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12.5l4.5 4.5L19.5 6.5"
                pathLength={1}
                className="animate-[draw_0.45s_ease-out_0.6s_both] [stroke-dasharray:1] [stroke-dashoffset:1]"
                stroke="#FFFFFF"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <h2 id={titleId} className="relative mt-4 text-[22px] font-extrabold leading-tight">
          {order ? 'Đăng ký thành công!' : 'Chào mừng tới Landiger!'}
        </h2>
        <p className="relative mt-1 text-sm text-white/80">
          {order
            ? `Gói ${order.plan.name} sẽ kích hoạt ngay khi đối soát xong.`
            : 'Landiger dùng thử của bạn đã được tạo.'}
        </p>
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
              {order ? `Gói ${order.plan.name}` : 'Dùng thử 14 ngày'}
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
          {order && (
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-page px-3 py-2">
                <div className="text-subtle">Mã đối soát</div>
                <div className="font-extrabold tracking-wide text-brand">{order.code}</div>
              </div>
              <div className="rounded-lg bg-page px-3 py-2">
                <div className="text-subtle">Số tiền</div>
                <div className="font-extrabold">
                  {formatVnd(order.amount)}đ/{order.cycle === 'year' ? 'năm' : 'tháng'}
                </div>
              </div>
            </div>
          )}
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
        <label htmlFor={id} className="mb-1 flex items-center justify-between text-xs font-semibold text-ink">
          {label}
          {hint && <span className="font-normal text-faint">{hint}</span>}
        </label>
        <div
          className={`flex h-10 items-center rounded-[10px] border bg-white transition-colors focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10 ${
            error ? 'border-[#E5484D]' : 'border-[#D6DEEB]'
          } [&>input]:h-full [&>input]:min-w-0 [&>input]:flex-1 [&>input]:bg-transparent [&>input]:px-3 [&>input]:text-sm [&>input]:outline-none [&>input]:placeholder:text-faint`}
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
        {error && (
          <p className="pt-1 text-[11px] text-[#C13A3F]" role="alert">
            {error}
          </p>
        )}
        <div className="h-3" />
      </div>
    </div>
  );
}
