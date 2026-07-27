import Link from "next/link";
import type { Metadata } from "next";
import { certifications, education, projects } from "@/lib/data";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production web, mobile, and desktop projects — Kankor.af, Hire.af, Kaar.af, Parly, Peygham, Rahnaward, JobPulse, and Jirga.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <SectionHeading
        title="All Projects"
        subtitle="Production web, mobile, and desktop applications I have designed, built, and shipped"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <section className="mt-16 grid gap-10 sm:grid-cols-2" aria-label="Education and certifications">
        <div>
          <h2 className="text-lg font-semibold uppercase tracking-[0.15em]">Education</h2>
          <ul className="mt-4 space-y-4">
            {education.map((item) => (
              <li key={item.institution}>
                <p className="font-medium">{item.degree}</p>
                <p className="text-sm text-zinc-600">{item.institution}</p>
                <p className="text-sm text-zinc-500">{item.period}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold uppercase tracking-[0.15em]">Certifications</h2>
          <ul className="mt-4 space-y-2">
            {certifications.map((cert) => (
              <li key={cert.name} className="text-sm text-zinc-700">
                {cert.name}
                <span className="text-zinc-500"> — {cert.issuer}{cert.date ? `, ${cert.date}` : ""}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Link
        href="/"
        className="mt-12 inline-block text-sm font-medium hover:underline"
      >
        ← Back to home
      </Link>
    </main>
  );
}
