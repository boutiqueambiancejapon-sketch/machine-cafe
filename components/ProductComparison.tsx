// components/ProductComparison.tsx — tableau comparatif de N produits
// Amazon synchronisés. 100% RSC.
//
// <ProductComparison asins={["B0AAA","B0BBB"]} />
//   → specs = intersection automatique des specs communes aux produits
// <ProductComparison asins={["B0AAA","B0BBB"]} specs={["Pression","Puissance"]} />
//   → specs forcées (utile si les libellés Amazon diffèrent légèrement d'un
//     produit à l'autre et que l'intersection auto rate des correspondances)

import Image from "next/image";
import { getAmazonProducts } from "@/lib/products/read";
import { commonSpecKeys, specValue } from "@/lib/products/specs";
import { mono, serif } from "@/components/ui";
import { ProductDisclosure } from "@/components/ProductDisclosure";

export function ProductComparison({ asins, specs }: { asins: string[]; specs?: string[] }) {
  const products = getAmazonProducts(asins);
  const specKeys = specs && specs.length > 0 ? specs : commonSpecKeys(products);

  return (
    <div style={{ margin: "24px 0" }}>
      <div style={{ overflowX: "auto", borderRadius: 18, border: "1px solid #E8E1D6" }}>
        <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse", minWidth: 480 }}>
          <thead>
            <tr style={{ background: "#241B17", color: "#FCFBF8" }}>
              <th style={{ padding: "14px 16px", textAlign: "left", fontFamily: mono, fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em" }}>
                Critère
              </th>
              {products.map((p) => (
                <th key={p.asin} style={{ padding: "14px 16px", textAlign: "left", minWidth: 160 }}>
                  <div style={{ position: "relative", width: 56, height: 56, borderRadius: 8, overflow: "hidden", background: "#F7F3EC", marginBottom: 8 }}>
                    <Image src={p.image_url} alt={p.title} fill sizes="56px" style={{ objectFit: "contain" }} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{p.brand}</div>
                  <div style={{ fontSize: 12.5, opacity: 0.85 }}>{p.title}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderTop: "1px solid #E8E1D6" }}>
              <td style={{ padding: "12px 16px", color: "#77716C" }}>Prix</td>
              {products.map((p) => (
                <td key={p.asin} style={{ padding: "12px 16px", color: "#241B17" }}>
                  <div style={{ fontFamily: serif, fontSize: 18 }}>{p.price_display}</div>
                  <div style={{ fontSize: 11, color: "#8C837A" }}>relevé le {p.price_checked_at}</div>
                </td>
              ))}
            </tr>
            {products.some((p) => p.rating != null) && (
              <tr style={{ borderTop: "1px solid #E8E1D6" }}>
                <td style={{ padding: "12px 16px", color: "#77716C" }}>Note</td>
                {products.map((p) => (
                  <td key={p.asin} style={{ padding: "12px 16px", color: "#241B17" }}>
                    {p.rating != null ? `★ ${p.rating.toFixed(1)}/5${p.reviews_count != null ? ` (${p.reviews_count})` : ""}` : "—"}
                  </td>
                ))}
              </tr>
            )}
            {specKeys.map((key) => (
              <tr key={key} style={{ borderTop: "1px solid #E8E1D6" }}>
                <td style={{ padding: "12px 16px", color: "#77716C" }}>{key}</td>
                {products.map((p) => (
                  <td key={p.asin} style={{ padding: "12px 16px", color: "#241B17" }}>
                    {specValue(p, key) ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
            <tr style={{ borderTop: "1px solid #E8E1D6" }}>
              <td style={{ padding: "12px 16px" }} />
              {products.map((p) => (
                <td key={p.asin} style={{ padding: "12px 16px" }}>
                  <a
                    href={p.affiliate_url}
                    rel="sponsored nofollow noopener"
                    target="_blank"
                    className="h-amazon-solid"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#B77945",
                      color: "#FCFBF8",
                      borderRadius: 10,
                      padding: "10px 16px",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    Voir sur Amazon →
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <ProductDisclosure />
    </div>
  );
}
