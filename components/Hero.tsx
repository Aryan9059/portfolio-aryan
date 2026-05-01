'use client';

import { useEffect, useRef } from 'react';

const Hero = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.style.width = '100%';
    }
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 48px',
        paddingTop: 120,
        paddingBottom: 64,
        borderBottom: '1px solid var(--rule-heavy)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background number */}
      <div
        className="display"
        style={{
          position: 'absolute',
          right: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(200px, 25vw, 380px)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(10,10,8,0.06)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        AS
      </div>

      {/* Top label row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 80 }}>
        <div>
          <div className="tag" style={{ marginBottom: 8 }}>Portfolio — 2025</div>
          <div className="tag" style={{ color: 'var(--accent)', letterSpacing: '0.08em' }}>Mumbai, India</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="tag" style={{ marginBottom: 8 }}>Availability</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#4a9b6f',
              animation: 'float 2s ease-in-out infinite',
            }} />
            <span className="mono" style={{ fontSize: 11, color: '#4a9b6f' }}>Open to work</span>
          </div>
        </div>
      </div>

      {/* Main heading */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1
          className="display animate-fade-up"
          style={{
            fontSize: 'clamp(52px, 9vw, 132px)',
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            margin: 0,
            marginBottom: 4,
          }}
        >
          Aryan
        </h1>
        <h1
          className="display animate-fade-up delay-100"
          style={{
            fontSize: 'clamp(52px, 9vw, 132px)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            margin: 0,
            marginBottom: 40,
            color: 'var(--accent)',
          }}
        >
          Srivastava
        </h1>

        {/* Divider line with animation */}
        <div style={{ height: 1, background: 'var(--rule-heavy)', marginBottom: 32, overflow: 'hidden' }}>
          <div
            ref={lineRef}
            style={{
              height: '100%',
              background: 'var(--ink)',
              width: '0%',
              transition: 'width 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
            }}
          />
        </div>

        {/* Bottom row */}
        <div
          className="animate-fade-up delay-300"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}
        >
          <div style={{ maxWidth: 480 }}>
            <p style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: 'var(--muted)',
              margin: 0,
              fontWeight: 400,
            }}>
              Android Native developer crafting precise, high-performance mobile experiences. 
              I obsess over motion, polish, and production-ready code.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a
              href="#work"
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                padding: '14px 32px',
                textDecoration: 'none',
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--ink)')}
            >
              View Work ↓
            </a>
            <a
              href="#contact"
              style={{
                border: '1px solid var(--ink)',
                color: 'var(--ink)',
                padding: '14px 32px',
                textDecoration: 'none',
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--paper)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="animate-fade-in delay-700"
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div className="tag" style={{ opacity: 0.4 }}>Scroll</div>
        <div style={{
          width: 1,
          height: 48,
          background: 'var(--ink)',
          opacity: 0.25,
          animation: 'float 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
};

export default Hero;