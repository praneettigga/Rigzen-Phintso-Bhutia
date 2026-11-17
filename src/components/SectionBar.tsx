// Grace-style section starter: a thin bordered bar, big title left, small subtitle right.
export default function SectionBar({ title, sub, num }: { title: string; sub?: string; num?: string }) {
  return (
    <div className="section-bar wrap" data-reveal>
      <div className="sb-inner">
        <h2>
          {num && <span className="sb-num">{num}</span>}
          {title}
          <span className="rose">.</span>
        </h2>
        {sub && <p className="label">{sub}</p>}
      </div>
    </div>
  );
}
