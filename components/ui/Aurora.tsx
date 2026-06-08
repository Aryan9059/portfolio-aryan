'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
}

export default function Aurora({
  colorStops = ['#ff6b00', '#ff3300', '#ff9900'],
  amplitude = 1.0,
  blend = 0.5,
  speed = 0.5,
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
        : { r: 0, g: 0, b: 0 };
    };

    const draw = () => {
      timeRef.current += speed * 0.01;
      const t = timeRef.current;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // Draw 3 overlapping aurora blobs
      colorStops.forEach((color, i) => {
        const rgb = hexToRgb(color);
        const xOffset = Math.sin(t * 0.7 + i * 2.1) * W * 0.3 * amplitude;
        const yOffset = Math.cos(t * 0.5 + i * 1.4) * H * 0.15 * amplitude;
        const cx = W * 0.5 + xOffset;
        const cy = H * 0.65 + yOffset;
        const rx = W * (0.4 + 0.1 * Math.sin(t + i));
        const ry = H * (0.25 + 0.05 * Math.cos(t * 0.8 + i));

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
        grad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${blend * 0.4})`);
        grad.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},${blend * 0.1})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.save();
        ctx.scale(rx / Math.max(rx, ry), ry / Math.max(rx, ry));
        ctx.beginPath();
        ctx.arc(
          (cx * Math.max(rx, ry)) / rx,
          (cy * Math.max(rx, ry)) / ry,
          Math.max(rx, ry),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = 'screen';
        ctx.fill();
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [colorStops, amplitude, blend, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
