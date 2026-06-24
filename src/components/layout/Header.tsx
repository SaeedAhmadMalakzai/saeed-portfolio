"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useCallback, useState, useEffect } from "react";
import { profile } from "@/lib/data";
import { MobileMenu } from "./MobileMenu";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/process", label: "Process" },
];

const chars = "abcdefghijklmnopqrstuvwxyz@#$%^&*()_+-=[]{}|;:',.<>?/0123456789".split("");

function useScrambleText(originalText: string) {
  const [displayText, setDisplayText] = useState(originalText);
  const intervalRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    const totalIterations = originalText.length * 3;
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        originalText.split("").map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration / 3) return originalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      iteration += 1;
      if (iteration >= totalIterations) {
        setDisplayText(originalText);
        if (intervalRef.current !== null) clearInterval(intervalRef.current);
      }
    }, 15); // faster: 15ms instead of 30ms
  }, [originalText]);

  const reset = useCallback(() => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    setDisplayText(originalText);
  }, [originalText]);

  return { displayText, scramble, reset };
}

function TextSlideLink({ href, text, isActive }: { href: string; text: string; isActive?: boolean }) {
  const { displayText, scramble, reset } = useScrambleText(text);
  return (
    <Link href={href} className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium" onMouseEnter={scramble} onMouseLeave={reset}>
      <span className="absolute -left-0.5 -top-0.5 text-green-500 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M1 6L1 1L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="absolute -right-0.5 -top-0.5 text-green-500 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M15 6L15 1L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="absolute -right-0.5 -bottom-0.5 text-green-500 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M15 10L15 15L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="absolute -left-0.5 -bottom-0.5 text-green-500 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M1 10L1 15L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="relative block h-[1.2em] overflow-hidden">
        <span className={`block transition-transform duration-200 ease-out group-hover:-translate-y-full ${isActive ? "text-zinc-900" : "text-zinc-500"}`} style={{ fontFamily: "monospace", letterSpacing: "0.02em" }}>{displayText}</span>
        <span className={`absolute top-full left-0 block transition-transform duration-200 ease-out group-hover:-translate-y-full ${isActive ? "text-zinc-900" : "text-zinc-500"}`} style={{ fontFamily: "monospace", letterSpacing: "0.02em" }}>{displayText}</span>
      </span>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════
// LOGO — mix-blend-mode sits on THIS container (no z-index,
// no transform here) so it is NOT isolated into its own
// stacking context.
// ═══════════════════════════════════════════════════════════════
function Logo() {
  const { displayText, scramble, reset } = useScrambleText(profile.name);
  const logoRef = useRef<HTMLAnchorElement>(null);

  const handleLogoEnter = useCallback(() => {
    scramble();
    if (!logoRef.current) return;
    const brackets = logoRef.current.querySelectorAll(".corner-bracket");
    gsap.to(brackets, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out", stagger: 0.05 });
  }, [scramble]);

  const handleLogoLeave = useCallback(() => {
    reset();
    if (!logoRef.current) return;
    const brackets = logoRef.current.querySelectorAll(".corner-bracket");
    gsap.to(brackets, { scale: 0.75, opacity: 0, duration: 0.2, ease: "power2.in" });
  }, [reset]);

  return (
    <Link
      ref={logoRef}
      href="/"
      className="group relative text-xl font-semibold tracking-tight"
      onMouseEnter={handleLogoEnter}
      onMouseLeave={handleLogoLeave}
    >
      {/* mix-blend-mode goes HERE — no z-index, no transform on this element */}
      <div style={{ mixBlendMode: "difference" }}>
        <h2
          className="font-bold leading-[0.95] tracking-tight whitespace-pre-line"
          style={{
            fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            // Black text — difference blend will invert it
            color: "#000",
          }}
        >
          {displayText}
        </h2>
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════
// BOOK A CALL BUTTON — mix-blend-mode sits on THIS container
// (no z-index, no transform here) so it is NOT isolated into
// its own stacking context. translateY lives one level down.
// ═══════════════════════════════════════════════════════════════
function BookCallButton() {
  const { displayText, scramble, reset } = useScrambleText("Book a Call");

  return (
    <Link
      href="/contact"
      className="group relative inline-flex items-center gap-2 px-5 py-2 text-sm font-medium"
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {/* Corner brackets — always visible, green on hover */}
      <span className="absolute -left-1 -top-1 text-black transition-colors duration-300 group-hover:text-green-500">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 6L1 1L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="absolute -right-1 -top-1 text-black transition-colors duration-300 group-hover:text-green-500">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15 6L15 1L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="absolute -right-1 -bottom-1 text-black transition-colors duration-300 group-hover:text-green-500">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15 10L15 15L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="absolute -left-1 -bottom-1 text-black transition-colors duration-300 group-hover:text-green-500">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 10L1 15L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>

      {/* mix-blend-mode goes HERE — no z-index, no transform on this element */}
      <div style={{ mixBlendMode: "difference" }}>
        {/* translateY moved here so it doesn't isolate the blend parent */}
        <div className="relative block h-[1.2em] overflow-hidden">
          <span
            className="block transition-transform duration-200 ease-out group-hover:-translate-y-full"
            style={{ fontFamily: "monospace", letterSpacing: "0.02em", color: "#000" }}
          >
            {displayText}
          </span>
          <span
            className="absolute top-full left-0 block transition-transform duration-200 ease-out group-hover:-translate-y-full"
            style={{ fontFamily: "monospace", letterSpacing: "0.02em", color: "#000" }}
          >
            {displayText}
          </span>
        </div>
      </div>

      {/* Arrow — same pattern */}
      <div style={{ mixBlendMode: "difference" }}>
        <div className="relative h-4 w-4 overflow-hidden">
          <span className="block transition-transform duration-200 ease-out group-hover:translate-x-full" style={{ color: "#000" }}>
            <ArrowRight className="h-4 w-4" />
          </span>
          <span className="absolute top-0 -left-full block transition-transform duration-200 ease-out group-hover:translate-x-full" style={{ color: "#000" }}>
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="relative z-50 font-mono">
        <div className="relative mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <Logo />
          <nav className="hidden items-center gap-1 px-2 py-2 md:flex">
            {navLinks.map((link) => (
              <TextSlideLink key={link.href} href={link.href} text={link.label} isActive={pathname === link.href} />
            ))}
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <BookCallButton />
          </div>
          <MobileMenu />
        </div>
      </header>

      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Logo />
          <BookCallButton />
        </div>
      </div>
    </>
  );
}