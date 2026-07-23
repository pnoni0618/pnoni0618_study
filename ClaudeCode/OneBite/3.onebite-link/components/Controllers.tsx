import Link from "next/link";

type ControllersProps = {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
};

export default function Controllers({
  isRunning,
  onStart,
  onStop,
  onReset,
}: ControllersProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onStart}
          disabled={isRunning}
          className="rounded-full bg-foreground px-6 py-2 text-background transition-transform duration-150 ease-out enabled:hover:scale-105 enabled:active:scale-95 disabled:opacity-40"
        >
          시작
        </button>
        <button
          type="button"
          onClick={onStop}
          disabled={!isRunning}
          className="rounded-full border border-black/8 px-6 py-2 text-foreground transition-transform duration-150 ease-out enabled:hover:scale-105 enabled:active:scale-95 disabled:opacity-40 dark:border-white/15"
        >
          정지
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-black/8 px-6 py-2 text-foreground transition-transform duration-150 ease-out hover:scale-105 active:scale-95 dark:border-white/15"
        >
          초기화
        </button>
      </div>
      <Link
        href="/settings"
        className="text-sm text-zinc-600 underline transition-colors duration-150 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        설정
      </Link>
    </div>
  );
}
