"use client";

import { motion } from "framer-motion";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiSwift,
  SiPhp,
  SiKotlin,
  SiReact,
  SiVuedotjs,
  SiAngular,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiFastapi,
  SiApple,
  SiAndroid,
  SiMysql,
  SiPostgresql,
  SiSqlite,
  SiPrisma,
  SiGit,
  SiDocker,
  SiLinux,
  SiVite,
  SiStrapi,
  SiSocketdotio,
  SiOpenai,
  SiPandas,
  SiScikitlearn,
} from "react-icons/si";
import { FaDatabase, FaServer, FaCode } from "react-icons/fa";

const skills = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Swift", icon: SiSwift, color: "#F05138" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
  { name: "SQL", icon: FaDatabase, color: "#336791" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
  { name: "Angular", icon: SiAngular, color: "#DD0031" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#000000" },
  { name: "Django", icon: SiDjango, color: "#092E20" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688" },
  { name: "REST API", icon: FaServer, color: "#FF6B6B" },
  { name: "iOS", icon: SiApple, color: "#000000" },
  { name: "Android", icon: SiAndroid, color: "#3DDC84" },
  { name: "SwiftUI", icon: SiSwift, color: "#F05138" },
  { name: "React Native", icon: SiReact, color: "#61DAFB" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "SQLite", icon: SiSqlite, color: "#003B57" },
  { name: "Prisma ORM", icon: SiPrisma, color: "#2D3748" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Linux", icon: SiLinux, color: "#FCC624" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
  { name: "Strapi CMS", icon: SiStrapi, color: "#4945FF" },
  { name: "WebSockets", icon: SiSocketdotio, color: "#010101" },
  { name: "JWT", icon: FaCode, color: "#000000" },
  { name: "Socket.io", icon: SiSocketdotio, color: "#010101" },
  { name: "Generative AI", icon: SiOpenai, color: "#412991" },
  { name: "LLM Integration", icon: SiOpenai, color: "#10A37F" },
  { name: "GPT", icon: SiOpenai, color: "#10A37F" },
  { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
  { name: "Pandas", icon: SiPandas, color: "#150458" },
  { name: "Agile", icon: FaCode, color: "#0052CC" },
  { name: "Problem Solving", icon: FaCode, color: "#FF6B6B" },
  { name: "System Integration", icon: FaServer, color: "#336791" },
];

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const rotations = {
    tl: "0deg",
    tr: "90deg",
    bl: "270deg",
    br: "180deg",
  };

  return (
    <span
      className="absolute text-black opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
      style={{
        transform: `rotate(${rotations[position]})`,
        ...(position === "tl" && { top: "-4px", left: "-4px" }),
        ...(position === "tr" && { top: "-4px", right: "-4px" }),
        ...(position === "bl" && { bottom: "-4px", left: "-4px" }),
        ...(position === "br" && { bottom: "-4px", right: "-4px" }),
      }}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path
          d="M1 6L1 1L6 1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export function Skills() {
  return (
    <section id="skills" className="bg-white py-24 text-black">
      <div className="mx-auto max-w-7xl px-6">
        {/* Title - styled like About */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-[0.15em] text-center mb-12"
          style={{
            fontFamily: '"Nepos Simplex Solid", "Nepos Simplex", sans-serif',
            color: "#000",
          }}
        >
          Skills & Technologies
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-3"
        >
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.span
                key={skill.name}
                variants={itemVariants}
                className="group relative inline-flex cursor-default items-center gap-2 px-4 py-2 text-sm font-medium text-black transition-all duration-300 hover:bg-transparent"
                style={{ backgroundColor: "#e8e8e3" }}
              >
                <CornerBracket position="tl" />
                <CornerBracket position="tr" />
                <CornerBracket position="bl" />
                <CornerBracket position="br" />
                <Icon
                  size={16}
                  className="relative z-10 flex-shrink-0"
                  style={{ color: skill.color }}
                />
                <span className="relative z-10">{skill.name}</span>
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}