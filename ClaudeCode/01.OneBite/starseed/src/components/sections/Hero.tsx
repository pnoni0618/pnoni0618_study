import GoldParticles from "@/components/effects/GoldParticles";
import RippleButton from "@/components/ui/RippleButton";
import Pill from "@/components/ui/Pill";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center">
      <GoldParticles />

      <span className="eyebrow reveal is-visible">Starseed Origin</span>

      <h1 className="mt-6 max-w-4xl text-balance font-serif text-4xl leading-[1.25] text-ink sm:text-5xl md:text-6xl md:leading-[1.2]">
        당신의 영혼은{" "}
        <span className="text-gradient-aurora">어느 별의 기억</span>을 품고
        있을까요?
      </h1>

      <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-ink-muted sm:text-lg">
        성향 분석을 통해 당신과 가장 닮은 스타시드를 찾아보세요.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <RippleButton href="/test" variant="primary">
          ✨ 스타시드 테스트 시작하기
        </RippleButton>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Pill>⏱ 약 3분 소요</Pill>
        <Pill>📝 30개의 질문</Pill>
        <Pill>💫 무료 분석</Pill>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-[120%] -translate-x-1/2 rounded-[100%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(242,193,78,0.08), transparent 70%)",
        }}
      />
    </section>
  );
}
