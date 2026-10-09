"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { type FormEvent, useState } from "react";

import { WaButton } from "@/components/ui/WaButton";
import { INTEREST_KEYS } from "@/lib/contact-schema";

type Field = "name" | "email" | "organization" | "interest" | "message";
type Errors = Partial<Record<Field, string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const t = useTranslations("contact");
  const tw = useTranslations("whatsapp");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});

  function validate(data: Record<Field, string>): Errors {
    const e: Errors = {};
    if (!data.name.trim()) e.name = t("form.required");
    if (!data.email.trim()) e.email = t("form.required");
    else if (!EMAIL_RE.test(data.email.trim())) e.email = t("form.invalidEmail");
    if (!data.interest) e.interest = t("form.required");
    if (!data.message.trim()) e.message = t("form.required");
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries()) as Record<Field | "website", string>;
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale })
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="card flex flex-col items-center gap-4 p-8 text-center">
        <Image src="/mascots/coconita.webp" alt="" width={520} height={562} className="h-auto w-32" />
        <p className="font-display text-2xl text-hueso">{t("success")}</p>
      </div>
    );
  }

  const fieldProps = (name: Field) => ({
    id: `cf-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `cf-${name}-err` : undefined,
    className: "field"
  });
  const err = (name: Field) =>
    errors[name] && (
      <p id={`cf-${name}-err`} className="mt-1.5 text-sm text-[#f2a093]">
        {errors[name]}
      </p>
    );
  const label = "mb-1.5 block text-sm font-semibold text-hueso";

  return (
    <form noValidate onSubmit={onSubmit} className="card grid gap-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            {t("form.name")} *
          </label>
          <input {...fieldProps("name")} type="text" autoComplete="name" required />
          {err("name")}
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>
            {t("form.email")} *
          </label>
          <input {...fieldProps("email")} type="email" autoComplete="email" required />
          {err("email")}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-organization" className={label}>
            {t("form.organization")}
          </label>
          <input {...fieldProps("organization")} type="text" autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="cf-interest" className={label}>
            {t("form.interest")} *
          </label>
          <select {...fieldProps("interest")} defaultValue="" required>
            <option value="" disabled>
              —
            </option>
            {INTEREST_KEYS.map((k) => (
              <option key={k} value={k}>
                {t(`form.interestOptions.${k}`)}
              </option>
            ))}
          </select>
          {err("interest")}
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className={label}>
          {t("form.message")} *
        </label>
        <textarea {...fieldProps("message")} rows={5} required />
        {err("message")}
      </div>
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {status === "error" && (
        <div role="alert" className="flex flex-col gap-3 rounded-xl border border-[#f2a093]/50 bg-[#f2a093]/10 p-4 text-sm text-hueso sm:flex-row sm:items-center sm:justify-between">
          <span>{t("error")}</span>
          <WaButton kind="general" message={tw("general")} className="btn btn-outline !min-h-10 text-sm">
            {t("whatsappLabel")}
          </WaButton>
        </div>
      )}

      <button type="submit" disabled={status === "sending"} className="btn btn-gold justify-self-start disabled:opacity-60">
        {status === "sending" ? t("form.sending") : t("form.submit")}
      </button>
    </form>
  );
}
