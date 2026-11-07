import Link from "next/link";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { AppBand } from "@/components/showcase/AppBand";
import { Hero } from "@/components/showcase/Hero";
import { TileGrid } from "@/components/showcase/ProjectTile";
import { ShelfHead } from "@/components/showcase/ShelfHead";
import { getShelf, projects } from "@/lib/data";

export default function Home() {
  const mobile = getShelf("mobile");
  const web = getShelf("web");
  const tools = getShelf("tools");
  const offShelf = projects.filter((project) => !project.shelf);

  return (
    <main id="main">
      <Hero />

      <section id="mobile" aria-labelledby="mobile-title" className="wrap">
        <ShelfHead id="mobile-title" title="Mobile apps" note="Android · iOS" count={mobile.length} />
        {mobile.map((project, index) => (
          <AppBand key={project.slug} project={project} position={index + 1} flip={index % 2 === 1} />
        ))}
      </section>

      <section id="web" aria-labelledby="web-title" className="wrap">
        <ShelfHead id="web-title" title="Web platforms" note="Live sites" count={web.length} />
        <TileGrid projects={web} />
      </section>

      <section id="tools" aria-labelledby="tools-title" className="wrap pb-24">
        <ShelfHead id="tools-title" title="Tools" note="Chrome · macOS · Android" count={tools.length} />
        <TileGrid projects={tools} />
        {offShelf.length > 0 && (
          <p className="mt-16 font-mono text-xs leading-[1.6] text-[var(--muted)]">
            Also on the projects page:{" "}
            {offShelf.map((project, index) => (
              <span key={project.slug}>
                {index > 0 && ", "}
                <Link href={`/projects/${project.slug}`} className="underline underline-offset-4 hover:text-[var(--ink)]">
                  {project.name}
                </Link>
                {project.contribution ? " (contribution)" : project.archived ? " (archive)" : ""}
              </span>
            ))}
            .{" "}
            <Link href="/projects" className="text-[var(--ink)] underline underline-offset-4">
              All {projects.length} projects →
            </Link>
          </p>
        )}
      </section>

      <About />
      <Contact />
    </main>
  );
}
