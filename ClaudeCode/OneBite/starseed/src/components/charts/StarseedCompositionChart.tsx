import type { CompositionEntry } from "@/types/starseed";

/**
 * Part-to-whole composition, rendered as a single segmented bar (categorical
 * colors, fixed order) with a legend list underneath — every value stays in
 * real text so nothing is color-only.
 */
export default function StarseedCompositionChart({ data }: { data: CompositionEntry[] }) {
  return (
    <figure>
      <figcaption className="sr-only">
        스타시드 성향 구성 비율:{" "}
        {data.map((d) => `${d.name} ${d.percent}%`).join(", ")}
      </figcaption>

      <div
        className="flex h-6 w-full gap-[2px] overflow-hidden rounded-full"
        style={{ background: "var(--surface-solid)" }}
        role="img"
        aria-hidden
      >
        {data.map((entry) => (
          <div
            key={entry.key}
            style={{
              flexGrow: entry.percent,
              flexBasis: 0,
              background: `linear-gradient(180deg, rgba(255,255,255,0.28), transparent 55%), var(${entry.colorVar})`,
            }}
            title={`${entry.name} ${entry.percent}%`}
          />
        ))}
      </div>

      <ul className="mt-6 flex flex-col" aria-hidden>
        {data.map((entry) => (
          <li
            key={entry.key}
            className="flex items-center justify-between gap-3 border-b border-white/5 py-2.5 last:border-0"
          >
            <span className="flex items-center gap-2.5 text-sm text-ink-muted">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: `var(${entry.colorVar})` }}
              />
              <span>{entry.icon}</span>
              <span>{entry.name}</span>
            </span>
            <span className="font-serif text-sm font-semibold text-ink tabular-nums">
              {entry.percent}%
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
