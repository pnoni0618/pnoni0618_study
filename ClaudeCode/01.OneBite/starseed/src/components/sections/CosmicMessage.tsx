"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/effects/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import { getCosmicMessageForDate } from "@/utils/cosmicMessage";

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("ko-KR", { month: "long", day: "numeric", weekday: "long" });
}

/**
 * Today's message is resolved client-side on mount (not during the static
 * build) so it actually changes day to day — the homepage is statically
 * prerendered, so anything computed at build time would freeze at whatever
 * date the build happened to run on.
 */
export default function CosmicMessage() {
  const [today, setToday] = useState<{ dateLabel: string; message: string } | null>(null);

  useEffect(() => {
    const now = new Date();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday({ dateLabel: formatDisplayDate(now), message: getCosmicMessageForDate(now).message });
  }, []);

  return (
    <section className="relative mx-auto max-w-2xl px-6 py-16">
      <Reveal>
        <GlassCard className="flex flex-col items-center gap-5 p-8 text-center sm:p-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cosmic-purple-light to-cosmic-purple text-xl">
            🌌
          </span>

          <div>
            <span className="eyebrow">Today&apos;s Cosmic Message</span>
            <p className="mt-2 text-xs text-ink-faint">{today?.dateLabel ?? "오늘의 우주 메시지"}</p>
          </div>

          <p className="min-h-[4.5rem] text-balance font-serif text-xl leading-relaxed text-ink sm:text-2xl">
            {today ? `“${today.message}”` : "우주가 오늘의 메시지를 준비하고 있어요…"}
          </p>

          <p className="text-xs text-ink-faint">매일 자정, 새로운 우주의 메시지가 도착해요</p>
        </GlassCard>
      </Reveal>
    </section>
  );
}
