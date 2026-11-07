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
}

export interface Project {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  content?: string;
  highlights?: string[];
  image?: string;
  /** Tall full-page capture used by the scrollable screenshot viewer */
  fullImage?: string;
  /** Portrait phone screenshots, shown in device frames */
  screens?: Screenshot[];
  /** Extra landscape screenshots (desktop app windows, dashboards) */
  gallery?: Screenshot[];
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** The project's own one-page site */
  pageUrl?: string;
  /** Direct download (APK, extension .zip) */
  downloadUrl?: string;
  downloadLabel?: string;
  /** Store status shown when there is no download yet */
  availability?: string;
  /** Who the work was for, when it was client work */
  client?: string;
  featured?: boolean;
  platform?: string;
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
