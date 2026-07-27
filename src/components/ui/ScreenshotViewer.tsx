"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface ScreenshotViewerProps {
  src: string;
  alt: string;
  /** Fixed frame height; the full capture scrolls inside it */
  heightClass?: string;
}

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const paths = {
    tl: "M1 6L1 1L6 1",
    tr: "M15 6L15 1L10 1",
    bl: "M1 10L1 15L6 15",
    br: "M15 10L15 15L10 15",
  };
  const offsets = {
    tl: "-left-2 -top-2",
    tr: "-right-2 -top-2",
    bl: "-left-2 -bottom-2",
    br: "-right-2 -bottom-2",
  };
  return (
    <span className={`absolute ${offsets[position]} z-20 text-black`}>
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
        <path d={paths[position]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function ScreenshotViewer({ src, alt, heightClass = "h-[70vh]" }: ScreenshotViewerProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  return (
    <figure className="relative mt-8">
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      <div
        ref={frameRef}
        onScroll={() => setHasScrolled(true)}
        className={`screenshot-frame relative ${heightClass} overflow-y-auto overscroll-contain border border-black/10`}
        style={{ backgroundColor: "#e8e8e3" }}
        tabIndex={0}
        role="region"
        aria-label={`${alt} — scrollable full-page screenshot`}
      >
        <Image
          src={src}
          alt={alt}
          width={1440}
          height={4000}
          sizes="(max-width: 768px) 100vw, 768px"
          className="w-full h-auto select-none"
          priority
        />
      </div>

      {/* Scroll hint — fades out once the visitor scrolls */}
      <figcaption
        className={`pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 transition-opacity duration-500 ${
          hasScrolled ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="flex items-center gap-2 bg-black px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-white">
          Scroll to explore
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="animate-bounce">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </figcaption>
    </figure>
  );
}
