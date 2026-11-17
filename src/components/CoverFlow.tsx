'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { projects, pad, shortType } from '@/content/projects';

/** 3D album cover-flow (after edisonfangworkshop.com/work). Drag, click, arrows, swipe, wheel. */
export default function CoverFlow() {
  const router = useRouter();
  const stage = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLAnchorElement | null)[]>([]);
  const pos = useRef(0);
  const target = useRef(0);
  const raf = useRef(0);
  const [current, setCurrent] = useState(0);
  const total = pad(projects.length);

  const layout = useCallback(() => {
    const el = stage.current;
    if (!el) return;
    const narrow = el.clientWidth < 700;
    const spacing = narrow ? el.clientWidth * 0.42 : Math.min(el.clientWidth * 0.2, 300);
    items.current.forEach((it, i) => {
      if (!it) return;
      const o = i - pos.current;
      const a = Math.abs(o);
      const side = Math.sign(o);
      const x = side * (Math.min(a, 1) * spacing * 1.08 + Math.max(0, a - 1) * spacing * 0.55);
      const rot = -side * Math.min(a, 1) * 52;
      const z = -Math.min(a, 3) * 160;
      const s = 1 - Math.min(a, 1) * 0.12;
      it.style.transform = `translate(-50%, -54%) translateX(${x}px) translateZ(${z}px) rotateY(${rot}deg) scale(${s})`;
      it.style.zIndex = String(100 - Math.round(a * 10));
      it.style.opacity = String(a > 3.2 ? 0 : 1 - Math.max(0, a - 2) * 0.6);
      it.style.filter = `brightness(${1 - Math.min(a, 2) * 0.06})`;
    });
    setCurrent(Math.max(0, Math.min(projects.length - 1, Math.round(pos.current))));
  }, []);

  const go = useCallback(
    (i: number) => {
      target.current = Math.max(0, Math.min(projects.length - 1, i));
      cancelAnimationFrame(raf.current);
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const step = () => {
        const d = target.current - pos.current;
        pos.current += reduced ? d : d * 0.12;
        if (Math.abs(d) < 0.001) pos.current = target.current;
        layout();
        if (pos.current !== target.current) raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    },
    [layout],
  );

  useEffect(() => {
    const el = stage.current!;
    let startX = 0, startPos = 0, dragging = false, moved = 0, lastWheel = 0;
    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true;
      moved = 0;
      startX = e.clientX;
      startPos = pos.current;
      cancelAnimationFrame(raf.current);
      el.setPointerCapture(e.pointerId);
      el.classList.add('dragging');
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      const unit = el.clientWidth < 700 ? el.clientWidth * 0.45 : 260;
      pos.current = Math.max(-0.4, Math.min(projects.length - 0.6, startPos - dx / unit));
      layout();
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove('dragging');
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
      if (moved > 6) return go(Math.round(pos.current));
      const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLAnchorElement>('[data-cf-item]');
      const i = hit ? items.current.indexOf(hit) : -1;
      if (i < 0) return go(Math.round(pos.current));
      if (i === Math.round(pos.current) && Math.abs(pos.current - i) < 0.05) router.push(`/work/${projects[i].slug}`);
      else go(i);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(target.current + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(target.current - 1); }
      if (e.key === 'Enter') { e.preventDefault(); router.push(`/work/${projects[target.current].slug}`); }
    };
    const wheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 8) {
        e.preventDefault();
        const now = performance.now();
        if (now - lastWheel < 450) return;
        lastWheel = now;
        go(target.current + Math.sign(e.deltaX));
      }
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('keydown', key);
    el.addEventListener('wheel', wheel, { passive: false });
    addEventListener('resize', layout);
    projects.forEach((p) => router.prefetch(`/work/${p.slug}`));
    layout();
    return () => {
      cancelAnimationFrame(raf.current);
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.removeEventListener('keydown', key);
      el.removeEventListener('wheel', wheel);
      removeEventListener('resize', layout);
    };
  }, [go, layout, router]);

  const cur = projects[current];

  return (
    <section className="collection">
      <div className="cf-head wrap">
        <div>
          <p className="label">{shortType(cur)} / {cur.year}</p>
          <h1 className="cf-title" aria-live="polite">
            {cur.tibetan && <span className="tibetan" lang="bo">{cur.tibetan}</span>}
            <span>{cur.wylie ?? cur.title}</span>
          </h1>
        </div>
        <p className="label">{pad(current + 1)} / {total}</p>
      </div>

      <div ref={stage} className="cf-stage" tabIndex={0} aria-roledescription="carousel" aria-label="Selected works — arrow keys to browse, Enter to open">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            ref={(el) => { items.current[i] = el; }}
            href={`/work/${p.slug}`}
            className="sleeve"
            data-cf-item
            tabIndex={i === current ? 0 : -1}
            draggable={false}
            aria-label={`${pad(i + 1)} ${p.wylie ?? p.title} — ${p.typology}, ${p.year}`}
            onClick={(e) => { if (e.detail !== 0) e.preventDefault(); /* pointer clicks are handled on pointerup */ }}
          >
            <span className="sleeve-art">
              <Image src={p.cover} alt="" sizes="(max-width: 700px) 56vw, 320px" priority={i < 3} draggable={false} />
            </span>
            <span className="sleeve-band">
              <span className="sleeve-title">
                {p.tibetan && <span className="tibetan" lang="bo">{p.tibetan}</span>}
                <span>{p.wylie ?? p.title}</span>
              </span>
              <span className="sleeve-sub">{shortType(p)} / {p.year}</span>
              <span className="sleeve-foot"><span>Rigzen Phintso Bhutia</span><span>{pad(i + 1)} / {total}</span></span>
            </span>
            <span className="sleeve-shadow" aria-hidden="true" />
          </Link>
        ))}
      </div>

      <div className="cf-controls wrap">
        <button type="button" className="cf-arrow" onClick={() => go(target.current - 1)} disabled={current === 0} aria-label="Previous work">‹</button>
        <p className="cf-hint label">Click to select · Click the centred sleeve to open<br />Drag the sleeve to turn it</p>
        <button type="button" className="cf-arrow" onClick={() => go(target.current + 1)} disabled={current === projects.length - 1} aria-label="Next work">›</button>
      </div>
    </section>
  );
}
