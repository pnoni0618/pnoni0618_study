"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { LinkItem } from "@/components/LinkCard";

type LinkUpdate = Partial<Pick<LinkItem, "title" | "description" | "folderId">>;

type LinkContextValue = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id">) => Promise<void>;
  deleteLink: (id: string) => void;
  updateLink: (id: string, updates: LinkUpdate) => void;
};

const LinkContext = createContext<LinkContextValue | null>(null);

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("links")
      .select("id, url, title, description, thumbnail_url, folder_id")
      .order("id", { ascending: true })
      .then(({ data }) => {
        if (data) {
          setLinks(
            data.map((link) => ({
              id: String(link.id),
              title: link.title ?? "",
              url: link.url,
              description: link.description ?? "",
              thumbnailUrl: link.thumbnail_url ?? undefined,
              folderId: link.folder_id !== null ? String(link.folder_id) : "",
            })),
          );
        }
      });
  }, []);

  const addLink = async (link: Omit<LinkItem, "id">) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("links")
      .insert({
        url: link.url,
        title: link.title,
        description: link.description,
        thumbnail_url: link.thumbnailUrl,
        folder_id: link.folderId ? Number(link.folderId) : null,
      })
      .select("id, url, title, description, thumbnail_url, folder_id")
      .single();

    if (error || !data) {
      throw error ?? new Error("링크를 추가하지 못했습니다.");
    }

    const newLink: LinkItem = {
      id: String(data.id),
      title: data.title ?? "",
      url: data.url,
      description: data.description ?? "",
      thumbnailUrl: data.thumbnail_url ?? undefined,
      folderId: data.folder_id !== null ? String(data.folder_id) : "",
    };
    setLinks((prev) => [...prev, newLink]);
  };

  const deleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const updateLink = (id: string, updates: LinkUpdate) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...updates } : link)),
    );
  };

  return (
    <LinkContext.Provider value={{ links, addLink, deleteLink, updateLink }}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinkProvider");
  }
  return context;
}
