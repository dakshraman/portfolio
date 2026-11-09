import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Process from '@/components/Process';
import PricingEngagements from '@/components/PricingEngagements';
import Experience from '@/components/Experience';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <Projects />
      <Services />
      <Process />
      <PricingEngagements />
      <Experience />
      <About />
      <Testimonials />
      <Blog />
      <Faq />
      <Contact />
    </>
  );
}
