"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import Progress from "@/components/test/Progress";
import Question from "@/components/test/Question";
import Navigation from "@/components/test/Navigation";
import { questions, TOTAL_QUESTIONS } from "@/data/questions";
import { saveTestAnswers } from "@/utils/testSession";
import type { LikertValue, TestAnswers } from "@/types/starseed";

/**
 * Owns the quiz's client-side state: which question is showing and what's
 * been answered so far. `answers` is keyed by question id (not array
 * index), matching what `calculateComposition` (see
 * `utils/calculateResult.ts`) expects — on the last question it's handed
 * off to `/result` via `saveTestAnswers`.
 */
export default function TestFlow() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<TestAnswers>({});

  const currentQuestion = questions[currentIndex];
  const selectedValue = answers[currentQuestion.id];
  const isLast = currentIndex === TOTAL_QUESTIONS - 1;

  function handleSelect(value: LikertValue) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  }

  function handleNext() {
    if (selectedValue === undefined) return;
    if (isLast) {
      saveTestAnswers(answers);
      router.push("/result");
      return;
    }
    setCurrentIndex((i) => Math.min(i + 1, TOTAL_QUESTIONS - 1));
  }

  function handlePrev() {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <div className="mb-8 text-center">
        <span className="eyebrow">Starseed Test</span>
        <h1 className="mt-3 font-serif text-2xl text-ink sm:text-3xl">스타시드 테스트</h1>
      </div>

      <GlassCard className="p-6 sm:p-10">
        <Progress current={currentIndex + 1} total={TOTAL_QUESTIONS} />

        <div key={currentQuestion.id} className="page-fade mt-8">
          <Question question={currentQuestion} selectedValue={selectedValue} onSelect={handleSelect} />
        </div>

        <Navigation
          onPrev={handlePrev}
          onNext={handleNext}
          canGoPrev={currentIndex > 0}
          canGoNext={selectedValue !== undefined}
          isLast={isLast}
        />
      </GlassCard>
    </section>
  );
}
