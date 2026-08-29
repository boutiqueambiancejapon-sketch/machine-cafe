import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { testScores, testSlugs } from "@/lib/data";
import { num, barColor } from "@/lib/format";
import { mono, serif } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SpecsAccordion, FaqAccordion } from "@/components/test/SpecsAndFaq";
import { getAllTestMdx, getTestMdx } from "@/lib/mdx";
import { MdxArticleShell, mdxArticleJsonLd } from "@/components/mdx/MdxArticleShell";

const SITE_URL = "https://10minutescafe.fr";

// ─── Fiches test authored en MDX (data/products/*.json + <ProductRef>) ────
// Additif : ne touche pas au gabarit structuré existant (magnifica-evo).
// Un fichier content/tests/{slug}.mdx prend le pas sur le gabarit lib/data.ts
// pour ce même slug.

export function generateStaticParams() {
  const structured = testSlugs.map((slug) => ({ slug }));
  const mdxSlugs = getAllTestMdx().map((t) => ({ slug: t.slug }));
  const seen = new Set(structured.map((s) => s.slug));
  return [...structured, ...mdxSlugs.filter((m) => !seen.has(m.slug))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const mdxDoc = getTestMdx(slug);
  if (mdxDoc) {
    return {
      title: mdxDoc.frontmatter.title,
      description: mdxDoc.frontmatter.description,
      alternates: { canonical: `${SITE_URL}/tests/${slug}` },
    };
  }
  return {
    title: "De'Longhi Magnifica Evo : notre test complet",
    description:
      "Test complet de la De'Longhi Magnifica Evo : qualité en tasse, bruit du broyeur, entretien, coût à l'usage et verdict noté 9,1/10.",
  };
}

const kicker: CSSProperties = {
  fontFamily: mono,
  fontSize: 11,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#77716C",
};
const shell: CSSProperties = { maxWidth: 1280, margin: "0 auto" };

const thumbs = ["FACE", "PANNEAU", "BROYEUR", "DÉTAIL"];

export default async function TestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // ── Fiche test MDX (produit synchronisé data/products/) ──
  const mdxDoc = getTestMdx(slug);
  if (mdxDoc) {
    const canonicalUrl = `${SITE_URL}/tests/${slug}`;
    const breadcrumb = [
      { label: "Accueil", href: "/" },
      { label: "Avis", href: "/tests" },
      { label: mdxDoc.frontmatter.title, href: `/tests/${slug}` },
    ];
    const { articleSchema, personSchema, breadcrumbSchema, faqSchema } = mdxArticleJsonLd(
      mdxDoc.frontmatter,
      mdxDoc.content,
      canonicalUrl,
      breadcrumb,
    );
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        {breadcrumbSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        )}
        {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
        <MdxArticleShell
          frontmatter={mdxDoc.frontmatter}
          content={mdxDoc.content}
          breadcrumb={breadcrumb}
          kind="tests"
          slug={slug}
        />
      </>
    );
  }

  // ── Gabarit structuré existant (démo Magnifica Evo, données lib/data.ts) ──
  if (!testSlugs.includes(slug)) notFound();

  return (
    <div>
      <div style={{ ...shell, padding: "28px 40px 0" }}>
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Tests", href: "/tests" },
            { label: "De'Longhi", href: "/marques/delonghi" },
            { label: "Magnifica Evo" },
          ]}
        />
      </div>

      <section
        data-r="two"
        style={{ ...shell, padding: "28px 40px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}
      >
        <div style={{ position: "sticky", top: 96 }}>
          <div
            style={{
              aspectRatio: "1",
              borderRadius: 24,
              border: "1px solid #E8E1D6",
              background: "repeating-linear-gradient(135deg,#F7F3EC 0 14px,#F1EBE0 14px 28px)",
              display: "grid",
              placeItems: "center",
              fontFamily: mono,
              fontSize: 12,
              color: "#8C837A",
              textAlign: "center",
              lineHeight: 1.7,
            }}
          >
            PHOTO PRODUIT PRINCIPALE
            <br />
            fond clair · 3/4 · 1400×1400
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginTop: 12 }}>
            {thumbs.map((t) => (
              <div
                key={t}
                style={{
                  aspectRatio: "1",
                  borderRadius: 10,
                  border: "1px solid #E8E1D6",
                  background: "repeating-linear-gradient(135deg,#F7F3EC 0 8px,#F1EBE0 8px 16px)",
                  display: "grid",
                  placeItems: "center",
                  fontFamily: mono,
                  fontSize: 9,
                  color: "#8C837A",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ ...kicker }}>De&apos;Longhi · Machine à grains</div>
          <h1
            style={{
              fontFamily: serif,
              fontWeight: 400,
              fontSize: 46,
              lineHeight: 1.06,
              color: "#241B17",
              margin: "12px 0 0",
            }}
          >
            De&apos;Longhi Magnifica Evo : notre test complet
          </h1>
          <p style={{ margin: "16px 0 0", fontSize: 17, lineHeight: 1.6, color: "#45413E" }}>
            La Magnifica Evo reprend la recette qui a fait le succès de la gamme : un broyeur correct, une prise en
            main immédiate et un entretien qui ne demande pas de rituel. Elle ne cherche pas l&apos;excellence en
            tasse, elle cherche la régularité.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 22,
              fontSize: 13,
              color: "#77716C",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  background: "repeating-linear-gradient(135deg,#F7F3EC 0 6px,#F1EBE0 6px 12px)",
                  border: "1px solid #E8E1D6",
                }}
              />
              <span>
                Par <a href="#" style={{ fontWeight: 600 }}>Camille Rousset</a>, rédactrice café
              </span>
            </div>
            <span>·</span>
            <span>Mis à jour le 28 août 2026</span>
            <span>·</span>
            <span>14 min de lecture</span>
          </div>

          <div
            style={{
              border: "1px solid #E8E1D6",
              borderRadius: 20,
              padding: 26,
              marginTop: 28,
              background: "#F7F3EC",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
              <div>
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "#B77945",
                  }}
                >
                  Notre avis
                </div>
                <div
                  style={{ fontSize: 16, fontWeight: 700, color: "#241B17", marginTop: 8, lineHeight: 1.45, maxWidth: "40ch" }}
                >
                  Une excellente première machine à grains, à condition d&apos;accepter un peu de bruit.
                </div>
              </div>
              <div style={{ textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontFamily: serif, fontSize: 56, lineHeight: 0.9, color: "#241B17" }}>9,1</div>
                <div style={{ fontFamily: mono, fontSize: 10, color: "#77716C", marginTop: 4 }}>/ 10</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 22 }}>
              {testScores.map((s) => (
                <div
                  key={s.label}
                  style={{ display: "grid", gridTemplateColumns: "150px 1fr 42px", alignItems: "center", gap: 14 }}
                >
                  <div style={{ fontSize: 13.5, color: "#45413E" }}>{s.label}</div>
                  <div style={{ height: 7, borderRadius: 999, background: "#E4DCCF", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 999,
                        transition: "width .8s cubic-bezier(.2,.7,.3,1)",
                        width: s.v * 10 + "%",
                        background: barColor(s.v),
                      }}
                    />
                  </div>
                  <div
                    style={{ fontFamily: mono, fontSize: 13, fontWeight: 500, color: "#241B17", textAlign: "right" }}
                  >
                    {num(s.v)}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #E4DCCF" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ fontSize: 12.5, color: "#77716C" }}>Prix indicatif · constaté le 26/08/2026</div>
                  <div style={{ fontFamily: serif, fontSize: 32, color: "#241B17", lineHeight: 1.1 }}>449 €</div>
                  <div style={{ fontSize: 12, color: "#8C837A" }}>Les prix peuvent évoluer.</div>
                </div>
                <a
                  href="#"
                  className="h-amazon-solid"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "#B77945",
                    color: "#FCFBF8",
                    borderRadius: 12,
                    padding: "15px 24px",
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  Voir le prix sur Amazon <span>→</span>
                </a>
              </div>
              <div style={{ fontSize: 12, color: "#8C837A", marginTop: 10 }}>
                (lien affilié) Notre avis est indépendant. Le site peut percevoir une commission si vous achetez via
                certains liens. <a href="#" style={{ color: "#B77945" }}>En savoir plus sur notre financement</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-r="sider"
        style={{ ...shell, padding: "0 40px 90px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 56, alignItems: "start" }}
      >
        <div>
          <div style={{ border: "1px solid #E8E1D6", borderRadius: 20, padding: 34 }}>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 34, color: "#241B17", margin: 0 }}>
              Notre verdict
            </h2>
            <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.7, color: "#45413E" }}>
              La Magnifica Evo occupe une place précise : celle de la machine à grains qu&apos;on offre à quelqu&apos;un
              qui n&apos;a jamais eu de machine à grains. L&apos;interface se limite à six boutons, le broyeur propose
              treize réglages qu&apos;on peut ignorer sans conséquence, et le groupe d&apos;infusion s&apos;extrait en
              dix secondes pour un rinçage sous le robinet. En tasse, l&apos;espresso est régulier, correctement
              chaud, avec une crema honnête sans être remarquable. Les amateurs exigeants trouveront le corps un peu
              court sur des grains de spécialité clairs.
            </p>
            <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.7, color: "#45413E" }}>
              Le principal reproche porte sur le bruit du broyeur, nettement audible dans une cuisine ouverte le
              matin. Le second concerne le mousseur manuel : il fonctionne, mais demande un geste que tout le monde
              n&apos;a pas envie d&apos;apprendre.
            </p>

            <div data-r="two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 30 }}>
              <div style={{ background: "#F4F7F5", border: "1px solid #DCE7E0", borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#3E6B55", letterSpacing: ".02em" }}>On aime</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 12 }}>
                  {[
                    "Espresso régulier tasse après tasse",
                    "Prise en main immédiate",
                    "Groupe d'infusion amovible",
                    "Encombrement contenu (24 cm de large)",
                  ].map((t) => (
                    <div key={t} style={{ fontSize: 14, color: "#45413E", display: "flex", gap: 9 }}>
                      <span style={{ color: "#3E6B55" }}>✓</span>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "#F9F5F2", border: "1px solid #E8E1D6", borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#8A4B3A" }}>On aime moins</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 12 }}>
                  {[
                    "Broyeur audible le matin",
                    "Mousseur manuel, pas automatique",
                    "Réservoir de 1,8 L un peu juste à 4",
                  ].map((t) => (
                    <div key={t} style={{ fontSize: 14, color: "#45413E", display: "flex", gap: 9 }}>
                      <span style={{ color: "#8A4B3A" }}>×</span>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div data-r="two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#241B17" }}>Elle est faite pour vous si…</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 11 }}>
                  {["vous passez des capsules aux grains", "vous buvez 2 à 5 cafés par jour", "vous voulez un entretien simple"].map(
                    (t) => (
                      <div key={t} style={{ fontSize: 14, color: "#45413E", display: "flex", gap: 9 }}>
                        <span style={{ color: "#3E6B55" }}>✓</span>
                        {t}
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#241B17" }}>Elle n&apos;est pas faite pour vous si…</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 11 }}>
                  {["vous cherchez le silence absolu", "vous voulez des lattes d'une pression", "vous réglez chaque paramètre à la main"].map(
                    (t) => (
                      <div key={t} style={{ fontSize: 14, color: "#45413E", display: "flex", gap: 9 }}>
                        <span style={{ color: "#77716C" }}>×</span>
                        {t}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            <a
              href="#"
              className="h-amazon-solid"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginTop: 28,
                background: "#B77945",
                color: "#FCFBF8",
                borderRadius: 12,
                padding: "14px 22px",
                fontSize: 14.5,
                fontWeight: 700,
              }}
            >
              Voir le prix sur Amazon →
            </a>
          </div>

          <div style={{ border: "1px solid #E8E1D6", borderRadius: 20, padding: 34, marginTop: 24 }}>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 30, color: "#241B17", margin: 0 }}>
              Combien coûte réellement un café avec cette machine ?
            </h2>
            <p style={{ margin: "10px 0 0", fontSize: 14.5, color: "#77716C" }}>
              Estimation sur 3 ans, 3 cafés par jour. Valeurs de démonstration à brancher sur des données réelles.
            </p>
            <div data-r="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 22 }}>
              {[
                { label: "Cette machine (grains)", value: "0,22 €", tint: true },
                { label: "Capsules classiques", value: "0,41 €", tint: false },
                { label: "Café de bureau / bar", value: "1,60 €", tint: false },
              ].map((c) => (
                <div
                  key={c.label}
                  style={{
                    border: "1px solid #E8E1D6",
                    borderRadius: 14,
                    padding: 18,
                    background: c.tint ? "#F7F3EC" : undefined,
                  }}
                >
                  <div style={{ fontSize: 13, color: "#77716C" }}>{c.label}</div>
                  <div style={{ fontFamily: serif, fontSize: 34, color: "#241B17", lineHeight: 1.1, marginTop: 6 }}>
                    {c.value}
                  </div>
                  <div style={{ fontSize: 12.5, color: "#77716C" }}>par café</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12.5, color: "#8C837A", marginTop: 14 }}>
              Inclut le prix de la machine amorti, le café, le détartrant et les filtres. Hors électricité.
            </div>
          </div>

          <SpecsAccordion />
          <FaqAccordion />
        </div>

        <aside style={{ position: "sticky", top: 96, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ border: "1px solid #E8E1D6", borderRadius: 16, padding: 20 }}>
            <div
              style={{
                fontFamily: mono,
                fontSize: 10.5,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#77716C",
              }}
            >
              Sommaire
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 14 }}>
              {["Notre verdict", "Coût à l'usage", "Caractéristiques", "Questions fréquentes"].map((t) => (
                <a key={t} href="#" className="h-slide" style={{ fontSize: 13.5, color: "#45413E" }}>
                  {t}
                </a>
              ))}
            </div>
          </div>

          <div style={{ border: "1px solid #E8E1D6", borderRadius: 16, padding: 20 }}>
            <div
              style={{
                fontFamily: mono,
                fontSize: 10.5,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#77716C",
              }}
            >
              Cette machine face à…
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
              {["Philips 5400 LatteGo →", "Krups Evidence ECO →", "Melitta Barista Smart →"].map((t) => (
                <Link
                  key={t}
                  href="/comparatifs"
                  className="h-chip-lift"
                  style={{
                    textAlign: "left",
                    background: "#F7F3EC",
                    border: "1px solid #E8E1D6",
                    borderRadius: 11,
                    padding: 12,
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "#241B17",
                  }}
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ border: "1px solid #E8E1D6", borderRadius: 16, padding: 20, background: "#F7F3EC" }}>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: "#241B17", lineHeight: 1.4 }}>
              Elle dépasse votre budget ?
            </div>
            <p style={{ margin: "8px 0 0", fontSize: 13.5, color: "#77716C", lineHeight: 1.55 }}>
              La Philips 2200 fait le même café pour 150 € de moins, sans écran ni réglages.
            </p>
            <Link
              href="/comparateur"
              className="h-tlink-amber"
              style={{
                display: "inline-block",
                marginTop: 12,
                background: "none",
                border: "none",
                padding: 0,
                fontSize: 13.5,
                fontWeight: 700,
                color: "#B77945",
              }}
            >
              Voir l&apos;alternative →
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
