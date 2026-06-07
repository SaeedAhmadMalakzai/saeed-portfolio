"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const circle = circleRef.current;
    if (!wrapper || !circle) return;

    // Mouse position (in viewport percentage)
    let targetX = 50; // Start at center
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;
    let isActive = true;
    let hasMoved = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;

      if (!hasMoved) {
        hasMoved = true;
        circle.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      circle.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      if (hasMoved) {
        circle.style.opacity = "1";
      }
    };

    // Smooth animation loop
    const animate = () => {
      if (!isActive) return;

      // Lerp for smooth trailing (0.08 = nice smooth follow)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      // Apply transform exactly like the website
      wrapper.style.transform = `translate3d(${currentX}vw, ${currentY}vh, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;

      requestAnimationFrame(animate);
    };

    // Hover effects
    const handleHover = () => {
      wrapper.style.transform = `translate3d(${currentX}vw, ${currentY}vh, 0px) scale3d(2, 2, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
    };

    const handleHoverOut = () => {
      // Scale resets on next animation frame
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const bindHover = () => {
      const elements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mouseleave", handleHoverOut);
      });
    };

    bindHover();
    const observer = new MutationObserver(bindHover);
    observer.observe(document.body, { childList: true, subtree: true });

    const rafId = requestAnimationFrame(animate);

    return () => {
      isActive = false;
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="cursor-wrapper"
      style={{
        position: "fixed",
        inset: "0%",
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        mixBlendMode: "difference",
        willChange: "transform",
        transform: "translate3d(50vw, 50vh, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        ref={circleRef}
        className="cursor-circle"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255, 255, 255, 0.9)",
          opacity: 0,
          transition: "opacity 0.3s ease",
          flexShrink: 0,
        }}
      />
    </div>
  );
}