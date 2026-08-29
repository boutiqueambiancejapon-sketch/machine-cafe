// lib/products/read.ts — lecture build-time (RSC) de data/products/{ASIN}.json.
// Jamais de fetch runtime : le refresh se fait côté cron (amazon_sync_all),
// pas côté rendu. Nommage volontairement différent du getProduct(slug) de
// emd-template (content/produits/*.yaml, produit saisi à la main) pour éviter
// toute confusion entre les deux systèmes — voir DECISIONS.md.

import fs from "fs";
import path from "path";
import type { Product } from "./types";

const PRODUCTS_DIR = path.join(process.cwd(), "data/products");

/** Lit un produit synchronisé depuis data/products/{asin}.json. Retourne null si absent. */
export function getAmazonProduct(asin: string): Product | null {
  const filePath = path.join(PRODUCTS_DIR, `${asin}.json`);
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Product;
  } catch {
    return null;
  }
}

/**
 * Lit plusieurs produits (pour les comparatifs / tableaux).
 * Erreur claire au build si un ASIN n'a pas encore été synchronisé —
 * plutôt qu'un rendu silencieusement incomplet.
 */
export function getAmazonProducts(asins: string[]): Product[] {
  const missing: string[] = [];
  const products = asins.map((asin) => {
    const product = getAmazonProduct(asin);
    if (!product) missing.push(asin);
    return product;
  });
  if (missing.length > 0) {
    throw new Error(
      `[lib/products] ASIN introuvable(s) dans data/products/ : ${missing.join(", ")}. ` +
        `Lance amazon_sync_product(asin, "boutiqueambiancejapon-sketch/machine-cafe") pour chacun avant de publier ce contenu.`,
    );
  }
  return products as Product[];
}
