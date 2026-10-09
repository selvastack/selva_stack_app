export type TitleText = { title: string; text: string };
export type IdItem = TitleText & { id: string };
export type StatItem = { value: number; prefix: string; label: string };
export type ProgramItem = IdItem & { tag: string };
export type FaqItem = { q: string; a: string };
export type AllyLogo = { name: string; alt: string };
export type SocialItem = { id: "facebook" | "instagram" | "tiktok"; name: string; url: string; handle: string; aria: string };
export type Testimonial = { quote: string; name: string; role: string; photo?: string; photoAlt?: string };
