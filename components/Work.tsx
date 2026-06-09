'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { featuredProjects } from '@/lib/projects';

const projects = featuredProjects;




/* ─── Per-card tilt wrapper with shared state for logo parallax ─────── */
function ProjectCard({ p, i }: { p: typeof projects[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, active: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -5;
    const ry = ((x - rect.width  / 2) / (rect.width  / 2)) *  5;
    setTilt({ rx, ry, active: true });
  };

  const onLeave = () => setTilt({ rx: 0, ry: 0, active: false });

  const cardTransform = tilt.active
    ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.02,1.02,1.02)`
    : 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';

  // Logo floats ~2× as much as the card tilt to give z-depth parallax
  const logoTransform = tilt.active
    ? `translateX(${tilt.ry * 4}px) translateY(${tilt.rx * -4}px) scale(1.06)`
    : 'translateX(0px) translateY(0px) scale(1)';

  return (
    <motion.div
      initial={{ opacity:0, y:40, rotate: i % 2 === 0 ? -0.5 : 0.5 }}
      whileInView={{ opacity:1, y:0, rotate:0 }}
      viewport={{ once:true, margin:'-60px' }}
      transition={{ delay: i * 0.12, type:'spring', stiffness:160 }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transform: cardTransform,
          transition: 'transform 0.18s ease',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          position: 'relative',
        }}
      >
        <SpotlightCard
          spotlightColor={`${p.accent}15`}
          style={{ background:'#0a0400', border:`2px solid ${p.accent}40`, position:'relative', overflow:'hidden' }}
        >
          {/* Glare */}
          <div style={{
            position:'absolute', inset:0, pointerEvents:'none', zIndex:10,
            opacity: tilt.active ? 0.08 : 0,
            transition: 'opacity 0.3s',
            background: `radial-gradient(circle at ${50 + tilt.ry * 5}% ${50 - tilt.rx * 5}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
          }} />

          {/* Chapter number watermark */}
          <div style={{ position:'absolute', top:0, right:0, fontFamily:"'Bangers', cursive", fontSize:'100px', color:`${p.accent}10`, lineHeight:1, userSelect:'none', pointerEvents:'none' }}>{p.index}</div>

          {/* Top accent strip */}
          <div style={{ background:`linear-gradient(90deg, ${p.accent}, transparent)`, height:'3px', position:'absolute', top:0, left:0, right:0 }} />

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'280px' }}>

            {/* Left — info */}
            <div style={{ padding:'clamp(20px,4vw,40px)', display:'flex', flexDirection:'column', justifyContent:'space-between', borderRight:`1px solid ${p.accent}25` }}>
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px', flexWrap:'wrap', gap:'8px' }}>
                  <span style={{ fontFamily:"'Caesar Dressing', cursive", fontSize:'11px', color:p.accent, letterSpacing:'0.15em' }}>{p.tag}</span>
                  <span style={{ fontSize:'12px', color:'var(--muted)' }}>{p.year}</span>
                </div>
                <h3 style={{ fontFamily:"'Caesar Dressing', cursive", fontSize:'clamp(22px,3.5vw,38px)', color:'#fff5e6', textShadow:`2px 2px 0 ${p.accent}`, marginBottom:'12px', lineHeight:1.1 }}>{p.title}</h3>
                <p style={{ fontSize:'13px', lineHeight:1.7, color:'rgba(255,245,230,0.6)', marginBottom:'20px' }}>{p.desc}</p>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                {p.tools.map(t => (
                  <Badge key={t} variant="outline" style={{ fontSize:'11px', padding:'3px 10px', borderColor:`${p.accent}40`, color:p.accent, borderRadius:'2px', fontFamily:"'Instrument Sans', sans-serif" }}>{t}</Badge>
                ))}
              </div>
            </div>

            {/* Right — logo panel */}
            <div style={{
              position:'relative',
              background: p.bgColor,
              overflow: 'hidden',
              display:'flex', alignItems:'center', justifyContent:'center',
              minHeight:'280px',
            }}>
              {/* Radial glow bg */}
              <div style={{
                position:'absolute', inset:0,
                background: `radial-gradient(ellipse at 50% 50%, ${p.bgGlow}28 0%, transparent 70%)`,
                pointerEvents:'none',
              }} />

              {/* Subtle grid lines */}
              <div style={{
                position:'absolute', inset:0, pointerEvents:'none',
                backgroundImage: `linear-gradient(${p.bgGlow}12 1px, transparent 1px), linear-gradient(90deg, ${p.bgGlow}12 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
              }} />

              {/* Corner accent brackets */}
              {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h]) => (
                <div key={`${v}-${h}`} style={{
                  position:'absolute', [v]:12, [h]:12, width:16, height:16,
                  borderTop: v === 'top' ? `1.5px solid ${p.accent}70` : 'none',
                  borderBottom: v === 'bottom' ? `1.5px solid ${p.accent}70` : 'none',
                  borderLeft: h === 'left' ? `1.5px solid ${p.accent}70` : 'none',
                  borderRight: h === 'right' ? `1.5px solid ${p.accent}70` : 'none',
                }} />
              ))}

              {/* Floating logo — parallax layer */}
              <div style={{
                transform: logoTransform,
                transition: 'transform 0.18s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                zIndex: 2,
              }}>
                {/* Logo image / fallback */}
                {p.logo ? (
                  <img
                    src={p.logo}
                    alt={`${p.title} logo`}
                    style={{
                      width: 124, height: 124,
                      objectFit: 'contain',
                      filter: `drop-shadow(0 0 20px ${p.accent}88) drop-shadow(0 0 6px ${p.accent}55)`,
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex'; }}
                  />
                ) : null}

                {/* Fallback monogram (shown when logo missing) */}
                <div style={{
                  display: p.logo ? 'none' : 'flex',
                  width: 80, height: 80,
                  background: `linear-gradient(135deg, ${p.accent}33, ${p.accent}11)`,
                  border: `2px solid ${p.accent}55`,
                  alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Caesar Dressing', cursive",
                  fontSize: 36, color: p.accent,
                  boxShadow: `0 0 24px ${p.accent}44`,
                }}>
                  {p.title[0]}
                </div>
              </div>

              {/* View button */}
              <a href={p.link} target="_blank" rel="noreferrer" className="manga-btn" style={{ position:'absolute', bottom:'16px', right:'16px', fontSize:'12px', padding:'8px 16px' }}>VIEW ↗</a>
            </div>

          </div>
        </SpotlightCard>
      </div>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="works" className="section" style={{ background: 'var(--surface)', borderTop: '3px solid rgba(255,100,0,0.35)', position: 'relative', overflow: 'hidden' }}>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        <motion.div className="section-label" initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
          04 — PROJECTS
        </motion.div>

        {/* Manga heading + CTA */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'24px', marginBottom:'60px' }}>
          <motion.h2
            initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ fontFamily:"'Caesar Dressing', cursive", fontSize:'clamp(36px,7vw,88px)', lineHeight:0.9, color:'#fff5e6', textShadow:'4px 4px 0 #ff4500' }}
          >
            FIRE<br/><span style={{ color:'var(--accent-2)' }}>WORKS</span>
          </motion.h2>
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}>
            <Link href="/projects" className="manga-btn manga-btn-outline" style={{ textDecoration:'none' }}>VIEW ALL ↗</Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {projects.map((p, i) => (
            <ProjectCard key={i} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}