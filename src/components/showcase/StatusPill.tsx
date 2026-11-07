import type { ProjectStatus, StatusTone } from "@/types";

const DOT_COLOUR: Record<StatusTone, string> = {
  live: "var(--live)",
  download: "var(--download)",
  soon: "var(--soon)",
  source: "var(--source)",
  archive: "var(--archive)",
};

type Props = {
  status: ProjectStatus;
};

export function StatusPill({ status }: Props) {
  return (
    <span className="pill">
      <span className="dot" style={{ background: DOT_COLOUR[status.tone] }} aria-hidden />
      {status.label}
    </span>
  );
}
