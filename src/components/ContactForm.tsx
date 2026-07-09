"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { findContactChannel } from "@/lib/contactChannels";
import { publicEnv } from "@/lib/env";
import { contactSchema, type ContactFormValues } from "@/lib/schemas";
import type { ContactChannel, ContactContent } from "@/lib/types";

import { CTAButton } from "./CTAButton";
import { SectionTitle } from "./SectionTitle";

type ContactFormProps = {
  content: ContactContent;
  contactChannels: ContactChannel[];
};

export function ContactForm({ content, contactChannels }: ContactFormProps) {
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const generalEmail = findContactChannel(contactChannels, "general");
  const donationsEmail = findContactChannel(contactChannels, "donations");
  const alliancesEmail = findContactChannel(contactChannels, "alliances");
  const whatsapp = findContactChannel(contactChannels, "whatsapp");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      interest: content.interestTypes[0] ?? "Otro",
      message: ""
    }
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitState("idle");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setSubmitState("error");
      return;
    }

    setSubmitState("success");
    reset();
  };

  const emailHref =
    publicEnv.contactEmail
      ? `mailto:${publicEnv.contactEmail}?subject=Contacto%20Selva%20Stack`
      : generalEmail?.href ?? "#contacto";
  const whatsappHref = publicEnv.whatsappLink || whatsapp?.href || "#contacto";

  return (
    <section className="section-shell bg-white" id="contacto">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionTitle align="left" {...content.section} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <CTAButton
              className="gap-2"
              href={whatsappHref}
              rel={whatsappHref.startsWith("http") ? "noreferrer" : undefined}
              target={whatsappHref.startsWith("http") ? "_blank" : undefined}
              variant="secondary"
            >
              <MessageCircle aria-hidden="true" size={18} />
              {content.whatsappButton}
            </CTAButton>
            <CTAButton
              className="gap-2"
              href={emailHref}
              variant="ghost"
            >
              <Mail aria-hidden="true" size={18} />
              {content.emailButton}
            </CTAButton>
          </div>
          <div className="mt-6 grid gap-3">
            {[generalEmail, donationsEmail, alliancesEmail]
              .filter((channel): channel is ContactChannel => Boolean(channel))
              .map((channel) => (
              <a
                className="rounded-2xl border border-[var(--color-border)] bg-white/80 p-4 text-sm transition hover:bg-[var(--color-mint)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                href={channel.href}
                key={channel.id}
              >
                <span className="block font-black text-[var(--color-primary-dark)]">{channel.label}</span>
                <span className="mt-1 block font-semibold text-[var(--color-text-muted)]">{channel.email}</span>
              </a>
            ))}
            {whatsapp ? (
              <a
                className="rounded-2xl border border-[var(--color-border)] bg-white/80 p-4 text-sm transition hover:bg-[var(--color-mint)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                href={whatsapp.href}
                rel="noreferrer"
                target="_blank"
              >
                <span className="block font-black text-[var(--color-primary-dark)]">{whatsapp.label}</span>
                <span className="mt-1 block font-semibold text-[var(--color-text-muted)]">{whatsapp.phone}</span>
              </a>
            ) : null}
          </div>
        </div>

        <form className="card-surface grid gap-5 p-5 sm:p-7" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="form-field">
              <span>Nombre</span>
              <input className="input-shell" placeholder="Tu nombre" {...register("name")} />
              {errors.name ? <small>{errors.name.message}</small> : null}
            </label>

            <label className="form-field">
              <span>Correo</span>
              <input className="input-shell" placeholder="correo@ejemplo.com" type="email" {...register("email")} />
              {errors.email ? <small>{errors.email.message}</small> : null}
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="form-field">
              <span>Organización o empresa</span>
              <input className="input-shell" placeholder="Opcional" {...register("organization")} />
              {errors.organization ? <small>{errors.organization.message}</small> : null}
            </label>

            <label className="form-field">
              <span>Tipo de interés</span>
              <select className="input-shell" {...register("interest")}>
                {content.interestTypes.map((interest) => (
                  <option key={interest} value={interest}>
                    {interest}
                  </option>
                ))}
              </select>
              {errors.interest ? <small>{errors.interest.message}</small> : null}
            </label>
          </div>

          <label className="form-field">
            <span>Mensaje</span>
            <textarea
              className="input-shell min-h-36 resize-y"
              placeholder="Cuéntanos qué te interesa construir, financiar o impulsar."
              {...register("message")}
            />
            {errors.message ? <small>{errors.message.message}</small> : null}
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-[var(--color-text-muted)]">
              Los datos se validan ahora y quedan listos para conectar SQL, CRM o correo transaccional.
            </p>
            <CTAButton className="gap-2 sm:min-w-44" type="submit">
              {isSubmitting ? (
                <>
                  <Loader2 aria-hidden="true" className="animate-spin" size={18} />
                  Enviando
                </>
              ) : (
                <>
                  <Send aria-hidden="true" size={18} />
                  {content.primaryButton}
                </>
              )}
            </CTAButton>
          </div>

          {submitState === "success" ? (
            <p className="rounded-2xl bg-[var(--color-mint)] p-4 text-sm font-semibold text-[var(--color-primary-dark)]">
              Gracias. Recibimos tu mensaje y la integración está preparada para persistirlo cuando conecten SQL o CRM.
            </p>
          ) : null}
          {submitState === "error" ? (
            <p className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">
              No pudimos enviar el mensaje. Intenta de nuevo o usa WhatsApp/correo.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
