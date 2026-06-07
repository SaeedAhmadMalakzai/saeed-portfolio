import { profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="py-16">
      <SectionHeading title="About" subtitle="A bit about me" />
      <p className="max-w-2xl text-zinc-700">{profile.bio}</p>
      <p className="mt-2 text-sm text-zinc-500">{profile.location}</p>
    </section>
  );
}
