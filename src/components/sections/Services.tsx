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

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;

export default function TeamScrollSection() {
  const wrapperRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const textRefs = useRef([]);
  const wordRefs = useRef([]);
  const numberOnesRef = useRef(null);
  const numberTickRef = useRef(null);
  const navTickRef = useRef(null);
  const currentIndexRef = useRef(-1);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = ITEMS.length;

    const applyCardTransform = (el, t) => {
      const tt = clamp(t, -1, 1);
      let x, y, rot, scale, opacity;

      if (tt <= 0) {
        const k = tt + 1;
        x = lerp(-50 + 38, -50, k);
        y = lerp(-50 + 34, -50, k);
        rot = lerp(7, 0, k);
        scale = lerp(1.12, 1, k);
        opacity = clamp(k * 1.8, 0, 1);
      } else {
        const k = tt;
        x = lerp(-50, -50 - 32, k);
        y = lerp(-50, -50 - 36, k);
        rot = lerp(0, -6, k);
        scale = lerp(1, 0.86, k);
        opacity = clamp(1 - k * 1.6, 0, 1);
      }

      gsap.set(el, {
        xPercent: x,
        yPercent: y,
        rotate: rot,
        scale,
        opacity,
        force3D: true,
      });
    };

    const applyTextReveal = (container, words, t) => {
      const tt = clamp(t, -1, 1);

      if (tt <= 0) {
        const enterK = clamp((tt + 1) * 1.3, 0, 1);
        gsap.set(container, { opacity: enterK });
        const reveal = tt + 1;
        const count = words.length || 1;
        words.forEach((w, i) => {
          const threshold = i / count;
          const wordT = clamp((reveal - threshold) * 3.2, 0, 1);
          w.style.opacity = lerp(0.28, 1, wordT);
        });
      } else {
        const exitK = clamp(1 - tt * 1.6, 0, 1);
        gsap.set(container, { opacity: exitK });
        words.forEach((w) => { w.style.opacity = 1; });
      }
    };

    const setActiveIndex = (idx) => {
      if (idx === currentIndexRef.current) return;
      currentIndexRef.current = idx;
      const item = ITEMS[clamp(idx, 0, total - 1)];
      if (!item) return;

      const lastDigit = item.number.slice(-1);

      if (numberOnesRef.current) {
        if (reduceMotion) {
          numberOnesRef.current.textContent = lastDigit;
        } else {
          gsap.fromTo(numberOnesRef.current,
            { yPercent: 40, opacity: 0, rotate: 8 },
            {
              yPercent: 0, opacity: 1, rotate: 0,
              duration: 0.45, ease: "power3.out",
              onStart: () => {
                if (numberOnesRef.current) numberOnesRef.current.textContent = lastDigit;
              },
            }
          );
        }
      }

      if (numberTickRef.current && !reduceMotion) {
        gsap.fromTo(numberTickRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: "power2.out", transformOrigin: "left" }
        );
      }
    };

    wordRefs.current = [];
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      const words = ITEMS[i].text.split(" ");
      el.innerHTML = words
        .map((w) => `<span style="display:inline-block;margin-right:0.28em;opacity:0.28;">${w}</span>`)
        .join(" ");
      wordRefs.current[i] = Array.from(el.querySelectorAll("span"));
    });

    const updateScene = (progress) => {
      const p = progress * total;

      for (let i = 0; i < total; i++) {
        const localT = p - (i + 0.5);
        const card = cardRefs.current[i];
        const text = textRefs.current[i];
        const words = wordRefs.current[i] || [];

        if (Math.abs(localT) > 1.15) {
          if (card) gsap.set(card, { opacity: 0 });
          if (text) gsap.set(text, { opacity: 0 });
          continue;
        }

        if (card) applyCardTransform(card, localT);
        if (text) applyTextReveal(text, words, localT);

        const dist = Math.abs(localT);
        if (card) gsap.set(card, { zIndex: 100 - Math.round(dist * 50) });
      }

      const activeIndex = clamp(Math.round(p - 0.5), 0, total - 1);
      setActiveIndex(activeIndex);
    };

    updateScene(0);
    setActiveIndex(0);

    let st;
    let navSt;

    if (reduceMotion) {
      cardRefs.current.forEach((c, i) =>
        gsap.set(c, { opacity: i === 0 ? 1 : 0, xPercent: -50, yPercent: -50, rotate: 0, scale: 1 })
      );
      textRefs.current.forEach((t, i) => gsap.set(t, { opacity: i === 0 ? 1 : 0 }));
    } else {
      st = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stageRef.current,
        pinSpacing: false,
        scrub: true,
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
        background: "#0a1628",
        height: `${ITEMS.length * 100}vh`,
      }}
    >
      <div
        ref={stageRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "#0a1628",
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
                    <span
                      style={{
                        display: "block",
                        width: "16px",
                        height: "1px",
                        background: "rgba(212,175,55,0.8)",
                      }}
                    />
                    <span
                      style={{
                        color: "rgba(212,175,55,0.9)",
                        fontSize: "11px",
                        fontWeight: 400,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {ACTIVE_NAV_LABEL}
                    </span>
                  </span>
                ) : (
                  <span
                    style={{
                      color: "rgba(255,255,255,0.25)",
                      fontSize: "11px",
                      fontWeight: 400,
                      letterSpacing: "0.05em",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {n}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Big Number */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "40px",
            left: "40px",
            zIndex: 200,
          }}
        >
          <span
            ref={numberTickRef}
            style={{
              position: "absolute",
              top: "-8px",
              left: 0,
              width: "40px",
              height: "2px",
              background: "rgba(212,175,55,0.8)",
              transformOrigin: "left center",
            }}
          />
          <span
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: "clamp(80px, 12vw, 160px)",
              fontWeight: 300,
              lineHeight: 0.85,
              color: "rgba(255,255,255,0.15)",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.04em",
            }}
          >
            <span>0</span>
            <span
              ref={numberOnesRef}
              style={{ display: "inline-block", color: "rgba(255,255,255,0.65)" }}
            >
              1
            </span>
          </span>
        </div>

        {/* Image Cards */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          {ITEMS.map((item, i) => (
            <figure
              key={item.number}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "clamp(280px, 32vw, 480px)",
                aspectRatio: "3 / 4",
                margin: 0,
                padding: 0,
                transform: "translate(-50%, -50%)",
                willChange: "transform, opacity",
                pointerEvents: "auto",
              }}
            >
              <img
                src={item.image}
                alt=""
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </figure>
          ))}
        </div>

        {/* Text Copy */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "40%",
            zIndex: 20,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: "60px",
          }}
        >
          {ITEMS.map((item, i) => (
            <p
              key={item.number}
              ref={(el) => {
                if (el) textRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                top: "50%",
                right: "60px",
                transform: "translateY(-50%)",
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
      </div>
    </section>
  );
}