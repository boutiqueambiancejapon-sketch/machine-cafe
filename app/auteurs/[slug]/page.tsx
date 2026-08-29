import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AUTHORS } from "@/data/authors";
import { getAllContentDocs, KIND_HREF, type ContentKind } from "@/lib/mdx";
import { mono, serif } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";

const SITE_URL = "https://10minutescafe.fr";
const KIND_LABEL: Record<ContentKind, string> = { blog: "Article", comparatifs: "Comparatif", tests: "Avis" };

export function generateStaticParams() {
  return Object.keys(AUTHORS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = AUTHORS[slug];
  if (!a) return {};
  return {
    title: `${a.name} — ${a.jobTitle}`,
    description: a.bio.slice(0, 155),
    alternates: { canonical: `${SITE_URL}/auteurs/${slug}` },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = AUTHORS[slug];
  if (!author) notFound();

  const articles = getAllContentDocs()
    .filter((d) => (d.frontmatter.author ?? "camille") === slug)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.jobTitle,
    url: `${SITE_URL}/auteurs/${slug}`,
    description: author.bio,
    ...(author.sameAs.length ? { sameAs: author.sameAs } : {}),
  };

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 40px 90px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Auteurs" }, { label: author.name }]} />

      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 20, marginTop: 24, flexWrap: "wrap", alignItems: "center" }}>
          <span
            aria-hidden
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#241B17",
              color: "#F7F3EC",
              display: "grid",
              placeItems: "center",
              fontSize: 26,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {author.name.charAt(0)}
          </span>
          <div>
            <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 36, color: "#241B17", margin: 0 }}>{author.name}</h1>
            <div style={{ fontSize: 14, color: "#77716C" }}>{author.jobTitle}</div>
          </div>
        </div>

        <p style={{ margin: "20px 0 0", fontSize: 16, lineHeight: 1.7, color: "#45413E" }}>{author.bio}</p>

        <div style={{ marginTop: 24 }}>
          <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: "#77716C" }}>
            Ce que je mesure
          </div>
          <ul style={{ margin: "10px 0 0", paddingLeft: 18, fontSize: 14.5, lineHeight: 1.7, color: "#45413E" }}>
            {author.expertise.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>

        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 28, color: "#241B17", margin: "40px 0 0" }}>
          Articles de {author.name.split(" ")[0]}
        </h2>
        {articles.length === 0 ? (
          <p style={{ marginTop: 12, fontSize: 14, color: "#77716C" }}>Aucun article publié pour le moment.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
            {articles.map((d) => (
              <Link
                key={`${d.kind}-${d.slug}`}
                href={`${KIND_HREF[d.kind]}/${d.slug}`}
                style={{ border: "1px solid #E8E1D6", borderRadius: 14, padding: 16, background: "#FCFBF8" }}
              >
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "#B77945" }}>
                  {KIND_LABEL[d.kind]} · {new Date(d.frontmatter.date).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                </div>
                <div style={{ fontFamily: serif, fontSize: 18, color: "#241B17", marginTop: 4, lineHeight: 1.3 }}>
                  {d.frontmatter.title}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
