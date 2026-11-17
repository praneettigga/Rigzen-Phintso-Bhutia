'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Mark from './Mark';
import { nav, site } from '@/data/site';
import { getLenis } from '@/lib/motion';
import '@/styles/chrome.css';

const crumbFor = (p: string) =>
  p.startsWith('/work')
    ? 'Selected works / 2023 — 2026'
    : p.startsWith('/about')
      ? 'The student / Sikkim → Manipal'
      : p.startsWith('/contact')
        ? 'Write a note / 04'
        : 'Architecture / Portfolio';

/** Header + overlay menu (they share the open state). */
export default function Chrome() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  // close on navigation
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      menu.current?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
    } else lenis?.start();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 300 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}${hidden && !open ? ' is-hidden' : ''}`}>
        <div className="sh-bar wrap">
          <Link href="/" className="sh-brand" aria-label={`${site.name} — home`}>
            <Mark />
            <span className="sh-wordmark">
              <span>Rigzen Phintso</span>
              <span>Bhutia</span>
            </span>
          </Link>
          <p className="sh-crumb label" aria-hidden="true">{crumbFor(pathname)}</p>
          <button ref={trigger} className="sh-trigger" type="button" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((o) => !o)}>
            <span className="sh-label">
              <span>Menu</span>
              <span>Close</span>
            </span>
            <span className="sh-pill" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <div id="site-menu" ref={menu} className="menu" role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open} inert={!open}>
        <div className="menu-inner wrap">
          <p className="label menu-kicker">Collection index ✱</p>
          <nav aria-label="Primary">
            <ol>
              {nav.map((item, i) => (
                <li key={item.href} style={{ '--i': i } as React.CSSProperties}>
                  <Link
                    href={item.href}
                    className={`menu-link${isActive(item.href) ? ' active' : ''}`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span className="ml-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="ml-big">{item.label}</span>
                    <span className="ml-tib tibetan" lang="bo">{item.tibetan}</span>
                    <span className="ml-note label">{item.note}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <div className="menu-foot">
            <a className="link-u" href={`mailto:${site.email}`}>{site.email}</a>
            <span className="label">{site.origin} · {site.school}</span>
          </div>
        </div>
      </div>
    </>
  );
}
