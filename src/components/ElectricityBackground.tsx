"use client";

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface Lightning {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  points: Array<{ x: number; y: number }>;
  life: number;
  maxLife: number;
  width: number;
}

export function ElectricityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const lightningRef = useRef<Lightning[]>([]);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: Math.random() * 100,
          maxLife: 100 + Math.random() * 100,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? '#00d4ff' : '#fbbf24'
        });
      }
    };

    // Create lightning bolt
    const createLightning = () => {
      if (Math.random() > 0.997) { // Very rare lightning
        const startX = Math.random() * canvas.width;
        const startY = 0;
        const endX = startX + (Math.random() - 0.5) * 200;
        const endY = Math.random() * canvas.height * 0.3;

        const points: Array<{ x: number; y: number }> = [];
        const segments = 8;
        
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const x = startX + (endX - startX) * t + (Math.random() - 0.5) * 30;
          const y = startY + (endY - startY) * t;
          points.push({ x, y });
        }

        lightningRef.current.push({
          startX,
          startY,
          endX,
          endY,
          points,
          life: 0,
          maxLife: 20,
          width: Math.random() * 3 + 1
        });
      }
    };

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      ctx.fillStyle = 'rgba(10, 15, 28, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life += 1;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Reset particle when life ends
        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }

        // Draw particle with glow
        const alpha = 1 - (particle.life / particle.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 20;
        ctx.shadowColor = particle.color;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Create connections between nearby particles
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const alpha = (1 - distance / 150) * 0.3;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = '#00d4ff';
            ctx.lineWidth = 0.5;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00d4ff';
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      // Update and draw lightning
      lightningRef.current = lightningRef.current.filter(lightning => {
        lightning.life += 1;
        
        if (lightning.life < lightning.maxLife) {
          const alpha = 1 - (lightning.life / lightning.maxLife);
          
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = lightning.width;
          ctx.shadowBlur = 20;
          ctx.shadowColor = '#fbbf24';
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          
          ctx.beginPath();
          lightning.points.forEach((point, index) => {
            if (index === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          });
          ctx.stroke();
          ctx.restore();
          
          return true;
        }
        return false;
      });

      createLightning();
      
      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.03) 0%, rgba(10, 15, 28, 1) 70%)' }}
    />
  );
}