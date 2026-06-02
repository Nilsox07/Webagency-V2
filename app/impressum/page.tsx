import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung gemäß § 5 DDG.",
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: false },
};

export default function ImpressumPage() {
  const c = siteConfig.contact;
  return (
    <LegalShell
      title="Impressum"
      path="/impressum"
      disclaimer="Dies ist eine Vorlage. Prüfe alle Angaben und passe sie an deine Rechtsform an (Einzelunternehmen, GmbH, UG …). Im Zweifel anwaltlich prüfen lassen."
    >
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {siteConfig.legalName}
        <br />
        {c.street}
        <br />
        {c.zip} {c.city}
        <br />
        {c.country}
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: {c.phoneDisplay}
        <br />
        E-Mail: <a href={`mailto:${c.email}`}>{c.email}</a>
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        {siteConfig.legal.isSmallBusiness
          ? "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung). (TODO: prüfen/anpassen)"
          : `Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG: ${siteConfig.legal.vatId}`}
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {siteConfig.owner.name}
        <br />
        {c.street}, {c.zip} {c.city}
      </p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen. (TODO: bei Bedarf anpassen.)
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach
        den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter
        jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
        oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält ggf. Links zu externen Websites Dritter, auf deren Inhalte wir keinen
        Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
        Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
        deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.
      </p>
    </LegalShell>
  );
}
