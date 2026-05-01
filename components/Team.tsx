'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  {
    id: 1,
    name: "Aryan Srivastava",
    role: "Android Native Developer",
    image: "/icons/aryan.png",
    bio: "Most judgmental person in the college. Greatest android developer of all time.",
  },
];

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".team-reveal", {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    gsap.from(".member-card", {
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".team-grid",
        start: "top 85%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-black py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <p className="team-reveal text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase mb-6">Profile</p>
            <h2 className="team-reveal text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase">
              MEET <br />
              <span className="text-zinc-800">ARYAN.</span>
            </h2>
          </div>
          <p className="team-reveal text-zinc-500 text-lg max-w-xs font-medium leading-relaxed pb-2">
            A developer focused on shipping polished, high-performance mobile experiences.
          </p>
        </div>

        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <div 
              key={member.id} 
              className="member-card group relative aspect-[3/4] overflow-hidden rounded-[32px] bg-zinc-900 border border-white/5"
            >
              <div className="absolute inset-0 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                <p className="text-cyan-400 font-mono text-[10px] tracking-widest uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {member.role}
                </p>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                  {member.name}
                </h3>
                <div className="h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:h-16 group-hover:opacity-100">
                  <p className="text-sm text-zinc-400 leading-snug mb-4">
                    {member.bio}
                  </p>
                </div>

                <div className="flex gap-4 pt-2 border-t border-white/10 mt-2 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                  <Link href="https://github.com/Aryan9059">
                  <Github size={16} className="text-white hover:text-cyan-400 cursor-pointer" />
                    </Link>
                  <Link href="https://x.com/cute__flame">
                   <Twitter size={16} className="text-white hover:text-cyan-400 cursor-pointer" /></Link>
                   <Link href="https://www.linkedin.com/in/aryan-srivastava9059/">
                   <Linkedin size={16} className="text-white hover:text-cyan-400 cursor-pointer" />
                   </Link>
                 
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
