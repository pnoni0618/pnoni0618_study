"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TimerSettingInput from "@/components/TimerSettingInput";

const DEFAULT_MINUTES = 25;
const STORAGE_KEY = "pomodoro-minutes";
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

function getInitialMinutesInput() {
  if (typeof window === "undefined") return String(DEFAULT_MINUTES);
  const stored = localStorage.getItem(STORAGE_KEY);
  const minutes = stored ? Number(stored) : DEFAULT_MINUTES;
  return String(Number.isFinite(minutes) && minutes > 0 ? minutes : DEFAULT_MINUTES);
}

export default function SettingsPage() {
  const router = useRouter();
  const [minutesInput, setMinutesInput] = useState(getInitialMinutesInput);

  const minutesValue = Number(minutesInput);
  const isValid =
    minutesInput.trim() !== "" &&
    Number.isInteger(minutesValue) &&
    minutesValue >= MIN_MINUTES &&
    minutesValue <= MAX_MINUTES;

  const handleSave = () => {
    if (!isValid) return;
    localStorage.setItem(STORAGE_KEY, String(minutesValue));
    router.push("/");
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 dark:bg-black">
      <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Setting
      </h3>
      <TimerSettingInput value={minutesInput} onChange={setMinutesInput} />
      <button
        type="button"
        onClick={handleSave}
        disabled={!isValid}
        className="rounded-full bg-foreground px-6 py-2 text-background disabled:opacity-40"
      >
        설정 완료
      </button>
    </div>
  );
}
