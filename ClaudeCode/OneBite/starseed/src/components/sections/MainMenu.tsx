import { mainMenuItems } from "@/data/mainMenu";
import GlassCard from "@/components/ui/GlassCard";
import RippleButton from "@/components/ui/RippleButton";
import Reveal from "@/components/effects/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const ACCENT_GRADIENT: Record<string, string> = {
  gold: "from-gold-soft to-gold-deep",
  purple: "from-cosmic-purple-light to-cosmic-purple",
  indigo: "from-indigo-light to-indigo",
  teal: "from-aurora-teal to-cosmic-purple-light",
};

export default function MainMenu() {
  return (
    <section id="menu" className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Explore"
          title="스타시드 우주를 탐험해보세요"
          description="테스트부터 세계관까지, 당신의 자기 탐색 여정에 필요한 모든 것."
        />
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {mainMenuItems.map((item, index) => (
          <Reveal key={item.slug} delay={index * 90}>
            <GlassCard className="group flex h-full flex-col gap-5 p-8">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl ${ACCENT_GRADIENT[item.accent]}`}
              >
                <span className="drop-shadow">{item.icon}</span>
              </div>

              <div className="flex-1">
                <h3 className="font-serif text-xl text-ink">{item.title}</h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </div>

              <RippleButton href={item.href} variant="secondary" className="w-fit">
                {item.cta} →
              </RippleButton>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
