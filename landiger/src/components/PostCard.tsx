import Link from 'next/link';
import { formatDate, readingMinutes, type Post } from '@/lib/posts';
import PostCover from './PostCover';

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#E1E7F1] bg-white transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_24px_40px_-28px_rgba(11,20,36,0.35)]">
      <Link href={`/tin-tuc/${post.slug}`} className="flex flex-1 flex-col">
        <PostCover post={post} className="aspect-[16/9]" />
        <div className="flex flex-1 flex-col gap-2.5 p-5">
          <div className="text-xs font-medium text-subtle">
            {formatDate(post.date)} · {readingMinutes(post)} phút đọc
          </div>
          <h3 className="text-[17px] font-extrabold leading-snug text-ink group-hover:text-brand">{post.title}</h3>
          <p className="line-clamp-3 text-sm leading-[1.65] text-muted">{post.description}</p>
          <span className="mt-auto pt-2 text-sm font-bold text-brand">
            Đọc tiếp <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
