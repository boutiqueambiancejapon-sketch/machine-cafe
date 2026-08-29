// components/blog/AuthorBox.tsx — carte auteur en bas d'article (E-E-A-T).
// RSC.

import Link from "next/link";
import { mono, serif } from "@/components/ui";
import type { Author } from "@/data/authors";

export function AuthorBox({ author }: { author: Author }) {
  return (
    <aside
      style={{
        marginTop: 44,
        border: "1px solid #E8E1D6",
        borderRadius: 20,
        padding: 26,
        background: "#F7F3EC",
        display: "flex",
        gap: 20,
        flexWrap: "wrap",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 56,
          height: 56,
          borderRadius: 999,
          background: "#241B17",
          color: "#F7F3EC",
          display: "grid",
          placeItems: "center",
          fontSize: 22,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {author.name.charAt(0)}
      </span>
      <div style={{ flex: 1, minWidth: 240 }}>
        <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: "#77716C" }}>
          L&apos;auteur
        </div>
        <div style={{ fontFamily: serif, fontSize: 20, color: "#241B17", marginTop: 4 }}>{author.name}</div>
        <div style={{ fontSize: 13, color: "#77716C" }}>{author.jobTitle}</div>
        <p style={{ margin: "12px 0 0", fontSize: 14.5, lineHeight: 1.65, color: "#45413E" }}>{author.bio}</p>
        <Link
          href={`/auteurs/${author.slug}`}
          style={{ display: "inline-block", marginTop: 12, fontSize: 13.5, fontWeight: 700, color: "#B77945" }}
        >
          Voir tous ses articles →
        </Link>
      </div>
    </aside>
  );
}
