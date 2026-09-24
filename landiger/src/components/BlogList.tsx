'use client';

import Link from 'next/link';
import { useState } from 'react';
import { formatDate, readingMinutes, type Post } from '@/lib/posts';
import PostCard from './PostCard';
import PostCover from './PostCover';

/** Latest post as a large feature card, the rest in a grid, filterable by category. */
export default function BlogList({ posts, categories }: { posts: Post[]; categories: string[] }) {
  const [cat, setCat] = useState('');
  const shown = cat ? posts.filter((p) => p.category === cat) : posts;
  const [lead, ...rest] = shown;

  return (
    <>
      <div role="group" aria-label="Lọc theo chủ đề" className="flex flex-wrap justify-center gap-2">
        {['', ...categories].map((c) => (
          <button
            key={c || 'all'}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={`h-10 cursor-pointer rounded-full border px-4 text-sm font-bold transition-colors ${
              cat === c ? 'border-ink bg-ink text-white' : 'border-[#E1E7F1] bg-white text-ink hover:border-[#C9D3E3]'
            }`}
          >
            {c || 'Tất cả'}
          </button>
        ))}
      </div>

      {lead && (
        <article className="group mt-8 overflow-hidden rounded-3xl border border-[#E1E7F1] bg-white shadow-[0_30px_60px_-40px_rgba(11,20,36,0.35)] lg:mt-10">
          <Link href={`/tin-tuc/${lead.slug}`} className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <PostCover post={lead} className="aspect-[16/9] lg:aspect-auto lg:min-h-[340px]" />
            <div className="flex flex-col justify-center gap-3 p-6 sm:p-8 lg:p-10">
              <span className="self-start rounded-full bg-tint px-3 py-1 text-xs font-bold text-brand">
                Bài mới nhất
              </span>
              <h2 className="text-[22px] font-extrabold leading-snug text-ink group-hover:text-brand sm:text-[24px]">
                {lead.title}
              </h2>
              <p className="text-[15px] leading-[1.7] text-muted">{lead.description}</p>
              <div className="mt-2 flex items-center justify-between gap-4 text-[13px] text-subtle">
                <span>
                  {formatDate(lead.date)} · {readingMinutes(lead)} phút đọc
                </span>
                <span className="text-sm font-bold text-brand">
                  Đọc bài <span aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          </Link>
        </article>
      )}

      {rest.length > 0 && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {rest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </>
  );
}
