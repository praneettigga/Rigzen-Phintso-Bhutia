import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SectionBar from '@/components/SectionBar';
import SkillMeter from '@/components/SkillMeter';
import Arrow from '@/components/Arrow';
import portrait from '@/assets/brand/portrait.jpg';
import { site, statement, education, skills, languages, interests, events, achievements } from '@/data/site';
import '@/styles/pages.css';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Rigzen Phintso Bhutia — 4th-year architecture student from Sikkim with Tibetan roots, studying at Manipal School of Architecture & Planning.',
  alternates: { canonical: '/about' },
};

const css = (o: Record<string, string>) => o as React.CSSProperties;

export default function AboutPage() {
  return (
    <>
      <section className="a-hero wrap">
        <p className="label" data-reveal>01 / Profile</p>
        <h1 className="a-title" data-split>
          A little context<span className="rose">.</span>
          <br />
          Never too much<span className="rose">.</span>
        </h1>
      </section>

      <section className="a-profile wrap">
        <figure className="a-ph" data-reveal>
          <div className="a-frame">
            <Image src={portrait} alt={`Portrait of ${site.name}`} sizes="(max-width: 860px) 80vw, 360px" />
          </div>
          <figcaption>
            <span className="tibetan rose" lang="bo">{site.tibetanName}</span>
            <span className="a-nm">{site.name}</span>
            <span className="label">{site.role}</span>
          </figcaption>
        </figure>
        <div className="a-stmt">
          {statement.map((s, i) => (
            <p key={i} className={i === 0 ? 'a-lead' : 'a-body'} data-reveal style={css({ '--delay': `${i * 120}ms` })}>{s}</p>
          ))}
          <p className="a-body rose-ink" data-reveal>
            This portfolio is a showcase of my personal work throughout my university journey. I’m Rigzen, a 21-year-old architecture student,
            and I aim to express myself through the work curated here.
          </p>
        </div>
      </section>

      <SectionBar num="02" title="roots" sub="sikkim · bhutia · tibetan" />
      <section className="a-roots wrap">
        <p className="a-big" data-split style={css({ '--stagger': '8ms' })}>Rigzen is Bhutia — from Sikkim, in the eastern Himalaya, with Tibetan roots.</p>
        <p className="a-body" data-reveal>
          That is why each project in this portfolio carries a Tibetan name: <span className="tibetan rose" lang="bo">བསྟེན་པ</span> <em>bsten-pa</em> (to
          stay) for the resort, <span className="tibetan rose" lang="bo">ལས་ཁུངས</span> <em>la-khung</em> (office) for the office, and{' '}
          <span className="tibetan rose" lang="bo">སྡོད་ཁང་</span> <em>sdod-khang</em> (dwelling) for the housing. The cover reads{' '}
          <span className="tibetan rose" lang="bo">{site.coverTibetan}</span> — architecture, works.
        </p>
      </section>

      <SectionBar num="03" title="education" sub="2008 — present" />
      <section className="a-list wrap">
        <ol className="a-timeline">
          {education.map((e, i) => (
            <li key={e.place} data-reveal style={css({ '--delay': `${i * 90}ms` })}>
              <span className="a-yr">{e.years}</span>
              <span className="a-pl">{e.place}</span>
              <span className="a-wh label">{e.where}</span>
            </li>
          ))}
        </ol>
      </section>

      <SectionBar num="04" title="software" sub="efficiency ✱ out of ten" />
      <section className="a-skills wrap">
        {skills.map((g) => (
          <div key={g.group} className="a-group" data-reveal>
            <h3>{g.group}</h3>
            {g.items.map((s) => <SkillMeter key={s.name} name={s.name} level={s.level} />)}
          </div>
        ))}
      </section>

      <SectionBar num="05" title="languages & interests" sub="five tongues / seven pastimes" />
      <section className="a-two wrap">
        <dl className="a-langs">
          {languages.map((l, i) => (
            <div key={l.name} data-reveal style={css({ '--delay': `${i * 70}ms` })}>
              <dt>{l.name}</dt>
              <dd>{l.level}</dd>
            </div>
          ))}
        </dl>
        <ul className="a-interests" data-reveal>
          {interests.map((x) => <li key={x}>{x}</li>)}
        </ul>
      </section>

      <SectionBar num="06" title="events & achievements" sub="on and off the drawing board" />
      <section className="a-list wrap">
        <ol className="a-timeline">
          {[...events, ...achievements].map((e, i) => (
            <li key={e.what} data-reveal style={css({ '--delay': `${i * 70}ms` })}>
              <span className="a-yr">{e.year}</span>
              <span className="a-pl">{e.what}</span>
            </li>
          ))}
        </ol>
        <Link href="/contact" className="arrow-link link-u a-cta" data-reveal>Write a note to Rigzen <Arrow /></Link>
      </section>
    </>
  );
}
