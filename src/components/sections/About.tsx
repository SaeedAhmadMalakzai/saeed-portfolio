"use client";

import { profile } from "@/lib/data";
import Image from "next/image";
import { Maximize2, Clock } from "lucide-react";

const services = [
  {
    icon: Maximize2,
    title: "Scalable solutions",
    description:
      "I can integrate new features, revamp content and adapt your project to follow the latest trends.",
  },
  {
    icon: Clock,
    title: "Strategy",
    description:
      "Data-driven development and growth strategies tailored to your brand. From planning to execution, I plan every move for maximum impact.",
  },
];

const stats = [
  { number: "20+", label: "Finalized projects" },
  { number: "5+", label: "Year of experience" },
];

export function About() {
  return (
    <section id="about" className="bg-white py-24 text-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left: Sticky Portrait */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden">
              <Image
                src="/me.jpg"
                alt={profile.name}
                fill
                className="object-cover grayscale"
              />
              {/* Red/coral duotone overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundColor: "#e85d4a",
                  mixBlendMode: "multiply",
                  opacity: 0.85,
                }}
              />
              {/* Halftone dot pattern */}
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                  backgroundSize: "4px 4px",
                }}
              />
            </div>
          </div>

          {/* Right: Scrollable Content */}
          <div className="flex flex-col">
            {/* Bio */}
            <div className="space-y-6">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
                About
              </p>
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
              <p className="text-lg leading-relaxed text-neutral-800">
                Strong background in system integration, troubleshooting, UI/UX
                design, and Agile practices. I'm also deeply interested in AI,
                not as a trend, but as a tool to simplify workflows, improve
                decision-making, and explore new creative possibilities.
              </p>
            </div>

            {/* Services - 2 column grid, icon above */}
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.title}>
                    <Icon
                      size={20}
                      className="text-neutral-400"
                      strokeWidth={1.5}
                    />
                    <h3 className="mt-3 text-base font-semibold text-black">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-5xl font-bold tracking-tight text-black">
                    {stat.number}
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}