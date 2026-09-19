"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Re-keys its children by route so every page-level navigation replays a
 * soft fade/rise-in instead of snapping to the new content.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-fade">
      {children}
    </div>
  );
}
