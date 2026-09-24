import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostBody from '@/components/PostBody';
import PostCard from '@/components/PostCard';
import PostCover from '@/components/PostCover';
import PageHero from '@/components/PageHero';
import Logo from '@/components/Logo';
import { findPost, formatDate, headings, posts, readingMinutes, sortedPosts } from '@/lib/posts';
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
  const toc = headings(post);
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
      <main>
        <PageHero className="px-4 pb-20 pt-28 sm:px-8 lg:pb-28 lg:pt-40">
          <div className="mx-auto flex max-w-[780px] flex-col items-center gap-3.5 text-center">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center justify-center gap-1.5 text-[13px] text-subtle"
            >
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
            <h1 className="text-[clamp(24px,3.2vw,36px)] font-extrabold leading-[1.3] text-ink">{post.title}</h1>
            <p className="max-w-[640px] text-[15px] leading-[1.7] text-[#3F4A5E] sm:text-base">{post.description}</p>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-2 text-[13px]">
              <span className="flex h-8 items-center gap-2 rounded-full bg-white px-3 font-semibold text-ink shadow-[0_1px_2px_rgba(11,20,36,0.06)]">
                <Logo id="postAuthor" size={16} />
                {post.author}
              </span>
              <span className="flex h-8 items-center rounded-full bg-white px-3 text-muted shadow-[0_1px_2px_rgba(11,20,36,0.06)]">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="flex h-8 items-center rounded-full bg-white px-3 text-muted shadow-[0_1px_2px_rgba(11,20,36,0.06)]">
                {readingMinutes(post)} phút đọc
              </span>
            </div>
          </div>
        </PageHero>

        <div className="relative z-10 -mt-10 grid gap-8 px-4 sm:px-8 lg:-mt-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 lg:px-[max(32px,calc(50%-560px))]">
          <article className="overflow-hidden rounded-3xl border border-[#E1E7F1] bg-white shadow-[0_30px_60px_-40px_rgba(11,20,36,0.35)]">
            <PostCover post={post} className="aspect-[3/1] sm:aspect-[5/1]" />
            <div className="px-5 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-10">
              <PostBody blocks={post.body} />
            </div>
          </article>

          <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
            {toc.length > 0 && (
              <nav
                aria-label="Nội dung bài viết"
                className="hidden rounded-2xl border border-[#E1E7F1] bg-white p-5 lg:block"
              >
                <div className="text-xs font-bold tracking-[0.12em] text-subtle">NỘI DUNG</div>
                <ol className="mt-3 flex flex-col gap-1">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="block rounded-lg px-2 py-1.5 text-[13px] leading-snug text-muted hover:bg-page hover:text-brand"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="relative overflow-hidden rounded-2xl bg-ink p-6 text-white">
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 size-40 rounded-full bg-brand opacity-60 blur-2xl"
              />
              <div className="relative flex flex-col gap-3">
                <Logo id="postCta" size={28} />
                <div className="text-lg font-extrabold leading-snug">Vận hành cửa hàng trong một workspace</div>
                <p className="text-[13px] leading-[1.6] text-white/70">
                  Website, đặt lịch, nhắc lịch Zalo, CRM và doanh thu. Dùng thử miễn phí 14 ngày.
                </p>
                <a
                  href="#"
                  data-trial
                  className="mt-1 flex h-11 items-center justify-center gap-2 rounded-xl bg-brand text-sm font-bold text-white hover:bg-[#0040cc] hover:text-white"
                >
                  Dùng thử miễn phí <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#"
                  data-demo
                  className="flex h-11 items-center justify-center rounded-xl border border-white/20 text-sm font-bold text-white hover:bg-white/10 hover:text-white"
                >
                  Đặt lịch demo
                </a>
              </div>
            </div>
          </aside>
        </div>

        {more.length > 0 && (
          <section
            aria-labelledby="more-posts"
            className="px-4 pb-20 pt-16 sm:px-8 lg:px-[max(32px,calc(50%-560px))] lg:pb-28 lg:pt-24"
          >
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
      <Footer fadeTop />
    </>
  );
}
