import Link from "next/link";
import { Fragment } from "react";

type Crumb = { label: string; href?: string };

export function Breadcrumb({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const dim = dark ? "#9A8E84" : "#77716C";
  const strong = dark ? "#F7F3EC" : "#241B17";
  return (
    <div style={{ fontSize: 13, color: dim, display: "flex", gap: 8, flexWrap: "wrap" }}>
      {items.map((it, i) => (
        <Fragment key={`${it.label}-${i}`}>
          {i > 0 && <span>/</span>}
          {it.href ? (
            <Link href={it.href} style={{ color: dim }}>
              {it.label}
            </Link>
          ) : (
            <span style={{ color: strong }}>{it.label}</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
