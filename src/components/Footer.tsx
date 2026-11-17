'use client';
import Link from 'next/link';
import Mark from './Mark';
import { site } from '@/data/site';

export default function Footer() {
  const replay = () => {
    try {
      sessionStorage.removeItem('overture-seen');
    } catch {}
    window.location.href = '/';
  };
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="sf-cta">
          <p className="label">For internships, collaborations &amp; conversations about space</p>
          <Link className="sf-big" href="/contact">
            <span>Have a space in mind?</span> <span className="rose">Let’s draw it.</span>
          </Link>
        </div>
        <div className="sf-row">
          <Link href="/" aria-label="Home">
            <Mark size={40} />
          </Link>
          <div className="sf-col">
            <span className="tibetan rose" lang="bo">{site.tibetanName}</span>
            <span className="label">{site.name}</span>
          </div>
          <div className="sf-col">
            <span className="label">Sikkim → Manipal, India</span>
            <a className="link-u" href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className="sf-col end">
            <button type="button" className="label sf-replay" onClick={replay}>Replay overture ↺</button>
            <span className="label">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
