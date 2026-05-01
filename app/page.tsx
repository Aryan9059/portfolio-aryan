import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Work from '@/components/Work';
import Stack from '@/components/Stack';
import Contact from '@/components/Contact';
import Marquee from '@/components/Marquee';

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Marquee inverted />
      <Work />
      <Stack />
      <Contact />
    </main>
  );
}