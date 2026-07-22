import type { Metadata } from "next";
import TestFlow from "@/components/test/TestFlow";

export const metadata: Metadata = {
  title: "스타시드 테스트 | Starseed Origin",
  description: "30개의 질문을 통해 당신과 가장 닮은 스타시드를 분석합니다.",
};

export default function TestPage() {
  return <TestFlow />;
}
