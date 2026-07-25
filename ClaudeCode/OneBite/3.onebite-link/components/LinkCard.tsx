"use client";

import { useState } from "react";
import { useFolders } from "@/contexts/FolderContext";
import { useLinks } from "@/contexts/LinkContext";

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnailUrl?: string;
  folderId: string;
};

export default function LinkCard({
  id,
  title,
  url,
  description,
  thumbnailUrl,
  folderId,
}: LinkItem) {
  const { folders } = useFolders();
  const { deleteLink, updateLink } = useLinks();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editFolderId, setEditFolderId] = useState(folderId);
  const [editError, setEditError] = useState("");

  const openEditModal = () => {
    setEditTitle(title);
    setEditDescription(description);
    setEditFolderId(folderId);
    setEditError("");
    setIsEditOpen(true);
  };

  const closeEditModal = () => setIsEditOpen(false);

  const handleEditSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle) return;

    setEditError("");
    try {
      await updateLink(id, {
        title: trimmedTitle,
        description: editDescription.trim(),
        folderId: editFolderId,
      });
      closeEditModal();
    } catch {
      setEditError("링크를 수정하지 못했습니다.");
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col"
      >
        <div className="flex h-32 w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
          {thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnailUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm text-zinc-400">No Image</span>
          )}
        </div>
        <div className="flex flex-col gap-1 p-4">
          <h3 className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {title}
          </h3>
          <p className="line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
          <span className="mt-1 truncate text-xs text-zinc-400 dark:text-zinc-500">
            {url}
          </span>
        </div>
      </a>

      <div className="absolute right-3 top-3 flex items-center gap-1.5 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
        <button
          type="button"
          onClick={openEditModal}
          aria-label={`${title} 링크 수정`}
          className="rounded-full bg-white p-2 text-zinc-600 shadow-md ring-1 ring-black/5 transition-transform duration-150 hover:scale-110 hover:text-zinc-900 focus-visible:scale-110"
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
          onClick={() => setIsConfirmOpen(true)}
          aria-label={`${title} 링크 삭제`}
          className="rounded-full bg-white p-2 text-zinc-600 shadow-md ring-1 ring-black/5 transition-transform duration-150 hover:scale-110 hover:text-zinc-900 focus-visible:scale-110"
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

      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
            <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              링크 삭제
            </h2>
            <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
              &apos;{title}&apos; 링크를 삭제하시겠습니까?
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteLink(id);
                  setIsConfirmOpen(false);
                }}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              링크 수정
            </h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={`edit-folder-${id}`}
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  폴더
                </label>
                <select
                  id={`edit-folder-${id}`}
                  value={editFolderId}
                  onChange={(event) => setEditFolderId(event.target.value)}
                  className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                >
                  {folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={`edit-title-${id}`}
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  제목
                </label>
                <input
                  id={`edit-title-${id}`}
                  type="text"
                  required
                  value={editTitle}
                  onChange={(event) => setEditTitle(event.target.value)}
                  className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={`edit-description-${id}`}
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  설명
                </label>
                <textarea
                  id={`edit-description-${id}`}
                  rows={3}
                  value={editDescription}
                  onChange={(event) => setEditDescription(event.target.value)}
                  className="resize-none rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
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
    </div>
  );
}
