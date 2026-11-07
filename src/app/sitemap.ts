import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

const SITE_URL = "https://saeedmalakzai.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const projectPages = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...projectPages];
}
