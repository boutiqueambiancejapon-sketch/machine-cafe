// components/ProductRef.tsx — référence à un produit Amazon synchronisé,
// utilisable dans le MDX des 3 types de contenu (blog, comparatif, fiche
// test) ou directement en JSX. 100% RSC (aucune interactivité nécessaire) :
// pas de "use client", pas d'event handler.
//
// <ProductRef asin="B0XXXXXXXX" />                      → variant "card" (défaut)
// <ProductRef asin="B0XXXXXXXX" variant="inline" />      → lien texte simple
// <ProductRef asin="B0XXXXXXXX" variant="cta" />         → bouton seul
// <ProductRef asin="B0XXXXXXXX" specs={["Pression"]} />  → force les specs affichées (card)

import Image from "next/image";
import { getAmazonProduct } from "@/lib/products/read";
import { pickSpecs } from "@/lib/products/specs";
import { mono, serif } from "@/components/ui";
import { ProductDisclosure } from "@/components/ProductDisclosure";

type Variant = "card" | "inline" | "cta";

export function ProductRef({
  asin,
  variant = "card",
  specs,
}: {
  asin: string;
  variant?: Variant;
  /** Force la liste de specs affichées (variant "card" uniquement) — sinon whitelist par catégorie. */
  specs?: string[];
}) {
  const product = getAmazonProduct(asin);
  if (!product) {
    throw new Error(
      `[ProductRef] ASIN "${asin}" introuvable dans data/products/. ` +
        `Lance amazon_sync_product("${asin}", "boutiqueambiancejapon-sketch/machine-cafe") avant de référencer ce produit.`,
    );
  }

  if (variant === "inline") {
    return (
      <a href={product.affiliate_url} rel="sponsored nofollow noopener" target="_blank">
        {product.title}
      </a>
    );
  }

  if (variant === "cta") {
    return <AmazonButton product={product} />;
  }

  const displaySpecs = pickSpecs(product, specs);

  return (
    <div style={{ border: "1px solid #E8E1D6", borderRadius: 20, padding: 24, margin: "24px 0", background: "#FCFBF8" }}>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", width: 140, height: 140, flexShrink: 0, borderRadius: 14, overflow: "hidden", border: "1px solid #E8E1D6", background: "#F7F3EC" }}>
          <Image src={product.image_url} alt={product.title} fill sizes="140px" style={{ objectFit: "contain" }} />
        </div>

        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#77716C" }}>
            {product.brand}
          </div>
          <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 22, color: "#241B17", margin: "4px 0 0", lineHeight: 1.2 }}>
            {product.title}
          </div>

          {product.rating != null && (
            <div style={{ fontSize: 13.5, color: "#45413E", marginTop: 8 }}>
              ★ {product.rating.toFixed(1)}/5
              {product.reviews_count != null && <span style={{ color: "#77716C" }}> ({product.reviews_count} avis)</span>}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
            <span style={{ fontFamily: serif, fontSize: 26, color: "#241B17" }}>{product.price_display}</span>
            <span style={{ fontSize: 12, color: "#8C837A" }}>relevé le {product.price_checked_at}, susceptible de varier</span>
          </div>

          {displaySpecs.length > 0 && (
            <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px" }}>
              {displaySpecs.map((s) => (
                <li key={s.key} style={{ fontSize: 13, color: "#45413E" }}>
                  <span style={{ color: "#77716C" }}>{s.key} : </span>
                  {s.value}
                </li>
              ))}
            </ul>
          )}

          <div style={{ marginTop: 16 }}>
            <AmazonButton product={product} />
          </div>
        </div>
      </div>

      <ProductDisclosure text={product.disclosure} />
    </div>
  );
}

function AmazonButton({ product }: { product: { affiliate_url: string } }) {
  return (
    <a
      href={product.affiliate_url}
      rel="sponsored nofollow noopener"
      target="_blank"
      className="h-amazon-solid"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: "#B77945",
        color: "#FCFBF8",
        borderRadius: 12,
        padding: "13px 20px",
        fontSize: 14.5,
        fontWeight: 700,
      }}
    >
      Voir sur Amazon <span>→</span>
    </a>
  );
}
