# data/products/ — base produits Amazon partagée

Un fichier par produit : `data/products/{ASIN}.json`. C'est la source unique
de vérité pour tout contenu du site (article de blog, comparatif, fiche test)
qui parle d'un produit Amazon. N'importe quel contenu qui référence le même
ASIN affiche exactement les mêmes chiffres (prix, note, image, specs, lien
affilié) — un seul appel API par produit, peu importe combien de pages en
parlent.

## ⚠️ Règle — ne jamais éditer ces fichiers à la main

Ces fichiers sont écrits uniquement par les tools `amazon_sync_product` /
`amazon_sync_all` du MCP nano-banana. Toute édition manuelle sera écrasée au
prochain refresh. Pour ajouter un produit : `amazon_sync_product(asin, repo)`.
Pour tout rafraîchir : `amazon_sync_all(repo)` (voir `docs/PRODUCTS-REFRESH.md`).

## Schéma exact

```jsonc
{
  "asin": "B0XXXXXXXX",
  "marketplace": "amazon.fr",
  "title": "…",
  "brand": "…",
  "affiliate_url": "https://www.amazon.fr/dp/B0XXXXXXXX/?tag=ambiancejap0a-21",
  "price_display": "à partir de 89 €",        // À AFFICHER
  "price_from": 89.99,                          // INTERNE cron — NE JAMAIS AFFICHER
  "price_to": null,                              // idem
  "currency": "EUR",
  "price_checked_at": "2026-08-29",             // date à afficher à côté du prix
  "rating": 4.4,
  "reviews_count": 73,
  "is_available": true,
  "image_url": "https://m.media-amazon.com/images/I/....jpg",   // CDN Amazon (hotlink)
  "images": ["https://m.media-amazon.com/images/I/....jpg"],    // CDN Amazon (hotlink)
  "categories": ["Cuisine & Maison", "…", "Machines à espresso"],
  "specs": ["Puissance en watts : 1450 Watts", "Pression : 15 bar"],  // "Clé : valeur"
  "description": "À propos de cet article  …",
  "disclosure": "En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises.",
  "synced_at": "2026-08-29T11:10:25.712Z",
  "source": "dataforseo"
}
```

## Comment le contenu lit ces fichiers

Via `lib/products/read.ts` — jamais de `fetch` au runtime, tout est lu du
filesystem au build (RSC) :

```ts
import { getAmazonProduct, getAmazonProducts } from "@/lib/products/read";

const machine = getAmazonProduct("B0XXXXXXXX"); // Product | null
const trio = getAmazonProducts(["B0AAA", "B0BBB", "B0CCC"]); // Product[] — throw si un ASIN manque
```

Dans le contenu MDX (blog, comparatif, fiche test), on ne touche jamais ces
helpers directement : on utilise `<ProductRef asin="…" variant="card|inline|cta" />`
et `<ProductComparison asins={[…]} />` — voir `components/ProductRef.tsx` et
`components/ProductComparison.tsx`.

## Conformité Partenaires Amazon (non négociable)

- **Jamais** `price_from` / `price_to` à l'écran — uniquement `price_display`
  + la date de relevé (`price_checked_at`).
- Images servies depuis `m.media-amazon.com` en hotlink direct — jamais de
  copie dans `public/` (voir `next.config.ts` → `images.remotePatterns`).
- La phrase `disclosure` doit être visible sur toute page contenant un lien
  affilié Amazon (le composant `<ProductRef variant="card">` l'affiche ;
  les pages qui n'utilisent que `inline`/`cta` doivent inclure
  `<ProductDisclosure />` une fois sur la page).
- Tout lien vers Amazon (`affiliate_url`) : `rel="sponsored nofollow noopener"`,
  `target="_blank"`.

## Rafraîchissement

Voir `docs/PRODUCTS-REFRESH.md` — refresh mensuel automatisé via
`amazon_sync_all`, plus le calcul de coût réel (API DataForSEO).
