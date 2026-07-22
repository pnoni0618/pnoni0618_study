import Reveal from "@/components/effects/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import StarseedCompositionChart from "@/components/charts/StarseedCompositionChart";
import RippleButton from "@/components/ui/RippleButton";
import { exampleComposition } from "@/data/composition";

export default function ResultPreview() {
  const top = exampleComposition[0];

  return (
    <section className="relative mx-auto max-w-4xl px-6 py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Result preview"
          title="이렇게 결과를 확인하게 돼요"
          description="테스트가 끝나면, 당신의 성향에 흐르는 스타시드 구성을 한눈에 보여드립니다."
        />
      </Reveal>

      <Reveal delay={120} className="mt-12">
        <GlassCard className="mx-auto max-w-lg p-8 sm:p-10">
          <p className="eyebrow text-left">Sample result</p>
          <h3 className="mt-3 font-serif text-2xl text-ink">
            당신의 스타시드 구성
          </h3>
          <p className="mt-2 text-sm text-ink-muted">
            {top.icon} <span className="text-gold">{top.name}</span>의 기억이 가장 짙게
            흐르고 있어요.
          </p>

          <div className="mt-8">
            <StarseedCompositionChart data={exampleComposition} />
          </div>

          <div className="mt-8 flex justify-center">
            <RippleButton href="/test" variant="primary">
              내 결과 확인하러 가기
            </RippleButton>
          </div>
        </GlassCard>
      </Reveal>
    </section>
  );
}
