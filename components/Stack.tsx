'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import type { ComponentType } from 'react';
import { useMemo, useRef } from 'react';
import {
  SiAndroid, SiExpo, SiFigma, SiFirebase, SiFlutter, SiFramer,
  SiGraphql, SiKotlin, SiMixpanel, SiMongodb, SiNextdotjs,
  SiPostgresql, SiReact, SiRedux, SiSentry, SiSupabase,
  SiSwift, SiTailwindcss, SiTypescript,
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

type StackItem = {
  name: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  tone: string;
};

const STACK: StackItem[] = [
  { name: 'Flutter', Icon: SiFlutter, tone: 'text-sky-400' },
  { name: 'SwiftUI', Icon: SiSwift, tone: 'text-orange-400' },
  { name: 'Kotlin', Icon: SiKotlin, tone: 'text-violet-400' },
  { name: 'React Native', Icon: SiReact, tone: 'text-cyan-400' },
  { name: 'TypeScript', Icon: SiTypescript, tone: 'text-blue-400' },
  { name: 'Expo', Icon: SiExpo, tone: 'text-white' },
  { name: 'Firebase', Icon: SiFirebase, tone: 'text-amber-400' },
  { name: 'Supabase', Icon: SiSupabase, tone: 'text-emerald-400' },
  { name: 'PostgreSQL', Icon: SiPostgresql, tone: 'text-indigo-400' },
  { name: 'MongoDB', Icon: SiMongodb, tone: 'text-green-400' },
  { name: 'GraphQL', Icon: SiGraphql, tone: 'text-pink-400' },
  { name: 'Redux', Icon: SiRedux, tone: 'text-purple-400' },
  { name: 'Figma', Icon: SiFigma, tone: 'text-rose-400' },
  { name: 'Tailwind', Icon: SiTailwindcss, tone: 'text-cyan-400' },
  { name: 'Framer', Icon: SiFramer, tone: 'text-white' },
  { name: 'Mixpanel', Icon: SiMixpanel, tone: 'text-lime-400' },
  { name: 'Sentry', Icon: SiSentry, tone: 'text-zinc-300' },
  { name: 'Android', Icon: SiAndroid, tone: 'text-green-400' },
  { name: 'Next.js', Icon: SiNextdotjs, tone: 'text-white' },
];

const Stack = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rows = useMemo(() => [
    [...STACK.slice(0, 10)],
    [...STACK.slice(5, 15)],
    [...STACK.slice(10, 19)],
  ], []);

  useGSAP(() => {
    gsap.from('.stack-reveal', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

    trackRefs.current.forEach((track, index) => {
      if (!track) return;

      const isEven = index % 2 === 0;

      const marquee = gsap.fromTo(track, 
        { xPercent: isEven ? 0 : -50 },
        {
          xPercent: isEven ? -50 : 0,
          repeat: -1,
          duration: 25 + (index * 5),
          ease: 'none',
        }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const speedMultiplier = 1 + (velocity / 1500);
          gsap.to(marquee, { timeScale: speedMultiplier, duration: 0.5 });
        }
      });

      track.addEventListener('mouseenter', () => gsap.to(marquee, { timeScale: 0.2, duration: 0.5 }));
      track.addEventListener('mouseleave', () => gsap.to(marquee, { timeScale: 1, duration: 0.5 }));
    });
  }, { scope: sectionRef });

  return (
    <section id="stack" ref={sectionRef} className="relative py-32 overflow-hidden bg-black text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
        <div className="space-y-4">
          <p className="stack-reveal text-blue-400 font-mono text-xs tracking-[0.3em] uppercase">Tech Stack</p>
          <h2 className="stack-reveal text-5xl md:text-7xl font-black tracking-tighter">
            Built with the <br />
            <span className="text-zinc-600">best in class.</span>
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        {rows.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="py-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
          >
            <div 
              ref={(el) => { trackRefs.current[rowIndex] = el; }}
              className="flex w-max gap-4 px-2"
            >
              {[...row, ...row].map((item, idx) => (
                <div 
                  key={`${item.name}-${idx}`}
                  className="flex items-center gap-4 px-8 py-5 rounded-[24px] bg-zinc-900/50 border border-white/5 hover:border-white/20 transition-colors duration-300 group"
                >
                  <item.Icon className={`${item.tone} text-2xl md:text-3xl transition-transform duration-500 group-hover:scale-110`} />
                  <span className="text-lg font-bold tracking-tight whitespace-nowrap">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stack;
