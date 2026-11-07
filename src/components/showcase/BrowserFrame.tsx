import Image from "next/image";
import type { ReactNode } from "react";

/** Full-page captures are 1440px wide; their height varies, so we give next/image a tall box */
const FULL_PAGE_WIDTH = 1440;
const FULL_PAGE_HEIGHT = 4000;

type FrameProps = {
  /** What the address bar shows */
  address: string;
  children: ReactNode;
  /** Small text at the right of the bar */
  hint?: string;
};

export function BrowserFrame({ address, children, hint }: FrameProps) {
  return (
    <div className="browser">
      <div className="browser-bar">
        <i />
        <i />
        <i />
        <span className="truncate">{address}</span>
        {hint && <span className="ml-auto hidden sm:inline">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

/** The host name of a URL, for the address bar */
export function hostOf(url: string | undefined, fallback: string): string {
  if (!url) return fallback;
  try {
    return new URL(url).host;
  } catch {
    return fallback;
  }
}

type ShotProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
};

/** A 16:10 screenshot cropped from the top, as on a web tile */
export function BrowserShot({ src, alt, sizes, priority = false }: ShotProps) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden">
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
    </div>
  );
}

/** A full-page capture that scrolls inside the frame */
export function ScrollingPage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="scroll-frame focus-ring h-[62vh] max-h-[760px] min-h-[360px]"
      tabIndex={0}
      role="region"
      aria-label={`${alt}. Full-page screenshot; scroll inside to see all of it.`}
    >
      <Image
        src={src}
        alt={alt}
        width={FULL_PAGE_WIDTH}
        height={FULL_PAGE_HEIGHT}
        sizes="(max-width: 1280px) 100vw, 1184px"
        priority
        className="h-auto w-full select-none"
      />
    </div>
  );
}
