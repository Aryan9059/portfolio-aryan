'use client';

import { useRef, useEffect, ReactNode } from 'react';

interface InfiniteMarqueeProps {
  items: ReactNode[];
  speed?: number; // pixels per second
  direction?: 'left' | 'right';
  gap?: number;
  pauseOnHover?: boolean;
}

export default function InfiniteMarquee({
  items,
  speed = 60,
  direction = 'left',
  gap = 24,
  pauseOnHover = true,
}: InfiniteMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;
    const duration = (totalWidth / speed) * 1000;

    const keyframes =
      direction === 'left'
        ? [{ transform: 'translateX(0)' }, { transform: `translateX(-${totalWidth}px)` }]
        : [{ transform: `translateX(-${totalWidth}px)` }, { transform: 'translateX(0)' }];

    animRef.current = track.animate(keyframes, {
      duration,
      iterations: Infinity,
      easing: 'linear',
    });

    return () => animRef.current?.cancel();
  }, [speed, direction]);

  const handleMouseEnter = () => {
    if (pauseOnHover && animRef.current) animRef.current.playbackRate = 0;
  };
  const handleMouseLeave = () => {
    if (pauseOnHover && animRef.current) animRef.current.playbackRate = 1;
  };

  // Duplicate items for seamless loop
  const allItems = [...items, ...items];

  return (
    <div
      style={{ overflow: 'hidden', width: '100%' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: `${gap}px`,
          width: 'max-content',
        }}
      >
        {allItems.map((item, i) => (
          <div key={i} style={{ flexShrink: 0 }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
