export default function SkillMeter({ name, level }: { name: string; level: number }) {
  return (
    <div className="skill" data-meter>
      <span className="skill-nm">{name}</span>
      <span className="skill-dots" role="img" aria-label={`${name}: ${level} out of 10`}>
        {Array.from({ length: 10 }, (_, i) => (
          <i key={i} className={i < level ? 'on' : undefined} style={{ '--d': i } as React.CSSProperties} />
        ))}
      </span>
    </div>
  );
}
