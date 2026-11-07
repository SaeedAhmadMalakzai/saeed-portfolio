import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNextProject, getProjectBySlug, getStageScreens, projects } from "@/lib/data";
import { BreakableName, LONG_NAME } from "@/components/showcase/BreakableName";
import { BrowserFrame, BrowserShot, ScrollingPage, hostOf } from "@/components/showcase/BrowserFrame";
import { Phone, PhoneRow } from "@/components/showcase/Phone";
import { StatusPill } from "@/components/showcase/StatusPill";
import { OutLink, primaryLink, secondaryLinks } from "@/components/showcase/links";
import type { Project, Screenshot } from "@/types";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const PORTRAIT_STAGE_ITEMS = 2;

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

function isPortrait(shot: Screenshot): boolean {
  return shot.height > shot.width;
}

/** The big picture under the title: phones, a scrolling page, a window, or a browser shot */
function Stage({ project }: { project: Project }) {
  if (project.screens?.length) {
    return (
      <div className="border-b border-[var(--rule-soft)] py-6 sm:py-12">
        <PhoneRow screens={getStageScreens(project)} label={`${project.name} screens`} priority />
      </div>
    );
  }
  const address = hostOf(project.liveUrl, project.name);
  if (project.fullImage) {
    return (
      <div className="pt-12">
        <BrowserFrame address={address} hint="Scroll inside">
          <ScrollingPage src={project.fullImage} alt={`${project.name}, the whole home page`} />
        </BrowserFrame>
      </div>
    );
  }
  const gallery = project.gallery ?? [];
  if (gallery.length > 0) {
    const items = isPortrait(gallery[0]) ? gallery.slice(0, PORTRAIT_STAGE_ITEMS) : gallery.slice(0, 1);
    return (
      <div className="flex flex-wrap items-start justify-center gap-6 border-b border-[var(--rule-soft)] py-12">
        {items.map((shot) => (
          <Image
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes={isPortrait(shot) ? "(max-width: 640px) 100vw, 420px" : "(max-width: 1280px) 100vw, 1100px"}
            priority
            className={`shot h-auto ${isPortrait(shot) ? "w-full max-w-[420px]" : "w-full max-w-[1100px]"}`}
          />
        ))}
      </div>
    );
  }
  if (!project.image) return null;
  return (
    <div className="pt-12">
      <BrowserFrame address={address}>
        <BrowserShot src={project.image} alt={`${project.name} home page`} sizes="(max-width: 1280px) 100vw, 1184px" priority />
      </BrowserFrame>
    </div>
  );
}

/** Every screen with a one-line caption */
function Screens({ project }: { project: Project }) {
  const phones = project.screens ?? [];
  const gallery = project.gallery ?? [];
  if (phones.length === 0 && gallery.length === 0) return null;
  const portraitGallery = gallery.length > 0 && isPortrait(gallery[0]);
  const columns = phones.length
    ? "grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"
    : portraitGallery
      ? "grid-cols-[repeat(auto-fill,minmax(220px,1fr))]"
      : "grid-cols-[repeat(auto-fill,minmax(min(100%,420px),1fr))]";

  return (
    <section aria-labelledby="screens-title" className="pb-20">
      <h2 id="screens-title" className="mb-8 font-display text-4xl font-medium">
        Screens
      </h2>
      <div className={`grid gap-x-5 gap-y-8 ${columns}`}>
        {phones.map((screen) => (
          <figure key={screen.src}>
            <Phone screen={screen} alt="" sizes="(max-width: 640px) 45vw, 200px" />
            <figcaption className="mt-3 font-mono text-xs leading-[1.5] text-[var(--muted)]">{screen.alt}</figcaption>
          </figure>
        ))}
        {gallery.map((shot) => (
          <figure key={shot.src}>
            <Image
              src={shot.src}
              alt=""
              width={shot.width}
              height={shot.height}
              sizes={portraitGallery ? "(max-width: 640px) 100vw, 300px" : "(max-width: 900px) 100vw, 600px"}
              className="shot h-auto w-full"
            />
            <figcaption className="mt-3 font-mono text-xs leading-[1.5] text-[var(--muted)]">{shot.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/** A link to the next project, with a glimpse of it */
function NextProject({ project }: { project: Project }) {
  const next = getNextProject(project.slug);
  const phones = getStageScreens(next).slice(0, 2);
  const preview = next.gallery?.[0];

  return (
    <Link
      href={`/projects/${next.slug}`}
      className="group block border-t-2 border-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--ink)]"
    >
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-10 py-14">
        <div>
          <p className="label mb-2">Next project</p>
          <p className="text-[clamp(44px,6vw,80px)] font-black leading-[0.9] tracking-[-0.05em] [overflow-wrap:anywhere] group-hover:text-[var(--muted)]">
            <BreakableName name={next.name} /> →
          </p>
          <p className="label mt-4">{next.kicker}</p>
        </div>
        <div className="flex justify-center gap-[18px]" aria-hidden>
          {phones.length > 0 ? (
            phones.map((screen) => (
              <div key={screen.src} className="w-[clamp(110px,13vw,180px)]">
                <Phone screen={screen} alt="" sizes="180px" />
              </div>
            ))
          ) : preview ? (
            <Image src={preview.src} alt="" width={preview.width} height={preview.height} sizes="420px" className="shot h-auto max-h-[300px] w-auto max-w-full" />
          ) : next.image ? (
            <div className="w-full max-w-[460px]">
              <BrowserFrame address={hostOf(next.liveUrl, next.name)}>
                <BrowserShot src={next.image} alt="" sizes="460px" />
              </BrowserFrame>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const primary = primaryLink(project);
  const others = secondaryLinks(project);

  return (
    <main id="main">
      <div className="wrap">
        <p className="mt-6">
          <Link href="/projects" className="lnk border-b font-normal">
            ← All projects
          </Link>
        </p>

        <section aria-labelledby="project-title" className="pt-10">
          <p className="label mb-2">{project.kicker}</p>
          <h1
            id="project-title"
            className={`break-words font-black leading-[0.88] tracking-[-0.055em] ${
              project.name.length > LONG_NAME ? "text-[clamp(40px,7vw,104px)]" : "text-[clamp(48px,9vw,128px)]"
            }`}
          >
            <BreakableName name={project.name} />
          </h1>
          <p className="mt-5 max-w-[34ch] text-[clamp(20px,2.2vw,28px)] leading-[1.35] text-[var(--ink-3)]">
            {project.tagline}
          </p>
          {(primary || others.length > 0) && (
            <div className="mt-8 flex flex-wrap items-center gap-5">
              {primary && <OutLink link={primary} className="btn" />}
              {others.map((link) => (
                <OutLink key={link.href} link={link} className="lnk" />
              ))}
            </div>
          )}

          <dl className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] border-y border-[var(--rule)]">
            <div className="py-[18px] pr-5">
              <dt className="label mb-2">Status</dt>
              <dd>
                <StatusPill status={project.status} />
              </dd>
            </div>
            {project.facts?.map((fact) => (
              <div key={fact.label} className="py-[18px] pr-5">
                <dt className="label mb-2">{fact.label}</dt>
                <dd className="text-base font-semibold leading-[1.45]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Stage project={project} />

        <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-14 py-[72px]">
          <div>
            <h2 className="mb-5 font-display text-4xl font-medium">What it does</h2>
            <p className="max-w-[46ch] text-lg leading-[1.65] text-[var(--ink-2)]">{project.description}</p>
            <p className="mt-6 font-mono text-xs leading-[1.6] text-[var(--muted)]">{project.tags.join(" · ")}</p>
          </div>
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h2 className="mb-5 font-display text-4xl font-medium">What I built</h2>
              <ol>
                {project.highlights.map((highlight, index) => (
                  <li
                    key={highlight}
                    className="grid grid-cols-[40px_1fr] gap-3 border-t border-[var(--rule-soft)] py-4 text-base leading-[1.55] text-[var(--ink-2)]"
                  >
                    <span className="font-mono text-xs leading-[1.9] text-[var(--muted)]" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {highlight}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>

        <Screens project={project} />
      </div>

      <NextProject project={project} />
    </main>
  );
}
