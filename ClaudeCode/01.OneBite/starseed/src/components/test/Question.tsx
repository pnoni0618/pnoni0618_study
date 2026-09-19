import { LIKERT_OPTIONS } from "@/data/questions";
import type { LikertValue, TestQuestion } from "@/types/starseed";

interface QuestionProps {
  question: TestQuestion;
  selectedValue: LikertValue | undefined;
  onSelect: (value: LikertValue) => void;
}

/** One Likert-scale statement with its 5 selectable options. Fully controlled. */
export default function Question({ question, selectedValue, onSelect }: QuestionProps) {
  return (
    <div>
      <h2 className="text-balance font-serif text-xl leading-relaxed text-ink sm:text-2xl">
        {question.text}
      </h2>

      <div role="radiogroup" aria-label={question.text} className="mt-8 flex flex-col gap-3">
        {LIKERT_OPTIONS.map((option) => {
          const checked = selectedValue === option.value;
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border px-5 py-4 transition-all duration-300 ${
                checked
                  ? "border-[color:var(--gold)] bg-gold/10"
                  : "border-[color:var(--border-glass)] bg-white/[0.02] hover:border-[color:var(--border-glass-strong)] hover:bg-white/[0.05]"
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.value}
                checked={checked}
                onChange={() => onSelect(option.value)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  checked ? "border-gold" : "border-[color:var(--border-glass-strong)]"
                }`}
              >
                {checked && <span className="h-2.5 w-2.5 rounded-full bg-gold" />}
              </span>
              <span className={`text-sm sm:text-base ${checked ? "text-ink" : "text-ink-muted"}`}>
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
