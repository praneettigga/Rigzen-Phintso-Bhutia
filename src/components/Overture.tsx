'use client';
/*
  Opening sequence, after edisonfangworkshop.com's "overture", rebuilt around Rigzen's own drawings:
  a 000→100 counter on a single coral line → the Tibetan title → a one-point perspective grid
  opening from the vanishing point → the lines folding into one poster frame → the page.
  Plays once per session on the home page (decided before paint in app/layout.tsx).
*/
import { useEffect, useRef } from 'react';
import { getImageProps } from 'next/image';
import poster from '@/assets/brand/thank-you-poster.jpg';
import { site } from '@/data/site';
import { holdReveals } from '@/lib/motion';
import '@/styles/overture.css';

const END = 6100;
const clamp = (x: number) => Math.max(0, Math.min(1, x));
const smooth = (x: number) => {
  x = clamp(x);
  return x * x * (3 - 2 * x);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const set = (el: Element | null, attrs: Record<string, string | number>) => {
  if (!el) return;
  for (const k in attrs) el.setAttribute(k, String(attrs[k]));
};

function perspective(w: number, h: number) {
  const cx = w / 2, cy = h / 2;
  const segs: number[][] = [];
  for (let k = 1; k <= 7; k++) {
    const s = Math.pow(k / 7, 1.9) * 1.04;
    const l = cx - (w / 2) * s, r = cx + (w / 2) * s, t = cy - (h / 2) * s, b = cy + (h / 2) * s;
    segs.push([l, t, r, t], [r, t, r, b], [r, b, l, b], [l, b, l, t]);
  }
  const n = 8;
  for (let i = 0; i <= n; i++) {
    const fx = (w * i) / n, fy = (h * i) / n;
    segs.push([cx, cy, fx, 0], [cx, cy, fx, h], [cx, cy, 0, fy], [cx, cy, w, fy]);
  }
  return segs;
}

export default function Overture() {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const posterSrc = getImageProps({ src: poster, alt: '', width: 640 }).props.src;

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains('play-overture') || !root.current || !svg.current) return;
    holdReveals(true);
    const el = root.current;
    const s = svg.current;
    const q = (sel: string) => s.querySelector(sel);
    const grid = q('.ov-grid')!;
    let w = 0, h = 0, segs: number[][] = [];
    const lines: SVGLineElement[] = [];
    let card = { x: 0, y: 0, w: 0, h: 0 };

    const layout = () => {
      w = innerWidth;
      h = innerHeight;
      s.setAttribute('viewBox', `0 0 ${w} ${h}`);
      segs = perspective(w, h);
      while (lines.length < segs.length) {
        const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        grid.append(l);
        lines.push(l);
      }
      const ch = Math.min(h * 0.52, w * 0.9 * 1.6);
      const cw = ch * 0.62;
      card = { x: (w - cw) / 2, y: (h - ch) / 2 - h * 0.03, w: cw, h: ch };
    };
    layout();
    addEventListener('resize', layout);

    let start = 0, raf = 0, done = false;

    const render = (ms: number) => {
      const p = clamp(ms / 1600);
      const exit = smooth((ms - 1700) / 450);
      const top = h * 0.36;
      const tip = h * (0.36 + 0.26 * p);
      set(q('.ov-light'), { x1: w / 2, x2: w / 2, y1: tip - 18, y2: tip, opacity: 1 - exit });
      set(q('.ov-spine'), { x1: w / 2, x2: w / 2, y1: mix(top, tip, exit), y2: tip, opacity: 0.18 * (1 - exit) });
      const count = q('.ov-count')!;
      count.textContent = String(Math.round(p * 100)).padStart(3, '0');
      set(count, { x: w / 2, y: tip + 24, opacity: 1 - exit });

      const tibIn = smooth((ms - 1800) / 400), tibOut = smooth((ms - 2550) / 350);
      set(q('.ov-tib'), { x: w / 2, y: h / 2 + 14 - 10 * tibIn, opacity: tibIn * (1 - tibOut) });

      const flatten = smooth((ms - 3900) / 800);
      const edges = [
        [card.x, card.y, card.x + card.w, card.y],
        [card.x + card.w, card.y, card.x + card.w, card.y + card.h],
        [card.x + card.w, card.y + card.h, card.x, card.y + card.h],
        [card.x, card.y + card.h, card.x, card.y],
      ];
      segs.forEach((sg, i) => {
        const delay = i < 28 ? Math.floor(i / 4) * 40 : 120 + (i % 9) * 18;
        const spread = smooth((ms - 2700 - delay) / 800);
        const d = edges[i % 4];
        const c = sg.map((v, j) => mix(mix(j % 2 ? h / 2 : w / 2, v, spread), d[j], flatten));
        set(lines[i], { x1: c[0], y1: c[1], x2: c[2], y2: c[3], opacity: spread * mix(0.55, i < 4 ? 0.9 : 0, flatten) });
      });

      const frameIn = smooth((ms - 4500) / 300);
      set(q('.ov-frame'), { x: card.x - 9, y: card.y - 9, width: card.w + 18, height: card.h + 18, opacity: frameIn });
      set(q('.ov-poster'), { x: card.x, y: card.y, width: card.w, height: card.h, opacity: smooth((ms - 4500) / 600) });
      set(q('.ov-cap'), { x: w / 2, y: card.y + card.h + 44, opacity: smooth((ms - 4800) / 400) });

      const out = smooth((ms - 5500) / 600);
      el.style.opacity = String(1 - out);
      if (out > 0.3) holdReveals(false);
    };

    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      try {
        sessionStorage.setItem('overture-seen', '1');
      } catch {}
      html.classList.remove('play-overture');
      el.style.opacity = '';
      holdReveals(false);
    };
    const tick = (t: number) => {
      if (!start) start = t;
      const ms = t - start;
      render(ms);
      if (ms < END && !done) raf = requestAnimationFrame(tick);
      else finish();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') finish();
    };
    const skip = el.querySelector('.ov-skip')!;
    skip.addEventListener('click', finish);
    addEventListener('keydown', onKey);
    raf = requestAnimationFrame(tick);
    return () => {
      // unmounting mid-sequence (navigation / strict-mode) ends it cleanly
      cancelAnimationFrame(raf);
      removeEventListener('resize', layout);
      removeEventListener('keydown', onKey);
      skip.removeEventListener('click', finish);
      if (!done)
        setTimeout(() => {
          if (!el.isConnected) {
            html.classList.remove('play-overture');
            holdReveals(false);
          }
        }, 0);
    };
  }, []);

  return (
    <div id="overture" ref={root} aria-hidden="true">
      <svg ref={svg} className="ov-svg" xmlns="http://www.w3.org/2000/svg">
        <g className="ov-grid" stroke="#f3d9db" strokeWidth="0.7" fill="none" />
        <rect className="ov-frame" fill="none" stroke="#ea9396" strokeWidth="1" strokeDasharray="5 4" opacity="0" />
        <image className="ov-poster" href={posterSrc} preserveAspectRatio="xMidYMid slice" opacity="0" />
        <line className="ov-spine" stroke="#ea9396" strokeWidth="0.8" opacity="0.18" />
        <line className="ov-light" stroke="#ea9396" strokeWidth="1.6" strokeLinecap="round" />
        <text className="ov-count" fill="#f3d9db" textAnchor="middle">000</text>
        <text className="ov-tib" fill="#fbeff0" textAnchor="middle" opacity="0">{site.coverTibetan}</text>
        <text className="ov-cap" fill="#f3d9db" textAnchor="middle" opacity="0">RIGZEN PHINTSO BHUTIA · SELECTED WORKS 2023 — 2026</text>
      </svg>
      <button className="ov-skip" type="button">Enter</button>
    </div>
  );
}
