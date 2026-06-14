"use client";

import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";
import { profile, socialLinks } from "@/lib/data";
import { ArrowRight } from "lucide-react";

const PHONE = "+39 375 930 64 63";

export function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const gridRef = useRef<{ col: number; row: number; x: number; y: number; opacity: number; baseOpacity: number; hoverIntensity: number }[]>([]);
  const animationRef = useRef<number>(0);

  const cellSize = 20;
  const gap = 4;

  const initGrid = useCallback((width: number, height: number) => {
    const grid = [];
    const actualCols = Math.ceil(width / (cellSize + gap)) + 2;
    const actualRows = Math.ceil(height / (cellSize + gap)) + 2;

    for (let r = 0; r < actualRows; r++) {
      for (let c = 0; c < actualCols; c++) {
        const rand = Math.random();
        let baseOpacity = 0.05;
        if (rand > 0.6) baseOpacity = 0.1;
        if (rand > 0.8) baseOpacity = 0.2;
        if (rand > 0.92) baseOpacity = 0.35;
        if (rand > 0.98) baseOpacity = 0.5;
        
        grid.push({
          col: c,
          row: r,
          x: c * (cellSize + gap),
          y: r * (cellSize + gap),
          opacity: baseOpacity,
          baseOpacity,
          hoverIntensity: 0,
        });
      }
    }
    gridRef.current = grid;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const grid = gridRef.current;
    const mouse = mouseRef.current;

    const mouseCol = Math.floor((mouse.x + gap / 2) / (cellSize + gap));
    const mouseRow = Math.floor((mouse.y + gap / 2) / (cellSize + gap));

    grid.forEach((cell) => {
      const isHovered = cell.col === mouseCol && cell.row === mouseRow;

      let targetHover = 0;
      if (isHovered) {
        targetHover = 1;
      }

      cell.hoverIntensity += (targetHover - cell.hoverIntensity) * 0.15;

      const hoverOpacity = cell.hoverIntensity * 0.9;
      const finalOpacity = Math.min(cell.baseOpacity + hoverOpacity, 1);

      const greenValue = Math.floor(100 + cell.hoverIntensity * 155);
      const alpha = finalOpacity;

      ctx.fillStyle = `rgba(0, ${greenValue}, 40, ${alpha})`;
      // Square boxes - no rounded corners
      ctx.fillRect(cell.x, cell.y, cellSize, cellSize);
    });

    animationRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const footer = canvas.closest("footer");
      if (!footer) return;
      
      const gridArea = footer.querySelector(".grid-area") as HTMLElement;
      if (!gridArea) return;
      
      canvas.width = gridArea.offsetWidth;
      canvas.height = gridArea.offsetHeight;
      
      initGrid(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initGrid, draw]);

  return (
    <footer className="relative overflow-hidden bg-[#0d1117] text-white">
      {/* Grid background area */}
      <div className="grid-area absolute inset-x-0 top-0 h-[calc(100%-80px)]">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 min-h-75 flex flex-col justify-between pointer-events-none">
        {/* Top - Description paragraph */}
        <div className="mb-16 pointer-events-auto">
          <p className="text-sm font-mono text-zinc-300 leading-relaxed max-w-lg">
            We embrace the freedom to explore innovative and unconventional ideas, 
            constantly pushing the boundaries of creativity to deliver extraordinary results.
          </p>
        </div>

        {/* Middle section - links | big button | contact */}
        <div className="flex items-center justify-between flex-1">
          {/* Nav links - left */}
          <nav className="space-y-4 pointer-events-auto">
            {["SOLUTIONS", "ABOUT", "PROJECTS", "CONTACTS"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block text-sm font-mono text-white hover:text-green-400 transition-colors tracking-wider"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Big Contact Button - takes center space */}
          <div className="flex flex-1 items-center justify-center px-4 pointer-events-auto">
            <Link
              href="/contact"
              className="group relative inline-flex items-center bg-[#0a0e15] justify-center w-full max-w-lg px-20 py-10 text-4xl font-mono font-medium text-white"
            >
              {/* Corner brackets */}
              <span className="absolute -left-5 -top-5 text-green-500 transition-colors duration-300 group-hover:text-green-400">
                <svg width="56" height="56" viewBox="0 0 16 16" fill="none">
                  <path d="M1 6L1 1L6 1" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
              <span className="absolute -right-5 -top-5 text-green-500 transition-colors duration-300 group-hover:text-green-400">
                <svg width="56" height="56" viewBox="0 0 16 16" fill="none">
                  <path d="M15 6L15 1L10 1" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
              <span className="absolute -right-5 -bottom-5 text-green-500 transition-colors duration-300 group-hover:text-green-400">
                <svg width="56" height="56" viewBox="0 0 16 16" fill="none">
                  <path d="M15 10L15 15L10 15" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
              <span className="absolute -left-5 -bottom-5 text-green-500 transition-colors duration-300 group-hover:text-green-400">
                <svg width="56" height="56" viewBox="0 0 16 16" fill="none">
                  <path d="M1 10L1 15L6 15" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>

              {/* Text slide animation */}
              <span className="relative h-[1.2em] overflow-hidden">
                <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  SAY HELLO
                </span>
                <span className="absolute top-full left-0 block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  SAY HELLO
                </span>
              </span>

              {/* Arrow slide animation */}
              <span className="relative h-10 w-10 overflow-hidden">
                <span className="block transition-transform duration-300 ease-out group-hover:translate-x-full">
                  <ArrowRight className="h-10 w-10" />
                </span>
                <span className="absolute top-0 -left-full block transition-transform duration-300 ease-out group-hover:translate-x-full group-hover:text-green-400">
                  <ArrowRight className="h-10 w-10" />
                </span>
              </span>
            </Link>
          </div>

          {/* Email + Tel + Socials - right */}
          <div className="space-y-4 text-right pointer-events-auto">
            <div className="flex gap-3 justify-end items-baseline">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Email</span>
              <a 
                href={`mailto:${profile.email || "hello@example.com"}`}
                className="text-sm font-mono text-white hover:text-green-400 transition-colors"
              >
                {profile.email || "hello@example.com"}
              </a>
            </div>
            <div className="flex gap-3 justify-end items-baseline">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Tel</span>
              <span className="text-sm font-mono text-white">{PHONE}</span>
            </div>

            {/* Socials under email/tel */}
            <div className="flex gap-4 justify-end pt-6">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-zinc-500 hover:text-green-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright — solid dark background, no grid */}
      <div className="relative z-10 bg-[#0a0e15] border-t border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs font-mono text-zinc-600">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}