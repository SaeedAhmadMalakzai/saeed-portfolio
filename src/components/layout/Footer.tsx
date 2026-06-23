"use client";

import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";
import { profile, socialLinks } from "@/lib/data";
import { ArrowRight } from "lucide-react";

const PHONE = "+39 375 930 64 63";

// SAEED SVG with cursor-based scan animation
function SaeedLogo() {
  const svgRef = useRef<SVGSVGElement>(null);
  const maskGradientRef = useRef<SVGLinearGradientElement>(null);
  const glowGradientRef = useRef<SVGLinearGradientElement>(null);
  const mouseXRef = useRef(-500);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      // Calculate mouse position relative to SVG viewBox (0-1410)
      const scaleX = 1410 / rect.width;
      mouseXRef.current = (e.clientX - rect.left) * scaleX;
    };

    const handleMouseLeave = () => {
      mouseXRef.current = -500;
    };

    const animate = () => {
      const maskGrad = maskGradientRef.current;
      const glowGrad = glowGradientRef.current;
      if (!maskGrad || !glowGrad) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const mx = mouseXRef.current;

      // Update mask gradient position (the reveal effect)
      // The gradient moves with mouse, creating the scan effect
      const offset1 = Math.max(0, (mx - 200) / 1410);
      const offset2 = Math.max(0, mx / 1410);
      const offset3 = Math.min(1, (mx + 200) / 1410);
      const offset4 = Math.min(1, (mx + 400) / 1410);

      const stops = maskGrad.querySelectorAll("stop");
      if (stops.length >= 4) {
        stops[0].setAttribute("offset", `${offset1}`);
        stops[1].setAttribute("offset", `${offset2}`);
        stops[2].setAttribute("offset", `${offset3}`);
        stops[3].setAttribute("offset", `${offset4}`);
      }

      // Update glow gradient position
      const gOffset1 = Math.max(0, (mx - 300) / 1410);
      const gOffset2 = Math.max(0, (mx - 100) / 1410);
      const gOffset3 = Math.min(1, (mx + 100) / 1410);
      const gOffset4 = Math.min(1, (mx + 300) / 1410);

      const gStops = glowGrad.querySelectorAll("stop");
      if (gStops.length >= 4) {
        gStops[0].setAttribute("offset", `${gOffset1}`);
        gStops[1].setAttribute("offset", `${gOffset2}`);
        gStops[2].setAttribute("offset", `${gOffset3}`);
        gStops[3].setAttribute("offset", `${gOffset4}`);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    svg.addEventListener("mousemove", handleMouseMove);
    svg.addEventListener("mouseleave", handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      svg.removeEventListener("mousemove", handleMouseMove);
      svg.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="container size-full cursor-crosshair"
      viewBox="0 0 1410 258"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Base gradient - always visible faint outline */}
        <linearGradient
          id="base-grad"
          y1="1"
          x2="705"
          y2="257"
          gradientUnits="userSpaceOnUse"
          x1="705"
        >
          <stop offset="0.625" stopColor="#22c55e" stopOpacity="0.05" />
          <stop offset="1" stopColor="#22c55e" stopOpacity="0.1" />
        </linearGradient>

        {/* Mask gradient - controls which parts are revealed */}
        <linearGradient
          id="mask-grad"
          ref={maskGradientRef}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset="0" stopColor="black" stopOpacity="0" />
          <stop offset="0.3" stopColor="white" stopOpacity="1" />
          <stop offset="0.7" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="black" stopOpacity="0" />
        </linearGradient>

        {/* Glow gradient for the scan beam */}
        <linearGradient
          id="glow-grad"
          ref={glowGradientRef}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset="0" stopColor="#22c55e" stopOpacity="0" />
          <stop offset="0.35" stopColor="#4ade80" stopOpacity="0.8" />
          <stop offset="0.65" stopColor="#4ade80" stopOpacity="0.8" />
          <stop offset="1" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>

        {/* Mask definition */}
        <mask id="scan-mask">
          <rect x="0" y="0" width="1410" height="258" fill="url(#mask-grad)" />
        </mask>

        {/* Glow filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Layer 1: Faint base outline (always visible) */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M129 33H161V65H129V33ZM33 33V1H129V33H33ZM33 225H1V33H33V225ZM129 225V257H33V225H129ZM129 225V193H161V225H129ZM193 1H225V65H321V97H225V257H193V1ZM321 97H353V257H321V97ZM417 65H545V257H513V225H481V193H513V97H417V65ZM417 225H385V97H417V225ZM417 225V257H481V225H417ZM577 65H705V97H609V257H577V65ZM705 97H737V257H705V97ZM769 1H801V65H897V97H801V257H769V1ZM897 97H929V257H897V97ZM961 1H1057V33H993V225H1057V257H961V1ZM1089 193V225H1057V193H1089ZM1089 65H1121V193H1089V65ZM1089 65V33H1057V65H1089ZM1185 65H1313V257H1281V225H1249V193H1281V97H1185V65ZM1185 225H1153V97H1185V225ZM1185 225V257H1249V225H1185ZM1377 1H1409V33H1377V1Z"
        fill="url(#base-grad)"
      />
      <path
        d="M1345 65V97H1377V257H1409V65H1345Z"
        fill="url(#base-grad)"
      />
      <path
        className="stroke-green-500/10"
        d="M129 33H161V65H129V33ZM129 33V1H33V33M129 33H33M33 33H1V225H33M33 33V225M33 225V257H129V225M33 225H129M129 225V193H161V225H129ZM321 97V65H225V1H193V257H225V97H321ZM321 97H353V257H321V97ZM481 225H513V257H545V65H417V97M481 225V193H513V97H417M481 225V257H417V225M481 225H417M417 97H385V225H417M417 97V225M705 97V65H577V257H609V97H705ZM705 97H737V257H705V97ZM897 97V65H801V1H769V257H801V97H897ZM897 97H929V257H897V97ZM1057 33V1H961V257H1057V225M1057 33H993V225H1057M1057 33H1089V65M1057 33V65H1089M1057 225H1089V193M1057 225V193H1089M1089 193H1121V65H1089M1089 193V65M1249 225H1281V257H1313V65H1185V97M1249 225V193H1281V97H1185M1249 225V257H1185V225M1249 225H1185M1185 97H1153V225H1185M1185 97V225M1377 1H1409V33H1377V1ZM1345 65V97H1377V257H1409V65H1345Z"
        strokeWidth="2"
        fill="none"
      />

      {/* Layer 2: Bright revealed content (masked by cursor position) */}
      <g mask="url(#scan-mask)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M129 33H161V65H129V33ZM33 33V1H129V33H33ZM33 225H1V33H33V225ZM129 225V257H33V225H129ZM129 225V193H161V225H129ZM193 1H225V65H321V97H225V257H193V1ZM321 97H353V257H321V97ZM417 65H545V257H513V225H481V193H513V97H417V65ZM417 225H385V97H417V225ZM417 225V257H481V225H417ZM577 65H705V97H609V257H577V65ZM705 97H737V257H705V97ZM769 1H801V65H897V97H801V257H769V1ZM897 97H929V257H897V97ZM961 1H1057V33H993V225H1057V257H961V1ZM1089 193V225H1057V193H1089ZM1089 65H1121V193H1089V65ZM1089 65V33H1057V65H1089ZM1185 65H1313V257H1281V225H1249V193H1281V97H1185V65ZM1185 225H1153V97H1185V225ZM1185 225V257H1249V225H1185ZM1377 1H1409V33H1377V1Z"
          fill="url(#glow-grad)"
          filter="url(#glow)"
        />
        <path
          d="M1345 65V97H1377V257H1409V65H1345Z"
          fill="url(#glow-grad)"
          filter="url(#glow)"
        />
        <path
          className="stroke-green-400"
          d="M129 33H161V65H129V33ZM129 33V1H33V33M129 33H33M33 33H1V225H33M33 33V225M33 225V257H129V225M33 225H129M129 225V193H161V225H129ZM321 97V65H225V1H193V257H225V97H321ZM321 97H353V257H321V97ZM481 225H513V257H545V65H417V97M481 225V193H513V97H417M481 225V257H417V225M481 225H417M417 97H385V225H417M417 97V225M705 97V65H577V257H609V97H705ZM705 97H737V257H705V97ZM897 97V65H801V1H769V257H801V97H897ZM897 97H929V257H897V97ZM1057 33V1H961V257H1057V225M1057 33H993V225H1057M1057 33H1089V65M1057 33V65H1089M1057 225H1089V193M1057 225V193H1089M1089 193H1121V65H1089M1089 193V65M1249 225H1281V257H1313V65H1185V97M1249 225V193H1281V97H1185M1249 225V257H1185V225M1249 225H1185M1185 97H1153V225H1185M1185 97V225M1377 1H1409V33H1377V1ZM1345 65V97H1377V257H1409V65H1345Z"
          strokeWidth="2"
          fill="none"
        />
      </g>
    </svg>
  );
}

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
      <div className="grid-area absolute inset-x-0 top-0 h-[calc(100%-80px)]">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 min-h-75 flex flex-col justify-between pointer-events-none">
        <div className="mb-16 pointer-events-auto">
          <p className="text-sm font-mono text-zinc-300 leading-relaxed max-w-lg">
            We embrace the freedom to explore innovative and unconventional ideas, 
            constantly pushing the boundaries of creativity to deliver extraordinary results.
          </p>
        </div>

        <div className="flex items-center justify-between flex-1">
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

          <div className="flex flex-1 items-center justify-center px-4 pointer-events-auto">
            <Link
              href="/contact"
              className="group relative inline-flex items-center bg-[#0a0e15] justify-center w-full max-w-lg px-20 py-10 text-4xl font-mono font-medium text-white"
            >
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

              <span className="relative h-[1.2em] overflow-hidden">
                <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  SAY HELLO
                </span>
                <span className="absolute top-full left-0 block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  SAY HELLO
                </span>
              </span>

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

      <div className="relative z-10 bg-[#0a0e15] border-t border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col items-center">

          <div className="overflow-hidden w-full max-w-5xl mb-8">
            <SaeedLogo />
          </div>

          <div className="text-xs font-mono text-zinc-600">
            &copy; {new Date().getFullYear()} Saeed. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}