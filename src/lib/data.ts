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
  name: "Saeed",
  title: "Software Developer",
  bio: "Add your bio here.",
  email: "hello@example.com",
  location: "Your Location",
  avatar: "/images/profile.jpg",
};

export const navLinks: NavLink[] = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#education", label: "Education" },
  { href: "/#certifications", label: "Certifications" },
  { href: "/#contact", label: "Contact" },
];

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com" },
  { name: "LinkedIn", url: "https://linkedin.com" },
];

export const skills: Skill[] = [
  { name: "TypeScript", category: "Languages" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
];

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    description: "A short summary of the first project.",
    content: "Detailed description of Project One. Add your full write-up here.",
    tags: ["Next.js", "TypeScript"],
    featured: true,
  },
  {
    slug: "project-two",
    title: "Project Two",
    description: "A short summary of the second project.",
    content: "Detailed description of Project Two.",
    tags: ["React", "Node.js"],
    featured: true,
  },
  {
    slug: "project-three",
    title: "Project Three",
    description: "A short summary of the third project.",
    content: "Detailed description of Project Three.",
    tags: ["Tailwind CSS"],
    featured: true,
  },
  {
    slug: "project-four",
    title: "Project Four",
    description: "A short summary of the fourth project.",
    content: "Detailed description of Project Four.",
    tags: ["Python"],
    featured: false,
  },
];

export const education: Education[] = [
  {
    institution: "University Name",
    degree: "Degree Name",
    period: "2020 – 2024",
  },
];

export const certifications: Certification[] = [
  {
    name: "Certification Name",
    issuer: "Issuer",
    date: "2024",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(limit = 3): Project[] {
  return projects.filter((project) => project.featured).slice(0, limit);
}
