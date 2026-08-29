// lib/products/types.ts — miroir exact du schéma data/products/{ASIN}.json
// (voir data/products/README.md). Ne pas ajouter de champ ici sans l'ajouter
// aussi côté écriture (amazon_sync_product du MCP nano-banana).

export type Product = {
  asin: string;
  marketplace: string;
  title: string;
  brand: string;
  affiliate_url: string;
  /** Seul champ prix à afficher — jamais price_from / price_to. */
  price_display: string;
  /** INTERNE — usage cron uniquement, ne jamais afficher. */
  price_from: number | null;
  /** INTERNE — usage cron uniquement, ne jamais afficher. */
  price_to: number | null;
  currency: string;
  /** Date de relevé — à afficher à côté de price_display. */
  price_checked_at: string;
  rating: number | null;
  reviews_count: number | null;
  is_available: boolean;
  /** CDN Amazon — hotlink uniquement, jamais rehébergé. */
  image_url: string;
  /** CDN Amazon — hotlink uniquement, jamais rehébergé. */
  images: string[];
  categories: string[];
  /** Chaînes "Clé : valeur" — parser avec parseSpec() (lib/products/specs.ts). */
  specs: string[];
  description: string;
  /** Mention de divulgation Partenaires Amazon — à afficher sur toute page avec lien affilié. */
  disclosure: string;
  synced_at: string;
  source: string;
};
