// lib/hubs.ts — définitions des pages hub du mega-menu.
// Chaque hub filtre le catalogue unifié (lib/catalog.ts) et porte son propre
// wording SEO/GEO. Les routes app/machines/*, app/marques/* délèguent à
// components/hub/HubPage.tsx.

import type { CatalogItem, MachineType } from "@/lib/catalog";
import { megaBrands } from "@/lib/data";

export type HubDef = {
  slug: string;
  /** Étiquette courte (menu, fil d'Ariane). */
  label: string;
  h1: string;
  /** 2-3 phrases : définition + critère d'arbitrage. Sert l'intro GEO. */
  intro: string;
  metaTitle: string;
  metaDescription: string;
  predicate: (i: CatalogItem) => boolean;
  /** Tri décroissant par défaut sur le score ; override possible. */
  sort?: (a: CatalogItem, b: CatalogItem) => number;
};

const byScore = (a: CatalogItem, b: CatalogItem) => (b.score ?? 0) - (a.score ?? 0);
const byPriceAsc = (a: CatalogItem, b: CatalogItem) => a.price - b.price;
const hay = (i: CatalogItem) => `${i.brand} ${i.model} ${i.tags.join(" ")}`.toLowerCase();
const isType = (t: MachineType) => (i: CatalogItem) => i.type === t;

// ─── Par technologie (menu « Par technologie ») ──────────────────────────
export const typeHubs: HubDef[] = [
  {
    slug: "a-grains",
    label: "Machines à café à grains",
    h1: "Les meilleures machines à café à grains",
    intro:
      "Une machine à grains moud le café juste avant l'extraction : le goût en tasse et le coût par café changent nettement par rapport au pré-moulu. Le vrai arbitrage se joue sur trois points — type de broyeur, gestion du lait, facilité de nettoyage.",
    metaTitle: "Meilleure machine à café à grains : notre classement",
    metaDescription:
      "Classement des machines à café à grains par budget et usage : broyeur, système lait, entretien et coût par tasse comparés.",
    predicate: isType("grains"),
    sort: byScore,
  },
  {
    slug: "a-capsules",
    label: "Machines à capsules",
    h1: "Les meilleures machines à café à capsules",
    intro:
      "Une capsule, un bouton, une dizaine de secondes : zéro entretien, résultat constant. Le compromis se paie à la tasse (0,35 à 0,45 €) et sur les déchets. Le bon choix pour un à deux cafés par jour.",
    metaTitle: "Meilleure machine à café à capsules : notre sélection",
    metaDescription:
      "Machines à capsules Nespresso, Dolce Gusto et compatibles : prix, coût par capsule, compacité et polyvalence comparés.",
    predicate: isType("capsules"),
    sort: byScore,
  },
  {
    slug: "filtre",
    label: "Cafetières filtre",
    h1: "Les meilleures cafetières filtre",
    intro:
      "La cafetière filtre reste imbattable pour du café long servi en quantité, à petit prix. Avec un broyeur intégré, on garde l'essentiel du bénéfice du grain frais sans passer à l'espresso.",
    metaTitle: "Meilleure cafetière filtre : classement et conseils",
    metaDescription:
      "Cafetières filtre avec ou sans broyeur : capacité, programmation, verseuse isotherme et coût par tasse comparés.",
    predicate: isType("filtre"),
    sort: byScore,
  },
  {
    slug: "expresso",
    label: "Machines expresso",
    h1: "Les meilleures machines expresso",
    intro:
      "Une machine expresso à porte-filtre demande un geste — doser, tasser, purger — mais donne le contrôle total sur l'extraction. Le broyeur intégré et la puissance de la vapeur font la différence à l'usage.",
    metaTitle: "Meilleure machine expresso : notre classement",
    metaDescription:
      "Machines expresso à porte-filtre : broyeur intégré, pression, vapeur et courbe d'apprentissage comparées.",
    predicate: isType("expresso"),
    sort: byScore,
  },
  {
    slug: "automatiques",
    label: "Machines automatiques",
    h1: "Les meilleures machines à café automatiques",
    intro:
      "Une machine automatique enchaîne broyage, dosage et extraction d'une pression. Grains ou capsules, l'automatisation porte surtout sur le lait : buse manuelle ou carafe qui se nettoie seule.",
    metaTitle: "Meilleure machine à café automatique : classement",
    metaDescription:
      "Machines à café automatiques à grains et à capsules : système lait, recettes mémorisées, entretien et prix comparés.",
    predicate: (i) => i.type === "grains" || i.type === "capsules",
    sort: byScore,
  },
  {
    slug: "avec-broyeur",
    label: "Machines avec broyeur",
    h1: "Les meilleures machines à café avec broyeur intégré",
    intro:
      "Le broyeur intégré moud la dose juste avant l'extraction, ce qui préserve les arômes et abaisse le coût par tasse. Acier ou céramique, le nombre de crans utiles compte plus que le nombre affiché.",
    metaTitle: "Meilleure machine à café avec broyeur : notre sélection",
    metaDescription:
      "Machines à café à broyeur intégré : type de meule, réglage, bruit mesuré et entretien du groupe comparés.",
    predicate: (i) => i.type === "grains" || (i.type === "expresso" && /broyeur|barista|specialista/.test(hay(i))),
    sort: byScore,
  },
  {
    slug: "compactes",
    label: "Machines compactes",
    h1: "Les meilleures machines à café compactes",
    intro:
      "Pour un plan de travail réduit, l'encombrement passe avant le nombre de recettes. Les machines compactes gardent l'essentiel — un espresso correct, un réservoir amovible — dans moins de 25 cm de large.",
    metaTitle: "Meilleure machine à café compacte : classement petit espace",
    metaDescription:
      "Machines à café compactes pour petite cuisine : largeur, réservoir, poids et facilité d'accès comparés.",
    predicate: (i) => /compact|mini|dedica|essenza|pop|petit/.test(hay(i)) || i.tags.includes("petitespace"),
    sort: byScore,
  },
];

// ─── Par budget (menu « Par budget ») ───────────────────────────────────
type BudgetBand = { slug: string; label: string; min: number; max: number };
const BUDGET_BANDS: BudgetBand[] = [
  { slug: "moins-de-200", label: "Moins de 200 €", min: 0, max: 200 },
  { slug: "200-300", label: "200 – 300 €", min: 200, max: 300 },
  { slug: "300-500", label: "300 – 500 €", min: 300, max: 500 },
  { slug: "500-800", label: "500 – 800 €", min: 500, max: 800 },
  { slug: "800-1500", label: "800 – 1 500 €", min: 800, max: 1500 },
  { slug: "plus-de-1500", label: "Plus de 1 500 €", min: 1500, max: Infinity },
];

export const budgetHubs: HubDef[] = BUDGET_BANDS.map((b) => ({
  slug: b.slug,
  label: b.label,
  h1: `Les meilleures machines à café ${b.label.toLowerCase()}`,
  intro:
    b.max <= 300
      ? `Sous ${b.max} €, on trouve surtout des capsules et des premières machines à grains simples. La régularité en tasse compte plus que les options à ce niveau de prix.`
      : b.min >= 800
        ? `Au-delà de ${b.min} €, on paie l'extraction, les finitions et l'automatisation complète du lait. L'écart de goût avec le milieu de gamme reste réel mais moins marqué que l'écart de prix.`
        : `Entre ${b.min} et ${b.max === Infinity ? "plus" : b.max} €, les vraies automatiques à espresso arrivent : broyeur réglable, système lait, entretien guidé. C'est la tranche du meilleur rapport qualité-prix.`,
  metaTitle: `Meilleure machine à café ${b.label.toLowerCase()}`,
  metaDescription: `Notre sélection de machines à café ${b.label.toLowerCase()} : ce qu'on obtient vraiment à ce budget, sans surpayer les options.`,
  predicate: (i) => i.price >= b.min && i.price < b.max,
  sort: byPriceAsc,
}));

// ─── Par besoin (menu « Par besoin ») ───────────────────────────────────
export const besoinHubs: HubDef[] = [
  {
    slug: "meilleure-machine-cafe",
    label: "Meilleure machine à café",
    h1: "Quelle est la meilleure machine à café ?",
    intro:
      "La meilleure machine à café dépend d'abord de ce que vous buvez et du budget. Pour un usage familial polyvalent, une automatique à grains milieu de gamme reste le choix le plus sûr : bon café, entretien simple, coût par tasse bas.",
    metaTitle: "Meilleure machine à café : le comparatif",
    metaDescription:
      "Le classement des meilleures machines à café toutes catégories : grains, capsules, filtre et expresso, par profil d'usage.",
    predicate: () => true,
    sort: byScore,
  },
  {
    slug: "cappuccino",
    label: "Pour cappuccino",
    h1: "Les meilleures machines à café pour cappuccino",
    intro:
      "Pour un cappuccino quotidien sans effort, le critère est le système lait : une carafe automatique qui se nettoie en dix secondes plutôt qu'une buse manuelle qui demande un geste à chaque tasse.",
    metaTitle: "Meilleure machine à café pour cappuccino et latte",
    metaDescription:
      "Machines à café avec système lait automatique : carafe, mousse, nettoyage et recettes lactées comparés.",
    predicate: (i) => i.tags.includes("cappuccino") || /lattego|latte|eletta|barista smart|milk|specialista/.test(hay(i)),
    sort: byScore,
  },
  {
    slug: "silencieuse",
    label: "Machine silencieuse",
    h1: "Les machines à café les plus silencieuses",
    intro:
      "Dans une cuisine ouverte, le bruit du broyeur au réveil compte autant que la qualité en tasse. Les broyeurs à meules céramique et les carters mieux isolés gagnent plusieurs décibels sur la moyenne.",
    metaTitle: "Machine à café silencieuse : notre sélection",
    metaDescription:
      "Machines à café les moins bruyantes : type de meule, isolation acoustique et bruit mesuré au broyage comparés.",
    predicate: (i) => i.tags.includes("silencieuse") || /evidence|silent|discret|céramique|ceramique/.test(hay(i)),
    sort: byScore,
  },
  {
    slug: "familiale",
    label: "Machine familiale",
    h1: "Les meilleures machines à café pour une famille",
    intro:
      "Un foyer où chacun boit un café différent a besoin de profils mémorisés, d'un grand réservoir et d'un bac à grains généreux. La polyvalence prime sur la finesse d'extraction.",
    metaTitle: "Meilleure machine à café pour famille nombreuse",
    metaDescription:
      "Machines à café familiales : profils utilisateurs, capacité réservoir et bac à grains, nombre de recettes comparés.",
    predicate: (i) => i.tags.includes("famille") || /barista smart|melitta|20 boissons|profils/.test(hay(i)),
    sort: byScore,
  },
  {
    slug: "pas-chere",
    label: "Machine pas chère",
    h1: "Les meilleures machines à café pas chères",
    intro:
      "Sous 250 €, on choisit entre une machine à capsules sans entretien et une première machine à grains simple. Le coût par tasse sur deux ans départage souvent plus que le prix d'achat.",
    metaTitle: "Machine à café pas chère : le meilleur sous 250 €",
    metaDescription:
      "Machines à café abordables : capsules vs première machine à grains, coût par tasse et compromis assumés.",
    predicate: (i) => i.price > 0 && i.price < 250,
    sort: byPriceAsc,
  },
];

// ─── Par marque (menu « Marques suivies ») ──────────────────────────────
export function marqueSlug(brand: string): string {
  return brand
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // accents
    .replace(/['’]/g, "") // De'Longhi -> delonghi (aligné sur l'existant)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const marqueHubs: HubDef[] = megaBrands.map((brand) => ({
  slug: marqueSlug(brand),
  label: brand,
  h1: `Machines à café ${brand} : notre avis`,
  intro: `Notre sélection de machines à café ${brand}, du modèle d'entrée au haut de gamme, avec ce qui distingue chaque gamme et pour quel usage elle est faite.`,
  metaTitle: `Machines à café ${brand} : classement et avis`,
  metaDescription: `Toutes les machines à café ${brand} que nous suivons : gammes, prix, système lait et entretien comparés.`,
  predicate: (i) => i.brand.toLowerCase() === brand.toLowerCase(),
  sort: byScore,
}));

// ─── Lookups ───────────────────────────────────────────────────────────
export const ALL_HUBS: HubDef[] = [...typeHubs, ...besoinHubs, ...budgetHubs, ...marqueHubs];

export function findTypeHub(slug: string) {
  return typeHubs.find((h) => h.slug === slug);
}
export function findBudgetHub(slug: string) {
  return budgetHubs.find((h) => h.slug === slug);
}
export function findBesoinHub(slug: string) {
  return besoinHubs.find((h) => h.slug === slug);
}
export function findMarqueHub(slug: string) {
  return marqueHubs.find((h) => h.slug === slug);
}
