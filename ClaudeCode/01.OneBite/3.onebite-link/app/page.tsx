"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";
import { useLinks } from "@/contexts/LinkContext";

export default function Home() {
  const { links } = useLinks();

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <LinkGrid links={links} />
        </main>
      </div>
    </div>
  );
}
