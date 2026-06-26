"use client";

import { useState, useRef, useCallback, useEffect, useId } from "react";
import { motion, useMotionValue, useSpring, type Transition } from "framer-motion";

const chars = `abcdefghijklmnopqrstuvwxyz@#$%^&*()_+-=[]{}|;:'",.<>?/0123456789`.split("");

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

// ─── Real Metal Click Sound (from chanhdai.com source) ───
const metalClickSoundDataUri =
  "data:audio/mpeg;base64,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";

function useMetalClick() {
  const bufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    fetch(metalClickSoundDataUri)
      .then((r) => r.arrayBuffer())
      .then((ab) => ctx.decodeAudioData(ab))
      .then((buffer) => { bufferRef.current = buffer; })
      .catch(() => {});
  }, []);

  const play = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      source.buffer = bufferRef.current;
      if (!source.buffer) return;
      source.playbackRate.value = 1;
      gain.gain.value = 0.5;
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start(0);
    } catch {
      // Silent fail
    }
  }, []);

  return play;
}

// ─── 3D Isometric CD Logo (Exact chanhdai.com recreation) ───
function IsometricCDLogo() {
  const id = useId();
  const ids = {
    facePattern: `ncdai-face-pattern-${id}`,
    faceFill: `ncdai-face-fill-${id}`,
  };

  const transition: Transition = {
    type: "spring",
    mass: 0.5,
    damping: 18,
    stiffness: 200,
  };

  const play = useMetalClick();

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, transition);
  const rotateY = useSpring(mouseX, transition);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = ((e.clientX - centerX) / (rect.width / 2)) * 10;
    const y = ((e.clientY - centerY) / (rect.height / 2)) * -10;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // SVG path data from Figma extrude-group.svg
  const faces = [
    { d: "M71.5908 153.833L127.264 121.69V153.69L71.5908 185.833V153.833Z", delay: 0.1 },
    { d: "M127.264 121.69L113.346 113.654L71.5916 137.762L57.6728 129.726L43.7545 137.761L2 113.654V145.654L43.7545 169.761L57.6728 161.726L71.5916 169.762L113.346 145.654L127.264 153.69V121.69Z", delay: 0 },
    { d: "M2 113.654L15.9182 105.618V137.618L2 145.654V113.654Z", delay: 0.15 },
    { d: "M15.9179 105.619L2 97.583V129.583L15.9179 137.619V105.619Z", delay: 0.2 },
    { d: "M2 97.5835L57.673 65.4407L71.5909 73.4762L85.5093 65.4404L99.4272 73.4759V105.476L85.5093 97.4404L71.5909 105.476L57.673 97.4407L2 129.584V97.5835Z", delay: 0.05 },
    { d: "M99.4279 73.4756L43.7549 105.618V137.618L99.4279 105.476V73.4756Z", delay: 0.25 },
    { d: "M43.7549 105.618L57.6736 113.654L99.4284 89.5471L113.346 97.5826L127.265 89.5469L169.02 113.654V145.654L127.265 121.547L113.346 129.583L99.4284 121.547L57.6736 145.654L43.7549 137.618V105.618Z", delay: 0.1 },
    { d: "M169.02 113.654L155.102 121.69V153.69L169.02 145.654V113.654Z", delay: 0.3 },
    { d: "M155.102 121.69L169.019 129.726V161.726L155.102 153.69V121.69Z", delay: 0.35 },
    { d: "M169.019 129.726L113.346 161.868L99.4278 153.833L85.5096 161.869L71.5908 153.833V185.833L85.5096 193.869L99.4278 185.833L113.346 193.868L169.019 161.726V129.726Z", delay: 0.4 },
    { d: "M141.183 81.5111L155.101 73.4756V105.476L141.183 113.511V81.5111Z", delay: 0.45 },
    { d: "M155.101 73.4759L141.183 65.4404V97.4404L155.101 105.476V73.4759Z", delay: 0.5 },
    { d: "M141.183 65.4399L196.856 33.2969V65.2969L141.183 97.4399V65.4399Z", delay: 0.55 },
    { d: "M196.856 33.2977L182.937 25.2617L113.346 65.4402L99.4277 57.4047V89.4047L113.346 97.4402L182.937 57.2617L196.856 65.2977V33.2977Z", delay: 0.6 },
    { d: "M99.4277 57.4046L113.346 49.3691V81.3691L99.4277 89.4046V57.4046Z", delay: 0.65 },
    { d: "M113.346 49.3685L99.4277 41.333V73.333L113.346 81.3685V49.3685Z", delay: 0.7 },
    { d: "M99.4277 41.3333L169.02 1.1543L182.938 9.1898L196.856 1.1543L294.283 57.4043V89.4043L196.856 33.1543L182.938 41.1898L169.02 33.1543L99.4277 73.3333V41.3333Z", delay: 0.75 },
    { d: "M294.284 57.4043L266.447 73.4758L252.529 65.4403L238.611 73.4758V105.476L252.529 97.4403L266.447 105.476L294.284 89.4043V57.4043Z", delay: 0.8 },
    { d: "M238.611 73.4756L252.529 81.5111V113.511L238.611 105.476V73.4756Z", delay: 0.85 },
    { d: "M252.529 81.5117L210.774 105.619L196.856 97.5837L182.938 105.619L141.183 81.5117V113.512L182.938 137.619L196.856 129.584L210.774 137.619L252.529 113.512V81.5117Z", delay: 0.9 },
    { d: "M238.61 57.4046L224.692 49.3691L182.938 73.4761V105.476L224.692 81.3691L238.61 89.4046V57.4046Z", delay: 0.95 },
    { d: "M182.938 73.4758L196.855 81.5113L238.61 57.4043V89.4043L196.855 113.511L182.938 105.476V73.4758Z", delay: 1.0 },
  ];

  const silhouette =
    "M99.4282 153.833L85.51 161.869L71.5912 153.833L127.264 121.69L113.346 113.654L71.5916 137.762L57.6728 129.726L43.7545 137.761L2 113.654L15.9182 105.619L2.00035 97.5831L57.6734 65.4402L71.5913 73.4757L85.5096 65.44L99.4275 73.4755L43.7545 105.618L57.6732 113.654L99.4279 89.5472L113.346 97.5827L127.264 89.547L169.02 113.654L155.101 121.69L169.019 129.726L113.346 161.869L99.4282 153.833ZM196.856 97.5833L182.938 105.619L141.182 81.5113L155.1 73.4758L141.182 65.4403L196.856 33.2973L182.937 25.2613L113.346 65.4398L99.4279 57.4043L113.346 49.3688L99.4279 41.3333L169.02 1.1543L182.938 9.1898L196.856 1.1543L294.284 57.4043L266.447 73.4758L252.529 65.4403L238.611 73.4758L252.529 81.5113L210.774 105.619L196.856 97.5833ZM196.856 81.5113L238.61 57.4043L224.692 49.3688L182.938 73.4758L196.856 81.5113Z";

  const outline =
    "M85.7598 65.0068L99.6777 73.043L100.428 73.4756L99.6777 73.9082L44.7549 105.618L57.6729 113.077L99.1777 89.1143L99.4277 88.9697L99.6777 89.1143L113.346 97.0049L127.015 89.1143L127.265 88.9697L127.515 89.1143L169.27 113.222L170.02 113.654L169.27 114.088L156.102 121.689L169.27 129.293L170.02 129.726L169.27 130.159L113.596 162.302L113.346 162.446L113.096 162.302L99.4277 154.409L85.7598 162.302L85.5098 162.446L85.2598 162.302L71.3408 154.266L70.5908 153.833L71.3408 153.399L126.264 121.689L113.347 114.231L71.8418 138.194L71.5918 138.339L71.3418 138.194L57.6729 130.302L44.0049 138.194L43.7549 138.339L43.5049 138.194L1.75 114.087L1 113.654L1.75 113.222L14.917 105.618L1.75 98.0156L1 97.583L1.75 97.1504L57.4238 65.0068L57.6738 64.8633L57.9238 65.0068L71.5908 72.8984L85.2598 65.0068L85.5098 64.8623L85.7598 65.0068ZM197.105 0.72168L294.533 56.9717L295.283 57.4043L294.533 57.8369L266.697 73.9092L266.447 74.0527L266.197 73.9092L252.529 66.0166L239.611 73.4756L252.779 81.0781L253.529 81.5117L252.779 81.9443L211.023 106.052L210.773 106.196L210.523 106.052L196.855 98.1602L183.188 106.052L182.938 106.196L182.688 106.052L140.933 81.9443L140.183 81.5117L140.933 81.0781L154.1 73.4756L140.933 65.873L140.183 65.4404L140.933 65.0068L195.854 33.2969L182.937 25.8379L113.596 65.873L113.346 66.0176L113.096 65.873L99.1777 57.8369L98.4277 57.4043L99.1777 56.9717L112.345 49.3682L99.1777 41.7666L98.4277 41.333L99.1777 40.9004L168.77 0.72168L169.02 0.577148L169.27 0.72168L182.938 8.6123L196.605 0.72168L196.855 0.577148L197.105 0.72168ZM183.938 73.4756L196.854 80.9336L237.61 57.4043L224.692 49.9453L183.938 73.4756Z";

  return (
    <motion.figure
      className="relative w-full flex flex-col items-center justify-center cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={play}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      whileTap={{ scale: 0.96 }}
      transition={transition}
    >
      <motion.svg
        viewBox="0 0 297 195"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto relative z-10"
        style={{ maxWidth: "800px" }}
      >
        <defs>
          <pattern
            id={ids.facePattern}
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="0.8" className="text-zinc-400" />
          </pattern>
          <linearGradient id={ids.faceFill} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.03)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.01)" />
          </linearGradient>
        </defs>

        {/* Silhouette */}
        <motion.path
          d={silhouette}
          fill="#1E1E1E"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Extruded faces */}
        {faces.map((face, i) => (
          <motion.path
            key={i}
            d={face.d}
            fill={`url(#${ids.facePattern})`}
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: face.delay, ease: "easeInOut" }}
          />
        ))}

        {/* Wireframe outline */}
        <motion.path
          d={outline}
          fill="none"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* FIG_001 Label */}
      <motion.figcaption
        className="pointer-events-none mt-4 font-mono text-[10px] leading-none text-black/25 select-none tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        FIG_001
      </motion.figcaption>
    </motion.figure>
  );
}

// ─── Main Contact Section ───
export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { displayText, scramble, reset } = useScrambleText("SEND MESSAGE");

  function validateForm(formData: FormData) {
    const newErrors: Record<string, string> = {};
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!firstName || firstName.trim() === "") newErrors.firstName = "First name is required";
    if (!lastName || lastName.trim() === "") newErrors.lastName = "Last name is required";
    if (!email || email.trim() === "") newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email address";
    if (!message || message.trim() === "") newErrors.message = "Tell us more about what you need";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!validateForm(formData)) { setStatus("error"); return; }
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
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setErrors({});
      e.currentTarget.reset();
    } catch { setStatus("error"); }
  }

  return (
    <section id="contact" className="relative bg-white py-16 lg:py-20 overflow-hidden">
      {/* Full section background grid lines */}
      <svg 
        className="pointer-events-none absolute inset-0 w-full h-full" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="bg-grid" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="translate(60, 60)">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-grid)" />
      </svg>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-[0.15em]"
            style={{ fontFamily: '"Nepos Simplex Solid", "Nepos Simplex", sans-serif', color: "#000" }}
          >
            Send a message
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column — Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <input id="firstName" name="firstName" placeholder="First Name*"
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/60 transition-colors" />
                  {errors.firstName && <p className="text-xs text-[#e74c3c] mt-2">{errors.firstName}</p>}
                </div>
                <div>
                  <input id="lastName" name="lastName" placeholder="Last Name*"
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/60 transition-colors" />
                  {errors.lastName && <p className="text-xs text-[#e74c3c] mt-2">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <input id="email" name="email" type="email" placeholder="Email*"
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/60 transition-colors" />
                  {errors.email && <p className="text-xs text-[#e74c3c] mt-2">{errors.email}</p>}
                </div>
                <div>
                  <input id="company" name="company" placeholder="Company"
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/60 transition-colors" />
                </div>
              </div>

              <div>
                <select id="budget" name="budget" defaultValue=""
                  className="w-full bg-transparent border-b border-black/20 pb-3 text-sm text-black/40 focus:outline-none focus:border-black/60 transition-colors appearance-none cursor-pointer">
                  <option value="" disabled>budget range *</option>
                  <option value="< $5k">Less than $5,000</option>
                  <option value="$5k - $10k">$5,000 - $10,000</option>
                  <option value="$10k - $25k">$10,000 - $25,000</option>
                  <option value="$25k - $50k">$25,000 - $50,000</option>
                  <option value="> $50k">More than $50,000</option>
                </select>
              </div>

              <div>
                <textarea id="message" name="message" placeholder="Tell us more about what you need*" rows={4}
                  className="w-full bg-transparent border-b border-black/20 pb-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/60 transition-colors resize-none" />
                {errors.message && <p className="text-xs text-[#e74c3c] mt-2">{errors.message}</p>}
              </div>

              <div className="pt-4">
                <button type="submit" disabled={status === "loading"}
                  onMouseEnter={scramble} onMouseLeave={reset}
                  className="w-full bg-black hover:bg-black/80 text-white text-sm font-medium uppercase tracking-[0.15em] py-4 px-6 transition-colors duration-300 disabled:opacity-60">
                  <span className="relative block h-[1.2em] overflow-hidden">
                    <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full"
                      style={{ fontFamily: "monospace", letterSpacing: "0.02em" }}>
                      {status === "loading" ? "SENDING..." : displayText}
                    </span>
                    <span className="absolute top-full left-0 block transition-transform duration-300 ease-out group-hover:-translate-y-full"
                      style={{ fontFamily: "monospace", letterSpacing: "0.02em" }}>
                      {status === "loading" ? "SENDING..." : displayText}
                    </span>
                  </span>
                </button>
              </div>

              {status === "success" && <p className="text-sm text-green-600">Message sent successfully.</p>}
              {status === "error" && Object.keys(errors).length === 0 && (
                <p className="text-sm text-[#e74c3c]">Failed to send. Please try again.</p>
              )}
            </form>
          </div>

          {/* Right Column — 3D Isometric CD Logo */}
          <div className="relative hidden lg:flex items-center justify-center min-h-[250px]">
            {/* Corner bracket decorations */}
            <svg className="pointer-events-none absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
              <g stroke="rgba(0,0,0,0.12)" strokeWidth="1" fill="none">
                <path d="M40 360 L40 340 L60 340" />
                <path d="M360 360 L360 340 L340 340" />
                <path d="M40 40 L40 60 L60 60" />
                <path d="M360 40 L360 60 L340 60" />
              </g>
            </svg>

            {/* Isometric CD Logo — Bigger */}
            <div className="w-full flex items-center justify-center">
              <IsometricCDLogo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}