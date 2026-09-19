import type { LikertOption, TestQuestion } from "@/types/starseed";

export const LIKERT_OPTIONS: LikertOption[] = [
  { value: 5, label: "매우 그렇다" },
  { value: 4, label: "그렇다" },
  { value: 3, label: "보통이다" },
  { value: 2, label: "아니다" },
  { value: 1, label: "전혀 아니다" },
];

/**
 * 30 statements, 6 per starseed archetype, interleaved so the same one
 * never appears twice in a row. Each question's `weights` is what
 * `utils/calculateResult.ts` accumulates against the selected Likert value —
 * most questions weight a single archetype, but a question can weight
 * several (see `calculateResult.ts` for how that's summed).
 */
export const questions: TestQuestion[] = [
  { id: 1, text: "나는 다른 사람의 감정을 쉽게 알아차리고 공감한다.", weights: { pleiades: 1 } },
  { id: 2, text: "나는 정해진 틀이나 규칙에 얽매이는 것을 답답하게 느낀다.", weights: { andromeda: 1 } },
  { id: 3, text: "나는 무언가를 새롭게 만들어내는 상상과 창작이 즐겁다.", weights: { lyra: 1 } },
  { id: 4, text: "나는 목표를 세우면 체계적으로 계획을 세워 실행한다.", weights: { sirius: 1 } },
  { id: 5, text: "나는 눈앞의 상황보다 더 큰 그림을 먼저 이해하려 한다.", weights: { arcturus: 1 } },

  { id: 6, text: "힘들어하는 사람을 보면 먼저 다가가 위로하고 싶어진다.", weights: { pleiades: 1 } },
  { id: 7, text: "새로운 곳으로 떠나거나 낯선 환경에 도전하는 것이 즐겁다.", weights: { andromeda: 1 } },
  { id: 8, text: "논리보다 직감이 맞다고 느껴질 때가 많다.", weights: { lyra: 1 } },
  { id: 9, text: "감정보다 논리와 사실을 바탕으로 판단하는 편이다.", weights: { sirius: 1 } },
  { id: 10, text: "어떤 선택을 할 때 그것이 미치는 영향을 신중하게 고려한다.", weights: { arcturus: 1 } },

  { id: 11, text: "나는 관계 속에서 조화와 평화를 중요하게 생각한다.", weights: { pleiades: 1 } },
  { id: 12, text: "남들과 다른 길을 가더라도 나만의 방식을 고집하는 편이다.", weights: { andromeda: 1 } },
  { id: 13, text: "나만의 개성과 스타일을 표현하는 것이 중요하다.", weights: { lyra: 1 } },
  { id: 14, text: "나는 자연스럽게 무리를 이끌고 방향을 제시하는 역할을 맡는다.", weights: { sirius: 1 } },
  { id: 15, text: "나는 위기 상황에서도 비교적 침착함을 유지하는 편이다.", weights: { arcturus: 1 } },

  { id: 16, text: "아름다운 음악이나 풍경을 보면 마음이 쉽게 움직인다.", weights: { pleiades: 1 } },
  { id: 17, text: "나는 자유롭게 결정하고 행동할 때 가장 나답다고 느낀다.", weights: { andromeda: 1 } },
  { id: 18, text: "예술, 음악, 이야기 속에 깊이 몰입하는 편이다.", weights: { lyra: 1 } },
  { id: 19, text: "문제가 생기면 빠르게 원인을 분석하고 해결책을 찾는다.", weights: { sirius: 1 } },
  { id: 20, text: "사람들은 종종 나에게 조언이나 지혜를 구하러 온다.", weights: { arcturus: 1 } },

  { id: 21, text: "나는 누군가의 이야기를 들어주는 것만으로도 큰 힘이 된다고 느낀다.", weights: { pleiades: 1 } },
  { id: 22, text: "기존의 방식에 의문을 품고 새로운 방법을 시도해보고 싶어진다.", weights: { andromeda: 1 } },
  { id: 23, text: "나는 본능적으로 위험을 감지하거나 상황을 직감적으로 파악한다.", weights: { lyra: 1 } },
  { id: 24, text: "나는 정확하고 효율적인 방식으로 일하는 것을 선호한다.", weights: { sirius: 1 } },
  { id: 25, text: "나는 개인의 이익보다 더 나은 방향을 위한 선택을 하려 한다.", weights: { arcturus: 1 } },

  { id: 26, text: "갈등이 생기면 다투기보다 화해할 방법을 먼저 찾는다.", weights: { pleiades: 1 } },
  { id: 27, text: "누군가 나를 통제하려 하면 강하게 거부감을 느낀다.", weights: { andromeda: 1 } },
  { id: 28, text: "틀에 박힌 것보다 자유로운 발상이 더 편하다.", weights: { lyra: 1 } },
  { id: 29, text: "새로운 지식이나 기술을 배우는 것에 강한 흥미를 느낀다.", weights: { sirius: 1 } },
  { id: 30, text: "오래전부터 이 모든 것을 알고 있었던 듯한 익숙함을 느낄 때가 있다.", weights: { arcturus: 1 } },
];

export const TOTAL_QUESTIONS = questions.length;
