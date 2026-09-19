import type { Metadata } from "next";
import EncyclopediaView from "@/components/encyclopedia/EncyclopediaView";

export const metadata: Metadata = {
  title: "스타시드 백과사전 | Starseed Origin",
  description: "모든 스타시드 유형과 특징을 쉽게 알아보세요.",
};

export default function EncyclopediaPage() {
  return <EncyclopediaView />;
}
