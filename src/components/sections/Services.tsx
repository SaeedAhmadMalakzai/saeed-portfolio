"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Full-Stack",
    titleLine2: "Development",
    description:
      "I build end-to-end web applications using React, Vue.js, Node.js, Django, and Flask. From responsive frontends to scalable REST APIs.",
    tags: ["React", "Vue.js", "Node.js", "Django", "Flask", "FastAPI"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&auto=format",
  },
  {
    id: "02",
    title: "Mobile App",
    titleLine2: "Development",
    description:
      "I develop cross-platform and native mobile apps for iOS and Android using Swift, SwiftUI, and React Native with real-time features.",
    tags: ["iOS", "Swift", "SwiftUI", "React Native", "Android", "CocoaPods"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80&auto=format",
  },
  {
    id: "03",
    title: "AI & LLM",
    titleLine2: "Integration",
    description:
      "I integrate Generative AI and LLMs into applications, build intelligent automation tools, and implement data analysis pipelines.",
    tags: ["GPT", "OpenAI API", "Scikit-learn", "Pandas", "Gen AI"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80&auto=format",
  },
  {
    id: "04",
    title: "Database",
    titleLine2: "Design",
    description:
      "I design and manage relational databases with optimized schemas, data modeling, and administration using MySQL, PostgreSQL, and Prisma.",
    tags: ["MySQL", "PostgreSQL", "SQLite", "Prisma", "Data Modeling"],
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&q=80&auto=format",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cardEls = cardsRef.current.filter(Boolean);

    if (!section || cardEls.length === 0) return;

    const ctx = gsap.context(() => {
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <h2 
            className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold uppercase tracking-[0.15em]"
            style={{
              fontFamily: '"Nepos Simplex Solid", "Nepos Simplex", sans-serif',
              color: "#000",
            }}
          >
            My Services
          </h2>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-2 font-mono tracking-wider">
            What I do best.
          </p>
        </div>

        {/* Services Grid - 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-6 lg:gap-x-10">
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group border-t border-black/10 py-5 sm:py-6 lg:py-8 cursor-pointer"
            >
              <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                {/* Number in Cube */}
                <div className="flex-shrink-0">
                  <div className="overflow-hidden">
                    <div className="service-num flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-black will-change-transform">
                      <span className="text-[10px] sm:text-xs lg:text-sm font-mono text-white tracking-wider">
                        {service.id}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Title */}
                  <div className="overflow-hidden">
                    <h3 className="title-line-1 text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-light leading-[1.05] tracking-tight text-black will-change-transform">
                      {service.title}
                    </h3>
                  </div>
                  <div className="overflow-hidden">
                    <h3 
                      className="title-line-2 text-xl sm:text-2xl lg:text-4xl font-light leading-[1.05] tracking-tight will-change-transform"
                      style={{ color: "#000",
                        fontFamily: '"Nepos Simplex Solid", "Nepos Simplex", sans-serif',
                      }}
                    >
                      {service.titleLine2}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="service-desc text-[11px] sm:text-xs lg:text-sm text-gray-500 leading-relaxed mt-2 sm:mt-3 max-w-xs will-change-transform">
                    {service.description}
                  </p>

                  {/* Tags - cream bg, no rounded */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="service-tag px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-mono text-black border border-black/[0.08] will-change-transform"
                        style={{ backgroundColor: "#e8e8e3" }}
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