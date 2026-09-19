import type { ReactNode } from "react";

export default function GlassCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
}) {
  return (
    <Tag className={`glass-card rounded-3xl ${className}`}>{children}</Tag>
  );
}
