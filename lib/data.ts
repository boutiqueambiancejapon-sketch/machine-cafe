// Domain data — ported 1:1 from the Claude Design canvas (`Component` class in
// 10minutescafe.dc.html). Values are demo data: products and prices are examples.

export type ProductScores = {
  cafe: number;
  facilite: number;
  entretien: number;
  bruit: number;
  prix: number;
};

export type Product = {
  id: string;
  brand: string;
  model: string;
  type: string;
  price: number;
  score: number;
  badge: string;
  idealFor: string;
  pros: string[];
  con: string;
  s: ProductScores;
  tags: string[];
};

export const products: Product[] = [
  {
    id: "magnifica",
    brand: "De'Longhi",
    model: "Magnifica Evo",
    type: "À grains",
    price: 449,
    score: 9.1,
    badge: "Notre choix",
    idealFor: "les amateurs de café à grains qui veulent de la simplicité",
    pros: ["Espresso régulier", "Prise en main immédiate", "Groupe d'infusion amovible"],
    con: "Broyeur audible",
    s: { cafe: 9.2, facilite: 9.5, entretien: 8.7, bruit: 7.8, prix: 9.1 },
    tags: ["espresso", "long", "famille"],
  },
  {
    id: "philips5400",
    brand: "Philips",
    model: "5400 LatteGo",
    type: "À grains",
    price: 629,
    score: 8.9,
    badge: "Pour cappuccino",
    idealFor: "ceux qui boivent un cappuccino chaque matin",
    pros: ["Système lait sans tuyau", "Nettoyage en 15 s", "12 recettes"],
    con: "Interface tactile perfectible",
    s: { cafe: 8.8, facilite: 9.2, entretien: 9.4, bruit: 8.0, prix: 8.4 },
    tags: ["cappuccino", "famille"],
  },
  {
    id: "krups",
    brand: "Krups",
    model: "Evidence ECO",
    type: "À grains",
    price: 549,
    score: 8.6,
    badge: "Silencieuse",
    idealFor: "les cuisines ouvertes où le bruit compte",
    pros: ["Broyeur très discret", "Bonne finition", "Consommation basse"],
    con: "Mousseur un peu lent",
    s: { cafe: 8.5, facilite: 8.7, entretien: 8.4, bruit: 9.3, prix: 8.3 },
    tags: ["espresso", "petitespace"],
  },
  {
    id: "jura",
    brand: "Jura",
    model: "E8",
    type: "À grains",
    price: 1299,
    score: 9.3,
    badge: "Premium",
    idealFor: "les exigeants prêts à y mettre le prix",
    pros: ["Extraction remarquable", "Finitions irréprochables", "Entretien guidé"],
    con: "Prix élevé",
    s: { cafe: 9.6, facilite: 9.1, entretien: 9.0, bruit: 8.6, prix: 7.4 },
    tags: ["espresso", "cappuccino"],
  },
  {
    id: "melitta",
    brand: "Melitta",
    model: "Barista Smart",
    type: "À grains",
    price: 749,
    score: 8.8,
    badge: "Polyvalente",
    idealFor: "les foyers où chacun boit un café différent",
    pros: ["Deux trémies à grains", "21 recettes", "Profils utilisateurs"],
    con: "Encombrante",
    s: { cafe: 8.9, facilite: 8.5, entretien: 8.2, bruit: 7.9, prix: 8.6 },
    tags: ["famille", "cappuccino"],
  },
  {
    id: "sage",
    brand: "Sage",
    model: "Barista Express",
    type: "Expresso",
    price: 699,
    score: 8.7,
    badge: "Pour apprendre",
    idealFor: "ceux qui veulent maîtriser leur extraction",
    pros: ["Contrôle total", "Broyeur intégré", "Vapeur puissante"],
    con: "Courbe apprentissage réelle",
    s: { cafe: 9.4, facilite: 6.8, entretien: 7.5, bruit: 8.1, prix: 8.8 },
    tags: ["espresso"],
  },
  {
    id: "philips2200",
    brand: "Philips",
    model: "2200 Series",
    type: "À grains",
    price: 299,
    score: 8.3,
    badge: "Qualité / prix",
    idealFor: "un premier passage aux grains sans se ruiner",
    pros: ["Moins de 300 €", "Très simple", "Compacte"],
    con: "Pas de réglage fin",
    s: { cafe: 8.1, facilite: 9.3, entretien: 8.5, bruit: 7.6, prix: 9.4 },
    tags: ["long", "petitespace", "espresso"],
  },
  {
    id: "vertuo",
    brand: "Nespresso",
    model: "Vertuo Pop",
    type: "Capsules",
    price: 99,
    score: 8.2,
    badge: "Petit budget",
    idealFor: "un ou deux cafés par jour, sans entretien",
    pros: ["99 €", "Aucun réglage", "Très compacte"],
    con: "Coût par tasse élevé",
    s: { cafe: 7.8, facilite: 9.8, entretien: 9.2, bruit: 8.4, prix: 7.6 },
    tags: ["long", "petitespace"],
  },
];

export function productById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export type ConfigStep = { k: string; q: string; o: string[] };

export const steps: ConfigStep[] = [
  { k: "Type de café", q: "Quel type de café buvez-vous ?", o: ["Espresso", "Café long", "Cappuccino", "Latte", "Americano", "Plusieurs types"] },
  { k: "Simplicité", q: "Quel niveau de simplicité recherchez-vous ?", o: ["Je veux appuyer sur un bouton", "Je veux un peu de contrôle", "J'aime préparer mon café moi-même"] },
  { k: "Budget", q: "Quel budget avez-vous en tête ?", o: ["Moins de 200 €", "200 – 400 €", "400 – 700 €", "700 – 1 200 €", "Plus de 1 200 €"] },
  { k: "Volume", q: "Combien de cafés par jour ?", o: ["1 – 2", "3 – 5", "6 – 10", "Plus de 10"] },
  { k: "Lait", q: "Buvez-vous des boissons lactées ?", o: ["Jamais", "Parfois", "Souvent"] },
  { k: "Priorité", q: "Votre priorité avant tout ?", o: ["Qualité du café", "Simplicité", "Silence", "Prix", "Entretien", "Design", "Polyvalence"] },
];

export const recoIds = ["magnifica", "philips5400", "philips2200"];
export const recoTags = [
  "Le meilleur équilibre pour vous",
  "Si vous buvez des boissons lactées",
  "La même logique, moins cher",
];

export type Faq = { q: string; a: string };

export const faqData: Faq[] = [
  { q: "Faut-il détartrer souvent la Magnifica Evo ?", a: "La machine réclame un détartrage tous les 300 cafés environ, avec une eau de dureté moyenne. Le cycle prend 25 minutes et se déclenche depuis le panneau. Un filtre à eau permet d'espacer les cycles sans les supprimer." },
  { q: "Peut-elle faire un cappuccino ?", a: "Oui, via le mousseur manuel. Il faut tenir le pichet sous la buse une vingtaine de secondes et rincer ensuite. Pour un cappuccino sans geste, il faut passer sur une machine à système lait automatique." },
  { q: "Quelle différence avec la Magnifica S ?", a: "L'Evo ajoute un panneau à touches sensitives, un mousseur repensé et une meilleure isolation acoustique. L'extraction et le broyeur restent proches. À moins de 60 € d'écart, l'Evo se justifie ; au-delà, la S reste un très bon choix." },
  { q: "Quel café utiliser ?", a: "Des grains torréfiés pour espresso, achetés en petites quantités. Évitez les grains huileux très foncés, qui encrassent le broyeur. Le réglage 4 ou 5 sur la molette convient à la majorité des torréfactions du commerce." },
];

export type Spec = { k: string; v: string };

export const specsData: Spec[] = [
  { k: "Type", v: "Machine automatique à grains" },
  { k: "Broyeur", v: "Conique en acier, 13 réglages" },
  { k: "Pression", v: "15 bars" },
  { k: "Réservoir d'eau", v: "1,8 L amovible" },
  { k: "Bac à grains", v: "250 g" },
  { k: "Boissons", v: "Espresso, café long, americano, eau chaude, vapeur" },
  { k: "Système lait", v: "Buse vapeur manuelle" },
  { k: "Dimensions", v: "24 × 44,5 × 36 cm" },
  { k: "Poids", v: "9,4 kg" },
  { k: "Entretien", v: "Groupe d'infusion amovible, rinçage automatique" },
  { k: "Garantie", v: "2 ans constructeur" },
  { k: "Consommation veille", v: "< 0,5 W" },
];

export type TypeDef = { id: string; label: string };

export const typeDefs: TypeDef[] = [
  { id: "espresso", label: "Pour espresso" },
  { id: "cappuccino", label: "Pour cappuccino" },
  { id: "long", label: "Pour café long" },
  { id: "famille", label: "Pour une famille" },
  { id: "petitespace", label: "Pour petit espace" },
];

export const brandDefs = ["De'Longhi", "Philips", "Krups", "Jura", "Melitta", "Sage", "Nespresso"];

export const megaBrands = [
  "De'Longhi", "Philips", "Krups", "Jura", "Sage", "Melitta",
  "Siemens", "Saeco", "Nespresso", "Bosch", "Smeg", "Beko",
];

export const noteFilterValues = [0, 8, 8.5, 9];

export type Weight = { label: string; pctText: string; width: string };

export const weights: Weight[] = [
  { label: "Qualité du café", pctText: "25 %", width: "100%" },
  { label: "Facilité d'utilisation", pctText: "20 %", width: "80%" },
  { label: "Entretien", pctText: "15 %", width: "60%" },
  { label: "Rapport qualité/prix", pctText: "15 %", width: "60%" },
  { label: "Bruit", pctText: "10 %", width: "40%" },
  { label: "Fonctionnalités", pctText: "10 %", width: "40%" },
  { label: "Design", pctText: "5 %", width: "20%" },
];

export type GuideCard = { cat: string; title: string; meta: string; slug: string };

// The source canvas routes every guide card to the same single guide view;
// kept 1:1 here (one authored article), so all cards point at it.
export const guides: GuideCard[] = [
  { cat: "Guide d'achat", title: "Machine à grains ou machine à capsules ?", meta: "9 min · mis à jour en août", slug: "grains-ou-capsules" },
  { cat: "Entretien", title: "Détartrer sa machine sans l'abîmer", meta: "6 min · mis à jour en juillet", slug: "grains-ou-capsules" },
  { cat: "Technique", title: "Quelle pression faut-il vraiment pour un espresso ?", meta: "7 min · mis à jour en mai", slug: "grains-ou-capsules" },
  { cat: "Budget", title: "Combien coûte réellement un café à la maison ?", meta: "8 min · mis à jour en août", slug: "grains-ou-capsules" },
];

export const guideSlugs = ["grains-ou-capsules"];

export type TestScore = { label: string; v: number };

export const testScores: TestScore[] = [
  { label: "Qualité du café", v: 9.2 },
  { label: "Facilité d'utilisation", v: 9.4 },
  { label: "Entretien", v: 8.6 },
  { label: "Bruit", v: 7.8 },
  { label: "Design", v: 9.0 },
  { label: "Rapport qualité/prix", v: 9.1 },
];

// [critère, valeur A, valeur B, gagnant (0 = égalité, 1 = A, 2 = B)]
export const versusRows: [string, string, string, number][] = [
  ["Prix indicatif", "449 €", "629 €", 1],
  ["Type", "Automatique à grains", "Automatique à grains", 0],
  ["Broyeur", "Acier, 13 réglages", "Céramique, 12 réglages", 2],
  ["Pression", "15 bars", "15 bars", 0],
  ["Réservoir", "1,8 L", "1,8 L", 0],
  ["Bac à grains", "250 g", "275 g", 2],
  ["Boissons", "4 recettes", "12 recettes", 2],
  ["Système lait", "Buse manuelle", "LatteGo automatique", 2],
  ["Bruit mesuré", "68 dB", "64 dB", 2],
  ["Dimensions", "24 × 44,5 × 36 cm", "24,6 × 37,1 × 43,3 cm", 1],
  ["Entretien", "Groupe amovible", "Groupe amovible + lait 15 s", 2],
  ["Garantie", "2 ans", "2 ans", 0],
  ["Note globale", "9,1 / 10", "8,9 / 10", 1],
];

export type BrandPick = {
  badge: string;
  model: string;
  idealFor: string;
  scoreText: string;
  priceText: string;
};

export const brandPicks: BrandPick[] = [
  { badge: "Notre choix", model: "Magnifica Evo", idealFor: "les amateurs de grains qui veulent de la simplicité", scoreText: "9,1", priceText: "449 €" },
  { badge: "Petit budget", model: "Dedica Arte", idealFor: "un expresso à porte-filtre dans très peu de place", scoreText: "8,4", priceText: "189 €" },
  { badge: "Premium", model: "Eletta Explore", idealFor: "les boissons lactées froides et chaudes sans effort", scoreText: "9,0", priceText: "899 €" },
];

// ─── Static params for the SEO routes (one authored entry per template in the
//     source design; add more here as content grows). ───
export const testSlugs = ["magnifica-evo"];
export const versusSlugs = ["delonghi-vs-philips"];
export const categorieSlugs = ["a-grains"];
export const marqueSlugs = ["delonghi"];
