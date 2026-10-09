import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";
import { CONTACT_EMAIL } from "@/lib/site";

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/**
 * Sends contact-form submissions to hola@selvastack.org.pe via Resend's REST API.
 * Requires RESEND_API_KEY + CONTACT_FROM_EMAIL (server-only env vars).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 422 });

  const data = parsed.data;
  // Honeypot filled → pretend success, drop silently.
  if (data.website) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL;
  if (!apiKey || !from) {
    console.error("[contact] RESEND_API_KEY or CONTACT_FROM_EMAIL not configured");
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Nombre", data.name],
    ["Correo", data.email],
    ["Organización", data.organization || "—"],
    ["Interés", data.interest],
    ["Idioma", data.locale]
  ];
  const html = `<h2>Nuevo mensaje desde selvastack.org.pe</h2><table>${rows
    .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escape(v)}</td></tr>`)
    .join("")}</table><p>${escape(data.message).replace(/\n/g, "<br>")}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `[Web · ${data.interest}] ${data.name}`,
        html,
        text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${data.message}`
      })
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] network error", error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
