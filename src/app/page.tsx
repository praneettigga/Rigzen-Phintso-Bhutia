import Link from 'next/link';
import Hero from '@/components/Hero';
import CoverStatement from '@/components/CoverStatement';
import ContentsStrip from '@/components/ContentsStrip';
import SectionBar from '@/components/SectionBar';
import Arrow from '@/components/Arrow';
import { statement } from '@/data/site';

export default function Home() {
  return (
    <>
      <Hero />
      <CoverStatement />
      <ContentsStrip />
      <SectionBar title="about" sub="sikkim / tibetan roots / manipal" />
      <section className="about-teaser wrap">
        <p className="about-teaser-big" data-split style={{ '--stagger': '8ms' } as React.CSSProperties}>{statement[0]}</p>
        <div className="about-teaser-side" data-reveal>
          <p>{statement[1]}</p>
          <Link href="/about" className="arrow-link link-u">More about Rigzen <Arrow /></Link>
        </div>
      </section>
    </>
  );
}
