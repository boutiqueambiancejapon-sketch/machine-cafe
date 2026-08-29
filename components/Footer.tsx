import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { mono, serif } from "@/components/ui";

const colCaption: CSSProperties = {
  fontFamily: mono,
  fontSize: 10.5,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#77716C",
};

type FootLink = { label: string; href: string };

const columns: { title: string; links: FootLink[] }[] = [
  {
    title: "Machines",
    links: [
      { label: "Toutes les machines", href: "/machines" },
      { label: "Machines à grains", href: "/machines/a-grains" },
      { label: "Machines à capsules", href: "/machines/a-capsules" },
      { label: "Machines expresso", href: "/machines/expresso" },
      { label: "Cafetières filtre", href: "/machines/filtre" },
      { label: "Machines compactes", href: "/machines/compactes" },
    ],
  },
  {
    title: "Comparatifs",
    links: [
      { label: "Tous les comparatifs", href: "/comparatifs" },
      { label: "Le comparateur", href: "/comparateur" },
      { label: "Par budget", href: "/machines/budget/300-500" },
      { label: "Par besoin", href: "/machines/besoin/meilleure-machine-cafe" },
      { label: "Tous les tests", href: "/tests" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "Tous les guides", href: "/guides" },
      { label: "Grains ou capsules", href: "/guides/grains-ou-capsules" },
      { label: "Machine silencieuse", href: "/machines/besoin/silencieuse" },
      { label: "Machine pas chère", href: "/machines/besoin/pas-chere" },
      { label: "Toutes les marques", href: "/marques" },
    ],
  },
  {
    title: "À propos",
    links: [
      { label: "Qui sommes-nous ?", href: "#" },
      { label: "Notre méthodologie", href: "#" },
      { label: "Affiliation", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Mentions légales", href: "#" },
      { label: "Confidentialité", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

function FootAnchor({ href, children }: { href: string; children: ReactNode }) {
  const style: CSSProperties = { fontSize: 13.5, color: "#C9BDB1" };
  if (href.startsWith("/")) {
    return (
      <Link href={href} className="h-foot" style={style}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className="h-foot" style={style}>
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "#241B17", color: "#C9BDB1", marginTop: "auto" }}>
      <div
        data-r="foot"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "64px 40px 40px",
          display: "grid",
          gridTemplateColumns: "1.4fr repeat(4,1fr)",
          gap: 44,
        }}
      >
        <div>
          <div style={{ fontFamily: serif, fontSize: 24, color: "#F7F3EC" }}>
            10minutes<span style={{ color: "#B77945" }}>cafe</span>
          </div>
          <p style={{ margin: "14px 0 0", fontSize: 14, lineHeight: 1.6, color: "#9A8E84", maxWidth: "34ch" }}>
            Un comparateur éditorial indépendant sur les machines à café. Nos notes sont établies selon une
            méthodologie publique et ne sont jamais négociées.
          </p>
          <div
            style={{
              marginTop: 18,
              fontSize: 12.5,
              lineHeight: 1.6,
              color: "#8E8177",
              border: "1px solid #3B2C24",
              borderRadius: 12,
              padding: 14,
            }}
          >
            Ce site participe au Programme Partenaires d&apos;Amazon. Nous pouvons percevoir une commission sur les
            achats éligibles.
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={colCaption}>{col.title}</div>
            {col.links.map((l, i) => (
              <FootAnchor key={`${l.label}-${i}`} href={l.href}>
                {l.label}
              </FootAnchor>
            ))}
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid #3B2C24" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "20px 40px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12.5,
            color: "#77716C",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span>© 2026 10minutescafe — maquette de démonstration, produits et prix donnés à titre d&apos;exemple.</span>
          <span>Dernière mise à jour du comparatif : 28 août 2026</span>
        </div>
      </div>
    </footer>
  );
}
