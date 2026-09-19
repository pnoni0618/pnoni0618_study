import { questions } from "@/data/questions";
import { STARSEED_TYPES } from "@/data/starseedTypes";
import type { CompositionEntry, StarseedKey, TestAnswers } from "@/types/starseed";

export type StarseedScores = Record<StarseedKey, number>;

function createEmptyScores(): StarseedScores {
  return Object.fromEntries(STARSEED_TYPES.map((type) => [type.key, 0])) as StarseedScores;
}

/**
 * Sums `weight * selectedValue` for every answered question, per starseed
 * key. Questions with no answer yet are skipped, so this can also score
 * partial progress. Adding a new starseed type or a new weighted question
 * needs no change here — it just reads whatever `STARSEED_TYPES` and
 * `questions` currently contain.
 */
export function calculateScores(answers: TestAnswers): StarseedScores {
  const scores = createEmptyScores();

  for (const question of questions) {
    const selected = answers[question.id];
    if (selected === undefined) continue;

    for (const key of Object.keys(question.weights) as StarseedKey[]) {
      const weight = question.weights[key] ?? 0;
      scores[key] += weight * selected;
    }
  }

  return scores;
}

/**
 * Largest-remainder rounding: floor every share, then hand the leftover
 * whole points to the entries with the biggest fractional part. Keeps
 * percentages as accurate integers that always sum to exactly 100.
 */
function toPercentages(values: number[]): number[] {
  const total = values.reduce((sum, value) => sum + value, 0);
  if (total <= 0) return values.map(() => 0);

  const exact = values.map((value) => (value / total) * 100);
  const floors = exact.map(Math.floor);
  const remainder = 100 - floors.reduce((sum, value) => sum + value, 0);

  const byRemainder = exact
    .map((value, index) => ({ index, fraction: value - floors[index] }))
    .sort((a, b) => b.fraction - a.fraction);

  const result = [...floors];
  for (let i = 0; i < remainder; i++) {
    result[byRemainder[i].index] += 1;
  }
  return result;
}

/**
 * Raw scores turned into the 0-100% breakdown `StarseedCompositionChart`
 * expects — sorted strongest first. Negative (e.g. reverse-scored) totals
 * clamp to 0 rather than eating into another archetype's share.
 */
export function calculateComposition(answers: TestAnswers): CompositionEntry[] {
  const scores = calculateScores(answers);
  const clamped = STARSEED_TYPES.map((type) => Math.max(scores[type.key], 0));
  const percentages = toPercentages(clamped);

  return STARSEED_TYPES.map((type, index) => ({
    ...type,
    percent: percentages[index],
  })).sort((a, b) => b.percent - a.percent);
}

/** The single strongest archetype, or null if nothing's been answered yet. */
export function calculateDominantType(answers: TestAnswers): CompositionEntry | null {
  const composition = calculateComposition(answers);
  return composition[0] && composition[0].percent > 0 ? composition[0] : null;
}
