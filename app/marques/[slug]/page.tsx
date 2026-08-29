import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { brandPicks, marqueSlugs } from "@/lib/data";
import { mono, serif } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";

export function generateStaticParams() {
  return marqueSlugs.map((slug) => ({ slug }));
}

export function generateMetadata(): Metadata {
  return {
    title: "Machines à café De'Longhi",
    description:
      "Le guide des machines à café De'Longhi : gammes Dedica, Magnifica, Eletta et PrimaDonna, prix, meilleures références et laquelle choisir.",
  };
}

const shell: CSSProperties = { maxWidth: 1280, margin: "0 auto" };

const ranges: [string, string][] = [
  ["Dedica", "Expresso à porte-filtre, très compact, 120–250 €"],
  ["Magnifica", "Machines à grains grand public, 350–600 €"],
  ["Eletta", "Système lait automatique, 700–1 000 €"],
  ["PrimaDonna", "Haut de gamme connecté, 1 100–1 600 €"],
];

export default async function MarquePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!marqueSlugs.includes(slug)) notFound();

  return (
    <div>
      <div style={{ background: "#241B17", color: "#F7F3EC" }}>
        <div style={{ ...shell, padding: "28px 40px 64px" }}>
          <Breadcrumb
            dark
            items={[
              { label: "Accueil", href: "/" },
              { label: "Marques", href: "/marques/delonghi" },
              { label: "De'Longhi" },
            ]}
          />
          <div
            data-r="two"
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr .8fr",
              gap: 56,
              marginTop: 32,
              alignItems: "center",
            }}
          >
            <div>
              <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 56, lineHeight: 1.03, margin: 0 }}>
                Machines à café De&apos;Longhi
              </h1>
              <p style={{ margin: "18px 0 0", fontSize: 17, lineHeight: 1.65, color: "#C9BDB1", maxWidth: "60ch" }}>
                Le constructeur italien couvre à peu près tout le marché domestique, de l&apos;expresso à 120 € à la
                machine à grains connectée à 1 400 €. Sa force : une gamme lisible, des pièces détachées faciles à
                trouver et un rapport prix/prestations rarement pris en défaut sous 600 €.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  marginTop: 32,
                  paddingTop: 24,
                  borderTop: "1px solid #3B2C24",
                }}
              >
                {[
                  ["18", "modèles suivis"],
                  ["9,1", "meilleure note"],
                  ["119 €", "entrée de gamme"],
                ].map(([n, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: serif, fontSize: 30 }}>{n}</div>
                    <div style={{ fontSize: 12.5, color: "#9A8E84" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                aspectRatio: "4 / 3",
                borderRadius: 20,
                background: "repeating-linear-gradient(135deg,#33251E 0 12px,#2C2019 12px 24px)",
                display: "grid",
                placeItems: "center",
                fontFamily: mono,
                fontSize: 11,
                color: "#8E8177",
                textAlign: "center",
                lineHeight: 1.7,
              }}
            >
              VISUEL MARQUE
              <br />
              gamme sur fond sombre
            </div>
          </div>
        </div>
      </div>

      <div style={{ ...shell, padding: "64px 40px 90px" }}>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 38, color: "#241B17", margin: 0 }}>
          Les meilleures De&apos;Longhi
        </h2>
        <div
          data-r="grid3"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 26 }}
        >
          {brandPicks.map((p) => (
            <article
              key={p.model}
              className="h-card"
              style={{
                border: "1px solid #E8E1D6",
                borderRadius: 16,
                background: "#FCFBF8",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  aspectRatio: "4 / 3",
                  background: "repeating-linear-gradient(135deg,#F7F3EC 0 12px,#F1EBE0 12px 24px)",
                  display: "grid",
                  placeItems: "center",
                  fontFamily: mono,
                  fontSize: 11,
                  color: "#8C837A",
                }}
              >
                PHOTO PRODUIT
              </div>
              <div style={{ padding: 20 }}>
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
                <h3 style={{ fontSize: 19, fontWeight: 700, color: "#241B17", margin: "6px 0 0" }}>{p.model}</h3>
                <p style={{ margin: "10px 0 0", fontSize: 14, color: "#45413E", lineHeight: 1.55 }}>
                  Idéale pour {p.idealFor}.
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
                  <div style={{ fontFamily: serif, fontSize: 26, color: "#241B17" }}>{p.scoreText}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#241B17" }}>{p.priceText}</div>
                </div>
                <Link
                  href="/tests/magnifica-evo"
                  className="h-dark"
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                    marginTop: 14,
                    background: "#241B17",
                    color: "#F7F3EC",
                    border: "none",
                    borderRadius: 10,
                    padding: 12,
                    fontSize: 13.5,
                    fontWeight: 700,
                  }}
                >
                  Voir le test
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div data-r="two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 56 }}>
          <div>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 32, color: "#241B17", margin: 0 }}>
              Quelle De&apos;Longhi choisir ?
            </h2>
            <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.7, color: "#45413E" }}>
              La gamme se lit en trois étages. Dedica et Stilosa couvrent l&apos;expresso avec porte-filtre pour ceux
              qui acceptent de doser eux-mêmes. Magnifica est le cœur du catalogue : machine à grains, entretien
              simple, entre 350 et 600 €. Eletta et PrimaDonna ajoutent le système lait automatique, l&apos;écran et
              les profils utilisateurs, au-delà de 800 €.
            </p>
            <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.7, color: "#45413E" }}>
              Passer de Magnifica à Eletta n&apos;améliore pas l&apos;espresso. Cela améliore le cappuccino et le
              confort. C&apos;est la seule question à se poser avant de payer 300 € de plus.
            </p>
          </div>
          <div style={{ border: "1px solid #E8E1D6", borderRadius: 18, padding: 26, background: "#F7F3EC" }}>
            <div
              style={{
                fontFamily: mono,
                fontSize: 11,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#77716C",
              }}
            >
              Les gammes
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
              {ranges.map(([name, desc], i) => (
                <div
                  key={name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr",
                    gap: 16,
                    fontSize: 14,
                    paddingTop: i === 0 ? 0 : 14,
                    borderTop: i === 0 ? "none" : "1px solid #E4DCCF",
                  }}
                >
                  <div style={{ fontWeight: 700, color: "#241B17" }}>{name}</div>
                  <div style={{ color: "#45413E" }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
