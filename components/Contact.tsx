'use client';

import { useState } from 'react';

const Contact = () => {
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText('aryan.srivastava@example.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = [
        { label: 'GitHub', handle: '@Aryan9059', url: 'https://github.com/Aryan9059' },
        { label: 'Twitter / X', handle: '@cute__flame', url: 'https://x.com/cute__flame' },
        { label: 'LinkedIn', handle: 'aryan-srivastava9059', url: 'https://www.linkedin.com/in/aryan-srivastava9059/' },
    ];

    return (
        <>
            {/* Contact */}
            <section id="contact" className="section" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 80 }}>
                        <span className="tag" style={{ color: 'rgba(245,240,232,0.4)' }}>05 — Contact</span>
                        <div style={{ flex: 1, height: 1, background: 'rgba(245,240,232,0.1)' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'start' }}>
                        <div>
                            <h2
                                className="display"
                                style={{
                                    fontSize: 'clamp(48px, 6vw, 88px)',
                                    fontWeight: 900,
                                    lineHeight: 0.95,
                                    letterSpacing: '-0.04em',
                                    marginBottom: 32,
                                }}
                            >
                                Let's build something{' '}
                                <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>worth using.</em>
                            </h2>
                            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(245,240,232,0.55)', maxWidth: 400 }}>
                                Open to full-time roles, freelance projects, and interesting problems.
                                I respond fast and I don't ghost.
                            </p>
                        </div>

                        <div>
                            {/* Email */}
                            <div style={{ marginBottom: 48 }}>
                                <div className="tag" style={{ color: 'rgba(245,240,232,0.35)', marginBottom: 16 }}>Direct line</div>
                                <button
                                    onClick={copyEmail}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 16,
                                        color: 'var(--paper)',
                                    }}
                                >
                                    <span
                                        className="display"
                                        style={{ fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 600, letterSpacing: '-0.02em' }}
                                    >
                                        aryan.srivastava@example.com
                                    </span>
                                    <span
                                        className="mono"
                                        style={{
                                            fontSize: 10,
                                            padding: '4px 12px',
                                            border: '1px solid rgba(245,240,232,0.2)',
                                            color: copied ? 'var(--accent)' : 'rgba(245,240,232,0.4)',
                                            transition: 'color 0.2s',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {copied ? 'Copied!' : 'Copy'}
                                    </span>
                                </button>
                            </div>

                            {/* Links */}
                            <div>
                                <div className="tag" style={{ color: 'rgba(245,240,232,0.35)', marginBottom: 24 }}>Find me online</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                    {links.map((link, i) => (
                                        <a
                                            key={link.label}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '18px 0',
                                                borderBottom: i < links.length - 1 ? '1px solid rgba(245,240,232,0.08)' : 'none',
                                                textDecoration: 'none',
                                                color: 'var(--paper)',
                                                transition: 'opacity 0.2s',
                                            }}
                                            onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
                                            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                                        >
                                            <span style={{ fontWeight: 500, fontSize: 15 }}>{link.label}</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <span className="mono" style={{ fontSize: 12, color: 'rgba(245,240,232,0.4)' }}>{link.handle}</span>
                                                <span style={{ opacity: 0.4 }}>↗</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                background: 'var(--ink)',
                borderTop: '1px solid rgba(245,240,232,0.08)',
                padding: '32px 48px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 16,
            }}>
                <span className="display" style={{ color: 'var(--paper)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>
                    A·S
                </span>
                <span className="tag" style={{ color: 'rgba(245,240,232,0.3)' }}>
                    © 2025 Aryan Srivastava — Designed & built with obsession.
                </span>
                <a
                    href="#hero"
                    className="tag"
                    style={{ color: 'rgba(245,240,232,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--paper)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.3)')}
                >
                    Back to top ↑
                </a>
            </footer>
        </>
    );
};

export default Contact;