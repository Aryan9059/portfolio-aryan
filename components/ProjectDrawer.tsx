'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/projects';
import ReactMarkdownRenderer from '@/components/MarkdownRenderer';

// ── Tool color map ──────────────────────────────────────────────────────────
const TOOL_COLORS: Record<string, string> = {
  'Kotlin': '#7F52FF', 'Jetpack Compose': '#4285F4', 'Room DB': '#7F52FF',
  'DataStore': '#a78bfa', 'GraphQL': '#E535AB', 'MVVM': '#ff6b00',
  'Next.js': '#ffffff', 'TypeScript': '#3178C6', 'React': '#61DAFB',
  'Prisma': '#5A67D8', 'Supabase': '#3ECF8E', 'WebSockets': '#FFCA28',
  'Mistral AI': '#ff6b35', 'Webhooks': '#aaa',
  'FastAPI': '#059669', 'Apache Kafka': '#ff4500', 'Docker': '#2496ED',
  'Python': '#3572A5', 'Clerk': '#6C47FF', 'ML': '#ff6b00',
  'PostgreSQL': '#336791',
  'Android': '#3DDC84', 'Android SDK': '#3DDC84',
  'NotificationListenerService': '#39FF14', 'WorkManager': '#4CAF50',
  'Coroutines': '#7F52FF', 'Room': '#7F52FF',
  'Monaco Editor': '#007ACC', 'Judge0 API': '#F7DF1E', 'Tailwind CSS': '#06B6D4',
  'Health Connect': '#3ECF8E', 'MPAndroidChart': '#ff6b35', 'Material 3': '#6750A4',
  'GitHub API': '#ffffff', 'LeetCode API': '#FFA116', 'Codeforces API': '#1F8ACB',
  'Recharts': '#8884d8',
  'Maven Central': '#C71A36', 'KDoc': '#7F52FF',
  'KotlinMultiplatform': '#7F52FF',
};

function toolColor(t: string) {
  return TOOL_COLORS[t] ?? '#ff6b00';
}

// ── Stats grid ──────────────────────────────────────────────────────────────
function StatsGrid({ stats, accent }: { stats: NonNullable<Project['stats']>; accent: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, marginBottom: 28, background: `${accent}20`, border: `1px solid ${accent}30` }}>
      {stats.map((s, i) => (
        <div key={i} style={{ padding: '14px 18px', background: 'rgba(10,4,0,0.7)' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,245,230,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
          <div style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 18, color: accent }}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

// ── Main Drawer ─────────────────────────────────────────────────────────────
export default function ProjectDrawer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // trap scroll
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 'min(680px, 100vw)',
              zIndex: 201,
              background: 'var(--paper)',
              borderLeft: `2px solid ${project.accent}40`,
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Accent top strip */}
            <div style={{ height: 3, background: `linear-gradient(90deg, ${project.accent}, transparent)`, flexShrink: 0 }} />

            {/* Header */}
            <div style={{
              padding: '20px 28px',
              borderBottom: `1px solid ${project.accent}20`,
              background: project.bgColor,
              flexShrink: 0,
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Grid bg */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: `linear-gradient(${project.bgGlow}0a 1px, transparent 1px), linear-gradient(90deg, ${project.bgGlow}0a 1px, transparent 1px)`,
                backgroundSize: '28px 28px',
              }} />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 80% 50%, ${project.bgGlow}22, transparent 70%)`, pointerEvents: 'none' }} />

              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 20 }}>
                {/* Logo */}
                <div style={{
                  width: 72, height: 72, flexShrink: 0,
                  background: `linear-gradient(135deg, ${project.accent}22, ${project.bgColor})`,
                  border: `1.5px solid ${project.accent}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 20px ${project.accent}33`,
                  clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
                }}>
                  {project.logo
                    ? <img src={project.logo} alt={project.title} style={{ width: 52, height: 52, objectFit: 'contain', filter: `drop-shadow(0 0 8px ${project.accent}88)` }} />
                    : <span style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 28, color: project.accent }}>{project.title[0]}</span>
                  }
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 11, color: project.accent, letterSpacing: '0.15em' }}>{project.tag}</span>
                    <span style={{ fontSize: 10, color: 'var(--muted)' }}>· {project.year}</span>
                  </div>
                  <h2 style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 'clamp(22px,4vw,32px)', color: '#fff5e6', textShadow: `2px 2px 0 ${project.accent}`, lineHeight: 1.1, marginBottom: 8 }}>
                    {project.title}
                  </h2>
                  <p style={{ fontSize: 12, color: 'rgba(255,245,230,0.55)', lineHeight: 1.6, maxWidth: 400 }}>{project.desc}</p>
                </div>

                {/* Close */}
                <button
                  onClick={onClose}
                  style={{
                    flexShrink: 0, alignSelf: 'flex-start',
                    background: 'rgba(255,100,0,0.1)', border: '1px solid rgba(255,100,0,0.3)',
                    color: 'rgba(255,245,230,0.7)', width: 36, height: 36,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', fontSize: 16,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,69,0,0.25)'; e.currentTarget.style.color = '#fff5e6'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,100,0,0.1)'; e.currentTarget.style.color = 'rgba(255,245,230,0.7)'; }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '28px 28px 48px' }}>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
                {project.link && project.link !== '#' && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="manga-btn" style={{ fontSize: 12, padding: '10px 20px' }}>
                    ↗ VISIT PROJECT
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="manga-btn manga-btn-outline" style={{ fontSize: 12, padding: '10px 20px' }}>
                    ⌥ GITHUB
                  </a>
                )}
              </div>

              {/* Stats */}
              {project.stats && <StatsGrid stats={project.stats} accent={project.accent} />}

              {/* Tech stack */}
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 12, color: 'var(--accent-2)', letterSpacing: '0.2em', marginBottom: 12 }}>◆ TECH STACK</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {project.tools.map(t => (
                    <span key={t} style={{
                      fontSize: 11, fontWeight: 600, padding: '5px 12px',
                      background: `${toolColor(t)}14`,
                      border: `1px solid ${toolColor(t)}45`,
                      color: toolColor(t),
                      fontFamily: "'Instrument Sans', sans-serif",
                      clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)',
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* README divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,100,0,0.15)' }} />
                <span style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 11, color: 'var(--accent-2)', letterSpacing: '0.2em' }}>README.md</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,100,0,0.15)' }} />
              </div>

              {/* README content */}
              <ReactMarkdownRenderer content={project.readme} accent={project.accent} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
