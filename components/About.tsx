'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import {
  SiKotlin, SiAndroid, SiJetpackcompose, SiTypescript, SiNextdotjs,
  SiReact, SiPython, SiDocker, SiPostgresql, SiFirebase, SiGit,
  SiSpringboot, SiFastapi, SiPrisma, SiApachekafka, SiSupabase,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import SpotlightCard from '@/components/ui/SpotlightCard';

// ── Stats ────────────────────────────────────────────────────────────────
const stats = [
  { value: '10+',  label: 'Projects',     color: '#7F52FF' },
  { value: '9.67', label: 'Cumulative GPA',  color: '#ff4500' },
  { value: '1.5L+',   label: 'Revenue Generated',        color: '#3ECF8E' },
  { value: '5th',  label: 'Semester Student',   color: '#FFCA28' },
];

// ── Tech icon cloud ───────────────────────────────────────────────────────
const techIcons = [
  { Icon: SiKotlin,        color: '#7F52FF', label: 'Kotlin',          size: 32 },
  { Icon: SiAndroid,       color: '#3DDC84', label: 'Android',         size: 28 },
  { Icon: SiJetpackcompose,color: '#4285F4', label: 'Jetpack Compose', size: 28 },
  { Icon: SiTypescript,    color: '#3178C6', label: 'TypeScript',      size: 26 },
  { Icon: SiNextdotjs,     color: '#ffffff', label: 'Next.js',         size: 26 },
  { Icon: SiReact,         color: '#61DAFB', label: 'React',           size: 26 },
  { Icon: SiPython,        color: '#3572A5', label: 'Python',          size: 24 },
  { Icon: FaJava,          color: '#ED8B00', label: 'Java',            size: 24 },
  { Icon: SiDocker,        color: '#2496ED', label: 'Docker',          size: 24 },
  { Icon: SiPostgresql,    color: '#336791', label: 'PostgreSQL',      size: 22 },
  { Icon: SiFirebase,      color: '#FFCA28', label: 'Firebase',        size: 22 },
  { Icon: SiGit,           color: '#F05032', label: 'Git',             size: 22 },
  { Icon: SiSpringboot,    color: '#6DB33F', label: 'Spring Boot',     size: 20 },
  { Icon: SiFastapi,       color: '#059669', label: 'FastAPI',         size: 20 },
  { Icon: SiPrisma,        color: '#5A67D8', label: 'Prisma',          size: 20 },
  { Icon: SiApachekafka,   color: '#ff4500', label: 'Kafka',           size: 20 },
  { Icon: SiSupabase,      color: '#3ECF8E', label: 'Supabase',        size: 20 },
];

// ── LeetCode Heatmap ─────────────────────────────────────────────────────
type CalendarData = {
  streak: number;
  totalActiveDays: number;
  submissionCalendar: string;
  activeYears: number[];
};

function LeetCodeHeatmap() {
  const [data, setData]       = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

  useEffect(() => {
    fetch('/api/leetcode')
      .then(r => r.json())
      .then(d => { if (d.calendar) setData(d.calendar); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Build last-365-days grid
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const DAYS  = 365;
  const start = new Date(today);
  start.setDate(start.getDate() - DAYS + 1);

  const calMap: Record<string, number> = {};
  if (data?.submissionCalendar) {
    try {
      const raw = JSON.parse(data.submissionCalendar);
      for (const [ts, count] of Object.entries(raw)) {
        const d = new Date(Number(ts) * 1000);
        d.setHours(0, 0, 0, 0);
        calMap[d.toISOString().slice(0, 10)] = count as number;
      }
    } catch {}
  }

  const days: { date: string; count: number; col: number; row: number }[] = [];
  for (let i = 0; i < DAYS; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    // offset so week starts on Sunday
    const startOffset = start.getDay();
    const absCol = Math.floor((i + startOffset) / 7);
    const absRow = (i + startOffset) % 7;
    days.push({ date: dateStr, count: calMap[dateStr] ?? 0, col: absCol, row: absRow });
  }
  const totalCols = Math.max(...days.map(d => d.col)) + 1;

  const cellSize = 11;
  const gap = 2;
  const svgW = totalCols * (cellSize + gap);
  const svgH = 7 * (cellSize + gap);

  function intensity(count: number) {
    if (count === 0)  return 'rgba(255,100,0,0.07)';
    if (count <= 2)   return 'rgba(255,100,0,0.30)';
    if (count <= 5)   return 'rgba(255,100,0,0.55)';
    if (count <= 10)  return 'rgba(255,100,0,0.78)';
    return '#ff4500';
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 12, color: 'var(--accent-2)', letterSpacing: '0.18em' }}>◆ LEETCODE · cuteFlame</span>
        {data && (
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { v: data.streak,         l: 'day streak' },
              { v: data.totalActiveDays, l: 'active days' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 18, color: '#ff4500', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.l}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div style={{ height: svgH, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2 }}
            style={{ fontSize: 12, color: 'var(--muted)', fontFamily: "'Caesar Dressing', cursive", letterSpacing: '0.15em' }}>
            LOADING…
          </motion.div>
        </div>
      ) : (
        <div style={{ position: 'relative', overflowX: 'auto' }}>
          <svg width={svgW} height={svgH} style={{ display: 'block' }}>
            {days.map((d, i) => {
              const x = d.col * (cellSize + gap);
              const y = d.row * (cellSize + gap);
              return (
                <rect
                  key={i}
                  x={x} y={y}
                  width={cellSize} height={cellSize}
                  rx={2}
                  fill={intensity(d.count)}
                  style={{ cursor: d.count > 0 ? 'pointer' : 'default', transition: 'fill 0.1s' }}
                  onMouseEnter={e => {
                    const rect = (e.target as SVGRectElement).getBoundingClientRect();
                    setHoveredDay({ date: d.date, count: d.count, x: rect.left, y: rect.top });
                    (e.target as SVGRectElement).setAttribute('stroke', '#ff4500');
                    (e.target as SVGRectElement).setAttribute('stroke-width', '1');
                  }}
                  onMouseLeave={e => {
                    setHoveredDay(null);
                    (e.target as SVGRectElement).removeAttribute('stroke');
                    (e.target as SVGRectElement).removeAttribute('stroke-width');
                  }}
                />
              );
            })}
          </svg>
          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, justifyContent: 'flex-end' }}>
            <span style={{ fontSize: 9, color: 'var(--muted)', marginRight: 4 }}>Less</span>
            {[0, 2, 5, 10, 15].map(v => (
              <div key={v} style={{ width: 9, height: 9, borderRadius: 2, background: intensity(v) }} />
            ))}
            <span style={{ fontSize: 9, color: 'var(--muted)', marginLeft: 4 }}>More</span>
          </div>
        </div>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', left: hoveredDay.x + 16, top: hoveredDay.y - 36,
              zIndex: 9999, pointerEvents: 'none',
              background: 'rgba(10,4,0,0.95)', border: '1px solid rgba(255,100,0,0.4)',
              padding: '5px 10px', fontSize: 11,
              fontFamily: "'Instrument Sans', sans-serif",
              color: '#fff5e6', whiteSpace: 'nowrap',
              clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)',
            }}
          >
            <span style={{ color: '#ff4500', fontWeight: 700 }}>{hoveredDay.count} submission{hoveredDay.count !== 1 ? 's' : ''}</span>
            <span style={{ color: 'var(--muted)', marginLeft: 6 }}>{hoveredDay.date}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Working Terminal ──────────────────────────────────────────────────────
type HistoryLine = { type: 'cmd' | 'out' | 'err'; text: string };

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    '  <span style="color:#ff6b00">whoami</span>         → About me',
    '  <span style="color:#ff6b00">skills</span>         → Tech stack summary',
    '  <span style="color:#ff6b00">experience</span>     → Work & internship history',
    '  <span style="color:#ff6b00">projects</span>       → Project highlights',
    '  <span style="color:#ff6b00">education</span>      → Academic background',
    '  <span style="color:#ff6b00">contact</span>        → How to reach me',
    '  <span style="color:#ff6b00">achievements</span>   → Awards & milestones',
    '  <span style="color:#ff6b00">clear</span>          → Clear terminal',
  ],
  whoami: () => [
    '  <span style="color:#fff5e6;font-weight:700">Aryan Srivastava</span>',
    '  Android & Full-Stack Developer',
    '  B.Tech IT · IIIT Allahabad · 2022 – 2026',
    '  <span style="color:var(--muted)">Obsessed with shipping apps that feel alive.</span>',
  ],
  skills: () => [
    '  <span style="color:#7F52FF">▸ Mobile</span>    Kotlin, Jetpack Compose, Android SDK, MVVM',
    '  <span style="color:#3178C6">▸ Web</span>       TypeScript, Next.js, React, Express.js',
    '  <span style="color:#3572A5">▸ Backend</span>   FastAPI, Spring Boot, GraphQL, REST',
    '  <span style="color:#336791">▸ Data</span>      PostgreSQL, Supabase, Firebase, Prisma, Room',
    '  <span style="color:#2496ED">▸ DevOps</span>    Docker, Kafka, Git, GitHub Actions',
  ],
  experience: () => [
    '  <span style="color:#ff4500;font-weight:700">Android Developer — Phi Launcher (Solo)</span>    2024 – Present',
    '  <span style="color:var(--muted)">  27K+ downloads, ₹1.5L+ revenue, 4.4★ Play Store</span>',
    '',
    '  <span style="color:#ff4500;font-weight:700">Full-Stack Developer — PixelFi (Solo)</span>       2024',
    '  <span style="color:var(--muted)">  Microservices · Kafka · ML predictions · Docker</span>',
    '',
    '  <span style="color:#ff4500;font-weight:700">Full-Stack Developer — GradLoop (Solo)</span>      2024',
    '  <span style="color:var(--muted)">  AI resume gen · Real-time chat · Supabase</span>',
  ],
  projects: () => [
    '  <span style="color:#7F52FF">01 Phi Launcher</span>    Android launcher · 27K+ downloads',
    '  <span style="color:#9932CC">02 PixelFi</span>         FinTech · ML · Kafka microservices',
    '  <span style="color:#3ECF8E">03 GradLoop</span>        Alumni networking · Mistral AI',
    '  <span style="color:#7F52FF">04 HypeUI</span>          Compose component library',
    '  <span style="color:#39FF14">05 NotifiQ</span>         Smart notification manager',
    '  <span style="color:#F7DF1E">06 CodeRunner</span>      Browser IDE · 40+ languages',
    '  <span style="color:var(--muted)">  → visit <a href="/projects" style="color:#ff4500">/projects</a> for full details',
  ],
  education: () => [
    '  <span style="color:#fff5e6;font-weight:700">B.Tech in Information Technology</span>',
    '  Indian Institute of Information Technology, Allahabad',
    '  2022 – 2026  ·  CGPA: 7.8/10',
    '',
    '  Relevant coursework: DSA, OOP, OS, DBMS,',
    '  Computer Networks, System Design, ML Fundamentals',
  ],
  contact: () => [
    '  <span style="color:#ff6b00">📧 Email</span>      aryan.s.dev@gmail.com',
    '  <span style="color:#ffffff">⌥ GitHub</span>     github.com/Aryan9059',
    '  <span style="color:#0A66C2">🔗 LinkedIn</span>   linkedin.com/in/aryan-srivastava905',
    '  <span style="color:#F7DF1E">🏆 LeetCode</span>  leetcode.com/u/cuteFlame',
  ],
  achievements: () => [
    '  <span style="color:#FFCA28">★</span> 27,000+ Play Store downloads (organic)',
    '  <span style="color:#FFCA21">★</span> ₹1.5L+ gross revenue — Phi Launcher',
    '  <span style="color:#ff4500">★</span> 4.4/5.0 Play Store rating',
    '  <span style="color:#3DDC84">★</span> 108-day LeetCode streak',
    '  <span style="color:#3178C6">★</span> 223 LeetCode active days',
    '  <span style="color:#7F52FF">★</span> Published open-source Compose library (HypeUI)',
  ],
  clear: () => [],
};

const BANNER = [
  '<span style="color:#ff4500">██╗  ██╗███████╗██╗   ██╗</span>',
  '<span style="color:#ff6b00">██║  ██║██╔════╝╚██╗ ██╔╝</span>',
  '<span style="color:#ffaa00">██████║█████╗   ╚████╔╝</span>',
  '<span style="color:#ff6b00">██╔══██║██╔══╝    ╚██╔╝</span>',
  '<span style="color:#ff4500">██║  ██║███████╗   ██║</span>',
  '<span style="color:#ff4500">╚═╝  ╚═╝╚══════╝   ╚═╝</span>',
  '',
  '  <span style="color:#fff5e6">Aryan Srivastava</span> · <span style="color:var(--muted)">Android & Full-Stack Dev</span>',
  '  Type <span style="color:#ff6b00">help</span> to see available commands.',
  '',
];

function Terminal() {
  const [history, setHistory]     = useState<HistoryLine[]>(
    BANNER.map(t => ({ type: 'out' as const, text: t }))
  );
  const [input, setInput]         = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx]     = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    // Skip scroll on initial mount — only scroll when new output is added
    if (!hasMounted.current) { hasMounted.current = true; return; }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const run = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory(prev => [cmd, ...prev]);
    setHistIdx(-1);

    if (cmd === 'clear') {
      setHistory(BANNER.map(t => ({ type: 'out' as const, text: t })));
      return;
    }

    const lines: HistoryLine[] = [{ type: 'cmd', text: raw.trim() }];
    const fn = COMMANDS[cmd];
    if (fn) {
      fn().forEach(t => lines.push({ type: 'out', text: t }));
    } else {
      lines.push({ type: 'err', text: `  Command not found: <span style="color:#ff4500">${cmd}</span>. Type <span style="color:#ff6b00">help</span>.` });
    }
    lines.push({ type: 'out', text: '' });
    setHistory(prev => [...prev, ...lines]);
  }, []);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : cmdHistory[next]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = Object.keys(COMMANDS).filter(k => k.startsWith(input.toLowerCase()));
      if (matches.length === 1) setInput(matches[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      style={{ background: '#040200', border: '2px solid rgba(255,100,0,0.4)', fontFamily: "'Courier New', monospace", overflow: 'hidden' }}
    >
      {/* Title bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderBottom: '1px solid rgba(255,100,0,0.2)', background: 'rgba(255,60,0,0.06)' }}>
        {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 6, fontFamily: "'Instrument Sans', sans-serif" }}>aryan@dev — bash</span>
      </div>

      {/* Output area */}
      <div
        onClick={() => inputRef.current?.focus()}
        style={{ padding: '14px 16px 4px', height: 280, overflowY: 'auto', cursor: 'text', scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,69,0,0.3) transparent' }}
      >
        {history.map((line, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', minHeight: '1.6em' }}>
            {line.type === 'cmd' && (
              <span style={{ color: '#ff4500', marginRight: 8, flexShrink: 0, userSelect: 'none' }}>❯</span>
            )}
            <span
              style={{
                fontSize: 12, lineHeight: 1.7,
                color: line.type === 'err' ? '#ff5f57' : line.type === 'cmd' ? '#fff5e6' : 'rgba(255,245,230,0.65)',
                wordBreak: 'break-word',
              }}
              dangerouslySetInnerHTML={{ __html: line.text }}
            />
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '6px 16px 12px', gap: 8 }}>
        <span style={{ color: '#ff4500', fontSize: 13, flexShrink: 0, userSelect: 'none' }}>❯</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoComplete="off"
          placeholder="type a command…"
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: '#fff5e6', fontSize: 12, fontFamily: "'Courier New', monospace",
            caretColor: '#ff4500',
          }}
        />
        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.9 }}
          style={{ color: '#ff4500', fontSize: 14, userSelect: 'none' }}>▌</motion.span>
      </div>
    </motion.div>
  );
}

// ── Tech Icon Cluster ─────────────────────────────────────────────────────
function TechIconCloud() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div>
      <p style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 12, color: 'var(--accent-2)', letterSpacing: '0.2em', marginBottom: 16 }}>◆ TECH STACK</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {techIcons.map(({ Icon, color, label, size }) => (
          <motion.div
            key={label}
            onMouseEnter={() => setHovered(label)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ scale: 1.18, y: -3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            title={label}
            style={{
              width: 44, height: 44,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              background: `${color}12`,
              border: `1px solid ${hovered === label ? color : color + '30'}`,
              boxShadow: hovered === label ? `0 0 12px ${color}55` : 'none',
              cursor: 'default',
              transition: 'border-color 0.15s, box-shadow 0.15s',
              position: 'relative',
            }}
          >
            <Icon size={size} color={color} style={{ filter: `drop-shadow(0 0 3px ${color}66)` }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────
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

      <div className="halftone" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        <motion.div className="section-label" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          01 — ABOUT ME
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'start' }}>

          {/* ── LEFT ── */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -40, skewX: -3 }}
              whileInView={{ opacity: 1, x: 0, skewX: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 0.95, color: '#fff5e6', textShadow: '3px 3px 0 #ff4500', marginBottom: '24px' }}
            >
              WHO<br />
              <span style={{ color: 'var(--accent-2)', WebkitTextStroke: '1px #ff4500' }}>AM I?</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '20px', marginBottom: '32px' }}
            >
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,245,230,0.75)', marginBottom: '12px' }}>
                Besides studying IT at IIIT Allahabad, I like to develop projects and apps that feels cool and solves a <em style={{ color: 'var(--accent-2)', fontStyle: 'normal', fontWeight: 700 }}>problem</em>.
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,245,230,0.6)', fontStyle: 'italic' }}>
                &quot;The blazing fire makes flames and brightness out of everything thrown into it.&quot; - Marcus Aurelius
              </p>
            </motion.div>

            {/* Working terminal */}
            <Terminal />
          </div>

          {/* ── RIGHT ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* Stat panels */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {stats.map((s, i) => (
                <motion.div key={i} custom={i} variants={panelVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <SpotlightCard
                    spotlightColor="rgba(255,100,0,0.15)"
                    style={{ background: 'var(--surface-2)', border: '2px solid rgba(255,80,0,0.4)', padding: '22px 18px', position: 'relative', overflow: 'hidden' }}
                  >
                    <div style={{ position: 'absolute', top: 0, right: 0, width: 20, height: 20, background: s.color, clipPath: 'polygon(0 0,100% 0,100% 100%)' }} />
                    <div style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 'clamp(26px,3.5vw,38px)', color: s.color, lineHeight: 1, marginBottom: 6, textShadow: `2px 2px 0 ${s.color}44` }}>{s.value}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.label}</div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>

            {/* Tech icon cloud */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <SpotlightCard spotlightColor="rgba(255,100,0,0.08)"
                style={{ background: 'var(--surface-2)', border: '1.5px solid rgba(255,80,0,0.25)', padding: '20px' }}>
                <TechIconCloud />
              </SpotlightCard>
            </motion.div>

            {/* LeetCode heatmap */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
              <SpotlightCard spotlightColor="rgba(255,69,0,0.1)"
                style={{ background: 'var(--surface-2)', border: '1.5px solid rgba(255,80,0,0.25)', padding: '20px' }}>
                <LeetCodeHeatmap />
              </SpotlightCard>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}