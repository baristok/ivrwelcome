"use client";

import { useEffect, useRef } from "react";

export const Component = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripples = useRef<
    { x: number; y: number; radius: number; alpha: number }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const addRipple = (x: number, y: number) => {
      ripples.current.push({ x, y, radius: 0, alpha: 0.5 });
    };

    const handleMove = (event: MouseEvent) => {
      addRipple(event.clientX, event.clientY);
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const isDark =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      ripples.current.forEach((ripple) => {
        ripple.radius += 1.2;
        ripple.alpha -= 0.005;

        if (ripple.alpha <= 0) {
          return;
        }

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(143, 175, 198, ${ripple.alpha})`
          : `rgba(16, 37, 61, ${Math.min(ripple.alpha + 0.05, 0.55)})`;
        ctx.lineWidth = isDark ? 1.9 : 1.7;
        ctx.stroke();
      });

      ripples.current = ripples.current.filter((ripple) => ripple.alpha > 0);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);
    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[11] h-screen w-screen mix-blend-screen"
    />
  );
};
