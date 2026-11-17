import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CoverFlow from '@/components/CoverFlow';
import { projects, pad, shortType } from '@/content/projects';
import '@/styles/work.css';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected works 2023 — 2026: resort, office, multi-family housing, working drawings and illustrations by Rigzen Phintso Bhutia.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <CoverFlow />
      <section className="w-index wrap" aria-labelledby="index-title">
        <h2 id="index-title" className="w-index-title asterisk" data-split>Index.</h2>
        <ol>
          {projects.map((p, i) => (
            <li key={p.slug} data-reveal style={{ '--delay': `${i * 70}ms` } as React.CSSProperties}>
              <Link href={`/work/${p.slug}`} className="w-row">
                <span className="w-n">{pad(i + 1)}</span>
                <span className="w-nm">
                  {p.tibetan && <span className="tibetan rose" lang="bo">{p.tibetan}</span>} {p.wylie ?? p.title}
                </span>
                <span className="w-ty">{shortType(p)}</span>
                <span className="w-lo">{p.location ?? '—'}</span>
                <span className="w-yr">{p.year}</span>
                <span className="w-peek" aria-hidden="true"><Image src={p.cover} alt="" width={160} /></span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
