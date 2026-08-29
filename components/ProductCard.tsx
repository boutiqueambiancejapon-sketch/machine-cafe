import Link from "next/link";
import type { Product } from "@/lib/data";
import { euro, num } from "@/lib/format";
import { mono, serif } from "@/components/ui";
import { CompareButton } from "@/components/CompareButton";

export function ProductCard({ p }: { p: Product }) {
  return (
    <article
      className="h-card"
      style={{
        border: "1px solid #E8E1D6",
        borderRadius: 16,
        background: "#FCFBF8",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "4 / 3",
          background: "repeating-linear-gradient(135deg,#F7F3EC 0 12px,#F1EBE0 12px 24px)",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ fontFamily: mono, fontSize: 11, color: "#8C837A" }}>PHOTO PRODUIT · 3/4</div>
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "#241B17",
            color: "#F7F3EC",
            fontFamily: mono,
            fontSize: 10,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            padding: "6px 10px",
            borderRadius: 999,
            animation: "popIn .4s ease-out both",
          }}
        >
          {p.badge}
        </div>
      </div>

      <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
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
              {p.brand}
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#241B17", margin: "4px 0 0", lineHeight: 1.25 }}>
              {p.model}
            </h3>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontFamily: serif, fontSize: 28, color: "#241B17", lineHeight: 1 }}>{num(p.score)}</div>
            <div style={{ fontFamily: mono, fontSize: 9.5, color: "#77716C" }}>/ 10</div>
          </div>
        </div>

        <p style={{ margin: "14px 0 0", fontSize: 14, lineHeight: 1.55, color: "#45413E" }}>
          Idéale pour {p.idealFor}.
        </p>

        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 5 }}>
          {p.pros.map((pro) => (
            <div key={pro} style={{ fontSize: 13.5, color: "#3E6B55", display: "flex", gap: 8 }}>
              <span>✓</span>
              <span style={{ color: "#45413E" }}>{pro}</span>
            </div>
          ))}
          <div style={{ fontSize: 13.5, color: "#77716C", display: "flex", gap: 8 }}>
            <span>×</span>
            <span>{p.con}</span>
          </div>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 20 }}>
          <div style={{ fontSize: 13, color: "#77716C" }}>Prix indicatif</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#241B17" }}>{euro(p.price)}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <Link
              href="/tests"
              className="h-dark"
              style={{
                flex: 1,
                textAlign: "center",
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
            <CompareButton id={p.id} model={p.model} />
          </div>
          <a
            href="#"
            className="h-amazon"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 8,
              border: "1px solid #B77945",
              color: "#B77945",
              borderRadius: 10,
              padding: 11,
              fontSize: 13.5,
              fontWeight: 700,
            }}
          >
            Voir le prix sur Amazon →
          </a>
          <div style={{ textAlign: "center", fontSize: 11.5, color: "#8C837A", marginTop: 7 }}>
            lien affilié · prix constaté le 26/08/2026
          </div>
        </div>
      </div>
    </article>
  );
}
