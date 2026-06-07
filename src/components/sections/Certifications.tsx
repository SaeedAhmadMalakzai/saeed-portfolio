import { certifications } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Certifications() {
  return (
    <section id="certifications" className="py-16">
      <SectionHeading title="Certifications" />
      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <h3 className="font-semibold">{cert.name}</h3>
            <p className="text-sm text-zinc-600">{cert.issuer}</p>
            <p className="mt-1 text-xs text-zinc-500">{cert.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
