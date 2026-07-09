export type IconName =
  | "badge-dollar-sign"
  | "bar-chart-3"
  | "book-open"
  | "building-2"
  | "database"
  | "eye-off"
  | "facebook"
  | "file-chart-column"
  | "flask-conical"
  | "folder-kanban"
  | "graduation-cap"
  | "handshake"
  | "heart-handshake"
  | "instagram"
  | "landmark"
  | "layers"
  | "leaf"
  | "linkedin"
  | "map"
  | "map-pinned"
  | "message-circle"
  | "network"
  | "panel-top"
  | "radar"
  | "school"
  | "sparkles"
  | "target"
  | "users"
  | "wallet-cards"
  | "wifi-off";

export type ContentRecord = {
  id: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SectionContent = ContentRecord & {
  eyebrow: string;
  title: string;
  description: string;
};

export type SocialLink = ContentRecord & {
  label: string;
  href: string;
  icon: IconName;
};

export type ContactChannel = ContentRecord & {
  label: string;
  purpose: "donations" | "general" | "alliances" | "whatsapp";
  sectionKey: "donar" | "contacto" | "empresas";
  channel: "email" | "whatsapp";
  email?: string;
  phone?: string;
  href: string;
  description: string;
};

export type SiteContent = {
  name: string;
  tagline: string;
  description: string;
  institutionalPhrase: string;
  logo: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  socialLinks: SocialLink[];
};

export type NavigationItem = ContentRecord & {
  label: string;
  href: string;
};

export type HeroContent = ContentRecord & {
  eyebrow: string;
  title: string;
  subtitle: string;
  microcopy: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: string;
  trustBadges: string[];
};

export type TextCard = ContentRecord & {
  title: string;
  description: string;
  icon: IconName;
};

export type Program = ContentRecord & {
  name: string;
  summary: string;
  focus: string;
  icon: IconName;
};

export type Metric = ContentRecord & {
  label: string;
  value: number;
  prefix: string;
  suffix: string;
};

export type DonationAmount = ContentRecord & {
  amount: number;
  currency: "PEN";
  label: string;
  description: string;
};

export type DonationContent = {
  section: SectionContent & {
    trustNote: string;
  };
  amounts: DonationAmount[];
  frequencies: string[];
  donorTypes: string[];
  corporateDonationCopy: string;
};

export type CorporateContent = {
  section: SectionContent & {
    cta: string;
  };
  items: TextCard[];
};

export type TransparencyContent = {
  section: SectionContent & {
    temporaryCopy: string;
  };
  items: TextCard[];
};

export type Project = ContentRecord & {
  title: string;
  description: string;
  status: string;
  icon: IconName;
};

export type Testimonial = ContentRecord & {
  quote: string;
  author: string;
  role: string;
  sourceStatus: string;
};

export type FAQItem = ContentRecord & {
  question: string;
  answer: string;
};

export type ContactContent = {
  section: SectionContent;
  interestTypes: string[];
  primaryButton: string;
  whatsappButton: string;
  emailButton: string;
};

export type LandingContent = {
  site: SiteContent;
  navigation: NavigationItem[];
  hero: HeroContent;
  problems: {
    section: SectionContent;
    items: TextCard[];
  };
  whatWeDo: {
    section: SectionContent;
    items: TextCard[];
  };
  programs: {
    section: SectionContent;
    items: Program[];
  };
  impact: {
    section: SectionContent;
    items: Metric[];
  };
  donation: DonationContent;
  corporate: CorporateContent;
  transparency: TransparencyContent;
  projects: {
    section: SectionContent;
    items: Project[];
  };
  testimonials: {
    section: SectionContent;
    items: Testimonial[];
  };
  faqs: {
    section: SectionContent;
    items: FAQItem[];
  };
  contactChannels: ContactChannel[];
  contact: ContactContent;
};

export type LeadReceipt = {
  id: string;
  status: "received";
  receivedAt: string;
};
