// Icon path helpers (48×48 viewBox), shared by the marquee and the industries tabs.
export const circle = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

export const roundRect = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${-(w - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${-r}v${-(h - 2 * r)}a${r} ${r} 0 0 1 ${r} ${-r}Z`;

export const icons = {
  spa: 'M24 12C19 18 19 27 24 33C29 27 29 18 24 12ZM24 33C17 33 11 28 10 21C15 21 20 24 24 33M24 33C31 33 37 28 38 21C33 21 28 24 24 33M12 39Q18 36 24 39T36 39',
  salon: circle(15, 33, 5) + circle(33, 33, 5) + 'M18.5 29.5L33 10M29.5 29.5L15 10M40 12v6M37 15h6',
  fitness: 'M17 22V17A7 7 0 0 1 31 17V22' + circle(24, 31, 11) + 'M20 31h8',
  clinic: 'M24 39C14 32 8 26 8 19A8 8 0 0 1 24 15A8 8 0 0 1 40 19C40 26 34 32 24 39ZM13 25h5l3-5 4 10 3-5h7',
  education: 'M24 17C19 14 13 14 8 15V37C13 36 19 36 24 39C29 36 35 36 40 37V15C35 14 29 14 24 17ZM24 17V39M24 4v6M21 7h6',
  studio: roundRect(7, 15, 34, 24, 6) + 'M17 15l2.5-4h9l2.5 4' + circle(24, 27, 6.5) + circle(35, 21, 0.4),
  fnb: 'M7 24H41C41 32 34 38 24 38C14 38 7 32 7 24ZM18 42h12M29 20L41 8M33 21L43 12M15 19c-2-3 2-5 0-8M21 19c-2-3 2-5 0-8',
  retail:
    'M10 18H38L36 39A3 3 0 0 1 33 42H15A3 3 0 0 1 12 39ZM18 22V15A6 6 0 0 1 30 15V22M24 36C20 33 18 31 18 28.5A3 3 0 0 1 24 27.5A3 3 0 0 1 30 28.5C30 31 28 33 24 36Z',
  business:
    roundRect(9, 12, 18, 28, 3) +
    'M14 18h2M20 18h2M14 24h2M20 24h2M14 30h2M20 30h2M27 23h9a2 2 0 0 1 2 2v15M6 40h36M32 12l7-7M34 5h5v5',
  more: roundRect(9, 9, 12, 12, 4) + roundRect(27, 9, 12, 12, 4) + roundRect(9, 27, 12, 12, 4) + 'M33 28v10M28 33h10',
};
