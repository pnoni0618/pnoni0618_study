import type { StarseedType } from "@/types/starseed";

/**
 * Single source of truth for every starseed archetype. The test's scoring
 * engine, the question weights, and every result chart all iterate this
 * list instead of hardcoding the five keys.
 *
 * To add a new archetype: add its key to `StarseedKey` in
 * `types/starseed.ts`, add an entry here (with a free `--chart-N` token
 * from `globals.css`, validated with the dataviz palette checker), then
 * give some questions in `data/questions.ts` a weight for it.
 */
export const STARSEED_TYPES: StarseedType[] = [
  { key: "pleiades", name: "플레이아데스", icon: "🌌", colorVar: "--chart-1" },
  { key: "andromeda", name: "안드로메다", icon: "⭐", colorVar: "--chart-2" },
  { key: "lyra", name: "리라", icon: "💎", colorVar: "--chart-3" },
  { key: "sirius", name: "시리우스", icon: "🔷", colorVar: "--chart-4" },
  { key: "arcturus", name: "아크투루스", icon: "🪐", colorVar: "--chart-5" },
];
