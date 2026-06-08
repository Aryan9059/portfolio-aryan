import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import TechStack from '@/components/TechStack';
import Work from '@/components/Work';
import Contact from '@/components/Contact';

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <TechStack />
      <Work />
      <Contact />
    </main>
  );
}