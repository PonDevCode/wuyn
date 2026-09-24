import type { MetadataRoute } from 'next';
import { sortedPosts } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = sortedPosts();
  return [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    {
      url: `${SITE_URL}/tin-tuc`,
      lastModified: posts[0] ? new Date(posts[0].date) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...posts.map((p) => ({
      url: `${SITE_URL}/tin-tuc/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
