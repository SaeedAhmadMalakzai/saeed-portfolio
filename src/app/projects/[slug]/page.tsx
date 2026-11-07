import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ScreenGallery } from "@/components/ui/ScreenGallery";
import { ScreenshotViewer } from "@/components/ui/ScreenshotViewer";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: project.image ? { images: [project.image] } : undefined,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const hasPhoneScreens = Boolean(project.screens?.length);
  const hasGallery = Boolean(project.gallery?.length);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/projects" className="text-sm font-medium text-zinc-600 hover:underline">
        ← All projects
      </Link>
      <h1 className="mt-6 text-3xl font-bold">{project.title}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500">
        {project.platform && (
          <span className="font-mono uppercase tracking-wider">{project.platform}</span>
        )}
        {project.liveUrl && (
          <span className="inline-flex items-center gap-1 font-mono text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600" aria-hidden />
            Live
          </span>
        )}
        {project.client && <span>Client: {project.client}</span>}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      {project.fullImage ? (
        <ScreenshotViewer src={project.fullImage} alt={project.title} heightClass="h-[65vh] sm:h-[75vh]" />
      ) : project.image && !hasGallery && !hasPhoneScreens ? (
        <Image
          src={project.image}
          alt={project.title}
          width={1600}
          height={1000}
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="mt-8 h-auto w-full rounded-xl border border-zinc-200"
        />
      ) : null}

      {hasPhoneScreens && <ScreenGallery screens={project.screens!} variant="phone" />}

      <p className="mt-8 text-lg text-zinc-700">{project.description}</p>
      {project.highlights && project.highlights.length > 0 && (
        <ul className="mt-6 space-y-3">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-zinc-600">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-black" aria-hidden />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}
      {project.content && <p className="mt-4 text-zinc-600">{project.content}</p>}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {project.downloadUrl && (
          <ButtonLink href={project.downloadUrl} download>
            {project.downloadLabel ?? "Download"}
          </ButtonLink>
        )}
        {project.pageUrl && (
          <ButtonLink href={project.pageUrl} external variant={project.downloadUrl ? "outline" : "primary"}>
            Visit the project page
          </ButtonLink>
        )}
        {project.liveUrl && (
          <ButtonLink href={project.liveUrl} external>
            Visit Live Site
          </ButtonLink>
        )}
        {project.repoUrl && (
          <ButtonLink href={project.repoUrl} external variant="outline">
            View Code on GitHub
          </ButtonLink>
        )}
        {project.availability && (
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500">{project.availability}</span>
        )}
      </div>

      {hasGallery && <ScreenGallery screens={project.gallery!} variant="window" />}
    </main>
  );
}
