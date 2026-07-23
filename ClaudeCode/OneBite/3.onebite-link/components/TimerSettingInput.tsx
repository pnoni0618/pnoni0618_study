type TimerSettingInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function TimerSettingInput({
  value,
  onChange,
}: TimerSettingInputProps) {
  return (
    <input
      type="number"
      min={1}
      max={60}
      suppressHydrationWarning
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="1 ~ 60"
      className="w-40 rounded-md border border-black/8 px-4 py-2 text-center text-lg text-foreground dark:border-white/15 dark:bg-transparent"
    />
  );
}
