import RippleButton from "@/components/ui/RippleButton";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/effects/Reveal";

interface ComingSoonProps {
  icon: string;
  eyebrow: string;
  title: string;
  description: string;
}

/**
 * Placeholder for routes whose full feature (e.g. worldview lore) isn't
 * built yet. Swap the contents of the relevant app/<route>/page.tsx for
 * real content — header, footer, and background stay as-is.
 */
export default function ComingSoon({ icon, eyebrow, title, description }: ComingSoonProps) {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <Reveal>
        <GlassCard className="flex flex-col items-center gap-6 p-10 sm:p-14">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cosmic-purple-light to-cosmic-purple text-3xl">
            {icon}
          </span>
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">{title}</h1>
            <p className="mt-4 text-balance text-base leading-relaxed text-ink-muted">
              {description}
            </p>
          </div>
          <p className="pill">🌙 준비 중이에요 · 곧 만나요</p>
          <RippleButton href="/" variant="secondary">
            ← 홈으로 돌아가기
          </RippleButton>
        </GlassCard>
      </Reveal>
    </section>
  );
}
