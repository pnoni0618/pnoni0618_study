import type { Metadata, Viewport } from "next";
import { Cinzel, Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import CosmicBackground from "@/components/effects/CosmicBackground";
import GalaxyLoader from "@/components/effects/GalaxyLoader";
import PageTransition from "@/components/effects/PageTransition";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Starseed Origin | 나는 어느 별에서 왔을까?",
  description:
    "당신의 성향을 분석하여 가장 닮은 스타시드를 찾아드립니다. 신비롭고 몽환적인 우주 컨셉의 성향 테스트, Starseed Origin.",
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${notoSerifKr.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-deep-space text-ink">
        <GalaxyLoader />
        <CosmicBackground />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <SiteHeader />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
