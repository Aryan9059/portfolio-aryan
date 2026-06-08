'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimate, stagger } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | number[];
  splitBy?: 'word' | 'char';
  style?: React.CSSProperties;
  wordStyle?: React.CSSProperties;
  charStyle?: React.CSSProperties;
}

export default function SplitText({
  text,
  className = '',
  delay = 0,
  duration = 0.6,
  ease = [0.22, 1, 0.36, 1],
  splitBy = 'char',
  style,
  wordStyle,
  charStyle,
}: SplitTextProps) {
  const words = text.split(' ');

  return (
    <span className={className} style={{ display: 'inline', ...style }} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={wi}
          style={{ display: 'inline-block', whiteSpace: 'nowrap', ...wordStyle }}
        >
          {splitBy === 'char'
            ? word.split('').map((char, ci) => (
                <motion.span
                  key={ci}
                  initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration,
                    delay: delay + (wi * word.length + ci) * 0.04,
                    ease: ease as any,
                  }}
                  style={{ display: 'inline-block', ...charStyle }}
                >
                  {char}
                </motion.span>
              ))
            : (
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration, delay: delay + wi * 0.1, ease: ease as any }}
                style={{ display: 'inline-block', ...charStyle }}
              >
                {word}
              </motion.span>
            )}
          {/* space between words */}
          {wi < words.length - 1 && (
            <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
}
