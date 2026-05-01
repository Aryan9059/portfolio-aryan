'use client';

import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: '5+', label: 'Years Building' },
  { value: '12+', label: 'Apps Shipped' },
  { value: '3', label: 'Platforms' },
  { value: '∞', label: 'Coffees Consumed' },
];

const timeline = [
  { year: '2024', title: 'Senior Android Developer', place: 'Independent', desc: 'Shipping polished consumer apps with Kotlin & Jetpack Compose.' },
  { year: '2023', title: 'Flutter Engineer', place: 'Freelance', desc: 'Cross-platform development for startups across India and SE Asia.' },
  { year: '2022', title: 'CS Undergraduate', place: 'University', desc: 'Deep-dived into systems programming, algorithms, and mobile architecture.' },
  { year: '2020', title: 'First App Published', place: 'Play Store', desc: 'Phi Launcher hit 10K downloads in its first month.' },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="section" ref={sectionRef} style={{ background: 'var(--paper)' }}>
      <div className="container">
        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 80 }}>
          <span className="tag">02 — About</span>
          <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'start' }}>
          {/* Left — bio */}
          <div>
            <h2
              className="display"
              style={{
                fontSize: 'clamp(36px, 4vw, 56px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: 32,
              }}
            >
              Crafting interfaces that{' '}
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>feel inevitable.</em>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 24 }}>
              I'm a mobile-first developer obsessed with the intersection of engineering precision 
              and design craft. Every tap target, every animation curve, every loading state matters.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 48 }}>
              When I'm not building apps, I study interaction patterns from the world's best 
              products — dissecting what makes something feel delightful versus merely functional.
            </p>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.6s ease ${i * 0.1 + 0.2}s, transform 0.6s ease ${i * 0.1 + 0.2}s`,
                    paddingBottom: 24,
                    borderBottom: '1px solid var(--rule)',
                  }}
                >
                  <div
                    className="display"
                    style={{ fontSize: 42, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 8 }}
                  >
                    {s.value}
                  </div>
                  <div className="tag">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — timeline */}
          <div>
            <div className="tag" style={{ marginBottom: 32 }}>Timeline</div>
            <div style={{ position: 'relative' }}>
              {/* vertical rule */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 1,
                background: 'var(--rule)',
              }} />

              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  style={{
                    paddingLeft: 32,
                    paddingBottom: i < timeline.length - 1 ? 40 : 0,
                    position: 'relative',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `opacity 0.6s ease ${i * 0.15 + 0.3}s, transform 0.6s ease ${i * 0.15 + 0.3}s`,
                  }}
                >
                  {/* dot */}
                  <div style={{
                    position: 'absolute',
                    left: -4,
                    top: 6,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: i === 0 ? 'var(--accent)' : 'var(--ink)',
                  }} />
                  <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', marginBottom: 6 }}>{item.year}</div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{item.title}</div>
                  <div className="tag" style={{ marginBottom: 8 }}>{item.place}</div>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;