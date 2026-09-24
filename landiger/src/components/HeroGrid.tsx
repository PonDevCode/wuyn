import LiveSvg from './LiveSvg';

// Diagonal background grid of the hero, drawn in SVG so light streaks can travel along the lines.
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

const TAIL = 72; // streak length in px
const SPEED = 2; // multiplier on the base speeds below (1 = ~200px/s)

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
        </defs>
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
      </svg>
    </LiveSvg>
  );
}
