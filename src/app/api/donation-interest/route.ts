import { NextResponse } from "next/server";

import { leadRepository } from "@/lib/repositories";
import { donationInterestSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = donationInterestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          errors: parsed.error.flatten().fieldErrors
        },
        { status: 422 }
      );
    }

    const receipt = await leadRepository.createDonationLead(parsed.data);

    return NextResponse.json({
      ok: true,
      receipt,
      message: "Intención de donación validada. Conecta pasarela, CRM o SQL cuando esté listo."
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "No se pudo procesar la solicitud."
      },
      { status: 400 }
    );
  }
}
