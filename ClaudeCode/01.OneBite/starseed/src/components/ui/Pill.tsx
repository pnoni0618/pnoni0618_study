import type { ReactNode } from "react";

export default function Pill({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>;
}
