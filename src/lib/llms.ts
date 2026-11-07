import type { Project } from "@/types";
import { certifications, education, getShelf, profile, projects, skills, socialLinks } from "./data";
import { CONTENT_UPDATED, SITE_DESCRIPTION, absoluteUrl } from "./site";

/**
 * Plain-text versions of the site for AI assistants (the llms.txt convention):
 * /llms.txt is the short index, /llms-full.txt has every project in full.
 * Both are built from the same data as the pages, so they never drift apart.
 */

const SHELVES = [
  { title: "Mobile apps", items: () => getShelf("mobile") },
  { title: "Web platforms", items: () => getShelf("web") },
  { title: "Tools", items: () => getShelf("tools") },
  { title: "Contributions", items: () => projects.filter((project) => project.contribution) },
];

function projectPage(project: Project): string {
  return absoluteUrl(`/projects/${project.slug}`);
}

function aboutLines(): string[] {
  const contacts = socialLinks.map((link) => `${link.name}: ${link.url}`);
  return [
    `- Name: ${profile.name} (also written Saeed Malakzai)`,
    `- Work: ${profile.title}, more than five years of experience`,
    `- Based in: ${profile.location}`,
    ...education.map((item) => `- Education: ${item.degree}, ${item.institution} (${item.period.toLowerCase()})`),
    `- Works with: ${skills.map((skill) => skill.name).join(", ")}`,
    `- Contact: ${profile.email} · ${contacts.join(" · ")} · contact form at ${absoluteUrl("/#contact")}`,
  ];
}

function projectLinks(project: Project): string[] {
  return [
    project.downloadUrl && `Download: ${project.downloadUrl}`,
    project.liveUrl && `Live site: ${project.liveUrl}`,
    project.pageUrl && `Project site: ${project.pageUrl}`,
    project.repoUrl && `Source code: ${project.repoUrl}`,
  ].filter((line): line is string => Boolean(line));
}

export function llmsIndex(): string {
  const lines = [`# ${profile.name}`, "", `> ${SITE_DESCRIPTION}`, "", ...aboutLines(), ""];
  for (const shelf of SHELVES) {
    const items = shelf.items();
    if (items.length === 0) continue;
    lines.push(`## ${shelf.title}`, "");
    for (const project of items) {
      const role = project.contribution ? ` My role: ${project.contribution.toLowerCase()}.` : "";
      lines.push(`- [${project.name}](${projectPage(project)}): ${project.summary} Status: ${project.status.label}.${role}`);
    }
    lines.push("");
  }
  lines.push(
    "## Optional",
    "",
    `- [Every project in full](${absoluteUrl("/llms-full.txt")}): descriptions, what Saeed built, technology and links`,
    `- [All projects page](${absoluteUrl("/projects")})`,
    "",
  );
  return lines.join("\n");
}

function projectInFull(project: Project): string[] {
  const facts = (project.facts ?? []).map((fact) => `- ${fact.label}: ${fact.value}`);
  const built = (project.highlights ?? []).map((item) => `- ${item}`);
  return [
    `## ${project.title}`,
    "",
    `Page: ${projectPage(project)}`,
    `Platform: ${project.kicker}`,
    `Status: ${project.status.label}`,
    ...(project.contribution ? [`Saeed's role: ${project.contribution}`] : [`Built by: ${profile.name}`]),
    ...projectLinks(project),
    "",
    project.description,
    "",
    ...(facts.length > 0 ? [...facts, ""] : []),
    ...(built.length > 0 ? ["What Saeed built:", "", ...built, ""] : []),
    `Technology: ${project.tags.join(", ")}`,
    "",
  ];
}

export function llmsFull(): string {
  const lines = [
    `# ${profile.name}: every project in full`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `Last updated: ${CONTENT_UPDATED}`,
    "",
    "## About",
    "",
    profile.bio,
    "",
    ...aboutLines(),
    `- Certifications: ${certifications.map((cert) => `${cert.name} (${cert.issuer})`).join("; ")}`,
    "",
  ];
  for (const project of projects) lines.push(...projectInFull(project));
  return lines.join("\n");
}
