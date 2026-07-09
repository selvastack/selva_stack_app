import contactJson from "@/data/contact.json";
import contactChannelsJson from "@/data/contactChannels.json";
import corporateJson from "@/data/corporateAllies.json";
import donationJson from "@/data/donationAmounts.json";
import faqsJson from "@/data/faqs.json";
import heroJson from "@/data/hero.json";
import impactJson from "@/data/impactMetrics.json";
import navigationJson from "@/data/navigation.json";
import problemsJson from "@/data/problems.json";
import programsJson from "@/data/programs.json";
import projectsJson from "@/data/projects.json";
import siteJson from "@/data/site.json";
import testimonialsJson from "@/data/testimonials.json";
import transparencyJson from "@/data/transparencyItems.json";
import whatWeDoJson from "@/data/whatWeDo.json";

import { landingContentSchema } from "./schemas";
import type {
  ContactFormValues,
  DonationInterestValues
} from "./schemas";
import type { ContentRecord, LandingContent, LeadReceipt } from "./types";

function activeByOrder<T extends ContentRecord>(items: T[]): T[] {
  return items
    .filter((item) => item.isActive)
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

function buildLandingContent(): LandingContent {
  const content = {
    site: {
      ...siteJson,
      socialLinks: activeByOrder(siteJson.socialLinks)
    },
    navigation: activeByOrder(navigationJson),
    hero: heroJson,
    problems: {
      section: problemsJson.section,
      items: activeByOrder(problemsJson.items)
    },
    whatWeDo: {
      section: whatWeDoJson.section,
      items: activeByOrder(whatWeDoJson.items)
    },
    programs: {
      section: programsJson.section,
      items: activeByOrder(programsJson.items)
    },
    impact: {
      section: impactJson.section,
      items: activeByOrder(impactJson.items)
    },
    donation: {
      ...donationJson,
      amounts: activeByOrder(donationJson.amounts)
    },
    corporate: {
      section: corporateJson.section,
      items: activeByOrder(corporateJson.items)
    },
    transparency: {
      section: transparencyJson.section,
      items: activeByOrder(transparencyJson.items)
    },
    projects: {
      section: projectsJson.section,
      items: activeByOrder(projectsJson.items)
    },
    testimonials: {
      section: testimonialsJson.section,
      items: activeByOrder(testimonialsJson.items)
    },
    faqs: {
      section: faqsJson.section,
      items: activeByOrder(faqsJson.items)
    },
    contactChannels: activeByOrder(contactChannelsJson),
    contact: contactJson
  };

  const parsed = landingContentSchema.safeParse(content);

  if (!parsed.success) {
    throw new Error(
      `Landing content JSON is invalid: ${parsed.error.issues
        .map((issue) => issue.path.join("."))
        .join(", ")}`
    );
  }

  return parsed.data as LandingContent;
}

export interface LandingContentRepository {
  getLandingContent(): Promise<LandingContent>;
}

export class JsonLandingContentRepository implements LandingContentRepository {
  async getLandingContent(): Promise<LandingContent> {
    return buildLandingContent();
  }
}

export interface LeadRepository {
  createContactLead(input: ContactFormValues): Promise<LeadReceipt>;
  createDonationLead(input: DonationInterestValues): Promise<LeadReceipt>;
}

export class DeferredLeadRepository implements LeadRepository {
  async createContactLead(_input: ContactFormValues): Promise<LeadReceipt> {
    void _input;
    return createReceipt();
  }

  async createDonationLead(_input: DonationInterestValues): Promise<LeadReceipt> {
    void _input;
    return createReceipt();
  }
}

function createReceipt(): LeadReceipt {
  return {
    id: crypto.randomUUID(),
    status: "received",
    receivedAt: new Date().toISOString()
  };
}

export const landingContentRepository = new JsonLandingContentRepository();

// Swap this implementation for a SQL-backed repository later
// without changing API routes or UI components.
export const leadRepository = new DeferredLeadRepository();
