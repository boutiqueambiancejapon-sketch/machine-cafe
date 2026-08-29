// components/blog/AuthorByline.tsx — signature en tête d'article (E-E-A-T).
// RSC.

import Link from "next/link";
import { mono } from "@/components/ui";
import type { Author } from "@/data/authors";

export function AuthorByline({
  author,
  dateDisplay,
  readTime,
}: {
  author: Author;
  dateDisplay: string;
  readTime: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginTop: 20,
        fontSize: 13,
        color: "#77716C",
        fontFamily: mono,
        flexWrap: "wrap",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 30,
          height: 30,
          borderRadius: 999,
          background: "#241B17",
          color: "#F7F3EC",
          display: "grid",
          placeItems: "center",
          fontSize: 12,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {author.name.charAt(0)}
      </span>
      <span>
        Par{" "}
        <Link href={`/auteurs/${author.slug}`} style={{ fontWeight: 700, color: "#45413E" }}>
          {author.name}
        </Link>
        , {author.jobTitle.toLowerCase()}
      </span>
      <span>·</span>
      <span>{dateDisplay}</span>
      <span>·</span>
      <span>{readTime} min de lecture</span>
    </div>
  );
}
