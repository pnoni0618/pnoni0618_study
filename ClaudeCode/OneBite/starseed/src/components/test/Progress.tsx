interface ProgressProps {
  current: number;
  total: number;
}

/** Current-question indicator + progress bar. Purely presentational. */
export default function Progress({ current, total }: ProgressProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-ink-faint sm:text-sm">
        <span>
          질문 <span className="font-semibold text-ink">{current}</span> / {total}
        </span>
        <span className="tabular-nums">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label="테스트 진행률"
        className="h-2 w-full overflow-hidden rounded-full"
        style={{ background: "var(--surface-solid)" }}
      >
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-out"
          style={{
            width: `${percent}%`,
            background: "linear-gradient(90deg, var(--cosmic-purple-light), var(--gold))",
          }}
        />
      </div>
    </div>
  );
}
