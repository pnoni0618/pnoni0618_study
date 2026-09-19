import RippleButton from "@/components/ui/RippleButton";

interface NavigationProps {
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  isLast: boolean;
}

/** 이전/다음 controls. `onNext` is disabled until the current question has an answer. */
export default function Navigation({ onPrev, onNext, canGoPrev, canGoNext, isLast }: NavigationProps) {
  return (
    <div className="mt-10 flex items-center justify-between gap-4">
      <RippleButton variant="secondary" onClick={onPrev} disabled={!canGoPrev} className="flex-1">
        ← 이전
      </RippleButton>
      <RippleButton variant="primary" onClick={onNext} disabled={!canGoNext} className="flex-1">
        {isLast ? "결과 보기 →" : "다음 →"}
      </RippleButton>
    </div>
  );
}
