"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  CalendarDays,
  ChevronRight,
  Clock3,
  CodeXml,
  Gauge,
  MapPin,
  Megaphone,
  Pin,
  Sparkles,
} from "lucide-react";
import {
  announcements,
  dailyProblem,
  events,
  resources,
} from "@/fixtures/dashboard";
import { useProfile } from "@/components/profile-provider";
import { DetailDialog } from "@/components/ui/detail-dialog";
import type { Resource } from "@/types";
import HeroSection from "../HeroSection";

export function ResourceMark({ resource }: { resource: Resource }) {
  return (
    <span aria-hidden="true" className={`resource-mark mark-${resource.color}`}>
      {resource.name === "Codeforces" ? (
        <span className="cf-bars">
          <i />
          <i />
          <i />
        </span>
      ) : (
        resource.mark
      )}
    </span>
  );
}

export function ProblemCard({ standalone = false }: { standalone?: boolean }) {
  return (
    <section
      className={`problem-card${standalone ? " problem-standalone" : ""}`}
      aria-labelledby="problem-title"
    >
      <div className="problem-label">
        <span>
          <CodeXml size={17} />
          PROBLEM OF THE DAY
        </span>
        <span className="difficulty">
          <span />
          {dailyProblem.difficulty}
        </span>
      </div>
      <div className="problem-content">
        <div className="problem-copy">
          <h2 id="problem-title">
            {dailyProblem.title}
            <span>.</span>
          </h2>
          <p>{dailyProblem.description}</p>
          <div className="problem-tags">
            <span>{dailyProblem.platform}</span>
            <span className="tag-dot">·</span>
            {dailyProblem.topics.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
          <a
            href={dailyProblem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-primary"
          >
            Open problem <ArrowUpRight size={17} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className="problem-visual" aria-hidden="true">
          <span className="visual-caption">ONE SET. TWO POSSIBILITIES.</span>
          <div className="number-set">
            <span>1</span>
            <span>2</span>
            <span>4</span>
            <span>7</span>
          </div>
          <div className="set-connector">
            <span />
            <b>14 = 14</b>
            <span />
          </div>
          <div className="number-set second-set">
            <span>3</span>
            <span>5</span>
            <span>6</span>
          </div>
          <span className="visual-footnote">Find the balance.</span>
        </div>
      </div>
      <div className="problem-footer">
        <span>
          <Sparkles size={14} />
          Small challenges. Lasting progress.
        </span>
        <Link href="/dashboard/pod">
          Explore problem <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

export function EventList() {
  return (
    <div className="event-list">
      {events.map((event) => (
        <DetailDialog
          key={event.id}
          title={event.title}
          description={event.date}
          trigger={
            <button className="event-row">
              <span className="event-date">
                <span>{event.month}</span>
                <strong>{event.day}</strong>
              </span>
              <span className="event-copy">
                <strong>{event.title}</strong>
                <span>
                  {event.time}
                  <i />
                  {event.location}
                </span>
              </span>
              <ChevronRight size={16} className="row-chevron" />
            </button>
          }
        >
          <span className="tag">{event.category}</span>
          <p>{event.description}</p>
          <p className="event-location">
            <MapPin size={16} />
            {event.location}
          </p>
        </DetailDialog>
      ))}
    </div>
  );
}

export function AnnouncementList() {
  return (
    <div className="announcement-list">
      {announcements.map((announcement) => (
        <DetailDialog
          key={announcement.id}
          title={announcement.title}
          description={announcement.date}
          trigger={
            <button className="announcement-row">
              <span
                className={`announcement-icon ${announcement.pinned ? "pinned" : ""}`}
              >
                {announcement.pinned ? (
                  <Pin size={16} />
                ) : (
                  <span className="announcement-dot" />
                )}
              </span>
              <span className="announcement-copy">
                <span className="announcement-meta">
                  {announcement.pinned && (
                    <span>
                      Pinned<span className="meta-dot">·</span>
                    </span>
                  )}
                  {announcement.date}
                </span>
                <strong>{announcement.title}</strong>
                <span>{announcement.excerpt}</span>
              </span>
              <ArrowUpRight size={16} className="row-chevron" />
            </button>
          }
        >
          <p>{announcement.body}</p>
        </DetailDialog>
      ))}
    </div>
  );
}

export function DashboardOverview() {
  const { profile } = useProfile();
  return (
    <>
      <HeroSection />
      <section className="page-heading">
        <div>
          <span className="eyebrow">YOUR DAILY DOSE OF PROGRESS</span>
          <h1>
            Welcome back, {profile.displayName.trim().split(/\s+/)[0]}
            <span className="greeting-dot">.</span>
          </h1>
          <p>A good day to learn something new. Let’s get into it.</p>
        </div>
      </section>

      <div className="dashboard-grid">
        <div className="dashboard-primary">
          <ProblemCard />
          <section className="section-block" aria-labelledby="practice-title">
            <div className="section-heading">
              <div>
                <h2 id="practice-title">Find your next challenge</h2>
                <p>Your favorite platforms, one click away.</p>
              </div>
              <Link className="text-link" href="/dashboard/resources">
                All resources <ArrowRight size={15} />
              </Link>
            </div>
            <div className="resource-grid">
              {resources
                .filter((resource) => resource.category === "practice")
                .slice(0, 4)
                .map((resource) => (
                  <a
                    key={resource.name}
                    className="resource-card"
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="resource-card-top">
                      <ResourceMark resource={resource} />
                      <span className="resource-title">
                        <h3>{resource.name}</h3>
                        <span>
                          {resource.tag}
                          <span className="meta-dot">·</span>
                          {new URL(resource.url).hostname.replace(/^www\./, "")}
                        </span>
                      </span>
                      <ArrowUpRight size={17} />
                    </div>
                    <p>{resource.description}</p>
                    {(resource.level || resource.cadence) && (
                      <div className="resource-meta">
                        {resource.level && (
                          <span>
                            <Gauge size={14} aria-hidden="true" />
                            {resource.level}
                          </span>
                        )}
                        {resource.cadence && (
                          <span>
                            <CalendarClock size={14} aria-hidden="true" />
                            {resource.cadence}
                          </span>
                        )}
                      </div>
                    )}
                    {resource.highlights && (
                      <ul className="resource-highlights">
                        {resource.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
            </div>
          </section>
        </div>

        <aside className="dashboard-secondary" aria-label="Hub updates">
          <section className="panel hub-panel" aria-labelledby="events-title">
            <div className="panel-heading">
              <h2 id="events-title">
                <CalendarDays size={16} aria-hidden="true" />
                On the calendar
              </h2>
              <Link href="/dashboard/events" className="text-link">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <EventList />
          </section>
          <section
            className="panel hub-panel"
            aria-labelledby="announcements-title"
          >
            <div className="panel-heading">
              <h2 id="announcements-title">
                <Megaphone
                  size={16}
                  aria-hidden="true"
                  className="megaphone-icon"
                />
                From the hub
              </h2>
              <Link href="/dashboard/announcements" className="text-link">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <AnnouncementList />
          </section>
        </aside>

        <section className="tools-section" aria-labelledby="tools-title">
          <div className="section-heading">
            <div>
              <h2 id="tools-title">A few tools in your corner</h2>
              <p>Less searching. More problem solving.</p>
            </div>
            <Link className="text-link" href="/dashboard/resources?tab=tools">
              Explore tools <ArrowRight size={15} />
            </Link>
          </div>
          <div className="tools-grid">
            {resources
              .filter((resource) => resource.category === "tools")
              .map((resource) => (
                <a
                  className="tool-card"
                  key={resource.name}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ResourceMark resource={resource} />
                  <span>
                    <strong>{resource.name}</strong>
                    <span>{resource.description}</span>
                  </span>
                  <ArrowUpRight size={17} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
          </div>
        </section>
      </div>
      <p className="dashboard-sample-note">
        <Clock3 size={13} />
        You’re viewing sample content. Your hub’s latest updates will live here.
      </p>
    </>
  );
}
