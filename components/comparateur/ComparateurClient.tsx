"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { products, typeDefs, brandDefs, noteFilterValues, productById, type Product } from "@/lib/data";
import { euro, num, barColor } from "@/lib/format";
import { mono, serif } from "@/components/ui";
import { CompareButton } from "@/components/CompareButton";

const kicker: CSSProperties = {
  fontFamily: mono,
  fontSize: 11,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#77716C",
};

function bars(p: Product) {
  return [
    { label: "Café", v: p.s.cafe },
    { label: "Facilité", v: p.s.facilite },
    { label: "Entretien", v: p.s.entretien },
    { label: "Bruit", v: p.s.bruit },
    { label: "Prix", v: p.s.prix },
  ].map((b) => ({ label: b.label, value: num(b.v), width: b.v * 10 + "%", color: barColor(b.v) }));
}

export function ComparateurClient() {
  const [types, setTypes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [minNote, setMinNote] = useState(0);
  const [budget, setBudget] = useState(1600);

  const filtered = useMemo(
    () =>
      products
        .filter(
          (p) =>
            p.price <= budget &&
            (types.length === 0 || types.some((t) => p.tags.includes(t))) &&
            (brands.length === 0 || brands.includes(p.brand)) &&
            p.score >= minNote,
        )
        .sort((a, b) => b.score - a.score),
    [types, brands, minNote, budget],
  );

  const chips: { label: string; remove: () => void }[] = [];
  types.forEach((t) =>
    chips.push({
      label: typeDefs.find((d) => d.id === t)?.label ?? t,
      remove: () => setTypes((cur) => cur.filter((x) => x !== t)),
    }),
  );
  brands.forEach((b) => chips.push({ label: b, remove: () => setBrands((cur) => cur.filter((x) => x !== b)) }));
  if (budget < 1600) chips.push({ label: "≤ " + euro(budget), remove: () => setBudget(1600) });
  if (minNote > 0) chips.push({ label: "≥ " + num(minNote), remove: () => setMinNote(0) });

  const quickPicks = [
    { tag: "Notre choix", p: productById("magnifica")! },
    { tag: "Qualité / prix", p: productById("philips2200")! },
    { tag: "Premium", p: productById("jura")! },
  ];

  function resetFilters() {
    setTypes([]);
    setBrands([]);
    setMinNote(0);
    setBudget(1600);
  }

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 40px 90px" }}>
      <div style={{ fontSize: 13, color: "#77716C", display: "flex", gap: 8 }}>
        <Link href="/">Accueil</Link>
        <span>/</span>
        <span style={{ color: "#241B17" }}>Comparatif</span>
      </div>
      <h1
        style={{
          fontFamily: serif,
          fontWeight: 400,
          fontSize: 52,
          lineHeight: 1.05,
          color: "#241B17",
          margin: "18px 0 0",
        }}
      >
        Comparatif des meilleures machines à café
      </h1>
      <p style={{ margin: "14px 0 0", fontSize: 17, color: "#45413E", maxWidth: "64ch" }}>
        Comparez les modèles selon les critères qui comptent vraiment : qualité du café, simplicité, entretien, bruit
        et prix.
      </p>

      <div
        data-r="side"
        style={{
          display: "grid",
          gridTemplateColumns: "264px 1fr",
          gap: 36,
          marginTop: 40,
          alignItems: "start",
        }}
      >
        {/* ── Filters ── */}
        <aside
          style={{
            position: "sticky",
            top: 96,
            border: "1px solid #E8E1D6",
            borderRadius: 16,
            padding: 22,
            background: "#FCFBF8",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={kicker}>Filtres</div>
            <button
              type="button"
              onClick={resetFilters}
              style={{ background: "none", border: "none", fontSize: 12.5, color: "#B77945", fontWeight: 600, padding: 0 }}
            >
              Réinitialiser
            </button>
          </div>

          <div style={{ marginTop: 22, fontSize: 13, fontWeight: 700, color: "#241B17" }}>Je cherche une machine…</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 12 }}>
            {typeDefs.map((f) => {
              const on = types.includes(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setTypes((cur) => (on ? cur.filter((x) => x !== f.id) : [...cur, f.id]))}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontSize: 14,
                    textAlign: "left",
                    color: "#45413E",
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 5,
                      display: "grid",
                      placeItems: "center",
                      fontSize: 11,
                      color: "#FCFBF8",
                      transition: "background .18s, border-color .18s",
                      flexShrink: 0,
                      border: on ? "1px solid #241B17" : "1px solid #DCD3C6",
                      background: on ? "#241B17" : "transparent",
                    }}
                  >
                    {on ? "✓" : ""}
                  </span>
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #E8E1D6" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700, color: "#241B17" }}>
              <span>Budget maximum</span>
              <span style={{ fontFamily: mono, color: "#B77945" }}>{euro(budget)}</span>
            </div>
            <input
              type="range"
              min={150}
              max={1600}
              step={50}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              style={{ width: "100%", marginTop: 14 }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 10.5, color: "#8C837A" }}>
              <span>150 €</span>
              <span>1 600 €</span>
            </div>
          </div>

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #E8E1D6" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#241B17" }}>Marque</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 12 }}>
              {brandDefs.map((b) => {
                const on = brands.includes(b);
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBrands((cur) => (on ? cur.filter((x) => x !== b) : [...cur, b]))}
                    className="h-chip-lift"
                    style={{
                      borderRadius: 999,
                      padding: "7px 12px",
                      fontSize: 12.5,
                      fontWeight: 600,
                      border: on ? "1px solid #241B17" : "1px solid #DCD3C6",
                      background: on ? "#241B17" : "transparent",
                      color: on ? "#F7F3EC" : "#45413E",
                    }}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #E8E1D6" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#241B17" }}>Note minimale</div>
            <div style={{ display: "flex", gap: 7, marginTop: 12 }}>
              {noteFilterValues.map((n) => {
                const on = minNote === n;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setMinNote(n)}
                    style={{
                      flex: 1,
                      borderRadius: 9,
                      padding: "9px 0",
                      fontSize: 12.5,
                      fontWeight: 700,
                      transition: "border-color .18s, background .18s, color .18s",
                      border: on ? "1px solid #241B17" : "1px solid #DCD3C6",
                      background: on ? "#241B17" : "transparent",
                      color: on ? "#F7F3EC" : "#45413E",
                    }}
                  >
                    {n === 0 ? "Toutes" : num(n) + "+"}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ── Results ── */}
        <div>
          <div style={{ border: "1px solid #E8E1D6", borderRadius: 16, padding: 24, background: "#F7F3EC" }}>
            <div style={kicker}>Réponse rapide</div>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 26, color: "#241B17", margin: "8px 0 0" }}>
              Nos 3 recommandations
            </h2>
            <div
              data-r="grid3"
              style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 16 }}
            >
              {quickPicks.map((q) => (
                <Link
                  key={q.p.id}
                  href="/tests/magnifica-evo"
                  className="h-tile"
                  style={{
                    textAlign: "left",
                    background: "#FCFBF8",
                    border: "1px solid #E8E1D6",
                    borderRadius: 12,
                    padding: 14,
                    display: "block",
                  }}
                >
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 10,
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: "#B77945",
                    }}
                  >
                    {q.tag}
                  </div>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: "#241B17", marginTop: 5 }}>
                    {q.p.brand} {q.p.model}
                  </div>
                  <div style={{ fontSize: 12.5, color: "#77716C", marginTop: 3 }}>
                    {num(q.p.score)} / 10 · {euro(q.p.price)}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 32,
              flexWrap: "wrap",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 14.5, color: "#45413E" }}>
              <strong style={{ color: "#241B17" }}>{filtered.length}</strong> machines correspondent
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              {chips.map((c, i) => (
                <button
                  key={`${c.label}-${i}`}
                  type="button"
                  onClick={c.remove}
                  className="h-chip"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    background: "#F7F3EC",
                    border: "1px solid #E8E1D6",
                    borderRadius: 999,
                    padding: "7px 12px",
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "#241B17",
                    animation: "popIn .18s ease-out both",
                  }}
                >
                  {c.label} <span style={{ color: "#77716C" }}>×</span>
                </button>
              ))}
              <select
                defaultValue="note"
                style={{
                  border: "1px solid #E8E1D6",
                  borderRadius: 9,
                  padding: "9px 12px",
                  fontSize: 13,
                  background: "#FCFBF8",
                  color: "#241B17",
                }}
              >
                <option value="note">Trier : note éditoriale</option>
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
              </select>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 18 }}>
              {filtered.map((p) => (
                <article
                  key={p.id}
                  data-r="prow"
                  className="h-row"
                  style={{
                    border: "1px solid #E8E1D6",
                    borderRadius: 16,
                    background: "#FCFBF8",
                    padding: 20,
                    display: "grid",
                    gridTemplateColumns: "180px 1fr 210px",
                    gap: 22,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
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
                    {p.badge && (
                      <div
                        style={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          background: "#241B17",
                          color: "#F7F3EC",
                          fontFamily: mono,
                          fontSize: 9,
                          letterSpacing: ".09em",
                          textTransform: "uppercase",
                          padding: "5px 8px",
                          borderRadius: 999,
                        }}
                      >
                        {p.badge}
                      </div>
                    )}
                  </div>

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
                      {p.brand} · {p.type}
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: "#241B17", margin: "5px 0 0" }}>{p.model}</h3>
                    <p style={{ margin: "9px 0 0", fontSize: 14, color: "#45413E", lineHeight: 1.5 }}>
                      Idéale pour {p.idealFor}.
                    </p>
                    <div
                      data-r="grid5"
                      style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14, marginTop: 16 }}
                    >
                      {bars(p).map((b) => (
                        <div key={b.label}>
                          <div style={{ fontSize: 11.5, color: "#77716C" }}>{b.label}</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#241B17", marginTop: 2 }}>{b.value}</div>
                          <div
                            style={{
                              height: 4,
                              borderRadius: 999,
                              background: "#EDE6DA",
                              marginTop: 5,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                borderRadius: 999,
                                transition: "width .7s cubic-bezier(.2,.7,.3,1)",
                                width: b.width,
                                background: b.color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      textAlign: "right",
                      borderLeft: "1px solid #EDE6DA",
                      paddingLeft: 22,
                    }}
                  >
                    <div style={{ fontFamily: serif, fontSize: 38, color: "#241B17", lineHeight: 1 }}>
                      {num(p.score)}
                    </div>
                    <div style={{ fontFamily: mono, fontSize: 10, color: "#77716C" }}>NOTE GLOBALE / 10</div>
                    <div style={{ marginTop: 14, fontSize: 12.5, color: "#77716C" }}>À partir de</div>
                    <div style={{ fontSize: 19, fontWeight: 700, color: "#241B17" }}>{euro(p.price)}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", marginTop: 16 }}>
                      <Link
                        href="/tests/magnifica-evo"
                        className="h-dark"
                        style={{
                          textAlign: "center",
                          background: "#241B17",
                          color: "#F7F3EC",
                          border: "none",
                          borderRadius: 10,
                          padding: 11,
                          fontSize: 13.5,
                          fontWeight: 700,
                        }}
                      >
                        Voir le test
                      </Link>
                      <CompareButton id={p.id} model={p.model} variant="block" />
                      <a
                        href="#"
                        className="h-amazon"
                        style={{
                          textAlign: "center",
                          border: "1px solid #B77945",
                          color: "#B77945",
                          borderRadius: 10,
                          padding: 10,
                          fontSize: 13,
                          fontWeight: 700,
                        }}
                      >
                        Voir sur Amazon →
                      </a>
                    </div>
                    <div style={{ fontSize: 11, color: "#8C837A", marginTop: 7 }}>lien affilié</div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div
              style={{
                border: "1px dashed #DCD3C6",
                borderRadius: 16,
                padding: "64px 32px",
                textAlign: "center",
                marginTop: 18,
                animation: "fadeIn .25s ease-out both",
              }}
            >
              <div style={{ fontFamily: serif, fontSize: 28, color: "#241B17" }}>0 résultat</div>
              <p style={{ margin: "10px 0 0", fontSize: 15, color: "#77716C" }}>
                Nous n&apos;avons trouvé aucune machine correspondant à ces critères.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                style={{
                  marginTop: 20,
                  background: "#241B17",
                  color: "#F7F3EC",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 20px",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
