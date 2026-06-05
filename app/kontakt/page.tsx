import type { Metadata } from "next";
import { Section, Container } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Kontakt – Sprich mit uns",
  description:
    "Kontaktiere Klarweb: per E-Mail, Telefon oder Formular. Antwort in der Regel innerhalb von 1 Werktag. Lieber direkt starten? Briefing mit Lumi.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  const c = siteConfig.contact;
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Lass uns sprechen"
        intro="Du hast Fragen zu einem Paket oder deinem Projekt? Schreib mir – ich antworte in der Regel innerhalb von einem Werktag, persönlich."
        breadcrumbs={[{ name: "Kontakt", path: "/kontakt" }]}
        accent="#1A8C94"
      />
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Links: Kontaktdaten (NAP) */}
            <div>
              <div className="space-y-4">
                <a href={`mailto:${c.email}`} className="flex items-center gap-3 text-slate-700 hover:text-brand-700">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon name="mail" className="h-5 w-5" />
                  </span>
                  {c.email}
                </a>
                <a href={`tel:${c.phone}`} className="flex items-center gap-3 text-slate-700 hover:text-brand-700">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon name="phone" className="h-5 w-5" />
                  </span>
                  {c.phoneDisplay}
                </a>
                <div className="flex items-start gap-3 text-slate-700">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon name="pin" className="h-5 w-5" />
                  </span>
                  <address className="not-italic">
                    {siteConfig.legalName}
                    <br />
                    {c.street}
                    <br />
                    {c.zip} {c.city}
                  </address>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-lumi-50 p-5">
                <p className="font-semibold text-slate-900">Lieber direkt starten?</p>
                <p className="mt-1 text-sm text-slate-600">
                  Beschreibe dein Projekt in Minuten mit Lumi und erhalte eine unverbindliche
                  Schätzung.
                </p>
                <a
                  href="/briefing"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-lumi-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-lumi-700"
                >
                  <Icon name="chat" className="h-4 w-4" /> Briefing mit Lumi
                </a>
              </div>
            </div>

            {/* Rechts: Formular */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-slate-900">Schreib mir</h2>
              <p className="mt-1 text-sm text-slate-500">{c.responseTime}</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
