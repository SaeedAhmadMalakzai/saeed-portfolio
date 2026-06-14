"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { profile } from "@/lib/data";
import gsap from "gsap";

const images = [
  "/images/bgdk.jpeg",
  "/images/s1.jpg",
  "/images/s2.jpg",
  "/images/s3.jpg",
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const currentEl = imageRefs.current[currentIndex];
    const nextIndex = (currentIndex + 1) % images.length;
    const nextEl = imageRefs.current[nextIndex];

    if (!currentEl || !nextEl) {
      setIsAnimating(false);
      return;
    }

    // Set next image below
    gsap.set(nextEl, { y: "100%" });

    // Animate both
    const tl = gsap.timeline({
      onComplete: () => {
        // Reset current to below for next cycle
        gsap.set(currentEl, { y: "100%" });
        setCurrentIndex(nextIndex);
        setIsAnimating(false);
      },
    });

    tl.to(currentEl, {
      y: "-100%",
      duration: 0.6,
      ease: "power3.inOut",
    }, 0);

    tl.to(nextEl, {
      y: "0%",
      duration: 0.6,
      ease: "power3.inOut",
    }, 0);

  }, [currentIndex, isAnimating]);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [goToNext]);

  // Page load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-text",
        { y: "100%" },
        { y: "0%", duration: 0.8, stagger: 0.15 }
      );

      tl.fromTo(
        ".hero-image-container",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );

      tl.fromTo(
        ".hero-bracket",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.7)" },
        "-=0.4"
      );

      tl.fromTo(
        ".hero-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="relative min-h-screen px-6 py-12">
      <div ref={containerRef} className="relative mx-auto max-w-6xl w-full">
        
        {/* WORK */}
        <div className="flex items-start gap-2">
          <div className="overflow-hidden">
            <h1 className="hero-text text-[13vw] font-black leading-[0.8] tracking-tighter text-zinc-900 uppercase sm:text-[11vw] lg:text-[10vw]">
              character
            </h1>
          </div>
        </div>

        {/* ABOUT */}
        <div className="relative -mt-2 flex items-center gap-2">
          <div className="absolute left-0 top-1/2 h-2.5 w-full -translate-y-1/2 bg-white z-10" />
          <div className="overflow-hidden">
            <h2 className="hero-text relative z-0 text-[13vw] font-black leading-[0.8] tracking-tighter text-zinc-900 uppercase sm:text-[11vw] lg:text-[10vw]">
              to systems
            </h2>
          </div>
        </div>

        {/* AND - with image carousel */}
        <div className="relative -mt-2 flex items-start justify-between">
          <div className="flex items-start gap-2 pl-[15vw]">
            <div className="overflow-hidden">
              <h2 className="hero-text text-[13vw] font-black leading-[0.8] tracking-tighter text-zinc-900 uppercase sm:text-[11vw] lg:text-[10vw]">
                and 
              </h2>
            </div>
          </div>

          {/* Image carousel with slide-up animation */}
          <div className="hero-image-container relative mt-4 hidden md:block mr-auto ml-8">
            {/* Corner brackets */}
            <span className="hero-bracket absolute -left-2 -top-2 text-zinc-400 z-20">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 6L1 1L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="hero-bracket absolute -right-2 -top-2 text-zinc-400 z-20">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M15 6L15 1L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="hero-bracket absolute -right-2 -bottom-2 text-zinc-400 z-20">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M15 10L15 15L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="hero-bracket absolute -left-2 -bottom-2 text-zinc-400 z-20">
              <svg width="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 10L1 15L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>

            {/* Carousel container */}
            <div className="relative h-27.5 w-45 overflow-hidden">
              {images.map((src, i) => (
                <div
                  key={src}
                  ref={(el) => { imageRefs.current[i] = el; }}
                  className="absolute inset-0"
                  style={{
                    transform: i === 0 ? "translateY(0)" : "translateY(100%)",
                  }}
                >
                  <Image
                    src={src}
                    alt={profile.name}
                    width={180}
                    height={140}
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>

            {/* Description text beside image */}
            <div className="hero-desc absolute -right-32 top-0 w-28">
              <p className="text-[9px] font-mono leading-tight text-zinc-500">
                I bring clarity and character
              </p>
              <p className="text-[9px] font-mono leading-tight text-zinc-500">
                to systems and products,
              </p>
              <p className="text-[9px] font-mono leading-tight text-zinc-500">
                making them more human
              </p>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="flex items-start gap-2 pl-[4vw]">
          <div className="overflow-hidden">
            <h2 className="hero-text text-[13vw] font-black leading-[0.8] tracking-tighter text-zinc-900 uppercase sm:text-[11vw] lg:text-[10vw]">
              products
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
}