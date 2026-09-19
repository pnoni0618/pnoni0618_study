import type { MainMenuItem, NavLink } from "@/types/starseed";

/**
 * Single source of truth for primary sections. Add a new entry here (and its
 * matching route under src/app) to extend the site — cards, header nav, and
 * footer links all read from this list.
 */
export const mainMenuItems: MainMenuItem[] = [
  {
    slug: "test",
    icon: "🌌",
    title: "스타시드 테스트",
    description: "30개의 질문을 통해\n당신과 가장 닮은 스타시드를 분석합니다.",
    cta: "테스트 시작",
    href: "/test",
    accent: "gold",
    available: true,
  },
  {
    slug: "encyclopedia",
    icon: "📖",
    title: "스타시드 백과사전",
    description: "모든 스타시드 유형과 특징을 쉽게 알아보세요.",
    cta: "백과사전 보기",
    href: "/encyclopedia",
    accent: "purple",
    available: true,
  },
  {
    slug: "worldview",
    icon: "🌠",
    title: "세계관",
    description: "스타시드, 영혼, 환생, 차원, 에너지 등\n세계관을 이해해보세요.",
    cta: "세계관 보기",
    href: "/worldview",
    accent: "indigo",
    available: true,
  },
];

export const navLinks: NavLink[] = [
  { label: "홈", href: "/" },
  ...mainMenuItems.map((item) => ({ label: item.title.replace("스타시드 ", ""), href: item.href })),
];
