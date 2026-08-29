"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties } from "react";
import { useCompare } from "@/components/CompareProvider";
import { megaBrands } from "@/lib/data";
import { mono, serif } from "@/components/ui";

const navBtn: CSSProperties = {
  background: "none",
  border: "none",
  padding: "8px 12px",
  fontSize: 14.5,
  fontWeight: 600,
  color: "#241B17",
  borderRadius: 8,
};

const megaCaption: CSSProperties = {
  fontFamily: mono,
  fontSize: 11,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#77716C",
};

const megaLink: CSSProperties = { fontSize: 14, color: "#45413E" };

const techLinks = [
  "Machines automatiques",
  "Machines à grains",
  "Machines expresso",
  "Machines à capsules",
  "Machines avec broyeur",
  "Machines compactes",
];
const needLinks = [
  "Meilleure machine à café",
  "Meilleure machine à grains",
  "Meilleure pour cappuccino",
  "Meilleure machine silencieuse",
  "Meilleure machine familiale",
  "Meilleure machine pas chère",
];
const budgetLinks = [
  "Moins de 200 €",
  "200 – 300 €",
  "300 – 500 €",
  "500 – 800 €",
  "800 – 1 500 €",
  "Plus de 1 500 €",
];

export function Header() {
  const [menu, setMenu] = useState<"machines" | "marques" | null>(null);
  const [search, setSearch] = useState(false);
  const { ids } = useCompare();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        background: "rgba(252,251,248,.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid #E8E1D6",
      }}
    >
      <div
        data-r="hdrshell"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 40px",
          height: 72,
          display: "flex",
          alignItems: "center",
          gap: 36,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "baseline", gap: 8 }} onMouseEnter={() => setMenu(null)}>
          <span style={{ fontFamily: serif, fontSize: 24, letterSpacing: "-.01em", color: "#241B17" }}>
            10minutes<span style={{ color: "#B77945" }}>cafe</span>
          </span>
        </Link>

        <nav
          data-r="nav"
          style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, minWidth: 0 }}
          onMouseLeave={() => setMenu(null)}
        >
          <Link href="/machines/a-grains" className="h-nav" style={navBtn} onMouseEnter={() => setMenu("machines")}>
            Machines à café
          </Link>
          <Link href="/comparateur" className="h-nav" style={navBtn} onMouseEnter={() => setMenu(null)}>
            Comparatifs
          </Link>
          <Link href="/tests/magnifica-evo" className="h-nav" style={navBtn} onMouseEnter={() => setMenu(null)}>
            Tests
          </Link>
          <Link href="/guides/grains-ou-capsules" className="h-nav" style={navBtn} onMouseEnter={() => setMenu(null)}>
            Guides
          </Link>
          <Link href="/blog" className="h-nav" style={navBtn} onMouseEnter={() => setMenu(null)}>
            Blog
          </Link>
          <Link href="/marques/delonghi" className="h-nav" style={navBtn} onMouseEnter={() => setMenu("marques")}>
            Marques
          </Link>

          {menu === "machines" && (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 72,
                background: "#FCFBF8",
                borderBottom: "1px solid #E8E1D6",
                boxShadow: "0 24px 48px -32px rgba(36,27,23,.35)",
                animation: "riseIn .22s cubic-bezier(.2,.7,.3,1) both",
              }}
            >
              <div
                data-r="grid4"
                style={{
                  maxWidth: 1280,
                  margin: "0 auto",
                  padding: "36px 40px 40px",
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1.1fr .8fr 1fr",
                  gap: 44,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={megaCaption}>Par technologie</div>
                  {techLinks.map((t) => (
                    <Link key={t} href="/machines/a-grains" className="h-mega" style={megaLink}>
                      {t}
                    </Link>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={megaCaption}>Par besoin</div>
                  {needLinks.map((t) => (
                    <Link key={t} href="/comparateur" className="h-mega" style={megaLink}>
                      {t}
                    </Link>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={megaCaption}>Par budget</div>
                  {budgetLinks.map((t) => (
                    <Link key={t} href="/comparateur" className="h-mega" style={megaLink}>
                      {t}
                    </Link>
                  ))}
                </div>
                <div
                  style={{
                    background: "#F7F3EC",
                    border: "1px solid #E8E1D6",
                    borderRadius: 16,
                    padding: 22,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div style={{ fontFamily: serif, fontSize: 22, lineHeight: 1.15, color: "#241B17" }}>
                    Vous hésitez encore ?
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#77716C" }}>
                    Six questions sur votre façon de boire du café, et trois modèles adaptés à votre profil.
                  </p>
                  <Link
                    href="/#configurateur"
                    className="h-dark"
                    style={{
                      marginTop: 6,
                      alignSelf: "flex-start",
                      background: "#241B17",
                      color: "#F7F3EC",
                      borderRadius: 10,
                      padding: "11px 16px",
                      fontSize: 13.5,
                      fontWeight: 700,
                    }}
                  >
                    Trouver ma machine →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {menu === "marques" && (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 72,
                background: "#FCFBF8",
                borderBottom: "1px solid #E8E1D6",
                boxShadow: "0 24px 48px -32px rgba(36,27,23,.35)",
                animation: "riseIn .22s cubic-bezier(.2,.7,.3,1) both",
              }}
            >
              <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 40px 36px" }}>
                <div style={{ ...megaCaption, marginBottom: 18 }}>Marques suivies</div>
                <div data-r="grid6" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10 }}>
                  {megaBrands.map((b) => (
                    <Link
                      key={b}
                      href="/marques/delonghi"
                      className="h-brandtile"
                      style={{
                        textAlign: "left",
                        background: "#F7F3EC",
                        border: "1px solid #E8E1D6",
                        borderRadius: 12,
                        padding: 14,
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#241B17",
                      }}
                    >
                      {b}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>

        <div data-r="hdrright" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => setSearch((v) => !v)}
            aria-label="Rechercher"
            className="h-bordered-amber"
            style={{
              width: 38,
              height: 38,
              display: "grid",
              placeItems: "center",
              background: "none",
              border: "1px solid #E8E1D6",
              borderRadius: 10,
              color: "#45413E",
              fontSize: 15,
            }}
          >
            ⌕
          </button>
          <Link
            href="/comparatifs/delonghi-vs-philips"
            className="h-bordered"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "1px solid #E8E1D6",
              borderRadius: 10,
              padding: "0 14px",
              height: 38,
              fontSize: 13.5,
              fontWeight: 600,
              color: "#45413E",
            }}
          >
            Comparer <span style={{ fontFamily: mono, fontSize: 12, color: "#B77945" }}>({ids.length})</span>
          </Link>
          <Link
            href="/#configurateur"
            className="h-dark"
            style={{
              background: "#241B17",
              color: "#F7F3EC",
              border: "none",
              borderRadius: 10,
              height: 38,
              padding: "0 18px",
              fontSize: 13.5,
              fontWeight: 700,
              whiteSpace: "nowrap",
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Trouver ma machine
          </Link>
        </div>
      </div>

      {search && (
        <div style={{ borderTop: "1px solid #E8E1D6", background: "#FCFBF8", animation: "riseIn .2s ease-out both" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "22px 40px 28px" }}>
            <input
              placeholder="Rechercher une machine, une marque, un guide…"
              style={{
                width: "100%",
                border: "none",
                borderBottom: "2px solid #241B17",
                background: "none",
                padding: "10px 0",
                fontFamily: serif,
                fontSize: 28,
                color: "#241B17",
                outline: "none",
              }}
            />
            <div
              data-r="grid4"
              style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28, marginTop: 26 }}
            >
              <SearchCol title="Machines" links={["De'Longhi Magnifica Evo", "Philips 5400 LatteGo", "Jura E8"]} />
              <SearchCol title="Tests" links={["Magnifica Evo : test complet", "Barista Express : test complet"]} />
              <SearchCol title="Comparatifs" links={["De'Longhi vs Philips", "Grains vs capsules"]} />
              <SearchCol title="Guides" links={["Comment choisir sa machine", "Détartrer sans se tromper"]} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function SearchCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={megaCaption}>{title}</div>
      {links.map((l) => (
        <a key={l} href="#" style={{ fontSize: 14 }}>
          {l}
        </a>
      ))}
    </div>
  );
}
