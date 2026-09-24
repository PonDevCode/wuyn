import type { ReactNode } from 'react';
import type { Block } from '@/lib/posts';

/** Renders **bold** spans inside post text. */
function rich(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-bold text-ink">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export default function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-5 text-[16px] leading-[1.8] text-[#2F3A4E] sm:text-[17px]">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2 key={i} className="mt-4 text-[21px] font-extrabold leading-snug text-ink sm:text-2xl">
                {b.text}
              </h2>
            );
          case 'p':
            return <p key={i}>{rich(b.text)}</p>;
          case 'ul':
          case 'ol': {
            const List = b.type;
            return (
              <List
                key={i}
                className={`flex flex-col gap-2 pl-6 ${b.type === 'ul' ? 'list-disc' : 'list-decimal'} marker:text-brand`}
              >
                {b.items.map((it, j) => (
                  <li key={j} className="pl-1">
                    {rich(it)}
                  </li>
                ))}
              </List>
            );
          }
          case 'tip':
            return (
              <aside key={i} className="mt-4 rounded-2xl border border-[#D6E3FF] bg-tint p-5 sm:p-6">
                <p className="text-[15px] leading-[1.7] text-ink sm:text-base">{rich(b.text)}</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <a
                    href="#"
                    data-trial
                    className="flex h-11 items-center gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-white hover:bg-[#0040cc] hover:text-white"
                  >
                    Dùng thử miễn phí <span aria-hidden="true">→</span>
                  </a>
                  <a
                    href="#"
                    data-demo
                    className="flex h-11 items-center rounded-xl border border-line bg-white px-5 text-sm font-bold text-ink"
                  >
                    Đặt lịch demo
                  </a>
                </div>
              </aside>
            );
        }
      })}
    </div>
  );
}
