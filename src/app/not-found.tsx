import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="standalone-state">
      <span className="eyebrow">404 · A SMALL DETOUR</span>
      <h1>This page isn’t here.</h1>
      <p>Let’s get you back to your workspace.</p>
      <Link href="/dashboard" className="button button-primary">
        <ArrowLeft size={17} />
        Back to dashboard
      </Link>
    </main>
  );
}
