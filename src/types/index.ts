export interface SocialLink {
  name: string;
  url: string;
}

export interface Skill {
  name: string;
  category: string;
}

export interface Project {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  content?: string;
  highlights?: string[];
  image?: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
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
