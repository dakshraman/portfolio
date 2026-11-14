import { blogs, services } from '@/data/portfolio';

export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://dakshraman.in';

  const blogEntries = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const serviceEntries = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/freelance`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    ...serviceEntries,
    ...blogEntries,
  ];
}
