'use client';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import TiltCard from '@/components/ui/TiltCard';
import SpotlightCard from '@/components/ui/SpotlightCard';

const experiences = [
  {
    type: 'work', index: '01',
    role: 'Android Developer Intern',
    company: 'Bitance Labs', location: 'Remote',
    date: 'Mar 2025 – Nov 2025',
    points: [
      'Built Nexus ID — a production crypto wallet Android app — using Kotlin & MVVM. Team of 4+.',
      'Integrated Spring Boot REST APIs & Web3 via Retrofit + Gson. Led UX design ideation.',
    ],
    skills: ['Kotlin','Android XML','MVVM','Retrofit','Gson','Spring Boot','Web3'],
    accent: '#ff4500', glow: 'rgba(255,69,0,0.2)',
  },
  {
    type: 'por', index: '02',
    role: 'Coordinator, App Dev Wing',
    company: 'Geekhaven, IIIT Allahabad', location: 'On-site',
    date: 'Aug 2025 – Present',
    points: ['Managing app dev initiatives, workshops & mentoring junior developers.'],
    skills: ['Leadership','Management','Mentorship'],
    accent: '#ff6b00', glow: 'rgba(255,107,0,0.2)',
  },
  {
    type: 'por', index: '03',
    role: 'Executive, App Dev Wing',
    company: 'Club of Professionals, IIIT Allahabad', location: 'On-site',
    date: 'Sep 2025 – Present',
    points: ['Organizing technical events & executing strategies for club members\' professional growth.'],
    skills: ['Event Organization','Strategy','Execution'],
    accent: '#ffaa00', glow: 'rgba(255,170,0,0.2)',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section" style={{ background: 'var(--surface)', borderTop: '3px solid rgba(255,100,0,0.35)', position: 'relative', overflow: 'hidden' }}>

      {/* Manga panel BG lines */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,80,0,0.03) 0px, rgba(255,80,0,0.03) 1px, transparent 1px, transparent 80px)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        <motion.div className="section-label" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          02 — EXPERIENCE & RESPONSIBILITIES
        </motion.div>

        {/* Big chapter heading */}
        <motion.div
          initial={{ opacity: 0, y: 30, skewX: -2 }}
          whileInView={{ opacity: 1, y: 0, skewX: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '60px' }}
        >
          <h2 style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 'clamp(36px,7vw,88px)', lineHeight: 0.9, color: '#fff5e6', textShadow: '4px 4px 0 #ff4500' }}>
            BATTLE<br/><span style={{ color: 'var(--accent-2)' }}>RECORDS</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {experiences.map((exp, i) => (

            
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40, rotate: -0.5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.12, type: 'spring', stiffness: 180 }}
            >
              <TiltCard tiltStrength={5} glareOpacity={0.06} style={{ borderRadius: '0px' }}>
                <SpotlightCard spotlightColor={exp.glow} style={{ background: '#0a0400', border: `2px solid ${exp.accent}55`, padding: 'clamp(20px,4vw,36px)', position: 'relative', overflow: 'hidden' }}>

              

                  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '20px', alignItems: 'start', marginTop: '28px' }}>
                    {/* Accent bar */}
                    <div style={{ width: '4px', background: `linear-gradient(to bottom, ${exp.accent}, transparent)`, alignSelf: 'stretch', borderRadius: '2px', minHeight: '60px', flexShrink: 0 }} />

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                        <h3 style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 'clamp(18px,3vw,26px)', color: '#fff5e6', textShadow: `1px 1px 0 ${exp.accent}` }}>{exp.role}</h3>
                        <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '12px', color: exp.accent, border: `1px solid ${exp.accent}55`, padding: '3px 10px', borderRadius: '2px', whiteSpace: 'nowrap' }}>{exp.date}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '14px', fontWeight: 600 }}>{exp.company} · {exp.location}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                        {exp.points.map((pt, j) => (
                          <div key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <span style={{ color: exp.accent, fontSize: '8px', marginTop: '6px', flexShrink: 0 }}>◆</span>
                            <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,245,230,0.65)', margin: 0 }}>{pt}</p>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {exp.skills.map(s => (
                          <Badge key={s} variant="outline" style={{ fontSize: '11px', padding: '3px 10px', borderColor: `${exp.accent}50`, color: exp.accent, fontFamily: "'Instrument Sans', sans-serif", borderRadius: '2px' }}>{s}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
