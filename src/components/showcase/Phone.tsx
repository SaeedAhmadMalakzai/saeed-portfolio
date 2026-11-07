import Image from "next/image";
import type { Screenshot } from "@/types";

/** Widths the phone frames are drawn at, for the browser's image choice */
const ROW_SIZES = "(max-width: 640px) 31vw, 220px";
const MEDIA_SIZES = "150px";

type PhoneProps = {
  screen: Screenshot;
  /** Alt text override, e.g. to name the app in a mixed row */
  alt?: string;
  sizes?: string;
  priority?: boolean;
};

/** One phone screen in a black bezel, straight on the white page */
export function Phone({ screen, alt, sizes = ROW_SIZES, priority = false }: PhoneProps) {
  return (
    <div className="phone">
      <Image
        src={screen.src}
        alt={alt ?? screen.alt}
        width={screen.width}
        height={screen.height}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

type PhoneRowProps = {
  screens: Screenshot[];
  /** Alt texts in the same order as the screens, when they need the app's name */
  alts?: string[];
  label?: string;
  priority?: boolean;
};

/** Two or three phones side by side; with three, the middle one sits higher */
export function PhoneRow({ screens, alts, label, priority = false }: PhoneRowProps) {
  const raise = screens.length === 3 ? " raise-middle" : "";
  return (
    <div className={`phones${raise}`} role={label ? "group" : undefined} aria-label={label}>
      {screens.map((screen, index) => (
        <Phone key={screen.src} screen={screen} alt={alts?.[index]} priority={priority} />
      ))}
    </div>
  );
}

/** Small phones that fill a tile's fixed-height picture area */
export function MediaPhones({ screens }: { screens: Screenshot[] }) {
  return (
    <>
      {screens.map((screen) => (
        <Phone key={screen.src} screen={screen} sizes={MEDIA_SIZES} />
      ))}
    </>
  );
}
