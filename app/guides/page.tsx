import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/mdx";
import { guideSlugs, guides } from "@/lib/data";
import { mono, serif } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";

const SITE_URL = "https://10minutescafe.fr";

export const metadata: Metadata = {
  title: "Guides d'achat et d'entretien machines à café",
  description: "Comment choisir, régler et entretenir sa machine à café : nos guides pratiques, sans jargon.",
  alternates: { canonical: `${SITE_URL}/guides` },
};

const shell = { maxWidth: 1280, margin: "0 auto" } as const;

export default function GuidesIndexPage() {
  const posts = getAllBlogPosts();
  const demoGuides = guides.filter((g) => guideSlugs.includes(g.slug));
  // Dédoublonne : un guide démo dont le slug existe aussi en article de blog n'apparaît qu'une fois.
  const blogSlugs = new Set(posts.map((p) => p.slug));
  const demoUnique = demoGuides.filter((g) => !blogSlugs.has(g.slug));

  return (
    <div style={{ ...shell, padding: "28px 40px 90px" }}>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Guides" }]} />
      <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 46, color: "#241B17", margin: "16px 0 0" }}>
        Guides machines à café
      </h1>
      <p style={{ margin: "14px 0 0", fontSize: 17, color: "#45413E", maxWidth: "62ch", lineHeight: 1.6 }}>
        Choisir, régler, détartrer, calculer le coût réel d&apos;un café : les guides pratiques de la rédaction.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginTop: 36 }}>
        {demoUnique.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            style={{ display: "block", border: "1px solid #E8E1D6", borderRadius: 18, padding: 22, background: "#FCFBF8" }}
          >
            <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#B77945" }}>
              {g.cat}
            </div>
            <div style={{ fontFamily: serif, fontSize: 20, color: "#241B17", margin: "8px 0 0", lineHeight: 1.25 }}>{g.title}</div>
            <p style={{ margin: "10px 0 0", fontSize: 13, color: "#77716C" }}>{g.meta}</p>
          </Link>
        ))}
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            style={{ display: "block", border: "1px solid #E8E1D6", borderRadius: 18, padding: 22, background: "#FCFBF8" }}
          >
            <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#B77945" }}>
              Guide · {new Date(p.frontmatter.date).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
            </div>
            <div style={{ fontFamily: serif, fontSize: 20, color: "#241B17", margin: "8px 0 0", lineHeight: 1.25 }}>
              {p.frontmatter.title}
            </div>
            <p style={{ margin: "10px 0 0", fontSize: 14, color: "#45413E", lineHeight: 1.5 }}>{p.frontmatter.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
