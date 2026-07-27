"use client";

import { profile } from "@/lib/data";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { GitHubActivity } from "./GitHubActivity";

const services = [
  {
    icon: "/a1.svg",
    title: "Production-ready builds",
    description:
      "From requirements and data modeling to deployment on Linux VPS and cloud platforms — I deliver systems end to end, not just prototypes.",
  },
  {
    icon: "/a2.svg",
    title: "Real-time & payments",
    description:
      "WebSockets, WebRTC voice rooms, live messaging, and payment/escrow integrations (Stripe, HesabPay) built into real products.",
  },
];

const stats = [
  { number: 20, suffix: "+", label: "Finalized projects" },
  { number: 5, suffix: "+", label: "Years of experience" },
];

// Scroll animation hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Animated counter hook
function useCounter(end: number, duration: number = 1500, start: boolean = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, [end, duration]);

  useEffect(() => {
    if (start) {
      animate();
    }
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [start, animate]);

  return count;
}

// Animated stat number component
function AnimatedStat({ number, suffix, label, start }: { number: number; suffix: string; label: string; start: boolean }) {
  const count = useCounter(number, 1500, start);

  return (
    <div>
      <p
        className="text-5xl font-bold tracking-tight"
        style={{
          fontFamily: '"Nepos Simplex Solid", "Nepos Simplex", sans-serif',
          color: "#000",
        }}
      >
        {count}{suffix}
      </p>
      <p className="mt-2 text-sm text-neutral-500">{label}</p>
    </div>
  );
}

export function About() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-white py-24 text-black transition-all duration-1000"
      style={{
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6">
          {/* Left: Sticky Portrait - takes 2 columns */}
          <div
            className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start transition-all duration-1000 delay-200"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateX(0)" : "translateX(-30px)",
            }}
          >
            <div className="relative aspect-[3/4] w-full max-w-xs overflow-hidden">
              <Image
                src="/images/me.jpg"
                alt={`Portrait of ${profile.name}`}
                fill
                className="object-cover grayscale"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundColor: "#e8e8e3",
                  mixBlendMode: "multiply",
                  opacity: 0.85,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                  backgroundSize: "4px 4px",
                }}
              />
            </div>
          </div>

          {/* Right: Scrollable Content - takes 3 columns */}
          <div
            className="lg:col-span-3 flex flex-col min-w-0 transition-all duration-1000 delay-400"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateX(0)" : "translateX(30px)",
            }}
          >
            {/* Bio */}
            <div className="space-y-6">
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-[0.15em]"
                style={{
                  fontFamily: '"Nepos Simplex Solid", "Nepos Simplex", sans-serif',
                  color: "#000",
                }}
              >
                About
              </h2>
              <p className="text-lg leading-relaxed text-neutral-800">
                I&apos;m {profile.name}, a full-stack software developer based in{" "}
                {profile.location}, with 5+ years of experience designing, building,
                and deploying production web, mobile, and desktop applications.
              </p>
              <p className="text-lg leading-relaxed text-neutral-800">
                I work across TypeScript/JavaScript (Next.js, React, Vue/Nuxt,
                Node.js), Python (Django, Flask, FastAPI), and Swift/SwiftUI —
                with hands-on experience in real-time systems (WebSockets, WebRTC),
                payment and escrow integrations, database design, AI/LLM
                integration, and end-to-end deployment on Linux VPS and cloud
                platforms.
              </p>
            </div>

            {/* Services - icon in black box using Image component */}
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="transition-all duration-700"
                  style={{
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${600 + index * 150}ms`,
                  }}
                >
                  {/* Black box with SVG icon from public folder */}
                  <div
                    className="inline-flex items-center justify-center w-12 h-12"
                    style={{ backgroundColor: "#0a0e15" }}
                  >
                    <Image
                      src={service.icon}
                      alt=""
                      width={20}
                      height={20}
                      className="w-5 h-5"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-black">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats + Live GitHub Activity */}
            <div
              ref={statsRef}
              className="mt-16 transition-all duration-700"
              style={{
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "900ms",
              }}
            >
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat) => (
                  <AnimatedStat
                    key={stat.label}
                    number={stat.number}
                    suffix={stat.suffix}
                    label={stat.label}
                    start={statsVisible}
                  />
                ))}
              </div>

              <div className="mt-8 p-4 overflow-x-auto" style={{ backgroundColor: "#0d1117" }}>
                <GitHubActivity />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
