import type { FaqItem } from "@/lib/faq";
import { JsonLd, faqSchema } from "./JsonLd";
import { Icon } from "./Icon";

/**
 * Barrierefreies FAQ über native <details>/<summary> (Tastatur-/Screenreader-fest).
 * Gibt zusätzlich FAQPage-JSON-LD aus (GEO/AEO).
 */
export function FaqAccordion({
  items,
  withSchema = true,
}: {
  items: FaqItem[];
  withSchema?: boolean;
}) {
  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {withSchema && <JsonLd data={faqSchema(items)} />}
      {items.map((item, i) => (
        <details key={i} className="group px-5 py-1 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-slate-900">
            <span>{item.question}</span>
            <Icon
              name="arrowRight"
              className="h-5 w-5 shrink-0 rotate-90 text-brand-600 transition-transform group-open:-rotate-90"
            />
          </summary>
          <p className="prose-text pb-4 pr-8">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
