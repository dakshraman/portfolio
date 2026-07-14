import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Experience from '@/components/Experience';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import Skills from '@/components/Skills';
import GitHub from '@/components/GitHub';
import Contact from '@/components/Contact';
import Faq from '@/components/Faq';

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="section-alt">
        <Projects />
      </div>
      <div className="section-alt-purple">
        <Services />
      </div>
      <Experience />
      <div className="section-alt">
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
      <Faq />
      <Contact />
    </main>
  );
}
