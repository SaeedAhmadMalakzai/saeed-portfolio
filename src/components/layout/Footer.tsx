"use client";

import Link from "next/link";
import { useEffect, useRef, useCallback, useState } from "react";
import { profile, socialLinks } from "@/lib/data";
import { ArrowRight } from "lucide-react";

const PHONE = "+39 375 930 64 63";
const COLOR = "#e8e8e3";

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
    }, 30);
  }, [originalText]);

  const reset = useCallback(() => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    setDisplayText(originalText);
  }, [originalText]);

  return { displayText, scramble, reset };
}

// Scramble link component
function ScrambleLink({ href, text }: { href: string; text: string }) {
  const { displayText, scramble, reset } = useScrambleText(text);
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      <span className="absolute -left-0.5 -top-0.5 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" style={{ color: COLOR }}>
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M1 6L1 1L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="absolute -right-0.5 -top-0.5 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" style={{ color: COLOR }}>
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M15 6L15 1L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="absolute -right-0.5 -bottom-0.5 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" style={{ color: COLOR }}>
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M15 10L15 15L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="absolute -left-0.5 -bottom-0.5 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" style={{ color: COLOR }}>
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M1 10L1 15L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
      <span className="relative block h-[1.2em] overflow-hidden">
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full" style={{ fontFamily: "monospace", letterSpacing: "0.02em", color: COLOR, opacity: 0.7 }}>{displayText}</span>
        <span className="absolute top-full left-0 block transition-transform duration-300 ease-out group-hover:-translate-y-full" style={{ fontFamily: "monospace", letterSpacing: "0.02em", color: COLOR }}>{displayText}</span>
      </span>
    </Link>
  );
}

// Social icon SVG components (inline to avoid lucide naming issues)
function GitHubIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedInIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}


function GlobeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// Map social names to icon components
const socialIconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  behance: GlobeIcon,
  default: GlobeIcon,
};

function getSocialIcon(name: string) {
  const key = name.toLowerCase().replace(/\s+/g, "");
  return socialIconMap[key] || socialIconMap.default;
}

// Halftone text canvas
function HalftoneTextCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      timeRef.current += 0.008;
      const t = timeRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const fontSize = Math.min(w * 0.22, h * 0.7);
      const textX = w / 2;
      const textY = h / 2;

      ctx.clearRect(0, 0, w, h);

      const dotSize = 2.5;
      const spacing = 5;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing;
          const y = r * spacing;
          const nx = x / w;
          const ny = y / h;

          const wave1 = Math.sin(nx * 3 + t * 2) * Math.cos(ny * 2 - t * 1.5);
          const wave2 = Math.sin(nx * 5 - t * 1.2) * Math.sin(ny * 4 + t);
          const wave3 = Math.cos(nx * 2 + ny * 3 + t * 0.8);

          const distToMouse = Math.sqrt((nx - mx) ** 2 + (ny - my) ** 2);
          const mouseInfluence = Math.max(0, 1 - distToMouse * 2) * 0.5;

          const combined = (wave1 * 0.4 + wave2 * 0.3 + wave3 * 0.3) * 0.5 + 0.5;
          const value = combined + mouseInfluence;

          const threshold = 0.45;
          let radius = 0;
          if (value > threshold) {
            radius = Math.min((value - threshold) / (1 - threshold), 1) * dotSize * 1.8;
          }

          if (radius > 0.3) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(232, 232, 227, ${Math.min(value * 0.9, 0.85)})`;
            ctx.fill();
          }
        }
      }

      ctx.globalCompositeOperation = "destination-in";
      ctx.font = `bold ${fontSize}px "Nepos Simplex Solid", "Nepos Simplex", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";
      ctx.fillText("SAEED", textX, textY);

      ctx.globalCompositeOperation = "source-over";

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}

export function Footer() {
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const leftGridRef = useRef<{ col: number; row: number; x: number; y: number; opacity: number; baseOpacity: number; hoverIntensity: number }[]>([]);
  const rightGridRef = useRef<{ col: number; row: number; x: number; y: number; opacity: number; baseOpacity: number; hoverIntensity: number }[]>([]);
  const animationRef = useRef<number>(0);

  const cellSize = 12;
  const gap = 4;
  const stripWidth = 100;

  const initGrid = useCallback((width: number, height: number) => {
    const grid = [];
    const actualCols = Math.ceil(width / (cellSize + gap)) + 2;
    const actualRows = Math.ceil(height / (cellSize + gap)) + 2;

    for (let r = 0; r < actualRows; r++) {
      for (let c = 0; c < actualCols; c++) {
        const rand = Math.random();
        let baseOpacity = 0.03;
        if (rand > 0.7) baseOpacity = 0.06;
        if (rand > 0.88) baseOpacity = 0.12;
        if (rand > 0.96) baseOpacity = 0.25;
        if (rand > 0.99) baseOpacity = 0.4;

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
    return grid;
  }, []);

  const draw = useCallback((canvas: HTMLCanvasElement, gridRef: React.MutableRefObject<any[]>, isRight: boolean) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const grid = gridRef.current;
    const mouse = mouseRef.current;

    const rect = canvas.getBoundingClientRect();
    const canvasMouseX = mouse.x - rect.left;
    const canvasMouseY = mouse.y - rect.top;

    const mouseCol = Math.floor((canvasMouseX + gap / 2) / (cellSize + gap));
    const mouseRow = Math.floor((canvasMouseY + gap / 2) / (cellSize + gap));

    const r = 232;
    const g = 232;
    const b = 227;

    grid.forEach((cell) => {
      const isHovered = cell.col === mouseCol && cell.row === mouseRow;

      let targetHover = 0;
      if (isHovered) {
        targetHover = 1;
      }

      cell.hoverIntensity += (targetHover - cell.hoverIntensity) * 0.15;

      const normalizedX = isRight ? cell.x / width : 1 - (cell.x / width);
      const edgeFade = normalizedX * normalizedX * (3 - 2 * normalizedX);

      const hoverOpacity = cell.hoverIntensity * 0.9;
      const finalOpacity = Math.min((cell.baseOpacity + hoverOpacity) * edgeFade, 1);

      const colorIntensity = 0.3 + edgeFade * 0.7;
      const hoverBoost = cell.hoverIntensity * 0.3;

      const cr = Math.floor(r * colorIntensity + hoverBoost * 23);
      const cg = Math.floor(g * colorIntensity + hoverBoost * 23);
      const cb = Math.floor(b * colorIntensity + hoverBoost * 28);
      const alpha = finalOpacity;

      ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha})`;
      ctx.fillRect(cell.x, cell.y, cellSize, cellSize);
    });
  }, []);

  const drawLoop = useCallback(() => {
    const leftCanvas = leftCanvasRef.current;
    const rightCanvas = rightCanvasRef.current;
    if (leftCanvas) draw(leftCanvas, leftGridRef, false);
    if (rightCanvas) draw(rightCanvas, rightGridRef, true);
    animationRef.current = requestAnimationFrame(drawLoop);
  }, [draw]);

  useEffect(() => {
    const leftCanvas = leftCanvasRef.current;
    const rightCanvas = rightCanvasRef.current;
    if (!leftCanvas || !rightCanvas) return;

    const resize = () => {
      const footer = leftCanvas.closest("footer");
      if (!footer) return;

      const h = footer.offsetHeight;

      leftCanvas.width = stripWidth;
      leftCanvas.height = h;
      rightCanvas.width = stripWidth;
      rightCanvas.height = h;

      leftGridRef.current = initGrid(stripWidth, h);
      rightGridRef.current = initGrid(stripWidth, h);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    animationRef.current = requestAnimationFrame(drawLoop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initGrid, drawLoop]);

  const { displayText: sayHelloText, scramble: scrambleHello, reset: resetHello } = useScrambleText("SAY HELLO");

  return (
    <footer className="relative overflow-hidden bg-[#0a0e15] text-white">
      {/* Left pixel strip */}
      <canvas
        ref={leftCanvasRef}
        className="absolute left-0 top-0 h-full"
        style={{ width: stripWidth, display: "block" }}
      />

      {/* Right pixel strip */}
      <canvas
        ref={rightCanvasRef}
        className="absolute right-0 top-0 h-full"
        style={{ width: stripWidth, display: "block" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 min-h-75 flex flex-col justify-between">
        <div className="mb-16">
          <p className="text-sm font-mono leading-relaxed max-w-lg" style={{ color: COLOR, opacity: 0.8 }}>
            We embrace the freedom to explore innovative and unconventional ideas, 
            constantly pushing the boundaries of creativity to deliver extraordinary results.
          </p>
        </div>

        <div className="flex items-center justify-between flex-1">
          {/* Nav links - only About and Projects, stacked vertically */}
          <nav className="flex flex-col space-y-2">
            <ScrambleLink href="/about" text="About" />
            <ScrambleLink href="/projects" text="Projects" />
          </nav>

          {/* SAY HELLO button */}
          <div className="flex flex-1 items-center justify-center px-4">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center w-full max-w-lg px-20 py-10 text-4xl font-mono font-medium"
              style={{ backgroundColor: "#0a0e15", color: COLOR }}
              onMouseEnter={scrambleHello}
              onMouseLeave={resetHello}
            >
              <span className="absolute -left-1 -top-1 transition-colors duration-300" style={{ color: COLOR }}>
                <svg width="66" height="66" viewBox="0 0 16 16" fill="none"><path d="M1 6L1 1L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </span>
              <span className="absolute -right-1 -top-1 transition-colors duration-300" style={{ color: COLOR }}>
                <svg width="66" height="66" viewBox="0 0 16 16" fill="none"><path d="M15 6L15 1L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </span>
              <span className="absolute -right-1 -bottom-1 transition-colors duration-300" style={{ color: COLOR }}>
                <svg width="66" height="66" viewBox="0 0 16 16" fill="none"><path d="M15 10L15 15L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </span>
              <span className="absolute -left-1 -bottom-1 transition-colors duration-300" style={{ color: COLOR }}>
                <svg width="66" height="66" viewBox="0 0 16 16" fill="none"><path d="M1 10L1 15L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </span>

              <span className="relative h-[1.2em] overflow-hidden">
                <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full" style={{ fontFamily: "monospace", letterSpacing: "0.02em" }}>
                  {sayHelloText}
                </span>
                <span className="absolute top-full left-0 block transition-transform duration-300 ease-out group-hover:-translate-y-full" style={{ fontFamily: "monospace", letterSpacing: "0.02em" }}>
                  {sayHelloText}
                </span>
              </span>

              <span className="relative h-10 w-10 overflow-hidden ml-4">
                <span className="block transition-transform duration-300 ease-out group-hover:translate-x-full">
                  <ArrowRight className="h-10 w-10" />
                </span>
                <span className="absolute top-0 -left-full block transition-transform duration-300 ease-out group-hover:translate-x-full" style={{ color: COLOR }}>
                  <ArrowRight className="h-10 w-10" />
                </span>
              </span>
            </Link>
          </div>

          {/* Right side - Email, Phone, Social Icons */}
          <div className="flex flex-col items-end space-y-4">
            <div className="flex gap-3 justify-end items-baseline">
              <span className="text-xs font-mono uppercase tracking-wider" style={{ color: COLOR, opacity: 0.5 }}>Email</span>
              <a 
                href={`mailto:${profile.email || "hello@example.com"}`}
                className="text-sm font-mono transition-colors hover:opacity-100"
                style={{ color: COLOR, opacity: 0.8 }}
              >
                {profile.email || "hello@example.com"}
              </a>
            </div>
            <div className="flex gap-3 justify-end items-baseline">
              <span className="text-xs font-mono uppercase tracking-wider" style={{ color: COLOR, opacity: 0.5 }}>Tel</span>
              <span className="text-sm font-mono" style={{ color: COLOR, opacity: 0.8 }}>{PHONE}</span>
            </div>

            {/* Social icons row */}
            <div className="flex gap-3 justify-end pt-4">
              {socialLinks.map((link) => {
                const IconComponent = getSocialIcon(link.name);
                return (
                  <Link
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2 transition-all duration-300 hover:scale-110"
                    style={{ color: COLOR, opacity: 0.5 }}
                    title={link.name}
                  >
                    <span className="absolute -left-0.5 -top-0.5 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" style={{ color: COLOR }}>
                      <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M1 6L1 1L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </span>
                    <span className="absolute -right-0.5 -top-0.5 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" style={{ color: COLOR }}>
                      <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M15 6L15 1L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </span>
                    <span className="absolute -right-0.5 -bottom-0.5 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" style={{ color: COLOR }}>
                      <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M15 10L15 15L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </span>
                    <span className="absolute -left-0.5 -bottom-0.5 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" style={{ color: COLOR }}>
                      <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M1 10L1 15L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </span>
                    <IconComponent className="h-5 w-5" style={{ color: COLOR }} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with halftone text */}
      <div className="relative z-10" style={{ backgroundColor: "#0a0e15", borderColor: "rgba(232,232,227,0.15)" }}>
        <div className="relative mx-auto max-w-6xl" style={{ height: "clamp(180px, 21vw, 380px)" }}>
          <HalftoneTextCanvas />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-6 flex justify-center">
          <div className="text-xs font-mono" style={{ color: COLOR, opacity: 0.4 }}>
            &copy; {new Date().getFullYear()} Saeed. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}