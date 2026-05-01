'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import { Layout, Rocket, LineChart, Box } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      }
    });

    tl.from('.about-reveal', {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 1,
      ease: 'power4.out',
    })
    .from('.card-animate', {
      opacity: 0,
      y: 40,
      scale: 0.9,
      stagger: 0.1,
      duration: 1,
      ease: 'expo.out',
    }, "-=0.6");
  }, { scope: sectionRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.5,
      ease: "power2.out",
      overwrite: true,
    });

    const icon = card.querySelector('.card-icon');
    gsap.to(icon, {
      x: (x - centerX) / 8,
      y: (y - centerY) / 8,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });

    gsap.to(card.querySelector('.card-icon'), {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  };

  const features = [
    { title: 'Pattern Library', body: 'Studying best-in-class mobile flows to ship industry-standard UX.', icon: <Layout size={20} />, size: 'md:col-span-2' },
    { title: 'Agile Loops', body: 'Rapid iterations from prototype to production.', icon: <Rocket size={20} />, size: 'md:col-span-1' },
    { title: 'Instrumentation', body: 'Analytics baked into every single component.', icon: <LineChart size={20} />, size: 'md:col-span-1' },
    { title: 'Design Systems', body: 'A shared language across iOS, Android, and web platforms.', icon: <Box size={20} />, size: 'md:col-span-2' },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 bg-black px-6" style={{ perspective: '1200px' }}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24">
          <p className="about-reveal text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase mb-4">The Philosophy</p>
          <h2 className="about-reveal text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase">
            Development is craft. <br />
            <span className="text-zinc-800">Polish is obsession.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((card, index) => (
            <div
              key={card.title}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className={`${card.size} card-animate group relative overflow-hidden rounded-[40px] border border-white/5 bg-zinc-950 p-12 transition-colors duration-500 hover:border-zinc-700`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative z-10 flex flex-col h-full pointer-events-none">
                <div className="card-icon h-14 w-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center mb-10 text-cyan-500 shadow-2xl">
                  {card.icon}
                </div>
                
                <div style={{ transform: 'translateZ(20px)' }}>
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-zinc-500 text-lg leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {card.body}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(255,255,255,0.05)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
