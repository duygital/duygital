import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  rotation: number;
  rotSpeed: number;
  color: string;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 125 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 80; // Elegant stellar richness

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = (rect?.width || window.innerWidth) * window.devicePixelRatio;
      canvas.height = (rect?.height || window.innerHeight) * window.devicePixelRatio;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createParticles = () => {
      particles = [];
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      for (let i = 0; i < maxParticles; i++) {
        // High-end cinematic color composition: dazzling star white, soft warm cream, glinting golden-yellow, and brand crimson
        const colorPalette = [
          "rgba(255, 255, 255, 0.98)",  // Pure dazzling star white (brighter)
          "rgba(255, 250, 240, 0.95)",  // Golden cream stellar light
          "rgba(253, 190, 120, 0.92)",  // Soft amber/gold spark
          "rgba(217, 56, 30, 0.9)"      // Elegant signature crimson
        ];

        const isLarge = Math.random() < 0.15; // Only 15% are select glistening cross stars
        const size = isLarge
          ? Math.random() * 1.4 + 1.8   // Large star: 1.8px to 3.2px maximum
          : Math.random() * 1.0 + 0.5;  // Fine stardust: 0.5px to 1.5px
        
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size,
          alpha: Math.random() * 0.7 + 0.3,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.008,
          color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        });
      }
    };

    resizeCanvas();
    createParticles();

    const draw = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;

      // Draw light connection constellations matching creative brand palette (bright white/amber paths)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        // Star movement
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Boundaries
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Mouse reaction (organic push)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distToMouse = Math.hypot(dx, dy);

        if (distToMouse < mouse.radius) {
          const force = (mouse.radius - distToMouse) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 1.2;
          p.y += Math.sin(angle) * force * 1.2;
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        ctx.fillStyle = p.color;
        
        // Add dynamic celestial glowing shadow
        ctx.shadowBlur = p.size * 3.5;
        ctx.shadowColor = p.color;
        
        // Make some star-shaped/cross-shaped sparkles for standard Renaissance look
        if (p.size >= 1.8) {
          // Cross star glint
          ctx.beginPath();
          ctx.moveTo(-p.size * 2, 0);
          ctx.lineTo(p.size * 2, 0);
          ctx.moveTo(0, -p.size * 2);
          ctx.lineTo(0, p.size * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.0; // Perfectly balanced glint line thickness for max 3.2px stars
          ctx.stroke();
          
          // Draw a small bright solid core inside the cross star
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF"; // Absolute core spark
          ctx.fill();
        } else {
          // Circular fine dust particle
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);
    // Bind interactions to parent container
    const parentContainer = canvas.parentElement;
    if (parentContainer) {
      parentContainer.addEventListener("mousemove", handleMouseMove);
      parentContainer.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (parentContainer) {
        parentContainer.removeEventListener("mousemove", handleMouseMove);
        parentContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 block w-full h-full"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
