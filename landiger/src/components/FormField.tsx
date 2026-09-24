'use client';

import { cloneElement, useId, type ReactElement, type ReactNode } from 'react';

type FieldProps = {
  /** Collapsed and inert until true; defaults to shown */
  show?: boolean;
  label: string;
  hint?: string;
  error?: string;
  ok?: boolean;
  trailing?: ReactNode;
  children: ReactElement<{ id?: string }>;
};

/** Labelled input row with error text and a valid tick. Slides open when `show` turns true. */
export default function Field({ show = true, label, hint, error, ok, trailing, children }: FieldProps) {
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
