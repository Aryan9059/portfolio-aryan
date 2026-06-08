'use client';
import { motion } from 'framer-motion';
import InfiniteMarquee from '@/components/ui/InfiniteMarquee';

const rows: { label: string; dot: string }[][] = [
  [
    { label: 'Kotlin', dot: '#7F52FF' }, { label: 'TypeScript', dot: '#3178C6' },
    { label: 'Java', dot: '#ED8B00' }, { label: 'Python', dot: '#3572A5' },
    { label: 'C / C++', dot: '#f34b7d' }, { label: 'SQL', dot: '#e38c00' },
    { label: 'JavaScript', dot: '#F7DF1E' }, { label: 'Scheme', dot: '#9B59B6' },
  ],
  [
    { label: 'Jetpack Compose', dot: '#4285F4' }, { label: 'Android SDK', dot: '#3DDC84' },
    { label: 'Spring Boot', dot: '#6DB33F' }, { label: 'Next.js', dot: '#fff' },
    { label: 'React.js', dot: '#61DAFB' }, { label: 'Retrofit', dot: '#ff6b00' },
    { label: 'FastAPI', dot: '#059669' }, { label: 'Express.js', dot: '#aaa' },
    { label: 'Tailwind CSS', dot: '#06B6D4' },
  ],
  [
    { label: 'PostgreSQL', dot: '#336791' }, { label: 'Supabase', dot: '#3ECF8E' },
    { label: 'Firebase', dot: '#FFCA28' }, { label: 'Docker', dot: '#2496ED' },
    { label: 'Apache Kafka', dot: '#ff4500' }, { label: 'Prisma', dot: '#5A67D8' },
    { label: 'Room DB', dot: '#7F52FF' }, { label: 'Git', dot: '#F05032' },
  ],
];

const concepts = ['DSA','OOP','System Design (HLD/LLD)','MVVM','REST APIs','DBMS','OS','Computer Networks','Clean Architecture'];

function FirePill({ label, dot }: { label: string; dot: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, borderColor: dot }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        padding: '8px 16px',
        background: '#0a0400',
        border: '2px solid rgba(255,100,0,0.25)',
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: '13px', fontWeight: 600, color: '#fff5e6',
        whiteSpace: 'nowrap',
        clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)',
        cursor: 'default',
        transition: 'border-color 0.2s',
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot, flexShrink: 0, boxShadow: `0 0 6px ${dot}` }} />
      {label}
    </motion.div>
  );
}

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
          <p style={{ fontSize:'14px', color:'var(--muted)', marginTop:'16px', maxWidth:'400px', lineHeight:1.7 }}>
            From Android-native to full-stack web — every tool forged in the flames of real projects.
          </p>
        </motion.div>
      </div>

      {/* Full-bleed marquee rows */}
      <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.8 }}
        style={{ display:'flex', flexDirection:'column', gap:'14px', marginBottom:'14px' }}>
        {rows.map((row, ri) => (
          <InfiniteMarquee
            key={ri}
            items={row.map(item => <FirePill key={item.label} {...item} />)}
            speed={ri===1 ? 40 : 55}
            direction={ri % 2 === 0 ? 'left' : 'right'}
            gap={10}
          />
        ))}
      </motion.div>

      {/* Core concepts */}
      <div className="container" style={{ position:'relative', zIndex:2 }}>
        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ delay:0.3 }}
          style={{ marginTop:'48px' }}
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
