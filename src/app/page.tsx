import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Hero } from "@/components/sections/Hero";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6">
      <Hero />
      <About />
      <Skills />
      <ProjectsPreview />
      <Education />
      <Certifications />
      <Contact />
    </main>
  );
}
