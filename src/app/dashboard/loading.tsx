export default function Loading() {
  return (
    <div
      className="loading-state"
      role="status"
      aria-label="Loading your workspace"
    >
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-description" />
      <div className="skeleton-grid">
        <div className="skeleton skeleton-card" />
        <div className="skeleton skeleton-card" />
      </div>
      <span className="sr-only">Loading your workspace…</span>
    </div>
  );
}
