import Link from "next/link";
import { mainMenuItems } from "@/data/mainMenu";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24 border-t border-[color:var(--border-glass)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <span className="font-display text-sm tracking-[0.28em] text-ink">
              STARSEED <span className="text-gradient-gold">ORIGIN</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-ink-faint">
              당신의 성향을 분석하여 가장 닮은 스타시드를 찾아드립니다.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-muted">
            {mainMenuItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-ink">
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="glass-panel rounded-2xl px-5 py-4 text-xs leading-relaxed text-ink-faint sm:text-sm">
          이 서비스는 자기 탐색과 재미를 위한 콘텐츠이며, 특정한 믿음이나 사실을 증명하는
          서비스가 아닙니다.
        </div>

        <p className="text-xs text-ink-faint">
          © {new Date().getFullYear()} Starseed Origin. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
