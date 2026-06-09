'use client';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="section" style={{ background: 'var(--paper)', borderTop: '3px solid rgba(255,100,0,0.35)', position: 'relative', overflow: 'hidden' }}>

      {/* Radial fire glow from top */}
      <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:'100vw', height:'60vh', background:'radial-gradient(ellipse at 50% 0%, rgba(255,69,0,0.2) 0%, transparent 70%)', pointerEvents:'none', zIndex:0 }}/>

      {/* Manga speed lines */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-conic-gradient(from 0deg at 50% 0%, rgba(255,80,0,0.03) 0deg 2deg, transparent 2deg 6deg)', pointerEvents:'none', zIndex:0 }}/>

      <div className="container" style={{ position:'relative', zIndex:2 }}>

        <motion.div className="section-label" initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
          05 — CONTACT
        </motion.div>

        {/* Main contact box */}
        <motion.div
          initial={{ opacity:0, scale:0.92 }}
          whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true }}
          transition={{ type:'spring', stiffness:150 }}
          style={{
            border: '3px solid rgba(255,100,0,0.5)',
            background: 'linear-gradient(135deg, #0a0400 0%, #120800 100%)',
            padding: 'clamp(40px,8vw,80px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Corner flames */}
          {[
            { top:0, left:0, transform:'rotate(0deg)' },
            { top:0, right:0, transform:'rotate(90deg)' },
            { bottom:0, left:0, transform:'rotate(270deg)' },
            { bottom:0, right:0, transform:'rotate(180deg)' },
          ].map((pos, i) => (
            <div key={i} style={{ position:'absolute', fontSize:'28px', lineHeight:1, ...pos }}> </div>
          ))}

          {/* Heading */}
          <motion.h2
            initial={{ opacity:0, y:-30 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ delay:0.2 }}
            style={{ fontFamily:"'Caesar Dressing', cursive", fontSize:'clamp(40px,10vw,120px)', lineHeight:0.9, color:'#fff5e6', textShadow:'6px 6px 0 #ff4500, 12px 12px 0 rgba(255,69,0,0.2)', marginBottom:'24px' }}
          >
            LET'S<br/><span style={{ color:'var(--accent-2)' }}>IGNITE</span><br/>SOMETHING
          </motion.h2>

          <motion.p
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true }}
            transition={{ delay:0.4 }}
            style={{ fontSize:'clamp(14px,2.5vw,18px)', color:'rgba(255,245,230,0.6)', maxWidth:'480px', margin:'0 auto 48px', lineHeight:1.8 }}
          >
            Got a project that needs to burn bright? I'm always open to new ideas, collaborations, and opportunities.
          </motion.p>

          <motion.div
            initial={{ opacity:0, scale:0.8 }}
            whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }}
            transition={{ delay:0.6, type:'spring', stiffness:200 }}
            style={{ display:'flex', gap:'16px', flexWrap:'wrap', justifyContent:'center' }}
          >
            <a href="mailto:aryansrivastava9059@gmail.com" className="manga-btn manga-btn-outline">
              <Mail size={18} style={{ marginRight: 8 }} aria-hidden />
              EMAIL ME
            </a>
            <a href="https://linkedin.com/in/aryan-srivastava9059" target="_blank" rel="noreferrer" className="manga-btn manga-btn-outline">
              <Linkedin size={18} style={{ marginRight: 8 }} aria-hidden />
              LINKEDIN
            </a>
            <a href="https://github.com/Aryan9059" target="_blank" rel="noreferrer" className="manga-btn manga-btn-outline">
              <Github size={18} style={{ marginRight: 8 }} aria-hidden />
              GITHUB
            </a>
            <a href="https://www.instagram.com/cute__flame/" target="_blank" rel="noreferrer" className="manga-btn manga-btn-outline">
              <Instagram size={18} style={{ marginRight: 8 }} aria-hidden />
              INStAGRAM
            </a>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <footer style={{ marginTop:'60px', paddingTop:'32px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'24px' }}>
          <div style={{ fontSize:'12px', color:'rgba(255,245,230,0.3)', fontFamily:"'Instrument Sans', sans-serif", width:'100%', textAlign:'center', marginTop:'16px' }}>
            MADE WITH 🧡 BY PIXEL PERFECT · © {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </section>
  );
}