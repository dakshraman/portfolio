import Hero3D from './components/Hero3D';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <Hero3D />
      <div style={{ position: 'relative', zIndex: 10, background: 'var(--bg-main)' }}>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </>
  );
}

export default App;
