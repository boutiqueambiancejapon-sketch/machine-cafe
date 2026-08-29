import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { products, categorieSlugs } from "@/lib/data";
import { euro, num } from "@/lib/format";
import { mono, serif } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";

export function generateStaticParams() {
  return categorieSlugs.map((slug) => ({ slug }));
}

export function generateMetadata(): Metadata {
  return {
    title: "Les meilleures machines à café à grains en 2026",
    description:
      "Notre classement des machines à café à grains : huit modèles recommandés selon le budget et l'usage, avec ce qui les distingue réellement.",
  };
}

const shell: CSSProperties = { maxWidth: 1280, margin: "0 auto" };

const chipsFilters = ["Moins de 400 €", "Avec mousseur automatique", "Compactes", "Silencieuses", "Pour famille"];

export default async function CategoriePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!categorieSlugs.includes(slug)) notFound();

  const ranked = products.slice(0, 6).map((p, i) => ({
    ...p,
    rank: String(i + 1).padStart(2, "0"),
    summary: `Idéale pour ${p.idealFor}. ${p.pros[0]}, ${p.pros[1].toLowerCase()}. ${p.con} reste son principal compromis.`,
  }));

  return (
    <div>
      <div style={{ background: "#F7F3EC", borderBottom: "1px solid #E8E1D6" }}>
        <div style={{ ...shell, padding: "28px 40px 56px" }}>
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Machines à café", href: "/machines/a-grains" },
              { label: "À grains" },
            ]}
          />
          <h1
            style={{
              fontFamily: serif,
              fontWeight: 400,
              fontSize: 56,
              lineHeight: 1.03,
              color: "#241B17",
              margin: "18px 0 0",
              maxWidth: "18ch",
            }}
          >
            Les meilleures machines à café à grains en 2026
          </h1>
          <p style={{ margin: "16px 0 0", fontSize: 17.5, lineHeight: 1.6, color: "#45413E", maxWidth: "70ch" }}>
            Une machine à grains moud le café juste avant l&apos;extraction, ce qui change surtout deux choses : le
            goût en tasse et le coût par café. Voici les huit modèles que nous recommandons selon le budget et
            l&apos;usage, avec ce qui les distingue réellement.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 26, flexWrap: "wrap" }}>
            {chipsFilters.map((c) => (
              <Link
                key={c}
                href="/comparateur"
                className="h-chip"
                style={{
                  border: "1px solid #DCD3C6",
                  borderRadius: 999,
                  padding: "9px 15px",
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "#241B17",
                  background: "#FCFBF8",
                }}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        data-r="sider"
        style={{ ...shell, padding: "56px 40px 90px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 56, alignItems: "start" }}
      >
        <div>
          <div
            style={{
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "#77716C",
            }}
          >
            Notre classement
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 20 }}>
            {ranked.map((p) => (
              <article
                key={p.id}
                style={{
                  border: "1px solid #E8E1D6",
                  borderRadius: 18,
                  padding: 24,
                  background: "#FCFBF8",
                  display: "grid",
                  gridTemplateColumns: "52px 1fr",
                  gap: 20,
                }}
              >
                <div style={{ fontFamily: serif, fontSize: 40, color: "#DCD3C6", lineHeight: 1 }}>{p.rank}</div>
                <div>
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 10.5,
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: "#B77945",
                    }}
                  >
                    {p.badge}
                  </div>
                  <h2 style={{ fontSize: 23, fontWeight: 700, color: "#241B17", margin: "6px 0 0" }}>
                    {p.brand} {p.model}
                  </h2>
                  <div
                    data-r="two"
                    style={{ display: "grid", gridTemplateColumns: "170px 1fr", gap: 22, marginTop: 16 }}
                  >
                    <div
                      style={{
                        aspectRatio: "1",
                        borderRadius: 12,
                        background: "repeating-linear-gradient(135deg,#F7F3EC 0 10px,#F1EBE0 10px 20px)",
                        display: "grid",
                        placeItems: "center",
                        fontFamily: mono,
                        fontSize: 10,
                        color: "#8C837A",
                      }}
                    >
                      PHOTO
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#45413E" }}>{p.summary}</p>
                      <div style={{ display: "flex", gap: 26, marginTop: 14, flexWrap: "wrap" }}>
                        <div>
                          <div style={{ fontSize: 12.5, color: "#77716C", marginBottom: 5 }}>Points forts</div>
                          {p.pros.map((pro) => (
                            <div key={pro} style={{ fontSize: 13.5, color: "#45413E", display: "flex", gap: 8 }}>
                              <span style={{ color: "#3E6B55" }}>✓</span>
                              {pro}
                            </div>
                          ))}
                        </div>
                        <div>
                          <div style={{ fontSize: 12.5, color: "#77716C", marginBottom: 5 }}>Point faible</div>
                          <div style={{ fontSize: 13.5, color: "#45413E", display: "flex", gap: 8 }}>
                            <span style={{ color: "#77716C" }}>×</span>
                            {p.con}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 18, flexWrap: "wrap" }}>
                        <div style={{ fontFamily: serif, fontSize: 28, color: "#241B17" }}>
                          {num(p.score)}
                          <span style={{ fontSize: 14, color: "#77716C" }}> / 10</span>
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#241B17" }}>{euro(p.price)}</div>
                        <Link
                          href="/tests/magnifica-evo"
                          className="h-dark"
                          style={{
                            background: "#241B17",
                            color: "#F7F3EC",
                            border: "none",
                            borderRadius: 10,
                            padding: "11px 16px",
                            fontSize: 13.5,
                            fontWeight: 700,
                          }}
                        >
                          Lire le test complet
                        </Link>
                        <a
                          href="#"
                          className="h-amazon"
                          style={{
                            border: "1px solid #B77945",
                            color: "#B77945",
                            borderRadius: 10,
                            padding: "10px 16px",
                            fontSize: 13.5,
                            fontWeight: 700,
                          }}
                        >
                          Voir sur Amazon →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 48 }}>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 34, color: "#241B17", margin: 0 }}>
              Comment choisir sa machine à grains
            </h2>
            <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.7, color: "#45413E" }}>
              Trois paramètres décident presque tout : le type de broyeur, la gestion du lait et la facilité de
              nettoyage. Le reste — nombre de recettes, écran couleur, application mobile — pèse beaucoup moins dans
              l&apos;usage quotidien qu&apos;on ne l&apos;imagine au moment de l&apos;achat.
            </p>
            <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.7, color: "#45413E" }}>
              Un broyeur en acier suffit largement pour un usage domestique. La céramique chauffe moins et dure plus
              longtemps, mais la différence en tasse reste discrète sur des grains torréfiés pour espresso. En
              revanche, le passage d&apos;un mousseur manuel à un système lait automatique change concrètement le
              quotidien de ceux qui boivent un cappuccino chaque matin.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
              {["Guide : grains ou capsules ?", "Guide : détartrer sa machine"].map((t) => (
                <Link
                  key={t}
                  href="/guides/grains-ou-capsules"
                  className="h-chip"
                  style={{
                    border: "1px solid #E8E1D6",
                    borderRadius: 11,
                    padding: "12px 18px",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#241B17",
                    background: "none",
                  }}
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <aside style={{ position: "sticky", top: 96, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ border: "1px solid #E8E1D6", borderRadius: 16, padding: 20, background: "#F7F3EC" }}>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: "#241B17" }}>Vous préférez filtrer vous-même ?</div>
            <p style={{ margin: "8px 0 0", fontSize: 13.5, color: "#77716C", lineHeight: 1.55 }}>
              Le comparateur donne accès aux 64 machines suivies, avec tous les critères.
            </p>
            <Link
              href="/comparateur"
              className="h-dark"
              style={{
                display: "inline-block",
                marginTop: 12,
                background: "#241B17",
                color: "#F7F3EC",
                border: "none",
                borderRadius: 10,
                padding: "11px 16px",
                fontSize: 13.5,
                fontWeight: 700,
              }}
            >
              Ouvrir le comparateur →
            </Link>
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
              Comparatifs associés
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
              {["De'Longhi vs Philips →", "Grains vs capsules →", "Jura vs De'Longhi →"].map((t) => (
                <Link
                  key={t}
                  href="/comparatifs/delonghi-vs-philips"
                  className="h-slide"
                  style={{
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "#45413E",
                  }}
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
