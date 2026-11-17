import Image from 'next/image';
import Link from 'next/link';
import portrait from '@/assets/brand/portrait.jpg';
import { site } from '@/data/site';
import '@/styles/home.css';

export default function Hero() {
  const media = site.selfPortrait;
  const isVideo = media ? /\.(mp4|webm)$/i.test(media) : false;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">{site.name} — architecture portfolio</h1>
      <p className="hero-side hero-side-l label" aria-hidden="true">Sikkim / India</p>
      <p className="hero-side hero-side-r label" aria-hidden="true">Selected works · 2023 — 2026</p>

      <div className="hero-inner">
        <div className="hero-intro">
          <p className="hero-lead" data-split style={{ '--stagger': '11ms' } as React.CSSProperties}>
            i’m rigzen--
            <br />
            an architecture student, sketcher, illustrator, painter, quizzer, singer and table-tennis player from sikkim, now in my 4th
            year at manipal school of architecture &amp; planning.
          </p>
          <p className="hero-lead hero-second" data-reveal style={{ '--delay': '900ms' } as React.CSSProperties}>
            i’m looking for an architecture internship — <Link href="/contact" className="underline-rose">say hello!</Link>
          </p>
          <div className="hero-sig" data-reveal style={{ '--delay': '1200ms' } as React.CSSProperties}>
            <span className="hero-rule" />
            <span className="tibetan" lang="bo">{site.tibetanName}</span>
            <span className="hero-rule" />
          </div>
        </div>

        <figure className="hero-portrait" data-reveal style={{ '--delay': '250ms' } as React.CSSProperties}>
          <div className="hero-frame-wrap">
            <div className="hero-frame">
              {media ? (
                isVideo ? (
                  <video src={media} autoPlay muted loop playsInline aria-label={`An animated drawing of ${site.first}`} />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element -- animated GIF/WebP must not be re-encoded
                  <img src={media} alt={`An animated drawing of ${site.first}`} />
                )
              ) : (
                <Image src={portrait} alt={`Portrait of ${site.name}`} sizes="(max-width: 760px) 70vw, 380px" priority />
              )}
            </div>
            <svg className="hero-scribble" viewBox="0 0 100 130" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength={1} d="M3 4.5 C30 2.8 70 3.6 97.2 3.1 C96.4 40 97.6 90 96.8 126.4 C66 127.4 34 126.2 2.6 127.2 C3.6 90 2.4 42 3.4 2.2" />
              <path pathLength={1} d="M5.5 1.6 C40 2.4 62 1.2 98.6 5.8 C98.2 46 99.4 88 98.4 128.4 C60 129 30 128.6 1.2 125.6 C1.8 80 1 40 1.6 6" />
            </svg>
          </div>
          <figcaption className="label">{site.role}</figcaption>
        </figure>
      </div>
    </section>
  );
}
