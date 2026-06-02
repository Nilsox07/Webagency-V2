import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Nimmt das Kontaktformular entgegen.
 * TODO (Produktion): E-Mail-Versand anbinden (z. B. Resend/SMTP an
 * BRIEFING_RECIPIENT_EMAIL). Aktuell wird die Anfrage geloggt und quittiert.
 */
export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; message?: string; consent?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { name, email, message, consent } = body;
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Bitte alle Pflichtfelder ausfüllen." }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ error: "Bitte stimme der Datenschutzerklärung zu." }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Bitte gib eine gültige E-Mail-Adresse an." }, { status: 400 });
  }

  console.log("📨 Neue Kontaktanfrage:", { name, email, message, at: new Date().toISOString() });

  return NextResponse.json({
    ok: true,
    message: "Danke für deine Nachricht! Ich melde mich in der Regel innerhalb von 1 Werktag.",
  });
}
