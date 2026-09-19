"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import Pill from "@/components/ui/Pill";
import RippleButton from "@/components/ui/RippleButton";
import DonutChart from "@/components/charts/DonutChart";
import ProfileSection from "@/components/result/ProfileSection";
import ShareActions from "@/components/result/ShareActions";
import { STARSEED_TYPES } from "@/data/starseedTypes";
import { STARSEED_PROFILES } from "@/data/starseedProfiles";
import { calculateComposition } from "@/utils/calculateResult";
import { clearTestAnswers, loadTestAnswers } from "@/utils/testSession";
import { decodeCompositionParam } from "@/utils/shareResult";
import type { CompositionEntry, TestAnswers } from "@/types/starseed";

function nameOf(key: string) {
  return STARSEED_TYPES.find((type) => type.key === key)?.name ?? key;
}

function iconOf(key: string) {
  return STARSEED_TYPES.find((type) => type.key === key)?.icon ?? "";
}

export default function ResultView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // A shared link (`/result?c=42-26-18-9-5`) carries its own composition,
  // so it renders the same result for any visitor without needing the
  // sessionStorage answers only the original test-taker has.
  const sharedComposition = decodeCompositionParam(searchParams.get("c"));

  const [answers, setAnswers] = useState<TestAnswers | null | undefined>(undefined);

  useEffect(() => {
    if (sharedComposition) return;
    // One-time read of sessionStorage (external system) written by the test
    // flow — not derivable from props/state, so this has to run post-mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnswers(loadTestAnswers());
  }, [sharedComposition]);

  function handleRestart() {
    clearTestAnswers();
    router.push("/test");
  }

  let composition: CompositionEntry[];

  if (sharedComposition) {
    composition = sharedComposition;
  } else {
    // Still checking sessionStorage — render nothing rather than flash an empty state.
    if (answers === undefined) return null;

    if (!answers) {
      return (
        <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
          <GlassCard className="flex flex-col items-center gap-6 p-10 sm:p-14">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cosmic-purple-light to-cosmic-purple text-3xl">
              🌙
            </span>
            <div>
              <span className="eyebrow">No result yet</span>
              <h1 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">아직 결과가 없어요</h1>
              <p className="mt-4 text-balance text-base leading-relaxed text-ink-muted">
                먼저 스타시드 테스트를 완료하면 이 자리에서 결과를 확인할 수 있어요.
              </p>
            </div>
            <RippleButton href="/test" variant="primary">
              ✨ 테스트 시작하기
            </RippleButton>
          </GlassCard>
        </section>
      );
    }

    composition = calculateComposition(answers);
  }

  const dominant = composition[0];
  const profile = STARSEED_PROFILES[dominant.key];

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div className="text-center">
        <span className="eyebrow">Your Result</span>
        <h1 className="mt-3 text-balance font-serif text-3xl leading-tight text-ink sm:text-4xl">
          당신은 <span className="text-gradient-gold">{dominant.icon} {dominant.name}</span> 스타시드예요
        </h1>
        <p className="mt-4 text-balance text-base leading-relaxed text-ink-muted">
          {profile.trait}
        </p>
      </div>

      <div className="mt-14 flex flex-col gap-6">
        <GlassCard className="flex flex-col items-center p-8 sm:p-10">
          <span className="eyebrow mb-6">스타시드 비율</span>
          <DonutChart
            data={composition}
            centerLabel={{ icon: dominant.icon, value: `${dominant.percent}%`, caption: dominant.name }}
          />
        </GlassCard>

        <ProfileSection icon="🌟" title="대표 성향">
          <p className="text-balance text-sm leading-relaxed text-ink-muted sm:text-base">
            {profile.description}
          </p>
        </ProfileSection>

        <div className="grid gap-6 sm:grid-cols-2">
          <ProfileSection icon="💪" title="장점">
            <ul className="flex flex-col gap-3">
              {profile.strengths.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted">
                  <span className="mt-0.5 text-gold">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ProfileSection>

          <ProfileSection icon="⚠️" title="주의할 점">
            <ul className="flex flex-col gap-3">
              {profile.cautions.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted">
                  <span className="mt-0.5 text-cosmic-purple-light">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ProfileSection>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <ProfileSection icon="💼" title="잘 맞는 직업">
            <div className="flex flex-wrap gap-2">
              {profile.careers.map((career) => (
                <Pill key={career}>{career}</Pill>
              ))}
            </div>
          </ProfileSection>

          <ProfileSection icon="🏡" title="추천 환경">
            <ul className="flex flex-col gap-3">
              {profile.environments.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted">
                  <span className="mt-0.5 text-gold">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ProfileSection>
        </div>

        <ProfileSection icon="🧘" title="추천 명상">
          <h3 className="font-serif text-base text-ink">{profile.meditation.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {profile.meditation.description}
          </p>
        </ProfileSection>

        <ProfileSection icon="🔗" title="잘 맞는 스타시드">
          <div className="flex flex-col gap-4">
            {profile.compatibleWith.map((match) => (
              <div key={match.key} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-base">
                  {iconOf(match.key)}
                </span>
                <p className="text-sm leading-relaxed text-ink-muted">
                  <span className="font-semibold text-ink">{nameOf(match.key)}</span> — {match.reason}
                </p>
              </div>
            ))}
          </div>
        </ProfileSection>

        <ProfileSection icon="📤" title="결과 공유하기">
          <ShareActions composition={composition} dominant={dominant} trait={profile.trait} />
        </ProfileSection>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <RippleButton variant="secondary" onClick={handleRestart}>
          ↺ 다시 하기
        </RippleButton>
        <RippleButton variant="primary" href="/">
          홈으로 돌아가기
        </RippleButton>
      </div>
    </section>
  );
}
