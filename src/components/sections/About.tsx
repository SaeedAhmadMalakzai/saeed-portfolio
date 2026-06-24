"use client";

import { profile } from "@/lib/data";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const services = [
  {
    icon: "/a1.svg",
    title: "Scalable solutions",
    description:
      "I can integrate new features, revamp content and adapt your project to follow the latest trends.",
  },
  {
    icon: "/a2.svg",
    title: "Strategy",
    description:
      "Data-driven development and growth strategies tailored to your brand. From planning to execution, I plan every move for maximum impact.",
  },
];

const stats = [
  { number: 20, suffix: "+", label: "Finalized projects" },
  { number: 5, suffix: "+", label: "Year of experience" },
];

const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];

function generateContributions() {
  const weeks = 52;
  const daysPerWeek = 7;
  const data: { level: number; date: string; count: number }[][] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - (weeks * 7));

  for (let w = 0; w < weeks; w++) {
    const week: { level: number; date: string; count: number }[] = [];
    for (let d = 0; d < daysPerWeek; d++) {
      const rand = Math.random();
      let level = 0;
      if (rand > 0.4) level = 1;
      if (rand > 0.65) level = 2;
      if (rand > 0.85) level = 3;
      if (rand > 0.95) level = 4;

      const date = new Date(startDate);
      date.setDate(startDate.getDate() + (w * 7) + d);
      const dateStr = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const count = level > 0 ? level * Math.floor(Math.random() * 5 + 1) : 0;

      week.push({ level, date: dateStr, count });
    }
    data.push(week);
  }
  return data;
}

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
  const countRef = useRef(0);
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * end);

      countRef.current = current;
      setCount(current);

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

function ContributionCell({ day, weekIndex, dayIndex, isVisible }: { 
  day: { level: number; date: string; count: number }; 
  weekIndex: number; 
  dayIndex: number;
  isVisible: boolean;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getColor = (level: number) => {
    const colors = [
      "rgba(232, 232, 227, 0.06)",
      "rgba(232, 232, 227, 0.18)",
      "rgba(232, 232, 227, 0.35)",
      "rgba(232, 232, 227, 0.60)",
      "rgba(232, 232, 227, 0.90)",
    ];
    return colors[level];
  };

  return (
    <div 
      className="relative flex-shrink-0"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div
          className="absolute z-50 px-3 py-1.5 text-xs font-mono rounded-md pointer-events-none"
          style={{
            backgroundColor: "#ffffff",
            color: "#1f2328",
            left: "50%",
            bottom: "calc(100% + 6px)",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          {day.count} contributions on {day.date}
          {/* Arrow pointing down */}
          <div
            className="absolute left-1/2 top-full -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid #ffffff",
            }}
          />
        </div>
      )}

      {/* Cell */}
      <div
        className="transition-all duration-200 cursor-pointer"
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: getColor(day.level),
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1)" : "scale(0)",
          transitionDelay: `${(weekIndex * 7 + dayIndex) * 1.5}ms`,
        }}
      />
    </div>
  );
}

function ContributionGraph() {
  const [contributions] = useState(() => generateContributions());
  const [visibleCells, setVisibleCells] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cells: string[] = [];
            contributions.forEach((week, wi) => {
              week.forEach((_, di) => {
                cells.push(`${wi}-${di}`);
              });
            });

            cells.forEach((cell, index) => {
              setTimeout(() => {
                setVisibleCells((prev) => new Set([...prev, cell]));
              }, index * 1.5);
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [contributions]);

  const getColor = (level: number) => {
    const colors = [
      "rgba(232, 232, 227, 0.06)",
      "rgba(232, 232, 227, 0.18)",
      "rgba(232, 232, 227, 0.35)",
      "rgba(232, 232, 227, 0.60)",
      "rgba(232, 232, 227, 0.90)",
    ];
    return colors[level];
  };

  const totalContributions = contributions.flat().reduce((sum, day) => sum + day.count, 0);

  const monthWeekIndices = [0, 4, 8, 13, 17, 22, 26, 30, 35, 39, 44, 48];

  return (
    <div ref={containerRef} className="w-full">
      {/* Month labels row */}
      <div className="flex gap-[2px] mb-1">
        {contributions.map((_, weekIndex) => {
          const monthIndex = monthWeekIndices.indexOf(weekIndex);
          const month = monthIndex !== -1 ? months[monthIndex] : null;
          return (
            <div key={weekIndex} className="flex-shrink-0" style={{ width: "10px" }}>
              {month && (
                <span 
                  className="text-[10px] font-mono whitespace-nowrap" 
                  style={{ color: "rgba(232, 232, 227, 0.5)" }}
                >
                  {month}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Contribution grid */}
      <div className="flex gap-[2px]">
        {contributions.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[2px]">
            {week.map((day, dayIndex) => {
              const cellKey = `${weekIndex}-${dayIndex}`;
              const isVisible = visibleCells.has(cellKey);
              return (
                <ContributionCell
                  key={dayIndex}
                  day={day}
                  weekIndex={weekIndex}
                  dayIndex={dayIndex}
                  isVisible={isVisible}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-[10px] font-mono" style={{ color: "rgba(232, 232, 227, 0.4)" }}>
          {totalContributions.toLocaleString()} contributions in the past 365 days.
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono" style={{ color: "rgba(232, 232, 227, 0.4)" }}>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: getColor(level),
              }}
            />
          ))}
          <span className="text-[10px] font-mono" style={{ color: "rgba(232, 232, 227, 0.4)" }}>More</span>
        </div>
      </div>
    </div>
  );
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
                alt={profile.name}
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
                Software Developer and IT professional with 5 years of experience
                in software development, including 3 years of web development,
                1 year of mobile app development, and 1 year of database design
                and management.
              </p>
              <p className="text-lg leading-relaxed text-neutral-800">
                Full-stack developer skilled in Python, JavaScript, React,
                Vue.js, Node.js, Django, Flask, and Swift/SwiftUI. Experienced
                in building REST APIs, real-time applications, database design,
                and AI/LLM integration.
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
                      alt={service.title}
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

            {/* Stats + Contribution Graph */}
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
                <ContributionGraph />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}