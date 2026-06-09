'use client';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import SpotlightCard from '@/components/ui/SpotlightCard';
import TiltCard from '@/components/ui/TiltCard';

const projects = [
  {
    title: 'Phi Launcher',
    year: '2025', index: '01',
    tag: 'Android Launcher',
    link: 'https://play.google.com/store/apps/details?id=com.launcher.hype',
    tools: ['Jetpack Compose','Kotlin','Room','DataStore','GraphQL'],
    desc: '27,000+ downloads. 4.4★ rating. 1.5L+ gross revenue on Play Store. Built an Android launcher with a loads of features like Focus Mode, App Launch Delay, Custom Theming, and much more.',
    image: null, // → replace with "/images/phi-launcher.png"
    accent: '#7F52FF',
  },
  {
    title: 'PixelFi',
    year: '2024', index: '02',
    tag: 'Full-stack · Web App',
    link: '#',
    tools: ['Next.js','FastAPI','Kafka','Docker','ML','Clerk'],
    desc: 'Financial portfolio platform with ML-powered market predictions, Apache Kafka messaging, and a fully Dockerized microservices backend.',
    image: null, // → replace with "/images/pixelfi.png"
    accent: '#4285F4',
  },
  {
    title: 'GradLoop',
    year: '2024', index: '03',
    tag: 'Full-stack · AI-powered',
    link: '#',
    tools: ['Next.js','TypeScript','Prisma','Supabase','WebSockets','Mistral AI'],
    desc: 'Alumni networking with real-time chat, Mistral AI resume generation, and profile analysis. Prisma + Supabase + Webhooks backend.',
    image: null, // → replace with "/images/gradloop.png"
    accent: '#3ECF8E',
  },
];

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
          <motion.a
            href="#" className="manga-btn manga-btn-outline"
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          >VIEW ALL ↗</motion.a>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:40, rotate: i%2===0 ? -0.5 : 0.5 }}
              whileInView={{ opacity:1, y:0, rotate:0 }}
              viewport={{ once:true, margin:'-60px' }}
              transition={{ delay: i*0.12, type:'spring', stiffness:160 }}
            >
              <TiltCard tiltStrength={5} style={{ borderRadius:'0px' }}>
                <SpotlightCard
                  spotlightColor={`${p.accent}15`}
                  style={{ background:'#0a0400', border:`2px solid ${p.accent}40`, position:'relative', overflow:'hidden' }}
                >
                  {/* Chapter number watermark */}
                  <div style={{ position:'absolute', top:0, right:0, fontFamily:"'Bangers', cursive", fontSize:'100px', color:`${p.accent}10`, lineHeight:1, userSelect:'none', pointerEvents:'none' }}>{p.index}</div>

                  {/* Top accent strip */}
                  <div style={{ background:`linear-gradient(90deg, ${p.accent}, transparent)`, height:'3px', position:'absolute', top:0, left:0, right:0 }} />

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'260px' }}>

                    {/* Left — info */}
                    <div style={{ padding:'clamp(20px,4vw,40px)', display:'flex', flexDirection:'column', justifyContent:'space-between', borderRight:`1px solid ${p.accent}25` }}>
                      <div>
                        {/* Tag + year */}
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

                    {/* Right — image/placeholder */}
                    <div style={{ position:'relative', background:`linear-gradient(135deg, ${p.accent}12 0%, rgba(0,0,0,0) 100%)`, display:'flex', alignItems:'center', justifyContent:'center', minHeight:'260px' }}>
                      {p.image ? (
                        <img src={p.image} alt={p.title} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
                      ) : (
                        /* ── Drop your screenshot here by setting image: "/images/xxx.png" ── */
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'12px', opacity:0.3 }}>
                          <div style={{ width:'52px', height:'52px', background:p.accent, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Caesar Dressing', cursive", fontSize:'24px', color:'#fff' }}>
                            {p.title[0]}
                          </div>
                          <span style={{ fontFamily:"'Caesar Dressing', cursive", fontSize:'11px', color:'var(--muted)', letterSpacing:'0.15em' }}>ADD SCREENSHOT</span>
                        </div>
                      )}
                      {/* View button */}
                      <a href={p.link} target="_blank" rel="noreferrer" className="manga-btn" style={{ position:'absolute', bottom:'16px', right:'16px', fontSize:'12px', padding:'8px 16px' }}>VIEW ↗</a>
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