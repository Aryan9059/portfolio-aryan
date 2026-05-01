'use client';

import { useRef, useEffect, useState } from 'react';

const projects = [
  {
    num: '01',
    title: 'Phi Launcher',
    category: 'Android · Home Launcher',
    year: '2024',
    desc: 'A minimal, opinionated home screen launcher built for focus. Eliminates distractions through intentional constraint. Jetpack Compose, MVVM architecture, custom gesture engine.',
    tags: ['Kotlin', 'Jetpack Compose', 'Android'],
    color: '#1a2035',
    textColor: '#6fb3d3',
    wide: true,
  },
  {
    num: '02',
    title: 'Hype.pass',
    category: 'Android · Security',
    year: '2024',
    desc: 'Zero-knowledge password manager with biometric encryption, breach detection, and a UI that makes security feel effortless rather than burdensome.',
    tags: ['Kotlin', 'AES-256', 'BiometricAPI'],
    color: '#1a1a14',
    textColor: '#f47b23',
    wide: false,
  },
  {
    num: '03',
    title: 'Fizanto Fuzz',
    category: 'Android · Social',
    year: '2023',
    desc: 'Real-time campus social platform with E2E encrypted messaging, ephemeral stories, and a recommendation engine tuned for small communities.',
    tags: ['Kotlin', 'Firebase', 'WebRTC'],
    color: '#1a1220',
    textColor: '#b8a0d0',
    wide: false,
  },
  {
    num: '04',
    title: 'Huddle',
    category: 'Android · Productivity',
    year: '2023',
    desc: 'Team task management with an opinionated workflow. No feature bloat — just the primitives needed to ship. Offline-first with CRDT sync.',
    tags: ['Flutter', 'Dart', 'SQLite'],
    color: '#0f1a18',
    textColor: '#6bb88a',
    wide: true,
  },
];

const ProjectCard = ({ project, visible, index }: { project: typeof projects[0], visible: boolean, index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={project.wide ? '' : ''}
      style={{
        gridColumn: project.wide ? 'span 2' : 'span 1',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s`,
      }}
    >
      <div
        className="project-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: project.color,
          padding: project.wide ? '64px 64px' : '48px 48px',
          minHeight: project.wide ? 320 : 360,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.3s ease',
          transform: hovered ? 'scale(0.99)' : 'scale(1)',
        }}
      >
        {/* Big number watermark */}
        <div
          className="display"
          style={{
            position: 'absolute',
            right: -16,
            bottom: -24,
            fontSize: 180,
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: `1px rgba(255,255,255,0.06)`,
            lineHeight: 1,
            userSelect: 'none',
            transition: 'transform 0.4s ease',
            transform: hovered ? 'translate(-8px, -8px)' : 'translate(0,0)',
          }}
        >
          {project.num}
        </div>

        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            {project.category}
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Content */}
        <div style={{ zIndex: 1 }}>
          <h3
            className="display"
            style={{
              fontSize: project.wide ? 52 : 38,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: 20,
              transition: 'color 0.3s ease',
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: project.wide ? 560 : '100%',
              marginBottom: 32,
              opacity: hovered ? 1 : 0.7,
              transition: 'opacity 0.3s ease',
            }}
          >
            {project.desc}
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {project.tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: project.textColor,
                  border: `1px solid ${project.textColor}40`,
                  padding: '5px 12px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            position: 'absolute',
            top: 48,
            right: 48,
            width: 40,
            height: 40,
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 18,
            transition: 'all 0.3s ease',
            transform: hovered ? 'rotate(45deg)' : 'rotate(0)',
            background: hovered ? 'rgba(255,255,255,0.1)' : 'transparent',
          }}
        >
          ↗
        </div>
      </div>
    </div>
  );
};

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="work" className="section" ref={sectionRef} style={{ background: 'var(--paper-dark)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 64 }}>
          <span className="tag">03 — Selected Work</span>
          <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
          <span className="tag" style={{ opacity: 0.5 }}>2020 – 2025</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.num} project={p} visible={visible} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;