'use client';

import { useEffect, useRef, useState } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  characters?: string;
  className?: string;
  style?: React.CSSProperties;
  animateOn?: 'view' | 'hover' | 'load';
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  characters = DEFAULT_CHARS,
  className = '',
  style,
  animateOn = 'view',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const iterRef = useRef<number[]>(new Array(text.length).fill(0));
  const revealedRef = useRef<boolean[]>(new Array(text.length).fill(false));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    iterRef.current = new Array(text.length).fill(0);
    revealedRef.current = new Array(text.length).fill(false);

    const order = [...Array(text.length).keys()];
    if (revealDirection === 'end') order.reverse();
    else if (revealDirection === 'center') {
      const mid = Math.floor(text.length / 2);
      order.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
    }

    let orderIdx = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (revealedRef.current[i]) return char;
            iterRef.current[i]++;
            if (sequential) {
              if (order[orderIdx] === i && iterRef.current[i] >= maxIterations) {
                revealedRef.current[i] = true;
                return char;
              }
              if (order[orderIdx] === i) {
                return characters[Math.floor(Math.random() * characters.length)];
              }
              return i < order[orderIdx] ? char : characters[Math.floor(Math.random() * characters.length)];
            } else {
              if (iterRef.current[i] >= maxIterations) {
                revealedRef.current[i] = true;
                return char;
              }
              return characters[Math.floor(Math.random() * characters.length)];
            }
          })
          .join('');
      });

      if (sequential && revealedRef.current[order[orderIdx]]) {
        orderIdx = Math.min(orderIdx + 1, text.length - 1);
      }

      if (revealedRef.current.every(Boolean)) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsAnimating(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'load') {
      setTimeout(startAnimation, 300);
      return;
    }
    if (animateOn === 'view') {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) startAnimation(); },
        { threshold: 0.3 }
      );
      if (containerRef.current) obs.observe(containerRef.current);
      return () => obs.disconnect();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ fontFamily: 'monospace', ...style }}
      onMouseEnter={animateOn === 'hover' ? startAnimation : undefined}
    >
      {displayText}
    </span>
  );
}
