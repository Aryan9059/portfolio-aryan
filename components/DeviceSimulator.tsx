"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Layers, Lock, Sparkles, Users, Cpu, 
  ChevronRight, Zap, Code2, Terminal 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  { name: "Aryan Srivastava", role: "Android Native", initial: "AS" },
];

const STACK = [
  { name: "Android Native", level: "98%", color: "text-cyan-400" },
];

export const DeviceSimulator = () => {
  const [locked, setLocked] = useState(true);
  const [activeTab, setActiveTab] = useState("stack");

  const sectionRef = useRef<HTMLElement | null>(null);
  const phoneShellRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.to(phoneShellRef.current, {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: sectionRef });

  const renderContent = () => {
    switch (activeTab) {
      case "stack":
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Active Projects</p>
            {[
              { title: "Phi Launcher", stats: "v2.1.0", icon: <Sparkles size={14} />, color: "bg-cyan-500" },
              { title: "Hype.pass", stats: "Encrypted", icon: <Lock size={14} />, color: "bg-white" },
              { title: "Sem Breaker", stats: "Beta", icon: <Zap size={14} />, color: "bg-indigo-500" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg ${item.color} flex items-center justify-center text-black`}>{item.icon}</div>
                  <div>
                    <p className="text-[11px] font-black text-white uppercase">{item.title}</p>
                    <p className="text-[9px] text-zinc-500 font-bold">{item.stats}</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-zinc-700" />
              </div>
            ))}
          </motion.div>
        );
      case "team":
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Developer Profile</p>
            {TEAM.map((member, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-zinc-900/30 border border-white/5">
                <div className="h-10 w-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-[10px] font-black text-white">
                  {member.initial}
                </div>
                <div>
                  <p className="text-[11px] font-black text-white uppercase">{member.name}</p>
                  <p className="text-[9px] text-cyan-500 font-bold">{member.role}</p>
                </div>
              </div>
            ))}
          </motion.div>
        );
      case "system":
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Core Frameworks</p>
            {STACK.map((tech, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase">
                  <span className="text-white">{tech.name}</span>
                  <span className={tech.color}>{tech.level}</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: tech.level }} 
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full bg-current ${tech.color}`} 
                  />
                </div>
              </div>
            ))}
          </motion.div>
        );
    }
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-32 bg-black px-6">
      <div className="relative z-10 grid items-center gap-20 lg:grid-cols-2 max-w-7xl mx-auto">
        
        <div className="space-y-10">
          <div className="sim-reveal">
            <p className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase mb-6">Internal Environment</p>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase">
              The Dev <br />
              <span className="text-zinc-800">Console.</span>
            </h2>
          </div>
          <p className="sim-reveal text-xl text-zinc-500 max-w-md font-medium">
            Explore Aryan&apos;s internal workspace. Track projects, view technical proficiency, and inspect the current build state.
          </p>
        </div>

        <div className="flex justify-center">
          <div ref={phoneShellRef} className="relative">
            <div className="relative w-[320px] sm:w-[360px] rounded-[55px] border-[12px] border-zinc-900 bg-black p-3 shadow-2xl">
              <div className="relative h-[680px] overflow-hidden rounded-[38px] bg-[#050505] ring-1 ring-white/10">
                <div className="absolute left-1/2 top-4 z-[150] h-6 w-24 -translate-x-1/2 rounded-full bg-black border border-white/5" />

                <AnimatePresence mode="wait">
                  {locked ? (
                    <motion.div key="lock" exit={{ y: -800 }} className="absolute inset-0 z-[110] flex flex-col items-center justify-between py-28 px-8">
                      <div className="text-center">
                        <div className="text-6xl font-black text-white tracking-tighter">OS/01</div>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase mt-4 tracking-[0.2em]">Aryan Portfolio Initialized</p>
                      </div>
                      <motion.button 
                        onClick={() => setLocked(false)}
                        className="w-full h-16 rounded-2xl bg-white flex items-center justify-center gap-3 text-black font-black uppercase text-xs tracking-widest hover:bg-cyan-400 transition-colors"
                      >
                        <Terminal size={16} /> Root Access
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 p-6 pt-20 flex flex-col">
                      <div className="flex items-center justify-between mb-10">
                        <div>
                          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Terminal</h3>
                          <p className="text-[9px] text-cyan-500 font-mono">Status: Connected</p>
                        </div>
                        <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center">
                           <Code2 size={18} className="text-zinc-400" />
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto no-scrollbar">
                        {renderContent()}
                      </div>

                      <div className="mt-auto h-20 rounded-[30px] bg-zinc-900/80 border border-white/5 backdrop-blur-xl flex items-center justify-around px-2">
                        {[
                          { id: "stack", icon: Layers },
                          { id: "team", icon: Users },
                          { id: "system", icon: Cpu },
                        ].map((tab) => (
                          <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${
                              activeTab === tab.id ? "bg-white text-black shadow-lg" : "text-zinc-500 hover:text-white"
                            }`}
                          >
                            <tab.icon size={20} />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
