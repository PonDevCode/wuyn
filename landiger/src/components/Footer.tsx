import type { CSSProperties, ReactNode } from 'react';
import LiveSvg from './LiveSvg';
import Logo from './Logo';
import Wordmark from './Wordmark';
import Reveal from './Reveal';

// Tools that get "absorbed" into the Landiger logo. x, y are offsets from the logo centre.
// Brand marks (Zalo, Facebook) come from Simple Icons (CC0) and are drawn in their own colours;
// the others are simple white glyphs on a coloured tile.
// Zalo wordmark (Simple Icons), shown white on Zalo blue like the app icon.
const ZALO =
  'M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9436 0 1.0746.8697 1.9453 1.945 1.9453z';

type Tool = {
  label: string;
  x: number;
  y: number;
  tile?: string;
  brand?: { color: string; path: string };
  glyph?: ReactNode;
};
const tools: Tool[] = [
  {
    label: 'Excel',
    x: -528,
    y: -70,
    tile: '#1D6F42',
    glyph: (
      <path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM4 9.5h16M4 14.5h16M10 4v16" />
    ),
  },
  {
    label: 'Zalo',
    x: -480,
    y: 80,
    tile: '#0068FF',
    glyph: <path d={ZALO} fill="#FFFFFF" stroke="none" />,
  },
  {
    label: 'Facebook',
    x: 480,
    y: -80,
    brand: {
      color: '#0866FF',
      path: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
    },
  },
  {
    label: 'Sổ tay',
    x: 528,
    y: 70,
    tile: '#B7791F',
    glyph: <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7zM7 3v18M4 7h3M4 12h3M4 17h3M11 8h5M11 12h5" />,
  },
  {
    label: 'Website thuê ngoài',
    x: -640,
    y: 230,
    tile: '#6B7488',
    glyph: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.6 2.4 2.6 14.6 0 17M12 3.5c-2.6 2.4-2.6 14.6 0 17" />
      </>
    ),
  },
  {
    label: 'Sổ thu chi',
    x: 640,
    y: 230,
    tile: '#067647',
    glyph: (
      <text x="12" y="19" textAnchor="middle" fontSize="21" fontWeight="800" fill="#FFFFFF" stroke="none">
        ₫
      </text>
    ),
  },
];

// Curves converging on the logo, drawn in a 3840-wide canvas centred on the page.
const flows: [path: string, duration: number, begin: number][] = [
  ['M1392 90Q1656 155 1920 160', 2.6, 0],
  ['M1440 240Q1680 170 1920 160', 3.05, -0.37],
  ['M2400 80Q2160 150 1920 160', 3.5, -0.74],
  ['M2448 230Q2184 165 1920 160', 3.95, -1.11],
  ['M1280 390Q1600 245 1920 160', 4.4, -1.48],
  ['M2560 390Q2240 245 1920 160', 2.6, -1.85],
];

// Footer links; pages that don't exist yet stay "#".
const hrefs: Record<string, string> = {
  Website: '/#giai-phap',
  'Đặt lịch hẹn': '/#giai-phap',
  'Khách hàng · CRM': '/#giai-phap',
  'Marketing tự động': '/#giai-phap',
  'Spa & Beauty': '/#nganh-nghe',
  'Salon tóc': '/#nganh-nghe',
  'Phòng khám': '/#nganh-nghe',
  'Giáo dục': '/#nganh-nghe',
  'Bảng giá': '/#bang-gia',
  'Tin tức': '/tin-tuc',
  'Liên hệ': '#lien-he',
};
const columns: [title: string, links: string[]][] = [
  ['Sản phẩm', ['Website', 'Đặt lịch hẹn', 'Khách hàng · CRM', 'Marketing tự động']],
  ['Ngành nghề', ['Spa & Beauty', 'Salon tóc', 'Phòng khám', 'Giáo dục']],
  ['Landiger', ['Về chúng tôi', 'Bảng giá', 'Tin tức', 'Liên hệ']],
];

// Brand icons from Simple Icons (CC0), 24×24 viewBox.
const socials: [label: string, color: string, path: string][] = [
  [
    'Facebook',
    '#0866FF',
    'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
  ],
  [
    'Zalo',
    '#0068FF',
    'M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9436 0 1.0746.8697 1.9453 1.945 1.9453z',
  ],
  [
    'YouTube',
    '#FF0000',
    'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  ],
  [
    'TikTok',
    '#000000',
    'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  ],
];

/** `fadeTop`: soften the seam with a background drawn behind the page (the blog's pinned grid). */
export default function Footer({ fadeTop = false }: { fadeTop?: boolean }) {
  return (
    <section id="lien-he" className="relative">
      {fadeTop && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-full h-20 bg-gradient-to-b from-page/0 to-page"
        />
      )}
      {/* Closing CTA */}
      <div className="relative h-[520px] overflow-hidden bg-page sm:h-[560px]">
        <div
          aria-hidden="true"
          className="bg-grid absolute inset-0"
          style={{
            maskImage: 'radial-gradient(ellipse max(34%, 360px) 42% at 50% 45%, #000 30%, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse max(34%, 360px) 42% at 50% 45%, #000 30%, transparent)',
          }}
        />
        {fadeTop && (
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-page to-page/0" />
        )}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[210px] -ml-[450px] -mt-[210px] h-[420px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(0,75,236,0.10),rgba(0,75,236,0))]"
        />

        <Reveal className="absolute inset-0">
          <LiveSvg
            width="3840"
            height="560"
            viewBox="0 0 3840 560"
            aria-hidden="true"
            className="absolute left-1/2 top-0 -ml-[1920px] max-sm:hidden"
          >
            {flows.map(([d, dur, begin], i) => (
              <g key={d}>
                {/* Cord i belongs to tool i: it grows out with the pill and retracts into the logo with it */}
                <path
                  d={d}
                  pathLength={1}
                  className="ft-cord"
                  style={{ animationDelay: `${i * 0.08}s` }}
                  fill="none"
                  stroke="#004BEC"
                  strokeOpacity="0.22"
                  strokeWidth="1"
                />
                <g className="ft-cord-dots" style={{ animationDelay: `${i * 0.08}s` }}>
                  <circle r="6" fill="#0095FE" fillOpacity="0.2">
                    <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d} />
                  </circle>
                  <circle r="2.6" fill="#0095FE">
                    <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d} />
                  </circle>
                </g>
              </g>
            ))}
          </LiveSvg>

          {/* Offsets shrink on small screens (--kx/--ky) so the pills stay on screen. */}
          <div className="absolute inset-0 [--kx:0.21] [--ky:0.6] sm:[--kx:0.6] sm:[--ky:0.8] lg:[--kx:1] lg:[--ky:1]">
            {tools.map(({ label, x, y, tile, brand, glyph }, i) => (
              <div
                key={label}
                aria-hidden="true"
                className={`absolute flex h-9 animate-tool items-center gap-2 whitespace-nowrap rounded-full border border-[#E3E9F2] bg-white pl-1.5 pr-3.5 text-xs font-semibold text-ink shadow-[0_10px_20px_-12px_rgba(11,20,36,0.3)] lg:h-11 lg:gap-2.5 lg:pl-2 lg:pr-4 lg:text-sm ${
                  Math.abs(x) > 600 ? 'max-md:hidden' : ''
                }`}
                style={
                  {
                    left: `calc(50% + ${x}px * var(--kx))`,
                    top: `calc(160px + ${y}px * var(--ky))`,
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${i * 0.08}s`,
                    '--dx': `calc(${-x}px * var(--kx))`,
                    '--dy': `calc(${-y}px * var(--ky))`,
                  } as CSSProperties
                }
              >
                {brand ? (
                  <svg viewBox="0 0 24 24" className="size-6 lg:size-7">
                    <path d={brand.path} fill={brand.color} />
                  </svg>
                ) : (
                  <span
                    className="flex size-6 items-center justify-center rounded-[7px] lg:size-7 lg:rounded-lg"
                    style={{ background: tile }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 lg:size-[18px]"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {glyph}
                    </svg>
                  </span>
                )}
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
            <h2 className="text-[clamp(22px,3.4vw,32px)] font-extrabold uppercase leading-[1.38] text-ink">
              Đừng ghép 5 phần mềm
              <br />
              <span className="text-brand">để vận hành một cửa hàng</span>
            </h2>
            <p className="text-sm text-muted sm:text-[15px]">
              Website, lịch hẹn, khách hàng và doanh thu. Chỉ trong một workspace Landiger.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <a
                href="#"
                data-trial
                className="flex h-12 items-center gap-2.5 rounded-xl bg-brand px-6 text-[15px] font-bold text-white shadow-[0_16px_30px_-12px_rgba(0,75,236,0.6)] hover:bg-[#0040cc] hover:text-white"
              >
                Dùng thử miễn phí <span aria-hidden="true">→</span>
              </a>
              <a
                href="#"
                data-demo
                className="flex h-12 items-center rounded-xl border border-line bg-white px-[22px] text-[15px] font-bold text-ink"
              >
                Đặt lịch demo
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <footer className="border-t border-[#E1E7F1] bg-white px-4 sm:px-8 lg:px-[max(32px,calc(50%-560px))]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 pb-10 pt-12 sm:grid-cols-3 lg:flex lg:gap-[72px] lg:pb-14 lg:pt-14">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-3 lg:w-80 lg:shrink-0">
            <div className="flex items-center gap-2.5">
              <Logo id="ftSmall" size={36} />
              <Wordmark className="h-[18px] w-auto" />
            </div>
            <p className="max-w-[420px] text-sm leading-[1.65] text-muted">
              Không gian làm việc cho doanh nghiệp dịch vụ: website, đặt lịch, khách hàng và vận hành trong một nền
              tảng.
            </p>
            <div className="flex gap-2">
              {socials.map(([label, color, path]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-[10px] border border-[#E3E9F2] bg-white transition-transform hover:-translate-y-0.5"
                >
                  <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
                    <path d={path} fill={color} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {columns.map(([title, items]) => (
            <nav key={title} aria-label={title} className="flex flex-col gap-3">
              <div className="text-sm font-extrabold text-ink">{title}</div>
              {items.map((it) => (
                <a key={it} href={hrefs[it] ?? '#'} className="text-sm text-muted">
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
