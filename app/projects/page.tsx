'use client';
import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { projects, Project } from '@/lib/projects';
import ProjectDrawer from '@/components/ProjectDrawer';

// ── Category filter config ─────────────────────────────────────────────────
const FILTERS = [
  { key: 'all',       label: 'All Projects' },
  { key: 'android',   label: 'Android' },
  { key: 'fullstack', label: 'Full-Stack' },
  { key: 'web',       label: 'Web' },
] as const;

// ── Tilt card wrapper ──────────────────────────────────────────────────────
function TiltProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, active: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const rx = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -6;
    const ry = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  6;
    setTilt({ rx, ry, active: true });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0, active: false });

  const logoShift = tilt.active
    ? `translateX(${tilt.ry * 3}px) translateY(${tilt.rx * -3}px) scale(1.08)`
    : 'translateX(0) translateY(0) scale(1)';

  const { accent, bgColor, bgGlow } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      transition={{ type: 'spring', stiffness: 200, damping: 24 }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        style={{
          transform: tilt.active
            ? `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.02,1.02,1.02)`
            : 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)',
          transition: 'transform 0.18s ease',
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {/* Card */}
        <div style={{
          background: '#0a0400',
          border: `1.5px solid ${accent}35`,
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = `${accent}70`)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = `${accent}35`)}
        >
          {/* Accent top strip */}
          <div style={{ height: 2, background: `linear-gradient(90deg, ${accent}, transparent)` }} />

          {/* Chapter watermark */}
          <div style={{ position: 'absolute', top: 0, right: 4, fontFamily: "'Bangers', cursive", fontSize: 72, color: `${accent}0e`, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
            {project.index}
          </div>

          {/* Glare overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
            opacity: tilt.active ? 0.07 : 0, transition: 'opacity 0.3s',
            background: `radial-gradient(circle at ${50 + tilt.ry * 6}% ${50 - tilt.rx * 6}%, rgba(255,255,255,0.22) 0%, transparent 60%)`,
          }} />

          {/* Logo panel */}
          <div style={{
            position: 'relative', height: 160,
            background: bgColor, overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Grid bg */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: `linear-gradient(${bgGlow}0f 1px, transparent 1px), linear-gradient(90deg, ${bgGlow}0f 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }} />
            {/* Radial glow */}
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${bgGlow}25, transparent 70%)` }} />

            {/* Corner brackets */}
            {(['top-left','top-right','bottom-left','bottom-right'] as const).map((corner) => {
              const isTop  = corner.startsWith('top');
              const isLeft = corner.endsWith('left');
              const s: React.CSSProperties = {
                position: 'absolute',
                top:    isTop   ? 10 : undefined,
                bottom: !isTop  ? 10 : undefined,
                left:   isLeft  ? 10 : undefined,
                right:  !isLeft ? 10 : undefined,
                width: 12, height: 12,
                borderTop:    isTop   ? `1.5px solid ${accent}60` : 'none',
                borderBottom: !isTop  ? `1.5px solid ${accent}60` : 'none',
                borderLeft:   isLeft  ? `1.5px solid ${accent}60` : 'none',
                borderRight:  !isLeft ? `1.5px solid ${accent}60` : 'none',
              };
              return <div key={corner} style={s} />;
            })}

            {/* Floating logo */}
            <div style={{ transform: logoShift, transition: 'transform 0.18s ease', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              {project.logo ? (
                <img src={project.logo} alt={project.title}
                  style={{ width: 64, height: 64, objectFit: 'contain', filter: `drop-shadow(0 0 14px ${accent}99)`, userSelect: 'none', pointerEvents: 'none' }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex'; }}
                />
              ) : null}
              <div style={{
                display: project.logo ? 'none' : 'flex',
                width: 56, height: 56, alignItems: 'center', justifyContent: 'center',
                background: `${accent}18`, border: `1.5px solid ${accent}55`,
                fontFamily: "'Caesar Dressing', cursive", fontSize: 26, color: accent,
                boxShadow: `0 0 20px ${accent}44`,
              }}>{project.title[0]}</div>
            </div>

            {/* Featured badge */}
            {project.featured && (
              <div style={{
                position: 'absolute', top: 10, left: 10, zIndex: 3,
                fontFamily: "'Caesar Dressing', cursive", fontSize: 9,
                color: '#000', background: accent,
                padding: '2px 8px', letterSpacing: '0.12em',
              }}>★ FEATURED</div>
            )}
          </div>

          {/* Info section */}
          <div style={{ padding: '16px 20px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 10, color: accent, letterSpacing: '0.15em' }}>{project.tag}</span>
              <span style={{ fontSize: 10, color: 'var(--muted)' }}>{project.year}</span>
            </div>

            <h3 style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 22, color: '#fff5e6', textShadow: `2px 2px 0 ${accent}`, marginBottom: 8, lineHeight: 1.1 }}>{project.title}</h3>

            <p style={{ fontSize: 11.5, lineHeight: 1.7, color: 'rgba(255,245,230,0.5)', marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {project.desc}
            </p>

            {/* Stack pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
              {project.tools.slice(0, 4).map(t => (
                <span key={t} style={{
                  fontSize: 9.5, fontWeight: 600, padding: '2px 8px',
                  background: 'rgba(255,100,0,0.07)', border: '1px solid rgba(255,100,0,0.2)',
                  color: 'rgba(255,245,230,0.55)',
                  fontFamily: "'Instrument Sans', sans-serif",
                  clipPath: 'polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)',
                }}>{t}</span>
              ))}
              {project.tools.length > 4 && (
                <span style={{ fontSize: 9.5, color: 'var(--muted)', padding: '2px 6px' }}>+{project.tools.length - 4}</span>
              )}
            </div>

            {/* Open details CTA */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              color: accent, fontSize: 11, fontFamily: "'Caesar Dressing', cursive",
              letterSpacing: '0.1em', opacity: 0.8,
              transition: 'opacity 0.15s',
            }}>
              <span>OPEN DETAILS</span>
              <span style={{ fontSize: 13 }}>→</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const [search, setSearch] = useState('');

  const filtered = projects.filter(p => {
    const matchCat = filter === 'all' || p.category === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.tools.some(t => t.toLowerCase().includes(q)) || p.tag.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const totalDownloads = '27,000+';
  const totalProjects  = projects.length;

  return (
    <>
      {/* ── Nav ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,4,0,0.88)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,100,0,0.15)',
        padding: '0 48px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 18, color: '#ff4500', textDecoration: 'none', letterSpacing: '0.05em' }}>
          ← C·F
        </Link>
        <span style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 12, color: 'var(--accent-2)', letterSpacing: '0.2em' }}>PROJECTS</span>
        <span></span>
      </nav>

      <main style={{ background: 'var(--paper)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

        {/* BG speed lines */}
        <div style={{ position: 'fixed', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,80,0,0.018) 0px, rgba(255,80,0,0.018) 1px, transparent 1px, transparent 60px)', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* ── Hero ── */}
          <section style={{ padding: '72px 48px 56px', borderBottom: '1px solid rgba(255,100,0,0.15)', position: 'relative', overflow: 'hidden' }}>
            {/* Big watermark text */}
            <div style={{ position: 'absolute', top: -10, right: -20, fontFamily: "'Bangers', cursive", fontSize: 'clamp(100px,18vw,200px)', color: 'rgba(255,69,0,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '0.05em' }}>WORKS</div>

            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 12, color: 'var(--accent-2)', letterSpacing: '0.25em', marginBottom: 24 }}>
                ◆ FULL CATALOGUE
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
                style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 'clamp(48px,9vw,110px)', lineHeight: 0.88, color: '#fff5e6', textShadow: '5px 5px 0 #ff4500', marginBottom: 24 }}>
                FIRE<br /><span style={{ color: 'var(--accent-2)' }}>WORKS</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                style={{ fontSize: 14, color: 'var(--muted)', maxWidth: 480, lineHeight: 1.8, marginBottom: 40 }}>
                Every project I have worked, contributed to, collaborated on or published is listed here. From Play Store hits to small open-source libraries, it&apos;s all fire, no smoke.
              </motion.p>

              {/* Global stats */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
                {[
                  { label: 'Projects', value: totalProjects },
                  { label: 'Play Store Downloads', value: totalDownloads },
                  { label: 'Languages Used', value: '7+' },
                  { label: 'Featured', value: projects.filter(p => p.featured).length },
                ].map((s, i) => (
                  <div key={i} style={{
                    padding: '14px 28px', borderRight: '1px solid rgba(255,100,0,0.15)',
                    borderTop: '1px solid rgba(255,100,0,0.15)', borderBottom: '1px solid rgba(255,100,0,0.15)',
                    borderLeft: i === 0 ? '1px solid rgba(255,100,0,0.15)' : 'none',
                  }}>
                    <div style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 26, color: 'var(--accent)', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4, fontFamily: "'Instrument Sans', sans-serif" }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ── Filter + Search bar ── */}
          <section style={{ padding: '28px 48px', borderBottom: '1px solid rgba(255,100,0,0.12)', background: 'rgba(255,69,0,0.025)', position: 'sticky', top: 56, zIndex: 90 }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>

              {/* Filter tabs */}
              <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
                {FILTERS.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    style={{
                      fontFamily: "'Caesar Dressing', cursive",
                      fontSize: 11, letterSpacing: '0.12em',
                      padding: '8px 16px',
                      background: filter === f.key ? 'var(--accent)' : 'transparent',
                      border: '1px solid',
                      borderColor: filter === f.key ? 'var(--accent)' : 'rgba(255,100,0,0.25)',
                      color: filter === f.key ? '#000' : 'rgba(255,245,230,0.6)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      marginRight: -1,
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div style={{ marginLeft: 'auto', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 13, pointerEvents: 'none' }}>⌕</span>
                <input
                  type="text"
                  placeholder="Search by name or tech..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    background: 'rgba(255,100,0,0.05)', border: '1px solid rgba(255,100,0,0.2)',
                    color: '#fff5e6', fontSize: 12, padding: '8px 14px 8px 32px',
                    fontFamily: "'Instrument Sans', sans-serif", outline: 'none', width: 220,
                    clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)',
                  }}
                />
              </div>

              <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: "'Instrument Sans', sans-serif" }}>
                {filtered.length} project{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </section>

          {/* ── Grid ── */}
          <section style={{ padding: '48px 48px 96px', maxWidth: 1200, margin: '0 auto' }}>
            <motion.div
              layout
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 24,
              }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map(p => (
                  <TiltProjectCard
                    key={p.id}
                    project={p}
                    onClick={() => setSelected(p)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
                <div style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 48, marginBottom: 16, opacity: 0.3 }}>¿?</div>
                <p style={{ fontSize: 14 }}>No projects match your filter.</p>
              </motion.div>
            )}
          </section>
        </div>
      </main>

      {/* ── Drawer ── */}
      <ProjectDrawer project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
