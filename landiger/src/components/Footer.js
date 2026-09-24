import Logo from './Logo';

// Tools that get "absorbed" into the Landiger logo. [label, badge, colour, x, y] — offsets from the logo centre.
const tools = [
  ['Excel', 'X', '#1D6F42', -528, -70],
  ['Zalo', 'Z', '#0068FF', -480, 80],
  ['Facebook', 'f', '#1877F2', 480, -80],
  ['Sổ tay', '✎', '#B7791F', 528, 70],
  ['Web thuê ngoài', 'W', '#6B7488', -640, 230],
  ['Sổ thu chi', '₫', '#067647', 640, 230],
];

// Curves converging on the logo, drawn in a 3840-wide canvas centred on the page.
const flows = [
  ['M1392 90Q1656 155 1920 160', 2.6, 0],
  ['M1440 240Q1680 170 1920 160', 3.05, -0.37],
  ['M2400 80Q2160 150 1920 160', 3.5, -0.74],
  ['M2448 230Q2184 165 1920 160', 3.95, -1.11],
  ['M1280 390Q1600 245 1920 160', 4.4, -1.48],
  ['M2560 390Q2240 245 1920 160', 2.6, -1.85],
];

const columns = [
  ['Sản phẩm', ['Website', 'Đặt lịch hẹn', 'Khách hàng · CRM', 'Marketing tự động']],
  ['Ngành nghề', ['Spa & Beauty', 'Salon tóc', 'Phòng khám', 'Giáo dục']],
  ['Landiger', ['Về chúng tôi', 'Bảng giá', 'Tin tức', 'Liên hệ']],
];

const socials = [
  ['Facebook', 'f', '#1877F2'],
  ['Zalo', 'Z', '#0068FF'],
  ['YouTube', '▶', '#E5484D'],
  ['TikTok', '♪', '#0B1424'],
];

export default function Footer() {
  return (
    <section id="lien-he">
      {/* Closing CTA */}
      <div className="relative h-[520px] overflow-hidden bg-page sm:h-[560px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 [background-size:44px_44px]"
          style={{
            backgroundImage:
              'linear-gradient(#E6EBF3 1px, transparent 1px), linear-gradient(90deg, #E6EBF3 1px, transparent 1px)',
            maskImage: 'radial-gradient(max(30%, 360px) 75% at 50% 45%, #000, transparent)',
            WebkitMaskImage: 'radial-gradient(max(30%, 360px) 75% at 50% 45%, #000, transparent)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[170px] -ml-[450px] -mt-[230px] h-[460px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(0,75,236,0.10),rgba(0,75,236,0))]"
        />
        <svg
          width="3840"
          height="560"
          viewBox="0 0 3840 560"
          aria-hidden="true"
          className="absolute left-1/2 top-0 -ml-[1920px] max-sm:hidden"
        >
          {flows.map(([d, dur, begin]) => (
            <g key={d}>
              <path d={d} fill="none" stroke="#004BEC" strokeOpacity="0.22" strokeWidth="1" />
              <circle r="6" fill="#0095FE" fillOpacity="0.2">
                <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d} />
              </circle>
              <circle r="2.6" fill="#0095FE">
                <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          ))}
        </svg>

        {/* Offsets shrink on small screens (--kx/--ky) so the pills stay on screen. */}
        <div className="absolute inset-0 [--kx:0.21] [--ky:0.6] sm:[--kx:0.6] sm:[--ky:0.8] lg:[--kx:1] lg:[--ky:1]">
          {tools.map(([label, badge, color, x, y], i) => (
            <div
              key={label}
              aria-hidden="true"
              className={`absolute flex h-9 animate-tool items-center gap-2 whitespace-nowrap rounded-full bg-white pl-1.5 pr-3 text-xs font-semibold text-[#2A3348] shadow-[0_8px_16px_-10px_rgba(11,20,36,0.25)] ${
                Math.abs(x) > 600 ? 'max-md:hidden' : ''
              }`}
              style={{
                left: `calc(50% + ${x}px * var(--kx))`,
                top: `calc(160px + ${y}px * var(--ky))`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.08}s`,
                '--dx': `calc(${-x}px * var(--kx))`,
                '--dy': `calc(${-y}px * var(--ky))`,
              }}
            >
              <span
                className="flex size-6 items-center justify-center rounded-full text-[11px] font-extrabold text-white"
                style={{ background: color }}
              >
                {badge}
              </span>
              {label}
            </div>
          ))}
        </div>

        <div className="absolute left-1/2 top-[160px] -ml-[44px] -mt-[44px] size-[88px] rounded-[26px] bg-white p-3.5 shadow-[0_0_0_10px_rgba(0,75,236,0.05),0_24px_40px_-18px_rgba(11,20,36,0.35)] sm:-ml-[54px] sm:-mt-[54px] sm:size-[108px] sm:rounded-[30px] sm:p-[18px]">
          <Logo
            id="ftLogo"
            size="100%"
            pieceClassNames={{ base: 'ft-p ft-base', bar: 'ft-p ft-bar', tri: 'ft-p ft-tri' }}
          />
        </div>

        <div className="absolute inset-x-0 top-[240px] flex flex-col items-center gap-3.5 px-4 text-center sm:top-[256px]">
          <h2 className="text-[clamp(24px,5vw,38px)] font-extrabold uppercase leading-[1.2] text-ink">
            Dừng ghép 5 phần mềm
            <br />
            <span className="text-brand">để vận hành một cửa hàng</span>
          </h2>
          <p className="text-[15px] text-muted sm:text-base">
            Website, lịch hẹn, khách hàng và doanh thu. Chỉ trong một workspace Landiger.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className="flex h-[52px] items-center gap-2.5 rounded-xl bg-brand px-[26px] text-base font-bold text-white shadow-[0_16px_30px_-12px_rgba(0,75,236,0.6)] hover:bg-[#0040cc] hover:text-white"
            >
              Dùng thử miễn phí <span aria-hidden="true">→</span>
            </a>
            <a
              href="#"
              className="flex h-[52px] items-center rounded-xl border border-line bg-white px-6 text-base font-bold text-ink"
            >
              Đặt lịch demo
            </a>
          </div>
        </div>
      </div>

      <footer className="border-t border-[#E1E7F1] bg-white px-4 sm:px-8 lg:px-[max(32px,calc(50%-560px))]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 pb-10 pt-12 sm:grid-cols-3 lg:flex lg:gap-[72px] lg:pb-14 lg:pt-14">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-3 lg:w-80 lg:shrink-0">
            <div className="flex items-center gap-2.5">
              <Logo id="ftSmall" />
              <span className="text-2xl font-extrabold tracking-[-0.02em]">Landiger</span>
            </div>
            <p className="max-w-[420px] text-sm leading-[1.65] text-muted">
              Không gian làm việc cho doanh nghiệp dịch vụ: website, đặt lịch, khách hàng và vận hành trong một nền tảng.
            </p>
            <div className="flex gap-2">
              {socials.map(([label, ch, color]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-[10px] bg-white text-[13px] font-extrabold shadow-card"
                  style={{ color }}
                >
                  {ch}
                </a>
              ))}
            </div>
          </div>

          {columns.map(([title, items]) => (
            <nav key={title} aria-label={title} className="flex flex-col gap-3">
              <div className="text-sm font-extrabold text-ink">{title}</div>
              {items.map((it) => (
                <a key={it} href="#" className="text-sm text-muted">
                  {it}
                </a>
              ))}
            </nav>
          ))}

          <div className="flex flex-col gap-3">
            <div className="text-sm font-extrabold">Liên hệ</div>
            <span className="text-sm text-muted">[Email]@landiger.com</span>
            <span className="text-sm text-muted">Hotline: [Số điện thoại]</span>
            <span className="text-sm text-muted">[Địa chỉ văn phòng]</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#E1E7F1] py-5 text-[13px] text-subtle sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:py-0">
          <span>© 2026 Landiger. Đã đăng ký bản quyền.</span>
          <span className="flex gap-6">
            <a href="#" className="text-subtle">
              Chính sách bảo mật
            </a>
            <a href="#" className="text-subtle">
              Điều khoản sử dụng
            </a>
          </span>
        </div>
      </footer>
    </section>
  );
}
