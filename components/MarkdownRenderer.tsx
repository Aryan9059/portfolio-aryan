'use client';
import React from 'react';

// Very lightweight markdown → JSX renderer (no dependencies)
// Handles: ##/### headings, **bold**, `inline code`, ```blocks```, - lists, | tables, > blockquotes, paragraphs

type Token =
  | { type: 'h1'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'hr' }
  | { type: 'blockquote'; text: string }
  | { type: 'li'; text: string }
  | { type: 'codeblock'; lang: string; code: string }
  | { type: 'table'; rows: string[][] }
  | { type: 'p'; text: string }
  | { type: 'blank' };

function tokenize(md: string): Token[] {
  const lines = md.split('\n');
  const tokens: Token[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // code block
    if (line.trimStart().startsWith('```')) {
      const lang = line.trim().slice(3).trim();
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      tokens.push({ type: 'codeblock', lang, code: codeLines.join('\n') });
      i++;
      continue;
    }
    // heading
    if (/^### /.test(line)) { tokens.push({ type: 'h3', text: line.slice(4) }); i++; continue; }
    if (/^## /.test(line))  { tokens.push({ type: 'h2', text: line.slice(3) }); i++; continue; }
    if (/^# /.test(line))   { tokens.push({ type: 'h1', text: line.slice(2) }); i++; continue; }
    // hr
    if (/^---+$/.test(line.trim())) { tokens.push({ type: 'hr' }); i++; continue; }
    // blockquote
    if (/^> /.test(line)) { tokens.push({ type: 'blockquote', text: line.slice(2) }); i++; continue; }
    // list item
    if (/^[-*] /.test(line)) { tokens.push({ type: 'li', text: line.slice(2) }); i++; continue; }
    // table
    if (/^\|/.test(line) && i + 1 < lines.length && /^\|[-| ]+\|/.test(lines[i + 1])) {
      const rows: string[][] = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        const row = lines[i].split('|').filter((_, idx, arr) => idx !== 0 && idx !== arr.length - 1).map(c => c.trim());
        if (!row.every(c => /^[-: ]+$/.test(c))) rows.push(row);
        i++;
      }
      tokens.push({ type: 'table', rows });
      continue;
    }
    // blank
    if (line.trim() === '') { tokens.push({ type: 'blank' }); i++; continue; }
    // paragraph
    tokens.push({ type: 'p', text: line }); i++;
  }
  return tokens;
}

// Inline formatting: **bold** and `code`
function inlineFormat(text: string, accent: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: '#fff5e6', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} style={{
          background: 'rgba(255,100,0,0.12)', border: '1px solid rgba(255,100,0,0.25)',
          padding: '1px 6px', fontSize: '0.85em', color: accent,
          fontFamily: "'Courier New', monospace", borderRadius: 2,
        }}>{part.slice(1, -1)}</code>
      );
    }
    return part;
  });
}

export default function ReactMarkdownRenderer({ content, accent }: { content: string; accent: string }) {
  const tokens = tokenize(content);
  const elements: React.ReactNode[] = [];
  let liBuffer: Token[] = [];

  const flushList = () => {
    if (!liBuffer.length) return;
    elements.push(
      <ul key={`ul-${elements.length}`} style={{ paddingLeft: 20, marginBottom: 16 }}>
        {liBuffer.map((t, i) => (
          <li key={i} style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,245,230,0.7)', marginBottom: 2 }}>
            <span style={{ color: accent, marginRight: 8 }}>▸</span>
            {t.type === 'li' ? inlineFormat(t.text, accent) : null}
          </li>
        ))}
      </ul>
    );
    liBuffer = [];
  };

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];

    if (t.type === 'li') { liBuffer.push(t); continue; }
    flushList();

    if (t.type === 'blank') continue;

    if (t.type === 'h1') {
      elements.push(
        <h1 key={i} style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 28, color: '#fff5e6', textShadow: `2px 2px 0 ${accent}`, marginBottom: 16, marginTop: 8, lineHeight: 1.2 }}>
          {t.text}
        </h1>
      );
    } else if (t.type === 'h2') {
      elements.push(
        <div key={i} style={{ marginTop: 28, marginBottom: 14 }}>
          <h2 style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 20, color: accent, letterSpacing: '0.05em', lineHeight: 1.2 }}>{t.text}</h2>
          <div style={{ height: 1, background: `linear-gradient(90deg, ${accent}50, transparent)`, marginTop: 6 }} />
        </div>
      );
    } else if (t.type === 'h3') {
      elements.push(
        <h3 key={i} style={{ fontFamily: "'Caesar Dressing', cursive", fontSize: 15, color: '#fff5e6', marginTop: 20, marginBottom: 10, letterSpacing: '0.05em' }}>
          ◆ {t.text}
        </h3>
      );
    } else if (t.type === 'hr') {
      elements.push(<div key={i} style={{ height: 1, background: 'rgba(255,100,0,0.15)', margin: '20px 0' }} />);
    } else if (t.type === 'blockquote') {
      elements.push(
        <blockquote key={i} style={{
          borderLeft: `3px solid ${accent}`,
          paddingLeft: 16, margin: '16px 0',
          background: `${accent}0a`,
          padding: '10px 16px',
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,245,230,0.6)', lineHeight: 1.7, fontStyle: 'italic' }}>
            {inlineFormat(t.text, accent)}
          </p>
        </blockquote>
      );
    } else if (t.type === 'codeblock') {
      elements.push(
        <div key={i} style={{ marginBottom: 20, position: 'relative' }}>
          {t.lang && (
            <div style={{
              display: 'inline-block', fontSize: 9, fontFamily: "'Instrument Sans', sans-serif",
              fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: accent, background: `${accent}18`, border: `1px solid ${accent}30`,
              padding: '2px 8px', marginBottom: 0,
            }}>{t.lang}</div>
          )}
          <pre style={{
            background: 'rgba(0,0,0,0.5)', border: `1px solid rgba(255,100,0,0.2)`,
            padding: '14px 16px', overflowX: 'auto',
            fontSize: 12, lineHeight: 1.7,
            color: 'rgba(255,245,230,0.8)',
            fontFamily: "'Courier New', Courier, monospace",
            margin: 0,
            borderTop: t.lang ? 'none' : undefined,
          }}>
            <code>{t.code}</code>
          </pre>
        </div>
      );
    } else if (t.type === 'table') {
      const [header, ...body] = t.rows;
      elements.push(
        <div key={i} style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr>
                {header?.map((cell, ci) => (
                  <th key={ci} style={{
                    padding: '8px 12px', textAlign: 'left',
                    background: `${accent}18`, border: `1px solid ${accent}30`,
                    color: accent, fontFamily: "'Caesar Dressing', cursive",
                    fontSize: 11, letterSpacing: '0.1em',
                  }}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{
                      padding: '8px 12px', border: `1px solid rgba(255,100,0,0.12)`,
                      color: 'rgba(255,245,230,0.7)', fontSize: 12, lineHeight: 1.6,
                    }}>{inlineFormat(cell, accent)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (t.type === 'p') {
      elements.push(
        <p key={i} style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,245,230,0.65)', marginBottom: 12 }}>
          {inlineFormat(t.text, accent)}
        </p>
      );
    }
  }
  flushList();
  return <div style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{elements}</div>;
}
