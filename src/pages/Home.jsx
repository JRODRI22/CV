import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Services from '../components/sections/Services';
import Projects from '../components/sections/Projects';
import Process from '../components/sections/Process';
import Testimonials from '../components/sections/Testimonials';
import FinalCTA from '../components/sections/FinalCTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Process />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
