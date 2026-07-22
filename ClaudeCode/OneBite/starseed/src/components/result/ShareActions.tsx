"use client";

import { useMemo, useRef, useState } from "react";
import { createResultCardBlob } from "@/utils/resultCard";
import { buildResultShareUrl } from "@/utils/shareResult";
import type { CompositionEntry } from "@/types/starseed";

interface ShareActionsProps {
  composition: CompositionEntry[];
  dominant: CompositionEntry;
  trait: string;
}

type ActionKey = "png" | "copy" | "x" | "link";

const ACTIONS: { key: ActionKey; icon: string; label: string }[] = [
  { key: "png", icon: "🖼️", label: "PNG 카드 생성" },
  { key: "copy", icon: "📋", label: "복사하기" },
  { key: "x", icon: "𝕏", label: "X 공유" },
  { key: "link", icon: "🔗", label: "링크 복사" },
];

/**
 * The four share actions on the result page. The PNG card is drawn once per
 * mount and cached (`cardBlobRef`) so "복사하기" and repeat "PNG 카드 생성"
 * clicks don't redraw the canvas. All actions funnel through `runAction` so
 * busy/disabled state and the status message stay consistent.
 */
export default function ShareActions({ composition, dominant, trait }: ShareActionsProps) {
  const [busy, setBusy] = useState<ActionKey | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const cardBlobRef = useRef<Promise<Blob> | null>(null);
  const statusTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const shareUrl = useMemo(() => buildResultShareUrl(composition), [composition]);
  const shareText = `나는 ${dominant.icon} ${dominant.name} 스타시드였어요! ${trait}\n당신과 가장 닮은 스타시드도 확인해보세요.`;

  function getCardBlob(): Promise<Blob> {
    if (!cardBlobRef.current) {
      cardBlobRef.current = createResultCardBlob(composition, dominant);
    }
    return cardBlobRef.current;
  }

  async function runAction(key: ActionKey, run: () => Promise<string>) {
    setBusy(key);
    try {
      setStatus(await run());
    } catch {
      setStatus("문제가 발생했어요. 다시 시도해주세요");
    } finally {
      setBusy(null);
      clearTimeout(statusTimeoutRef.current);
      statusTimeoutRef.current = setTimeout(() => setStatus(null), 3200);
    }
  }

  function handleAction(key: ActionKey) {
    switch (key) {
      case "png":
        return runAction(key, async () => {
          const blob = await getCardBlob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `starseed-${dominant.key}.png`;
          link.click();
          URL.revokeObjectURL(url);
          return "카드 이미지를 저장했어요";
        });
      case "copy":
        return runAction(key, async () => {
          const blob = await getCardBlob();
          if (typeof ClipboardItem !== "undefined") {
            await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
            return "카드 이미지를 클립보드에 복사했어요";
          }
          await navigator.clipboard.writeText(shareUrl);
          return "이 브라우저는 이미지 복사를 지원하지 않아 링크를 복사했어요";
        });
      case "x":
        return runAction(key, async () => {
          const intentUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
          window.open(intentUrl, "_blank", "noopener,noreferrer");
          return "X 공유창을 열었어요";
        });
      case "link":
        return runAction(key, async () => {
          await navigator.clipboard.writeText(shareUrl);
          return "결과 링크를 복사했어요";
        });
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        {ACTIONS.map((action) => (
          <button
            key={action.key}
            type="button"
            onClick={() => handleAction(action.key)}
            disabled={busy !== null}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-[color:var(--border-glass)] bg-white/[0.03] px-3 py-3.5 text-center text-ink-muted transition-colors hover:border-[color:var(--border-glass-strong)] hover:text-ink disabled:opacity-50"
          >
            <span className="text-lg">{busy === action.key ? "⋯" : action.icon}</span>
            <span className="text-[0.7rem] leading-tight sm:text-xs">{action.label}</span>
          </button>
        ))}
      </div>
      <p aria-live="polite" className="min-h-[1.25rem] text-sm text-gold-soft">
        {status}
      </p>
    </div>
  );
}
