"use client";

import { useState, useRef, useCallback } from "react";
import { profile } from "@/lib/data";

const chars = `abcdefghijklmnopqrstuvwxyz@#$%^&*()_+-=[]{}|;:'\",.<>?/0123456789`.split("");

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

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { displayText, scramble, reset } = useScrambleText("SEND MESSAGE");

  function validateForm(formData: FormData) {
    const newErrors: Record<string, string> = {};
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!firstName || firstName.trim() === "") {
      newErrors.firstName = "First name is required";
    }
    if (!lastName || lastName.trim() === "") {
      newErrors.lastName = "Last name is required";
    }
    if (!email || email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!message || message.trim() === "") {
      newErrors.message = "Tell us more about what you need";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!validateForm(formData)) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    const body = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      company: formData.get("company"),
      budget: formData.get("budget"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setErrors({});
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative bg-white py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-[0.15em]"
            style={{
              fontFamily: '"Nepos Simplex Solid", "Nepos Simplex", sans-serif',
              color: "#000",
            }}
          >
            Send a message
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column — Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name + Last Name */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <input
                    id="firstName"
                    name="firstName"
                    placeholder="First Name*"
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/60 transition-colors"
                  />
                  {errors.firstName && (
                    <p className="text-xs text-[#e74c3c] mt-2">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <input
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name*"
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/60 transition-colors"
                  />
                  {errors.lastName && (
                    <p className="text-xs text-[#e74c3c] mt-2">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email + Company */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email*"
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/60 transition-colors"
                  />
                  {errors.email && (
                    <p className="text-xs text-[#e74c3c] mt-2">{errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    id="company"
                    name="company"
                    placeholder="Company"
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/60 transition-colors"
                  />
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <select
                  id="budget"
                  name="budget"
                  defaultValue=""
                  className="w-full bg-transparent border-b border-black/20 pb-3 text-sm text-black/40 focus:outline-none focus:border-black/60 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    budget range *
                  </option>
                  <option value="< $5k">Less than $5,000</option>
                  <option value="$5k - $10k">$5,000 - $10,000</option>
                  <option value="$10k - $25k">$10,000 - $25,000</option>
                  <option value="$25k - $50k">$25,000 - $50,000</option>
                  <option value="> $50k">More than $50,000</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about what you need*"
                  rows={4}
                  className="w-full bg-transparent border-b border-black/20 pb-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/60 transition-colors resize-none"
                />
                {errors.message && (
                  <p className="text-xs text-[#e74c3c] mt-2">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  onMouseEnter={scramble}
                  onMouseLeave={reset}
                  className="w-full bg-black hover:bg-black/80 text-white text-sm font-medium uppercase tracking-[0.15em] py-4 px-6 transition-colors duration-300 disabled:opacity-60"
                >
                  <span className="relative block h-[1.2em] overflow-hidden">
                    <span
                      className="block transition-transform duration-300 ease-out group-hover:-translate-y-full"
                      style={{ fontFamily: "monospace", letterSpacing: "0.02em" }}
                    >
                      {status === "loading" ? "SENDING..." : displayText}
                    </span>
                    <span
                      className="absolute top-full left-0 block transition-transform duration-300 ease-out group-hover:-translate-y-full"
                      style={{ fontFamily: "monospace", letterSpacing: "0.02em" }}
                    >
                      {status === "loading" ? "SENDING..." : displayText}
                    </span>
                  </span>
                </button>
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <p className="text-sm text-green-600">Message sent successfully.</p>
              )}
              {status === "error" && Object.keys(errors).length === 0 && (
                <p className="text-sm text-[#e74c3c]">
                  Failed to send. Please try again.
                </p>
              )}
            </form>
          </div>

          {/* Right Column — chanhdai.com Style 3D Pixel Logo */}
          <div className="relative hidden lg:flex items-center justify-center min-h-[400px]">
            {/* Subtle grid lines background */}
            <svg
              className="pointer-events-none absolute inset-0 w-full h-full"
              viewBox="0 0 400 400"
              fill="none"
            >
              <g stroke="rgba(0,0,0,0.06)" strokeWidth="0.5">
                <line x1="0" y1="200" x2="400" y2="200" />
                <line x1="200" y1="0" x2="200" y2="400" />
                <line x1="0" y1="0" x2="400" y2="400" />
                <line x1="400" y1="0" x2="0" y2="400" />
              </g>
            </svg>

            {/* 3D Cube with Pixel SA Logo */}
            <div className="cube-container">
              <div className="cube">
                {/* Front face — Pixel S */}
                <div className="cube-face cube-front">
                  <svg
                    viewBox="0 0 64 64"
                    className="w-12 h-12"
                    fill="currentColor"
                  >
                    <rect x="8" y="4" width="48" height="12" />
                    <rect x="8" y="4" width="12" height="28" />
                    <rect x="8" y="20" width="48" height="12" />
                    <rect x="44" y="20" width="12" height="28" />
                    <rect x="8" y="36" width="48" height="12" />
                    <rect x="8" y="36" width="12" height="24" />
                    <rect x="8" y="48" width="48" height="12" />
                  </svg>
                </div>

                {/* Back face — Pixel A */}
                <div className="cube-face cube-back">
                  <svg
                    viewBox="0 0 64 64"
                    className="w-12 h-12"
                    fill="currentColor"
                  >
                    <rect x="24" y="4" width="16" height="12" />
                    <rect x="16" y="16" width="12" height="12" />
                    <rect x="36" y="16" width="12" height="12" />
                    <rect x="8" y="28" width="48" height="12" />
                    <rect x="8" y="40" width="12" height="20" />
                    <rect x="44" y="40" width="12" height="20" />
                  </svg>
                </div>

                {/* Right face */}
                <div className="cube-face cube-right" />

                {/* Left face */}
                <div className="cube-face cube-left" />

                {/* Top face */}
                <div className="cube-face cube-top" />

                {/* Bottom face */}
                <div className="cube-face cube-bottom" />
              </div>
            </div>

            {/* Corner bracket decorations */}
            <svg
              className="pointer-events-none absolute inset-0 w-full h-full"
              viewBox="0 0 400 400"
              fill="none"
            >
              <g stroke="rgba(0,0,0,0.15)" strokeWidth="1" fill="none">
                <path d="M40 360 L40 340 L60 340" />
                <path d="M360 360 L360 340 L340 340" />
                <path d="M40 40 L40 60 L60 60" />
                <path d="M360 40 L360 60 L340 60" />
              </g>
            </svg>

            {/* FIG_001 label */}
            <div className="absolute bottom-6 right-6">
              <span className="text-[10px] font-mono text-black/25 tracking-[0.15em]">
                FIG_001
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cube-container {
          perspective: 800px;
          width: 120px;
          height: 120px;
        }

        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateCube 12s linear infinite;
        }

        .cube-face {
          position: absolute;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: hidden;
        }

        .cube-front {
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(0, 0, 0, 0.12);
          color: #000;
          transform: translateZ(60px);
        }

        .cube-back {
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(0, 0, 0, 0.12);
          color: #000;
          transform: rotateY(180deg) translateZ(60px);
        }

        .cube-right {
          background: rgba(0, 0, 0, 0.01);
          border: 1px solid rgba(0, 0, 0, 0.06);
          transform: rotateY(90deg) translateZ(60px);
        }

        .cube-left {
          background: rgba(0, 0, 0, 0.01);
          border: 1px solid rgba(0, 0, 0, 0.06);
          transform: rotateY(-90deg) translateZ(60px);
        }

        .cube-top {
          background: rgba(0, 0, 0, 0.01);
          border: 1px solid rgba(0, 0, 0, 0.06);
          transform: rotateX(90deg) translateZ(60px);
        }

        .cube-bottom {
          background: rgba(0, 0, 0, 0.01);
          border: 1px solid rgba(0, 0, 0, 0.06);
          transform: rotateX(-90deg) translateZ(60px);
        }

        @keyframes rotateCube {
          from {
            transform: rotateX(-20deg) rotateY(0deg);
          }
          to {
            transform: rotateX(-20deg) rotateY(360deg);
          }
        }
      `}</style>
    </section>
  );
}