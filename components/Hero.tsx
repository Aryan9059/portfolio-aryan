"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  SiAndroid, SiFirebase, SiFlutter,
  SiKotlin, SiReact, SiSwift,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const TECH_ICONS = [
  { Icon: SiFlutter, color: "#4FC3F7", label: "Flutter", size: 48, x: "12%", y: "20%" },
  { Icon: SiSwift, color: "#F97316", label: "SwiftUI", size: 42, x: "82%", y: "15%" },
  { Icon: SiKotlin, color: "#A78BFA", label: "Kotlin", size: 38, x: "78%", y: "75%" },
  { Icon: SiFirebase, color: "#FACC15", label: "Firebase", size: 54, x: "18%", y: "80%" },
  { Icon: SiAndroid, color: "#4ADE80", label: "Android", size: 40, x: "50%", y: "8%" },
  { Icon: SiReact, color: "#67E8F9", label: "React Native", size: 46, x: "88%", y: "50%" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".hero-reveal-text", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
    })
    .from(".hero-subtitle", {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, "-=0.6");

    iconRefs.current.forEach((icon, index) => {
      if (!icon) return;
      gsap.from(icon, { scale: 0, opacity: 0, duration: 1, delay: 0.5 + index * 0.1 });
      
      gsap.to(icon, {
        y: "random(-15, 15)",
        x: "random(-10, 10)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-black px-6"
    >
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="absolute inset-0 z-10 hidden md:block">
        {TECH_ICONS.map((item, index) => (
          <div
            key={item.label}
            ref={(el) => { iconRefs.current[index] = el; }}
            className="absolute flex items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
            style={{
              left: item.x,
              top: item.y,
              width: `${item.size}px`,
              height: `${item.size}px`,
            }}
          >
            <item.Icon size={item.size * 0.5} color={item.color} className="opacity-40" />
          </div>
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center text-center">
        <div className="overflow-hidden py-1">
          <p className="hero-reveal-text text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">
            Aryan Srivastava Portfolio
          </p>
        </div>

        <h1 className="flex flex-col text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <div className="overflow-hidden py-3"> 
             <span className="hero-reveal-text block">Designing and shipping</span>
          </div>
          <div className="overflow-hidden py-3">
             <span className="hero-reveal-text block text-zinc-400">
               mobile products with depth.
             </span>
          </div>
        </h1>

        <p className="hero-subtitle mt-6 max-w-lg text-sm leading-relaxed text-zinc-500 md:text-base">
          I build high-performance mobile experiences with a focus on
          motion, purpose, and clean production.
        </p>

        <div className="hero-subtitle mt-10 flex gap-4">
           <button className="rounded-full bg-white px-7 py-3 text-xs font-bold text-black transition-transform hover:scale-105 active:scale-95">
             View Work
           </button>
           <button className="rounded-full border border-white/10 bg-white/5 px-7 py-3 text-xs font-bold text-white transition-all hover:bg-white/10">
             Contact Aryan
           </button>
        </div>
      </div>
    </section>
  );
}
