'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = '',
  style,
  spotlightColor = 'rgba(255, 107, 0, 0.12)',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setPos((p) => ({ ...p, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      {/* Spotlight radial */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          opacity: pos.opacity,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
}
