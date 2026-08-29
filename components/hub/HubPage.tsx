// components/hub/HubPage.tsx — rendu partagé des pages hub (mega-menu).
// RSC. Contenu éditorial (chapô, sections H2-questions, FAQ) fourni par le
// routeur via `content` (lib/hub-content.ts) ; liste classée depuis
// lib/catalog.ts filtrée par le prédicat du hub.

import Link from "next/link";
import { getCatalog, type CatalogItem } from "@/lib/catalog";
import type { HubDef } from "@/lib/hubs";
import { HOW_WE_RANK, type HubContent } from "@/lib/hub-content";
import { num } from "@/lib/format";
import { mono, serif } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProductDisclosure } from "@/components/ProductDisclosure";

const SITE_URL = "https://10minutescafe.fr";

const h2Style = { fontFamily: serif, fontWeight: 400, fontSize: 30, color: "#241B17", margin: "44px 0 0", lineHeight: 1.2 } as const;
const pStyle = { margin: "14px 0 0", fontSize: 16, lineHeight: 1.75, color: "#3A342F" } as const;

function Paragraphs({ body }: { body: string }) {
  return (
    <>
      {body.split("\n\n").map((para, i) => (
        <p key={i} style={pStyle}>
          {para}
        </p>
      ))}
    </>
  );
}

export function HubPage({
  hub,
  breadcrumb,
  content,
  siblings = [],
  siblingsLabel = "Voir aussi",
}: {
  hub: HubDef;
  breadcrumb: { label: string; href?: string }[];
  content?: HubContent;
  siblings?: { label: string; href: string }[];
  siblingsLabel?: string;
}) {
  const items = getCatalog().filter(hub.predicate).sort(hub.sort ?? ((a, b) => (b.score ?? 0) - (a.score ?? 0)));
  const withAffiliate = items.filter((i) => i.affiliateUrl);
  const sections = content?.sections ?? [];
  const [firstSection, ...restSections] = sections;

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
  const faqSchema =
    content && content.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 40px 90px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <Breadcrumb items={breadcrumb} />

      <div style={{ maxWidth: 820 }}>
        <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 46, lineHeight: 1.05, color: "#241B17", margin: "18px 0 0" }}>
          {hub.h1}
        </h1>
        <p style={{ margin: "16px 0 0", fontSize: 17.5, lineHeight: 1.7, color: "#45413E" }}>{content?.chapo ?? hub.intro}</p>

        {content?.keyFacts && content.keyFacts.length > 0 && (
          <dl
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 0,
              margin: "22px 0 0",
              border: "1px solid #E8E1D6",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            {content.keyFacts.map((f, i) => (
              <div key={f.label} style={{ padding: "14px 18px", borderTop: i >= 2 ? "1px solid #EDE6DA" : "none", borderLeft: i % 2 ? "1px solid #EDE6DA" : "none" }}>
                <dt style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: "#77716C" }}>{f.label}</dt>
                <dd style={{ margin: "4px 0 0", fontSize: 14.5, color: "#241B17", fontWeight: 600 }}>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {firstSection && (
          <section>
            <h2 style={h2Style}>{firstSection.h2}</h2>
            <Paragraphs body={firstSection.body} />
          </section>
        )}
      </div>

      {/* ─── Classement ─── */}
      <h2 style={{ ...h2Style, marginTop: 48 }}>Notre classement</h2>
      {items.length === 0 ? (
        <div style={{ marginTop: 18, border: "1px solid #E8E1D6", borderRadius: 16, padding: 24, background: "#F7F3EC", maxWidth: 820 }}>
          <p style={{ margin: 0, fontSize: 15, color: "#45413E" }}>
            Aucun modèle ne correspond encore à ce filtre.{" "}
            <Link href="/comparateur" style={{ color: "#B77945", fontWeight: 700 }}>
              Ouvrir le comparateur complet →
            </Link>
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
          {items.map((it, i) => (
            <HubRow key={it.id} item={it} rank={i + 1} />
          ))}
        </div>
      )}

      <p style={{ marginTop: 16, fontSize: 12.5, color: "#8C837A", maxWidth: 820, lineHeight: 1.6 }}>{HOW_WE_RANK}</p>

      {/* ─── Sections restantes ─── */}
      {restSections.length > 0 && (
        <div style={{ maxWidth: 820 }}>
          {restSections.map((s) => (
            <section key={s.h2}>
              <h2 style={h2Style}>{s.h2}</h2>
              <Paragraphs body={s.body} />
            </section>
          ))}
        </div>
      )}

      {/* ─── FAQ ─── */}
      {content && content.faq.length > 0 && (
        <section style={{ maxWidth: 820 }}>
          <h2 style={{ ...h2Style, marginTop: 48 }}>Questions fréquentes</h2>
          <div style={{ border: "1px solid #E8E1D6", borderRadius: 16, overflow: "hidden", marginTop: 18 }}>
            {content.faq.map((f, i) => (
              <details key={f.q} style={{ borderTop: i === 0 ? "none" : "1px solid #EDE6DA" }}>
                <summary style={{ padding: "16px 20px", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", gap: 16 }}>
                  <h3 style={{ margin: 0, fontSize: 15.5, fontWeight: 600, color: "#241B17", lineHeight: 1.4 }}>{f.q}</h3>
                  <span aria-hidden style={{ color: "#B77945", flexShrink: 0 }}>▾</span>
                </summary>
                <p style={{ margin: 0, padding: "0 20px 18px", fontSize: 14.5, lineHeight: 1.65, color: "#45413E" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
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
                style={{ border: "1px solid #E8E1D6", borderRadius: 999, padding: "9px 15px", fontSize: 13.5, fontWeight: 600, color: "#241B17", background: "#FCFBF8" }}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      <div style={{ marginTop: 36, display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Link href="/comparateur" style={{ fontSize: 14, fontWeight: 700, color: "#B77945" }}>
          Comparer tous les modèles →
        </Link>
        <Link href="/guides" style={{ fontSize: 14, fontWeight: 700, color: "#B77945" }}>
          Nos guides d&apos;achat →
        </Link>
        <Link href="/blog" style={{ fontSize: 14, fontWeight: 700, color: "#B77945" }}>
          Le blog →
        </Link>
      </div>

      {withAffiliate.length > 0 && (
        <div style={{ maxWidth: 820 }}>
          <ProductDisclosure />
        </div>
      )}
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
        maxWidth: 900,
      }}
    >
      <div style={{ fontFamily: serif, fontSize: 34, color: "#DCD3C6", lineHeight: 1 }}>{String(rank).padStart(2, "0")}</div>

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
        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#241B17", margin: "5px 0 0" }}>{item.model}</h3>

        {item.idealFor && <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.55, color: "#45413E" }}>Pour {item.idealFor}.</p>}

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
              style={{ background: "#B77945", color: "#FCFBF8", borderRadius: 10, padding: "10px 16px", fontSize: 13.5, fontWeight: 700 }}
            >
              Voir sur Amazon →
            </a>
          ) : (
            <Link
              href="/comparateur"
              style={{ border: "1px solid #B77945", color: "#B77945", borderRadius: 10, padding: "9px 15px", fontSize: 13.5, fontWeight: 700 }}
            >
              Voir la fiche →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
