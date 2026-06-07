import Link from "next/link";
import { getFeaturedProjects } from "@/lib/data";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProjectsPreview() {
  const featured = getFeaturedProjects(3);

  return (
    <section id="projects" className="py-16">
      <SectionHeading
        title="Projects"
        subtitle="Featured work and side projects"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <Link
        href="/projects"
        className="mt-8 inline-block text-sm font-medium hover:underline"
      >
        View all projects →
      </Link>
    </section>
  );
}
