import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { navigationItems } from "@/config/navigation";
import {
  AnnouncementList,
  EventList,
  ProblemCard,
} from "@/components/dashboard/overview";
import { ResourceExplorer } from "@/components/dashboard/resource-explorer";
import { EventShowcase } from "@/components/dashboard/event-showcase";
import { featuredEvent } from "@/fixtures/dashboard";

type Props = {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ tab?: string }>;
};

const descriptions: Record<string, string> = {
  pod: "A fresh perspective starts with a good problem.",
  resources: "Good places to practice. Useful tools to keep you moving.",
  events: "Make room for a challenge, a new idea, or a conversation.",
  announcements: "The latest news and little updates from your community.",
  leaderboard: "A space to celebrate the community’s progress.",
  coordinators: "Meet the people bringing the hub together.",
  connect: "Find your people. Keep the conversation going.",
  feedback: "A better hub starts with listening to its members.",
};

const upcomingCopy: Record<string, { title: string; body: string }> = {
  leaderboard: {
    title: "Great progress deserves a place.",
    body: "Community rankings are coming in a future release. Keep exploring and find your next challenge in Practice Resources.",
  },
  coordinators: {
    title: "The people behind the hub.",
    body: "Our coordinator directory is on its way. Soon you’ll be able to meet the team and find the right person to connect with.",
  },
  connect: {
    title: "Better when we learn together.",
    body: "Community channels will be collected here soon, making it easier to find a practice partner and share what you’re learning.",
  },
  feedback: {
    title: "Your ideas will have a home here.",
    body: "The feedback space is coming soon. It will be a simple way to share suggestions and help shape the future of the hub.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  return {
    title:
      navigationItems.find((item) => item.href === `/dashboard/${section}`)
        ?.label ?? "Page not found",
  };
}

export default async function SectionPage({ params, searchParams }: Props) {
  const { section } = await params;
  const item = navigationItems.find(
    (entry) => entry.href === `/dashboard/${section}`,
  );
  if (!item) notFound();
  const { tab } = await searchParams;
  const upcoming = upcomingCopy[section];
  const Icon = item.icon;

  return (
    <div className={`section-page section-page-${section}`}>
      <section className="page-heading">
        <div>
          <span className="eyebrow">YOUR KNUTH WORKSPACE</span>
          <h1>
            {item.label}
            <span className="greeting-dot">.</span>
          </h1>
          <p>{descriptions[section]}</p>
        </div>
      </section>
      {section === "pod" && (
        <>
          <ProblemCard standalone />
          <div className="info-card">
            <h2>Make it a learning moment</h2>
            <p>
              Think through the pattern before you write any code. Try a few
              small values of n, consider when a split is possible, and then
              build your approach. Opening the problem takes you to CSES in a
              new tab.
            </p>
            <p className="sample-note">
              This featured problem is a sample selection. The daily schedule
              and problem archive will arrive with live hub content.
            </p>
          </div>
        </>
      )}
      {section === "resources" && (
        <ResourceExplorer tab={tab === "tools" ? "tools" : "practice"} />
      )}
      {section === "events" && (
        <>
          <div className="section-block-heading">
            <h2>Featured contest</h2>
            <span className="tag">Sample recap</span>
          </div>
          <EventShowcase event={featuredEvent} />
          <section className="panel events-upcoming">
            <div className="panel-heading">
              <h2>Coming up in the community</h2>
              <span className="tag">Sample events</span>
            </div>
            <EventList />
          </section>
          <p className="sample-note">
            Preview schedule · All event times are shown in India Standard Time
            (IST).
          </p>
        </>
      )}
      {section === "announcements" && (
        <>
          <section className="panel">
            <AnnouncementList />
          </section>
          <p className="sample-note">
            Sample announcements for the design preview.
          </p>
        </>
      )}
      {upcoming && (
        <section className="empty-state">
          <span className="empty-state-icon">
            <Icon size={28} strokeWidth={1.5} />
          </span>
          <span className="eyebrow">COMING SOON</span>
          <h2>{upcoming.title}</h2>
          <p>{upcoming.body}</p>
          <Link href="/dashboard" className="button button-secondary">
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>
        </section>
      )}
    </div>
  );
}
