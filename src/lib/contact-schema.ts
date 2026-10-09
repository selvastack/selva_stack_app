import { z } from "zod";

export const INTEREST_KEYS = ["project", "ally", "support", "volunteer", "press", "other"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(160),
  organization: z.string().trim().max(160).optional().default(""),
  interest: z.enum(INTEREST_KEYS),
  message: z.string().trim().min(1).max(3000),
  locale: z.enum(["es", "en", "pt"]).default("es"),
  // Honeypot: real users never fill it.
  website: z.string().max(0).optional().default("")
});

export type ContactPayload = z.infer<typeof contactSchema>;
