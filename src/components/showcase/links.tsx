import type { Project } from "@/types";

export type ProjectLink = {
  href: string;
  label: string;
  external: boolean;
};

/** The one thing a visitor can do with a project right now: download it, open it, or read its page */
export function primaryLink(project: Project): ProjectLink | null {
  if (project.downloadUrl) {
    return { href: project.downloadUrl, label: `${project.downloadLabel ?? "Download"} ↓`, external: false };
  }
  if (project.liveUrl) return { href: project.liveUrl, label: "Visit the site ↗", external: true };
  if (project.pageUrl) return { href: project.pageUrl, label: "Project page ↗", external: true };
  if (project.repoUrl) return { href: project.repoUrl, label: "Code on GitHub ↗", external: true };
  return null;
}

/** The other ways in, for the project page */
export function secondaryLinks(project: Project): ProjectLink[] {
  const primary = primaryLink(project)?.href;
  const candidates: ProjectLink[] = [
    ...(project.pageUrl ? [{ href: project.pageUrl, label: "Project page ↗", external: true }] : []),
    ...(project.liveUrl ? [{ href: project.liveUrl, label: "Visit the site ↗", external: true }] : []),
    ...(project.repoUrl ? [{ href: project.repoUrl, label: "Code on GitHub ↗", external: true }] : []),
  ];
  return candidates.filter((link) => link.href !== primary);
}

/** A short link for tiles: "Get it", "Visit" or "Page" */
export function tileLink(project: Project): ProjectLink | null {
  if (project.downloadUrl) return { href: project.downloadUrl, label: "Get it ↓", external: false };
  if (project.liveUrl) return { href: project.liveUrl, label: "Visit ↗", external: true };
  if (project.pageUrl) return { href: project.pageUrl, label: "Page ↗", external: true };
  if (project.repoUrl) return { href: project.repoUrl, label: "Code ↗", external: true };
  return null;
}

type Props = {
  link: ProjectLink;
  className: string;
  /** Names the project for screen readers when the label alone is vague ("Get it") */
  context?: string;
};

export function OutLink({ link, className, context }: Props) {
  const external = link.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a href={link.href} className={className} {...external}>
      {link.label}
      {context && <span className="sr-only"> ({context})</span>}
    </a>
  );
}
