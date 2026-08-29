import type { Metadata } from "next";
import Link from "next/link";
import { getAllComparatifMdx } from "@/lib/mdx";
import { versusSlugs } from "@/lib/data";
import { mono, serif } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";

const SITE_URL = "https://10minutescafe.fr";

export const metadata: Metadata = {
  title: "Comparatifs machines à café : les face-à-face",
  description: "Nos comparatifs machine par machine : mêmes critères, mêmes mesures, un verdict par profil d'usage.",
  alternates: { canonical: `${SITE_URL}/comparatifs` },
};

const shell = { maxWidth: 1280, margin: "0 auto" } as const;

const DEMO: Record<string, { title: string; description: string }> = {
  "delonghi-vs-philips": {
    title: "De'Longhi vs Philips : quelle machine à grains choisir ?",
    description: "Magnifica Evo contre 5400 LatteGo : broyeur, système lait, bruit, prix.",
  },
};

export default function ComparatifsIndexPage() {
  const mdx = getAllComparatifMdx();
  const seen = new Set(mdx.map((d) => d.slug));
  const cards = [
    ...mdx.map((d) => ({ slug: d.slug, title: d.frontmatter.title, description: d.frontmatter.description, date: d.frontmatter.date })),
    ...versusSlugs.filter((s) => !seen.has(s) && DEMO[s]).map((s) => ({ slug: s, title: DEMO[s].title, description: DEMO[s].description, date: "" })),
  ];

  return (
    <div style={{ ...shell, padding: "28px 40px 90px" }}>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Comparatifs" }]} />
      <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 46, color: "#241B17", margin: "16px 0 0" }}>
        Nos comparatifs
      </h1>
      <p style={{ margin: "14px 0 0", fontSize: 17, color: "#45413E", maxWidth: "62ch", lineHeight: 1.6 }}>
        Deux machines, les mêmes critères, un verdict par profil. Pour filtrer toi-même sur tous les modèles, ouvre le{" "}
        <Link href="/comparateur" style={{ color: "#B77945", fontWeight: 700 }}>
          comparateur
        </Link>
        .
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginTop: 36 }}>
        {cards.map((c) => (
          <Link
            key={c.slug}
            href={`/comparatifs/${c.slug}`}
            style={{ display: "block", border: "1px solid #E8E1D6", borderRadius: 18, padding: 22, background: "#FCFBF8" }}
          >
            <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#B77945" }}>
              Comparatif {c.date && `· ${new Date(c.date).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}`}
            </div>
            <div style={{ fontFamily: serif, fontSize: 20, color: "#241B17", margin: "8px 0 0", lineHeight: 1.25 }}>{c.title}</div>
            <p style={{ margin: "10px 0 0", fontSize: 14, color: "#45413E", lineHeight: 1.5 }}>{c.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
