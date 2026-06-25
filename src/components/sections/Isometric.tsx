"use client";

import { useId, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * 3D Isometric CD Logo
 * Based on Figma extrude-group.svg export
 * Animations: draw-on reveal, 3D tilt on hover, floating idle, ambient particles
 */
export function Isometric() {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = {
    type: "spring" as const,
    mass: 0.5,
    damping: 18,
    stiffness: 200,
  };

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, springConfig);
  const rotateY = useSpring(mouseX, springConfig);
  const scale = useSpring(isHovered ? 1.03 : 1, springConfig);

  // Floating animation
  const floatY = useMotionValue(0);

  useEffect(() => {
    let startTime = Date.now();
    let animationId: number;

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      floatY.set(Math.sin(elapsed * 0.6) * 6);
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = ((e.clientX - centerX) / (rect.width / 2)) * 12;
    const y = ((e.clientY - centerY) / (rect.height / 2)) * -12;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // All extruded faces from your Figma SVG
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
      ref={containerRef}
      className="relative w-full h-full min-h-[300px] sm:min-h-[400px] flex items-center justify-center cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <motion.svg
        viewBox="0 0 297 195"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[500px] h-auto"
        style={{ y: floatY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <defs>
          {/* Diagonal hatching pattern */}
          <pattern
            id={`hatch-${id}`}
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="6"
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="0.7"
            />
          </pattern>
        </defs>

        {/* Silhouette (black fill behind) */}
        <motion.path
          d={silhouette}
          fill="#1E1E1E"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Extruded faces with hatching */}
        {faces.map((face, i) => (
          <motion.path
            key={i}
            d={face.d}
            fill={`url(#hatch-${id})`}
            fillOpacity={0.3}
            stroke="rgba(0,0,0,0.4)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, opacity: 1, fillOpacity: 0.3 }}
            transition={{
              duration: 1.2,
              delay: face.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Outlines (wireframe) */}
        <motion.path
          d={outline}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />

        {/* Ambient particles */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={`p-${i}`}
            cx={50 + i * 50}
            cy={30 + (i % 2) * 40}
            r="1"
            fill="rgba(255,255,255,0.3)"
            animate={{
              opacity: [0, 0.5, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>

      {/* FIG_001 Label */}
      <motion.figcaption
        className="pointer-events-none absolute right-2 bottom-2 sm:right-6 sm:bottom-6 font-mono text-[10px] sm:text-xs leading-none text-zinc-600 select-none tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        FIG_001
      </motion.figcaption>

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.figure>
  );
}