import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { sortedPosts } from '@/lib/posts';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const title = 'Tin tức & kiến thức vận hành spa, salon, phòng khám';
const description =
  'Kinh nghiệm vận hành, marketing và quản lý khách hàng cho spa, salon, phòng khám, phòng tập, từ đội ngũ Landiger.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/tin-tuc' },
  openGraph: { type: 'website', url: '/tin-tuc', siteName: SITE_NAME, title, description, locale: 'vi_VN' },
};

export default function BlogIndex() {
  const posts = sortedPosts();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `Tin tức ${SITE_NAME}`,
    url: `${SITE_URL}/tin-tuc`,
    inLanguage: 'vi-VN',
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/tin-tuc/${p.slug}`,
      datePublished: p.date,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="bg-grid px-4 pb-20 pt-28 sm:px-8 lg:px-[max(32px,calc(50%-600px))] lg:pb-28 lg:pt-36">
        <div className="flex max-w-[720px] flex-col gap-3">
          <span className="self-start rounded-full bg-white px-3.5 py-1.5 text-xs font-bold tracking-[0.12em] text-brand shadow-[0_1px_2px_rgba(11,20,36,0.06)]">
            TIN TỨC
          </span>
          <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.2] text-ink">
            Kiến thức vận hành cho doanh nghiệp dịch vụ
          </h1>
          <p className="text-[15px] leading-[1.7] text-muted sm:text-base">{description}</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
