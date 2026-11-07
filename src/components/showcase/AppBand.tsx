import Link from "next/link";
import { getStageScreens } from "@/lib/data";
import type { Project } from "@/types";
import { PhoneRow } from "./Phone";
import { StatusPill } from "./StatusPill";
import { OutLink, primaryLink } from "./links";

type Props = {
  project: Project;
  /** Position on the shelf, from 1 */
  position: number;
  /** Put the phones on the left on wide screens */
  flip?: boolean;
};

/** A mobile app on the home page: words on one side, large phone screens on the other */
export function AppBand({ project, position, flip = false }: Props) {
  const headingId = `band-${project.slug}`;
  const action = primaryLink(project);
  const caseHref = `/projects/${project.slug}`;
  const number = String(position).padStart(2, "0");

  return (
    <article
      aria-labelledby={headingId}
      className="grid items-center gap-12 border-b border-[var(--rule-soft)] py-16 lg:grid-cols-2 lg:py-[72px]"
    >
      <div className={flip ? "lg:order-2" : undefined}>
        <p className="label mb-[18px]">
          {number} · {project.kicker}
        </p>
        <h3
          id={headingId}
          className="mb-3 text-[clamp(40px,5vw,64px)] font-black leading-[0.95] tracking-[-0.045em]"
        >
          <Link href={caseHref} className="focus-ring hover:text-[var(--muted)]">
            {project.name}
          </Link>
        </h3>
        <StatusPill status={project.status} />
        <p className="mt-[18px] max-w-[42ch] text-lg leading-[1.55] text-[var(--ink-2)]">{project.summary}</p>
        <p className="mt-[14px] font-mono text-xs leading-[1.5] text-[var(--muted)]">{project.tags.join(" · ")}</p>
        <div className="mt-[26px] flex flex-wrap items-center gap-5">
          {action && <OutLink link={action} className="btn" context={project.name} />}
          <Link href={caseHref} className="lnk">
            Case study →<span className="sr-only"> {project.name}</span>
          </Link>
        </div>
      </div>
      <PhoneRow screens={getStageScreens(project)} label={`${project.name} screens`} />
    </article>
  );
}
