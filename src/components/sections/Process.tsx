"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Lightbulb, Heart, Code2 } from "lucide-react";

const processes = [
  {
    id: 1,
    icon: Lightbulb,
    title: "Strategy &\nConcept",
    description:
      "I help you find direction and build a solid foundation. From understanding your goals to defining the roadmap, I plan every step so you don't navigate blindly.",
    image: "/images/process-1.jpg",
  },
  {
    id: 2,
    icon: Heart,
    title: "Design &\nExperience",
    description:
      "I design experiences that look great and feel right. Clean, intuitive interfaces crafted with purpose — built for the people who will use them every day.",
    image: "/images/process-2.jpg",
  },
  {
    id: 3,
    icon: Code2,
    title: "Development &\nDelivery",
    description:
      "I build fast, accessible, and flexible solutions with modern technology. Full-stack, mobile, or AI integration — no fluff, just clean code that ships.",
    image: "/images/process-3.jpg",
  },
];

export function Process() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const isInViewRef = useRef(false);
  const lastScrollTime = useRef(0);
  const scrollThreshold = 800; // ms between scroll triggers

  const goToStep = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex || index < 0 || index >= processes.length)
        return;
      setIsAnimating(true);
      const direction = index > currentIndex ? 1 : -1;

      // Icon animation
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

      // Title animation
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

      // Description animation
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

      // Image animation
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
    [currentIndex, isAnimating]
  );

  // Scroll-based navigation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < scrollThreshold) return;
      
      // Check if section is in view
      const rect = section.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight;
      
      if (!isInView) {
        isInViewRef.current = false;
        return;
      }

      // Prevent default scroll only when we're navigating between steps
      if (isInView && !isAnimating) {
        e.preventDefault();
        
        if (e.deltaY > 0 && currentIndex < processes.length - 1) {
          // Scroll down - next step
          lastScrollTime.current = now;
          goToStep(currentIndex + 1);
        } else if (e.deltaY < 0 && currentIndex > 0) {
          // Scroll up - previous step
          lastScrollTime.current = now;
          goToStep(currentIndex - 1);
        }
      }
    };

    // Use capture phase to intercept scroll before page scroll
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [goToStep, currentIndex, isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goToStep(currentIndex + 1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") goToStep(currentIndex - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToStep, currentIndex]);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full overflow-hidden select-none bg-white sticky top-0"
      style={{ height: "100vh", minHeight: "700px" }}
    >
      {/* Left side - Step indicators */}
      <div className="absolute left-4 sm:left-8 lg:left-12 top-1/2 z-30 -translate-y-1/2">
        <div className="flex flex-col items-center">
          {processes.map((process, i) => {
            const Icon = process.icon;
            return (
              <button
                key={process.id}
                onClick={() => goToStep(i)}
                className="step-indicator group pt-14 relative flex items-center gap-3 py-3"
              >
                {/* Icon */}
                <div
                  className={`flex h-10 w-10  items-center justify-center rounded-lg transition-all duration-500 ${
                    i === currentIndex
                      ? "bg-black text-white"
                      : "bg-transparent text-black/20 hover:text-black/40"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                </div>

                {/* Small horizontal line next to active */}
                <div
                  className={`h-px w-5 transition-all duration-500 ${
                    i === currentIndex ? "bg-black" : "bg-transparent"
                  }`}
                />

                {/* Vertical connector line */}
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
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-8 lg:px-32 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full max-w-6xl items-center">
          
          {/* Left: Content */}
          <div className="relative" style={{ minHeight: "360px" }}>
            {/* Icon */}
            <div ref={iconRef} className="relative mb-10 h-14">
              {processes.map((process, i) => {
                const Icon = process.icon;
                return (
                  <div
                    key={process.id}
                    className={`icon-item ${i === currentIndex ? "active" : ""}`}
                    style={{
                      opacity: i === currentIndex ? 1 : 0,
                      position: i === currentIndex ? "relative" : "absolute",
                      top: 0,
                      left: 0,
                      pointerEvents: "none",
                    }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black">
                      <Icon size={24} className="text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Title */}
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
                  }}
                >
                  <h2
                    className="font-bold tracking-tight whitespace-pre-line"
                    style={{
                      fontSize: "clamp(2.5rem, 5vw, 4rem)",
                      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.1,
                      color: "#000000",
                    }}
                  >
                    {process.title.split("\n").map((line, idx) => (
                      <span key={idx} className="block">
                        {line}
                      </span>
                    ))}
                  </h2>
                </div>
              ))}
            </div>

            {/* Description */}
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

          {/* Right: Image */}
          <div ref={imageRef} className="relative hidden lg:block">
            <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl">
              {processes.map((process, i) => (
                <div
                  key={process.id}
                  className={`image-item absolute inset-0 ${i === currentIndex ? "active" : ""}`}
                  style={{ opacity: i === currentIndex ? 1 : 0 }}
                >
                  <Image
                    src={process.image}
                    alt={process.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint - bottom center */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex flex-col items-center gap-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-black/30">
          {currentIndex < processes.length - 1 ? "Scroll to explore" : "End of process"}
        </span>
        {currentIndex < processes.length - 1 && (
          <div className="flex flex-col items-center gap-1 animate-bounce">
            <div className="w-px h-6 bg-black/20" />
          </div>
        )}
      </div>
    </section>
  );
}