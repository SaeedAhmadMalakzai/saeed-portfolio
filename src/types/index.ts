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
  description: string;
  content?: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
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
  title: string;
  bio: string;
  email: string;
  location: string;
  avatar?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavLink {
  href: string;
  label: string;
}
