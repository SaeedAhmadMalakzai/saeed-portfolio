import Image from "next/image";
import { certifications, education, profile, skills } from "@/lib/data";
import { ShelfHead } from "@/components/showcase/ShelfHead";
import { GitHubActivity } from "./GitHubActivity";

/** Skills grouped by category, in the order the categories first appear */
function skillGroups(): [string, string[]][] {
  const groups = new Map<string, string[]>();
  for (const skill of skills) {
    groups.set(skill.category, [...(groups.get(skill.category) ?? []), skill.name]);
  }
  return [...groups.entries()];
}

function ListBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[var(--rule)] pt-4">
      <h3 className="label mb-4">{title}</h3>
      {children}
    </div>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="wrap">
      <ShelfHead id="about-title" title="About" note={`${profile.location} · 5+ years`} />
      <div className="grid gap-12 py-16 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
        <figure className="max-w-[320px]">
          <Image
            src="/images/saeed-illustration.jpg"
            alt={`Illustrated portrait of ${profile.name}`}
            width={1000}
            height={1000}
            sizes="320px"
            className="block h-auto w-full"
          />
          <figcaption className="label mt-3 text-[11px]">
            {profile.name} · {profile.location}
          </figcaption>
        </figure>

        <div className="min-w-0">
          <p className="max-w-[34ch] text-[clamp(24px,2.4vw,32px)] font-semibold leading-[1.3] tracking-[-0.02em]">
            I’m Saeed, a full-stack and mobile developer in Kabul. For more than five years I have designed, built and
            shipped web, mobile and desktop apps from start to finish.
          </p>
          <p className="mt-6 max-w-[62ch] text-lg leading-[1.65] text-[var(--ink-2)]">
            I work in TypeScript and JavaScript (Next.js, React, Vue and Nuxt, Node.js), Python (Django, Flask, FastAPI),
            Kotlin and Swift with SwiftUI. I have hands-on experience with real-time features over WebSockets and
            WebRTC, payment and escrow integrations, database design, AI and language-model integration, and
            deployment on Linux servers and cloud platforms.
          </p>

          <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-10">
            <ListBlock title="Work with">
              <dl className="space-y-3 text-[15px] leading-[1.5]">
                {skillGroups().map(([category, names]) => (
                  <div key={category}>
                    <dt className="font-mono text-xs text-[var(--muted)]">{category}</dt>
                    <dd className="text-[var(--ink-2)]">{names.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </ListBlock>
            <ListBlock title="Education">
              <ul className="space-y-3 text-[15px] leading-[1.5]">
                {education.map((item) => (
                  <li key={item.institution}>
                    <p className="font-semibold">{item.degree}</p>
                    <p className="text-[var(--ink-3)]">{item.institution}</p>
                    <p className="font-mono text-xs text-[var(--muted)]">{item.period}</p>
                  </li>
                ))}
              </ul>
            </ListBlock>
            <ListBlock title="Certifications">
              <ul className="space-y-2 text-[15px] leading-[1.5] text-[var(--ink-2)]">
                {certifications.map((cert) => (
                  <li key={cert.name}>
                    {cert.name}
                    <span className="text-[var(--muted)]">
                      {" "}
                      · {cert.issuer}
                      {cert.date ? `, ${cert.date}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </ListBlock>
          </div>

          <div className="mt-12 overflow-x-auto bg-[var(--ink)] p-4">
            <GitHubActivity />
          </div>
        </div>
      </div>
    </section>
  );
}
