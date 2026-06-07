import Link from "next/link";
import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <SectionHeading
        title="All Projects"
        subtitle="A collection of my work"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <Link
        href="/"
        className="mt-8 inline-block text-sm font-medium hover:underline"
      >
        ← Back to home
      </Link>
    </main>
  );
}
