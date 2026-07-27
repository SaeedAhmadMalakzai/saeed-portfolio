import Link from "next/link";
import type { Project } from "@/types";
import { Badge } from "./Badge";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold group-hover:underline">{project.title}</h3>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
        {project.platform && <span className="font-mono uppercase tracking-wider">{project.platform}</span>}
        {project.liveUrl && (
          <span className="inline-flex items-center gap-1 font-mono text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600" aria-hidden />
            Live
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-zinc-600">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 5).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </Link>
  );
}
