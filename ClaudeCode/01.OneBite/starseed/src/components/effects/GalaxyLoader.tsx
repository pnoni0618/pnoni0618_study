"use client";

import { useEffect, useState } from "react";

/**
 * Full-screen intro loader shown once per browser session — a slowly
 * rotating galaxy — then fades out to reveal the app.
 */
export default function GalaxyLoader() {
  const [hidden, setHidden] = useState(false);
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    // One-time read of sessionStorage (external system) to decide whether
    // this tab has already seen the intro this session.
    const seen = sessionStorage.getItem("starseed-intro-seen");
    if (seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSkip(true);
      return;
    }
    setSkip(false);
    sessionStorage.setItem("starseed-intro-seen", "1");
    const timer = setTimeout(() => setHidden(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  if (skip) return null;

  return (
    <div
      role="status"
      aria-label="로딩 중"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-deep-space"
      style={hidden ? { animation: "loader-fade-out 0.6s ease forwards" } : undefined}
    >
      <div className="relative h-24 w-24">
        <div
          className="absolute inset-0 rounded-full border border-cosmic-purple-light/40"
          style={{ animation: "galaxy-spin 3.2s linear infinite" }}
        />
        <div
          className="absolute inset-2 rounded-full border border-dashed border-gold/50"
          style={{ animation: "galaxy-spin-reverse 4.4s linear infinite" }}
        />
        <div
          className="absolute inset-[30%] rounded-full bg-gradient-to-br from-gold-soft via-gold to-cosmic-purple"
          style={{ boxShadow: "0 0 30px 6px var(--glow-gold)" }}
        />
      </div>
      <p className="eyebrow text-center">Starseed Origin</p>
    </div>
  );
}
