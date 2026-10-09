"use client";

import { track } from "@vercel/analytics";
import type { ReactNode } from "react";

import { whatsappHref, type WhatsAppKind } from "@/lib/site";

type Props = {
  kind: WhatsAppKind | "floating";
  message: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  product?: string;
};

/** Every WhatsApp CTA goes through here so clicks are tracked by type. */
export function WaButton({ kind, message, children, className, ariaLabel, product }: Props) {
  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      onClick={() => track("whatsapp_click", product ? { type: kind, product } : { type: kind })}
    >
      {children}
    </a>
  );
}
