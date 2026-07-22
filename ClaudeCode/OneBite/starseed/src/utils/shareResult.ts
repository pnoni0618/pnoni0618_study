import { STARSEED_TYPES } from "@/data/starseedTypes";
import type { CompositionEntry } from "@/types/starseed";

/**
 * Encodes a composition as percents in `STARSEED_TYPES` order (e.g.
 * "42-26-18-9-5") so a result can be reproduced from a URL alone — no
 * backend, no lookup table, just the numbers `/result?c=...` needs.
 */
export function encodeCompositionParam(composition: CompositionEntry[]): string {
  return STARSEED_TYPES.map((type) => composition.find((entry) => entry.key === type.key)?.percent ?? 0).join("-");
}

/**
 * Inverse of `encodeCompositionParam`. Returns null for anything malformed
 * (wrong length, non-numeric, out of range) so callers can fall back to the
 * normal sessionStorage-driven flow instead of rendering a broken result.
 */
export function decodeCompositionParam(param: string | null | undefined): CompositionEntry[] | null {
  if (!param) return null;

  const parts = param.split("-");
  if (parts.length !== STARSEED_TYPES.length) return null;

  const percents = parts.map(Number);
  if (percents.some((value) => !Number.isFinite(value) || value < 0 || value > 100)) return null;

  return STARSEED_TYPES.map((type, index) => ({ ...type, percent: percents[index] })).sort(
    (a, b) => b.percent - a.percent
  );
}

/** Full shareable URL for a given composition, built from the current origin. */
export function buildResultShareUrl(composition: CompositionEntry[]): string {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/result?c=${encodeCompositionParam(composition)}`;
}
