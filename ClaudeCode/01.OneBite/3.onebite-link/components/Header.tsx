import Link from "next/link";
import NewFolderButton from "@/components/NewFolderButton";

export default function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-black">
      <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
        한입 링크
      </span>
      <div className="flex items-center gap-2">
        <NewFolderButton />
        <Link
          href="/new"
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          + 새 링크
        </Link>
      </div>
    </header>
  );
}
