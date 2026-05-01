'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      background: scrolled ? 'rgba(245,240,232,0.92)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(10,10,8,0.12)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <div className="display" style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>
        A·S
      </div>
      <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
        {['Work', 'About', 'Stack', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="tag"
            style={{
              color: 'var(--ink)',
              textDecoration: 'none',
              opacity: 0.7,
              transition: 'opacity 0.2s',
              fontSize: 11,
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
          >
            {item}
          </a>
        ))}
        <a
          href="mailto:aryan@example.com"
          style={{
            background: 'var(--ink)',
            color: 'var(--paper)',
            padding: '8px 20px',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            fontFamily: "'DM Mono', monospace",
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
};

export default Nav;