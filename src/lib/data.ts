import type {
  Certification,
  Education,
  NavLink,
  Profile,
  Project,
  Screenshot,
  Shelf,
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
  { href: "/#mobile", label: "Mobile" },
  { href: "/#web", label: "Web" },
  { href: "/#tools", label: "Tools" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
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
  { name: "Kotlin", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Vue.js / Nuxt", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Django / Flask / FastAPI", category: "Backend" },
  { name: "PostgreSQL", category: "Databases" },
  { name: "SwiftUI", category: "Mobile" },
  { name: "Jetpack Compose", category: "Mobile" },
  { name: "Docker / Linux", category: "DevOps" },
];

/** Screenshot helpers, one per capture size, so every image carries its real dimensions */
const sized = (width: number, height: number) => (src: string, alt: string): Screenshot => ({ src, alt, width, height });
const iphone = sized(600, 1304);
const android = sized(600, 1336);
const popup = sized(600, 750);
const macWindow = sized(1600, 1057);

/** Display order: mobile apps, web platforms, tools, then contributions */
export const projects: Project[] = [
  {
    slug: "24tabib",
    app: { type: "MobileApplication", operatingSystem: "Android, iOS", category: "HealthApplication" },
    title: "24Tabib — Health App for Afghanistan (Android & iOS)",
    name: "24Tabib",
    kicker: "Android · iOS · Health",
    tagline: "A health app for families in Afghanistan, in Pashto, Dari and English.",
    summary:
      "Find a doctor or hospital, see each hospital’s Ministry of Public Health grade, book a visit, reach the nearest emergency room and ask for blood donors, in Pashto, Dari and English.",
    description:
      "Health app that helps families in Afghanistan find a doctor or hospital, see each hospital's Ministry of Public Health grade, book a visit, reach the nearest emergency room and ask for blood donors, in Pashto, Dari and English. It searches 11,682 health facilities today.",
    highlights: [
      "Built native Android (Kotlin, Jetpack Compose) and iOS (SwiftUI) apps on a NestJS API with PostgreSQL and PostGIS, plus road-time routing to the nearest hospitals",
      "Designed booking on the Solar Hijri calendar, family profiles, a private health timeline and a doctor mode for confirming visits",
      "Built blood-donor requests that never reveal phone numbers: hospitals ask, nearby donors who opted in decide for themselves",
      "Added Google sign-in and private chats for blood donations and visits that keep phone numbers hidden and close on their own 24 hours later",
      "Right-to-left Pashto and Dari throughout, dark mode and large text, guarded by more than 2,300 automated tests including screenshot tests of every screen",
    ],
    image: "/images/projects/24tabib-cover-ios.jpg",
    screens: [
      iphone("/images/projects/24tabib-ios-2.1.jpg", "24Tabib home on iPhone: search, emergency room times and the next visit"),
      iphone("/images/projects/24tabib-ios-6.2.jpg", "Emergency rooms near you on a map, with the list of hospitals"),
      iphone("/images/projects/24tabib-ios-3.9.jpg", "Hospital page with its 2026 Ministry of Public Health grade"),
      iphone("/images/projects/24tabib-ios-3.1.jpg", "Find care: search and specialities"),
      iphone("/images/projects/24tabib-ios-4.4.jpg", "Visit booked, with its reference code"),
      iphone("/images/projects/24tabib-ios-7.1.jpg", "Blood Connect: find blood or become a donor"),
      iphone("/images/projects/24tabib-ios-8.3.jpg", "Private chat with a donor; phone numbers stay hidden on both sides"),
      iphone("/images/projects/24tabib-ios-10.1.jpg", "Home in Dari, right to left"),
    ],
    stage: [1, 0, 2],
    tags: ["Kotlin", "Jetpack Compose", "SwiftUI", "NestJS", "PostgreSQL", "PostGIS"],
    pageUrl: "https://24tabib.vercel.app",
    downloadUrl: "https://24tabib.vercel.app/24tabib.apk",
    downloadLabel: "Download for Android",
    status: { label: "Download · test version", tone: "download" },
    facts: [
      { label: "Platforms", value: "Android (Kotlin, Jetpack Compose) and iOS (SwiftUI)" },
      { label: "Backend", value: "NestJS API on PostgreSQL with PostGIS" },
      { label: "Scale", value: "11,682 health facilities searchable" },
    ],
    shelf: "mobile",
  },
  {
    slug: "sayhello",
    app: { type: "MobileApplication", operatingSystem: "iOS", category: "EducationalApplication" },
    title: "SayHello — Language Exchange App (iOS)",
    name: "SayHello",
    kicker: "iOS · Language exchange",
    tagline: "A language exchange app for iPhone, built around live voice rooms.",
    summary:
      "Live voice rooms, partner chats with corrections, and word games played together, in five app languages.",
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
      iphone("/images/projects/sayhello-09-welcome.jpg", "Welcome screen"),
      iphone("/images/projects/sayhello-01-speak.jpg", "Speak: live voice rooms to join"),
      iphone("/images/projects/sayhello-02-room.jpg", "Inside a live voice room: five people on stage and the chat"),
      iphone("/images/projects/sayhello-03-chats.jpg", "Chats with language partners"),
      iphone("/images/projects/sayhello-04-thread.jpg", "A chat with a correction card and a voice message"),
      iphone("/images/projects/sayhello-05-sparks.jpg", "Partner suggestions and short posts with translation"),
      iphone("/images/projects/sayhello-06-play.jpg", "Play: the daily word, quick matches and word games"),
      iphone("/images/projects/sayhello-06c-drop-four.jpg", "A Drop Four match against a partner"),
      iphone("/images/projects/sayhello-08-word-wallet.jpg", "Word Wallet: saved words with review strength"),
      iphone("/images/projects/sayhello-dark-04-thread.jpg", "Chat in dark mode"),
    ],
    stage: [1, 2, 6],
    tags: ["Swift", "SwiftUI", "SpriteKit", "WebRTC", "Socket.IO", "Node.js", "PostgreSQL"],
    pageUrl: "https://sayhello-app.vercel.app",
    status: { label: "Coming to the App Store", tone: "soon" },
    facts: [
      { label: "Platform", value: "iPhone (Swift, SwiftUI)" },
      { label: "Backend", value: "Node.js with Socket.IO and PostgreSQL" },
      { label: "App languages", value: "English, Arabic, Pashto, Urdu and Chinese" },
    ],
    shelf: "mobile",
  },
  {
    slug: "peygham",
    app: { type: "MobileApplication", operatingSystem: "Android", category: "CommunicationApplication" },
    title: "Peygham — End-to-End Encrypted Messenger (Android)",
    name: "Peygham",
    kicker: "Android · Messenger",
    tagline: "An end-to-end encrypted messenger for Android.",
    summary:
      "End-to-end encrypted chats, voice and video calls, groups and an app lock, backed by more than 1,300 automated tests.",
    description:
      "Native Android messenger with end-to-end encrypted chats, voice and video calls, an app lock and invite links.",
    highlights: [
      "Built encrypted one-to-one and group messaging with offline storage in Room and delivery over Firebase",
      "Added voice and video calls over WebRTC with a relay server for strict networks",
      "Hardened the app through a staged remediation programme: App Check, account ownership checks, lock-screen privacy and more than 1,300 automated tests",
    ],
    image: "/images/projects/peygham-cover.jpg",
    screens: [
      android("/images/projects/peygham-01-signin.jpg", "Peygham welcome screen with its three promises"),
      android("/images/projects/peygham-02-chats.jpg", "Chat list, ready for a first conversation"),
      android("/images/projects/peygham-03-privacy-applock.jpg", "Privacy settings: read receipts, app lock and screenshot blocking"),
      android("/images/projects/peygham-04-my-code.jpg", "Personal QR code for adding contacts"),
      android("/images/projects/peygham-07-signin-night.jpg", "Welcome screen in the night theme"),
      android("/images/projects/peygham-09-chats-night.jpg", "Chat list in the night theme"),
    ],
    stage: [0, 2, 3],
    tags: ["Java", "Android", "Room", "Firebase", "WebRTC", "Material 3"],
    pageUrl: "https://peygham-app.vercel.app",
    downloadUrl: "https://peygham-app.vercel.app/peygham.apk",
    downloadLabel: "Download for Android",
    status: { label: "Download", tone: "download" },
    facts: [
      { label: "Platform", value: "Android (Java, Material 3)" },
      { label: "Backend", value: "Firebase, with Room for offline storage" },
      { label: "Tests", value: "More than 1,300 automated tests" },
    ],
    shelf: "mobile",
  },
  {
    slug: "kaar",
    app: { type: "WebApplication", operatingSystem: "Web", category: "BusinessApplication" },
    title: "Kaar.af — Work Marketplace",
    name: "Kaar.af",
    kicker: "Web · Work marketplace",
    tagline: "A marketplace for freelance, contract and full-time work in Afghanistan.",
    summary:
      "Freelance, contract and full-time work in Afghanistan, with proposals, contracts and milestone payments.",
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
    status: { label: "Live · beta", tone: "live" },
    facts: [
      { label: "Built with", value: "Next.js 16, React 19 and TypeScript" },
      { label: "Data", value: "PostgreSQL with Drizzle ORM, and Redis" },
      { label: "Payments", value: "Milestones on a double-entry ledger" },
    ],
    shelf: "web",
  },
  {
    slug: "afghan-scholarships",
    app: { type: "WebApplication", operatingSystem: "Web", category: "EducationalApplication" },
    title: "Afghanistan Scholarship Portal",
    name: "Afghanistan Scholarship Portal",
    kicker: "Web · Education",
    tagline: "International scholarships for Afghan students, in English, Dari and Pashto.",
    summary:
      "International scholarships for Afghan students from more than ten sources, in English, Dari and Pashto.",
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
    status: { label: "Live", tone: "live" },
    facts: [
      { label: "Built with", value: "React, Vite and Tailwind CSS on Node.js" },
      { label: "Sources", value: "More than ten, de-duplicated" },
      { label: "Languages", value: "English, Dari and Pashto" },
    ],
    shelf: "web",
  },
  {
    slug: "ai-site-builder",
    app: { type: "WebApplication", operatingSystem: "Web", category: "DeveloperApplication" },
    title: "AI Site Builder — Describe a Website, Get the Code",
    name: "AI Site Builder",
    kicker: "Web · AI tool",
    tagline: "Describe a website in plain words and get working code back.",
    summary: "Describe a website in plain words and get a working one-page site you can preview and download.",
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
    status: { label: "Live", tone: "live" },
    facts: [
      { label: "Built with", value: "Angular 17 and TypeScript" },
      { label: "Backend", value: "Vercel Functions streaming over SSE" },
      { label: "Models", value: "Free models, with fallback when one stalls" },
    ],
    shelf: "web",
  },
  {
    slug: "find-filter-tenders",
    app: { type: "SoftwareApplication", operatingSystem: "Chrome", category: "BusinessApplication" },
    title: "Find&Filter_Tenders-Afg — Tender Finder (Chrome Extension)",
    name: "Find&Filter_Tenders-Afg",
    kicker: "Chrome extension · Tenders",
    tagline: "A Chrome extension that finds open tenders in Afghanistan and ranks them for your firm.",
    summary: "Tenders from 22 public sources, each scored 0–100 for your firm, in a fast triage inbox.",
    description:
      "Chrome extension that gathers open tenders, RFPs, consultancies and trainings in Afghanistan from 22 public sources and official APIs, ranks each notice for a consulting firm and gives you a fast triage inbox.",
    highlights: [
      "Collects notices from international bodies, the World Bank's official APIs, tender boards and nine ministries, converting Solar Hijri dates on the way",
      "Scores every notice 0–100 against your keywords, target areas and freshness, and drops expired and duplicate notices",
      "Search, filter, save, dismiss, annotate and export to CSV; everything stays in your browser, backed by 136 tests",
    ],
    image: "/images/projects/findfilter-results.jpg",
    gallery: [
      popup("/images/projects/findfilter-popup.jpg", "The popup: 177 notices, scored and sorted by best match"),
      popup("/images/projects/findfilter-popup-dark.jpg", "Results in dark mode with score, deadline and matched keywords"),
      popup("/images/projects/findfilter-scanning.jpg", "A live scan with progress for each source"),
      sized(800, 1000)("/images/projects/findfilter-options.jpg", "Settings: sources with their health from the last scan"),
    ],
    tags: ["JavaScript", "Chrome MV3", "Service Workers", "REST APIs", "node:test"],
    pageUrl: "https://find-filter-tenders-afg.vercel.app",
    downloadUrl: "https://find-filter-tenders-afg.vercel.app/find-filter-tenders-afg-4.4.1.zip",
    downloadLabel: "Download .zip",
    repoUrl: "https://github.com/SaeedAhmadMalakzai/opportunity-scanner",
    status: { label: "Download", tone: "download" },
    facts: [
      { label: "Platform", value: "Chrome extension (Manifest V3)" },
      { label: "Sources", value: "22 public sources and official APIs" },
      { label: "Privacy", value: "Everything stays in your browser" },
    ],
    shelf: "tools",
  },
  {
    slug: "jobpulse",
    app: { type: "SoftwareApplication", operatingSystem: "macOS", category: "BusinessApplication" },
    title: "JobPulse — Job Search Assistant (macOS)",
    name: "JobPulse",
    kicker: "macOS · Job search",
    tagline: "A Mac app that ranks vacancies by how well they fit your CV.",
    summary: "Ranks vacancies by CV fit, drafts a cover letter for each and keeps every application on record.",
    description:
      "Mac app that finds relevant vacancies on public job boards, ranks them by how well they fit your CV, prepares a tailored cover letter for each and keeps a clear record of every application.",
    highlights: [
      "Ranks vacancies by CV fit with your own include and exclude keywords",
      "Writes each cover letter only from facts in your CV and the posting, with a dry run to check the queue first",
      "Keeps an application history that stops duplicates, a Needs Review list and statistics, and watches your inbox for interview replies",
    ],
    image: "/images/projects/jobpulse-cover.jpg",
    gallery: [
      macWindow("/images/projects/jobpulse-statistics-light.jpg", "Statistics: applications over time and by job board (demo data)"),
      macWindow("/images/projects/jobpulse-needs-review-light.jpg", "Needs Review list of vacancies to open and apply to yourself (demo data)"),
      macWindow("/images/projects/jobpulse-home-light.jpg", "Home: run progress and counters (demo data)"),
      macWindow("/images/projects/jobpulse-statistics-dark.jpg", "Statistics in dark mode (demo data)"),
    ],
    tags: ["Swift", "SwiftUI", "Swift Charts", "Python", "Playwright", "SQLite"],
    pageUrl: "https://jobpulse-af.vercel.app",
    repoUrl: "https://github.com/SaeedAhmadMalakzai/JobPulse",
    status: { label: "Open source", tone: "source" },
    facts: [
      { label: "Platform", value: "macOS (SwiftUI, Swift Charts)" },
      { label: "Engine", value: "Python with Playwright and SQLite" },
      { label: "Code", value: "Open source on GitHub" },
    ],
    shelf: "tools",
  },
  {
    slug: "calculator-android",
    app: { type: "MobileApplication", operatingSystem: "Android", category: "UtilitiesApplication" },
    title: "Calculator_Android — Scientific Calculator",
    name: "Calculator_Android",
    kicker: "Android · Utility",
    tagline: "A scientific calculator for Android with its own expression engine.",
    summary: "Scientific calculator with its own expression engine and 33 unit tests.",
    description:
      "Scientific calculator for Android with a clean dark keypad, a collapsible scientific panel and a hand-written expression engine.",
    highlights: [
      "Wrote a tokenizer and recursive-descent evaluator with operator precedence and implicit multiplication",
      "Scientific panel with trigonometry (degrees or radians), roots, powers, logarithms, factorials and constants",
      "33 unit tests on the engine, kept separate from the interface",
    ],
    image: "/images/projects/calculator-cover.jpg",
    screens: [
      android("/images/projects/calculator-01-basic.jpg", "Basic keypad with the running expression"),
      android("/images/projects/calculator-02-scientific.jpg", "Scientific panel open: sin(30) + √16 in degrees"),
      android("/images/projects/calculator-03-result.jpg", "Factorials and powers: 5! + 2^10"),
    ],
    stage: [0, 1, 2],
    tags: ["Java", "Android", "ViewBinding", "JUnit"],
    pageUrl: "https://calculator-android.vercel.app",
    downloadUrl: "https://calculator-android.vercel.app/calculator-android.apk",
    downloadLabel: "Download for Android",
    status: { label: "Download", tone: "download" },
    facts: [
      { label: "Platform", value: "Android (Java, ViewBinding)" },
      { label: "Engine", value: "Own tokenizer and recursive-descent evaluator" },
      { label: "Tests", value: "33 unit tests on the engine" },
    ],
    shelf: "tools",
  },
  {
    slug: "appra",
    app: { type: "WebSite", operatingSystem: "Web", category: "BusinessApplication" },
    title: "Appra — Digital Agency Website",
    name: "Appra",
    kicker: "Web · Agency site",
    tagline: "Website and admin dashboard for a digital agency.",
    summary: "Secured the admin area and added featured projects for a digital agency’s website.",
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
    status: { label: "Live · contribution", tone: "live" },
    facts: [
      { label: "My role", value: "Contributor" },
      { label: "Built with", value: "Next.js 16, TypeScript and Supabase" },
    ],
    contribution: "Contributor",
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

export function getShelf(shelf: Shelf): Project[] {
  return projects.filter((project) => project.shelf === shelf);
}

/** The project after this one in display order, wrapping round to the first */
export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

/** The screens shown on a project's band and stage, in order */
export function getStageScreens(project: Project): Screenshot[] {
  const screens = project.screens ?? [];
  if (!project.stage) return screens.slice(0, 3);
  return project.stage.map((index) => screens[index]).filter(Boolean);
}
