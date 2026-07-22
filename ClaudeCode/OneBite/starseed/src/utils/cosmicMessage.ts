import { COSMIC_MESSAGES } from "@/data/cosmicMessages";

function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Simple string hash (djb2-ish) — only needs to spread dates across the array, not be cryptographic. */
function hashDateKey(dateKey: string): number {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export interface CosmicMessageOfTheDay {
  dateKey: string;
  message: string;
}

/**
 * Picks one `COSMIC_MESSAGES` entry per calendar day (local time): the same
 * message for everyone on a given day, a different one the next, no backend
 * or stored state required. Hashing the date (rather than day-of-year mod
 * length) keeps the sequence from looking like it's just cycling in array
 * order as the pool grows toward 365.
 */
export function getCosmicMessageForDate(date: Date = new Date()): CosmicMessageOfTheDay {
  const dateKey = formatDateKey(date);
  const index = hashDateKey(dateKey) % COSMIC_MESSAGES.length;
  return { dateKey, message: COSMIC_MESSAGES[index] };
}
