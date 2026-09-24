import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostBody from '@/components/PostBody';
import PostCard from '@/components/PostCard';
import { findPost, formatDate, posts, readingMinutes, sortedPosts } from '@/lib/posts';
import { SITE_NAME, SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = findPost((await params).slug);
  if (!post) return {};
  const url = `/tin-tuc/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: SITE_NAME,
      locale: 'vi_VN',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      section: post.category,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }: Props) {
  const post = findPost((await params).slug);
  if (!post) notFound();
  const url = `${SITE_URL}/tin-tuc/${post.slug}`;
  const more = sortedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'vi-VN',
        mainEntityOfPage: url,
        url,
        image: `${url}/opengraph-image`,
        keywords: post.keywords.join(', '),
        articleSection: post.category,
        author: { '@type': 'Organization', name: post.author, url: SITE_URL },
        publisher: { '@id': `${SITE_URL}/#organization`, '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Tin tức', item: `${SITE_URL}/tin-tuc` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="px-4 pb-16 pt-24 sm:px-8 lg:pb-24 lg:pt-32">
        <article className="mx-auto max-w-[720px]">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13px] text-subtle">
            <Link href="/" className="text-subtle hover:text-brand">
              Trang chủ
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/tin-tuc" className="text-subtle hover:text-brand">
              Tin tức
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-muted">{post.category}</span>
          </nav>

          <h1 className="mt-4 text-[clamp(26px,4.2vw,40px)] font-extrabold leading-[1.25] text-ink">{post.title}</h1>
          <p className="mt-4 text-[16px] leading-[1.7] text-muted sm:text-lg">{post.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-[#E1E7F1] pb-6 text-[13px] text-subtle">
            <span className="font-semibold text-ink">{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{readingMinutes(post)} phút đọc</span>
          </div>

          <div className="mt-8">
            <PostBody blocks={post.body} />
          </div>
        </article>

        {more.length > 0 && (
          <section aria-labelledby="more-posts" className="mx-auto mt-16 max-w-[1200px] lg:mt-24">
            <div className="flex items-end justify-between gap-4">
              <h2 id="more-posts" className="text-xl font-extrabold text-ink sm:text-2xl">
                Bài viết khác
              </h2>
              <Link href="/tin-tuc" className="text-sm font-bold text-brand">
                Xem tất cả <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {more.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
