"use client";

import { RefreshCw } from "lucide-react";

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <section className="empty-state">
      <span className="eyebrow">LET’S TRY THAT AGAIN</span>
      <h1>We couldn’t load this page.</h1>
      <p>Your workspace is still here. Give it another try.</p>
      <button onClick={reset} className="button button-primary">
        <RefreshCw size={17} />
        Try again
      </button>
    </section>
  );
}
