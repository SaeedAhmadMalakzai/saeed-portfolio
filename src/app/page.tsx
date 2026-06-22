import { About } from "@/components/sections/About";
import Services from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Process } from "@/components/sections/Process";
import { Hero } from "@/components/sections/Hero";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { Skills } from "@/components/sections/Skills";
// import Bg from "@/components/sections/Bg";

export default function Home() {
  return (
    <main className="mx-auto ">
      <Hero />
      <About />
      <Skills />
      <ProjectsPreview />
      <Services />
      <Process />
      
      <Contact />
      {/* <Bg/> */}
    </main>
  );
}
