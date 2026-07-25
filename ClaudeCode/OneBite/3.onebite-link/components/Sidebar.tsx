"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useFolders } from "@/contexts/FolderContext";
import type { Folder } from "@/lib/folders";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { folders, deleteFolder, renameFolder } = useFolders();
  const [deleteTarget, setDeleteTarget] = useState<Folder | null>(null);
  const [editTarget, setEditTarget] = useState<Folder | null>(null);
  const [editName, setEditName] = useState("");
  const [editError, setEditError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const closeDeleteModal = () => {
    setDeleteTarget(null);
    setDeleteError("");
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteError("");
    try {
      await deleteFolder(deleteTarget.id);
      if (pathname === `/folder/${deleteTarget.id}`) {
        router.push("/");
      }
      closeDeleteModal();
    } catch {
      setDeleteError("폴더를 삭제하지 못했습니다.");
    }
  };

  const openEditModal = (folder: Folder) => {
    setEditTarget(folder);
    setEditName(folder.name);
  };

  const closeEditModal = () => {
    setEditTarget(null);
    setEditName("");
    setEditError("");
  };

  const handleEditSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editTarget) return;
    const trimmed = editName.trim();
    if (!trimmed) return;

    setEditError("");
    try {
      await renameFolder(editTarget.id, trimmed);
      closeEditModal();
    } catch {
      setEditError("폴더 이름을 수정하지 못했습니다.");
    }
  };

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-1 border-r border-zinc-200 bg-white px-3 py-6 dark:border-zinc-800 dark:bg-black">
      <Link
        href="/"
        className={`rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
          pathname === "/"
            ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
            : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        }`}
      >
        All
      </Link>
      <nav className="mt-4 flex flex-col gap-1">
        {folders.map((folder) => {
          const href = `/folder/${folder.id}`;
          const isActive = pathname === href;

          return (
            <div key={folder.id} className="group relative flex items-center">
              <Link
                href={href}
                className={`flex-1 truncate rounded-lg py-2 pl-3 pr-14 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-zinc-100 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
              >
                {folder.name}
              </Link>
              <div className="absolute right-1.5 flex items-center gap-0.5 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => openEditModal(folder)}
                  aria-label={`${folder.name} 폴더 수정`}
                  className="rounded-md p-1 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-700 dark:hover:text-zinc-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M17 3a2.83 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="M15 5l4 4" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(folder)}
                  aria-label={`${folder.name} 폴더 삭제`}
                  className="rounded-md p-1 text-zinc-400 hover:bg-zinc-200 hover:text-red-600 dark:hover:bg-zinc-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </nav>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
            <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              폴더 삭제
            </h2>
            <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
              &apos;{deleteTarget.name}&apos; 폴더를 삭제하시겠습니까?
            </p>
            {deleteError && (
              <p className="mb-4 text-sm text-red-600 dark:text-red-400">
                {deleteError}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              폴더 이름 수정
            </h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="editFolderName"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  폴더 이름
                </label>
                <input
                  id="editFolderName"
                  type="text"
                  autoFocus
                  required
                  placeholder="폴더 이름을 입력하세요"
                  value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                  className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </div>

              {editError && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {editError}
                </p>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
}
