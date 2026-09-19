import Reveal from "@/components/effects/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

const REASONS = [
  "별을 보면 설명하기 어려운 그리움을 느낀다.",
  "MBTI보다 더 깊은 자기 탐색을 해보고 싶다.",
  "영성과 우주에 관심이 많다.",
  "자신의 성향을 새로운 관점에서 이해해보고 싶다.",
];

export default function RecommendedFor() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <SectionHeading eyebrow="For you" title="이런 분들에게 추천합니다" />
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {REASONS.map((reason, index) => (
          <Reveal key={reason} delay={index * 80}>
            <GlassCard className="flex items-start gap-4 p-6">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-sm text-gold">
                ✔
              </span>
              <p className="text-balance text-base leading-relaxed text-ink-muted">
                {reason}
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
