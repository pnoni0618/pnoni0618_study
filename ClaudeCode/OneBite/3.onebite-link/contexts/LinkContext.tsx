"use client";

import { createContext, useContext, useState } from "react";
import { links as initialLinks } from "@/lib/links";
import type { LinkItem } from "@/components/LinkCard";

type LinkContextValue = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id">) => void;
  deleteLink: (id: string) => void;
};

const LinkContext = createContext<LinkContextValue | null>(null);

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  const addLink = (link: Omit<LinkItem, "id">) => {
    const newLink: LinkItem = { ...link, id: crypto.randomUUID() };
    setLinks((prev) => [...prev, newLink]);
  };

  const deleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  return (
    <LinkContext.Provider value={{ links, addLink, deleteLink }}>
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
