import type { ReactNode } from 'react';

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`inline-flex h-[30px] items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-3.5 text-[10px] font-bold tracking-[0.1em] text-muted sm:text-[11px] sm:tracking-[0.16em] ${className}`}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-sky" />
      {children}
    </div>
  );
}

type SectionHeadProps = {
  eyebrow: string;
  title: string;
  accent: string;
  sub?: string;
  align?: 'center' | 'left';
  stacked?: boolean;
};

export default function SectionHead({
  eyebrow,
  title,
  accent,
  sub,
  align = 'center',
  stacked = false,
}: SectionHeadProps) {
  const alignCls = align === 'left' ? 'items-start text-left' : 'items-center text-center';
  const part = stacked ? 'block' : '';

  return (
    <div className={`flex flex-col gap-3 ${alignCls}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-[clamp(24px,4.4vw,36px)] font-extrabold uppercase leading-[1.2] tracking-[0.01em] text-balance">
        <span className={part}>{title}</span> <span className={`${part} text-brand`}>{accent}</span>
      </h2>
      {sub && <p className="max-w-[760px] text-balance text-[15px] leading-relaxed text-muted sm:text-base">{sub}</p>}
    </div>
  );
}
