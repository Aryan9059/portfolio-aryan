'use client';
import { motion } from 'framer-motion';
import SpotlightCard from '@/components/ui/SpotlightCard';

const stats = [
  { value: '27K+', label: 'App Downloads', icon: '📲' },
  { value: '1.5L+', label: 'Revenue Generated', icon: '💰' },
  { value: '12+', label: 'Apps Shipped', icon: '🚀' },
  { value: '4.4★', label: 'Play Store Rating', icon: '⭐' },
];

const panelVariant = {
  hidden: { opacity: 0, scale: 0.88, rotate: -1 },
  visible: (i: number) => ({
    opacity: 1, scale: 1, rotate: 0,
    transition: { delay: i * 0.1, type: 'spring' as const, stiffness: 200, damping: 18 },
  }),
};

export default function About() {
  return (
    <section id="about" className="section" style={{ background: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>

      {/* Background halftone dots */}
      <div className="halftone" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Section label */}
        <motion.div className="section-label" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          01 — ABOUT ME
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'start' }}>

          {/* LEFT — text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -40, skewX: -3 }}
              whileInView={{ opacity: 1, x: 0, skewX: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              style={{
                fontFamily: "'Caesar Dressing', cursive",
                fontSize: 'clamp(40px, 6vw, 72px)',
                lineHeight: 0.95,
                color: '#fff5e6',
                textShadow: '3px 3px 0 #ff4500',
                marginBottom: '24px',
              }}
            >
              CRAFTING<br />
              <span style={{ color: 'var(--accent-2)', WebkitTextStroke: '1px #ff4500' }}>BLAZING</span><br />
              APPS.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '20px', marginBottom: '32px' }}
            >
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,245,230,0.75)', marginBottom: '12px' }}>
                I'm Aryan Srivastava — a mobile-first developer from IIIT Allahabad obsessed with shipping apps that feel <em style={{ color: 'var(--accent-2)', fontStyle: 'normal', fontWeight: 700 }}>alive</em>.
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,245,230,0.6)' }}>
                Every tap target, every animation curve, every loading state — I sweat the details so users feel the fire.
              </p>
            </motion.div>

            {/* Terminal code card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              style={{
                background: '#0a0400',
                border: '2px solid rgba(255,100,0,0.4)',
                borderRadius: '4px',
                overflow: 'hidden',
                fontFamily: 'monospace',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderBottom: '1px solid rgba(255,100,0,0.2)', background: 'rgba(255,60,0,0.06)' }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c }}/>)}
                <span style={{ fontSize: '11px', color: 'var(--muted)', marginLeft: '6px' }}>aryan@dev ~</span>
              </div>
              <div style={{ padding: '18px 20px', fontSize: '12px', lineHeight: 2 }}>
                {[
                  [['const','#cc99cd'], [' name','#f8c555'], [' =','#888'], [' "Aryan Srivastava"','#7ec699']],
                  [['const','#cc99cd'], [' role','#f8c555'], [' =','#888'], [' "Android Developer"','#7ec699']],
                  [['const','#cc99cd'], [' college','#f8c555'], [' =','#888'], [' "IIIT Allahabad"','#7ec699']],
                  [['const','#cc99cd'], [' openTo','#f8c555'], [' =','#888'], [' "Internships & Roles"','#7ec699']],
                ].map((row, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 + 0.4 }} style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {row.map(([t, c], j) => <span key={j} style={{ color: c as string }}>{t}</span>)}
                  </motion.div>
                ))}
                <motion.span animate={{ opacity: [1,0,1] }} transition={{ repeat: Infinity, duration: 0.9 }} style={{ color: 'var(--accent)', display: 'block', marginTop: '8px' }}>▌</motion.span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — manga stat panels */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {stats.map((s, i) => (
                <motion.div key={i} custom={i} variants={panelVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <SpotlightCard
                    spotlightColor="rgba(255,100,0,0.15)"
                    style={{
                      background: 'var(--surface-2)',
                      border: '2px solid rgba(255,80,0,0.4)',
                      borderRadius: '4px',
                      padding: '24px 20px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Corner accent */}
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', background: 'var(--accent)', clipPath: 'polygon(0 0,100% 0,100% 100%)' }} />
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icon}</div>
                    <div style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 'clamp(28px,4vw,40px)', color: 'var(--accent-2)', lineHeight: 1, marginBottom: '6px', textShadow: '2px 2px 0 rgba(255,69,0,0.3)' }}>{s.value}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.label}</div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>

            {/* Manga explosion bubble */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
              style={{
                marginTop: '24px',
                background: '#ff4500',
                border: '3px solid #fff5e6',
                borderRadius: '4px',
                padding: '16px 24px',
                textAlign: 'center',
                clipPath: 'polygon(0 8px, 8px 0, calc(100%-8px) 0, 100% 8px, 100% calc(100%-8px), calc(100%-8px) 100%, 8px 100%, 0 calc(100%-8px))',
                position: 'relative',
              }}
            >
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: '22px', color: '#fff', letterSpacing: '0.1em' }}>
                  AVAILABLE FOR HIRE  
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>Android · Full Stack · Open Source</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}