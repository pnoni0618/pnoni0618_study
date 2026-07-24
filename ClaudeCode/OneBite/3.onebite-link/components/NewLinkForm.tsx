"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/contexts/FolderContext";
import { useLinks } from "@/contexts/LinkContext";

type OgResponse = {
  url: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  error?: string;
};

export default function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addLink } = useLinks();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(folders[0]?.id ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!folderId) {
      setError("먼저 폴더를 만들어주세요.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const data: OgResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "링크 정보를 가져오지 못했습니다.");
      }

      addLink({
        title: data.title || url,
        url: data.url,
        description: data.description,
        thumbnailUrl: data.thumbnailUrl,
        folderId,
      });

      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "링크 정보를 가져오지 못했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="url"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          링크 주소
        </label>
        <input
          id="url"
          type="url"
          required
          placeholder="https://example.com"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="folder"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          폴더
        </label>
        <select
          id="folder"
          value={folderId}
          onChange={(event) => setFolderId(event.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        >
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {isSubmitting ? "확인 중..." : "확인"}
      </button>
    </form>
  );
}
