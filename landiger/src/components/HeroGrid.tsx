import type { ReactNode } from 'react';
import LiveSvg from './LiveSvg';

// Diagonal background grid of the hero, drawn in SVG so things can travel along the lines:
// either light streaks or small product icons (see VARIANT).
// Same geometry as the original CSS: two line families at 12.4° and 121.8°, 62px apart.

const SPACING = 62;
const REACH = 1700; // half-length of each line from the centre of the hero, in px
const RUN_REACH = 950; // streaks only travel the part of a line that is usually on screen
const COUNT = 22; // lines on each side of the centre, per family

const rad = (deg: number) => (deg * Math.PI) / 180;

// Each family: direction of its lines (unit vector) and the normal they are spaced along.
const families = [12.4, 121.8].map((deg) => {
  const n = { x: Math.sin(rad(deg)), y: -Math.cos(rad(deg)) }; // CSS gradient direction
  const u = { x: -n.y, y: n.x }; // along the line
  return { n, u };
});

const r1 = (v: number) => Math.round(v * 10) / 10;

function linePath(family: number, k: number, reverse = false, reach = REACH) {
  const { n, u } = families[family];
  const cx = k * SPACING * n.x;
  const cy = k * SPACING * n.y;
  const a = { x: r1(cx - reach * u.x), y: r1(cy - reach * u.y) };
  const b = { x: r1(cx + reach * u.x), y: r1(cy + reach * u.y) };
  const [p, q] = reverse ? [b, a] : [a, b];
  return `M${p.x} ${p.y}L${q.x} ${q.y}`;
}

const lines = families.flatMap((_, f) => Array.from({ length: COUNT * 2 + 1 }, (_, i) => linePath(f, i - COUNT)));

// [family, line offset from centre, seconds to cross, start offset (s), reverse]
const streaks: [number, number, number, number, boolean][] = [
  [0, -9, 8, 0, false],
  [0, -6, 10, -6, true],
  [0, -2, 9, -3, false],
  [0, 1, 11, -8, true],
  [0, 4, 8, -1, false],
  [0, 7, 10, -5, true],
  [0, 10, 9, -9, false],
  [1, -10, 9, -2, true],
  [1, -6, 7, -7, false],
  [1, -3, 10, -4, true],
  [1, 0, 8, -9, false],
  [1, 3, 9, -1, true],
  [1, 7, 11, -6, false],
  [1, 11, 8, -3, true],
  [0, -4, 9, -2, true],
  [0, 8, 8, -7, false],
  [0, -11, 10, -4, false],
  [1, -8, 10, -5, true],
  [1, 5, 8, -8, false],
  [1, -1, 11, -2, true],
];

/** What travels along the grid lines. */
const VARIANT: 'icons' | 'streaks' = 'icons';

const TAIL = 72; // streak length in px
const SPEED = 2; // multiplier on the base speeds below (1 = ~200px/s)

// Stroke glyphs drawn in a 24×24 box. Order tells the story: customer → website → booking →
// Zalo reminder → CRM → payment → revenue.
type Glyph = { color: string; draw: ReactNode };
const glyphs: Glyph[] = [
  {
    color: '#7048E8',
    draw: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
  },
  {
    color: '#1C7ED6',
    draw: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </>
    ),
  },
  {
    color: '#0CA678',
    draw: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </>
    ),
  },
  {
    color: '#0068FF',
    draw: (
      <text x="12" y="17.5" textAnchor="middle" fontSize="15" fontWeight="800" stroke="none" fill="currentColor">
        Z
      </text>
    ),
  },
  {
    color: '#0B1424',
    draw: <path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21a2 2 0 0 0 4 0" />,
  },
  {
    color: '#004BEC',
    draw: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="11" r="2.5" />
        <path d="M14 10h4M14 14h4M5.5 16.5c1.2-2 5.8-2 7 0" />
      </>
    ),
  },
  {
    color: '#067647',
    draw: (
      <text x="12" y="18" textAnchor="middle" fontSize="17" fontWeight="800" stroke="none" fill="currentColor">
        ₫
      </text>
    ),
  },
  {
    color: '#E67700',
    draw: <path d="M4 20V11M10 20V5M16 20v-7M21 20H3" />,
  },
];

// [family, line offset, seconds to cross, start offset (s), reverse] — one per glyph. These lines were
// picked because they cross the most open space around the hero copy and the dashboard mockup.
const iconRuns: [number, number, number, number, boolean][] = [
  [0, 3, 12, 0, false],
  [1, -8, 11, -5, true],
  [0, 2, 13, -9, true],
  [1, 0, 12, -3, false],
  [0, 4, 12, -7, false],
  [0, -4, 13, -1, true],
  [1, -9, 11, -8, false],
  [0, 5, 12, -4, true],
];
const ICON_REACH = 800; // icons only cross the part of a line that is on screen

const ICON = 30; // chip size in px
const ICON_TAIL = 60;

function IconRun({ glyph, run }: { glyph: Glyph; run: (typeof iconRuns)[number] }) {
  const [f, k, dur, begin, reverse] = run;
  const path = linePath(f, k, reverse, ICON_REACH);
  const motion = { dur: `${dur}s`, begin: `${begin}s`, repeatCount: 'indefinite', path };
  return (
    <g>
      {/* Faint trail, turned to the direction of travel */}
      <g>
        <line x1={-ICON_TAIL} y1="0" x2="0" y2="0" stroke="url(#heroIconTrail)" strokeWidth="2" strokeLinecap="round" />
        <animateMotion {...motion} rotate="auto" />
      </g>
      {/* Chip stays upright */}
      <g>
        <rect x={-ICON / 2} y={-ICON / 2 + 3} width={ICON} height={ICON} rx="9" fill="#0B1424" fillOpacity="0.06" />
        <rect x={-ICON / 2} y={-ICON / 2} width={ICON} height={ICON} rx="9" fill="#FFFFFF" stroke="#E3E9F2" />
        <g
          transform="translate(-8.4 -8.4) scale(0.7)"
          fill="none"
          stroke={glyph.color}
          color={glyph.color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {glyph.draw}
        </g>
        <animateMotion {...motion} />
      </g>
    </g>
  );
}

export default function HeroGrid() {
  return (
    <LiveSvg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full will-change-transform">
      <svg x="50%" y="50%" overflow="visible">
        <g stroke="#E1E7F1" strokeWidth="1">
          {lines.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <defs>
          {/* Drawn along +x; animateMotion rotate="auto" turns it to face the direction of travel */}
          <linearGradient id="heroStreak" gradientUnits="userSpaceOnUse" x1={-TAIL} y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#0095FE" stopOpacity="0" />
            <stop offset="0.7" stopColor="#0095FE" stopOpacity="0.45" />
            <stop offset="1" stopColor="#004BEC" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="heroIconTrail" gradientUnits="userSpaceOnUse" x1={-ICON_TAIL} y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#0095FE" stopOpacity="0" />
            <stop offset="1" stopColor="#0095FE" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {VARIANT === 'icons' && (
          <g className="motion-reduce:hidden">
            {glyphs.map((g, i) => (
              <IconRun key={i} glyph={g} run={iconRuns[i]} />
            ))}
          </g>
        )}
        {VARIANT === 'streaks' && (
          <g className="motion-reduce:hidden">
            {streaks.map(([f, k, dur, begin, reverse], i) => (
              <g key={i}>
                <line x1={-TAIL} y1="0" x2="0" y2="0" stroke="url(#heroStreak)" strokeWidth="2" strokeLinecap="round" />
                <circle r="6" fill="#0095FE" fillOpacity="0.16" />
                <circle r="2.2" fill="#004BEC" />
                <animateMotion
                  dur={`${dur / SPEED}s`}
                  begin={`${begin / SPEED}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                  path={linePath(f, k, reverse, RUN_REACH)}
                />
              </g>
            ))}
          </g>
        )}
      </svg>
    </LiveSvg>
  );
}
