'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Data ─────────────────────────────────────────────────────────────── */
type Skill = {
  id: string;
  label: string;
  color: string;
  category: 'language' | 'framework' | 'infra' | 'mobile';
  proficiency: number; // 0-100
  projects: string[];
  connections: string[]; // other skill ids
  x: number; // 0-100 percentage
  y: number;
};

const SKILLS: Skill[] = [
  // Languages
  { id: 'kotlin',     label: 'Kotlin',          color: '#7F52FF', category: 'language',   proficiency: 95, projects: ['Phi Launcher'],                          connections: ['jetpack','android','room','datastore'],          x: 18,  y: 22 },
  { id: 'typescript', label: 'TypeScript',       color: '#3178C6', category: 'language',   proficiency: 88, projects: ['GradLoop', 'PixelFi'],                   connections: ['nextjs','react','prisma','tailwind'],            x: 72,  y: 18 },
  { id: 'java',       label: 'Java',             color: '#ED8B00', category: 'language',   proficiency: 82, projects: ['Phi Launcher'],                          connections: ['spring','android'],                             x: 10,  y: 52 },
  { id: 'python',     label: 'Python',           color: '#3572A5', category: 'language',   proficiency: 80, projects: ['PixelFi'],                               connections: ['fastapi'],                                      x: 82,  y: 72 },
  { id: 'javascript', label: 'JavaScript',       color: '#F7DF1E', category: 'language',   proficiency: 85, projects: ['GradLoop', 'PixelFi'],                   connections: ['react','nextjs','express'],                      x: 60,  y: 80 },
  { id: 'sql',        label: 'SQL',              color: '#e38c00', category: 'language',   proficiency: 78, projects: ['GradLoop', 'PixelFi'],                   connections: ['postgres','prisma','supabase'],                  x: 46,  y: 62 },
  { id: 'cpp',        label: 'C / C++',          color: '#f34b7d', category: 'language',   proficiency: 72, projects: [],                                        connections: [],                                               x: 28,  y: 78 },
  // Mobile / Android
  { id: 'jetpack',    label: 'Jetpack Compose',  color: '#4285F4', category: 'mobile',     proficiency: 94, projects: ['Phi Launcher'],                          connections: ['kotlin','android','room'],                       x: 22,  y: 38 },
  { id: 'android',    label: 'Android SDK',      color: '#3DDC84', category: 'mobile',     proficiency: 93, projects: ['Phi Launcher'],                          connections: ['kotlin','java','jetpack','retrofit'],            x: 8,   y: 34 },
  { id: 'retrofit',   label: 'Retrofit',         color: '#ff6b00', category: 'mobile',     proficiency: 80, projects: ['Phi Launcher'],                          connections: ['android','kotlin'],                             x: 14,  y: 64 },
  { id: 'room',       label: 'Room DB',           color: '#7F52FF', category: 'mobile',     proficiency: 85, projects: ['Phi Launcher'],                          connections: ['kotlin','jetpack'],                             x: 32,  y: 25 },
  { id: 'datastore',  label: 'DataStore',        color: '#a78bfa', category: 'mobile',     proficiency: 80, projects: ['Phi Launcher'],                          connections: ['kotlin','jetpack'],                             x: 36,  y: 40 },
  // Frameworks / Web
  { id: 'nextjs',     label: 'Next.js',          color: '#ffffff', category: 'framework',  proficiency: 87, projects: ['GradLoop', 'PixelFi'],                   connections: ['typescript','react','tailwind','prisma'],        x: 76,  y: 32 },
  { id: 'react',      label: 'React.js',         color: '#61DAFB', category: 'framework',  proficiency: 85, projects: ['GradLoop', 'PixelFi'],                   connections: ['typescript','javascript','nextjs','tailwind'],   x: 86,  y: 46 },
  { id: 'spring',     label: 'Spring Boot',      color: '#6DB33F', category: 'framework',  proficiency: 75, projects: [],                                        connections: ['java'],                                         x: 6,   y: 70 },
  { id: 'fastapi',    label: 'FastAPI',           color: '#059669', category: 'framework',  proficiency: 78, projects: ['PixelFi'],                               connections: ['python','docker'],                               x: 74,  y: 82 },
  { id: 'express',    label: 'Express.js',        color: '#aaaaaa', category: 'framework',  proficiency: 72, projects: [],                                        connections: ['javascript'],                                    x: 62,  y: 66 },
  { id: 'tailwind',   label: 'Tailwind CSS',     color: '#06B6D4', category: 'framework',  proficiency: 83, projects: ['GradLoop', 'PixelFi'],                   connections: ['nextjs','react','typescript'],                   x: 88,  y: 62 },
  // Infra / Data
  { id: 'postgres',   label: 'PostgreSQL',       color: '#336791', category: 'infra',      proficiency: 80, projects: ['GradLoop', 'PixelFi'],                   connections: ['sql','prisma','supabase'],                       x: 52,  y: 48 },
  { id: 'supabase',   label: 'Supabase',         color: '#3ECF8E', category: 'infra',      proficiency: 82, projects: ['GradLoop'],                              connections: ['postgres','sql','prisma'],                       x: 62,  y: 42 },
  { id: 'firebase',   label: 'Firebase',         color: '#FFCA28', category: 'infra',      proficiency: 78, projects: ['Phi Launcher'],                          connections: ['kotlin','android'],                             x: 26,  y: 58 },
  { id: 'docker',     label: 'Docker',           color: '#2496ED', category: 'infra',      proficiency: 76, projects: ['PixelFi'],                               connections: ['kafka','fastapi'],                               x: 62,  y: 92 },
  { id: 'kafka',      label: 'Apache Kafka',     color: '#ff4500', category: 'infra',      proficiency: 70, projects: ['PixelFi'],                               connections: ['docker'],                                       x: 48,  y: 86 },
  { id: 'prisma',     label: 'Prisma',           color: '#5A67D8', category: 'infra',      proficiency: 82, projects: ['GradLoop'],                              connections: ['typescript','postgres','supabase'],             x: 72,  y: 54 },
  { id: 'git',        label: 'Git',              color: '#F05032', category: 'infra',      proficiency: 90, projects: ['Phi Launcher', 'GradLoop', 'PixelFi'],   connections: [],                                               x: 44,  y: 76 },
];

const PROJECT_COLORS: Record<string, string> = {
  'Phi Launcher': '#7F52FF',
  'PixelFi':      '#4285F4',
  'GradLoop':     '#3ECF8E',
};

const CATEGORY_LABEL: Record<string, string> = {
  language:  'Language',
  framework: 'Framework',
  mobile:    'Mobile / Android',
  infra:     'Infrastructure',
};

/* ─── Build connection pairs (de-duped) ────────────────────────────────── */
function buildEdges() {
  const seen = new Set<string>();
  const edges: [string, string][] = [];
  for (const s of SKILLS) {
    for (const c of s.connections) {
      const key = [s.id, c].sort().join('|');
      if (!seen.has(key)) { seen.add(key); edges.push([s.id, c]); }
    }
  }
  return edges;
}
const EDGES = buildEdges();

const skillMap = Object.fromEntries(SKILLS.map(s => [s.id, s]));

/* ─── Proficiency bar ───────────────────────────────────────────────────── */
function ProficiencyBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ height: '100%', background: `linear-gradient(90deg, ${color}, ${color}aa)`, borderRadius: 2, boxShadow: `0 0 6px ${color}88` }}
        />
      </div>
      <span style={{ fontSize: 11, color, fontWeight: 700, minWidth: 28, textAlign: 'right' }}>{value}%</span>
    </div>
  );
}

/* ─── Tooltip / Info Panel ──────────────────────────────────────────────── */
function SkillTooltip({ skill, pos }: { skill: Skill; pos: { x: number; y: number } }) {
  const panelW = 240;
  // flip horizontally if near right edge
  const flip = pos.x > 65;
  return (
    <motion.div
      key={skill.id}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.18 }}
      style={{
        position: 'absolute',
        left: flip ? `calc(${pos.x}% - ${panelW + 18}px)` : `calc(${pos.x}% + 18px)`,
        top: `calc(${pos.y}% - 50px)`,
        width: panelW,
        background: 'rgba(10,4,0,0.96)',
        border: `1.5px solid ${skill.color}55`,
        boxShadow: `0 0 0 1px ${skill.color}22, 0 8px 32px rgba(0,0,0,0.7), 0 0 20px ${skill.color}18`,
        padding: '16px',
        pointerEvents: 'none',
        zIndex: 50,
        clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',
      }}
    >
      {/* Top accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${skill.color}, transparent)` }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: skill.color, boxShadow: `0 0 8px ${skill.color}` }} />
        <span style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 15, color: skill.color, letterSpacing: '0.05em' }}>{skill.label}</span>
      </div>

      {/* Category */}
      <div style={{ fontSize: 10, color: 'rgba(255,245,230,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
        {CATEGORY_LABEL[skill.category]}
      </div>

      {/* Proficiency */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: 'rgba(255,245,230,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>Proficiency</div>
        <ProficiencyBar value={skill.proficiency} color={skill.color} />
      </div>

      {/* Projects */}
      {skill.projects.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: 'rgba(255,245,230,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Used In</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {skill.projects.map(p => (
              <span key={p} style={{
                fontSize: 10, fontWeight: 600,
                padding: '3px 8px',
                background: `${PROJECT_COLORS[p] ?? '#ff4500'}18`,
                border: `1px solid ${PROJECT_COLORS[p] ?? '#ff4500'}55`,
                color: PROJECT_COLORS[p] ?? '#ff4500',
                clipPath: 'polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)',
              }}>{p}</span>
            ))}
          </div>
        </div>
      )}

      {/* Connected skills */}
      {skill.connections.length > 0 && (
        <div>
          <div style={{ fontSize: 10, color: 'rgba(255,245,230,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Connected To</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {skill.connections.slice(0, 6).map(c => {
              const cs = skillMap[c];
              if (!cs) return null;
              return (
                <span key={c} style={{
                  fontSize: 10, padding: '2px 7px',
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${cs.color}44`,
                  color: cs.color,
                  clipPath: 'polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)',
                }}>{cs.label}</span>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main Component ───────────────────────────────────────────────────── */
export default function SkillConstellation() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [dims, setDims] = useState({ w: 800, h: 520 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect;
      setDims({ w: width, h: Math.max(420, Math.min(600, width * 0.62)) });
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const hoveredSkill = hovered ? skillMap[hovered] : null;
  const connectedIds = hoveredSkill ? new Set([...hoveredSkill.connections, hovered!]) : new Set<string>();

  // convert % positions to px
  const px = (s: Skill) => ({
    x: (s.x / 100) * dims.w,
    y: (s.y / 100) * dims.h,
  });

  const nodeRadius = (s: Skill) => {
    const base = Math.max(6, Math.min(14, (s.proficiency / 100) * 14));
    return base;
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <svg
        width={dims.w}
        height={dims.h}
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          {SKILLS.map(s => (
            <radialGradient key={`grad-${s.id}`} id={`grad-${s.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={s.color} stopOpacity="1" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0.3" />
            </radialGradient>
          ))}
          {SKILLS.map(s => (
            <filter key={`glow-${s.id}`} id={`glow-${s.id}`} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          ))}
        </defs>

        {/* ── Edges ── */}
        {EDGES.map(([aId, bId]) => {
          const a = skillMap[aId]; const b = skillMap[bId];
          if (!a || !b) return null;
          const ap = px(a); const bp = px(b);
          const isActive = hovered && (hovered === aId || hovered === bId) && connectedIds.has(aId) && connectedIds.has(bId);
          const isGhosted = hovered && !isActive;

          return (
            <motion.line
              key={`${aId}-${bId}`}
              x1={ap.x} y1={ap.y} x2={bp.x} y2={bp.y}
              stroke={isActive ? (skillMap[hovered!]?.color ?? '#ff4500') : 'rgba(255,100,0,0.18)'}
              strokeWidth={isActive ? 1.5 : 0.8}
              strokeOpacity={isGhosted ? 0.05 : isActive ? 0.8 : 0.35}
              strokeDasharray={isActive ? 'none' : '3 5'}
              animate={{
                stroke: isActive ? (skillMap[hovered!]?.color ?? '#ff4500') : 'rgba(255,100,0,0.18)',
                strokeOpacity: isGhosted ? 0.05 : isActive ? 0.8 : 0.35,
                strokeWidth: isActive ? 1.5 : 0.8,
              }}
              transition={{ duration: 0.25 }}
            />
          );
        })}

        {/* ── Nodes ── */}
        {SKILLS.map(s => {
          const { x, y } = px(s);
          const r = nodeRadius(s);
          const isHovered = hovered === s.id;
          const isConnected = hovered ? connectedIds.has(s.id) : false;
          const isGhosted = hovered && !isConnected;

          return (
            <g
              key={s.id}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Outer glow ring (active) */}
              {isHovered && (
                <motion.circle
                  cx={x} cy={y}
                  initial={{ r: r + 4, opacity: 0 }}
                  animate={{ r: r + 10, opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={1.5}
                />
              )}

              {/* Connected ring */}
              {isConnected && !isHovered && (
                <circle cx={x} cy={y} r={r + 5} fill="none" stroke={s.color} strokeWidth={1} strokeOpacity={0.5} />
              )}

              {/* Main node */}
              <motion.circle
                cx={x} cy={y}
                r={r}
                fill={`url(#grad-${s.id})`}
                stroke={s.color}
                strokeWidth={isHovered ? 2 : 1}
                filter={isHovered ? `url(#glow-${s.id})` : undefined}
                animate={{
                  r: isHovered ? r * 1.35 : r,
                  opacity: isGhosted ? 0.15 : 1,
                  strokeWidth: isHovered ? 2.5 : 1,
                }}
                transition={{ duration: 0.2 }}
              />

              {/* Label */}
              <motion.text
                x={x}
                y={y + r + 13}
                textAnchor="middle"
                style={{
                  fontSize: isHovered ? 11 : 9.5,
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 600,
                  fill: isHovered ? s.color : isConnected ? s.color : 'rgba(255,245,230,0.5)',
                  letterSpacing: '0.03em',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
                animate={{
                  opacity: isGhosted ? 0.1 : 1,
                  fontSize: isHovered ? 11 : 9.5,
                }}
                transition={{ duration: 0.2 }}
              >
                {s.label}
              </motion.text>
            </g>
          );
        })}
      </svg>

      {/* ── Floating tooltip ── */}
      <AnimatePresence>
        {hoveredSkill && (
          <SkillTooltip skill={hoveredSkill} pos={{ x: hoveredSkill.x, y: hoveredSkill.y }} />
        )}
      </AnimatePresence>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '20px', justifyContent: 'center' }}>
        {Object.entries({ language: '#ff4500', mobile: '#3DDC84', framework: '#3178C6', infra: '#FFCA28' }).map(([cat, color]) => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }} />
            <span style={{ fontSize: 10, color: 'rgba(255,245,230,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600 }}>{CATEGORY_LABEL[cat]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
