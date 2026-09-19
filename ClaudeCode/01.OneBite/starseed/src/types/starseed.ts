/** The five starseed archetypes the test scores against. */
export type StarseedKey = "pleiades" | "andromeda" | "lyra" | "sirius" | "arcturus";

export interface StarseedType {
  key: StarseedKey;
  name: string;
  icon: string;
  colorVar: string;
}

export interface CompositionEntry extends StarseedType {
  percent: number;
}

export interface MainMenuItem {
  slug: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  accent: "gold" | "purple" | "indigo" | "teal";
  available: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}

/** 5-point Likert scale: 5 = 매우 그렇다 … 1 = 전혀 아니다. */
export type LikertValue = 1 | 2 | 3 | 4 | 5;

export interface LikertOption {
  value: LikertValue;
  label: string;
}

/**
 * How strongly a question scores toward each starseed archetype. Most
 * questions weight a single key; a question may weight several at once.
 * Missing keys count as 0. A negative weight reverse-scores that key
 * (higher agreement lowers it) without needing a separate flag.
 */
export type StarseedWeights = Partial<Record<StarseedKey, number>>;

export interface TestQuestion {
  id: number;
  text: string;
  weights: StarseedWeights;
}

/** questionId -> selected value. Keyed by id (not index) so answers survive reordering. */
export type TestAnswers = Record<number, LikertValue>;

/** Result-page content for one archetype — the encyclopedia entry, essentially. */
export interface StarseedProfile {
  key: StarseedKey;
  /** 대표 성향: one-line headline + a short paragraph. */
  trait: string;
  description: string;
  /** 장점 */
  strengths: string[];
  /** 주의할 점 */
  cautions: string[];
  /** 잘 맞는 직업 */
  careers: string[];
  /** 추천 환경 */
  environments: string[];
  /** 추천 명상 */
  meditation: { title: string; description: string };
  /** 잘 맞는 스타시드 */
  compatibleWith: { key: StarseedKey; reason: string }[];
}
