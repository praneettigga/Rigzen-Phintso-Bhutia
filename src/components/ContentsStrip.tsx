import Image from 'next/image';
import Link from 'next/link';
import Arrow from './Arrow';
import { projects, pad, shortType } from '@/content/projects';

export default function ContentsStrip() {
  return (
    <section className="contents wrap" aria-labelledby="contents-title">
      <h2 id="contents-title" className="contents-title asterisk" data-split>Contents.</h2>
      <ol className="cards">
        {projects.map((p, i) => (
          <li key={p.slug} className="card" data-reveal style={{ '--delay': `${i * 110}ms` } as React.CSSProperties}>
            <Link href={`/work/${p.slug}`} aria-label={`${pad(p.order)} — ${p.wylie ?? p.title}, ${p.typology}, ${p.year}`}>
              <span className="card-num" aria-hidden="true"><sup>✱</sup>{pad(p.order)}</span>
              <span className="card-poster">
                <Image src={p.cover} alt="" sizes="(max-width: 640px) 60vw, 220px" />
              </span>
              <span className="card-meta">
                <span className="card-name">
                  {p.tibetan ? (
                    <>
                      <span className="tibetan" lang="bo">{p.tibetan}</span> <span className="card-wylie">{p.wylie}</span>
                    </>
                  ) : (
                    <span className="card-strong">{p.title}</span>
                  )}
                </span>
                <span className="card-sub">
                  <span className="rose">{shortType(p)}</span>
                  <span className="rose">{p.year}</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <Link href="/work" className="contents-view arrow-link link-u" data-reveal>View work <Arrow /></Link>
    </section>
  );
}
