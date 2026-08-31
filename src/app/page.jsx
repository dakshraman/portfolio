import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Experience from '@/components/Experience';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';

const Blog = dynamic(() => import('@/components/Blog'), { loading: () => <div style={{ minHeight: '50vh' }} /> });
const Skills = dynamic(() => import('@/components/Skills'), { loading: () => <div style={{ minHeight: '30vh' }} /> });
const GitHub = dynamic(() => import('@/components/GitHub'), { loading: () => <div style={{ minHeight: '50vh' }} /> });
const Contact = dynamic(() => import('@/components/Contact'), { loading: () => <div style={{ minHeight: '30vh' }} /> });
const Faq = dynamic(() => import('@/components/Faq'), { loading: () => <div style={{ minHeight: '30vh' }} /> });

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="section-alt">
        <Highlights />
      </div>
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
