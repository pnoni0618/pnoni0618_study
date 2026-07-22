import type { TestAnswers } from "@/types/starseed";

const STORAGE_KEY = "starseed-test-answers";

/**
 * Hands answers from the `/test` flow to the `/result` page across a real
 * navigation. sessionStorage is a placeholder for wherever results end up
 * living later (account/back end) — `/result` only depends on this file's
 * three functions, not on *how* answers are persisted.
 */
export function saveTestAnswers(answers: TestAnswers): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

export function loadTestAnswers(): TestAnswers | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as TestAnswers;
  } catch {
    return null;
  }
}

export function clearTestAnswers(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}
