import { ImageResponse } from 'next/og';
import { markDataUri, ogFonts } from '@/lib/og-assets';
import { findPost, posts } from '@/lib/posts';

export const alt = 'Bài viết trên blog Landiger';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export default async function PostImage({ params }: { params: Promise<{ slug: string }> }) {
  const post = findPost((await params).slug);
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        backgroundColor: '#F4F6FA',
        backgroundImage:
          'linear-gradient(#E1E7F1 1px, transparent 1px), linear-gradient(90deg, #E1E7F1 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        fontFamily: 'BeVietnam, BeVietnamVi',
        color: '#0B1424',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markDataUri} width={52} height={56} alt="" />
        <div style={{ fontSize: 36, fontWeight: 800 }}>Landiger</div>
        <div style={{ display: 'flex', flexGrow: 1 }} />
        <div
          style={{
            display: 'flex',
            padding: '10px 22px',
            borderRadius: 999,
            background: '#004BEC',
            color: '#FFFFFF',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          {post?.category ?? 'Tin tức'}
        </div>
      </div>
      <div style={{ display: 'flex', fontSize: 62, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
        {post?.title ?? 'Tin tức Landiger'}
      </div>
      <div style={{ display: 'flex', fontSize: 26, fontWeight: 700, color: '#4B5670' }}>landiger.com/tin-tuc</div>
    </div>,
    { ...size, fonts: await ogFonts() },
  );
}
