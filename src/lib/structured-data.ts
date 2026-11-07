import type { Project } from "@/types";
import { education, profile, projects, skills, socialLinks } from "./data";
import { CONTENT_UPDATED, SITE_DESCRIPTION, SITE_TITLE, SITE_URL, absoluteUrl } from "./site";

/**
 * schema.org descriptions of the site, its author and every project, as JSON-LD.
 * Search engines use them for rich results; AI assistants use them to tell who built what.
 */

type Node = Record<string, unknown>;

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PROJECTS_URL = absoluteUrl("/projects");

const person = { "@id": PERSON_ID };

export function graph(...nodes: Node[]): Node {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function personNode(): Node {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    alternateName: "Saeed Malakzai",
    givenName: "Saeed Ahmad",
    familyName: "Malakzai",
    jobTitle: profile.title,
    description: profile.bio,
    url: SITE_URL,
    image: profile.avatar ? absoluteUrl(profile.avatar) : undefined,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Kabul", addressCountry: "AF" },
    alumniOf: education.map((item) => ({
      "@type": "CollegeOrUniversity",
      name: item.institution.replace(/, Kabul$/, ""),
      address: { "@type": "PostalAddress", addressLocality: "Kabul", addressCountry: "AF" },
    })),
    knowsAbout: skills.map((skill) => skill.name),
    sameAs: socialLinks.map((link) => link.url),
  };
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: profile.name,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    author: person,
    publisher: person,
  };
}

/** The home page: a profile page about Saeed, listing the work */
export function homeNodes(): Node[] {
  return [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: person,
      dateModified: CONTENT_UPDATED,
      inLanguage: "en",
      hasPart: projects.map((project) => ({ "@id": appId(project) })),
    },
    ...projects.map(appNode),
  ];
}

function projectUrl(project: Project): string {
  return absoluteUrl(`/projects/${project.slug}`);
}

function appId(project: Project): string {
  return `${projectUrl(project)}#app`;
}

function screenshotUrls(project: Project): string[] {
  return [...(project.screens ?? []), ...(project.gallery ?? [])].map((shot) => absoluteUrl(shot.src));
}

/** One project as a schema.org app or website, credited to Saeed */
export function appNode(project: Project): Node {
  const isWebsite = project.app.type === "WebSite";
  const links = [project.liveUrl, project.pageUrl, project.repoUrl].filter(Boolean);
  const screenshots = screenshotUrls(project);
  return {
    "@type": project.app.type,
    "@id": appId(project),
    name: project.name,
    description: project.description,
    url: project.liveUrl ?? project.pageUrl ?? projectUrl(project),
    image: project.image ? absoluteUrl(project.image) : undefined,
    ...(isWebsite
      ? {}
      : {
          applicationCategory: project.app.category,
          operatingSystem: project.app.operatingSystem,
          screenshot: screenshots.length > 0 ? screenshots : undefined,
          downloadUrl: project.downloadUrl,
          // Only downloads are known to be free; other projects make no price claim
          offers: project.downloadUrl ? { "@type": "Offer", price: "0", priceCurrency: "USD" } : undefined,
        }),
    keywords: project.tags.join(", "),
    ...(project.contribution ? { contributor: person } : { author: person, creator: person }),
    sameAs: links.length > 0 ? links : undefined,
    subjectOf: { "@id": projectUrl(project) },
  };
}

function breadcrumbNode(url: string, trail: { name: string; url: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/** A project's case-study page, the app it describes, and the way back up */
export function projectPageNodes(project: Project): Node[] {
  const url = projectUrl(project);
  return [
    {
      "@type": "WebPage",
      "@id": url,
      url,
      name: project.title,
      description: project.description,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": appId(project) },
      author: person,
      primaryImageOfPage: project.image ? absoluteUrl(project.image) : undefined,
      breadcrumb: { "@id": `${url}#breadcrumb` },
      dateModified: CONTENT_UPDATED,
      inLanguage: "en",
    },
    appNode(project),
    breadcrumbNode(url, [
      { name: "Home", url: SITE_URL },
      { name: "Projects", url: PROJECTS_URL },
      { name: project.name, url },
    ]),
  ];
}

/** The all-projects page as a numbered list of every project */
export function projectsPageNodes(): Node[] {
  return [
    {
      "@type": "CollectionPage",
      "@id": PROJECTS_URL,
      url: PROJECTS_URL,
      name: `Projects by ${profile.name}`,
      isPartOf: { "@id": WEBSITE_ID },
      author: person,
      breadcrumb: { "@id": `${PROJECTS_URL}#breadcrumb` },
      dateModified: CONTENT_UPDATED,
      inLanguage: "en",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: projectUrl(project),
          name: project.title,
        })),
      },
    },
    breadcrumbNode(PROJECTS_URL, [
      { name: "Home", url: SITE_URL },
      { name: "Projects", url: PROJECTS_URL },
    ]),
  ];
}
