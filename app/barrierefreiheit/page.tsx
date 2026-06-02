import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Barrierefreiheitserklärung",
  description:
    "Erklärung zur Barrierefreiheit dieser Website nach den Vorgaben des BFSG und WCAG 2.1 AA.",
  alternates: { canonical: "/barrierefreiheit" },
  robots: { index: true, follow: false },
};

export default function BarrierefreiheitPage() {
  return (
    <LegalShell
      title="Erklärung zur Barrierefreiheit"
      path="/barrierefreiheit"
      updated="2. Juni 2026"
      disclaimer="Vorlage. Bitte den tatsächlichen Stand der Barrierefreiheit (ggf. nach Audit) sowie die zuständige Durchsetzungs-/Schlichtungsstelle ergänzen und prüfen lassen."
    >
      <h2>Unser Anspruch</h2>
      <p>
        Wir sind bemüht, diese Website im Einklang mit dem Barrierefreiheitsstärkungsgesetz (BFSG,
        in Kraft seit 28.06.2025) und den Web Content Accessibility Guidelines (WCAG) 2.1 auf der
        Stufe AA barrierefrei zugänglich zu machen. Barrierefreiheit ist für uns als
        Webdesign-Agentur nicht nur Pflicht, sondern Qualitätsanspruch.
      </p>

      <h2>Welche Maßnahmen wurden umgesetzt?</h2>
      <ul>
        <li>Vollständige Tastaturbedienbarkeit und sichtbare Fokus-Markierungen</li>
        <li>Ausreichende Farbkontraste (Ziel: WCAG 2.1 AA)</li>
        <li>Semantische HTML-Struktur mit klarer Überschriften-Hierarchie</li>
        <li>Alternativtexte für informative Grafiken</li>
        <li>Beschriftete Formularfelder und verständliche Fehlermeldungen</li>
        <li>Ein „Zum Hauptinhalt springen“-Link</li>
        <li>Berücksichtigung der Einstellung „reduzierte Bewegung“</li>
      </ul>

      <h2>Stand der Vereinbarkeit</h2>
      <p>
        Diese Website ist nach unserer Einschätzung weitgehend mit WCAG 2.1 AA vereinbar. Sollten dir
        dennoch Barrieren auffallen, freuen wir uns über deinen Hinweis. (TODO: nach einem
        professionellen Audit den genauen Konformitätsstatus und etwaige Ausnahmen angeben.)
      </p>

      <h2>Feedback und Kontakt</h2>
      <p>
        Sind dir Mängel beim barrierefreien Zugang aufgefallen oder benötigst du Informationen in
        einem zugänglichen Format? Kontaktiere uns:
        <br />
        E-Mail: <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
        <br />
        Telefon: {siteConfig.contact.phoneDisplay}
      </p>

      <h2>Durchsetzungsverfahren</h2>
      <p>
        Solltest du auf deine Rückmeldung keine zufriedenstellende Antwort erhalten, kannst du dich an
        die zuständige Marktüberwachungs-/Durchsetzungsstelle wenden. (TODO: zuständige Stelle deines
        Bundeslandes ergänzen.)
      </p>
    </LegalShell>
  );
}
