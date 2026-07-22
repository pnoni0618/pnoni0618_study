"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/mainMenu";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu when navigation actually changes the route.
  // Adjusting state during render (rather than in an effect) avoids an
  // extra commit — see https://react.dev/learn/you-might-not-need-an-effect
  const [priorPathname, setPriorPathname] = useState(pathname);
  if (pathname !== priorPathname) {
    setPriorPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled ? "glass-panel border-b" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg">✨</span>
          <span className="font-display text-sm tracking-[0.28em] text-ink">
            STARSEED <span className="text-gradient-gold">ORIGIN</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  active ? "text-gold" : "text-ink-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/test"
            className="btn-primary btn-ripple rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            테스트 시작
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-[color:var(--border-glass)] md:hidden"
        >
          <span
            className={`h-px w-5 bg-ink transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-ink transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="glass-panel mx-4 mb-4 flex flex-col gap-1 rounded-2xl p-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-xl px-4 py-3 text-sm ${
                pathname === link.href ? "bg-white/5 text-gold" : "text-ink-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/test"
            className="btn-primary btn-ripple mt-2 rounded-xl px-4 py-3 text-center text-sm font-semibold"
          >
            ✨ 테스트 시작하기
          </Link>
        </nav>
      )}
    </header>
  );
}
