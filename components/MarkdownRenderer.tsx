'use client';
import React, { CSSProperties } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';

// ── Theme tokens that match the site's manga/amber design system ──────────────
const ink = '#fff5e6';
const inkMuted = 'rgba(255,245,230,0.65)';
const inkDim = 'rgba(255,245,230,0.42)';
const surface = 'rgba(0,0,0,0.45)';
const ruleColor = 'rgba(255,100,0,0.15)';
const fontMono = "'Courier New', Courier, monospace";
const fontSans = "'Instrument Sans', sans-serif";
const fontDisplay = "'Caesar Dressing', cursive";

// ── Build component overrides per-accent ─────────────────────────────────────
function buildComponents(accent: string): Components {
  const accentFaint = `${accent}18`;
  const accentBorder = `${accent}30`;
  const accentBorderStrong = `${accent}50`;

  return {
    // ── Headings ──────────────────────────────────────────────────────────────
    h1: ({ children }) => (
      <h1 style={{
        fontFamily: fontDisplay,
        fontSize: 'clamp(22px, 4vw, 30px)',
        color: ink,
        textShadow: `2px 2px 0 ${accent}`,
        margin: '8px 0 20px',
        lineHeight: 1.2,
        letterSpacing: '0.03em',
      }}>
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <div style={{ marginTop: 28, marginBottom: 14 }}>
        <h2 style={{
          fontFamily: fontDisplay,
          fontSize: 18,
          color: accent,
          letterSpacing: '0.06em',
          lineHeight: 1.3,
        }}>
          {children}
        </h2>
        <div style={{
          height: 1,
          background: `linear-gradient(90deg, ${accent}55, transparent)`,
          marginTop: 6,
        }} />
      </div>
    ),

    h3: ({ children }) => (
      <h3 style={{
        fontFamily: fontDisplay,
        fontSize: 14,
        color: ink,
        marginTop: 20,
        marginBottom: 10,
        letterSpacing: '0.05em',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{ color: accent }}>◆</span>
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 style={{
        fontFamily: fontSans,
        fontWeight: 700,
        fontSize: 13,
        color: inkMuted,
        marginTop: 16,
        marginBottom: 8,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        {children}
      </h4>
    ),

    // ── Paragraph ─────────────────────────────────────────────────────────────
    p: ({ children }) => (
      <p style={{
        fontFamily: fontSans,
        fontSize: 13,
        lineHeight: 1.85,
        color: inkMuted,
        marginBottom: 14,
      }}>
        {children}
      </p>
    ),

    // ── Inline code ───────────────────────────────────────────────────────────
    code: ({ children, className, ...props }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code style={{
            background: accentFaint,
            border: `1px solid ${accentBorder}`,
            borderRadius: 3,
            padding: '1px 6px',
            fontSize: '0.84em',
            color: accent,
            fontFamily: fontMono,
          }} {...props}>
            {children}
          </code>
        );
      }
      // block code (handled by <pre> below)
      return <code className={className} {...props}>{children}</code>;
    },

    // ── Code block ────────────────────────────────────────────────────────────
    pre: ({ children }) => {
      // Extract language label from child code element's className
      let lang = '';
      if (React.isValidElement(children)) {
        const childEl = children as React.ReactElement<{ className?: string }>;
        const cls = childEl.props?.className ?? '';
        const match = cls.match(/language-(\w+)/);
        if (match) lang = match[1];
      }
      return (
        <div style={{ marginBottom: 20, position: 'relative' }}>
          {lang && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: 9,
              fontFamily: fontSans,
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: accent,
              background: accentFaint,
              border: `1px solid ${accentBorder}`,
              borderBottom: 'none',
              padding: '3px 10px',
            }}>
              {lang}
            </div>
          )}
          <pre style={{
            background: surface,
            border: `1px solid ${ruleColor}`,
            borderTop: lang ? `1px solid ${accentBorder}` : undefined,
            padding: '14px 16px',
            overflowX: 'auto',
            fontSize: 12,
            lineHeight: 1.75,
            color: 'rgba(255,245,230,0.85)',
            fontFamily: fontMono,
            margin: 0,
          }}>
            {children}
          </pre>
        </div>
      );
    },

    // ── Blockquote ────────────────────────────────────────────────────────────
    blockquote: ({ children }) => (
      <blockquote style={{
        borderLeft: `3px solid ${accent}`,
        background: accentFaint,
        padding: '10px 16px',
        margin: '16px 0',
        borderRadius: '0 3px 3px 0',
      }}>
        <div style={{
          fontSize: 13,
          color: inkDim,
          lineHeight: 1.7,
          fontStyle: 'italic',
          fontFamily: fontSans,
        }}>
          {children}
        </div>
      </blockquote>
    ),

    // ── Lists ─────────────────────────────────────────────────────────────────
    ul: ({ children }) => (
      <ul style={{
        paddingLeft: 0,
        marginBottom: 16,
        listStyle: 'none',
      }}>
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol style={{
        paddingLeft: 20,
        marginBottom: 16,
        color: inkMuted,
        fontSize: 13,
        lineHeight: 1.85,
      }}>
        {children}
      </ol>
    ),

    li: ({ children, ...props }) => {
      // Detect if parent is ordered list via props
      const isOrdered = (props as { ordered?: boolean }).ordered;
      if (isOrdered) {
        return (
          <li style={{
            fontSize: 13,
            lineHeight: 1.85,
            color: inkMuted,
            marginBottom: 3,
          }}>
            {children}
          </li>
        );
      }
      return (
        <li style={{
          fontSize: 13,
          lineHeight: 1.85,
          color: inkMuted,
          marginBottom: 3,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
        }}>
          <span style={{ color: accent, flexShrink: 0, marginTop: 2 }}>▸</span>
          <span>{children}</span>
        </li>
      );
    },

    // ── Horizontal rule ───────────────────────────────────────────────────────
    hr: () => (
      <div style={{
        height: 1,
        background: `linear-gradient(90deg, ${accent}40, transparent)`,
        margin: '24px 0',
      }} />
    ),

    // ── Table (GFM) ───────────────────────────────────────────────────────────
    table: ({ children }) => (
      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 12,
          fontFamily: fontSans,
        }}>
          {children}
        </table>
      </div>
    ),

    thead: ({ children }) => (
      <thead style={{ background: accentFaint }}>
        {children}
      </thead>
    ),

    tbody: ({ children }) => <tbody>{children}</tbody>,

    tr: ({ children }) => (
      <tr style={{ borderBottom: `1px solid ${ruleColor}` }}>
        {children}
      </tr>
    ),

    th: ({ children }) => (
      <th style={{
        padding: '8px 14px',
        textAlign: 'left',
        background: accentFaint,
        border: `1px solid ${accentBorder}`,
        color: accent,
        fontFamily: fontDisplay,
        fontSize: 11,
        letterSpacing: '0.1em',
        fontWeight: 700,
      }}>
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td style={{
        padding: '8px 14px',
        border: `1px solid ${ruleColor}`,
        color: inkMuted,
        fontSize: 12,
        lineHeight: 1.6,
        verticalAlign: 'top',
      }}>
        {children}
      </td>
    ),

    // ── Links ─────────────────────────────────────────────────────────────────
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: accent,
          textDecoration: 'underline',
          textDecorationColor: `${accent}50`,
          textUnderlineOffset: 3,
          transition: 'color 0.15s, text-decoration-color 0.15s',
          fontFamily: fontSans,
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.color = ink;
          (e.currentTarget as HTMLAnchorElement).style.textDecorationColor = ink;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.color = accent;
          (e.currentTarget as HTMLAnchorElement).style.textDecorationColor = `${accent}50`;
        }}
      >
        {children}
      </a>
    ),

    // ── Images ────────────────────────────────────────────────────────────────
    img: ({ src, alt, width, height }) => (
      <span style={{ display: 'inline-block', verticalAlign: 'middle', margin: '4px 4px' }}>
        <img
          src={src ?? ''}
          alt={alt ?? ''}
          width={width}
          height={height}
          loading="lazy"
          style={{
            maxWidth: '100%',
            border: `1px solid ${accentBorderStrong}`,
            borderRadius: 3,
            boxShadow: `0 4px 20px ${accent}22`,
          }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
      </span>
    ),

    // ── Inline bold / italic ──────────────────────────────────────────────────
    strong: ({ children }) => (
      <strong style={{ color: ink, fontWeight: 700 }}>{children}</strong>
    ),

    em: ({ children }) => (
      <em style={{ color: inkMuted, fontStyle: 'italic' }}>{children}</em>
    ),

    // ── GitHub-flavored task-list checkbox ────────────────────────────────────
    input: ({ type, checked, ...props }) => {
      if (type === 'checkbox') {
        return (
          <input
            type="checkbox"
            checked={checked}
            readOnly
            style={{
              accentColor: accent,
              marginRight: 6,
              cursor: 'default',
            }}
            {...props}
          />
        );
      }
      return <input type={type} {...props} />;
    },

    // ── HTML passthrough elements ─────────────────────────────────────────────
    // These handle <div align="center">, <br>, etc. from GitHub readmes
    div: ({ children, style, ...props }) => (
      <div
        style={{ ...(style as CSSProperties), marginBottom: 8 }}
        {...props}
      >
        {children}
      </div>
    ),

    br: () => <br />,
  };
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function ReactMarkdownRenderer({
  content,
  accent,
}: {
  content: string;
  accent: string;
}) {
  const components = buildComponents(accent);

  return (
    <div
      style={{
        fontFamily: fontSans,
        color: inkMuted,
        lineHeight: 1.85,
        // GitHub-style readme container
        background: 'rgba(255,255,255,0.015)',
        border: `1px solid rgba(255,100,0,0.1)`,
        borderRadius: 4,
        padding: '24px 24px 8px',
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
