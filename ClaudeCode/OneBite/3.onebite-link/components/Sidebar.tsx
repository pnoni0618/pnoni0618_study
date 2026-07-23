"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { folders } from "@/lib/folders";

export default function Sidebar() {
  const pathname = usePathname();

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
            <Link
              key={folder.id}
              href={href}
              className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                isActive
                  ? "bg-zinc-100 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {folder.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
