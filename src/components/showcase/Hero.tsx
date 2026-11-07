import { getProjectBySlug, projects } from "@/lib/data";
import type { Screenshot } from "@/types";
import { PhoneRow } from "./Phone";

/** Opening phones: one screen each from SayHello, 24Tabib and Peygham */
const HERO_PICKS: { slug: string; screen: number }[] = [
  { slug: "sayhello", screen: 1 },
  { slug: "24tabib", screen: 2 },
  { slug: "peygham", screen: 4 },
];

const NUMBER_WORDS = ["None", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

function heroScreens(): { screens: Screenshot[]; alts: string[] } {
  const picked = HERO_PICKS.flatMap(({ slug, screen }) => {
    const project = getProjectBySlug(slug);
    const shot = project?.screens?.[screen];
    return project && shot ? [{ shot, alt: `${project.name}: ${shot.alt}` }] : [];
  });
  return { screens: picked.map((p) => p.shot), alts: picked.map((p) => p.alt) };
}

function downloadCount(): string {
  const count = projects.filter((project) => project.downloadUrl).length;
  return NUMBER_WORDS[count] ?? String(count);
}

export function Hero() {
  const { screens, alts } = heroScreens();
  return (
    <section
      aria-labelledby="hero-title"
      className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-12 pt-10 pb-14"
    >
      <div>
        <p className="label mb-6 text-[13px]">Saeed Ahmad Malakzai · Kabul</p>
        <h1
          id="hero-title"
          className="text-[clamp(44px,6.4vw,96px)] font-black leading-[0.9] tracking-[-0.05em]"
        >
          I build apps people in Afghanistan use every day.
        </h1>
        <p className="mt-7 max-w-[40ch] text-[19px] leading-[1.55] text-[var(--ink-3)]">
          Native Android and iOS apps, web platforms and small tools. {downloadCount()} of them you can download today.
        </p>
        <div className="mt-[26px] flex flex-wrap items-center gap-5">
          <a className="btn" href="#mobile">
            See the apps ↓
          </a>
          <a className="lnk" href="#contact">
            Work with me →
          </a>
        </div>
      </div>
      <PhoneRow screens={screens} alts={alts} label="Screens from SayHello, 24Tabib and Peygham" priority />
    </section>
  );
}
