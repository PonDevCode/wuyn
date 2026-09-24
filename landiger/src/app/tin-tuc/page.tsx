import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogList from '@/components/BlogList';
import PageHero from '@/components/PageHero';
import { categories, sortedPosts } from '@/lib/posts';
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
      <main>
        <PageHero className="px-4 pb-14 pt-32 sm:px-8 lg:pb-20 lg:pt-44">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center">
            <div className="flex h-[34px] items-center gap-[9px] rounded-full bg-white px-4 text-[10px] font-bold tracking-[0.14em] text-[#2A3348] shadow-[0_1px_2px_rgba(11,20,36,0.05),0_10px_22px_-14px_rgba(11,20,36,0.25)] sm:text-xs">
              <span className="size-[7px] rounded-full bg-sky" />
              TIN TỨC · KIẾN THỨC · KINH NGHIỆM
            </div>
            <h1 className="text-[clamp(28px,5vw,52px)] font-extrabold uppercase leading-[1.25]">
              <span className="block">Kiến thức</span>
              <span className="block text-brand">vận hành cửa hàng</span>
            </h1>
            <p className="max-w-[600px] text-[15px] leading-[1.7] text-[#3F4A5E] sm:text-base">{description}</p>
          </div>
        </PageHero>
        <div className="px-4 pb-20 sm:px-8 lg:px-[max(32px,calc(50%-600px))] lg:pb-28">
          <BlogList posts={posts} categories={categories} />
        </div>
      </main>
      <Footer />
    </>
  );
}
