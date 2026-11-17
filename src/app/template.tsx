// Re-mounts on every navigation, giving each page a soft enter.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route">{children}</div>;
}
