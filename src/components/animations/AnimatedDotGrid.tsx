import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function AnimatedDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dots: any[] = [];
    let animation: anime.AnimeInstance;

    const resize = () => {
      const scale = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      ctx.scale(scale, scale);
      initDots();
    };

    const initDots = () => {
      dots = [];
      const spacing = 50; // Space between dots
      const cols = Math.floor(window.innerWidth / spacing) + 2;
      const rows = Math.floor(window.innerHeight / spacing) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * spacing,
            y: j * spacing,
            baseR: 1.2,
            scale: Math.random() * 0.4 + 0.8, // Subtle scale variance
            alpha: Math.random() * 0.2 + 0.05,
          });
        }
      }

      if (animation) animation.pause();

      // Subtle pulsing animation (moving in and out)
      animation = anime({
        targets: dots,
        scale: [
          { value: () => Math.random() * 0.4 + 1.1, duration: () => anime.random(2000, 4000) },
          { value: () => Math.random() * 0.4 + 0.7, duration: () => anime.random(2000, 4000) }
        ],
        alpha: [
          { value: () => Math.random() * 0.2 + 0.15, duration: () => anime.random(2000, 4000) },
          { value: () => Math.random() * 0.1 + 0.02, duration: () => anime.random(2000, 4000) }
        ],
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true,
        update: render
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.baseR * dot.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.alpha})`;
        ctx.fill();
      });
    };

    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
      if (animation) animation.pause();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
}
