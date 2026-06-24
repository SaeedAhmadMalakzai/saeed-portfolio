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
    }, 15);
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
    <Link href={href} className="group relative inline-flex items-center gap-2 px-3 py-2 text-sm font-medium" onMouseEnter={scramble} onMouseLeave={reset}>
      <span className="absolute -left-0.5 -top-0.5 text-black opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M1 6L1 1L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="absolute -right-0.5 -top-0.5 text-black opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M15 6L15 1L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="absolute -right-0.5 -bottom-0.5 text-black opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M15 10L15 15L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="absolute -left-0.5 -bottom-0.5 text-black opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M1 10L1 15L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="relative block h-[1.2em] overflow-hidden">
        <span className={`block transition-transform duration-200 ease-out group-hover:-translate-y-full ${isActive ? "text-black" : "text-zinc-500"}`} style={{ fontFamily: "monospace", letterSpacing: "0.02em" }}>{displayText}</span>
        <span className={`absolute top-full left-0 block transition-transform duration-200 ease-out group-hover:-translate-y-full ${isActive ? "text-zinc-900" : "text-zinc-500"}`} style={{ fontFamily: "monospace", letterSpacing: "0.02em" }}>{displayText}</span>
      </span>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════
// LOGO — Nepos Simplex Solid font, no hover animation
// ═══════════════════════════════════════════════════════════════
function Logo() {
  return (
    <Link
      href="/"
      className="relative"
    >
      <h2
        className="font-bold tracking-tight whitespace-pre-line"
        style={{
          fontSize: "clamp(1.4rem, 1vw, 1.8rem)",
          fontFamily: '"Nepos Simplex Solid", "Nepos Simplex", sans-serif',
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          color: "#000",
        }}
      >
        {profile.name}
      </h2>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════
// BOOK A CALL BUTTON — black corner brackets
// ═══════════════════════════════════════════════════════════════
function BookCallButton() {
  const { displayText, scramble, reset } = useScrambleText("Book a Call");

  return (
    <Link
      href="/contact"
      className="group relative inline-flex items-center gap-2 px-3 py-2 text-sm font-medium"
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {/* Corner brackets — always visible, black */}
      <span className="absolute -left-1 -top-1 text-black transition-colors duration-300">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M1 6L1 1L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="absolute -right-1 -top-1 text-black transition-colors duration-300">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M15 6L15 1L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="absolute -right-1 -bottom-1 text-black transition-colors duration-300">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M15 10L15 15L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="absolute -left-1 -bottom-1 text-black transition-colors duration-300">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M1 10L1 15L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>

      <div style={{ mixBlendMode: "difference" }}>
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