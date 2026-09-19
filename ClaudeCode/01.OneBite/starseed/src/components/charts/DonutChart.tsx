import type { CompositionEntry } from "@/types/starseed";

interface DonutChartProps {
  data: CompositionEntry[];
  centerLabel?: { icon: string; value: string; caption: string };
}

const SIZE = 240;
const CENTER = SIZE / 2;
const RADIUS = 92;
const STROKE = 34;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 5; // px along the arc, separates adjacent segments

/**
 * Part-to-whole composition as a ring: same validated categorical palette
 * and data as `StarseedCompositionChart`, just the circular form the
 * result page asked for. Every value still lives in real legend text, not
 * color alone.
 */
export default function DonutChart({ data, centerLabel }: DonutChartProps) {
  const { segments } = data.reduce<{
    cumulative: number;
    segments: { entry: CompositionEntry; dasharray: string; dashoffset: number }[];
  }>(
    (acc, entry) => {
      const arcLength = (entry.percent / 100) * CIRCUMFERENCE;
      const visible = Math.max(arcLength - GAP, 0);
      return {
        cumulative: acc.cumulative + arcLength,
        segments: [
          ...acc.segments,
          { entry, dasharray: `${visible} ${CIRCUMFERENCE - visible}`, dashoffset: -acc.cumulative },
        ],
      };
    },
    { cumulative: 0, segments: [] }
  );
  const visibleSegments = segments.filter((segment) => segment.entry.percent > 0);

  return (
    <figure className="flex flex-col items-center">
      <figcaption className="sr-only">
        스타시드 비율: {data.map((d) => `${d.name} ${d.percent}%`).join(", ")}
      </figcaption>

      <div className="relative" style={{ width: SIZE, height: SIZE }} role="img" aria-hidden>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <g transform={`rotate(-90 ${CENTER} ${CENTER})`}>
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="var(--surface-solid)"
              strokeWidth={STROKE}
            />
            {visibleSegments.map(({ entry, dasharray, dashoffset }) => (
              <circle
                key={entry.key}
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke={`var(${entry.colorVar})`}
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={dasharray}
                strokeDashoffset={dashoffset}
              />
            ))}
          </g>
        </svg>

        {centerLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <span className="text-3xl">{centerLabel.icon}</span>
            <span className="font-serif text-2xl text-ink">{centerLabel.value}</span>
            <span className="text-xs text-ink-faint">{centerLabel.caption}</span>
          </div>
        )}
      </div>

      <ul className="mt-8 flex w-full flex-col" aria-hidden>
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
