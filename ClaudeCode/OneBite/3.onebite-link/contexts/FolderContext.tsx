"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Folder } from "@/lib/folders";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  deleteFolder: (id: string) => void;
  renameFolder: (id: string, name: string) => Promise<void>;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("folders")
      .select("id, name")
      .order("id", { ascending: true })
      .then(({ data }) => {
        if (data) {
          setFolders(
            data.map((folder) => ({ id: String(folder.id), name: folder.name })),
          );
        }
      });
  }, []);

  const addFolder = async (name: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("folders")
      .insert({ name })
      .select("id, name")
      .single();

    if (error || !data) {
      throw error ?? new Error("폴더를 추가하지 못했습니다.");
    }

    const newFolder: Folder = { id: String(data.id), name: data.name };
    setFolders((prev) => [...prev, newFolder]);
  };

  const deleteFolder = (id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  const renameFolder = async (id: string, name: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("folders")
      .update({ name })
      .eq("id", id);

    if (error) {
      throw error;
    }

    setFolders((prev) =>
      prev.map((folder) => (folder.id === id ? { ...folder, name } : folder)),
    );
  };

  return (
    <FolderContext.Provider
      value={{ folders, addFolder, deleteFolder, renameFolder }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
}
