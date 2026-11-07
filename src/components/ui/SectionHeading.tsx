import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  /** Use "h1" when the heading is the page title */
  as?: "h1" | "h2";
}

export function SectionHeading({ title, subtitle, className, as: Tag = "h2" }: SectionHeadingProps) {
  return (
    <div className={cn("mb-8", className)}>
      <Tag className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</Tag>
      {subtitle && <p className="mt-2 text-zinc-600">{subtitle}</p>}
    </div>
  );
}
