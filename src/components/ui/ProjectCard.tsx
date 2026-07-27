import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";
import { Badge } from "./Badge";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const panImage = project.fullImage ?? project.image;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      {panImage && (
        <div
          className="relative h-44 w-full overflow-hidden border-b border-zinc-100"
          style={{ backgroundColor: "#e8e8e3", ["--pan-window" as string]: "11rem" }}
        >
          <Image
            src={panImage}
            alt={`Screenshot of ${project.title}`}
            width={720}
            height={2000}
            sizes="(max-width: 640px) 100vw, 33vw"
            className="pan-on-hover w-full h-auto"
          />
          <span className="absolute right-2 top-2 bg-black/80 px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.2em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Preview
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-semibold group-hover:underline">{project.title}</h3>
        <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
          {project.platform && (
            <span className="font-mono uppercase tracking-wider">{project.platform}</span>
          )}
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
      </div>
    </Link>
  );
}
