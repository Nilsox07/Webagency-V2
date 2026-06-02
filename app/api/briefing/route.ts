import { NextRequest, NextResponse } from "next/server";
import { estimatePrice } from "@/lib/lumi-pricing";
import type { PackageId } from "@/lib/packages";

export const runtime = "nodejs";

/**
 * Nimmt das fertige Briefing entgegen.
 *
 * TODO (Produktion): hier den E-Mail-Versand an BRIEFING_RECIPIENT_EMAIL anbinden
 * (z. B. Resend, Nodemailer/SMTP) und das Briefing als JSON + lesbares Markdown/PDF
 * verschicken sowie ggf. in ein CRM/Sheet schreiben. Aktuell wird das Briefing
 * serverseitig geloggt und als erfolgreich quittiert.
 */
export async function POST(req: NextRequest) {
  let body: { packageId: PackageId; data: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { packageId, data } = body;
  if (!packageId || !data?.kontakt_email) {
    return NextResponse.json(
      { error: "Briefing unvollständig (Paket oder E-Mail fehlt)." },
      { status: 400 }
    );
  }

  if (!data.dsgvo_einwilligung) {
    return NextResponse.json(
      { error: "Ohne Einwilligung können wir die Anfrage nicht verarbeiten." },
      { status: 400 }
    );
  }

  const estimate = estimatePrice(packageId, data);

  const briefing = {
    receivedAt: new Date().toISOString(),
    packageId,
    estimate,
    data,
  };

  // Platzhalter für Versand/Persistenz:
  console.log("📥 Neues Briefing erhalten:", JSON.stringify(briefing, null, 2));
  const recipient = process.env.BRIEFING_RECIPIENT_EMAIL;
  if (recipient) {
    console.log(`(TODO) Briefing an ${recipient} versenden.`);
  }

  return NextResponse.json({
    ok: true,
    message:
      "Danke! Dein Briefing ist bei uns eingegangen. Du erhältst zeitnah eine Zusammenfassung und dein unverbindliches Angebot per E-Mail.",
  });
}
