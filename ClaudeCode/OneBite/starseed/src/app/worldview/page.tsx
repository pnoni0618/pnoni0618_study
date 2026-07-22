import type { Metadata } from "next";
import ComingSoon from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "세계관 | Starseed Origin",
  description: "스타시드, 영혼, 환생, 차원, 에너지 등 세계관을 이해해보세요.",
};

export default function WorldviewPage() {
  return (
    <ComingSoon
      icon="🌠"
      eyebrow="Worldview"
      title="세계관"
      description="스타시드, 영혼, 환생, 차원, 에너지로 이어지는 세계관 이야기를 준비하고 있어요."
    />
  );
}
