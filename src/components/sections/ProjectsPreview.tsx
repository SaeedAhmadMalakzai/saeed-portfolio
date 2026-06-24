"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const projects = [
  {
    id: 1,
    title: "Powered to Play\nAll Day",
    image: "/images/bgdk.jpeg",
    thumb: "/images/bgdk.jpeg",
    tags: ["Creative Direction", "Art Direction", "CGI Production", "Production"],
    href: "/work/oneplus-powered-to-play-all-day",
  },
  {
    id: 2,
    title: "The Eternal Horse\nx Marina IFC",
    image: "/images/s1.jpg",
    thumb: "/images/s1.jpg",
    tags: ["Visual Direction", "Visual Production", "On-site supervise"],
    href: "/work/the-eternal-horse-x-marina-ifc",
  },
  {
    id: 3,
    title: "Year of the\nRabbit",
    image: "/images/s2.jpg",
    thumb: "/images/s2.jpg",
    tags: ["Creative Direction", "Art Direction", "Concept CGI Art"],
    href: "/work/year-of-the-rabbit-la-mer",
  },
  {
    id: 4,
    title: "Louis Vuitton\nSeries",
    image: "/images/s3.jpg",
    thumb: "/images/s3.jpg",
    tags: ["Direction", "Production", "Photography"],
    href: "/work/louis-vuitton-series",
  },
  {
    id: 5,
    title: "Oriens Lumina\nWalks",
    image: "/images/bgdk.jpeg",
    thumb: "/images/bgdk.jpeg",
    tags: ["Experiential", "Motion Design", "On-set Production", "Lighting Direction"],
    href: "/work/moment-factory",
  },
  {
    id: 6,
    title: "Perfection\nat Play",
    image: "/images/s1.jpg",
    thumb: "/images/s1.jpg",
    tags: ["Art Direction", "Creative Direction", "CGI Art", "Management", "Production"],
    href: "/work/oneplus-buds-pro-3",
  },
];

export function ProjectsPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const goToProject = useCallback((index: number) => {
    if (isAnimating || index === currentIndex || index < 0 || index >= projects.length) return;
    setIsAnimating(true);
    const direction = index > currentIndex ? 1 : -1;

    const currentImg = imageRef.current?.querySelector('.project-image.active') as HTMLElement;
    const nextImg = imageRef.current?.querySelectorAll('.project-image')[index] as HTMLElement;

    if (currentImg && nextImg) {
      gsap.to(currentImg, { opacity: 0, scale: 1.02, duration: 0.6, ease: "power2.inOut" });
      gsap.fromTo(nextImg, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out", delay: 0.1 });
    }

    const currentTitle = titleRef.current?.querySelector('.title-item.active') as HTMLElement;
    const nextTitle = titleRef.current?.querySelectorAll('.title-item')[index] as HTMLElement;

    if (currentTitle && nextTitle) {
      gsap.to(currentTitle, { y: -60 * direction, opacity: 0, filter: "blur(15px)", duration: 0.4, ease: "power2.in" });
      gsap.fromTo(nextTitle, { y: 60 * direction, opacity: 0, filter: "blur(15px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.out", delay: 0.25 });
    }

    const currentService = servicesRef.current?.querySelector('.service-item.active') as HTMLElement;
    const nextService = servicesRef.current?.querySelectorAll('.service-item')[index] as HTMLElement;

    if (currentService && nextService) {
      gsap.to(currentService, { y: -30 * direction, opacity: 0, duration: 0.35, ease: "power2.in" });
      gsap.fromTo(nextService, { y: 30 * direction, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.3 });
    }

    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 800);
  }, [currentIndex, isAnimating]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToProject(currentIndex - 1);
      if (e.key === "ArrowRight") goToProject(currentIndex + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToProject, currentIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(".project-image.active", { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" });
      tl.fromTo(".title-item.active", { y: 80, opacity: 0, filter: "blur(20px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }, "-=0.6");
      tl.fromTo(".service-item.active", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4");
      tl.fromTo(".thumb-item", { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" }, "-=0.3");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  }, []);

  const currentProject = projects[currentIndex];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full overflow-hidden select-none"
      style={{ height: "100vh", minHeight: "600px" }}
    >
      {/* Left side - WORK label */}
      <div className="absolute top-1/2 left-4 md:left-8 z-30 -translate-y-1/2 hidden sm:block">
        <span className="text-[10px] font-medium tracking-[0.15em] text-black/50 uppercase" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          WORK
        </span>
      </div>

      {/* Main content - centered layout */}
      <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-8 lg:px-16 xl:px-24">
        
        {/* Center content wrapper */}
        <div 
          className="relative"
          style={{ 
            width: "min(65vw, 700px)", 
            height: "min(45vw, 420px)", 
            maxWidth: "700px", 
            maxHeight: "480px",
          }}
        >
          
          {/* Image container */}
          <div
            ref={imageRef}
            className="relative cursor-none w-full h-full"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
          >
            {/* Custom cursor with corners */}
            {isHovering && (
              <div 
                className="pointer-events-none absolute z-50 flex items-center justify-center"
                style={{ 
                  left: cursorPos.x - 40, 
                  top: cursorPos.y - 20,
                  width: 80,
                  height: 40,
                }}
              >
                <span className="absolute -left-1 -top-1 text-black/80">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M1 6L1 1L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="absolute -right-1 -top-1 text-black/80">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M15 6L15 1L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="absolute -right-1 -bottom-1 text-black/80">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M15 10L15 15L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="absolute -left-1 -bottom-1 text-black/80">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M1 10L1 15L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-black text-xs font-medium px-3 py-1.5 rounded-sm flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  View
                </span>
              </div>
            )}

            {projects.map((project, i) => (
              <div
                key={project.id}
                className={`project-image absolute inset-0 ${i === currentIndex ? 'active' : ''}`}
                style={{ opacity: i === currentIndex ? 1 : 0 }}
              >
                <Link href={project.href} className="relative block w-full h-full">
                  <Image src={project.image} alt={project.title} fill className="object-cover" priority={i === 0} sizes="700px" />
                </Link>
              </div>
            ))}
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              TITLE — mix-blend-mode sits on THIS container (no z-index,
              no transform here) so it is NOT isolated into its own
              stacking context. translateY lives one level down on titleRef.
              ═══════════════════════════════════════════════════════════════ */}
          <div
            className="absolute top-1/2 pointer-events-none"
            style={{
              right: "60%",
              width: "500px",
              // mix-blend-mode goes HERE — no z-index, no transform on this element
              mixBlendMode: "difference",
            }}
          >
            {/* translateY moved here so it doesn't isolate the blend parent */}
            <div ref={titleRef} className="relative w-full" style={{ transform: "translateY(-50%)" }}>
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  className={`title-item absolute left-0 top-0 ${i === currentIndex ? 'active' : ''}`}
                  style={{ 
                    opacity: i === currentIndex ? 1 : 0, 
                    pointerEvents: i === currentIndex ? 'auto' : 'none',
                  }}
                >
                  <h2
                    className="font-bold leading-[0.95] tracking-tight whitespace-pre-line"
                    style={{
                      fontSize: "clamp(2.5rem, 4.5vw, 3.8rem)",
                      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.05,
                      // White + difference = dark on cream bg, inverted on image
                      color: "#ffffff",
                      // mix-blend-mode removed from here — lives on the parent above
                    }}
                  >
                    {project.title.split('\n').map((line, idx) => (
                      <span key={idx} className="block">
                        {line}
                      </span>
                    ))}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Services + Line + Thumbnails */}
        <div className="absolute right-4 sm:right-8 lg:right-12 xl:right-16 top-1/2 z-20 -translate-y-1/2 flex items-center gap-3 lg:gap-4">
          {/* Services text - slide up animation */}
          <div ref={servicesRef} className="relative hidden sm:block" style={{ width: "150px", height: "120px" }}>
            {projects.map((project, i) => (
              <div
                key={project.id}
                className={`service-item absolute right-0 top-0 flex flex-col items-end gap-0.5 ${i === currentIndex ? 'active' : ''}`}
                style={{ opacity: i === currentIndex ? 1 : 0 }}
              >
                {project.tags.map((tag, j) => (
                  <span 
                    key={j} 
                    className="text-[11px] lg:text-[12px] font-semibold leading-snug text-right"
                    style={{ 
                      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                      color: "#1a1a1a",
                      fontWeight: 600,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Thumbnails */}
          <div className="flex flex-col gap-1.5 pl-5">
            {projects.map((project, i) => (
              <button
                key={project.id}
                onClick={() => goToProject(i)}
                className="thumb-item group relative"
              >
                <div className={`relative w-10 lg:w-10 h-6 lg:h-6 overflow-hidden transition-opacity duration-300 ${i === currentIndex ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}>
                  <Image src={project.thumb} alt={project.title} fill className="object-cover" sizes="48px" />
                </div>
                <div className={`absolute -left-5 top-1/2 -translate-y-1/2 h-px w-4 transition-colors duration-300 ${i === currentIndex ? 'bg-black' : 'bg-transparent'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom - Navigation */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-30 flex flex-col items-center gap-4 sm:gap-5">
        <div className="flex items-center gap-5 sm:gap-6">
          <button
            onClick={() => goToProject(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="p-1 disabled:opacity-20 disabled:cursor-not-allowed transition-opacity hover:opacity-60"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5  transition-all duration-300 ${i === currentIndex ? 'bg-black scale-110' : 'bg-black/25'}`} />
            ))}
          </div>

          <button
            onClick={() => goToProject(currentIndex + 1)}
            disabled={currentIndex === projects.length - 1}
            className="p-1 disabled:opacity-20 disabled:cursor-not-allowed transition-opacity hover:opacity-60"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5L19 12L12 19" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <Link 
          href="/work" 
          className="text-[10px] font-bold uppercase tracking-[0.25em] underline underline-offset-4 decoration-1 hover:no-underline transition-all"
          style={{ color: "#1a1a1a" }}
        >
          VIEW ALL PROJECTS
        </Link>
      </div>
    </section>
  );
}