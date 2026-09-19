import { STARSEED_TYPES } from "@/data/starseedTypes";
import type { CompositionEntry, StarseedKey } from "@/types/starseed";

/**
 * Illustrative example result for the homepage preview card only.
 * Real per-user results come from `utils/calculateResult.ts`.
 */
const EXAMPLE_PERCENTS: Record<StarseedKey, number> = {
  pleiades: 42,
  andromeda: 26,
  lyra: 18,
  sirius: 9,
  arcturus: 5,
};

export const exampleComposition: CompositionEntry[] = STARSEED_TYPES.map((type) => ({
  ...type,
  percent: EXAMPLE_PERCENTS[type.key],
})).sort((a, b) => b.percent - a.percent);
