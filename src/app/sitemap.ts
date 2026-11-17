import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { SITE_URL } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/work', '/about', '/contact', ...projects.map((p) => `/work/${p.slug}`)];
  return pages.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: new Date() }));
}
