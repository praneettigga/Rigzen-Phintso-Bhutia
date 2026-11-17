import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Figure from '@/components/Figure';
import Arrow from '@/components/Arrow';
import { projects, getProject, pad, tibNum, shortType } from '@/content/projects';
import '@/styles/project.css';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.wylie ?? p.title} — ${shortType(p)}`,
    description: `${p.deck} ${p.intro[0]}`.slice(0, 158),
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { images: [{ url: p.cover.src, width: p.cover.width, height: p.cover.height }] },
  };
}

const sizesFor = (layout: string, size?: string) =>
  size === 'full'
    ? '100vw'
    : layout === 'trio'
      ? '(max-width: 760px) 100vw, 33vw'
      : layout === 'pair'
        ? '(max-width: 760px) 100vw, 50vw'
        : size === 'wide'
          ? '(max-width: 1440px) 100vw, 1440px'
          : '(max-width: 900px) 100vw, 62vw';

export default async function ProjectPage({ params }: Params) {
  const d = getProject((await params).slug);
  if (!d) notFound();
  const idx = projects.indexOf(d);
  const next = projects[(idx + 1) % projects.length];
  const total = projects.length;

  // global figure numbering: hero is 01
  const figureTotal = 1 + d.chapters.reduce((n, c) => n + c.figures.length, 0);
  let fig = 1;
  const chapters = d.chapters.map((c) => ({ ...c, figures: c.figures.map((f) => ({ ...f, n: ++fig })) }));
  const css = (o: Record<string, string>) => o as React.CSSProperties;

  return (
    <article className={`project layout-${d.layout ?? 'liner'}`}>
      <header className="p-head wrap">
        <div className="p-meta-row label" data-reveal>
          <span>{shortType(d)} · {d.year}</span>
          <span>{pad(d.order)} / {pad(total)}</span>
        </div>

        <div className="p-grid">
          <div className="p-text">
            <p className="p-kicker label" data-reveal>Liner notes ✱</p>
            <h1 className="p-title">
              {d.tibetan ? (
                <>
                  <span className="t-row" data-reveal style={css({ '--delay': '120ms' })}>
                    <span className="t-num">{tibNum(d.order)}.</span>
                    <span className="tibetan" lang="bo">{d.tibetan}</span>
                  </span>
                  <span className="t-wylie" data-split style={css({ '--base': '300ms' })}>{d.wylie}</span>
                </>
              ) : (
                <span className="t-plain" data-split>{d.title}</span>
              )}
            </h1>
            <hr className="t-rule" />
            <dl className="p-facts" data-reveal style={css({ '--delay': '300ms' })}>
              {d.location && (<div><dt>Location</dt><dd>{d.location}</dd></div>)}
              <div><dt>Typology</dt><dd>{d.typology}</dd></div>
              <div><dt>Year</dt><dd>{d.year}</dd></div>
              {d.meaning && (<div><dt>Name</dt><dd><em>{d.wylie}</em> — “{d.meaning}”</dd></div>)}
            </dl>
            <p className="p-deck" data-split style={css({ '--base': '400ms', '--stagger': '9ms' })}>{d.deck}</p>
            {d.intro.map((t) => (
              <p key={t.slice(0, 20)} className="p-intro" data-reveal style={css({ '--delay': '500ms' })}>{t}</p>
            ))}
          </div>
          <div className={`p-hero ${d.hero.size ?? 'tall'}`}>
            <Figure src={d.hero.src} caption={d.hero.caption} n={1} total={figureTotal} eager sizes="(max-width: 900px) 100vw, 50vw" delay={250} />
          </div>
        </div>
      </header>

      {chapters.map((c, ci) => (
        <section key={c.heading} className={`chapter ch-${c.layout}`}>
          <div className="ch-text wrap">
            <span className="ch-num" data-reveal>{pad(ci + 2)}</span>
            <h2 className="ch-heading" data-split style={css({ '--stagger': '10ms' })}>{c.heading}</h2>
            {c.body && <p className="ch-body" data-reveal style={css({ '--delay': '200ms' })}>{c.body}</p>}
          </div>

          {c.layout === 'panorama' ? (
            <div className="pano" data-panorama>
              <div className="pano-track" data-panorama-track>
                {c.figures.map((f) => (
                  <Figure key={f.n} src={f.src} caption={f.caption} n={f.n} total={figureTotal} sizes="300vw" className="pano-fig" />
                ))}
              </div>
              <p className="pano-hint label wrap" aria-hidden="true">← scroll to travel along the section →</p>
            </div>
          ) : (
            <div className={`figs ${c.layout === 'stack' ? 'stack' : 'grid'} n-${c.figures.length} ${c.layout}`}>
              {c.figures.map((f, fi) => (
                <Figure
                  key={f.n}
                  src={f.src}
                  caption={f.caption}
                  n={f.n}
                  total={figureTotal}
                  className={`size-${f.size ?? 'normal'} pos-${fi % 2 ? 'r' : 'l'}`}
                  delay={c.layout === 'stack' ? 0 : fi * 120}
                  sizes={sizesFor(c.layout, f.size)}
                />
              ))}
            </div>
          )}
        </section>
      ))}

      <nav className="p-next wrap" aria-label="Next project">
        <Link href={`/work/${next.slug}`} className="p-next-link" data-reveal>
          <span className="label">Next edition · {pad(next.order)} / {pad(total)}</span>
          <span className="p-next-title">
            {next.tibetan && <span className="tibetan rose" lang="bo">{next.tibetan}</span>}
            <span>{next.wylie ?? next.title}</span>
          </span>
          <span className="label">{shortType(next)} / {next.year} — turn to the next set of drawings</span>
          <span className="p-next-cover"><Image src={next.cover} alt="" width={240} /></span>
        </Link>
        <div className="p-credits">
          <p className="label">Concept, design, drawings and visualisation — Rigzen Phintso Bhutia</p>
          <Link href="/work" className="arrow-link link-u">Return to collection <Arrow /></Link>
        </div>
      </nav>
    </article>
  );
}
