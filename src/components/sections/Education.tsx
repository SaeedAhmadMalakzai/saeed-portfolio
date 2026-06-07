import { education } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Education() {
  return (
    <section id="education" className="py-16">
      <SectionHeading title="Education" />
      <div className="space-y-6">
        {education.map((item) => (
          <div
            key={`${item.institution}-${item.degree}`}
            className="relative border-l-2 border-zinc-200 pl-6"
          >
            <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-foreground" />
            <h3 className="font-semibold">{item.degree}</h3>
            <p className="text-sm text-zinc-600">{item.institution}</p>
            <p className="text-xs text-zinc-500">{item.period}</p>
            {item.description && (
              <p className="mt-2 text-sm text-zinc-700">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
