import { processSteps } from "@/lib/process";
import { Icon } from "./Icon";

export function ProcessSteps() {
  return (
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step) => (
        <li key={step.number} className="relative">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
              <Icon name={step.icon} className="h-5 w-5" />
            </span>
            <span className="text-sm font-bold text-brand-600">Schritt {step.number}</span>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
          <p className="prose-text mt-2 text-sm">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
