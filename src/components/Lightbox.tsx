'use client';
import { useEffect, useRef, useState } from 'react';
import { getLenis } from '@/lib/motion';
import '@/styles/lightbox.css';

/** One dialog for the whole site: any element with data-zoom opens it. */
export default function Lightbox() {
  const dlg = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [item, setItem] = useState<{ src: string; caption: string } | null>(null);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-zoom]');
      if (!btn) return;
      setItem({ src: btn.dataset.zoom!, caption: btn.dataset.caption ?? '' });
      setZoomed(false);
      dlg.current?.showModal();
      getLenis()?.stop();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const toggleZoom = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const r = img.getBoundingClientRect();
    const fx = (e.clientX - r.left) / r.width;
    const fy = (e.clientY - r.top) / r.height;
    setZoomed((z) => {
      if (!z)
        requestAnimationFrame(() => {
          const s = scroller.current;
          if (!s) return;
          s.scrollLeft = img.scrollWidth * fx - s.clientWidth / 2;
          s.scrollTop = img.scrollHeight * fy - s.clientHeight / 2;
        });
      return !z;
    });
  };

  return (
    <dialog
      ref={dlg}
      className="lightbox"
      aria-label="Enlarged drawing"
      onClose={() => getLenis()?.start()}
      onClick={(e) => e.target === dlg.current && dlg.current?.close()}
    >
      <form method="dialog" className="lb-top">
        <p className="label">{item?.caption}</p>
        <button className="lb-close label" aria-label="Close">Close ✕</button>
      </form>
      <div ref={scroller} className={`lb-scroller${zoomed ? ' zoomed' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- already an optimised /_next/image URL */}
        {item && <img src={item.src} alt={item.caption} onClick={toggleZoom} />}
      </div>
      <p className="lb-tip label">Click to look closer · Esc to close</p>
    </dialog>
  );
}
