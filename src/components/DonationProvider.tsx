"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";

import { publicEnv } from "@/lib/env";
import type { DonationContent } from "@/lib/types";

import { DonationModal } from "./DonationModal";

type DonationContextValue = {
  openDonation: () => void;
};

const DonationContext = createContext<DonationContextValue | null>(null);

type DonationProviderProps = {
  donation: DonationContent;
  children: ReactNode;
};

export function DonationProvider({ donation, children }: DonationProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openDonation = useCallback(() => {
    if (publicEnv.donationLink) {
      window.open(publicEnv.donationLink, "_blank", "noopener,noreferrer");
      return;
    }

    lastTriggerRef.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  const closeDonation = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => lastTriggerRef.current?.focus(), 0);
  }, []);

  const value = useMemo(() => ({ openDonation }), [openDonation]);

  return (
    <DonationContext.Provider value={value}>
      {children}
      <DonationModal donation={donation} isOpen={isOpen} onClose={closeDonation} />
    </DonationContext.Provider>
  );
}

export function useDonation() {
  const context = useContext(DonationContext);

  if (!context) {
    throw new Error("useDonation must be used inside DonationProvider");
  }

  return context;
}
