import type { Metadata } from "next";
import { Suspense } from "react";
import ResultView from "@/components/result/ResultView";

export const metadata: Metadata = {
  title: "테스트 결과 | Starseed Origin",
  description: "당신과 가장 닮은 스타시드 구성과 대표 성향을 확인해보세요.",
};

export default function ResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultView />
    </Suspense>
  );
}
