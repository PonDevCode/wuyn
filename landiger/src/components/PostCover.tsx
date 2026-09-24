import type { Post } from '@/lib/posts';

// Cover art per category: gradient + a simple line icon, so posts don't need photos.
const covers: Record<string, { from: string; to: string; icon: string }> = {
  'Vận hành': {
    from: '#004BEC',
    to: '#0095FE',
    icon: 'M8 3v3M16 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM9 14l2 2 4-4',
  },
  Marketing: { from: '#0B1424', to: '#2A4A8C', icon: 'M3 12h4l10-6v12L7 12M7 12v6M20 9v6' },
  'Quản lý': { from: '#0B7A5A', to: '#17A6F8', icon: 'M4 20V10M10 20V4M16 20v-7M22 20H2' },
};
const fallback = covers['Vận hành'];

export default function PostCover({ post, className = '' }: { post: Post; className?: string }) {
  const c = covers[post.category] ?? fallback;
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute -bottom-[12%] -right-[4%] h-[78%] w-auto opacity-25"
      >
        <path d={c.icon} />
      </svg>
      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink">
        {post.category}
      </span>
    </div>
  );
}
