import Image from "next/image";
import { profile } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section id="hero" className="py-20 text-center">
      {profile.avatar && (
        <Image
          src={profile.avatar}
          alt={profile.name}
          width={120}
          height={120}
          className="mx-auto rounded-full object-cover"
          priority
        />
      )}
      <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
        {profile.name}
      </h1>
      <p className="mt-4 text-xl text-zinc-600">{profile.title}</p>
      <p className="mx-auto mt-6 max-w-2xl text-zinc-700">{profile.bio}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a href="#projects">
          <Button>View Projects</Button>
        </a>
        <a href="#contact">
          <Button variant="outline">Contact Me</Button>
        </a>
      </div>
    </section>
  );
}
