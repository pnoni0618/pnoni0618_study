"use client";

import { useEffect, useState } from "react";
import Timer from "@/components/Timer";
import Controllers from "@/components/Controllers";

const DEFAULT_MINUTES = 25;
const STORAGE_KEY = "pomodoro-minutes";

function getStoredMinutes() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const minutes = stored ? Number(stored) : DEFAULT_MINUTES;
  return Number.isFinite(minutes) && minutes > 0 ? minutes : DEFAULT_MINUTES;
}

export default function Home() {
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_MINUTES * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Live countdown UI: sync from localStorage after mount instead of a
    // lazy useState initializer, since the server can't read localStorage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSecondsLeft(getStoredMinutes() * 60);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    if (secondsLeft <= 0) return;
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(getStoredMinutes() * 60);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-zinc-50 dark:bg-black">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
        pomodoro
      </h1>
      <Timer secondsLeft={secondsLeft} />
      <Controllers
        isRunning={isRunning}
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
      />
    </div>
  );
}
