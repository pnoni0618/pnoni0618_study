export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnailUrl?: string;
  folderId: string;
};

export default function LinkCard({ title, url, description, thumbnailUrl }: LinkItem) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
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
  );
}
