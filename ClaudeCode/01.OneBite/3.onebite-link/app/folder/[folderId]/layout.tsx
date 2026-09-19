import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "폴더",
};

export default function FolderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
