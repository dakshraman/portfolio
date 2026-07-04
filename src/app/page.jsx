import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Experience />
      <About />
      <Skills />
      <Contact />
    </main>
  );
}
