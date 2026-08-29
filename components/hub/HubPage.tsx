// components/hub/HubPage.tsx — rendu partagé des pages hub (mega-menu).
// RSC. Liste classée depuis lib/catalog.ts filtrée par le prédicat du hub.

import Link from "next/link";
import { getCatalog, type CatalogItem } from "@/lib/catalog";
import type { HubDef } from "@/lib/hubs";
import { num } from "@/lib/format";
import { mono, serif } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProductDisclosure } from "@/components/ProductDisclosure";

const SITE_URL = "https://10minutescafe.fr";

export function HubPage({
  hub,
  breadcrumb,
  siblings = [],
  siblingsLabel = "Voir aussi",
}: {
  hub: HubDef;
  breadcrumb: { label: string; href?: string }[];
  /** Autres hubs de la même famille, pour le maillage interne. */
  siblings?: { label: string; href: string }[];
  siblingsLabel?: string;
}) {
  const items = getCatalog().filter(hub.predicate).sort(hub.sort ?? ((a, b) => (b.score ?? 0) - (a.score ?? 0)));
  const withAffiliate = items.filter((i) => i.affiliateUrl);
  const canonical = `${SITE_URL}${breadcrumb[breadcrumb.length - 1]?.href ?? ""}`;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: hub.h1,
    itemListElement: items.slice(0, 12).map((i, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: `${i.brand} ${i.model}`,
      ...(i.affiliateUrl ? { url: i.affiliateUrl } : {}),
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumb.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.label,
      ...(b.href ? { item: `${SITE_URL}${b.href}` } : {}),
    })),
  };

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 40px 90px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <Breadcrumb items={breadcrumb} />

      <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 46, lineHeight: 1.05, color: "#241B17", margin: "18px 0 0", maxWidth: "20ch" }}>
        {hub.h1}
      </h1>
      <p style={{ margin: "16px 0 0", fontSize: 17, lineHeight: 1.65, color: "#45413E", maxWidth: "70ch" }}>{hub.intro}</p>

      {items.length === 0 ? (
        <div style={{ marginTop: 32, border: "1px solid #E8E1D6", borderRadius: 16, padding: 24, background: "#F7F3EC" }}>
          <p style={{ margin: 0, fontSize: 15, color: "#45413E" }}>
            Aucun modèle synchronisé ne correspond encore à ce filtre.{" "}
            <Link href="/comparateur" style={{ color: "#B77945", fontWeight: 700 }}>
              Ouvrir le comparateur complet →
            </Link>
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
          {items.map((it, i) => (
            <HubRow key={it.id} item={it} rank={i + 1} />
          ))}
        </div>
      )}

      {siblings.length > 0 && (
        <section style={{ marginTop: 44 }}>
          <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: "#77716C" }}>
            {siblingsLabel}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
            {siblings.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                style={{
                  border: "1px solid #E8E1D6",
                  borderRadius: 999,
                  padding: "9px 15px",
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "#241B17",
                  background: "#FCFBF8",
                }}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link href="/comparateur" style={{ fontSize: 14, fontWeight: 700, color: "#B77945" }}>
          Comparer tous les modèles →
        </Link>
        <Link href="/blog" style={{ fontSize: 14, fontWeight: 700, color: "#B77945" }}>
          Nos guides d&apos;achat →
        </Link>
      </div>

      {withAffiliate.length > 0 && (
        <div style={{ maxWidth: "70ch" }}>
          <ProductDisclosure />
        </div>
      )}
      <p style={{ marginTop: 8, fontSize: 12, color: "#8C837A", maxWidth: "70ch" }}>
        {withAffiliate.length > 0
          ? "Prix relevés sur Amazon, rafraîchis chaque mois. Les modèles sans prix Amazon sont des exemples de la rédaction, à titre indicatif."
          : "Modèles et prix donnés à titre indicatif par la rédaction."}
      </p>
    </div>
  );
}

function HubRow({ item, rank }: { item: CatalogItem; rank: number }) {
  return (
    <article
      style={{
        border: "1px solid #E8E1D6",
        borderRadius: 18,
        padding: 22,
        background: "#FCFBF8",
        display: "grid",
        gridTemplateColumns: "44px 96px 1fr",
        gap: 18,
        alignItems: "start",
      }}
    >
      <div style={{ fontFamily: serif, fontSize: 34, color: "#DCD3C6", lineHeight: 1 }}>
        {String(rank).padStart(2, "0")}
      </div>

      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 12,
          border: "1px solid #E8E1D6",
          background: item.imageUrl ? "#fff" : "repeating-linear-gradient(135deg,#F7F3EC 0 8px,#F1EBE0 8px 16px)",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
        }}
      >
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- visuel produit Amazon en hotlink CDN (cf. data/products/README.md)
          <img src={item.imageUrl} alt={`${item.brand} ${item.model}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }} />
        ) : (
          <span style={{ fontFamily: mono, fontSize: 9, color: "#8C837A" }}>photo</span>
        )}
      </div>

      <div>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "#B77945" }}>
          {item.brand}
          {item.real ? "" : " · exemple rédac"}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#241B17", margin: "5px 0 0" }}>{item.model}</h2>

        {item.idealFor && (
          <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.55, color: "#45413E" }}>
            Pour {item.idealFor}.
          </p>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 12, flexWrap: "wrap" }}>
          {item.score != null && (
            <div style={{ fontFamily: serif, fontSize: 24, color: "#241B17" }}>
              {num(item.score)}
              <span style={{ fontSize: 13, color: "#77716C" }}> / 10</span>
            </div>
          )}
          {item.ratingRaw != null && (
            <div style={{ fontSize: 13, color: "#77716C" }}>
              ★ {item.ratingRaw.toFixed(1)} {item.reviews != null && `(${item.reviews})`}
            </div>
          )}
          <div style={{ fontSize: 15, fontWeight: 700, color: "#241B17" }}>{item.priceDisplay}</div>

          {item.affiliateUrl ? (
            <a
              href={item.affiliateUrl}
              target="_blank"
              rel="sponsored nofollow noopener"
              style={{
                background: "#B77945",
                color: "#FCFBF8",
                borderRadius: 10,
                padding: "10px 16px",
                fontSize: 13.5,
                fontWeight: 700,
              }}
            >
              Voir sur Amazon →
            </a>
          ) : (
            <Link
              href="/comparateur"
              style={{
                border: "1px solid #B77945",
                color: "#B77945",
                borderRadius: 10,
                padding: "9px 15px",
                fontSize: 13.5,
                fontWeight: 700,
              }}
            >
              Voir la fiche →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
