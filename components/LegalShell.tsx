import { Container } from "./ui";
import { Breadcrumbs } from "./Breadcrumbs";

/** Einheitlicher Rahmen für Rechtstexte mit lesbarer Typografie. */
export function LegalShell({
  title,
  path,
  updated,
  disclaimer,
  children,
}: {
  title: string;
  path: string;
  updated?: string;
  disclaimer?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumbs items={[{ name: title, path }]} />
      <Container className="py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-slate-900">{title}</h1>
          {updated && <p className="mt-2 text-sm text-slate-400">Zuletzt aktualisiert: {updated}</p>}
          {disclaimer && (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <strong>Hinweis:</strong> {disclaimer}
            </div>
          )}
          <div className="legal-prose mt-8 space-y-4 text-slate-600 [&_a]:text-brand-700 [&_a]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-slate-900 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6 [&_p]:leading-relaxed">
            {children}
          </div>
        </div>
      </Container>
    </>
  );
}
