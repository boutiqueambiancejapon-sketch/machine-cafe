import type { Metadata } from "next";
import Link from "next/link";
import { getAllTestMdx } from "@/lib/mdx";
import { testSlugs } from "@/lib/data";
import { mono, serif } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";

const SITE_URL = "https://10minutescafe.fr";

export const metadata: Metadata = {
  title: "Tous nos tests et avis machines à café",
  description:
    "Nos tests de machines à café en conditions réelles : qualité en tasse, bruit du broyeur, entretien, coût à l'usage et verdict noté.",
  alternates: { canonical: `${SITE_URL}/tests` },
};

const shell = { maxWidth: 1280, margin: "0 auto" } as const;

// Fiche démo encore pilotée par lib/data.ts (pas de content/tests/*.mdx).
const DEMO_TESTS: Record<string, { title: string; description: string }> = {
  "magnifica-evo": {
    title: "De'Longhi Magnifica Evo : notre test complet",
    description: "Qualité en tasse, bruit du broyeur, entretien, coût à l'usage. Verdict 9,1/10.",
  },
};

export default function TestsIndexPage() {
  const mdx = getAllTestMdx();
  const mdxSlugs = new Set(mdx.map((d) => d.slug));

  const cards = [
    ...mdx.map((d) => ({ slug: d.slug, title: d.frontmatter.title, description: d.frontmatter.description, date: d.frontmatter.date })),
    ...testSlugs
      .filter((s) => !mdxSlugs.has(s) && DEMO_TESTS[s])
      .map((s) => ({ slug: s, title: DEMO_TESTS[s].title, description: DEMO_TESTS[s].description, date: "" })),
  ];

  return (
    <div style={{ ...shell, padding: "28px 40px 90px" }}>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Tests" }]} />
      <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 46, color: "#241B17", margin: "16px 0 0" }}>
        Nos tests et avis
      </h1>
      <p style={{ margin: "14px 0 0", fontSize: 17, color: "#45413E", maxWidth: "62ch", lineHeight: 1.6 }}>
        Chaque machine passe la même routine : quinze jours d&apos;usage, bruit mesuré au sonomètre, extraction relevée au
        réfractomètre, coût par tasse calculé. Un verdict noté, au moins un défaut cité.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginTop: 36 }}>
        {cards.map((c) => (
          <Link
            key={c.slug}
            href={`/tests/${c.slug}`}
            style={{ display: "block", border: "1px solid #E8E1D6", borderRadius: 18, padding: 22, background: "#FCFBF8" }}
          >
            <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#B77945" }}>
              Avis {c.date && `· ${new Date(c.date).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}`}
            </div>
            <div style={{ fontFamily: serif, fontSize: 20, color: "#241B17", margin: "8px 0 0", lineHeight: 1.25 }}>{c.title}</div>
            <p style={{ margin: "10px 0 0", fontSize: 14, color: "#45413E", lineHeight: 1.5 }}>{c.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
