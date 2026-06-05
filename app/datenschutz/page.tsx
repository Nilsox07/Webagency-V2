import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Informationen zur Verarbeitung personenbezogener Daten gemäß Art. 13 DSGVO.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: true, follow: false },
};

export default function DatenschutzPage() {
  const c = siteConfig.contact;
  return (
    <LegalShell
      title="Datenschutzerklärung"
      path="/datenschutz"
      disclaimer="Dies ist eine Vorlage und ersetzt keine Rechtsberatung. Ergänze die tatsächlich eingesetzten Dienste (Hosting, Analytics, KI-Anbieter für Lumi inkl. AVV nach Art. 28 DSGVO) und lass sie prüfen."
    >
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        {siteConfig.legalName}, {c.street}, {c.zip} {c.city}, E-Mail:{" "}
        <a href={`mailto:${c.email}`}>{c.email}</a>
      </p>

      <h2>2. Allgemeines zur Datenverarbeitung</h2>
      <p>
        Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer
        funktionsfähigen Website sowie unserer Leistungen erforderlich ist. Rechtsgrundlagen sind
        insbesondere Art. 6 Abs. 1 lit. a (Einwilligung), lit. b (Vertrag/vorvertragliche Maßnahmen)
        und lit. f (berechtigtes Interesse) DSGVO.
      </p>

      <h2>3. Hosting</h2>
      <p>
        Diese Website wird bei einem Anbieter mit Serverstandort in Deutschland gehostet. (TODO:
        Anbieter, Auftragsverarbeitungsvertrag nach Art. 28 DSGVO und Details ergänzen.) Beim Aufruf
        werden technisch notwendige Server-Logfiles (z. B. IP-Adresse, Zeitpunkt, abgerufene Seite)
        verarbeitet (Art. 6 Abs. 1 lit. f DSGVO).
      </p>

      <h2>4. Kontaktaufnahme</h2>
      <p>
        Wenn du uns über das Kontaktformular oder per E-Mail kontaktierst, verarbeiten wir deine
        Angaben (Name, E-Mail, Nachricht) zur Bearbeitung deiner Anfrage (Art. 6 Abs. 1 lit. b bzw.
        lit. a DSGVO). Die Daten werden gelöscht, sobald sie nicht mehr erforderlich sind und keine
        gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>

      <h2>5. Briefing-Assistentin „Lumi“</h2>
      <p>
        Unsere KI-Assistentin Lumi hilft dir, dein Website-Projekt zu beschreiben. Deine Eingaben
        werden – nach deiner ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) – zur
        Erstellung deines Briefings und deiner unverbindlichen Anfrage verarbeitet. Sofern ein
        externer KI-Dienst eingesetzt wird, geschieht dies auf Grundlage eines
        Auftragsverarbeitungsvertrags (Art. 28 DSGVO). (TODO: eingesetzten Anbieter, Datenkategorien,
        Speicherdauer und ggf. Drittlandtransfer konkretisieren.) Bitte gib im Chat keine besonderen
        Kategorien personenbezogener Daten (Art. 9 DSGVO) an.
      </p>

      <h2>6. Cookies & Einwilligung</h2>
      <p>
        Diese Website setzt grundsätzlich nur technisch notwendige Cookies/Speichertechniken ein, die
        für den Betrieb erforderlich sind (Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO bzw. § 25 Abs. 2
        TDDDG). Nicht notwendige Cookies (z. B. zur Reichweitenmessung/Analyse) laden wir ausschließlich
        nach deiner ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG), die wir
        über unseren Cookie-Banner einholen.
      </p>
      <p>
        Deine Auswahl speichern wir lokal in deinem Browser, um sie bei weiteren Besuchen zu
        berücksichtigen. Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen
        oder anpassen – über den Link „Cookie-Einstellungen“ im Seitenfuß. (TODO: an die tatsächlich
        eingesetzten, nicht notwendigen Dienste anpassen.)
      </p>

      <h2>7. Deine Rechte</h2>
      <p>Dir stehen nach der DSGVO insbesondere folgende Rechte zu:</p>
      <ul>
        <li>Auskunft (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch (Art. 21 DSGVO)</li>
        <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
      </ul>
      <p>
        Außerdem hast du das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art.
        77 DSGVO).
      </p>

      <h2>8. SSL-/TLS-Verschlüsselung</h2>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte
        Verbindung erkennst du am „https://“ in der Adresszeile deines Browsers.
      </p>
    </LegalShell>
  );
}
