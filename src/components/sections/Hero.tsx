import Image from "next/image";
import { profile } from "@/lib/data";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen px-6 py-12">
      <div className="relative mx-auto max-w-6xl w-full">
        
        {/* WORK (001) */}
        <div className="flex items-start gap-2">
          <h1 className="text-[13vw] font-black leading-[0.8] tracking-tighter text-zinc-900 uppercase sm:text-[11vw] lg:text-[10vw]">
            WORK
          </h1>
          <span className="mt-2 text-xs font-mono text-zinc-500">(001)</span>
        </div>

        {/* ABOUT (002) - with white line through middle */}
        <div className="relative -mt-2 flex items-center gap-2">
          <div className="absolute left-0 top-1/2 h-2.5 w-full -translate-y-1/2 bg-white z-10" />
          <h2 className="relative z-0 text-[13vw] font-black leading-[0.8] tracking-tighter text-zinc-900 uppercase sm:text-[11vw] lg:text-[10vw]">
            ABOUT
          </h2>
          <span className="relative z-20 mt-2 text-xs font-mono text-zinc-500">(002)</span>
        </div>

        {/* (003) INFO - number on LEFT, image on right */}
        <div className="relative -mt-2 flex items-start justify-between">
          <div className="flex items-start gap-2">
            <span className="mt-2 text-xs font-mono text-zinc-500">(003)</span>
            <h2 className="text-[13vw] font-black leading-[0.8] tracking-tighter text-zinc-900 uppercase sm:text-[11vw] lg:text-[10vw]">
              INFO
            </h2>
          </div>

          {/* Image with corner brackets + location text */}
          <div className="relative mt-4 hidden md:block">
            {/* Corner brackets */}
            <span className="absolute -left-2 -top-2 text-zinc-400">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 6L1 1L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="absolute -right-2 -top-2 text-zinc-400">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M15 6L15 1L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="absolute -right-2 -bottom-2 text-zinc-400">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M15 10L15 15L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="absolute -left-2 -bottom-2 text-zinc-400">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 10L1 15L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>

            {profile.avatar && (
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={180}
                height={140}
                className="object-cover"
                priority
              />
            )}

            {/* Location text beside image */}
            <div className="absolute -right-32 top-0 w-28">
              <p className="text-[9px] font-mono leading-tight text-zinc-500">
                {profile.location || "United Kingdom"}
              </p>
              <p className="text-[9px] font-mono leading-tight text-zinc-500">
                {profile.address || "123, Marston St, 3F"}
              </p>
              <p className="text-[9px] font-mono leading-tight text-zinc-500">
                {profile.city || "1-3-17, Akasaka"}
              </p>
              <p className="text-[9px] font-mono leading-tight text-zinc-500">
                {profile.map || "Taito-ku map"}
              </p>
            </div>
          </div>
        </div>

        {/* (004) CONTACT - number on left, indented */}
        <div className="-mt-2 flex items-start gap-2 pl-[4vw]">
          <span className="mt-2 text-xs font-mono text-zinc-500">(004)</span>
          <h2 className="text-[13vw] font-black leading-[0.8] tracking-tighter text-zinc-900 uppercase sm:text-[11vw] lg:text-[10vw]">
            CONTACT
          </h2>
        </div>

      </div>
    </section>
  );
}