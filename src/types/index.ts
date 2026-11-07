export interface SocialLink {
  name: string;
  url: string;
}

export interface Skill {
  name: string;
  category: string;
}

export interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Which shelf of the home page a project sits on */
export type Shelf = "mobile" | "web" | "tools";

/** Colour of the status dot: live site, download, coming soon, open source, archived */
export type StatusTone = "live" | "download" | "soon" | "source" | "archive";

export interface ProjectStatus {
  label: string;
  tone: StatusTone;
}

export interface ProjectFact {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  /** Long title for the browser tab and search results */
  title: string;
  /** Display name, e.g. "24Tabib" */
  name: string;
  /** Platform and field, e.g. "Android · iOS · Health" */
  kicker: string;
  /** One line under the name on the project page */
  tagline: string;
  /** Two or three lines for the home page band or tile */
  summary: string;
  description: string;
  highlights?: string[];
  /** Share image (Open Graph) */
  image?: string;
  /** Tall full-page capture for the scrollable browser frame */
  fullImage?: string;
  /** Portrait phone screenshots, shown in phone frames */
  screens?: Screenshot[];
  /** Indexes into `screens` for the home band and the project page stage */
  stage?: number[];
  /** Landscape or panel screenshots (desktop windows, extension popups) */
  gallery?: Screenshot[];
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** The project's own one-page site */
  pageUrl?: string;
  /** Direct download (APK, extension .zip) */
  downloadUrl?: string;
  downloadLabel?: string;
  status: ProjectStatus;
  facts?: ProjectFact[];
  /** Omitted for contributions and archived work */
  shelf?: Shelf;
  /** Work on someone else's product */
  contribution?: string;
  /** No live site or public code at the moment */
  archived?: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Profile {
  name: string;
  shortName: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  githubUsername: string;
  avatar?: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
}

export interface NavLink {
  href: string;
  label: string;
}
