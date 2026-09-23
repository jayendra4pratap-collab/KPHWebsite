"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Search } from "lucide-react";
import { resources } from "@/fixtures/dashboard";
import { ResourceMark } from "@/components/dashboard/overview";

export function ResourceExplorer({ tab }: { tab: "practice" | "tools" }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const matches = resources.filter(
    (resource) =>
      resource.category === tab &&
      `${resource.name} ${resource.description} ${resource.tag}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );

  return (
    <>
      <div className="resource-toolbar">
        <div
          className="resource-tabs"
          role="group"
          aria-label="Resource category"
        >
          <button
            aria-pressed={tab === "practice"}
            onClick={() =>
              router.push("/dashboard/resources", { scroll: false })
            }
          >
            Practice platforms
          </button>
          <button
            aria-pressed={tab === "tools"}
            onClick={() =>
              router.push("/dashboard/resources?tab=tools", { scroll: false })
            }
          >
            Useful tools
          </button>
        </div>
        <label className="search-field">
          <Search size={16} />
          <span className="sr-only">Search resources</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a platform or topic…"
            type="search"
          />
        </label>
      </div>
      <div className="resource-grid catalog-grid">
        {matches.map((resource) => (
          <a
            key={resource.name}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card"
          >
            <div className="resource-card-top">
              <ResourceMark resource={resource} />
              <ArrowUpRight size={18} />
            </div>
            <h3>{resource.name}</h3>
            <p>{resource.description}</p>
            <span className="resource-category">{resource.tag}</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
      <p role="status" className="resource-count">
        {matches.length} {matches.length === 1 ? "resource" : "resources"}
        {query ? ` matching “${query}”` : " to explore"}
      </p>
      {matches.length === 0 && (
        <div className="empty-state">
          <span className="empty-state-icon">
            <Search size={26} />
          </span>
          <h2>No resources found</h2>
          <p>
            Try another name or topic, or clear your search to explore
            everything.
          </p>
          <button
            className="button button-secondary"
            onClick={() => setQuery("")}
          >
            Clear search
          </button>
        </div>
      )}
    </>
  );
}
