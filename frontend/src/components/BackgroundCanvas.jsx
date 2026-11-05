import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates tracker
    const mouse = {
      x: null,
      y: null,
      radius: 160
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 24), 50);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1;
        this.density = Math.random() * 20 + 5;
      }

      update() {
        // Move particle normally
        this.x += this.vx;
        this.y += this.vy;

        // Wrap edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Interactive mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * this.density * 0.2;
            const directionY = forceDirectionY * force * this.density * 0.2;

            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle =
          theme === 'dark'
            ? 'rgba(0, 225, 255, 0.55)'
            : 'rgba(0, 114, 255, 0.45)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Connecting lines between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            const opacity = 0.2 * (1 - dist / 130);
            ctx.strokeStyle =
              theme === 'dark'
                ? `rgba(0, 150, 255, ${opacity})`
                : `rgba(0, 100, 255, ${opacity * 0.8})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Connecting lines to cursor
        if (mouse.x !== null && mouse.y !== null) {
          const mdx = mouse.x - particles[i].x;
          const mdy = mouse.y - particles[i].y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < 140) {
            ctx.beginPath();
            const mOpacity = 0.35 * (1 - mdist / 140);
            ctx.strokeStyle =
              theme === 'dark'
                ? `rgba(0, 240, 255, ${mOpacity})`
                : `rgba(0, 114, 255, ${mOpacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full opacity-45" />
      {/* Animated Floating Radial Aura Blobs */}
      <div className="absolute top-0 left-1/4 w-[550px] h-[550px] bg-techla-500/10 dark:bg-techla-500/15 rounded-full blur-[140px] animate-float" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-cyanGlow/5 dark:bg-cyanGlow/10 rounded-full blur-[160px] animate-float-delayed" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-700/10 rounded-full blur-[140px] animate-float" />
    </div>
  );
}
