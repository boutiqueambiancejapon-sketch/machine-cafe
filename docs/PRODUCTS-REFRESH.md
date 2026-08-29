# Rafraîchissement de la base produits Amazon

## Coût réel de l'API (DataForSEO Merchant Amazon)

Tarifs DataForSEO au 29/08/2026 (file d'attente Standard, jusqu'à 45 min de
délai — largement suffisant pour un sync produit ou un refresh mensuel) :

| Tier | Prix / requête | Prix / 1000 requêtes |
| --- | --- | --- |
| Standard | 0,0015 $ | 1,50 $ |
| Priority (< 1 min) | 0,003 $ | 3,00 $ |

Sources : [Amazon API Pricing – DataForSEO](https://dataforseo.com/pricing/merchant/amazon-api), [merchant/amazon/overview – DataForSEO API v.3](https://docs.dataforseo.com/v3/merchant-amazon-overview/)

`amazon_sync_product` fait **1 requête DataForSEO par ASIN** (cache 24h côté
tool — un second sync du même ASIN dans les 24h ne recoûte rien).
`amazon_find_product` fait 1 requête par recherche (pas par résultat).

### Ce que ça coûte à l'échelle du site

| Scénario | Requêtes | Coût (Standard) |
| --- | --- | --- |
| Ingestion initiale de 200 produits (1 sync par ASIN) | 200 | **0,30 $** |
| + ~20 recherches `amazon_find_product` pour les découvrir | 20 | 0,03 $ |
| Refresh mensuel des 200 produits (`amazon_sync_all`) | 200 | **0,30 $/mois** |
| Refresh hebdomadaire à la place | 200 × 4,3 | ≈ 1,30 $/mois |

**Conclusion : le coût API n'est pas la contrainte.** Même à 500 produits
avec un refresh hebdomadaire, on reste sous 3,50 $/mois. La vraie raison de
limiter les appels est d'éviter les requêtes redondantes (relancer un
`amazon_find_product` avec la même requête plusieurs fois, ou syncer un ASIN
déjà à jour) — pas le budget.

### Cadence retenue

- **Ingestion** : `amazon_sync_product(asin, repo)` une fois par produit,
  au moment où on l'ajoute au catalogue.
- **Refresh** : 1×/mois via `amazon_sync_all(repo)` — vérifie que l'ASIN
  existe toujours, que le produit est toujours vendu (`is_available`), et
  met à jour prix / note / stock. Un refresh mensuel suffit largement pour
  du contenu éditorial (le prix affiché porte déjà la mention "relevé le
  {date}, susceptible de varier").

## Scheduled task mensuel

⚠️ **Contrainte à connaître avant d'activer ceci** : les tools `amazon_*` du
MCP nano-banana tournent sur ton Mac (serveur local, port 3200). Un scheduled
task s'exécute dans le cloud — pour qu'il puisse appeler `amazon_sync_all`,
il doit être **lié à ton ordinateur** (`requires_local_device: true`), et au
moment où il se déclenche, ton Mac doit être allumé, l'app Claude desktop
ouverte, et le serveur nano-banana lancé. Si l'une de ces conditions manque,
le run échoue silencieusement ce mois-là (pas de retry automatique) — le
prix affiché reste simplement celui du dernier refresh réussi, avec sa date
`price_checked_at`, donc aucun risque d'afficher une donnée fausse.

Configuration prévue (à créer une fois les tools `amazon_*` confirmés actifs — voir le blocage en cours, ci-dessous) :

- **Nom** : "Refresh mensuel — base produits machine-cafe"
- **Cron** : `0 6 1 * *` (le 1er de chaque mois, 6h UTC = 8h Europe/Brussels en été)
- **requires_local_device** : `true`
- **Prompt** : appeler `amazon_sync_all("boutiqueambiancejapon-sketch/machine-cafe")`
  via le MCP nano-banana, puis rapporter un résumé (produits mis à jour,
  produits `is_available: false`, éventuelles erreurs).

## Blocage actuel

Au 29/08/2026, le MCP nano-banana n'expose **aucun tool `amazon_*`** (ni
`amazon_find_product`, ni `amazon_sync_product`, ni `amazon_sync_all`, ni
`amazon_affiliate_link`, ni `amazon_product_details`, ni
`amazon_download_images`) — seulement `ds_*` (Retina dropshipping),
`github_*` et la génération d'image. Comme anticipé dans le brief initial,
c'est probablement que le serveur local n'a pas été rechargé après l'ajout
de ces tools. Tant que ce n'est pas résolu :

- impossible de faire l'ingestion réelle (étapes a/b du test de bout en
  bout : trouver puis synchroniser 2-3 ASIN de machines à café à grains) ;
- le scheduled task mensuel ci-dessus n'est pas encore créé.

**Action requise côté Mathias** : relancer le serveur nano-banana local
(`launch.command` ou `npm start` dans `nano-banana-app`), puis redemander la
suite — ingestion des premiers produits, création du scheduled task, et
test de bout en bout complet (blog + comparatif référençant les mêmes ASIN,
puis refresh et vérification que les deux contenus reflètent le nouveau prix).
