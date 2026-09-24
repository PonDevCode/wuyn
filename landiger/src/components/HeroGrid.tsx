// Diagonal background grid of the hero, drawn in SVG so small dots can travel along the lines.
// Same geometry as the original CSS: two line families at 12.4° and 121.8°, 62px apart.

const SPACING = 62;
const REACH = 1700; // half-length of each line from the centre of the hero, in px
const DOT_REACH = 950; // dots only travel the part of a line that is usually on screen
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
const dots: [number, number, number, number, boolean][] = [
  [0, -6, 11, 0, false],
  [0, -2, 14, -6, true],
  [0, 3, 12, -3, false],
  [0, 7, 16, -10, true],
  [0, -9, 13, -8, false],
  [1, -8, 10, -2, true],
  [1, -3, 12, -7, false],
  [1, 2, 9, -4, true],
  [1, 6, 13, -1, false],
  [1, 11, 11, -9, true],
  [0, 0, 9, -5, true],
  [0, 5, 10, -2, false],
  [1, -5, 11, -6, false],
  [1, 4, 12, -8, true],
  [0, -11, 12, -4, true],
  [0, -4, 10, -9, false],
  [0, 1, 13, -1, false],
  [0, 9, 11, -7, true],
  [0, -7, 9, -3, true],
  [0, 6, 14, -12, false],
  [1, -10, 12, -5, false],
  [1, -6, 9, -8, true],
  [1, -1, 11, -3, false],
  [1, 0, 13, -10, true],
  [1, 8, 10, -6, false],
  [1, 13, 12, -2, true],
];

export default function HeroGrid() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full">
      <svg x="50%" y="50%" overflow="visible">
        <g stroke="#E1E7F1" strokeWidth="1">
          {lines.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g className="motion-reduce:hidden">
          {dots.map(([f, k, dur, begin, reverse], i) => {
            const path = linePath(f, k, reverse, DOT_REACH);
            return (
              <g key={i}>
                <circle r="8" fill="#0095FE" fillOpacity="0.16">
                  <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
                </circle>
                <circle r="3.2" fill="#0095FE">
                  <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
                </circle>
              </g>
            );
          })}
        </g>
      </svg>
    </svg>
  );
}
