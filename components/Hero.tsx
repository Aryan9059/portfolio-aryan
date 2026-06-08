'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitText from '@/components/ui/SplitText';
import DecryptedText from '@/components/ui/DecryptedText';

// Manga-style flame SVG path for decoration
const FlamePath = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 1200 80" preserveAspectRatio="none" style={{ display: 'block', ...style }}>
    <path
      d="M0,80 L0,50 C50,30 80,70 120,45 C160,20 180,60 220,40 C260,20 280,55 320,35
         C360,15 390,50 430,30 C470,10 500,55 540,35 C580,15 610,50 650,30
         C690,10 720,55 760,35 C800,15 830,50 870,30 C910,10 940,55 980,35
         C1020,15 1050,50 1090,30 C1130,10 1160,55 1200,40 L1200,80 Z"
      fill="var(--paper)"
    />
  </svg>
);

// Ember particle component
const Ember = ({ x, delay, size }: { x: string; delay: number; size: number }) => (
  <motion.div
    style={{
      position: 'absolute',
      bottom: '10%',
      left: x,
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, #ffaa00, #ff4500)`,
      boxShadow: `0 0 ${size * 2}px #ff4500`,
      pointerEvents: 'none',
    }}
    animate={{
      y: [0, -200 - Math.random() * 100],
      x: [0, (Math.random() - 0.5) * 60],
      opacity: [0.9, 0.4, 0],
      scale: [1, 0.5, 0],
    }}
    transition={{
      duration: 2 + Math.random() * 2,
      repeat: Infinity,
      delay,
      ease: 'easeOut',
    }}
  />
);

const embers = Array.from({ length: 18 }, (_, i) => ({
  x: `${(i / 18) * 100}%`,
  delay: i * 0.22,
  size: 3 + Math.floor(Math.random() * 4),
}));

// Stop-motion jitter for text
const stopMotionVariants = {
  hidden: { opacity: 0, y: 40, skewX: 5 },
  visible: (i: number) => ({
    opacity: 1, y: 0, skewX: 0,
    transition: {
      type: 'spring', stiffness: 300, damping: 20,
      delay: i * 0.12,
      // Step-based easing for stop-motion feel
      ease: [0.22, 0.68, 0, 1.2],
    },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #000 0%, #0a0400 40%, #1a0600 100%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Radial fire glow from center-bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '120vw', height: '80vh',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(255,69,0,0.35) 0%, rgba(255,120,0,0.1) 40%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Manga speed-lines burst from center */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-conic-gradient(from 0deg at 50% 60%, rgba(255,80,0,0.04) 0deg 2deg, transparent 2deg 6deg)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Embers */}
      {embers.map((e, i) => <Ember key={i} {...e} />)}

      {/* Top halftone band */}
      <div className="halftone" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: 'var(--accent)', zIndex: 3,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 5, flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* ── NAV ── */}
        <motion.nav
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '28px 0 24px',
            borderBottom: '2px solid rgba(255,100,0,0.3)',
            flexWrap: 'wrap', gap: '16px',
          }}
        >
          <span className="manga-btn manga-btn-outline" style={{ fontSize: '13px', padding: '8px 20px', pointerEvents: 'none', clipPath: 'none' }}>
              cuteFlame
          </span>
          <div style={{ display: 'flex', gap: 'clamp(16px,3vw,32px)', flexWrap: 'wrap' }}>
            {['About', 'Experience', 'Tech Stack', 'Projects', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                style={{ color: 'rgba(255,245,230,0.6)', textDecoration: 'none', fontFamily: "'Caesar Dressing', cursive", fontSize: '14px', letterSpacing: '0.1em' }}
                whileHover={{ color: '#ff6b00', y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.nav>

        {/* ── HERO BODY ── */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          textAlign: 'center', padding: 'clamp(60px,10vw,100px) 0 40px',
          gap: '24px',
        }}>

          {/* Status badge */}
          <motion.div
            initial={{ scale: 0, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.4 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '8px 20px',
              background: 'rgba(255,69,0,0.15)',
              border: '2px solid rgba(255,100,0,0.5)',
              fontFamily: "'Caesar Dressing', cursive", fontSize: '13px', color: '#ffaa00',
              letterSpacing: '0.12em',
              clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'steps(2)' }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff4500', display: 'inline-block', boxShadow: '0 0 10px #ff4500' }}
            />
            ⚡ OPEN TO PROJECTS ⚡
          </motion.div>

          {/* Big MANGA heading */}
          <div>
            <motion.h1
              style={{
                fontFamily: "'Caesar Dressing', cursive",
                fontSize: 'clamp(52px, 10vw, 130px)',
                lineHeight: 0.9,
                color: '#fff5e6',
                textShadow: '4px 4px 0 #ff4500, 8px 8px 0 rgba(255,69,0,0.3)',
                letterSpacing: '0.03em',
                position: 'relative',
              }}
            >
              {/* Stop-motion line by line */}
              {['ARYAN', 'SRIVASTAVA'].map((word, wi) => (
                <motion.div
                  key={wi}
                  custom={wi}
                  variants={stopMotionVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ display: 'block' }}
                >
                  {word}
                </motion.div>
              ))}
            </motion.h1>

            {/* Subtitle in Bangers */}
            <motion.div
              initial={{ opacity: 0, y: 20, scaleX: 0.8 }}
              animate={{ opacity: 1, y: 0, scaleX: 1 }}
              transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
              style={{
                fontFamily: "'Bangers', cursive",
                fontSize: 'clamp(18px,3.5vw,36px)',
                color: 'var(--accent-2)',
                letterSpacing: '0.25em',
                marginTop: '8px',
                textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
              }}
            >
              ANDROID DEVELOPER · FIRE CODER
            </motion.div>
          </div>

          {/* Decrypted description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            style={{
              maxWidth: '500px',
              fontSize: 'clamp(14px, 2vw, 16px)',
              lineHeight: 1.8,
              color: 'rgba(255,245,230,0.65)',
            }}
          >
            <DecryptedText
              text="Building blazing-fast mobile apps with Kotlin & Jetpack Compose. 27K+ downloads. 1.5L+ revenue. Shipping fire since day one."
              speed={22} maxIterations={6} animateOn="load"
            />
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <a href="#works" className="manga-btn">  SEE MY WORK</a>
            <a href="#contact" className="manga-btn manga-btn-outline">CONTACT ME ↗</a>
          </motion.div>
        </div>
      </div>

      {/* Flame silhouette divider at bottom */}
      <div style={{ position: 'relative', zIndex: 5, marginTop: 'auto' }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 'clamp(60px,10vw,120px)' }}>
          <defs>
            <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff6b00" />
              <stop offset="100%" stopColor="#ff2200" stopOpacity="0.4" />
            </linearGradient>
            <style>{`
              @keyframes fmorph {
                0%,100% { d: path("M0,120 L0,80 C30,55 50,90 80,65 C110,40 130,75 160,55 C190,35 210,70 240,50 C270,30 300,65 330,45 C360,25 385,65 415,45 C445,25 470,60 500,40 C530,20 560,60 590,40 C620,20 645,60 675,40 C705,20 730,60 760,40 C790,20 820,60 850,40 C880,20 905,60 940,40 C970,20 1000,60 1030,40 C1060,20 1085,60 1120,45 C1150,30 1170,70 1200,55 L1200,120 Z"); }
                50% { d: path("M0,120 L0,70 C30,45 55,85 85,60 C115,35 135,70 165,50 C195,30 215,68 245,48 C275,28 302,62 332,42 C362,22 387,63 417,43 C447,23 472,58 502,38 C532,18 562,58 592,38 C622,18 647,58 677,38 C707,18 732,58 762,38 C792,18 822,58 852,38 C882,18 907,58 942,38 C972,18 1002,58 1032,38 C1062,18 1087,58 1122,43 C1152,28 1172,68 1200,52 L1200,120 Z"); }
              }
              .hero-flame { animation: fmorph 2.2s ease-in-out infinite; }
            `}</style>
          </defs>
          <path
            className="hero-flame"
            d="M0,120 L0,80 C30,55 50,90 80,65 C110,40 130,75 160,55 C190,35 210,70 240,50 C270,30 300,65 330,45 C360,25 385,65 415,45 C445,25 470,60 500,40 C530,20 560,60 590,40 C620,20 645,60 675,40 C705,20 730,60 760,40 C790,20 820,60 850,40 C880,20 905,60 940,40 C970,20 1000,60 1030,40 C1060,20 1085,60 1120,45 C1150,30 1170,70 1200,55 L1200,120 Z"
            fill="url(#flameGrad)"
          />
        </svg>
      </div>

      {/* Spinning badge */}
      <div style={{ position: 'absolute', top: '90px', right: '48px', zIndex: 10 }}>
        <div style={{ position: 'relative', width: '100px', height: '100px' }}>
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
            style={{ width: '100%', height: '100%' }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
              <defs><path id="sbadge" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"/></defs>
              <text fontSize="10" fill="rgba(255,100,0,0.7)" letterSpacing="2" fontFamily="'Caesar Dressing', cursive">
                <textPath href="#sbadge">FIRE CODER · OPEN SOURCE · </textPath>
              </text>
            </svg>
          </motion.div>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '24px' }}> </div>
        </div>
      </div>
    </section>
  );
}