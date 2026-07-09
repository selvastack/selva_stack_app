import { z } from "zod";

const nonEmptyString = z.string().trim().min(1);

const contentRecordSchema = z
  .object({
    id: nonEmptyString,
    slug: nonEmptyString,
    sortOrder: z.number().int(),
    isActive: z.boolean(),
    createdAt: nonEmptyString,
    updatedAt: nonEmptyString
  })
  .passthrough();

const sectionSchema = contentRecordSchema.extend({
  eyebrow: nonEmptyString,
  title: nonEmptyString,
  description: nonEmptyString
});

const cardSchema = contentRecordSchema.extend({
  title: nonEmptyString,
  description: nonEmptyString,
  icon: nonEmptyString
});

const contactChannelSchema = contentRecordSchema.extend({
  label: nonEmptyString,
  purpose: z.enum(["donations", "general", "alliances", "whatsapp"]),
  sectionKey: z.enum(["donar", "contacto", "empresas"]),
  channel: z.enum(["email", "whatsapp"]),
  email: z.string().email().optional(),
  phone: z.string().trim().optional(),
  href: nonEmptyString,
  description: nonEmptyString
});

export const landingContentSchema = z
  .object({
    site: z
      .object({
        name: nonEmptyString,
        tagline: nonEmptyString,
        description: nonEmptyString,
        institutionalPhrase: nonEmptyString,
        logo: nonEmptyString,
        seo: z.object({
          title: nonEmptyString,
          description: nonEmptyString,
          keywords: z.array(nonEmptyString)
        }),
        socialLinks: z.array(contentRecordSchema)
      })
      .passthrough(),
    navigation: z.array(contentRecordSchema),
    hero: contentRecordSchema
      .extend({
        eyebrow: nonEmptyString,
        title: nonEmptyString,
        subtitle: nonEmptyString,
        microcopy: nonEmptyString,
        primaryCta: nonEmptyString,
        secondaryCta: nonEmptyString,
        secondaryHref: nonEmptyString,
        trustBadges: z.array(nonEmptyString)
      })
      .passthrough(),
    problems: z.object({
      section: sectionSchema,
      items: z.array(cardSchema)
    }),
    whatWeDo: z.object({
      section: sectionSchema,
      items: z.array(cardSchema)
    }),
    programs: z.object({
      section: sectionSchema,
      items: z.array(contentRecordSchema)
    }),
    impact: z.object({
      section: sectionSchema,
      items: z.array(contentRecordSchema.extend({ value: z.number() }).passthrough())
    }),
    donation: z.object({
      section: sectionSchema.extend({ trustNote: nonEmptyString }),
      amounts: z.array(contentRecordSchema.extend({ amount: z.number() }).passthrough()),
      frequencies: z.array(nonEmptyString),
      donorTypes: z.array(nonEmptyString),
      corporateDonationCopy: nonEmptyString
    }),
    corporate: z.object({
      section: sectionSchema.extend({ cta: nonEmptyString }),
      items: z.array(cardSchema)
    }),
    transparency: z.object({
      section: sectionSchema.extend({ temporaryCopy: nonEmptyString }),
      items: z.array(cardSchema)
    }),
    projects: z.object({
      section: sectionSchema,
      items: z.array(contentRecordSchema)
    }),
    testimonials: z.object({
      section: sectionSchema,
      items: z.array(contentRecordSchema)
    }),
    faqs: z.object({
      section: sectionSchema,
      items: z.array(contentRecordSchema)
    }),
    contactChannels: z.array(contactChannelSchema),
    contact: z.object({
      section: sectionSchema,
      interestTypes: z.array(nonEmptyString),
      primaryButton: nonEmptyString,
      whatsappButton: nonEmptyString,
      emailButton: nonEmptyString
    })
  })
  .passthrough();

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre.").max(90),
  email: z.string().trim().email("Escribe un correo válido."),
  organization: z.string().trim().max(120).optional().or(z.literal("")),
  interest: z.string().trim().min(1, "Selecciona un tipo de interés."),
  message: z
    .string()
    .trim()
    .min(12, "Cuéntanos un poco más para poder responderte bien.")
    .max(1200)
});

export const donationInterestSchema = z.object({
  fullName: z.string().trim().min(2, "Escribe tu nombre completo.").max(90),
  email: z.string().trim().email("Escribe un correo válido."),
  phone: z
    .string()
    .trim()
    .max(32)
    .optional()
    .or(z.literal("")),
  donorType: z.string().trim().min(1, "Selecciona el tipo de donante."),
  frequency: z.string().trim().min(1, "Selecciona el tipo de donación."),
  amount: z.number().min(10, "El monto mínimo sugerido es S/ 10."),
  message: z.string().trim().max(600).optional().or(z.literal("")),
  wantsImpactUpdates: z.boolean()
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type DonationInterestValues = z.infer<typeof donationInterestSchema>;
