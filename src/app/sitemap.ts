import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { CONTENT_UPDATED, absoluteUrl } from "@/lib/site";

const LAST_MODIFIED = new Date(CONTENT_UPDATED);

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: absoluteUrl("/"),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 1,
    images: [absoluteUrl("/og.jpg"), absoluteUrl("/images/saeed-illustration.jpg")],
  };
  const projectsPage = {
    url: absoluteUrl("/projects"),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  };
  // Each project page lists its cover and screenshots, so they can appear in image search
  const projectPages = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: project.shelf === "mobile" ? 0.8 : 0.6,
    images: [project.image, ...(project.screens ?? []).map((s) => s.src), ...(project.gallery ?? []).map((s) => s.src)]
      .filter((src): src is string => Boolean(src))
      .map(absoluteUrl),
  }));
  return [home, projectsPage, ...projectPages];
}
