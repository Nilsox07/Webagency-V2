import Link from "next/link";
import { Icon } from "./Icon";

/* ── Container ──────────────────────────────────────────────────────────── */
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`container-content ${className}`}>{children}</div>;
}

/* ── Section ────────────────────────────────────────────────────────────── */
export function Section({
  children,
  className = "",
  muted = false,
  id,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
  id?: string;
  ariaLabel?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`py-16 sm:py-20 lg:py-24 ${muted ? "bg-slate-50" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

/* ── SectionHeading ─────────────────────────────────────────────────────── */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  centered = false,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  centered?: boolean;
  as?: "h1" | "h2";
}) {
  const Tag = as;
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-600">
          {eyebrow}
        </p>
      )}
      <Tag className={as === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}>
        {title}
      </Tag>
      {intro && <p className="prose-text mt-4 text-lg">{intro}</p>}
    </div>
  );
}

/* ── Button ─────────────────────────────────────────────────────────────── */
type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "lumi" | "ghost";
  size?: "md" | "lg";
  className?: string;
  withArrow?: boolean;
};

const buttonStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-600/20",
  secondary:
    "bg-white text-brand-700 ring-1 ring-inset ring-brand-200 hover:bg-brand-50",
  lumi: "bg-lumi-600 text-white hover:bg-lumi-700 shadow-sm shadow-lumi-600/20",
  ghost: "text-brand-700 hover:bg-brand-50",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  withArrow = false,
}: ButtonProps) {
  const sizeCls = size === "lg" ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-sm";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus-visible:ring-2 focus-visible:ring-offset-2 ${buttonStyles[variant]} ${sizeCls} ${className}`}
    >
      {children}
      {withArrow && (
        <Icon
          name="arrowRight"
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}

/* ── Card ───────────────────────────────────────────────────────────────── */
export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Badge ──────────────────────────────────────────────────────────────── */
export function Badge({
  children,
  tone = "brand",
}: {
  children: React.ReactNode;
  tone?: "brand" | "lumi" | "green";
}) {
  const tones = {
    brand: "bg-brand-50 text-brand-700 ring-brand-200",
    lumi: "bg-lumi-50 text-lumi-700 ring-lumi-200",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
