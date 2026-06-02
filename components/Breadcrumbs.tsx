import Link from "next/link";
import { JsonLd, breadcrumbSchema } from "./JsonLd";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const full: Crumb[] = [{ name: "Start", path: "/" }, ...items];
  return (
    <nav aria-label="Brotkrümelnavigation" className="container-content pt-6">
      <JsonLd data={breadcrumbSchema(full)} />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        {full.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1.5">
            {i < full.length - 1 ? (
              <>
                <Link href={c.path} className="hover:text-brand-700">
                  {c.name}
                </Link>
                <span aria-hidden="true">/</span>
              </>
            ) : (
              <span className="font-medium text-slate-700" aria-current="page">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
