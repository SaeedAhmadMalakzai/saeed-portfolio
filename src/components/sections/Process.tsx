"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const processes = [
  {
    id: 1,
    icon: "/p1.svg",
    title: "Discovery & Strategy",
    description:
      "I start by understanding your goals, users, and constraints. Through research and planning, I define a clear roadmap that aligns technology with business outcomes — so every decision is intentional.",
    image: "/images/p1.png",
  },
  {
    id: 2,
    icon: "/p2.svg",
    title: "Design & Prototype",
    description:
      "I craft clean, intuitive interfaces with a focus on usability and aesthetics. From wireframes to high-fidelity prototypes, I ensure the experience feels right before a single line of code is written.",
    image: "/images/process-2.jpg",
  },
  {
    id: 3,
    icon: "/a2.svg",
    title: "Develop & Integrate",
    description:
      "I build scalable full-stack solutions, mobile apps, and AI-powered features using modern tech. Clean architecture, real-time systems, and third-party integrations — built to perform and grow.",
    image: null,
  },
];

// ─── Display Card Components ─────────────────────────────────────

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <CheckCircle2 className="size-4 text-gray-400" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-gray-300",
  titleClassName = "text-white",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between border border-white/10 bg-black/80 backdrop-blur-md px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/30 hover:bg-black/90 [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block bg-gray-800 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg text-gray-300">{description}</p>
      <p className="text-gray-500">{date}</p>
    </div>
  );
}

// Process-specific card data — gray & black only
const processCards = [
  // Card 1 - Process 1 (Discovery & Strategy) - DONE
  {
    icon: <CheckCircle2 className="size-4 text-gray-400" />,
    title: "Discovery Complete",
    description: "Requirements gathered & roadmap defined",
    date: "Completed",
    iconClassName: "text-gray-400",
    titleClassName: "text-white",
    className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:outline-white/10 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  // Card 2 - Process 2 (Design & Prototype) - DONE
  {
    icon: <CheckCircle2 className="size-4 text-gray-400" />,
    title: "Design Approved",
    description: "UI/UX finalized & prototypes signed off",
    date: "Completed",
    iconClassName: "text-gray-400",
    titleClassName: "text-white",
    className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:outline-white/10 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  // Card 3 - Process 3 (Develop & Integrate) - IN PROGRESS
  {
    icon: <Loader2 className="size-4 text-gray-300 animate-spin" />,
    title: "Development",
    description: "Building scalable full-stack solution",
    date: "In Progress",
    iconClassName: "text-gray-300",
    titleClassName: "text-white",
    className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
  },
];

function DisplayCards() {
  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {processCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}

// ─── Main Process Component ──────────────────────────────────────

export function Process() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const hasEnteredRef = useRef(false);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  const goToStep = useCallback(
    (index: number) => {
      if (isAnimatingRef.current || index === currentIndexRef.current || index < 0 || index >= processes.length)
        return;
      setIsAnimating(true);
      const direction = index > currentIndexRef.current ? 1 : -1;

      const currentIcon = iconRef.current?.querySelector(
        ".icon-item.active"
      ) as HTMLElement;
      const nextIcon = iconRef.current?.querySelectorAll(".icon-item")[
        index
      ] as HTMLElement;

      if (currentIcon && nextIcon) {
        gsap.to(currentIcon, {
          y: -20 * direction,
          opacity: 0,
          scale: 0.8,
          duration: 0.35,
          ease: "power2.in",
        });
        gsap.fromTo(
          nextIcon,
          { y: 20 * direction, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            delay: 0.15,
          }
        );
      }

      const currentTitle = titleRef.current?.querySelector(
        ".title-item.active"
      ) as HTMLElement;
      const nextTitle = titleRef.current?.querySelectorAll(".title-item")[
        index
      ] as HTMLElement;

      if (currentTitle && nextTitle) {
        gsap.to(currentTitle, {
          y: -40 * direction,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.4,
          ease: "power2.in",
        });
        gsap.fromTo(
          nextTitle,
          { y: 40 * direction, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }

      const currentDesc = descRef.current?.querySelector(
        ".desc-item.active"
      ) as HTMLElement;
      const nextDesc = descRef.current?.querySelectorAll(".desc-item")[
        index
      ] as HTMLElement;

      if (currentDesc && nextDesc) {
        gsap.to(currentDesc, {
          y: -25 * direction,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        });
        gsap.fromTo(
          nextDesc,
          { y: 25 * direction, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      }

      const currentImage = imageRef.current?.querySelector(
        ".image-item.active"
      ) as HTMLElement;
      const nextImage = imageRef.current?.querySelectorAll(".image-item")[
        index
      ] as HTMLElement;

      if (currentImage && nextImage) {
        gsap.to(currentImage, {
          opacity: 0,
          scale: 1.02,
          x: -20 * direction,
          duration: 0.5,
          ease: "power2.inOut",
        });
        gsap.fromTo(
          nextImage,
          { opacity: 0, scale: 0.98, x: 20 * direction },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.15,
          }
        );
      }

      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 900);
    },
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${processes.length * 100}%`,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: (progress) => {
            const stepSize = 1 / (processes.length - 1);
            return Math.round(progress / stepSize) * stepSize;
          },
          duration: { min: 0.2, max: 0.4 },
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const stepSize = 1 / (processes.length - 1);
          const newIndex = Math.min(
            Math.round(progress / stepSize),
            processes.length - 1
          );
          if (newIndex !== currentIndexRef.current && !isAnimatingRef.current) {
            goToStep(newIndex);
          }
        },
      });
    }, section);

    return () => {
      ctx.revert();
      scrollTriggerRef.current = null;
    };
  }, [goToStep]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goToStep(currentIndexRef.current + 1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") goToStep(currentIndexRef.current - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToStep]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(".icon-item.active", { opacity: 1, y: 0, scale: 1 });
      gsap.set(".title-item.active", { opacity: 1, y: 0, filter: "blur(0px)" });
      gsap.set(".desc-item.active", { opacity: 1, y: 0 });
      gsap.set(".image-item.active", { opacity: 1, scale: 1, x: 0 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        once: true,
        onEnter: () => {
          if (hasEnteredRef.current) return;
          hasEnteredRef.current = true;

          const tl = gsap.timeline({ delay: 0.2 });

          tl.fromTo(
            ".icon-item.active",
            { y: 30, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
          );

          tl.fromTo(
            ".title-item.active",
            { y: 50, opacity: 0, filter: "blur(10px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
            "-=0.35"
          );

          tl.fromTo(
            ".desc-item.active",
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.4"
          );

          tl.fromTo(
            ".image-item.active",
            { opacity: 0, scale: 1.03, x: 30 },
            { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: "power3.out" },
            "-=0.5"
          );

          tl.fromTo(
            ".step-indicator",
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" },
            "-=0.4"
          );
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full overflow-hidden select-none bg-white"
      style={{ height: "100vh", minHeight: "700px" }}
    >
      <div ref={containerRef} className="w-full h-full">
        {/* Left side - Step indicators */}
        <div className="absolute left-4 sm:left-8 lg:left-12 top-1/2 z-30 -translate-y-1/2">
          <div className="flex flex-col items-center">
            {processes.map((process, i) => (
              <button
                key={process.id}
                onClick={() => goToStep(i)}
                className="step-indicator group pt-14 relative flex items-center gap-3 py-3"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center transition-all duration-500 ${
                    i === currentIndex
                      ? "bg-black"
                      : "bg-black border border-black/10 hover:border-black/30"
                  }`}
                >
                  <Image
                    src={process.icon}
                    alt={process.title}
                    width={20}
                    height={20}
                    className="w-5 h-5 transition-all duration-500"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>

                <div
                  className={`h-px w-5 transition-all duration-500 ${
                    i === currentIndex ? "bg-black" : "bg-transparent"
                  }`}
                />

                {i < processes.length - 1 && (
                  <div className="absolute left-5 top-full h-6 w-px bg-black/10">
                    <div
                      className="absolute top-0 left-0 w-full bg-black transition-all duration-700 ease-out"
                      style={{
                        height: i < currentIndex ? "100%" : "0%",
                      }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-8 lg:px-32 xl:px-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full max-w-6xl items-center">

            {/* Left: Content */}
            <div className="relative" style={{ minHeight: "360px" }}>
              <div ref={iconRef} className="relative mb-10 h-14">
                {processes.map((process, i) => (
                  <div
                    key={process.id}
                    className={`icon-item ${i === currentIndex ? "active" : ""}`}
                    style={{
                      opacity: i === currentIndex ? 1 : 0,
                      position: i === currentIndex ? "relative" : "absolute",
                      top: 0,
                      left: 0,
                      pointerEvents: "none",
                      visibility: i === currentIndex ? "visible" : "hidden",
                    }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center bg-black">
                      <Image
                        src={process.icon}
                        alt={process.title}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                        style={{ filter: "brightness(0) invert(1)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div ref={titleRef} className="relative mb-8">
                {processes.map((process, i) => (
                  <div
                    key={process.id}
                    className={`title-item ${i === currentIndex ? "active" : ""}`}
                    style={{
                      opacity: i === currentIndex ? 1 : 0,
                      position: i === currentIndex ? "relative" : "absolute",
                      top: 0,
                      left: 0,
                      pointerEvents: i === currentIndex ? "auto" : "none",
                      visibility: i === currentIndex ? "visible" : "hidden",
                    }}
                  >
                    <h2
                      className="font-bold tracking-tight"
                      style={{
                        fontSize: "clamp(2.5rem, 5vw, 4rem)",
                        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        lineHeight: 1.1,
                        color: "#000000",
                      }}
                    >
                      {process.title}
                    </h2>
                  </div>
                ))}
              </div>

              <div ref={descRef} className="relative max-w-md">
                {processes.map((process, i) => (
                  <div
                    key={process.id}
                    className={`desc-item ${i === currentIndex ? "active" : ""}`}
                    style={{
                      opacity: i === currentIndex ? 1 : 0,
                      position: i === currentIndex ? "relative" : "absolute",
                      top: 0,
                      left: 0,
                      pointerEvents: i === currentIndex ? "auto" : "none",
                      visibility: i === currentIndex ? "visible" : "hidden",
                    }}
                  >
                    <p
                      className="text-base leading-relaxed"
                      style={{
                        color: "#666666",
                        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                        lineHeight: 1.7,
                      }}
                    >
                      {process.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image (Process 1 & 2) or DisplayCards (Process 3) */}
            <div ref={imageRef} className="relative hidden lg:block">
              {processes.map((process, i) => (
                <div
                  key={process.id}
                  className={`image-item ${i === currentIndex ? "active" : ""}`}
                  style={{
                    opacity: i === currentIndex ? 1 : 0,
                    visibility: i === currentIndex ? "visible" : "hidden",
                    position: i === currentIndex ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                  }}
                >
                  {process.image ? (
                    <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden">
                      <Image
                        src={process.image}
                        alt={process.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <DisplayCards />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint - bottom center */}
        <div className="absolute bottom-8 left-0 right-0 z-30 flex flex-col items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
            {currentIndex < processes.length - 1 ? "Scroll to explore" : "End of process"}
          </span>
          {currentIndex < processes.length - 1 && (
            <div className="flex flex-col items-center gap-1 animate-bounce">
              <div className="w-px h-6 bg-black/20" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}