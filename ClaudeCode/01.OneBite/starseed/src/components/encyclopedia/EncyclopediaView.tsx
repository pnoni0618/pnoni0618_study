"use client";

import { useState } from "react";
import Reveal from "@/components/effects/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Pill from "@/components/ui/Pill";
import RippleButton from "@/components/ui/RippleButton";
import ProfileSection from "@/components/result/ProfileSection";
import { STARSEED_TYPES } from "@/data/starseedTypes";
import { STARSEED_PROFILES } from "@/data/starseedProfiles";
import type { StarseedKey } from "@/types/starseed";

function nameOf(key: StarseedKey) {
  return STARSEED_TYPES.find((type) => type.key === key)?.name ?? key;
}

function iconOf(key: StarseedKey) {
  return STARSEED_TYPES.find((type) => type.key === key)?.icon ?? "";
}

/**
 * All five archetypes browsable in one place — a type selector reusing the
 * same `STARSEED_TYPES` registry and `STARSEED_PROFILES` content the result
 * page draws from, so a new archetype needs no change here.
 */
export default function EncyclopediaView() {
  const [selected, setSelected] = useState<StarseedKey>(STARSEED_TYPES[0].key);
  const type = STARSEED_TYPES.find((t) => t.key === selected)!;
  const profile = STARSEED_PROFILES[selected];

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Encyclopedia"
          title="스타시드 백과사전"
          description="모든 스타시드 유형과 그 고유한 특징을 살펴보세요."
        />
      </Reveal>

      <Reveal delay={100} className="mt-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {STARSEED_TYPES.map((t) => {
            const active = t.key === selected;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setSelected(t.key)}
                className="glass-card flex flex-col items-center gap-2 rounded-2xl px-3 py-4 text-center transition-colors"
                style={{
                  borderColor: active ? `var(${t.colorVar})` : undefined,
                  boxShadow: active ? `0 0 32px -14px var(${t.colorVar})` : undefined,
                }}
              >
                <span className="text-2xl">{t.icon}</span>
                <span
                  className="text-xs font-semibold sm:text-sm"
                  style={{ color: active ? `var(${t.colorVar})` : "var(--ink-muted)" }}
                >
                  {t.name}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={160} className="mt-10">
        <div key={type.key} className="page-fade flex flex-col gap-6">
          <GlassCard className="flex flex-col items-center gap-4 p-8 text-center sm:p-10">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
              style={{ background: `color-mix(in srgb, var(${type.colorVar}) 22%, transparent)` }}
            >
              {type.icon}
            </span>
            <div>
              <span className="eyebrow">{type.name}</span>
              <h2 className="mt-3 text-balance font-serif text-2xl text-ink sm:text-3xl">
                {profile.trait}
              </h2>
              <p className="mt-4 text-balance text-sm leading-relaxed text-ink-muted sm:text-base">
                {profile.description}
              </p>
            </div>
          </GlassCard>

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
        </div>
      </Reveal>

      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-ink-muted">
          나는 어떤 유형에 가장 가까울까요? 테스트로 직접 확인해보세요.
        </p>
        <RippleButton href="/test" variant="primary">
          ✨ 스타시드 테스트 시작하기
        </RippleButton>
      </div>
    </section>
  );
}
