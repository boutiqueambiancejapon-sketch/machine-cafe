# DECISIONS.md

Journal des décisions d'architecture prises sans qu'elles soient toutes
explicitement spécifiées dans le brief — pour que la prochaine session
(humaine ou Claude) comprenne le pourquoi sans avoir à le redécouvrir.

## 2026-08-29 — Fondations alignées sur toutougourmet / robot-tondeuse

machine-cafe était un site 100% statique (`lib/data.ts` + pages `.tsx`,
aucun MDX). Sur demande, on a porté la stack de contenu de `toutougourmet`
(la plus simple des deux références — `robot-tondeuse` est en plus branché
sur un CMS interne `cms.config.ts`/`app/admin`, hors scope ici) :

- `next-mdx-remote/rsc` + `gray-matter` + `remark-gfm` (pas `@next/mdx` —
  inutile ici puisque le contenu est lu depuis `content/` via `fs`, pas
  compilé comme route Next).
- `lib/mdx.ts` : mêmes fonctions que toutougourmet (`getAllBlogPosts`,
  `getBlogPost`, `extractFaqs`, `estimateReadTime`), étendu à 3 dossiers
  (`content/blog`, `content/comparatifs`, `content/tests`) au lieu de 2.
- `components/mdx/MdxComponents.tsx` : **mêmes noms de composants et mêmes
  props** que toutougourmet (`InfoBox`, `Callout`, `StatRow`/`Stat`,
  `CompareTable` family, `Verdict`, `ProsConsList`/`ProsBlock`/`ConsBlock`,
  `FaqList`/`FaqItem`, `SectionDivider`, `BodyImage`) — pour que la
  rédaction MDX reste identique d'un site à l'autre. Seul le rendu change :
  machine-cafe n'a pas Tailwind/CSS vars (`README.md` du repo : "aucune
  dépendance UI externe"), donc tout est re-skinné en styles inline avec la
  palette éditoriale existante (`#B77945` ambre, `#241B17` texte, etc.).

**Portée volontairement limitée** : `/blog` est entièrement nouveau (le site
n'avait pas de blog). Pour `/tests/[slug]` et `/comparatifs/[slug]`, qui
avaient déjà un gabarit structuré riche (accordéons specs+FAQ, tableau
face-à-face) piloté par `lib/data.ts` pour une unique démo (Magnifica Evo,
De'Longhi vs Philips), on a ajouté un **fallback additif** : si
`content/tests/{slug}.mdx` (resp. `comparatifs`) existe, il prend le pas sur
le gabarit structuré pour ce slug ; sinon rien ne change. Alternative
écartée : migrer entièrement ces deux gabarits vers MDX — trop invasif pour
ce ticket, et les gabarits démo actuels n'ont pas vocation à devenir des
articles MDX.

## 2026-08-29 — data/products/ à la racine, pas dans l'arbo emd-template

machine-cafe ne suit PAS la structure emd-template (pas de `content/produits/`
YAML, pas de `niche.config.ts`, pas de `packages/cms`) — c'est un site porté
directement d'un canvas Claude Design, plus léger. `emd-template` lui-même
n'a aucune convention de dossier `data/` pour du contenu produit synchronisé
automatiquement (son `content/produits/*.yaml` est un système différent :
produits saisis à la main, multi-liens affiliés, lu par `lib/products.ts`).
On a donc choisi `data/products/{ASIN}.json` à la racine du repo — parallèle
naturel à `content/`, sans collision avec un système existant.

## 2026-08-29 — getAmazonProduct/getAmazonProducts, pas getProduct

emd-template définit déjà `getProduct(slug): Product | null` dans
`lib/products.ts` (lit `content/produits/*.yaml`, produits saisis à la
main). Pour éviter toute confusion si machine-cafe adopte un jour d'autres
conventions du template, les helpers de lecture de `data/products/` sont
nommés `getAmazonProduct(asin)` / `getAmazonProducts(asins)`
(`lib/products/read.ts`) — même verbe, préfixe explicite sur la source des
données.

## 2026-08-29 — Exception hotlink CDN Amazon

`emd-template/CLAUDE.md` interdit les "images hotlinkées depuis un CDN
tiers". Cette règle vise picsum/unsplash/placeholder — pas les visuels
produit Amazon, où le hotlink vers `m.media-amazon.com` est la pratique
attendue par le programme Partenaires (jamais de copie permanente dans
`public/`, voir `data/products/README.md`). machine-cafe n'importe pas ce
`CLAUDE.md`, donc pas de conflit direct ici — mais si le repo adopte un jour
les règles qualité du template, il faudra y documenter cette exception
explicitement (le fichier lui-même prévoit ce cas : "documenter dans
DECISIONS.md").

## 2026-08-29 — Specs produit : whitelist hybride + intersection auto

Décidé avec Mathias (2 questions tranchées) :
- `<ProductRef variant="card">` : whitelist de specs par catégorie de
  produit (`lib/products/specs.ts`), avec un prop `specs` optionnel pour
  forcer une liste différente au cas par cas.
- `<ProductComparison>` : intersection automatique des specs communes aux
  produits comparés, avec un prop `specs` optionnel pour forcer une liste
  (utile si les libellés Amazon diffèrent légèrement d'un produit à
  l'autre — l'intersection stricte peut rater des correspondances).

## En attente

Le MCP nano-banana n'expose pas encore les tools `amazon_*` décrits dans le
brief — voir `docs/PRODUCTS-REFRESH.md` § Blocage actuel. Tant que ce n'est
pas résolu : pas de vrai produit dans `data/products/`, pas de scheduled
task de refresh créé, pas de test de bout en bout (find → sync → contenu →
resync) exécuté.
