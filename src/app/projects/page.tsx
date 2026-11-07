import Link from "next/link";
import type { Metadata } from "next";
import { TileGrid } from "@/components/showcase/ProjectTile";
import { ShelfHead } from "@/components/showcase/ShelfHead";
import { getShelf, projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Android, iOS, web, macOS and Chrome extension projects: 24Tabib, SayHello, Peygham, Kaar.af, Find&Filter_Tenders-Afg, JobPulse and more.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const web = [...getShelf("web"), ...projects.filter((project) => project.contribution)];
  const archive = projects.filter((project) => project.archived);
  const shelves = [
    { id: "mobile", title: "Mobile apps", note: "Android · iOS", items: getShelf("mobile") },
    { id: "web", title: "Web platforms", note: "Live sites", items: web },
    { id: "tools", title: "Tools", note: "Chrome · macOS · Android", items: getShelf("tools") },
  ];

  return (
    <main id="main" className="wrap pb-24">
      <p className="mt-6">
        <Link href="/" className="lnk border-b font-normal">
          ← Home
        </Link>
      </p>
      <h1 className="mt-10 text-[clamp(56px,9vw,128px)] font-black leading-[0.88] tracking-[-0.055em]">
        All projects
      </h1>
      <p className="mt-5 max-w-[44ch] text-[clamp(19px,2vw,24px)] leading-[1.4] text-[var(--ink-3)]">
        {projects.length} projects: apps you can download, sites you can visit, small tools, and older work.
      </p>

      {shelves.map((shelf) => (
        <section key={shelf.id} id={shelf.id} aria-labelledby={`${shelf.id}-title`}>
          <ShelfHead id={`${shelf.id}-title`} title={shelf.title} note={shelf.note} count={shelf.items.length} />
          <TileGrid projects={shelf.items} />
        </section>
      ))}

      {archive.length > 0 && (
        <section id="archive" aria-labelledby="archive-title">
          <ShelfHead id="archive-title" title="Archive" note="No live site or public code right now" count={archive.length} />
          <TileGrid projects={archive} />
        </section>
      )}
    </main>
  );
}
