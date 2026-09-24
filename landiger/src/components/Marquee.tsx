import Reveal from './Reveal';
import SectionHead from './SectionHead';
import { icons } from './industries-data';

const items = [
  { label: 'Spa & Beauty', color: '#C2255C', d: icons.spa },
  { label: 'Salon tóc', color: '#7048E8', d: icons.salon },
  { label: 'Fitness & Yoga', color: '#1C7ED6', d: icons.fitness },
  { label: 'Phòng khám', color: '#0CA678', d: icons.clinic },
  { label: 'Giáo dục', color: '#E67700', d: icons.education },
  { label: 'Studio & Chụp ảnh', color: '#9C36B5', d: icons.studio },
  { label: 'F&B - Nhà hàng', color: '#E03131', d: icons.fnb },
  { label: 'Bán lẻ - Thời trang', color: '#D6336C', d: icons.retail },
  { label: 'Doanh nghiệp', color: '#1864AB', d: icons.business },
  { label: 'Và nhiều ngành khác', color: '#495057', d: icons.more },
];

const edgeFade = 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)';

export default function Marquee() {
  return (
    <section
      id="nganh-nghe"
      className="relative flex flex-col items-center gap-8 overflow-hidden pb-10 pt-4 sm:gap-10 sm:pb-12 sm:pt-6"
    >
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0"
        style={{
          maskImage: 'linear-gradient(180deg, transparent 0%, #000 45%, #000 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 45%, #000 75%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 h-[260px] w-[900px] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,75,236,0.07),rgba(0,75,236,0))]"
      />

      <Reveal className="relative px-4">
        <SectionHead eyebrow="MỘT NỀN TẢNG · NHIỀU NGÀNH DỊCH VỤ" title="Ngành nghề" accent="hỗ trợ" />
      </Reveal>

      <Reveal delay={150} className="relative flex w-full justify-center">
        <div
          className="relative w-full max-w-[1200px] overflow-hidden py-2"
          style={{ maskImage: edgeFade, WebkitMaskImage: edgeFade }}
        >
          <ul className="m-0 flex w-max animate-marquee list-none p-0 hover:[animation-play-state:paused]">
            {[...items, ...items].map((it, i) => (
              <li key={i} className="shrink-0 pr-3 sm:pr-4" aria-hidden={i >= items.length}>
                <div className="flex h-16 items-center gap-3 whitespace-nowrap rounded-2xl border border-[#E3E9F2] bg-white/85 pl-3 pr-5 shadow-[0_1px_2px_rgba(11,20,36,0.05)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-white sm:h-[72px] sm:pl-3.5 sm:pr-[22px]">
                  <div
                    className="flex size-10 items-center justify-center rounded-xl sm:size-11"
                    style={{ background: `${it.color}1A` }}
                  >
                    <svg width="26" height="26" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                      <path d={it.d} stroke={it.color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold text-ink sm:text-[15px]">{it.label}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
