import Link from "next/link";
import { profile, projects, socialLinks } from "@/lib/data";

const BUILD_YEAR = new Date().getFullYear();

export function Footer() {
  const contributions = projects.filter((project) => project.contribution);
  const archive = projects.filter((project) => project.archived);
  const phoneHref = profile.phone ? `tel:${profile.phone.replace(/\s+/g, "")}` : undefined;

  return (
    <footer className="border-t-2 border-[var(--ink)]">
      <div className="wrap grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Link href="/" className="focus-ring font-display text-[28px] leading-none">
            saeed
          </Link>
          <p className="label mt-4">
            {profile.name} · {profile.location}
          </p>
        </div>

        <div className="space-y-6 text-[15px] leading-[1.6]">
          {contributions.length > 0 && (
            <div>
              <h2 className="label mb-2">Also worked on</h2>
              <ul>
                {contributions.map((project) => (
                  <li key={project.slug}>
                    <Link href={`/projects/${project.slug}`} className="underline underline-offset-4 hover:text-[var(--muted)]">
                      {project.name}
                    </Link>{" "}
                    <span className="text-[var(--muted)]">({project.contribution?.toLowerCase()})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {archive.length > 0 && (
            <div>
              <h2 className="label mb-2">Archive</h2>
              <p>
                {archive.map((project, index) => (
                  <span key={project.slug}>
                    {index > 0 && " · "}
                    <Link href={`/projects/${project.slug}`} className="underline underline-offset-4 hover:text-[var(--muted)]">
                      {project.name}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2 text-[15px] leading-[1.6]">
          <h2 className="label mb-2">Get in touch</h2>
          <p>
            <a href={`mailto:${profile.email}`} className="underline underline-offset-4 hover:text-[var(--muted)]">
              {profile.email}
            </a>
          </p>
          {profile.phone && phoneHref && (
            <p>
              <a href={phoneHref} className="hover:text-[var(--muted)]">
                {profile.phone}
              </a>
            </p>
          )}
          <ul className="flex gap-5 pt-2">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="lnk">
                  {link.name} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--rule-soft)]">
        <div className="wrap flex flex-wrap justify-between gap-4 py-6 font-mono text-xs text-[var(--muted)]">
          <span>
            © {BUILD_YEAR} {profile.name}
          </span>
          <Link href="/projects" className="hover:text-[var(--ink)]">
            All projects →
          </Link>
        </div>
      </div>
    </footer>
  );
}
