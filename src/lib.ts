import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export async function getProjects() {
  return (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
}

/** URL slug: "01-bsten-pa" → "bsten-pa" */
export const slugOf = (p: Project) => p.id.replace(/^\d+-/, '');
export const pad = (n: number) => String(n).padStart(2, '0');
const tibDigits = '༠༡༢༣༤༥༦༧༨༩';
export const tibNum = (n: number) => pad(n).replace(/\d/g, (d) => tibDigits[+d]);
