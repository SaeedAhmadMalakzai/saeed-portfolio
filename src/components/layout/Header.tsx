"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useCallback } from "react";
import { profile } from "@/lib/data";
import { MobileMenu } from "./MobileMenu";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/process", label: "Process" },
];

export function Header() {
  const pathname = usePathname();
  const logoRef = useRef<HTMLAnchorElement>(null);

  const handleLogoEnter = useCallback(() => {
    if (!logoRef.current) return;
    const brackets = logoRef.current.querySelectorAll(".corner-bracket");
    gsap.to(brackets, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.05,
    });
  }, []);

  const handleLogoLeave = useCallback(() => {
    if (!logoRef.current) return;
    const brackets = logoRef.current.querySelectorAll(".corner-bracket");
    gsap.to(brackets, {
      scale: 0.75,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 font-mono">
      <div className="relative mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          ref={logoRef}
          href="/"
          className="group relative text-xl font-semibold tracking-tight text-zinc-900"
          
        >
          <span className="relative inline-block">
            {profile.name}
            
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden items-center gap-1 bg-white/60 px-2 py-2 shadow-sm md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 text-sm font-medium"
              >
                <span className="absolute -left-0.5 -top-0.5 text-green-500 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path d="M1 6L1 1L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="absolute -right-0.5 -top-0.5 text-green-500 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path d="M15 6L15 1L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="absolute -right-0.5 -bottom-0.5 text-green-500 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path d="M15 10L15 15L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="absolute -left-0.5 -bottom-0.5 text-green-500 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path d="M1 10L1 15L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>

                <span className="relative block h-[1.2em] overflow-hidden">
                  <span className={`block transition-transform duration-300 ease-out group-hover:-translate-y-full ${isActive ? "text-zinc-900" : "text-zinc-500"}`}>
                    {link.label}
                  </span>
                  <span className={`absolute top-full left-0 block transition-transform duration-300 ease-out group-hover:-translate-y-full ${isActive ? "text-zinc-900" : "text-zinc-500"}`}>
                    {link.label}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* CTA Button — corners always visible, color changes on hover */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-zinc-900"
          >
            {/* Corner brackets — always visible, green on hover */}
            <span className="absolute -left-1 -top-1 text-zinc-400 transition-colors duration-300 group-hover:text-green-500">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 6L1 1L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="absolute -right-1 -top-1 text-zinc-400 transition-colors duration-300 group-hover:text-green-500">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M15 6L15 1L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="absolute -right-1 -bottom-1 text-zinc-400 transition-colors duration-300 group-hover:text-green-500">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M15 10L15 15L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="absolute -left-1 -bottom-1 text-zinc-400 transition-colors duration-300 group-hover:text-green-500">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 10L1 15L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>

            {/* Text slide animation */}
            <span className="relative h-[1.2em] overflow-hidden">
              <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                Book a Call
              </span>
              <span className="absolute top-full left-0 block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                Book a Call
              </span>
            </span>

            {/* Arrow slide animation */}
            <span className="relative h-4 w-4 overflow-hidden">
              <span className="block transition-transform duration-300 ease-out group-hover:translate-x-full">
                <ArrowRight className="h-4 w-4" />
              </span>
              <span className="absolute top-0 -left-full block transition-transform duration-300 ease-out group-hover:translate-x-full">
                <ArrowRight className="h-4 w-4" />
              </span>
            </span>
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}