import { Mail, MessageCircle, Users } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { WaButton } from "@/components/ui/WaButton";
import { mailtoHref, SECTION_IDS } from "@/lib/site";
import type { SocialItem } from "@/lib/types";

import { ContactForm } from "./ContactForm";

export async function Contact() {
  const t = await getTranslations("contact");
  const tw = await getTranslations("whatsapp");
  const tj = await getTranslations("join");
  const ts = await getTranslations("social");
  const social = ts.raw("items") as SocialItem[];
  const row = "flex items-center gap-3 rounded-xl p-2 -m-2 transition hover:bg-petroleo/60";

  return (
    <section id={SECTION_IDS.contact} aria-labelledby="contact-title" className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-selva/25 blur-[120px]" />
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 id="contact-title" className="mt-4 font-display text-3xl leading-tight text-hueso sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <ul className="mt-8 space-y-5">
            <li>
              <WaButton kind="general" message={tw("general")} className={row}>
                <span className="icon-chip">
                  <MessageCircle aria-hidden="true" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-muted">{t("whatsappLabel")}</span>
                  <span className="font-semibold text-hueso">{t("whatsappDisplay")}</span>
                </span>
              </WaButton>
            </li>
            <li>
              <a href={mailtoHref(t("email"))} className={row}>
                <span className="icon-chip">
                  <Mail aria-hidden="true" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-muted">{t("emailLabel")}</span>
                  <span className="font-semibold text-hueso">{t("email")}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={mailtoHref(t("volunteerEmail"), tj("emailSubject"))} className={row}>
                <span className="icon-chip">
                  <Users aria-hidden="true" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-muted">{t("volunteerLabel")}</span>
                  <span className="break-all font-semibold text-hueso">{t("volunteerEmail")}</span>
                </span>
              </a>
            </li>
          </ul>
          <p className="mt-8 text-sm font-semibold text-hueso">{t("socialLabel")}</p>
          <ul className="mt-3 flex gap-3">
            {social.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.aria}
                  className="grid h-11 w-11 place-items-center rounded-full border border-hoja/30 text-hueso transition hover:border-eco hover:text-eco hover:shadow-[0_0_18px_rgba(3,152,51,0.5)]"
                >
                  <SocialIcon id={s.id} />
                </a>
              </li>
            ))}
          </ul>
          <Image
            src="/mascots/otto.webp"
            alt=""
            width={720}
            height={1149}
            loading="lazy"
            sizes="150px"
            className="mt-10 hidden h-auto w-[150px] animate-wave origin-bottom lg:block"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
