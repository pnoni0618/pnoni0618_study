"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  driftSpeed: number;
}

const STAR_DENSITY = 1 / 2600; // stars per square pixel
const MAX_STARS = 420;

/**
 * Fixed, full-viewport backdrop shared by every page: a twinkling star
 * canvas (with gentle mouse parallax) plus drifting nebula blobs whose
 * position is nudged by scroll. Mounted once in the root layout so it
 * never re-initializes on client-side navigation.
 */
export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nebulaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let animationFrame = 0;

    function seedStars() {
      const count = Math.min(MAX_STARS, Math.floor(width * height * STAR_DENSITY));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.35,
        twinkleSpeed: Math.random() * 0.015 + 0.004,
        twinklePhase: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.03 + 0.01,
      }));
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
    }

    function handlePointerMove(event: PointerEvent) {
      targetPointerX = (event.clientX / width - 0.5) * 2;
      targetPointerY = (event.clientY / height - 0.5) * 2;
    }

    function draw(time: number) {
      pointerX += (targetPointerX - pointerX) * 0.02;
      pointerY += (targetPointerY - pointerY) * 0.02;

      ctx!.clearRect(0, 0, width, height);

      for (const star of stars) {
        const twinkle = prefersReducedMotion
          ? star.baseAlpha
          : star.baseAlpha +
            Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3;
        const parallax = star.radius * 6;
        const drawX = star.x + pointerX * parallax;
        const drawY =
          star.y +
          pointerY * parallax +
          (prefersReducedMotion ? 0 : Math.sin(time * 0.00006 + star.twinklePhase) * 4);

        ctx!.beginPath();
        ctx!.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(246, 245, 255, ${Math.max(0, Math.min(1, twinkle))})`;
        ctx!.fill();
      }

      animationFrame = requestAnimationFrame(draw);
    }

    resize();
    animationFrame = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useEffect(() => {
    const nebula = nebulaRef.current;
    if (!nebula) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        nebula!.style.transform = `translateY(${y * 0.12}px)`;
        ticking = false;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden bg-deep-space">
      <div ref={nebulaRef} className="absolute inset-0">
        <div
          className="nebula-blob"
          style={{
            top: "-10%",
            left: "-8%",
            width: "55vw",
            height: "55vw",
            background: "radial-gradient(circle, var(--cosmic-purple) 0%, transparent 70%)",
            animation: "blob-drift-a 26s ease-in-out infinite",
          }}
        />
        <div
          className="nebula-blob"
          style={{
            top: "8%",
            right: "-12%",
            width: "48vw",
            height: "48vw",
            background: "radial-gradient(circle, var(--indigo) 0%, transparent 70%)",
            animation: "blob-drift-b 32s ease-in-out infinite",
          }}
        />
        <div
          className="nebula-blob"
          style={{
            bottom: "-14%",
            left: "18%",
            width: "42vw",
            height: "42vw",
            background: "radial-gradient(circle, var(--aurora-teal) 0%, transparent 72%)",
            opacity: 0.28,
            animation: "blob-drift-a 38s ease-in-out infinite reverse",
          }}
        />
        <div
          className="nebula-blob"
          style={{
            bottom: "6%",
            right: "6%",
            width: "30vw",
            height: "30vw",
            background: "radial-gradient(circle, var(--gold) 0%, transparent 75%)",
            opacity: 0.18,
            animation: "blob-drift-b 22s ease-in-out infinite",
          }}
        />
      </div>
      <canvas ref={canvasRef} className="star-canvas" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, rgba(109,40,217,0.16), transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(45,212,191,0.08), transparent 50%)",
        }}
      />
    </div>
  );
}
