"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Loader2, ShieldCheck, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { donationInterestSchema, type DonationInterestValues } from "@/lib/schemas";
import type { DonationContent } from "@/lib/types";

import { CTAButton } from "./CTAButton";

type DonationModalProps = {
  donation: DonationContent;
  isOpen: boolean;
  onClose: () => void;
};

export function DonationModal({ donation, isOpen, onClose }: DonationModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    setValue,
  } = useForm<DonationInterestValues>({
    resolver: zodResolver(donationInterestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      donorType: donation.donorTypes[0] ?? "Persona",
      frequency: donation.frequencies[0] ?? "Donación única",
      amount: donation.amounts[1]?.amount ?? 50,
      message: "",
      wantsImpactUpdates: true
    }
  });

  const selectedAmount = useWatch({ control, name: "amount" });

  const closeModal = useCallback(() => {
    setSubmitState("idle");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeButtonRef.current?.focus(), 80);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) {
        return;
      }

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal, isOpen]);

  const onSubmit = async (values: DonationInterestValues) => {
    setSubmitState("idle");
    const response = await fetch("/api/donation-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setSubmitState("error");
      return;
    }

    setSubmitState("success");
    reset({
      fullName: "",
      email: "",
      phone: "",
      donorType: donation.donorTypes[0] ?? "Persona",
      frequency: donation.frequencies[0] ?? "Donación única",
      amount: values.amount,
      message: "",
      wantsImpactUpdates: true
    });
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          aria-labelledby="donation-modal-title"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(4,22,4,0.58)] px-4 py-6 backdrop-blur-xl"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          role="dialog"
        >
          <motion.div
            ref={modalRef}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[1.75rem] border border-[var(--color-border)] bg-white p-5 shadow-[0_30px_90px_rgba(4,22,4,0.28)] sm:p-7"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <button
              ref={closeButtonRef}
              aria-label="Cerrar formulario de donación"
              className="absolute right-4 top-4 rounded-full p-2 text-[var(--color-text-muted)] transition hover:bg-[var(--color-mint)] hover:text-[var(--color-primary-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              onClick={closeModal}
              type="button"
            >
              <X aria-hidden="true" size={22} />
            </button>

            <div className="pr-10">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                Donación segura
              </p>
              <h2
                className="mt-3 text-2xl font-black leading-tight text-[var(--color-text-dark)] sm:text-3xl"
                id="donation-modal-title"
              >
                {donation.section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                {donation.section.trustNote}
              </p>
            </div>

            <form className="mt-7 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <legend className="mb-3 text-sm font-bold text-[var(--color-text-dark)]">
                  Monto sugerido
                </legend>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {donation.amounts.map((amount) => (
                    <button
                      aria-pressed={selectedAmount === amount.amount}
                      className={`rounded-2xl border px-3 py-3 text-sm font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${
                        selectedAmount === amount.amount
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[0_14px_30px_rgba(10,105,9,0.22)]"
                          : "border-[var(--color-border)] bg-[var(--color-mint)] text-[var(--color-primary-dark)] hover:border-[var(--color-primary)]"
                      }`}
                      key={amount.id}
                      onClick={() => setValue("amount", amount.amount, { shouldValidate: true })}
                      type="button"
                    >
                      {amount.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="form-field">
                  <span>Nombre completo</span>
                  <input className="input-shell" placeholder="Tu nombre" {...register("fullName")} />
                  {errors.fullName ? <small>{errors.fullName.message}</small> : null}
                </label>

                <label className="form-field">
                  <span>Correo</span>
                  <input className="input-shell" placeholder="correo@ejemplo.com" type="email" {...register("email")} />
                  {errors.email ? <small>{errors.email.message}</small> : null}
                </label>

                <label className="form-field">
                  <span>Teléfono opcional</span>
                  <input className="input-shell" placeholder="+51 999 999 999" {...register("phone")} />
                  {errors.phone ? <small>{errors.phone.message}</small> : null}
                </label>

                <label className="form-field">
                  <span>Monto</span>
                  <input
                    className="input-shell"
                    min={10}
                    type="number"
                    {...register("amount", { valueAsNumber: true })}
                  />
                  {errors.amount ? <small>{errors.amount.message}</small> : null}
                </label>

                <label className="form-field">
                  <span>Tipo de donante</span>
                  <select className="input-shell" {...register("donorType")}>
                    {donation.donorTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.donorType ? <small>{errors.donorType.message}</small> : null}
                </label>

                <label className="form-field">
                  <span>Tipo de donación</span>
                  <select className="input-shell" {...register("frequency")}>
                    {donation.frequencies.map((frequency) => (
                      <option key={frequency} value={frequency}>
                        {frequency}
                      </option>
                    ))}
                  </select>
                  {errors.frequency ? <small>{errors.frequency.message}</small> : null}
                </label>
              </div>

              <label className="form-field">
                <span>Mensaje opcional</span>
                <textarea
                  className="input-shell min-h-28 resize-y"
                  placeholder="Cuéntanos si quieres orientar tu aporte a educación, datos, plataformas o alianzas."
                  {...register("message")}
                />
                {errors.message ? <small>{errors.message.message}</small> : null}
              </label>

              <label className="flex items-start gap-3 rounded-2xl bg-[var(--color-mint)] p-4 text-sm font-medium leading-6 text-[var(--color-text-muted)]">
                <input
                  className="mt-1 size-4 accent-[var(--color-primary)]"
                  type="checkbox"
                  {...register("wantsImpactUpdates")}
                />
                <span>Deseo recibir información sobre el impacto de mi donación.</span>
              </label>

              <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  <ShieldCheck aria-hidden="true" className="mt-0.5 text-[var(--color-primary)]" size={18} />
                  <span>Validamos tus datos ahora y dejamos lista la integración con pagos o CRM.</span>
                </div>
                <CTAButton className="sm:min-w-48" type="submit">
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 aria-hidden="true" className="animate-spin" size={18} />
                      Enviando
                    </span>
                  ) : (
                    "Registrar intención"
                  )}
                </CTAButton>
              </div>

              {submitState === "success" ? (
                <p className="rounded-2xl bg-[var(--color-mint)] p-4 text-sm font-semibold text-[var(--color-primary-dark)]">
                  Gracias. Recibimos tu intención de donación y el flujo quedó listo para conectar una pasarela de pago.
                </p>
              ) : null}
              {submitState === "error" ? (
                <p className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">
                  No pudimos registrar el mensaje. Intenta nuevamente o escríbenos por WhatsApp.
                </p>
              ) : null}
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
