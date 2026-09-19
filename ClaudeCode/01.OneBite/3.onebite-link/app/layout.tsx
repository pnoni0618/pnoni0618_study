import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FolderProvider } from "@/contexts/FolderContext";
import { LinkProvider } from "@/contexts/LinkContext";
import { ToastProvider } from "@/contexts/ToastContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "한입 링크";
const description = "나만의 링크를 폴더별로 저장하고 정리하는 한입 링크입니다.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  openGraph: {
    title,
    description,
    images: [{ url: "/thumbnail.png" }],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <FolderProvider>
            <LinkProvider>{children}</LinkProvider>
          </FolderProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
