'use client';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SELECTOR = '[data-reveal],[data-wipe],[data-split],[data-write],[data-meter]';
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;
let observer: IntersectionObserver | null = null;
let held = false; // reveals wait while the overture is playing
let mm: gsap.MatchMedia | null = null;

export const getLenis = () => lenis;

/* smooth scroll — created once, survives client-side navigation */
export function initLenis() {
  if (lenis || reduced()) return;
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* character splitting (idempotent) */
function split(el: HTMLElement) {
  if (el.dataset.splitDone) return;
  el.dataset.splitDone = '1';
  let ci = 0;
  if (!el.getAttribute('aria-label') && el.tagName !== 'P') el.setAttribute('aria-label', el.textContent?.trim() ?? '');
  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        for (const part of (child.textContent ?? '').split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            frag.append(document.createTextNode(' '));
            continue;
          }
          const word = document.createElement('span');
          word.className = 'split-word';
          word.setAttribute('aria-hidden', 'true');
          for (const ch of Array.from(part)) {
            const c = document.createElement('span');
            c.className = 'split-char';
            c.textContent = ch;
            c.style.setProperty('--ci', String(ci++));
            word.append(c);
          }
          frag.append(word);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && !(child as HTMLElement).matches('br,svg,img')) {
        walk(child);
      }
    }
  };
  walk(el);
}

export function initReveals() {
  observer?.disconnect();
  held = document.documentElement.classList.contains('play-overture');
  document.querySelectorAll<HTMLElement>('[data-split]').forEach(split);
  const targets = document.querySelectorAll<HTMLElement>(SELECTOR);
  if (reduced()) {
    targets.forEach((t) => t.classList.add('is-in'));
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting || held) continue;
        e.target.classList.add('is-in');
        observer?.unobserve(e.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  targets.forEach((t) => observer!.observe(t));
}

/** The overture holds reveals until it finishes, then re-observes what it skipped. */
export function holdReveals(v: boolean) {
  held = v;
  if (v || !observer) return;
  document.querySelectorAll<HTMLElement>(SELECTOR).forEach((t) => {
    if (!t.classList.contains('is-in')) {
      observer!.unobserve(t);
      observer!.observe(t);
    }
  });
}

/* pinned horizontal panorama */
export function initPanoramas() {
  mm?.revert();
  mm = gsap.matchMedia();
  mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
    document.querySelectorAll<HTMLElement>('[data-panorama]').forEach((section) => {
      const track = section.querySelector<HTMLElement>('[data-panorama-track]');
      if (!track) return;
      const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'center center',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });
  });
}

export function teardown() {
  mm?.revert();
  mm = null;
  ScrollTrigger.getAll().forEach((t) => t.kill());
  observer?.disconnect();
}

export const refresh = () => ScrollTrigger.refresh();
