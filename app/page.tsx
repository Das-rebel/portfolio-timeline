import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import Career from "@/components/Career";
import SelectedWork from "@/components/SelectedWork";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Impact />
      <Career />
      <SelectedWork />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
