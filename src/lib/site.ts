import type { Metadata } from "next";
import { profile } from "./data";

export const SITE_URL = "https://saeedmalakzai.vercel.app";

export const SITE_TITLE = `${profile.name}: Android, iOS and Web Developer in Kabul`;

export const SITE_DESCRIPTION =
  "Saeed Ahmad Malakzai is a full-stack and mobile developer in Kabul, Afghanistan, building Android and iOS apps, web platforms and tools like 24Tabib and SayHello.";

/** The day the site's content last changed, given to search engines in the sitemap and structured data */
export const CONTENT_UPDATED = "2026-11-07";

/** The share picture used when a page has none of its own */
export const DEFAULT_SHARE_IMAGE = { url: "/og.jpg", width: 1200, height: 630 };

type ShareImage = { url: string; width: number; height: number };

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: ShareImage;
  imageAlt?: string;
};

/**
 * Full metadata for one page. Next.js replaces (not merges) a parent's openGraph and
 * twitter objects, so every page sets all of them here.
 */
export function pageMetadata({ title, description, path, image, imageAlt }: PageMetadataInput): Metadata {
  const shareImage = image ?? DEFAULT_SHARE_IMAGE;
  const alt = imageAlt ?? title;
  return {
    // The home page title stands alone; every other page gets "| Saeed Ahmad Malakzai" added
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: profile.name,
      locale: "en_US",
      type: path === "/" ? "profile" : "website",
      images: [{ ...shareImage, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: shareImage.url, alt }],
    },
  };
}
