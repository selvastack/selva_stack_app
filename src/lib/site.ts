export const SITE_URL = "https://selvastack.org.pe";
export const WHATSAPP_NUMBER = "51940901752";
export const PHONE_E164 = "+51940901752";
export const CONTACT_EMAIL = "hola@selvastack.org.pe";

export const SECTION_IDS = {
  home: "inicio",
  services: "servicios",
  products: "productos",
  programs: "programas",
  impact: "impacto",
  allies: "aliados",
  contact: "contacto"
} as const;

export type NavKey = keyof typeof SECTION_IDS;
export const NAV_KEYS = Object.keys(SECTION_IDS) as NavKey[];

export type WhatsAppKind = "project" | "support" | "ally" | "product" | "general";

/** Builds a wa.me link with a pre-filled, URI-encoded message. */
export function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function mailtoHref(email: string, subject?: string) {
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}
