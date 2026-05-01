'use client';

import { useRef, useEffect, useState } from 'react';

const stackGroups = [
  {
    category: 'Mobile',
    skills: [
      { name: 'Kotlin & Android Native', level: 98 },
      { name: 'Jetpack Compose', level: 95 },
      { name: 'Flutter & Dart', level: 85 },
      { name: 'SwiftUI', level: 65 },
    ],
  },
  {
    category: 'Backend & Data',
    skills: [
      { name: 'Firebase Suite', level: 90 },
      { name: 'Supabase / PostgreSQL', level: 78 },
      { name: 'REST & GraphQL APIs', level: 85 },
      { name: 'MongoDB', level: 70 },
    ],
  },
  {
    category: 'Tools & Craft',
    skills: [
      { name: 'Figma / Design Systems', level: 88 },
      { name: 'React & Next.js', level: 80 },
      { name: 'Git / CI/CD', level: 92 },
      { name: 'Mixpanel / Analytics', level: 75 },
    ],
  },
];

const SkillRow = ({ name, level, visible, delay }: { name: string; level: number; visible: boolean; delay: number }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'baseline' }}>
      <span style={{ fontSize: 14, fontWeight: 500 }}>{name}</span>
      <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{level}%</span>
    </div>
    <div className="skill-bar">
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          background: 'var(--ink)',
          width: visible ? `${level}%` : '0%',
          transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        }}
      />
    </div>
  </div>
);

const Stack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stack" className="section" ref={sectionRef} style={{ background: 'var(--paper)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 80 }}>
          <span className="tag">04 — Stack & Skills</span>
          <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
          {/* Left: headline */}
          <div>
            <h2
              className="display"
              style={{
                fontSize: 'clamp(32px, 3.5vw, 48px)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: 24,
              }}
            >
              Tools I trust with production code.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--muted)' }}>
              Carefully chosen for performance, reliability, and the ability to ship 
              beautiful things quickly. No hype, only proven tools.
            </p>

            {/* Philosophy cards */}
            <div style={{ marginTop: 48 }}>
              {[
                { icon: '◈', title: 'Composable', body: 'Systems built to scale without entropy.' },
                { icon: '◉', title: 'Instrumented', body: 'Analytics in every component from day one.' },
                { icon: '◎', title: 'Offline-first', body: 'Apps that work when the signal doesn\'t.' },
              ].map(item => (
                <div
                  key={item.title}
                  style={{
                    display: 'flex',
                    gap: 20,
                    marginBottom: 28,
                    paddingBottom: 28,
                    borderBottom: '1px solid var(--rule)',
                  }}
                >
                  <span style={{ fontSize: 20, flexShrink: 0, color: 'var(--accent)', marginTop: 2 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: skill bars */}
          <div>
            {stackGroups.map((group, gi) => (
              <div key={group.category} style={{ marginBottom: gi < stackGroups.length - 1 ? 56 : 0 }}>
                <div className="tag" style={{ marginBottom: 28 }}>{group.category}</div>
                {group.skills.map((skill, si) => (
                  <SkillRow
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    visible={visible}
                    delay={gi * 0.2 + si * 0.08 + 0.2}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stack;