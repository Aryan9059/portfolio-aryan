'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const screens = [
  {
    id: 1,
    title: 'Phi Launcher',
    tag: 'Home Launcher',
    description: 'Minimal. Focused. Elegant',
    image: '/icons/phi_launcher.png',
    glow: 'bg-cyan-500/20',
  },

  {
    id: 2,
    title: 'Hype.pass',
    tag: 'Security',
    description: "Passwords. Made. Secure",
    image: '/icons/hypepass.png',
    glow: 'bg-amber-500/20',
  },
  
  {
    id: 3,
    title: 'Huddle',
    tag: 'Management',
    description: 'Tasks done right',
    image: '/icons/huddle.png',
    glow: 'bg-indigo-500/20',
  },
];

const Showcase = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power4.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="showcase" ref={sectionRef} className="relative overflow-hidden py-32 bg-black px-6">
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
            <Smartphone size={12} className="text-cyan-400" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Production Gallery</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Refined <br />
            <span className="text-white/20">Mobile Flows.</span>
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {screens.map((screen, index) => (
          <div
            key={screen.id}
            ref={(el) => { if (el) cardsRef.current[index] = el; }}
            className="group relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900 transition-all duration-500 group-hover:border-white/30 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]">
              <div className="absolute inset-0 z-0">
                <div className={`absolute inset-0 bg-gradient-to-br ${screen.glow} opacity-20`} />
                <Image
                  src={screen.image}
                  alt={screen.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white/60">
                    {screen.tag}
                  </span>
                  <div className="h-10 w-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight size={20} className="text-white" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {screen.title}
                  </h3>
                  <p className="text-sm text-white/50 line-clamp-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                    {screen.description}
                  </p>
                </div>
              </div>

              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-2 border-white/20 rounded-[32px]`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Showcase;
