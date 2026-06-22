"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    number: "01",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    text: "What started in China as a creative partnership which became the foundation of everything we've built. The curiosity never stops there.",
  },
  {
    number: "02",
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1200&auto=format&fit=crop",
    text: "Saigon is where we found our footing. Fast, ambitious, never satisfied — shaped how we work and what we expect from ourselves.",
  },
  {
    number: "03",
    image: "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?q=80&w=1200&auto=format&fit=crop",
    text: "But good work doesn't stay in one place — and neither did we. We go wherever the next brief takes us.",
  },
  {
    number: "04",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    text: "The offices gave us roots in new places. The people gave us reasons to keep going.",
  },
];

const NAV_INDEX = ["01", "02", "03", "04", "05", "06", "07"];
const ACTIVE_NAV_INDEX = 3;
const ACTIVE_NAV_LABEL = "Our team";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function TeamScrollSection() {
  const wrapperRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const wordRefs = useRef<HTMLSpanElement[][]>([]);
  const numberOnesRef = useRef<HTMLSpanElement>(null);
  const numberTickRef = useRef<HTMLSpanElement>(null);
  const navTickRef = useRef<HTMLElement>(null);
  const currentIndexRef = useRef(-1);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = ITEMS.length;

    // Split text into word spans
    wordRefs.current = [];
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      const words = ITEMS[i].text.split(" ");
      el.innerHTML = words
        .map((w) => `<span style="display:inline-block;margin-right:0.25em;opacity:0.28;">${w}</span>`)
        .join(" ");
      wordRefs.current[i] = Array.from(el.querySelectorAll("span"));
    });

    const updateScene = (progress: number) => {
      const p = progress * total; // 0 to 4

      for (let i = 0; i < total; i++) {
        const card = cardRefs.current[i];
        const text = textRefs.current[i];
        const words = wordRefs.current[i] || [];

        if (!card || !text) continue;

        // Each slide gets 1 unit of progress
        // Slide i is active when p is between i and i+1
        const slideProgress = p - i; // 0 when slide starts, 0.5 when centered, 1 when ended

        let yOffset: number;
        let scale: number;
        let opacity: number;
        let zIndex: number;

        if (slideProgress < 0) {
          // Card is below viewport, waiting to enter
          yOffset = 80;
          scale = 0.7;
          opacity = 0;
          zIndex = i;
        } else if (slideProgress < 0.5) {
          // Card is entering from bottom
          const enterProgress = slideProgress / 0.5;
          yOffset = 80 - (enterProgress * 80);
          scale = 0.7 + (enterProgress * 0.3);
          opacity = enterProgress;
          zIndex = i + 10;
        } else if (slideProgress < 1) {
          // Card is being covered by next (exiting to top)
          const exitProgress = (slideProgress - 0.5) / 0.5;
          yOffset = -exitProgress * 20;
          scale = 1.0 - (exitProgress * 0.05);
          opacity = 1 - (exitProgress * 0.3);
          zIndex = i;
        } else {
          // Card is stacked above
          yOffset = -20 - ((slideProgress - 1) * 5);
          scale = 0.95 - ((slideProgress - 1) * 0.02);
          opacity = 0.7 - ((slideProgress - 1) * 0.1);
          zIndex = i;
        }

        gsap.set(card, {
          yPercent: yOffset,
          scale: clamp(scale, 0.5, 1.2),
          opacity: clamp(opacity, 0, 1),
          zIndex: zIndex,
        });

        // Text animation
        let textOpacity: number;
        if (slideProgress < 0.1) {
          textOpacity = 0;
        } else if (slideProgress < 0.3) {
          textOpacity = (slideProgress - 0.1) / 0.2;
        } else if (slideProgress > 0.7) {
          textOpacity = 1 - (slideProgress - 0.7) / 0.3;
        } else {
          textOpacity = 1;
        }

        gsap.set(text, { opacity: clamp(textOpacity, 0, 1) });

        // Word reveal for entering text
        if (slideProgress > 0.1 && slideProgress < 0.5) {
          const reveal = (slideProgress - 0.1) / 0.4;
          const count = words.length || 1;
          words.forEach((w, wi) => {
            const threshold = wi / count;
            const wordT = clamp((reveal - threshold) * 4, 0, 1);
            w.style.opacity = String(0.28 + wordT * 0.72);
          });
        } else if (slideProgress >= 0.5) {
          words.forEach((w) => { w.style.opacity = "1"; });
        } else {
          words.forEach((w) => { w.style.opacity = "0.28"; });
        }
      }

      // Update number
      const activeIndex = clamp(Math.floor(p), 0, total - 1);
      if (activeIndex !== currentIndexRef.current) {
        currentIndexRef.current = activeIndex;
        const item = ITEMS[activeIndex];
        if (item && numberOnesRef.current) {
          const lastDigit = item.number.slice(-1);
          if (reduceMotion) {
            numberOnesRef.current.textContent = lastDigit;
          } else {
            gsap.fromTo(numberOnesRef.current,
              { yPercent: 40, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.45, ease: "power3.out",
                onStart: () => { if (numberOnesRef.current) numberOnesRef.current.textContent = lastDigit; }
              }
            );
          }
          if (numberTickRef.current && !reduceMotion) {
            gsap.fromTo(numberTickRef.current,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.5, ease: "power2.out", transformOrigin: "left" }
            );
          }
        }
      }
    };

    // Initial state
    updateScene(0);

    let st: ScrollTrigger | undefined;
    let navSt: ScrollTrigger | undefined;

    if (reduceMotion) {
      cardRefs.current.forEach((c, i) =>
        gsap.set(c, { opacity: i === 0 ? 1 : 0, yPercent: 0, scale: 1 })
      );
      textRefs.current.forEach((t, i) => gsap.set(t, { opacity: i === 0 ? 1 : 0 }));
    } else {
      st = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stageRef.current,
        pinSpacing: false,
        scrub: 1,
        onUpdate: (self) => updateScene(self.progress),
      });

      if (navTickRef.current) {
        gsap.set(navTickRef.current, { opacity: 0 });
        navSt = ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => gsap.to(navTickRef.current, { opacity: 1, duration: 0.4 }),
          onLeave: () => gsap.to(navTickRef.current, { opacity: 0, duration: 0.4 }),
          onEnterBack: () => gsap.to(navTickRef.current, { opacity: 1, duration: 0.4 }),
          onLeaveBack: () => gsap.to(navTickRef.current, { opacity: 0, duration: 0.4 }),
        });
      }
    }

    return () => {
      st && st.kill();
      navSt && navSt.kill();
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100%",
        background: "#1a1a3e",
        height: `${ITEMS.length * 100}vh`,
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 40px",
          zIndex: 300,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: 400, letterSpacing: "0.05em", cursor: "pointer" }}>
          <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <span style={{ display: "block", width: "14px", height: "1px", background: "currentColor" }} />
            <span style={{ display: "block", width: "14px", height: "1px", background: "currentColor" }} />
          </span>
          <span>Menu</span>
        </div>
        <div style={{ fontSize: "20px", fontWeight: 300, color: "rgba(255,255,255,0.9)", letterSpacing: "0.02em" }}>
          fromanother
        </div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: 400, letterSpacing: "0.05em", cursor: "pointer" }}>
          Let's chat →
        </div>
      </header>

      <div
        ref={stageRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "#1a1a3e",
        }}
      >
        {/* Side Nav */}
        <nav
          ref={navTickRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "40px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 200,
          }}
        >
          <ol
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {NAV_INDEX.map((n, i) => (
              <li key={n} style={{ display: "flex", alignItems: "center" }}>
                {i === ACTIVE_NAV_INDEX ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ display: "block", width: "16px", height: "1px", background: "rgba(212,175,55,0.8)" }} />
                    <span style={{ color: "rgba(212,175,55,0.9)", fontSize: "11px", fontWeight: 400, letterSpacing: "0.05em" }}>{ACTIVE_NAV_LABEL}</span>
                  </span>
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", fontWeight: 400, letterSpacing: "0.05em", fontVariantNumeric: "tabular-nums" }}>{n}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Big Number */}
        <div aria-hidden="true" style={{ position: "absolute", bottom: "40px", left: "40px", zIndex: 200 }}>
          <span ref={numberTickRef} style={{ position: "absolute", top: "-8px", left: 0, width: "40px", height: "2px", background: "rgba(212,175,55,0.8)", transformOrigin: "left center" }} />
          <span style={{ display: "flex", alignItems: "baseline", fontSize: "clamp(100px, 14vw, 200px)", fontWeight: 300, lineHeight: 0.85, color: "rgba(255,255,255,0.15)", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.04em" }}>
            <span>0</span>
            <span ref={numberOnesRef} style={{ display: "inline-block", color: "rgba(255,255,255,0.65)" }}>1</span>
          </span>
        </div>

        {/* Image Cards — centered, stacked from bottom */}
        <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          {ITEMS.map((item, i) => (
            <figure
              key={item.number}
              ref={(el) => { if (el) cardRefs.current[i] = el; }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "clamp(320px, 36vw, 520px)",
                aspectRatio: "4 / 3",
                margin: 0,
                padding: 0,
                transform: "translate(-50%, -50%)",
                willChange: "transform, opacity",
                pointerEvents: "auto",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                overflow: "hidden",
              }}
            >
              <img
                src={item.image}
                alt=""
                draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </figure>
          ))}
        </div>

        {/* Text Copy */}
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "40%", zIndex: 20, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center", paddingRight: "60px" }}>
          {ITEMS.map((item, i) => (
            <p
              key={item.number}
              ref={(el) => { if (el) textRefs.current[i] = el; }}
              style={{
                position: "absolute",
                maxWidth: "320px",
                margin: 0,
                padding: 0,
                color: "rgba(255,255,255,0.85)",
                fontSize: "clamp(14px, 1.2vw, 18px)",
                lineHeight: 1.6,
                fontWeight: 300,
                letterSpacing: "0.01em",
                willChange: "opacity",
              }}
            >
              {item.text}
            </p>
          ))}
        </div>

        {/* Bottom gradient hint */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to top, rgba(26,26,62,0.8), transparent)", zIndex: 50, pointerEvents: "none" }} />
      </div>
    </section>
  );
}