import Link from "next/link";
import type { Metadata } from "next";
import { TileGrid } from "@/components/showcase/ProjectTile";
import { ShelfHead } from "@/components/showcase/ShelfHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { getShelf, projects } from "@/lib/data";
import { pageMetadata } from "@/lib/site";
import { graph, projectsPageNodes } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Every project by Saeed Ahmad Malakzai: Android and iOS apps like 24Tabib, SayHello and Peygham, web platforms like Kaar.af, and tools for Chrome, macOS and Android.",
  path: "/projects",
});

export default function ProjectsPage() {
  const web = [...getShelf("web"), ...projects.filter((project) => project.contribution)];
  const shelves = [
    { id: "mobile", title: "Mobile apps", note: "Android · iOS", items: getShelf("mobile") },
    { id: "web", title: "Web platforms", note: "Live sites", items: web },
    { id: "tools", title: "Tools", note: "Chrome · macOS · Android", items: getShelf("tools") },
  ];

  return (
    <main id="main" className="wrap pb-24">
      <JsonLd data={graph(...projectsPageNodes())} />
      <p className="mt-6">
        <Link href="/" className="lnk border-b font-normal">
          ← Home
        </Link>
      </p>
      <h1 className="mt-10 text-[clamp(56px,9vw,128px)] font-black leading-[0.88] tracking-[-0.055em]">
        All projects
      </h1>
      <p className="mt-5 max-w-[44ch] text-[clamp(19px,2vw,24px)] leading-[1.4] text-[var(--ink-3)]">
        {projects.length} projects: apps you can download, sites you can visit and small tools.
      </p>

      {shelves.map((shelf) => (
        <section key={shelf.id} id={shelf.id} aria-labelledby={`${shelf.id}-title`}>
          <ShelfHead id={`${shelf.id}-title`} title={shelf.title} note={shelf.note} count={shelf.items.length} />
          <TileGrid projects={shelf.items} />
        </section>
      ))}
    </main>
  );
}
