import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { guideSlugs } from "@/lib/data";
import { mono, serif } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

export function generateMetadata(): Metadata {
  return {
    title: "Machine à grains ou machine à capsules ?",
    description:
      "Grains ou capsules : ce n'est pas le goût qui tranche, mais le nombre de cafés par jour et le temps que vous acceptez d'y consacrer. Notre guide d'achat.",
  };
}

const shell: CSSProperties = { maxWidth: 1280, margin: "0 auto" };
const h2: CSSProperties = { fontFamily: serif, fontWeight: 400, fontSize: 34, color: "#241B17" };
const para: CSSProperties = { fontSize: 17, lineHeight: 1.75, color: "#45413E" };

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!guideSlugs.includes(slug)) notFound();

  return (
    <div style={{ ...shell, padding: "28px 40px 90px" }}>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "Grains ou capsules" },
        ]}
      />

      <div style={{ maxWidth: 760, margin: "0 auto", paddingTop: 36 }}>
        <div
          style={{
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "#B77945",
          }}
        >
          Guide d&apos;achat
        </div>
        <h1
          style={{
            fontFamily: serif,
            fontWeight: 400,
            fontSize: 52,
            lineHeight: 1.05,
            color: "#241B17",
            margin: "14px 0 0",
          }}
        >
          Machine à grains ou machine à capsules ?
        </h1>
        <p style={{ margin: "18px 0 0", fontSize: 19, lineHeight: 1.6, color: "#45413E" }}>
          La question se pose presque toujours dans le mauvais sens. Ce n&apos;est pas le goût qui tranche, c&apos;est
          le nombre de cafés que vous buvez par jour et le temps que vous acceptez d&apos;y consacrer.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 24,
            padding: "18px 0",
            borderTop: "1px solid #E8E1D6",
            borderBottom: "1px solid #E8E1D6",
            fontSize: 13.5,
            color: "#77716C",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              background: "repeating-linear-gradient(135deg,#F7F3EC 0 6px,#F1EBE0 6px 12px)",
              border: "1px solid #E8E1D6",
            }}
          />
          <span>
            Par <a href="#" style={{ fontWeight: 600 }}>Camille Rousset</a>
          </span>
          <span>·</span>
          <span>Publié le 12 juin 2026</span>
          <span>·</span>
          <span>Mis à jour le 28 août 2026</span>
          <span>·</span>
          <span>9 min</span>
        </div>

        <div
          style={{
            aspectRatio: "16 / 9",
            borderRadius: 18,
            border: "1px solid #E8E1D6",
            background: "repeating-linear-gradient(135deg,#F7F3EC 0 14px,#F1EBE0 14px 28px)",
            display: "grid",
            placeItems: "center",
            fontFamily: mono,
            fontSize: 11,
            color: "#8C837A",
            marginTop: 28,
          }}
        >
          VISUEL D&apos;OUVERTURE · 1600×900
        </div>

        <div style={{ border: "1px solid #E8E1D6", borderRadius: 16, padding: 22, marginTop: 32, background: "#F7F3EC" }}>
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
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
            {[
              "1. La vraie différence de coût",
              "2. Le goût : ce qui change et ce qui ne change pas",
              "3. Le temps et l'entretien",
              "4. Notre recommandation par profil",
            ].map((t) => (
              <a key={t} href="#" style={{ fontSize: 14.5, color: "#45413E" }}>
                {t}
              </a>
            ))}
          </div>
        </div>

        <h2 style={{ ...h2, margin: "40px 0 0" }}>1. La vraie différence de coût</h2>
        <p style={{ ...para, margin: "16px 0 0" }}>
          Une capsule coûte entre 0,35 et 0,50 €. Vingt grammes de café en grains de qualité correcte reviennent à
          0,20 € pour deux tasses, soit environ 0,10 € l&apos;espresso. Sur trois cafés par jour, l&apos;écart annuel
          dépasse 300 €. Une machine à grains à 450 € est donc amortie en moins de deux ans face à une machine à
          capsules à 100 €.
        </p>
        <p style={{ ...para, margin: "14px 0 0" }}>
          Ce calcul s&apos;inverse complètement en dessous d&apos;un café par jour. À ce rythme, la capsule reste plus
          économique, plus simple, et le café en grains ouvert depuis trois semaines a perdu l&apos;essentiel de ce
          qui justifiait l&apos;investissement.
        </p>

        <div style={{ borderLeft: "3px solid #B77945", padding: "4px 0 4px 20px", margin: "28px 0" }}>
          <p style={{ margin: 0, fontFamily: serif, fontSize: 23, lineHeight: 1.4, color: "#241B17" }}>
            Le seuil de bascule se situe autour de deux cafés par jour. En dessous, la capsule. Au-dessus, les grains.
          </p>
        </div>

        <h2 style={{ ...h2, margin: "40px 0 0" }}>2. Le goût : ce qui change et ce qui ne change pas</h2>
        <p style={{ ...para, margin: "16px 0 0" }}>
          Le café moulu s&apos;oxyde en quelques minutes. C&apos;est le principal argument des machines à grains, et
          il est vrai. Mais une capsule est conditionnée sous atmosphère protectrice, ce qui compense en partie le
          fait que la mouture y attend parfois un an. Le résultat : sur des cafés de grande distribution, l&apos;écart
          en tasse est réel mais modeste. Il devient net dès qu&apos;on utilise des grains de torréfaction récente
          achetés chez un torréfacteur.
        </p>

        <div style={{ border: "1px solid #E8E1D6", borderRadius: 18, padding: 26, marginTop: 34, background: "#F7F3EC" }}>
          <div
            style={{
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "#77716C",
            }}
          >
            Machines recommandées dans ce guide
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
            {[
              ["De'Longhi Magnifica Evo", "9,1 / 10 · 449 €"],
              ["Nespresso Vertuo Pop", "8,2 / 10 · 99 €"],
            ].map(([name, meta]) => (
              <Link
                key={name}
                href="/tests"
                className="h-tile"
                style={{
                  textAlign: "left",
                  display: "grid",
                  gridTemplateColumns: "64px 1fr",
                  gap: 14,
                  alignItems: "center",
                  background: "#FCFBF8",
                  border: "1px solid #E8E1D6",
                  borderRadius: 12,
                  padding: 12,
                }}
              >
                <div
                  style={{
                    aspectRatio: "1",
                    borderRadius: 9,
                    background: "repeating-linear-gradient(135deg,#F7F3EC 0 8px,#F1EBE0 8px 16px)",
                  }}
                />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#241B17" }}>{name}</div>
                  <div style={{ fontSize: 12.5, color: "#77716C" }}>{meta}</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#8C837A", marginTop: 12 }}>
            Ces liens peuvent être affiliés. Cela ne change pas nos notes.
          </div>
        </div>

        <h2 style={{ ...h2, margin: "44px 0 0" }}>4. Notre recommandation par profil</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
          {[
            ["1 café par jour", "Capsules. L'investissement grains ne se justifie pas.", false],
            ["2 à 5 cafés", "Machine à grains d'entrée de gamme, autour de 400 €.", false],
            ["Plus de 5 cafés", "Grains, avec un réservoir de 1,8 L minimum.", false],
            ["Cappuccino quotidien", "Grains avec système lait automatique, à partir de 600 €.", true],
          ].map(([profile, reco, last]) => (
            <div
              key={profile as string}
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gap: 20,
                padding: "16px 0",
                borderTop: "1px solid #E8E1D6",
                borderBottom: last ? "1px solid #E8E1D6" : undefined,
                fontSize: 15.5,
              }}
            >
              <div style={{ fontWeight: 700, color: "#241B17" }}>{profile}</div>
              <div style={{ color: "#45413E" }}>{reco}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 34, flexWrap: "wrap" }}>
          <Link
            href="/machines/a-grains"
            className="h-dark-lg"
            style={{
              background: "#241B17",
              color: "#F7F3EC",
              border: "none",
              borderRadius: 11,
              padding: "14px 22px",
              fontSize: 14.5,
              fontWeight: 700,
            }}
          >
            Voir les machines recommandées
          </Link>
          <Link
            href="/#configurateur"
            style={{
              background: "none",
              border: "1px solid #241B17",
              color: "#241B17",
              borderRadius: 11,
              padding: "14px 22px",
              fontSize: 14.5,
              fontWeight: 700,
            }}
          >
            Trouver ma machine →
          </Link>
        </div>
      </div>
    </div>
  );
}
