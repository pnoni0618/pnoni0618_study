import type { ReactNode } from "react";
import GlassCard from "@/components/ui/GlassCard";

interface ProfileSectionProps {
  icon: string;
  title: string;
  children: ReactNode;
}

/** Shared "icon + title + content" card shape reused across the result page's sections. */
export default function ProfileSection({ icon, title, children }: ProfileSectionProps) {
  return (
    <GlassCard className="p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-lg">
          {icon}
        </span>
        <h2 className="font-serif text-lg text-ink sm:text-xl">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </GlassCard>
  );
}
