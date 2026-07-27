"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

const CELL_COLORS = [
  "rgba(232, 232, 227, 0.06)",
  "rgba(232, 232, 227, 0.18)",
  "rgba(232, 232, 227, 0.35)",
  "rgba(232, 232, 227, 0.60)",
  "rgba(232, 232, 227, 0.90)",
];

const LABEL_COLOR = "rgba(232, 232, 227, 0.5)";
const FADED_COLOR = "rgba(232, 232, 227, 0.4)";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubStats {
  publicRepos: number;
  followers: number;
}

interface ContributionData {
  total: number;
  weeks: ContributionDay[][];
}

function groupIntoWeeks(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  let week: ContributionDay[] = [];

  days.forEach((day) => {
    const weekday = new Date(day.date).getDay();
    if (weekday === 0 && week.length > 0) {
      weeks.push(week);
      week = [];
    }
    week.push(day);
  });
  if (week.length > 0) weeks.push(week);
  return weeks;
}

function ContributionCell({ day }: { day: ContributionDay }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const dateLabel = new Date(day.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="relative flex-shrink-0"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div
          className="absolute z-50 px-3 py-1.5 text-xs font-mono rounded-md pointer-events-none"
          style={{
            backgroundColor: "#ffffff",
            color: "#1f2328",
            left: "50%",
            bottom: "calc(100% + 6px)",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          {day.count} contribution{day.count === 1 ? "" : "s"} on {dateLabel}
        </div>
      )}
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: CELL_COLORS[day.level] ?? CELL_COLORS[0],
        }}
      />
    </div>
  );
}

export function GitHubActivity() {
  const [contributions, setContributions] = useState<ContributionData | null>(null);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [contribRes, userRes] = await Promise.all([
          fetch(
            `https://github-contributions-api.jogruber.de/v4/${profile.githubUsername}?y=last`
          ),
          fetch(`https://api.github.com/users/${profile.githubUsername}`),
        ]);

        if (!contribRes.ok) throw new Error("contributions fetch failed");
        const contribJson = await contribRes.json();
        const days: ContributionDay[] = contribJson.contributions ?? [];
        if (days.length === 0) throw new Error("no contribution data");

        if (cancelled) return;
        setContributions({
          total: contribJson.total?.lastYear ?? days.reduce((s, d) => s + d.count, 0),
          weeks: groupIntoWeeks(days),
        });

        if (userRes.ok) {
          const userJson = await userRes.json();
          if (!cancelled) {
            setStats({
              publicRepos: userJson.public_repos ?? 0,
              followers: userJson.followers ?? 0,
            });
          }
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const profileUrl = `https://github.com/${profile.githubUsername}`;

  if (failed) {
    return (
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono" style={{ color: FADED_COLOR }}>
          Live GitHub activity unavailable right now.
        </span>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono underline underline-offset-2"
          style={{ color: LABEL_COLOR }}
        >
          github.com/{profile.githubUsername}
        </a>
      </div>
    );
  }

  // Month labels derived from the real weeks
  const monthLabels: (string | null)[] =
    contributions?.weeks.map((week, i) => {
      const first = new Date(week[0].date);
      const month = first.toLocaleDateString("en-US", { month: "short" });
      if (i === 0) return month;
      const prev = new Date(contributions.weeks[i - 1][0].date);
      const prevMonth = prev.toLocaleDateString("en-US", { month: "short" });
      return month !== prevMonth ? month : null;
    }) ?? [];

  return (
    <div className="w-full">
      {/* Header row: profile link + live stats */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-mono underline underline-offset-2 hover:opacity-100"
          style={{ color: LABEL_COLOR }}
        >
          github.com/{profile.githubUsername}
        </a>
        {stats && (
          <div className="flex gap-4">
            <span className="text-[10px] font-mono" style={{ color: FADED_COLOR }}>
              {stats.publicRepos} public repos
            </span>
            <span className="text-[10px] font-mono" style={{ color: FADED_COLOR }}>
              {stats.followers} followers
            </span>
          </div>
        )}
      </div>

      {contributions ? (
        <>
          {/* Month labels */}
          <div className="flex gap-[2px] mb-1">
            {contributions.weeks.map((_, i) => (
              <div key={i} className="flex-shrink-0" style={{ width: "10px" }}>
                {monthLabels[i] && (
                  <span
                    className="text-[10px] font-mono whitespace-nowrap"
                    style={{ color: LABEL_COLOR }}
                  >
                    {monthLabels[i]}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Contribution grid */}
          <div className="flex gap-[2px]">
            {contributions.weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[2px]">
                {/* Pad the first partial week so weekdays align */}
                {wi === 0 &&
                  Array.from({ length: new Date(week[0].date).getDay() }).map((_, i) => (
                    <div key={`pad-${i}`} style={{ width: "10px", height: "10px" }} />
                  ))}
                {week.map((day) => (
                  <ContributionCell key={day.date} day={day} />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-[10px] font-mono" style={{ color: FADED_COLOR }}>
              {contributions.total.toLocaleString()} contributions in the last year
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono" style={{ color: FADED_COLOR }}>
                Less
              </span>
              {CELL_COLORS.map((color) => (
                <div
                  key={color}
                  style={{ width: "10px", height: "10px", backgroundColor: color }}
                />
              ))}
              <span className="text-[10px] font-mono" style={{ color: FADED_COLOR }}>
                More
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="h-[90px] flex items-center">
          <span className="text-[10px] font-mono" style={{ color: FADED_COLOR }}>
            Loading GitHub activity…
          </span>
        </div>
      )}
    </div>
  );
}
