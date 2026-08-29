// lib/products/specs.ts — parsing des specs[] ("Clé : valeur") + sélection
// des specs affichées.
//
// Décisions (validées avec Mathias) :
// - <ProductRef> : whitelist par catégorie de produit, avec possibilité de
//   forcer d'autres specs via un prop `specs` optionnel.
// - <ProductComparison> : intersection automatique des specs communes aux
//   produits comparés, avec possibilité de forcer une liste via `specs`.

import type { Product } from "./types";

export type ParsedSpec = { key: string; value: string };

/** Parse une chaîne "Clé : valeur" sur le PREMIER " : " rencontré. */
export function parseSpec(raw: string): ParsedSpec {
  const idx = raw.indexOf(" : ");
  if (idx === -1) return { key: raw.trim(), value: "" };
  return { key: raw.slice(0, idx).trim(), value: raw.slice(idx + 3).trim() };
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // accents
    .trim();
}

// ─── Whitelist par famille de produit ─────────────────────────────────────
// Les clés sont des sous-chaînes recherchées (insensible casse/accents) dans
// les clés specs[] réelles renvoyées par Amazon — à affiner une fois les
// premiers vrais produits synchronisés (les libellés Amazon varient).
const SPECS_WHITELIST: Record<string, string[]> = {
  grains: ["Pression", "Puissance", "Broyeur", "Bac a grains", "Reservoir", "Boissons", "Poids"],
  espresso: ["Pression", "Puissance", "Reservoir", "Poids", "Dimensions"],
  capsules: ["Puissance", "Reservoir", "Nombre de capsules", "Poids", "Dimensions"],
  filtre: ["Capacite", "Puissance", "Programmable", "Poids"],
  default: ["Puissance", "Pression", "Reservoir", "Dimensions", "Poids", "Garantie"],
};

function categorizeProduct(product: Product): keyof typeof SPECS_WHITELIST {
  const haystack = normalize(product.categories.join(" "));
  if (haystack.includes("grain")) return "grains";
  if (haystack.includes("capsule")) return "capsules";
  if (haystack.includes("filtre") || haystack.includes("filter")) return "filtre";
  if (haystack.includes("espresso") || haystack.includes("expresso")) return "espresso";
  return "default";
}

/**
 * Sélectionne les specs à afficher pour <ProductRef variant="card">.
 * - `override` fourni → on cherche exactement ces clés (dans l'ordre donné).
 * - sinon → whitelist de la famille détectée via categories[].
 * - si la whitelist ne matche rien (libellés Amazon imprévus) → repli sur
 *   les 6 premières specs brutes, pour ne jamais afficher une fiche vide.
 */
export function pickSpecs(product: Product, override?: string[]): ParsedSpec[] {
  const parsed = product.specs.map(parseSpec);
  const findKey = (wanted: string) => parsed.find((s) => normalize(s.key).includes(normalize(wanted)));

  if (override && override.length > 0) {
    return override.map(findKey).filter((s): s is ParsedSpec => Boolean(s));
  }

  const family = categorizeProduct(product);
  const whitelist = SPECS_WHITELIST[family] ?? SPECS_WHITELIST.default;
  const picked = whitelist.map(findKey).filter((s): s is ParsedSpec => Boolean(s));
  return picked.length > 0 ? picked : parsed.slice(0, 6);
}

/**
 * Intersection des clés de specs communes à tous les produits comparés,
 * dans l'ordre où elles apparaissent chez le premier produit.
 * Utilisée par <ProductComparison> quand `specs` n'est pas fourni.
 */
export function commonSpecKeys(products: Product[]): string[] {
  if (products.length === 0) return [];
  const keySets = products.map((p) => new Set(p.specs.map((s) => normalize(parseSpec(s).key))));
  const [first, ...rest] = keySets;
  const common = [...first].filter((k) => rest.every((set) => set.has(k)));
  const firstParsed = products[0].specs.map(parseSpec);
  return firstParsed.filter((s) => common.includes(normalize(s.key))).map((s) => s.key);
}

/** Récupère la valeur d'une spec par clé (recherche par sous-chaîne) pour un produit donné. */
export function specValue(product: Product, key: string): string | null {
  const parsed = product.specs.map(parseSpec);
  const match = parsed.find((s) => normalize(s.key).includes(normalize(key)));
  return match ? match.value : null;
}
