"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";
import { useFolders } from "@/contexts/FolderContext";
import { links } from "@/lib/links";

export default function FolderPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const { folders } = useFolders();
  const folder = folders.find((item) => item.id === folderId);
  const folderLinks = links.filter((link) => link.folderId === folderId);

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          {folder ? (
            <LinkGrid links={folderLinks} />
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-zinc-400">
              폴더를 찾을 수 없습니다.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
