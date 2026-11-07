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
  avatar: "/images/saeed-illustration.jpg",
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

const shot = (src: string, alt: string) => ({ src, alt });

export const projects: Project[] = [
  {
    slug: "sayhello",
    title: "SayHello — Language Exchange App (iOS)",
    shortTitle: "SayHello\nLanguage Exchange",
    description:
      "Native iPhone app for practising languages with real people: live voice rooms, one-to-one chats and calls, partner matching, in-room word games and a daily vocabulary habit. Available in English, Arabic, Pashto, Urdu and Chinese.",
    highlights: [
      "Built live voice rooms with up to eight speakers on stage, an open audience, raise-hand requests, host tools and shareable room links over WebRTC and Socket.IO",
      "Added Pair Up partner matching (both people see the profile first and both accept), Quick Hello, chats with voice messages and translation, and voice and video calls with report and block",
      "Designed an arcade of word and reflex games played inside rooms, run by a server-authoritative Node.js game engine with ratings and weekly leagues",
      "Protected teen accounts (13+) with age bands, and shipped Sign in with Apple, Face ID lock and 450+ backend tests",
    ],
    image: "/images/projects/sayhello-cover.jpg",
    screens: [
      shot("/images/projects/sayhello-09-welcome.jpg", "Welcome screen"),
      shot("/images/projects/sayhello-01-speak.jpg", "Speak: live voice rooms to join"),
      shot("/images/projects/sayhello-03-chats.jpg", "Chats with language partners"),
      shot("/images/projects/sayhello-04-thread.jpg", "A chat with a correction card and a voice message"),
      shot("/images/projects/sayhello-05-sparks.jpg", "Partner suggestions and short posts with translation"),
      shot("/images/projects/sayhello-06-play.jpg", "Play: the daily word, quick matches and word games"),
      shot("/images/projects/sayhello-06c-drop-four.jpg", "A Drop Four match against a partner"),
      shot("/images/projects/sayhello-08-word-wallet.jpg", "Word Wallet: saved words with review strength"),
      shot("/images/projects/sayhello-dark-04-thread.jpg", "Chat in dark mode"),
    ],
    tags: ["Swift", "SwiftUI", "SpriteKit", "WebRTC", "Socket.IO", "Node.js", "PostgreSQL"],
    pageUrl: "https://sayhello-app.vercel.app",
    availability: "Coming soon to the App Store",
    featured: true,
    platform: "iOS",
  },
  {
    slug: "24tabib",
    title: "24Tabib — Health App for Afghanistan (Android & iOS)",
    shortTitle: "24Tabib\nHealth App",
    description:
      "Health app that helps families in Afghanistan find a doctor, book a visit, reach the nearest emergency room and ask for blood donors, in Pashto, Dari and English. It searches 11,682 health facilities today.",
    highlights: [
      "Built native Android (Kotlin, Jetpack Compose) and iOS (SwiftUI) apps on a NestJS API with PostgreSQL and PostGIS, plus road-time routing to the nearest hospitals",
      "Designed booking on the Solar Hijri calendar, family profiles, a private health timeline and a doctor mode for confirming visits",
      "Built blood-donor requests that never reveal phone numbers: hospitals ask, nearby donors who opted in decide for themselves",
      "Right-to-left Pashto and Dari throughout, dark mode and large text, guarded by more than 2,300 automated tests including screenshot tests of every screen",
    ],
    image: "/images/projects/24tabib-cover.jpg",
    screens: [
      shot("/images/projects/24tabib-t24-2.1.jpg", "24Tabib home screen with search, emergency room times and the next visit"),
      shot("/images/projects/24tabib-t24-3.1.jpg", "Find care screen with specialities and recently viewed doctors"),
      shot("/images/projects/24tabib-t24-4.1.jpg", "Booking a day on the Solar Hijri calendar"),
      shot("/images/projects/24tabib-t24-7.16.jpg", "Finding blood donors nearby"),
      shot("/images/projects/24tabib-t24-10.1.jpg", "Home screen in Dari, right to left"),
      shot("/images/projects/24tabib-t24-D1.1.jpg", "Home screen in dark mode"),
    ],
    tags: ["Kotlin", "Jetpack Compose", "SwiftUI", "NestJS", "PostgreSQL", "PostGIS"],
    pageUrl: "https://24tabib.vercel.app",
    downloadUrl: "https://24tabib.vercel.app/24tabib.apk",
    downloadLabel: "Download for Android",
    featured: true,
    platform: "Android · iOS",
  },
  {
    slug: "bright-imperial-crm",
    title: "Student CRM & Admissions System — Bright Imperial",
    shortTitle: "Bright Imperial\nAdmissions CRM",
    description:
      "Management system for a Kabul study-abroad consultancy. It tracks every student from first inquiry through contract, university application, interview, deposit and embassy appointment to visa, with separate portals for the CEO, counsellors and students.",
    highlights: [
      "Built the full admissions pipeline with role-based permissions, student documents and a dashboard for each portal",
      "Hardened sign-in with per-email and per-IP throttling backed by Redis, and fails closed when the rate limiter is missing in production",
      "Guarded personal-data exports behind their own permission and neutralised spreadsheet formula injection in CSV downloads",
    ],
    image: "/images/projects/bi-mis.jpg",
    tags: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Upstash Redis", "Vitest"],
    liveUrl: "https://bright-imperial-mis.vercel.app",
    client: "Bright Imperial Educational Consultancy",
    featured: true,
    platform: "Web",
  },
  {
    slug: "galaxy-power-erp",
    title: "Galaxy Power ERP — Business System for a Solar Trading Company",
    shortTitle: "Galaxy Power\nERP",
    description:
      "Production ERP for a solar panel, battery and generator trading company in Kabul: sales, purchasing and imports, stock, finance, shareholders and reports on one double-entry ledger where every mistake is corrected with a visible reversal.",
    highlights: [
      "Built invoicing with partial and credit payments, installment plans, returns and printed invoices",
      "Implemented FIFO stock costing with good and damaged stock, serial numbers, transfers, counts and warranty claims",
      "Added multi-currency books (AFN, USD, CNY) with revaluation, month and year-end closing, profit and loss reports, Excel exports and a full audit trail",
    ],
    image: "/images/projects/erp-stock.jpg",
    gallery: [
      shot("/images/projects/erp-stock.jpg", "Stock on hand by product, location and condition (demo data)"),
      shot("/images/projects/erp-profitability.jpg", "Profitability report with revenue, cost and gross profit (demo data)"),
      shot("/images/projects/erp-sale.jpg", "A sale with its payments and stock movements (demo data)"),
    ],
    tags: ["Django", "Django REST", "React 19", "Vite", "PostgreSQL", "Celery", "Docker"],
    client: "Galaxy Power",
    featured: true,
    platform: "Web",
  },
  {
    slug: "kankorpass",
    title: "KankorPass — Kankor Preparation System",
    shortTitle: "KankorPass\nExam Prep",
    description:
      "Trilingual (English, Pashto, Dari) exam-prep platform for Afghanistan's university entrance exam, with practice, mock and proctored exams, a 3D study coach and goal tracking against real university cutoff data.",
    highlights: [
      "Built practice, mock and webcam-proctored exams with on-device face detection and focus and fullscreen checks",
      "Created an animated 3D study coach with voice guidance and guided tours, lazy-loaded and scaled down for low-end devices",
      "Implemented subscriptions, a study planner, a leaderboard and goal tracking against university cutoffs",
    ],
    image: "/images/projects/kankor.jpg",
    fullImage: "/images/projects/kankor-full.jpg",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "TensorFlow.js", "Three.js", "PostgreSQL"],
    liveUrl: "https://kankorpass.vercel.app",
    featured: true,
    platform: "Web",
  },
  {
    slug: "peygham",
    title: "Peygham — End-to-End Encrypted Messenger (Android)",
    shortTitle: "Peygham\nMessenger",
    description:
      "Native Android messenger with end-to-end encrypted chats, voice and video calls, an app lock and invite links.",
    highlights: [
      "Built encrypted one-to-one and group messaging with offline storage in Room and delivery over Firebase",
      "Added voice and video calls over WebRTC with a relay server for strict networks",
      "Hardened the app through a staged remediation programme: App Check, account ownership checks, lock-screen privacy and more than 1,300 automated tests",
    ],
    image: "/images/projects/peygham-cover.jpg",
    screens: [
      shot("/images/projects/peygham-01-signin.jpg", "Peygham welcome screen with its three promises"),
      shot("/images/projects/peygham-02-chats.jpg", "Chat list, ready for a first conversation"),
      shot("/images/projects/peygham-03-privacy-applock.jpg", "Privacy settings: read receipts, app lock and screenshot blocking"),
      shot("/images/projects/peygham-04-my-code.jpg", "Personal QR code for adding contacts"),
      shot("/images/projects/peygham-07-signin-night.jpg", "Welcome screen in the night theme"),
      shot("/images/projects/peygham-09-chats-night.jpg", "Chat list in the night theme"),
    ],
    tags: ["Java", "Android", "Room", "Firebase", "WebRTC", "Material 3"],
    pageUrl: "https://peygham-app.vercel.app",
    downloadUrl: "https://peygham-app.vercel.app/peygham.apk",
    downloadLabel: "Download for Android",
    featured: true,
    platform: "Android",
  },
  {
    slug: "bright-imperial-website",
    title: "Bright Imperial — Study Abroad Consultancy Website",
    shortTitle: "Bright Imperial\nWebsite",
    description:
      "Public website for a Kabul education consultancy that guides Afghan students to universities in Europe and Asia: destinations, a searchable university directory, scholarships and study guides.",
    highlights: [
      "Built a searchable university directory and destination guides with structured data for search engines",
      "Wrote short answer blocks for the questions students and parents ask most",
      "Shows only verified testimonials, staff and figures, filtered at the data layer",
    ],
    image: "/images/projects/bi-website.jpg",
    fullImage: "/images/projects/bi-website-full.jpg",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Playwright"],
    liveUrl: "https://brightimperial.vercel.app",
    client: "Bright Imperial Educational Consultancy",
    platform: "Web",
  },
  {
    slug: "afghan-scholarships",
    title: "Afghanistan Scholarship Portal",
    shortTitle: "Scholarship\nPortal",
    description:
      "Trilingual (English, Dari, Pashto) portal that gathers international scholarships for Afghan students through an automated ingestion pipeline.",
    highlights: [
      "Integrated 10+ data sources (WordPress REST APIs, grants.gov) with normalisation and de-duplication",
      "Built eligibility filters and per-source health checks",
      "Designed a trilingual interface with native right-to-left support",
    ],
    image: "/images/projects/scholarships.jpg",
    fullImage: "/images/projects/scholarships-full.jpg",
    tags: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "REST APIs"],
    liveUrl: "https://scholarshipsportal.netlify.app",
    platform: "Web",
  },
  {
    slug: "kaar",
    title: "Kaar.af — Work Marketplace",
    shortTitle: "Kaar.af\nWork Marketplace",
    description:
      "Marketplace for freelance, contract and full-time work in Afghanistan: phone sign-in, onboarding, job posting and search, proposals, contracts and milestone payments on a double-entry ledger.",
    highlights: [
      "Integrated hosted checkout with signed webhooks",
      "Built real-time messaging over Server-Sent Events",
      "Around 40 routes in a modular monolith with Drizzle ORM, PostgreSQL and Redis",
    ],
    image: "/images/projects/kaar.jpg",
    fullImage: "/images/projects/kaar-full.jpg",
    tags: ["Next.js 16", "React 19", "TypeScript", "Drizzle ORM", "PostgreSQL", "Redis", "Docker"],
    liveUrl: "https://kaar-af.vercel.app",
    platform: "Web",
  },
  {
    slug: "find-filter-tenders",
    title: "Find&Filter_Tenders-Afg — Tender Finder (Chrome Extension)",
    shortTitle: "Find&Filter\nTenders-Afg",
    description:
      "Chrome extension that gathers open tenders, RFPs, consultancies and trainings in Afghanistan from 22 public sources and official APIs, ranks each notice for a consulting firm and gives you a fast triage inbox.",
    highlights: [
      "Collects notices from international bodies, the World Bank's official APIs, tender boards and nine ministries, converting Solar Hijri dates on the way",
      "Scores every notice 0–100 against your keywords, target areas and freshness, and drops expired and duplicate notices",
      "Search, filter, save, dismiss, annotate and export to CSV; everything stays in your browser, backed by 136 tests",
    ],
    image: "/images/projects/findfilter-results.jpg",
    tags: ["JavaScript", "Chrome MV3", "Service Workers", "REST APIs", "node:test"],
    pageUrl: "https://find-filter-tenders-afg.vercel.app",
    downloadUrl: "https://find-filter-tenders-afg.vercel.app/find-filter-tenders-afg-4.4.1.zip",
    downloadLabel: "Download .zip",
    repoUrl: "https://github.com/SaeedAhmadMalakzai/opportunity-scanner",
    platform: "Chrome extension",
  },
  {
    slug: "jobpulse",
    title: "JobPulse — Job Search Assistant (macOS)",
    shortTitle: "JobPulse\nJob Search",
    description:
      "Mac app that finds relevant vacancies on public job boards, ranks them by how well they fit your CV, prepares a tailored cover letter for each and keeps a clear record of every application.",
    highlights: [
      "Ranks vacancies by CV fit with your own include and exclude keywords",
      "Writes each cover letter only from facts in your CV and the posting, with a dry run to check the queue first",
      "Keeps an application history that stops duplicates, a Needs Review list and statistics, and watches your inbox for interview replies",
    ],
    image: "/images/projects/jobpulse-cover.jpg",
    gallery: [
      shot("/images/projects/jobpulse-statistics-light.jpg", "Statistics: applications over time and by job board (demo data)"),
      shot("/images/projects/jobpulse-needs-review-light.jpg", "Needs Review list of vacancies to open and apply to yourself (demo data)"),
      shot("/images/projects/jobpulse-home-light.jpg", "Home: run progress and counters (demo data)"),
      shot("/images/projects/jobpulse-statistics-dark.jpg", "Statistics in dark mode (demo data)"),
    ],
    tags: ["Swift", "SwiftUI", "Swift Charts", "Python", "Playwright", "SQLite"],
    pageUrl: "https://jobpulse-af.vercel.app",
    repoUrl: "https://github.com/SaeedAhmadMalakzai/JobPulse",
    platform: "macOS",
  },
  {
    slug: "ai-site-builder",
    title: "AI Site Builder — Describe a Website, Get the Code",
    shortTitle: "AI Site\nBuilder",
    description:
      "Web app that turns a short brief into a working one-page website (HTML and CSS) you can preview live and download as a ZIP, streamed from free AI models.",
    highlights: [
      "Streams generation over Server-Sent Events from a serverless function, with keep-alive pings while reasoning models think",
      "Falls back across several models when one stalls or returns nothing, with a per-model time limit",
      "Live preview, code view and one-click ZIP download",
    ],
    image: "/images/projects/sitebuilder.jpg",
    tags: ["Angular 17", "TypeScript", "Vercel Functions", "SSE", "OpenRouter"],
    liveUrl: "https://sitebuilder-af.vercel.app",
    platform: "Web",
  },
  {
    slug: "calculator-android",
    title: "Calculator_Android — Scientific Calculator",
    shortTitle: "Calculator\nAndroid",
    description:
      "Scientific calculator for Android with a clean dark keypad, a collapsible scientific panel and a hand-written expression engine.",
    highlights: [
      "Wrote a tokenizer and recursive-descent evaluator with operator precedence and implicit multiplication",
      "Scientific panel with trigonometry (degrees or radians), roots, powers, logarithms, factorials and constants",
      "33 unit tests on the engine, kept separate from the interface",
    ],
    image: "/images/projects/calculator-cover.jpg",
    screens: [
      shot("/images/projects/calculator-01-basic.jpg", "Basic keypad with the running expression"),
      shot("/images/projects/calculator-02-scientific.jpg", "Scientific panel open: sin(30) + √16 in degrees"),
      shot("/images/projects/calculator-03-result.jpg", "Factorials and powers: 5! + 2^10"),
    ],
    tags: ["Java", "Android", "ViewBinding", "JUnit"],
    pageUrl: "https://calculator-android.vercel.app",
    downloadUrl: "https://calculator-android.vercel.app/calculator-android.apk",
    downloadLabel: "Download for Android",
    platform: "Android",
  },
  {
    slug: "hire",
    title: "Hire.af — Hiring Platform",
    shortTitle: "Hire.af\nHiring Platform",
    description:
      "Two-sided hiring platform connecting Afghan talent with employers: separate talent, employer and admin portals with staged identity checks, milestone escrow and dispute resolution.",
    highlights: [
      "Implemented role-based access, OAuth and password sign-in, and private file storage served through authenticated proxies",
      "Integrated card and local mobile-wallet payments with milestone escrow and dispute resolution",
      "Completed a full security remediation (escrow integrity, identity-data exposure, SSRF, session revocation) plus structured data and accessibility passes",
    ],
    image: "/images/projects/hire.png",
    tags: ["Next.js", "React", "TypeScript", "MongoDB", "NextAuth", "Stripe", "HesabPay"],
    platform: "Web",
  },
  {
    slug: "barya",
    title: "BARYA Consulting Services — Company Platform",
    shortTitle: "BARYA\nPlatform",
    description:
      "Multilingual website and content platform for a Kabul leadership-development firm and PMI® Authorized Training Partner, with a headless CMS and an email worker.",
    highlights: [
      "Built the site on Nuxt with a headless CMS and an Express worker for transactional email",
      "Closed webhook replay and SSRF issues, added rate limiting and lead routing that keeps personal data out of URLs",
      "Right-to-left Dari support with correct language tags for search engines",
    ],
    image: "/images/projects/barya.jpg",
    fullImage: "/images/projects/barya-full.jpg",
    tags: ["Nuxt 3", "Vue 3", "Strapi", "Express", "Amazon SES"],
    liveUrl: "https://www.barya.af",
    client: "BARYA Consulting Services",
    platform: "Web",
  },
  {
    slug: "appra",
    title: "Appra — Digital Agency Website",
    shortTitle: "Appra\nAgency Site",
    description:
      "Website and admin dashboard for a digital agency that builds software, websites and mobile apps.",
    highlights: [
      "Secured the admin area with real server-side admin checks and closed previously open admin routes",
      "Added featured projects, a responsive hero and deployment documentation",
    ],
    image: "/images/projects/appra.jpg",
    fullImage: "/images/projects/appra-full.jpg",
    tags: ["Next.js 16", "TypeScript", "Supabase", "Tailwind CSS"],
    liveUrl: "https://appra-lovat.vercel.app",
    client: "Appra (contributor)",
    platform: "Web",
  },
  {
    slug: "jirga",
    title: "Jirga — Community Forum for Afghanistan",
    shortTitle: "Jirga\nCommunity Forum",
    description:
      "Community forum with topic communities, threaded comments, voting, notifications, a moderation queue, polls, awards and media uploads, protected by hardened Firestore security rules.",
    highlights: [
      "Built communities, threaded comments, voting and notifications",
      "Implemented a moderation queue, polls, awards and media uploads",
      "Hardened Firestore security rules for sign-in, storage and data access",
    ],
    image: "/images/projects/jirga.png",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Firebase", "Docker"],
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
