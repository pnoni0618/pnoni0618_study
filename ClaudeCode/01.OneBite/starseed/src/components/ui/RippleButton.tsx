"use client";

import Link from "next/link";
import { useState, type MouseEvent, type ReactNode } from "react";

interface RippleSpan {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface BaseProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

type RippleButtonProps = BaseProps &
  (
    | { href: string; onClick?: undefined; type?: undefined; disabled?: undefined }
    | { href?: undefined; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean }
  );

let rippleId = 0;

/**
 * Shared CTA control with a click ripple. Renders a Next.js <Link> when
 * `href` is passed, otherwise a plain <button>.
 */
export default function RippleButton(props: RippleButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const [ripples, setRipples] = useState<RippleSpan[]>([]);

  function spawnRipple(event: MouseEvent<HTMLElement>) {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.4;
    const id = rippleId++;
    const ripple: RippleSpan = {
      id,
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2,
      size,
    };
    setRipples((current) => [...current, ripple]);
    setTimeout(() => {
      setRipples((current) => current.filter((r) => r.id !== id));
    }, 650);
  }

  const baseClass = `btn-ripple inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-wide sm:text-base ${
    variant === "primary" ? "btn-primary" : "btn-secondary"
  } ${props.disabled ? "pointer-events-none opacity-40" : ""} ${className}`;

  const rippleNodes = ripples.map((r) => (
    <span
      key={r.id}
      className="ripple"
      style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
    />
  ));

  if (props.href !== undefined) {
    return (
      <Link
        href={props.href}
        className={baseClass}
        onClick={spawnRipple}
      >
        {children}
        {rippleNodes}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      aria-disabled={props.disabled}
      className={baseClass}
      onClick={(event) => {
        if (props.disabled) return;
        spawnRipple(event);
        props.onClick?.();
      }}
    >
      {children}
      {rippleNodes}
    </button>
  );
}
