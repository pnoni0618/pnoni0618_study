const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: Math.round((i * 137.5) % 100),
  delay: Math.round((i * 1.7) % 12),
  duration: 10 + Math.round((i * 3.3) % 9),
  size: i % 3 === 0 ? 3 : 2,
  drift: (i % 2 === 0 ? 1 : -1) * (10 + (i % 5) * 6),
}));

/**
 * Slow-rising golden particles for hero-style sections. Positions are
 * deterministic (not Math.random) so server and client markup match.
 */
export default function GoldParticles({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-gold-soft"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            boxShadow: "0 0 6px 1px var(--gold-soft)",
            ["--drift" as string]: `${p.drift}px`,
            animation: `particle-rise ${p.duration}s ease-in ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
