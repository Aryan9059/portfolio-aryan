'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import {
  FiDroplet,
  FiZap,
} from 'react-icons/fi';
import { SiDropbox, SiAirbnb, SiSpotify } from 'react-icons/si';

interface FloatingIcon {
  id: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  name: string;
  borderColor: string;
  iconColor: string;
  size: 'sm' | 'md' | 'lg';
}

const baseIcons: FloatingIcon[] = [
  { id: 'haven', icon: FiDroplet, name: 'Haven', borderColor: 'border-orange-500', iconColor: 'text-orange-500', size: 'md' },
  { id: 'dropbox', icon: SiDropbox, name: 'Dropbox', borderColor: 'border-blue-400', iconColor: 'text-blue-400', size: 'md' },
  { id: 'airbnb', icon: SiAirbnb, name: 'Airbnb', borderColor: 'border-rose-500', iconColor: 'text-rose-500', size: 'md' },
  { id: 'spotify', icon: SiSpotify, name: 'Spotify', borderColor: 'border-green-400', iconColor: 'text-green-400', size: 'md' },
  { id: 'zap', icon: FiZap, name: 'Flash', borderColor: 'border-yellow-400', iconColor: 'text-yellow-400', size: 'md' },
];

const floatingIcons: FloatingIcon[] = Array.from({ length: 40 }, (_, index) => {
  const baseIcon = baseIcons[index % baseIcons.length];
  return {
    ...baseIcon,
    id: `${baseIcon.id}-${index}`,
  };
});

const VISIBLE_COUNT = 10;
const visibleIcons = floatingIcons.slice(0, VISIBLE_COUNT);

const FloatingIconHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const ICON_COUNT = visibleIcons.length;
      const minSeparation = 70;
      const exclusionRadius = 260;
      const headingOffsetVH = 0.28;
      const centerY = (typeof window !== 'undefined') ? -window.innerHeight * headingOffsetVH : -300;

      const viewportH = (typeof window !== 'undefined') ? window.innerHeight : 800;
      const allowedUpperY = -viewportH * 0.5;
      const allowedLowerY = viewportH * 0.12;
      const positions: Array<{ icon: HTMLDivElement | null; finalX: number; finalY: number; initialX: number; initialY: number; duration: number }> = [];

      for (let i = 0; i < iconsRef.current.length; i++) {
        const icon = iconsRef.current[i] || null;
        if (!icon) continue;

        const baseAngle = (i / ICON_COUNT) * Math.PI * 2;
        const angle = baseAngle + (Math.random() - 0.5) * 0.4;

        const finalDistance = 200 + Math.random() * 220;
        const initialOffset = 50 + Math.random() * 30;

        let finalX = Math.cos(angle) * finalDistance;
        let finalY = Math.sin(angle) * finalDistance;

        positions.forEach((p) => {
          const dx = finalX - p.finalX;
          const dy = finalY - p.finalY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minSeparation) {
            const push = (minSeparation - dist) + 40;
            finalX += (dx / (dist || 1)) * push;
            finalY += (dy / (dist || 1)) * push;
          }
        });

        const dxCenter = finalX - 0;
        const dyCenter = finalY - centerY;
        const centerDist = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
        if (centerDist < exclusionRadius) {
          const scaleUp = (exclusionRadius + 40) / (centerDist || 1);
          finalX = 0 + dxCenter * scaleUp;
          finalY = centerY + dyCenter * scaleUp;
        }

        if (finalY > allowedLowerY) finalY = allowedLowerY;
        if (finalY < allowedUpperY) finalY = allowedUpperY;

        positions.push({
          icon,
          finalX,
          finalY,
          initialX: Math.cos(angle) * initialOffset,
          initialY: Math.sin(angle) * initialOffset,
          duration: 2 + Math.random() * 1.5,
        });
      }

      const timeline = gsap.timeline();

      positions.forEach((pos) => {
        gsap.set(pos.icon, {
          x: pos.initialX,
          y: pos.initialY,
          opacity: 0.85,
        });
      });

      positions.forEach((pos) => {
        timeline.to(
          pos.icon,
          {
            x: pos.finalX,
            y: pos.finalY,
            opacity: 0.95,
            duration: pos.duration,
            ease: 'expo.out',
          },
          0
        );
      });

      timeline.eventCallback('onComplete', () => {
        positions.forEach((pos) => {
          if (!pos.icon) return;

          const randomX = pos.finalX + (Math.random() * 30 - 15);
          let randomY = pos.finalY + (Math.random() * 30 - 15);
          if (randomY > allowedLowerY) randomY = allowedLowerY;
          if (randomY < allowedUpperY) randomY = allowedUpperY;

          gsap.to(pos.icon, {
            x: randomX,
            y: randomY,
            duration: pos.duration,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          });
        });
      });

      iconsRef.current.forEach((icon) => {
        if (!icon) return;

        const handleMouseEnter = () => {
          gsap.to(icon, {
            scale: 1.06,
            y: -6,
            duration: 0.28,
            ease: 'power3.out',
          });
        };

        const handleMouseLeave = () => {
          gsap.to(icon, {
            scale: 1,
            y: 0,
            duration: 0.36,
            ease: 'power3.out',
          });
        };

        icon.addEventListener('mouseenter', handleMouseEnter);
        icon.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          icon.removeEventListener('mouseenter', handleMouseEnter);
          icon.removeEventListener('mouseleave', handleMouseLeave);
        };
      });
    },
    {}
  );

  const sizeMap = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32',
  };

  const iconSizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-visible flex flex-col items-center justify-center h-screen"
      style={{ height: '100vh' }}
    >
      <div className="absolute inset-0">
        {visibleIcons.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              ref={(el) => {
                if (el) iconsRef.current[index] = el;
              }}
              className={`absolute flex items-center justify-center rounded-3xl border-2 ${item.borderColor} bg-[rgba(255,255,255,0.04)] cursor-pointer transition-shadow duration-300 ${sizeMap[item.size]}`}
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                backdropFilter: 'blur(6px)',
                opacity: 0,
                boxShadow: '0 8px 24px rgba(2,6,23,0.35)',
              }}
            >
              <Icon size={iconSizeMap[item.size]} className={`${item.iconColor}`} />
            </div>
          );
        })}
      </div>

      <div className="absolute left-1/2 z-10 pointer-events-none text-center max-w-2xl px-6" style={{ top: '18vh', transform: 'translateX(-50%)' }}>
        <div className="space-y-6">
          <h1 className="appd-title text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#6fdcff] via-[#cfefff]/30 to-[#bfa8ff] bg-clip-text text-transparent">
            Aryan Srivastava
          </h1>
          <p className="appd-subtitle text-xl md:text-2xl text-white/80">
            Portfolio crafted with precision, designed for scale
          </p>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
    </div>
  );
};

export default FloatingIconHero;
