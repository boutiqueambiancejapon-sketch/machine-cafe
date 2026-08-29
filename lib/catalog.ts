// lib/catalog.ts — catalogue unifié pour les pages hub (mega-menu).
// Source primaire : data/products/{ASIN}.json (produits Amazon réels,
// synchronisés). Complété par les entrées de démo de lib/data.ts pour les
// modèles pas encore synchronisés. Lecture build-time, jamais de fetch.

import fs from "fs";
import path from "path";
import { products as demoProducts, type Product as DemoProduct } from "@/lib/data";
import type { Product as AmazonProduct } from "@/lib/products/types";

export type MachineType = "grains" | "capsules" | "filtre" | "expresso";

export type CatalogItem = {
  id: string;
  brand: string;
  model: string;
  /** Famille normalisée pour les hubs. */
  type: MachineType;
  /** Prix numérique pour le tri / filtre budget (EUR). */
  price: number;
  /** Libellé prix à afficher (« à partir de X € » pour le réel, « X € » pour la démo). */
  priceDisplay: string;
  /** Note /10 (rating Amazon ×2 pour le réel, score démo sinon). null si inconnu. */
  score: number | null;
  ratingRaw: number | null;
  reviews: number | null;
  imageUrl: string | null;
  /** Lien affilié Amazon si le produit est réel, sinon null. */
  affiliateUrl: string | null;
  asin: string | null;
  /** true = data/products, false = démo lib/data.ts. */
  real: boolean;
  tags: string[];
  idealFor?: string;
  pros?: string[];
  con?: string;
};

const PRODUCTS_DIR = path.join(process.cwd(), "data/products");

// Classification title-first : les fils d'Ariane Amazon contiennent tous
// « Café, thé et expresso », inutilisables tels quels pour trancher.
function classify(title: string, categories: string[], brand = ""): MachineType {
  const t = title.toLowerCase();
  const cat = categories.join(" ").toLowerCase();
  const b = brand.toLowerCase();

  if (/capsule|dosette|nespresso|dolce gusto|vertuo|pixie|citiz|essenza|à capsules/.test(`${t} ${cat} ${b}`))
    return "capsules";

  // Cafetière filtre / piston : « filtre » dans le nom, sans espresso annoncé
  if (/\bfiltre\b|filter coffee|french press|à\s*piston/.test(t) && !/espresso|expresso/.test(t)) return "filtre";

  // Machines expresso à porte-filtre — noms de modèles reconnus d'abord,
  // car leur descriptif contient souvent « automatique » (mousseur auto).
  if (/specialista|dedica|stilosa|la marzocco|gaggia classic|barista express|barista pro|porte[-\s]?filtre/.test(t))
    return "expresso";

  // Machines à grains / automatiques : « grains », « broyeur », modèles connus,
  // ou catégorie Amazon explicite. Pas le mot « automatique » seul (trop large).
  if (
    /\bgrains?\b|broyeur|à\s*grains|entièrement automatique|machine automatique|magnifica|eletta|primadonna|dinamica|rivelia|barista smart|latte ?go|evidence/.test(t) ||
    /machines? à caf[eé] automatiques?|machines? à grains?/.test(cat)
  )
    return "grains";

  if (/espresso|expresso|percolateur/.test(t)) return "expresso";

  if (/cafeti[eè]res? à filtre|machines? à caf[eé] filtre/.test(cat)) return "filtre";

  return "grains";
}

function readAmazon(): CatalogItem[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(PRODUCTS_DIR).filter((f) => /^[A-Z0-9]{10}\.json$/.test(f));
  } catch {
    return [];
  }
  const items: CatalogItem[] = [];
  for (const file of files) {
    let p: AmazonProduct;
    try {
      p = JSON.parse(fs.readFileSync(path.join(PRODUCTS_DIR, file), "utf-8")) as AmazonProduct;
    } catch {
      continue;
    }
    const model = p.title.replace(new RegExp(`^${p.brand}\\s*`, "i"), "").split(/[-–,|]/)[0].trim().slice(0, 60);
    items.push({
      id: p.asin,
      brand: p.brand || "—",
      model: model || p.title.slice(0, 60),
      type: classify(p.title, p.categories, p.brand),
      price: p.price_from ?? p.price_to ?? 0,
      priceDisplay: p.price_display ?? "prix indisponible",
      score: p.rating != null ? Math.round(p.rating * 2 * 10) / 10 : null,
      ratingRaw: p.rating,
      reviews: p.reviews_count,
      imageUrl: p.image_url,
      affiliateUrl: p.affiliate_url,
      asin: p.asin,
      real: true,
      tags: [],
    });
  }
  return items;
}

const DEMO_TYPE: Record<string, MachineType> = {
  "À grains": "grains",
  Expresso: "expresso",
  Capsules: "capsules",
  Filtre: "filtre",
};

function fromDemo(d: DemoProduct): CatalogItem {
  return {
    id: d.id,
    brand: d.brand,
    model: d.model,
    type: DEMO_TYPE[d.type] ?? "grains",
    price: d.price,
    priceDisplay: `${d.price.toLocaleString("fr-FR")} €`,
    score: d.score,
    ratingRaw: null,
    reviews: null,
    imageUrl: null,
    affiliateUrl: null,
    asin: null,
    real: false,
    tags: d.tags,
    idealFor: d.idealFor,
    pros: d.pros,
    con: d.con,
  };
}

/**
 * Catalogue complet : produits réels d'abord, puis entrées de démo dont
 * aucun produit réel de la même marque + type ne prend déjà la place.
 */
export function getCatalog(): CatalogItem[] {
  const real = readAmazon();
  const takenKeys = new Set(real.map((r) => `${r.brand.toLowerCase()}|${r.type}`));
  const demoFill = demoProducts
    .map(fromDemo)
    .filter((d) => !takenKeys.has(`${d.brand.toLowerCase()}|${d.type}`));
  return [...real, ...demoFill].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
}
