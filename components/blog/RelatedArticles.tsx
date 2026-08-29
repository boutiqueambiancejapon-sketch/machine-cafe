// components/blog/RelatedArticles.tsx — 3 contenus liés, tous formats
// confondus (blog / comparatif / test). Priorité aux tags partagés. RSC.

import Link from "next/link";
import { getAllContentDocs, KIND_HREF, type ContentKind } from "@/lib/mdx";
import { mono, serif } from "@/components/ui";

const KIND_LABEL: Record<ContentKind, string> = {
  blog: "Article",
  comparatifs: "Comparatif",
  tests: "Avis",
};

export function RelatedArticles({
  currentSlug,
  currentKind,
  tags = [],
}: {
  currentSlug: string;
  currentKind: ContentKind;
  tags?: string[];
}) {
  const tagSet = new Set(tags.map((t) => t.toLowerCase()));
  const scored = getAllContentDocs()
    .filter((d) => !(d.slug === currentSlug && d.kind === currentKind))
    .map((d) => {
      const overlap = (d.frontmatter.tags ?? []).filter((t) => tagSet.has(t.toLowerCase())).length;
      return { d, score: overlap };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.d.frontmatter.date).getTime() - new Date(a.d.frontmatter.date).getTime(),
    )
    .slice(0, 3)
    .map((s) => s.d);

  if (scored.length === 0) return null;

  return (
    <section style={{ marginTop: 44 }}>
      <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: "#77716C" }}>
        À lire ensuite
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, marginTop: 14 }}>
        {scored.map((d) => (
          <Link
            key={`${d.kind}-${d.slug}`}
            href={`${KIND_HREF[d.kind]}/${d.slug}`}
            style={{ display: "block", border: "1px solid #E8E1D6", borderRadius: 16, padding: 18, background: "#FCFBF8" }}
          >
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "#B77945" }}>
              {KIND_LABEL[d.kind]}
            </div>
            <div style={{ fontFamily: serif, fontSize: 17, color: "#241B17", marginTop: 6, lineHeight: 1.3 }}>
              {d.frontmatter.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
