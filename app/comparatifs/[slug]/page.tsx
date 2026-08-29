import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { versusRows, versusSlugs } from "@/lib/data";
import { mono, serif } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";

export function generateStaticParams() {
  return versusSlugs.map((slug) => ({ slug }));
}

export function generateMetadata(): Metadata {
  return {
    title: "De'Longhi vs Philips : quelle machine choisir ?",
    description:
      "Magnifica Evo contre 5400 LatteGo : broyeur, système lait, bruit, prix. Le face-à-face complet pour trancher entre les deux machines à grains.",
  };
}

const shell: CSSProperties = { maxWidth: 1280, margin: "0 auto" };
const cell: CSSProperties = { gridTemplateColumns: "1.1fr 1fr 1fr" };

export default async function VersusPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!versusSlugs.includes(slug)) notFound();

  return (
    <div style={{ ...shell, padding: "28px 40px 90px" }}>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Comparatif", href: "/comparateur" },
          { label: "De'Longhi vs Philips" },
        ]}
      />
      <h1
        style={{
          fontFamily: serif,
          fontWeight: 400,
          fontSize: 52,
          lineHeight: 1.05,
          color: "#241B17",
          margin: "18px 0 0",
          maxWidth: "20ch",
        }}
      >
        De&apos;Longhi vs Philips : quelle machine choisir ?
      </h1>
      <p style={{ margin: "14px 0 0", fontSize: 17, color: "#45413E", maxWidth: "66ch" }}>
        Deux machines à grains de milieu de gamme, deux philosophies : la simplicité mécanique chez De&apos;Longhi,
        l&apos;automatisation du lait chez Philips. Voici ce qui les sépare vraiment.
      </p>

      <div data-r="two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 36 }}>
        {[
          { brand: "De'Longhi", model: "Magnifica Evo", score: "9,1", price: "449 € · lien affilié" },
          { brand: "Philips", model: "5400 LatteGo", score: "8,9", price: "629 € · lien affilié" },
        ].map((c) => (
          <div
            key={c.model}
            style={{ border: "1px solid #E8E1D6", borderRadius: 20, padding: 26, background: "#FCFBF8" }}
          >
            <div
              style={{
                aspectRatio: "16 / 10",
                borderRadius: 14,
                background: "repeating-linear-gradient(135deg,#F7F3EC 0 12px,#F1EBE0 12px 24px)",
                display: "grid",
                placeItems: "center",
                fontFamily: mono,
                fontSize: 11,
                color: "#8C837A",
              }}
            >
              PHOTO · {c.brand}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 18 }}>
              <div>
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 10.5,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#77716C",
                  }}
                >
                  {c.brand}
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#241B17", marginTop: 3 }}>{c.model}</div>
              </div>
              <div style={{ fontFamily: serif, fontSize: 36, color: "#241B17" }}>{c.score}</div>
            </div>
            <div style={{ fontSize: 15, color: "#45413E", marginTop: 10 }}>{c.price}</div>
          </div>
        ))}
      </div>

      <div style={{ border: "1px solid #E8E1D6", borderRadius: 20, overflow: "hidden", marginTop: 24 }}>
        <div
          style={{
            display: "grid",
            ...cell,
            position: "sticky",
            top: 72,
            background: "#241B17",
            color: "#F7F3EC",
            zIndex: 20,
          }}
        >
          <div
            style={{
              padding: "16px 22px",
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: ".1em",
              textTransform: "uppercase",
            }}
          >
            Critère
          </div>
          <div style={{ padding: "16px 22px", fontSize: 14, fontWeight: 700 }}>Magnifica Evo</div>
          <div style={{ padding: "16px 22px", fontSize: 14, fontWeight: 700 }}>5400 LatteGo</div>
        </div>
        {versusRows.map(([k, a, b, winner]) => (
          <div
            key={k}
            className="h-vrow"
            style={{ display: "grid", ...cell, borderTop: "1px solid #EDE6DA" }}
          >
            <div style={{ padding: "14px 22px", fontSize: 14, color: "#77716C" }}>{k}</div>
            <div
              style={{
                padding: "14px 22px",
                fontSize: 14.5,
                color: winner === 1 ? "#3E6B55" : "#241B17",
                fontWeight: winner === 1 ? 700 : 500,
              }}
            >
              {a}
            </div>
            <div
              style={{
                padding: "14px 22px",
                fontSize: 14.5,
                color: winner === 2 ? "#3E6B55" : "#241B17",
                fontWeight: winner === 2 ? 700 : 500,
              }}
            >
              {b}
            </div>
          </div>
        ))}
      </div>

      <div data-r="two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 36 }}>
        {[
          {
            title: "Choisissez la De'Longhi si…",
            points: [
              "vous buvez surtout des espressos et des cafés longs",
              "vous voulez dépenser moins de 500 €",
              "l'entretien manuel ne vous dérange pas",
            ],
            cta: "Choisir la Magnifica Evo →",
          },
          {
            title: "Choisissez la Philips si…",
            points: [
              "vous buvez des cappuccinos tous les jours",
              "vous voulez un système lait qui se nettoie seul",
              "l'écran et les profils vous sont utiles",
            ],
            cta: "Choisir la 5400 LatteGo →",
          },
        ].map((box) => (
          <div
            key={box.title}
            style={{ border: "1px solid #E8E1D6", borderRadius: 20, padding: 30, background: "#F7F3EC" }}
          >
            <div
              style={{
                fontFamily: mono,
                fontSize: 11,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#B77945",
              }}
            >
              En résumé
            </div>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 28, color: "#241B17", margin: "10px 0 0" }}>
              {box.title}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 14 }}>
              {box.points.map((p) => (
                <div key={p} style={{ fontSize: 14.5, color: "#45413E", display: "flex", gap: 9 }}>
                  <span style={{ color: "#3E6B55" }}>✓</span>
                  {p}
                </div>
              ))}
            </div>
            <a
              href="#"
              style={{
                display: "inline-block",
                marginTop: 20,
                background: "#241B17",
                color: "#F7F3EC",
                borderRadius: 11,
                padding: "13px 20px",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {box.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
