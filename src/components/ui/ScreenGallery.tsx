import Image from "next/image";
import type { Screenshot } from "@/types";

interface ScreenGalleryProps {
  screens: Screenshot[];
  /** "phone" frames portrait app screens; "window" shows landscape screenshots */
  variant: "phone" | "window";
}

export function ScreenGallery({ screens, variant }: ScreenGalleryProps) {
  if (variant === "phone") {
    return (
      <div
        className="mt-8 -mx-6 overflow-x-auto px-6 pb-4 [scrollbar-width:thin]"
        role="region"
        aria-label="App screens"
        tabIndex={0}
      >
        <ul className="flex snap-x snap-mandatory gap-5">
          {screens.map((screen) => (
            <li key={screen.src} className="w-44 shrink-0 snap-start sm:w-52">
              <figure>
                <div className="rounded-[1.9rem] bg-zinc-900 p-[7px] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)]">
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    width={600}
                    height={1300}
                    sizes="208px"
                    className="h-auto w-full rounded-[1.5rem]"
                  />
                </div>
                <figcaption className="mt-3 text-xs leading-snug text-zinc-500">{screen.alt}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <ul className="mt-8 grid gap-8">
      {screens.map((screen) => (
        <li key={screen.src}>
          <figure>
            <Image
              src={screen.src}
              alt={screen.alt}
              width={1600}
              height={1000}
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full rounded-xl border border-zinc-200 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]"
            />
            <figcaption className="mt-3 text-xs text-zinc-500">{screen.alt}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
