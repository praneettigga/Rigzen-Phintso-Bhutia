'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getLenis, initLenis, initPanoramas, initReveals, refresh, teardown } from '@/lib/motion';

/** Runs the scroll/reveal system after every route change. */
export default function MotionRoot() {
  const pathname = usePathname();
  useEffect(() => {
    initLenis();
    getLenis()?.scrollTo(0, { immediate: true, force: true });
    initReveals();
    initPanoramas();
    const raf = requestAnimationFrame(refresh);
    const onLoad = () => refresh();
    window.addEventListener('load', onLoad);
    // images settling change the layout; refresh a little later too
    const t = setTimeout(refresh, 1200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener('load', onLoad);
      teardown();
    };
  }, [pathname]);
  return null;
}
