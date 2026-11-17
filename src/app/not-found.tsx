import Link from 'next/link';
import Arrow from '@/components/Arrow';
import '@/styles/pages.css';

export default function NotFound() {
  return (
    <section className="nf wrap">
      <p className="label">Sheet missing / 404</p>
      <h1>This drawing isn’t in the set<span className="rose">.</span></h1>
      <Link href="/" className="arrow-link link-u">Return to the cover <Arrow /></Link>
    </section>
  );
}
