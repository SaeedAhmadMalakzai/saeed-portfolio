import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/projects"
        className="text-sm font-medium text-zinc-600 hover:underline"
      >
        ← All projects
      </Link>
      <h1 className="mt-6 text-3xl font-bold">{project.title}</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      {project.image && (
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={450}
          className="mt-8 rounded-xl object-cover"
        />
      )}
      <p className="mt-8 text-lg text-zinc-700">{project.description}</p>
      {project.content && (
        <p className="mt-4 text-zinc-600">{project.content}</p>
      )}
      <div className="mt-8 flex flex-wrap gap-4">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <Button>Live Demo</Button>
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">View Code</Button>
          </a>
        )}
      </div>
    </main>
  );
}
