"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Brand",
    titleLine2: "Strategy",
    description:
      "We make your company recognizable and memorable against the background of competitors.",
    tags: ["Research", "Identity", "Positioning", "Guidelines"],
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80&auto=format",
  },
  {
    id: "02",
    title: "Interface",
    titleLine2: "Design",
    description:
      "We consider user interaction with the interface. We pay special attention to hypothesis testing.",
    tags: ["UX Research", "Wireframing", "Prototyping", "Testing"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&auto=format",
  },
  {
    id: "03",
    title: "Website",
    titleLine2: "Design",
    description:
      "We create a functional design in the style of aesthetics of minimalism with micro animations.",
    tags: ["Responsive", "Motion", "CMS", "SEO"],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80&auto=format",
  },
  {
    id: "04",
    title: "Mobile",
    titleLine2: "Design",
    description:
      "We create applications of any complexity for iOS, Android with built-in interactive logic.",
    tags: ["iOS", "Android", "React Native", "Flutter"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80&auto=format",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const cursorImageRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const isInSection = useRef(false);
  const mousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (cursorImageRef.current) {
      gsap.to(cursorImageRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, []);

  const handleCardEnter = useCallback((image: string) => {
    if (!cursorImageRef.current || !cursorInnerRef.current) return;

    // If already showing an image, crossfade to new one
    if (activeImage && activeImage !== image) {
      // Fade out current image
      gsap.to(cursorInnerRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setActiveImage(image);
          // Fade in new image
          gsap.fromTo(cursorInnerRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
          );
        },
      });
    } else {
      // First time showing image
      setActiveImage(image);
      gsap.to(cursorImageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [activeImage]);

  const handleSectionLeave = useCallback(() => {
    isInSection.current = false;
    if (cursorImageRef.current) {
      gsap.to(cursorImageRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setActiveImage(null),
      });
    }
  }, []);

  const handleSectionEnter = useCallback(() => {
    isInSection.current = true;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const cardEls = cardsRef.current.filter(Boolean);
    const indicator = indicatorRef.current;

    if (!section || cardEls.length === 0 || !indicator) return;

    const ctx = gsap.context(() => {
      // Set initial states
      cardEls.forEach((card) => {
        if (!card) return;
        const num = card.querySelector('.service-num') as HTMLElement;
        const title1 = card.querySelector('.title-line-1') as HTMLElement;
        const title2 = card.querySelector('.title-line-2') as HTMLElement;
        const desc = card.querySelector('.service-desc') as HTMLElement;
        const tags = card.querySelectorAll('.service-tag');

        gsap.set(num, { y: 30, opacity: 0 });
        gsap.set(title1, { y: "100%" });
        gsap.set(title2, { y: "100%" });
        gsap.set(desc, { y: 40, opacity: 0 });
        gsap.set(tags, { y: 15, opacity: 0, scale: 0.9 });
      });

      // ScrollTrigger for each card
      cardEls.forEach((card) => {
        if (!card) return;
        const num = card.querySelector('.service-num') as HTMLElement;
        const title1 = card.querySelector('.title-line-1') as HTMLElement;
        const title2 = card.querySelector('.title-line-2') as HTMLElement;
        const desc = card.querySelector('.service-desc') as HTMLElement;
        const tags = card.querySelectorAll('.service-tag');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.5,
          },
        });

        tl.to(num, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0);
        tl.to(title1, { y: "0%", duration: 0.5, ease: "power3.out" }, 0.05);
        tl.to(title2, { y: "0%", duration: 0.5, ease: "power3.out" }, 0.12);
        tl.to(desc, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0.2);

        tags.forEach((tag: Element, ti: number) => {
          tl.to(tag, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.25,
            ease: "power3.out",
          }, 0.3 + ti * 0.05);
        });
      });

      // Indicator follows scroll
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          const progress = self.progress;
          const activeIndex = Math.min(
            Math.floor(progress * cardEls.length),
            cardEls.length - 1
          );
          const activeCard = cardEls[activeIndex];
          if (activeCard) {
            const cardRect = activeCard.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();
            const relativeTop = cardRect.top - sectionRect.top + cardRect.height / 2;
            gsap.set(indicator, { y: relativeTop });
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 lg:py-32"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleSectionEnter}
      onMouseLeave={handleSectionLeave}
    >
      {/* Cursor-following image with corner brackets */}
      <div
        ref={cursorImageRef}
        className="fixed z-50 pointer-events-none"
        style={{
          transform: "translate(-50%, -50%) scale(0.8)",
          left: 0,
          top: 0,
          opacity: 0,
        }}
      >
        <div ref={cursorInnerRef} className="relative">
          {/* Corner brackets */}
          <span className="absolute -left-2 -top-2 text-zinc-800 z-20">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 6L1 1L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <span className="absolute -right-2 -top-2 text-zinc-800 z-20">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15 6L15 1L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <span className="absolute -right-2 -bottom-2 text-zinc-800 z-20">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15 10L15 15L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <span className="absolute -left-2 -bottom-2 text-zinc-800 z-20">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 10L1 15L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>

          {activeImage && (
            <img
              src={activeImage}
              alt=""
              className="w-44 h-32 lg:w-52 lg:h-36 object-cover"
            />
          )}
        </div>
      </div>

      {/* Red cube indicator */}
      <div
        ref={indicatorRef}
        className="absolute left-6 lg:left-10 z-40 h-2 w-2 bg-[#e74c3c]"
        style={{ top: 0 }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-black leading-[1.05]">
            Our Services.
          </h2>
          <p className="text-xs text-gray-400 mt-3 font-mono tracking-wider">
            What we do best.
          </p>
        </div>

        {/* Services Grid - 2 per row */}
        <div className="grid grid-cols-2 gap-x-8 lg:gap-x-16">
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group border-t border-black/10 py-10 lg:py-14 cursor-pointer"
              onMouseEnter={() => handleCardEnter(service.image)}
            >
              <div className="flex items-start gap-4 lg:gap-6">
                {/* Number in Cube */}
                <div className="flex-shrink-0">
                  <div className="overflow-hidden">
                    <div className="service-num flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 border border-black/20 will-change-transform">
                      <span className="text-xs lg:text-sm font-mono text-black tracking-wider">
                        {service.id}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Title */}
                  <div className="overflow-hidden">
                    <h3 className="title-line-1 text-2xl lg:text-4xl xl:text-5xl font-light leading-[1.05] tracking-tight text-black will-change-transform">
                      {service.title}
                    </h3>
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="title-line-2 text-2xl lg:text-4xl xl:text-5xl font-light leading-[1.05] tracking-tight text-zinc-500 will-change-transform">
                      {service.titleLine2}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="service-desc text-xs lg:text-sm text-gray-500 leading-relaxed mt-4 max-w-xs will-change-transform">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="service-tag px-2.5 py-1 text-[10px] font-mono text-gray-600 bg-black/[0.03] border border-black/[0.08] rounded-full will-change-transform"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom border */}
        <div className="border-t border-black/10" />
      </div>
    </section>
  );
}