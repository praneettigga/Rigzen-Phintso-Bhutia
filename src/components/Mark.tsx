// Line-drawn monogram: a pitched roof over an open threshold (after the resort pavilions)
export default function Mark({ size = 34, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size * 0.8} viewBox="0 0 40 32" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M1 31V13L13 3l12 10v18" />
      <path d="M8 31V19h10v12" />
      <path d="M25 31V21l7-6 7 6v10" />
      <path d="M0 31h40" />
    </svg>
  );
}
