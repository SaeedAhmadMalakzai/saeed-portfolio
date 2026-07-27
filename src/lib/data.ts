import type {
  Certification,
  Education,
  NavLink,
  Profile,
  Project,
  Skill,
  SocialLink,
} from "@/types";

export const profile: Profile = {
  name: "Saeed Ahmad Malakzai",
  shortName: "Saeed",
  title: "Full-Stack & Mobile Developer",
  bio: "Full-stack software developer with 5+ years of experience designing, building, and deploying production web, mobile, and desktop applications. Skilled in TypeScript/JavaScript (Next.js, React, Vue/Nuxt, Node.js), Python (Django, Flask, FastAPI), and Swift/SwiftUI. Experienced in real-time systems, payment and escrow integrations, database design, AI/LLM integration, and end-to-end deployment on Linux VPS and cloud platforms.",
  email: "samthedev@riseup.net",
  phone: "+93 7303 255 32",
  location: "Kabul, Afghanistan",
  githubUsername: "SaeedAhmadMalakzai",
  avatar: "/images/profile.jpg",
};

export const navLinks: NavLink[] = [
  { href: "/#about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/#process", label: "Process" },
];

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/SaeedAhmadMalakzai" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/malakzay/" },
];

export const skills: Skill[] = [
  { name: "TypeScript", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "Swift", category: "Languages" },
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Vue.js / Nuxt", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Django / Flask / FastAPI", category: "Backend" },
  { name: "PostgreSQL", category: "Databases" },
  { name: "SwiftUI", category: "Mobile" },
  { name: "Docker / Linux", category: "DevOps" },
];

export const projects: Project[] = [
  {
    slug: "kankor",
    title: "Kankor.af — University Entrance-Exam Preparation Platform",
    shortTitle: "Kankor.af\nExam Prep",
    description:
      "Trilingual (EN/PS/DA) exam-prep platform with practice, mock, and webcam-proctored exams, an animated 3D study coach, and goal tracking against real university cutoff data.",
    highlights: [
      "Built practice, mock, and webcam-proctored exams with AI face detection and focus/fullscreen violation flagging",
      "Created an animated 3D study coach with voice guidance and guided product tours, lazy-loaded and tiered for low-end devices",
      "Implemented subscription gating, gamified dashboard, study planner, leaderboard, and goal tracking against real university cutoff data",
    ],
    image: "/images/projects/kankor.jpg",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "TensorFlow.js", "Three.js", "PostgreSQL"],
    liveUrl: "https://kankor.af",
    featured: true,
    platform: "Web",
  },
  {
    slug: "hire",
    title: "Hire.af — Hiring Platform for Recruiting Top Talent",
    shortTitle: "Hire.af\nHiring Platform",
    description:
      "Two-sided hiring platform connecting top Afghan talent with employers — separate talent, employer, and admin portals with staged identity verification, milestone escrow, and dispute resolution.",
    highlights: [
      "Implemented role-based access control, OAuth and credentials auth, and private file storage served through authenticated proxies",
      "Integrated Stripe and HesabPay payments with milestone escrow and dispute resolution",
      "Completed a full security audit remediation (escrow integrity, KYC data exposure, SSRF, session revocation) plus SEO structured data and mobile/accessibility passes",
    ],
    image: "/images/projects/hire.png",
    tags: ["Next.js", "React", "TypeScript", "MongoDB", "NextAuth", "Stripe", "HesabPay"],
    featured: true,
    platform: "Web",
  },
  {
    slug: "kaar",
    title: "Kaar.af — Freelance Marketplace",
    shortTitle: "Kaar.af\nFreelance Market",
    description:
      "End-to-end freelance marketplace: phone-OTP auth, onboarding, job posting and search, proposals, contracts, and milestone escrow on a double-entry ledger.",
    highlights: [
      "Integrated HesabPay hosted checkout with signed webhooks",
      "Built real-time messaging over Server-Sent Events",
      "Approximately 40 routes across a modular monolith with Drizzle ORM, PostgreSQL, and Redis",
    ],
    image: "/images/projects/kaar.png",
    tags: ["Next.js 16", "React 19", "TypeScript", "Drizzle ORM", "PostgreSQL", "Redis", "Docker"],
    featured: true,
    platform: "Web",
  },
  {
    slug: "parly",
    title: "Parly — Language Exchange Voice Room App (iOS)",
    shortTitle: "Parly\niOS Voice Rooms",
    description:
      "Native iOS app for language exchange with live voice rooms, real-time chat, moments feed, and profiles; localized in 5 languages (EN/AR/UR/ZH/PS).",
    highlights: [
      "Implemented JWT auth with token invalidation, Socket.io messaging, LiveKit voice rooms, and follower-scoped presence",
      "Built live voice rooms, real-time chat, a moments feed, and user profiles in SwiftUI",
      "Hardened the backend after a production audit (authorization fixes, pagination, transactions)",
    ],
    image: "/images/projects/parly.jpg",
    tags: ["Swift", "SwiftUI", "LiveKit", "Socket.io", "Node.js", "PostgreSQL", "WebRTC"],
    featured: true,
    platform: "iOS",
  },
  {
    slug: "peygham",
    title: "Peygham — Real-Time Chat, Voice & Social Platform",
    shortTitle: "Peygham\nChat & Voice",
    description:
      "Real-time chat, voice, and social platform with multi-user WebRTC voice rooms, friends-gated DMs and calls, a social feed, and in-room multiplayer games.",
    highlights: [
      "Built multi-user WebRTC voice rooms with host/moderator/speaker roles, raise-hand flow, screen sharing, and a persistent overlay that keeps audio alive across navigation",
      "Added friends-gated DMs and calls, a social feed with validated image uploads, and a notification center",
      "Shipped 10 in-room multiplayer games over a generic socket relay",
    ],
    image: "/images/projects/peygham.png",
    tags: ["Python", "Flask", "Flask-SocketIO", "SQLAlchemy", "WebRTC", "TURN", "JavaScript"],
    featured: true,
    platform: "Web",
  },
  {
    slug: "afghan-scholarships",
    title: "Rahnaward — Afghan Scholarships Portal",
    shortTitle: "Rahnaward\nScholarships",
    description:
      "Trilingual (EN/FA/PS) portal that aggregates international scholarship opportunities for Afghan students through an automated Node.js ingestion pipeline.",
    highlights: [
      "Integrated 10+ data sources (WordPress REST APIs, grants.gov) with normalization and deduplication",
      "Built eligibility filtering and per-source health diagnostics",
      "Designed a trilingual UI with native RTL support",
    ],
    image: "/images/projects/rahnaward.jpg",
    tags: ["React", "Vite", "Tailwind CSS", "Material UI", "Node.js", "Express", "REST APIs"],
    featured: true,
    platform: "Web",
  },
  {
    slug: "jobpulse",
    title: "JobPulse — Job Application Automation",
    shortTitle: "JobPulse\nAutomation",
    description:
      "Desktop app that discovers relevant job postings across multiple online job portals and professional networks, and submits applications automatically.",
    highlights: [
      "Keyword filtering, email/form submission, and inbox monitoring for interview replies",
      "PySide6 desktop GUI with Playwright-driven automation",
      "Packaged as signed macOS .app/.dmg and Windows installers",
    ],
    image: "/images/projects/jobpulse.png",
    tags: ["Python", "Playwright", "PySide6", "SMTP/IMAP", "PyInstaller"],
    repoUrl: "https://github.com/SaeedAhmadMalakzai/JobPulse",
    featured: false,
    platform: "Desktop",
  },
  {
    slug: "jirga",
    title: "Jirga — Community Forum for Afghanistan",
    shortTitle: "Jirga\nCommunity Forum",
    description:
      "Reddit-style community forum: communities, threaded comments, voting, notifications, moderation queue, polls, awards, and media uploads with hardened Firestore security rules.",
    highlights: [
      "Built communities, threaded comments, voting, and a notification system",
      "Implemented a moderation queue, polls, awards, and media uploads",
      "Hardened Firebase Firestore security rules for auth, storage, and data access",
    ],
    image: "/images/projects/jirga.png",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Firebase", "Docker"],
    featured: false,
    platform: "Web",
  },
];

export const education: Education[] = [
  {
    institution: "Kardan University, Kabul",
    degree: "Bachelor of Computer Science",
    period: "Graduated 2025",
    description:
      "Final year project: enterprise network design and deployment for a fintech environment.",
  },
];

export const certifications: Certification[] = [
  { name: "Meta Backend Developer", issuer: "Coursera", date: "" },
  { name: "Meta React Native Developer", issuer: "Coursera", date: "" },
  { name: "Microsoft Gen AI Engineering", issuer: "Microsoft", date: "" },
  { name: "FastAPI & Backend Development", issuer: "Packt", date: "" },
  { name: "AWS Certified Developer Associate (course)", issuer: "Packt", date: "" },
  { name: "Cybersecurity Certification", issuer: "ISC²", date: "2026" },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(limit = 6): Project[] {
  return projects.filter((project) => project.featured).slice(0, limit);
}
