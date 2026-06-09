'use client';
import { motion } from 'framer-motion';
import SkillConstellation from '@/components/SkillConstellation';

const concepts = ['DSA','OOP','System Design (HLD/LLD)','MVVM','REST APIs','DBMS','OS','Computer Networks','Clean Architecture'];

export default function TechStack() {
  return (
    <section id="tech-stack" className="section" style={{ background: 'var(--paper)', borderTop: '3px solid rgba(255,100,0,0.35)', overflow: 'hidden', position: 'relative' }}>

      {/* BG speed lines horizontal */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(0deg, rgba(255,80,0,0.025) 0px, rgba(255,80,0,0.025) 1px, transparent 1px, transparent 60px)', pointerEvents:'none' }}/>

      <div className="container" style={{ position:'relative', zIndex:2 }}>
        <motion.div className="section-label" initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
          03 — TECH STACK
        </motion.div>

        {/* Manga heading */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          style={{ marginBottom:'56px' }}
        >
          <h2 style={{ fontFamily:"'Caesar Dressing', cursive", fontSize:'clamp(36px,7vw,88px)', lineHeight:0.9, color:'#fff5e6', textShadow:'4px 4px 0 #ff4500' }}>
            MY<br/><span style={{ color:'var(--accent-2)' }}>ARSENAL</span>
          </h2>
          <p style={{ fontSize:'14px', color:'var(--muted)', marginTop:'16px', maxWidth:'420px', lineHeight:1.7 }}>
            Hover any node to reveal proficiency, projects forged with it, and its connected technologies.
          </p>
        </motion.div>

        {/* ── Skill Constellation ── */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7 }}
          style={{
            position: 'relative',
            background: 'rgba(255,69,0,0.03)',
            border: '1.5px solid rgba(255,100,0,0.18)',
            padding: '0px 24px 24px',
            marginBottom: '56px',
          }}
        >
          {/* Corner decorations */}
          <div style={{ position:'absolute', top:0, left:0, width:18, height:18, borderTop:'2px solid var(--accent)', borderLeft:'2px solid var(--accent)' }} />
          <div style={{ position:'absolute', top:0, right:0, width:18, height:18, borderTop:'2px solid var(--accent)', borderRight:'2px solid var(--accent)' }} />
          <div style={{ position:'absolute', bottom:0, left:0, width:18, height:18, borderBottom:'2px solid var(--accent)', borderLeft:'2px solid var(--accent)' }} />
          <div style={{ position:'absolute', bottom:0, right:0, width:18, height:18, borderBottom:'2px solid var(--accent)', borderRight:'2px solid var(--accent)' }} />

          <SkillConstellation />
        </motion.div>

        {/* Core concepts */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ delay:0.3 }}
        >
          <p style={{ fontFamily:"'Caesar Dressing', cursive", fontSize:'14px', color:'var(--accent-2)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'16px' }}>
            ◆ Core Concepts ◆
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'10px' }}>
            {concepts.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity:0, scale:0.8 }}
                whileInView={{ opacity:1, scale:1 }}
                viewport={{ once:true }}
                transition={{ delay:i*0.06 }}
                whileHover={{ scale:1.08, color:'var(--accent)' }}
                style={{
                  padding:'7px 14px',
                  border:'1px solid rgba(255,100,0,0.3)',
                  background:'rgba(255,69,0,0.06)',
                  fontSize:'12px', fontWeight:600,
                  color:'rgba(255,245,230,0.7)',
                  fontFamily:"'Instrument Sans', sans-serif",
                  letterSpacing:'0.05em',
                  clipPath:'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)',
                  cursor:'default',
                }}
              >
                {c}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
