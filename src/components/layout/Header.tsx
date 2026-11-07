import Link from "next/link";
import { navLinks, profile } from "@/lib/data";

/** Wordmark, then the shelves and sections; sticks to the top from tablet width up */
export function Header() {
  return (
    <header className="z-40 bg-paper/95 backdrop-blur-sm md:sticky md:top-0 md:border-b md:border-[var(--rule-soft)]">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5 md:py-6">
        <Link
          href="/"
          aria-label={`${profile.name}, home`}
          className="focus-ring font-display text-[28px] leading-none text-[var(--ink)]"
        >
          saeed
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="focus-ring font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted-2)] transition-colors hover:text-[var(--ink)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
