import type { MetadataRoute } from "next";
import { profile } from "@/lib/data";
import { SITE_DESCRIPTION } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: profile.name,
    short_name: profile.shortName,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
