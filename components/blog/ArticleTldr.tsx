// components/blog/ArticleTldr.tsx — encadré « L'essentiel » en tête d'article.
// Aide la citabilité GEO (résumé extractible en 3 puces). RSC.

import { mono } from "@/components/ui";

export function ArticleTldr({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div
      style={{
        marginTop: 28,
        border: "1px solid #E8E1D6",
        borderLeft: "4px solid #B77945",
        borderRadius: 14,
        padding: "18px 22px",
        background: "#FCFBF8",
      }}
    >
      <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: "#B77945" }}>
        L&apos;essentiel
      </div>
      <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((it) => (
          <li key={it} style={{ fontSize: 14.5, lineHeight: 1.6, color: "#45413E", display: "flex", gap: 10 }}>
            <span aria-hidden style={{ color: "#B77945", flexShrink: 0 }}>
              —
            </span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
