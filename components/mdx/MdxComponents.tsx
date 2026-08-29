// components/mdx/MdxComponents.tsx
//
// Bibliothèque de composants MDX — même API que toutougourmet/robot-tondeuse
// (mêmes noms, mêmes props : InfoBox, Callout, StatRow/Stat, CompareTable…)
// pour que la rédaction MDX reste identique d'un site à l'autre. Seul le
// rendu change : machine-cafe n'a pas Tailwind/CSS vars (cf README — "aucune
// dépendance UI externe"), donc tout est re-skinné en styles inline avec la
// palette éditoriale du site (voir components/ui.tsx).

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { serif, mono } from "@/components/ui";

// ─── Palette locale (miroir des tons utilisés dans app/*/page.tsx) ───────
const c = {
  bg: "#FCFBF8",
  surface: "#F7F3EC",
  surface2: "#F1EBE0",
  border: "#E8E1D6",
  borderSoft: "#EDE6DA",
  textPrimary: "#241B17",
  textSecondary: "#45413E",
  textMuted: "#77716C",
  textFaint: "#8C837A",
  amber: "#B77945",
  amberDark: "#A46A3B",
  green: "#3E6B55",
  greenBg: "#F4F7F5",
  greenBorder: "#DCE7E0",
  brown: "#8A4B3A",
  brownBg: "#F9F5F2",
  blue: "#3D5A73",
  blueBg: "#EFF3F6",
};

// ─── BodyImage ────────────────────────────────────────────────────────────
export function BodyImage({
  src,
  alt,
  caption,
  width = 1200,
  height = 900,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <figure style={{ margin: "32px 0" }}>
      <div style={{ position: "relative", width: "100%", borderRadius: 20, overflow: "hidden", border: `1px solid ${c.border}` }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 800px"
          style={{ width: "100%", height: "auto" }}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      {caption && (
        <figcaption style={{ marginTop: 12, fontSize: 13, textAlign: "center", fontStyle: "italic", color: c.textMuted }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─── InfoBox ──────────────────────────────────────────────────────────────
type InfoBoxColor = "amber" | "blue" | "green" | "rose" | "dark";
const infoBoxStyles: Record<InfoBoxColor, { bg: string; border: string; title: string }> = {
  amber: { bg: c.surface, border: c.amber, title: c.amberDark },
  blue: { bg: c.blueBg, border: c.blue, title: c.blue },
  green: { bg: c.greenBg, border: c.green, title: c.green },
  rose: { bg: c.brownBg, border: c.brown, title: c.brown },
  dark: { bg: c.textPrimary, border: c.textPrimary, title: c.bg },
};

export function InfoBox({
  children,
  color = "blue",
  title,
  emoji,
}: {
  children: ReactNode;
  color?: InfoBoxColor;
  title?: string;
  emoji?: string;
}) {
  const s = infoBoxStyles[color];
  return (
    <div style={{ borderRadius: 14, padding: 20, margin: "24px 0", borderLeft: `4px solid ${s.border}`, background: s.bg }}>
      {(title || emoji) && (
        <p style={{ fontWeight: 700, fontSize: 13.5, margin: "0 0 8px", color: s.title }}>
          {emoji && <span style={{ marginRight: 6 }}>{emoji}</span>}
          {title}
        </p>
      )}
      <div style={{ fontSize: 14.5, lineHeight: 1.65, color: color === "dark" ? c.bg : c.textSecondary }}>{children}</div>
    </div>
  );
}

// ─── Callout ──────────────────────────────────────────────────────────────
export function Callout({ children, emoji = "💡" }: { children: ReactNode; emoji?: string }) {
  return (
    <div style={{ borderRadius: 18, padding: 22, margin: "24px 0", border: `1px solid ${c.border}`, background: c.surface2 }}>
      <div style={{ display: "flex", gap: 14 }}>
        <span style={{ fontSize: 22, flexShrink: 0 }}>{emoji}</span>
        <div style={{ fontSize: 15, lineHeight: 1.65, color: c.textSecondary }}>{children}</div>
      </div>
    </div>
  );
}

// ─── FeatureGrid / Feature ─────────────────────────────────────────────────
export function FeatureGrid({ children }: { children: ReactNode }) {
  return (
    <div data-r="two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "24px 0" }}>
      {children}
    </div>
  );
}

export function Feature({
  title,
  value,
  icon,
  positive,
  negative,
}: {
  title: string;
  value?: string;
  icon?: string;
  positive?: boolean;
  negative?: boolean;
}) {
  const borderColor = positive ? c.green : negative ? c.brown : c.border;
  const titleColor = positive ? c.green : negative ? c.brown : c.textPrimary;
  const prefix = positive ? "✓ " : negative ? "✗ " : "";
  return (
    <div style={{ borderRadius: 14, padding: 16, border: `1px solid ${borderColor}`, background: c.bg }}>
      <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px", color: titleColor }}>
        {prefix}
        {icon && <span style={{ marginRight: 6 }}>{icon}</span>}
        {title}
      </p>
      {value && <p style={{ fontSize: 14, margin: 0, color: c.textSecondary }}>{value}</p>}
    </div>
  );
}

// ─── StatRow / Stat ─────────────────────────────────────────────────────────
export function StatRow({ children }: { children: ReactNode }) {
  return (
    <div data-r="grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, margin: "24px 0" }}>
      {children}
    </div>
  );
}

export function Stat({
  value,
  label,
  color = "default",
}: {
  value: string;
  label: string;
  color?: "default" | "amber" | "blue" | "green" | "rose";
}) {
  const palette: Record<string, { bg: string; text: string; accent: string }> = {
    default: { bg: c.surface2, text: c.textPrimary, accent: c.amber },
    amber: { bg: c.surface, text: c.amberDark, accent: c.amber },
    blue: { bg: c.blueBg, text: c.blue, accent: c.blue },
    green: { bg: c.greenBg, text: c.green, accent: c.green },
    rose: { bg: c.brownBg, text: c.brown, accent: c.brown },
  };
  const p = palette[color];
  return (
    <div
      style={{
        borderRadius: 16,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        textAlign: "center",
        background: p.bg,
        borderTop: `3px solid ${p.accent}`,
      }}
    >
      <p style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.05, margin: 0, color: p.text }}>
        {value}
      </p>
      <p style={{ fontSize: 13, margin: 0, color: p.text, opacity: 0.75 }}>{label}</p>
    </div>
  );
}

// ─── CompareTable family ────────────────────────────────────────────────────
export function CompareTable({ children }: { children: ReactNode }) {
  return (
    <div style={{ margin: "24px 0", overflowX: "auto", borderRadius: 18, border: `1px solid ${c.border}` }}>
      <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>{children}</table>
    </div>
  );
}
export function CompareThead({ children }: { children: ReactNode }) {
  return <thead style={{ background: c.textPrimary, color: c.bg }}>{children}</thead>;
}
export function CompareTh({ children }: { children: ReactNode }) {
  return (
    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em" }}>
      {children}
    </th>
  );
}
export function CompareTr({ children, highlight }: { children: ReactNode; highlight?: boolean }) {
  return (
    <tr style={{ background: highlight ? c.surface : undefined, borderTop: `1px solid ${c.border}` }}>{children}</tr>
  );
}
export function CompareTd({ children, good, bad }: { children: ReactNode; good?: boolean; bad?: boolean }) {
  const color = good ? c.green : bad ? c.brown : c.textSecondary;
  return (
    <td style={{ padding: "12px 16px", color }}>
      {good && <span style={{ marginRight: 4, fontWeight: 700 }}>✓</span>}
      {bad && <span style={{ marginRight: 4, fontWeight: 700 }}>✗</span>}
      {children}
    </td>
  );
}

// ─── Verdict ──────────────────────────────────────────────────────────────
export function Verdict({
  children,
  brand,
  score,
  emoji = "🏆",
}: {
  children: ReactNode;
  brand?: string;
  score?: number;
  emoji?: string;
}) {
  return (
    <div style={{ borderRadius: 20, padding: 26, margin: "32px 0", background: c.textPrimary, border: `2px solid ${c.amber}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
        <span style={{ fontSize: 30 }}>{emoji}</span>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", margin: 0, color: c.amber }}>
            Notre verdict
          </p>
          {brand && (
            <p style={{ fontFamily: serif, fontWeight: 400, fontSize: 22, margin: "2px 0 0", color: c.bg }}>
              {brand}
              {score !== undefined && (
                <span style={{ marginLeft: 10, fontSize: 15, fontFamily: mono, padding: "2px 9px", borderRadius: 6, background: c.amber, color: c.textPrimary }}>
                  {score}/10
                </span>
              )}
            </p>
          )}
        </div>
      </div>
      <div style={{ fontSize: 15.5, lineHeight: 1.7, color: c.bg }}>{children}</div>
    </div>
  );
}

// ─── ProsConsList (children mode) + Pros/ConsBlock + Pro/ConItem ──────────
export function ProsConsList({ children }: { children: ReactNode }) {
  return <div data-r="two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "24px 0" }}>{children}</div>;
}
export function ProsBlock({ children }: { children: ReactNode }) {
  return (
    <div style={{ borderRadius: 14, padding: 18, border: `1px solid ${c.greenBorder}`, background: c.greenBg }}>
      <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 10px", color: c.green }}>Points forts</p>
      <ul style={{ display: "flex", flexDirection: "column", gap: 8, margin: 0, padding: 0, listStyle: "none" }}>{children}</ul>
    </div>
  );
}
export function ConsBlock({ children }: { children: ReactNode }) {
  return (
    <div style={{ borderRadius: 14, padding: 18, border: `1px solid ${c.border}`, background: c.brownBg }}>
      <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 10px", color: c.brown }}>Points faibles</p>
      <ul style={{ display: "flex", flexDirection: "column", gap: 8, margin: 0, padding: 0, listStyle: "none" }}>{children}</ul>
    </div>
  );
}
export function ProItem({ children }: { children: ReactNode }) {
  return (
    <li style={{ fontSize: 14, color: c.textSecondary, display: "flex", gap: 8 }}>
      <span style={{ color: c.green, flexShrink: 0, fontWeight: 700 }}>✓</span>
      {children}
    </li>
  );
}
export function ConItem({ children }: { children: ReactNode }) {
  return (
    <li style={{ fontSize: 14, color: c.textSecondary, display: "flex", gap: 8 }}>
      <span style={{ color: c.brown, flexShrink: 0, fontWeight: 700 }}>✗</span>
      {children}
    </li>
  );
}

// ─── SectionDivider ─────────────────────────────────────────────────────────
export function SectionDivider({ label }: { label?: string }) {
  if (!label) return <hr style={{ border: "none", borderTop: `1px solid ${c.border}`, margin: "32px 0" }} />;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "32px 0" }}>
      <div style={{ flex: 1, height: 1, background: c.border }} />
      <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", padding: "4px 12px", borderRadius: 999, background: c.surface2, color: c.textMuted }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: c.border }} />
    </div>
  );
}

// ─── FaqList / FaqItem — accordéon natif (pas de JS) ──────────────────────
export function FaqList({ children }: { children: ReactNode }) {
  return (
    <div style={{ border: `1px solid ${c.border}`, borderRadius: 18, overflow: "hidden", margin: "24px 0", background: c.bg }}>
      {children}
    </div>
  );
}
export function FaqItem({ question, children }: { question: string; children: ReactNode }) {
  const summaryStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: "16px 20px",
    cursor: "pointer",
    listStyle: "none",
  };
  return (
    <details style={{ borderBottom: `1px solid ${c.border}` }}>
      <summary style={summaryStyle}>
        <h3 style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.4, margin: 0, color: c.textPrimary }}>{question}</h3>
        <span style={{ flexShrink: 0, color: c.textMuted }}>▾</span>
      </summary>
      <div style={{ padding: "0 20px 18px", fontSize: 14.5, lineHeight: 1.65, color: c.textSecondary }}>{children}</div>
    </details>
  );
}

// ─── Table markdown brute (GFM) — wrapper scrollable ──────────────────────
export function MdxTable(props: React.ComponentProps<"table">) {
  return (
    <div style={{ overflowX: "auto", margin: "20px 0" }}>
      <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }} {...props} />
    </div>
  );
}
