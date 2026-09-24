// Landiger mark. `id` must be unique per page because the gradient is referenced by id.
export default function Logo({ id, size = 34, className, pieceClassNames = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="262 88 470 492"
      className={className}
      style={{ display: 'block', overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="30%" y2="100%">
          <stop offset="0%" stopColor="#0095FE" />
          <stop offset="55%" stopColor="#004BEC" />
          <stop offset="100%" stopColor="#0238F0" />
        </linearGradient>
      </defs>
      <path
        className={pieceClassNames.base}
        d="M331 552L343 564L601 563L625 546L706 465L709 447L697 438L464 439L445 448L338 535Z"
        fill="#0B1424"
      />
      <path
        className={pieceClassNames.bar}
        d="M411 104L397 107L292 179L284 191L283 507L296 520L314 517L413 446L425 428L426 118Z"
        fill={`url(#${id})`}
      />
      <path
        className={pieceClassNames.tri}
        d="M475 249L462 253L456 264L456 406L459 412L468 418L479 417L589 343L596 331L590 317Z"
        fill="#17A6F8"
      />
    </svg>
  );
}
