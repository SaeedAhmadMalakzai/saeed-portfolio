import Image from "next/image";
import Link from "next/link";
import { getStageScreens } from "@/lib/data";
import type { Project } from "@/types";
import { BreakableName } from "./BreakableName";
import { BrowserFrame, BrowserShot, hostOf } from "./BrowserFrame";
import { MediaPhones } from "./Phone";
import { StatusPill } from "./StatusPill";
import { OutLink, tileLink } from "./links";

const TILE_SIZES = "(max-width: 720px) 100vw, 400px";
const PHONES_ON_A_TILE = 2;

/** The picture at the top of a tile, shaped by what the project is */
function TileMedia({ project }: { project: Project }) {
  if (project.screens?.length) {
    return (
      <div className="media">
        <MediaPhones screens={getStageScreens(project).slice(0, PHONES_ON_A_TILE)} />
      </div>
    );
  }
  const first = project.gallery?.[0];
  if (first) {
    return (
      <div className="media">
        <Image src={first.src} alt={first.alt} width={first.width} height={first.height} sizes={TILE_SIZES} className="shot" />
      </div>
    );
  }
  if (!project.image) return null;
  return (
    <BrowserFrame address={hostOf(project.liveUrl, project.name)}>
      <BrowserShot src={project.image} alt={`${project.name} home page`} sizes={TILE_SIZES} />
    </BrowserFrame>
  );
}

type Props = {
  project: Project;
};

/** A web platform, tool or contribution: picture, name, one line, status and a link */
export function ProjectTile({ project }: Props) {
  const href = `/projects/${project.slug}`;
  const action = tileLink(project);

  return (
    <article>
      <Link href={href} tabIndex={-1} aria-hidden className="block">
        <TileMedia project={project} />
      </Link>
      <p className="label mt-5 mb-1">{project.kicker}</p>
      <h3 className="mb-1 text-2xl font-extrabold tracking-[-0.03em]">
        <Link href={href} className="focus-ring hover:text-[var(--muted)]">
          <BreakableName name={project.name} />
        </Link>
      </h3>
      <p className="text-[15px] leading-[1.5] text-[var(--ink-3)]">{project.summary}</p>
      <div className="mt-[14px] flex flex-wrap items-center gap-4">
        <StatusPill status={project.status} />
        {action && <OutLink link={action} className="lnk" context={project.name} />}
      </div>
    </article>
  );
}

/** Tiles in a grid that holds three across on a wide screen */
export function TileGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-8 gap-y-14">
      {projects.map((project) => (
        <ProjectTile key={project.slug} project={project} />
      ))}
    </div>
  );
}
