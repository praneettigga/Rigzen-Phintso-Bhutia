import Image from 'next/image';
import scribble from '@/assets/brand/portfolio-scribble.png';
import { site } from '@/data/site';

export default function CoverStatement() {
  return (
    <section className="cover" aria-label="Selected works 2023 to 2026">
      <p className="cover-tags label" data-reveal>Resort · Office · Housing · Working drawing · Illustration</p>
      <div className="cover-sheet">
        <p className="cover-line rose" data-split>Architecture</p>
        <div className="cover-scribble" data-write style={{ '--delay': '200ms' } as React.CSSProperties}>
          <Image src={scribble} alt="portfolio" sizes="(max-width: 900px) 92vw, 1100px" />
        </div>
        <p className="cover-tib tibetan" lang="bo" data-reveal style={{ '--delay': '600ms' } as React.CSSProperties}>{site.coverTibetan}</p>
        <p className="cover-line rose" data-split style={{ '--base': '700ms' } as React.CSSProperties}>Selected Works</p>
        <p className="cover-yr cover-yl rose" data-reveal>{site.years[0]}</p>
        <p className="cover-yr cover-yr2 rose" data-reveal>{site.years[1]}</p>
      </div>
    </section>
  );
}
