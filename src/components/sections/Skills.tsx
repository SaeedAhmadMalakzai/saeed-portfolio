import { skills } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="py-16">
      <SectionHeading
        title="Skills"
        subtitle="Technologies and tools I work with"
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 p-4 text-center"
          >
            <span className="text-sm font-medium">{skill.name}</span>
            <Badge>{skill.category}</Badge>
          </div>
        ))}
      </div>
    </section>
  );
}
