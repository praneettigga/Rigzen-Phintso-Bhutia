import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;
let observer: IntersectionObserver | null = null;
let held = false; // reveals wait while the overture is playing
let mm: gsap.MatchMedia | null = null;

export function getLenis() {
  return lenis;
}

/* ───────── smooth scroll (persists across client-side navigations) ───────── */
function initLenis() {
  if (lenis || reduced()) return;
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ───────── character splitting ───────── */
function split(el: HTMLElement) {
  if (el.dataset.splitDone) return;
  el.dataset.splitDone = '1';
  let ci = 0;
  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? '';
        const frag = document.createDocumentFragment();
        for (const part of text.split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            frag.append(document.createTextNode(' '));
            continue;
          }
          const word = document.createElement('span');
          word.className = 'split-word';
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
  // keep the full sentence available to assistive tech
  if (!el.getAttribute('aria-label') && el.tagName !== 'P') el.setAttribute('aria-label', el.textContent?.trim() ?? '');
  walk(el);
}

/* ───────── reveal on scroll ───────── */
function initReveals() {
  observer?.disconnect();
  document.querySelectorAll<HTMLElement>('[data-split]').forEach(split);
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal],[data-wipe],[data-split],[data-write],[data-meter]');
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

/** Called by the overture: hold reveals until it finishes, then re-run the observer. */
export function holdReveals(v: boolean) {
  held = v;
  if (!v) {
    // re-observe anything that was skipped while held
    document
      .querySelectorAll<HTMLElement>('[data-reveal],[data-wipe],[data-split],[data-write],[data-meter]')
      .forEach((t) => {
        if (!t.classList.contains('is-in')) {
          observer?.unobserve(t);
          observer?.observe(t);
        }
      });
  }
}

/* ───────── horizontal panorama (pinned, scroll-driven) ───────── */
function initPanoramas() {
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

/* ───────── header state ───────── */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  let last = 0;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    header.classList.toggle('is-hidden', y > 300 && y > last && !document.documentElement.classList.contains('menu-open'));
    last = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  return () => window.removeEventListener('scroll', onScroll);
}

let cleanupHeader: (() => void) | undefined;

document.addEventListener('astro:page-load', () => {
  initLenis();
  lenis?.scrollTo(0, { immediate: true });
  initReveals();
  initPanoramas();
  cleanupHeader?.();
  cleanupHeader = initHeader();
  // images may change layout after load
  requestAnimationFrame(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
});

document.addEventListener('astro:before-swap', () => {
  mm?.revert();
  mm = null;
  ScrollTrigger.getAll().forEach((t) => t.kill());
  observer?.disconnect();
});
