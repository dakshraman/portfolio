import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import Skills from '@/components/Skills';
import GitHub from '@/components/GitHub';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="section-alt">
        <Projects />
      </div>
      <Experience />
      <div className="section-alt-purple">
        <About />
      </div>
      <Testimonials />
      <div className="section-alt">
        <Blog />
      </div>
      <Skills />
      <div className="section-alt-purple">
        <GitHub />
      </div>
      <Contact />
    </main>
  );
}
