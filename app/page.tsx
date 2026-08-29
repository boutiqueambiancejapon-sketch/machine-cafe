import Link from "next/link";
import type { CSSProperties } from "react";
import { products, weights, guides } from "@/lib/data";
import { mono, serif, Photo } from "@/components/ui";
import { Configurateur } from "@/components/home/Configurateur";
import { ProductCard } from "@/components/ProductCard";

const kicker: CSSProperties = {
  fontFamily: mono,
  fontSize: 11,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#77716C",
};

const shell: CSSProperties = { maxWidth: 1280, margin: "0 auto" };

export default function HomePage() {
  const topPicks = products.slice(0, 6);

  return (
    <div>
      {/* ── Hero ── */}
      <section
        data-r="two"
        style={{
          ...shell,
          padding: "72px 40px 88px",
          display: "grid",
          gridTemplateColumns: "1.05fr .95fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div style={{ animation: "riseIn .5s cubic-bezier(.2,.7,.3,1) both" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "#77716C",
              border: "1px solid #E8E1D6",
              borderRadius: 999,
              padding: "6px 12px",
            }}
          >
            Comparatifs indépendants · Mis à jour le 28 août 2026
          </div>
          <h1
            style={{
              fontFamily: serif,
              fontWeight: 400,
              fontSize: "clamp(44px,4.4vw,68px)",
              lineHeight: 1.02,
              letterSpacing: "-.015em",
              color: "#241B17",
              margin: "22px 0 0",
              textWrap: "balance",
            }}
          >
            Quelle machine à café est vraiment faite pour vous ?
          </h1>
          <p
            style={{
              margin: "22px 0 0",
              fontSize: 17.5,
              lineHeight: 1.6,
              color: "#45413E",
              maxWidth: "52ch",
              textWrap: "pretty",
            }}
          >
            Comparez les machines à café, découvrez leurs différences et trouvez le modèle adapté à votre budget,
            votre café préféré et votre quotidien.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            <Link
              href="/#configurateur"
              className="h-dark-lg"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#241B17",
                color: "#F7F3EC",
                border: "none",
                borderRadius: 12,
                padding: "15px 24px",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              Trouver ma machine <span style={{ fontSize: 16 }}>→</span>
            </Link>
            <Link
              href="/comparateur"
              className="h-outline"
              style={{
                background: "none",
                color: "#241B17",
                border: "1px solid #241B17",
                borderRadius: 12,
                padding: "15px 24px",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              Voir les meilleurs modèles
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              gap: 26,
              marginTop: 40,
              paddingTop: 26,
              borderTop: "1px solid #E8E1D6",
              flexWrap: "wrap",
            }}
          >
            {[
              ["64", "machines suivies"],
              ["12", "critères de notation"],
              ["0", "avis sponsorisé"],
            ].map(([n, label]) => (
              <div key={label}>
                <div style={{ fontFamily: serif, fontSize: 30, color: "#241B17", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 12.5, color: "#77716C", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ animation: "popIn .6s cubic-bezier(.2,.7,.3,1) .12s both" }}>
          <Photo
            ratio="4 / 5"
            radius={24}
            border
            label={
              <span style={{ fontSize: 12 }}>
                PHOTO HERO
                <br />
                machine contemporaine
                <br />
                cuisine claire · 3/4 · 1600×2000
              </span>
            }
          >
            <div
              style={{
                position: "absolute",
                left: 20,
                bottom: 20,
                background: "#FCFBF8",
                border: "1px solid #E8E1D6",
                borderRadius: 14,
                padding: "14px 16px",
                boxShadow: "0 18px 40px -30px rgba(36,27,23,.6)",
              }}
            >
              <div
                style={{
                  fontFamily: mono,
                  fontSize: 10.5,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "#77716C",
                }}
              >
                Notre choix 2026
              </div>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: "#241B17", marginTop: 4 }}>
                De&apos;Longhi Magnifica Evo
              </div>
              <div style={{ fontSize: 13, color: "#3E6B55", fontWeight: 600, marginTop: 2 }}>9,1 / 10</div>
            </div>
          </Photo>
        </div>
      </section>

      <Configurateur />

      {/* ── Meilleures machines ── */}
      <section style={{ ...shell, padding: "88px 40px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 40, flexWrap: "wrap" }}>
          <div>
            <div style={kicker}>Sélection éditoriale</div>
            <h2
              style={{
                fontFamily: serif,
                fontWeight: 400,
                fontSize: 42,
                lineHeight: 1.08,
                color: "#241B17",
                margin: "12px 0 0",
              }}
            >
              Les meilleures machines à café du moment
            </h2>
            <p style={{ margin: "12px 0 0", fontSize: 16, color: "#45413E", maxWidth: "56ch" }}>
              Nos recommandations selon différents profils d&apos;utilisateurs.
            </p>
          </div>
          <Link
            href="/comparateur"
            className="h-chip-lift"
            style={{
              background: "none",
              border: "1px solid #E8E1D6",
              borderRadius: 11,
              padding: "12px 18px",
              fontSize: 14,
              fontWeight: 700,
              color: "#241B17",
            }}
          >
            Voir les 64 machines →
          </Link>
        </div>

        <div
          data-r="grid3"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 38 }}
        >
          {topPicks.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* ── Méthodologie ── */}
      <section style={{ ...shell, padding: "88px 40px" }}>
        <div
          data-r="two"
          style={{
            border: "1px solid #E8E1D6",
            borderRadius: 24,
            background: "#F7F3EC",
            padding: 52,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
          }}
        >
          <div>
            <div style={kicker}>Méthodologie</div>
            <h2
              style={{
                fontFamily: serif,
                fontWeight: 400,
                fontSize: 38,
                lineHeight: 1.1,
                color: "#241B17",
                margin: "12px 0 0",
              }}
            >
              Comment nous évaluons les machines
            </h2>
            <p style={{ margin: "16px 0 0", fontSize: 15.5, lineHeight: 1.65, color: "#45413E" }}>
              Chaque note globale est une moyenne pondérée de sept critères. Nous croisons les spécifications
              constructeur, nos essais lorsqu&apos;ils ont eu lieu, et les retours d&apos;usage documentés. Quand une
              machine n&apos;a pas été essayée par nos soins, c&apos;est indiqué sur sa fiche.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
              <a
                href="#"
                style={{
                  background: "#241B17",
                  color: "#F7F3EC",
                  borderRadius: 10,
                  padding: "12px 18px",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Notre méthodologie
              </a>
              <a
                href="#"
                style={{
                  border: "1px solid #241B17",
                  color: "#241B17",
                  borderRadius: 10,
                  padding: "12px 18px",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Comment nous gagnons de l&apos;argent
              </a>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {weights.map((w) => (
              <div key={w.label}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "#241B17",
                  }}
                >
                  <span>{w.label}</span>
                  <span style={{ fontFamily: mono, color: "#77716C" }}>{w.pctText}</span>
                </div>
                <div
                  style={{
                    height: 6,
                    borderRadius: 999,
                    background: "#E4DCCF",
                    marginTop: 6,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: "#5A3828",
                      borderRadius: 999,
                      transition: "width .8s cubic-bezier(.2,.7,.3,1)",
                      width: w.width,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guides ── */}
      <section style={{ ...shell, padding: "0 40px 88px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
          <div>
            <div style={kicker}>Le guide du café</div>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 38, color: "#241B17", margin: "12px 0 0" }}>
              Comprendre avant d&apos;acheter
            </h2>
          </div>
          <Link
            href="/guides"
            className="h-tlink-amber"
            style={{ background: "none", border: "none", fontSize: 14, fontWeight: 700, color: "#241B17", padding: 0 }}
          >
            Tous les guides →
          </Link>
        </div>
        <div
          data-r="grid4"
          style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginTop: 32 }}
        >
          {guides.map((g) => (
            <Link
              key={g.title}
              href={`/guides/${g.slug}`}
              style={{
                textAlign: "left",
                background: "none",
                border: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <Photo
                ratio="3 / 2"
                radius={14}
                border
                style={{ fontSize: 10.5 }}
                label="VISUEL ARTICLE"
              />
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
                  {g.cat}
                </div>
                <div style={{ fontSize: 16.5, fontWeight: 700, color: "#241B17", marginTop: 6, lineHeight: 1.3 }}>
                  {g.title}
                </div>
                <div style={{ fontSize: 13, color: "#77716C", marginTop: 8 }}>{g.meta}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section style={{ ...shell, padding: "0 40px 96px" }}>
        <div
          style={{
            border: "1px solid #E8E1D6",
            borderRadius: 20,
            padding: "40px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 48,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 32, color: "#241B17", margin: 0 }}>
              Recevez nos meilleurs conseils café
            </h2>
            <p style={{ margin: "8px 0 0", fontSize: 15, color: "#77716C" }}>
              Une fois par semaine : nouveaux tests, bons plans et conseils pour mieux choisir.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flex: 1, minWidth: 340 }}>
            <input
              placeholder="votre@email.fr"
              className="f-inp"
              style={{
                flex: 1,
                border: "1px solid #E8E1D6",
                borderRadius: 11,
                padding: "14px 16px",
                fontSize: 14.5,
                background: "#FCFBF8",
                color: "#241B17",
                outline: "none",
              }}
            />
            <button
              type="button"
              className="h-dark"
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
              Je m&apos;inscris
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
