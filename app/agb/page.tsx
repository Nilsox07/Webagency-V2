import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen für Webdesign-Leistungen.",
  alternates: { canonical: "/agb" },
  robots: { index: true, follow: false },
};

export default function AgbPage() {
  return (
    <LegalShell
      title="Allgemeine Geschäftsbedingungen"
      path="/agb"
      disclaimer="Dies ist eine vereinfachte Vorlage und ersetzt keine Rechtsberatung. Bitte vor Verwendung anwaltlich prüfen und an deine konkreten Leistungen anpassen."
    >
      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen{" "}
        {siteConfig.legalName} (nachfolgend „Anbieter“) und dem Auftraggeber über die Erstellung von
        Websites und damit verbundene Leistungen.
      </p>

      <h2>§ 2 Vertragsschluss</h2>
      <p>
        Die Darstellung der Pakete und Preise auf dieser Website stellt kein bindendes Angebot dar.
        Eine über die Briefing-Assistentin Lumi oder anderweitig gestellte Anfrage ist unverbindlich.
        Der Vertrag kommt erst mit der ausdrücklichen Auftragsbestätigung durch den Anbieter zustande.
      </p>

      <h2>§ 3 Leistungsumfang und Festpreise</h2>
      <p>
        Der Leistungsumfang ergibt sich aus dem gewählten Paket sowie ggf. gebuchten
        Zusatzleistungen. Die angegebenen Preise sind Festpreise und verstehen sich netto zzgl. der
        gesetzlichen Umsatzsteuer. Im Paket enthaltene Korrekturrunden sind in der jeweiligen
        Paketbeschreibung genannt; weitere Korrekturrunden werden gesondert berechnet.
      </p>

      <h2>§ 4 Mitwirkungspflichten des Auftraggebers</h2>
      <p>
        Der Auftraggeber stellt die für die Umsetzung erforderlichen Inhalte (Texte, Bilder, Logo,
        Zugangsdaten etc.) rechtzeitig und in geeigneter Form bereit. Verzögerungen aufgrund
        fehlender Mitwirkung können den vereinbarten Liefertermin entsprechend verschieben.
      </p>

      <h2>§ 5 Termine</h2>
      <p>
        Liefertermine werden nach Vorliegen aller erforderlichen Inhalte verbindlich vereinbart.
      </p>

      <h2>§ 6 Zahlungsbedingungen</h2>
      <p>
        Sofern nicht anders vereinbart, ist die Vergütung nach Abnahme bzw. gemäß
        Auftragsbestätigung fällig. Laufende Leistungen wie Hosting und Wartung werden monatlich
        abgerechnet und sind monatlich kündbar. (TODO: konkrete Zahlungsmodalitäten ergänzen.)
      </p>

      <h2>§ 7 Nutzungsrechte</h2>
      <p>
        Nach vollständiger Bezahlung erhält der Auftraggeber die Nutzungsrechte an der erstellten
        Website im vereinbarten Umfang.
      </p>

      <h2>§ 8 Haftung</h2>
      <p>
        Der Anbieter haftet nach den gesetzlichen Bestimmungen. Für leicht fahrlässige
        Pflichtverletzungen ist die Haftung – außer bei Schäden aus der Verletzung des Lebens, des
        Körpers oder der Gesundheit – auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
      </p>

      <h2>§ 9 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen unwirksam
        sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
      </p>
    </LegalShell>
  );
}
