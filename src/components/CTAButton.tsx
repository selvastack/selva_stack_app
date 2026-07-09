"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type CTAButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  target?: string;
  rel?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  ariaLabel?: string;
};

const variantClasses = {
  primary:
    "bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-dark))] text-white shadow-[0_16px_42px_rgba(10,105,9,0.28)] hover:-translate-y-0.5 hover:shadow-[0_20px_56px_rgba(10,105,9,0.36)]",
  secondary:
    "border border-[var(--color-border)] bg-white/88 text-[var(--color-primary-dark)] shadow-[0_12px_32px_rgba(4,22,4,0.06)] hover:-translate-y-0.5 hover:bg-[var(--color-mint)]",
  ghost:
    "text-[var(--color-primary-dark)] hover:bg-[rgba(10,105,9,0.08)]"
};

export function CTAButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  target,
  rel,
  type = "button",
  ariaLabel
}: CTAButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)] active:translate-y-px ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a
        aria-label={ariaLabel}
        className={classes}
        href={href}
        onClick={onClick}
        rel={rel}
        target={target}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      aria-label={ariaLabel}
      className={classes}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
