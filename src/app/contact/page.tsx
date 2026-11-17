import type { Metadata } from 'next';
import Image from 'next/image';
import CopyButton from '@/components/CopyButton';
import poster from '@/assets/brand/thank-you-poster.jpg';
import thanks from '@/assets/brand/thank-you-scribble.png';
import { site } from '@/data/site';
import '@/styles/pages.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Write to Rigzen Phintso Bhutia — ${site.email}. Open to architecture internships and collaborations.`,
  alternates: { canonical: '/contact' },
};

const css = (o: Record<string, string>) => o as React.CSSProperties;

export default function ContactPage() {
  return (
    <section className="c-page wrap">
      <h1 className="sr-only">Contact {site.name}</h1>
      <p className="label c-top" data-reveal>Contact / 04 — no finished brief required</p>
      <p className="c-tib tibetan" lang="bo" data-reveal style={css({ '--delay': '100ms' })}>{site.thanksTibetan}</p>
      <div className="c-card" data-reveal style={css({ '--delay': '200ms' })}>
        <Image src={poster} alt="A drawing of intersecting coral and navy planes" sizes="260px" />
      </div>
      <div className="c-ty" data-write style={css({ '--delay': '700ms' })}>
        <Image src={thanks} alt="Thank you!" sizes="280px" />
      </div>
      <p className="c-note" data-reveal>Open to architecture internships, collaborations and conversations about space. Let’s start with a note.</p>
      <div className="c-mail" data-reveal>
        <a href={`mailto:${site.email}?subject=Hello%20Rigzen`} className="c-addr">{site.email}</a>
        <CopyButton text={site.email} />
      </div>
    </section>
  );
}
