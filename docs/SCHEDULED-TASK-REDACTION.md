# Tâche planifiée — rédaction quotidienne

Un contenu par jour, commité directement sur `main` (Vercel déploie).
Cadence retenue avec Mathias : **1/jour, commit direct**.

## Prérequis à chaque exécution

- **`requires_local_device: true`** : la tâche appelle le MCP `nano-banana`
  (serveur local `:3200`) pour les données produit Amazon. Le Mac doit être
  allumé, l'app Claude ouverte, le serveur nano-banana lancé. Sinon : le run
  échoue proprement ce jour-là, aucun contenu publié, on reprend le lendemain.
- MCP `nano-banana` : GitHub connecté sur `boutiqueambiancejapon-sketch`
  (droits d'écriture sur `machine-cafe`), clés DataForSEO présentes.

## Ce que fait la tâche, étape par étape

1. **Lire la file.** `github_read_file` sur `content/calendrier-edito.md`.
   Prendre la première ligne `todo` par ordre `P1 > P2 > P3`, puis de haut en
   bas. Rien de `todo` → ne rien faire, signaler « file vide ».

2. **Charger les règles.** `github_read_file` sur
   `docs/SEO-GEO-REDACTION.md` et `.claude/skills/boileau/SKILL.md`.
   Charger aussi le skill de session `seo-geo-redaction` s'il est disponible.
   Lire `docs/AUTHOR-camille.md` pour la voix.

3. **Analyse concurrentielle.** `WebSearch` sur le mot-clé cible. Relever
   angle, structure, FAQ, longueur des 3 premiers résultats. Trouver le
   *content gap* (mesure ou arbitrage absent des concurrents).

4. **Synchroniser les produits.** Pour chaque ASIN de la ligne :
   `amazon_sync_product(asin, "boutiqueambiancejapon-sketch/machine-cafe")`.
   Si un ASIN ne se résout pas (produit introuvable), **abandonner cette
   ligne**, passer à la suivante et le noter dans le rapport. Ne jamais citer
   un ASIN absent de `data/products/`.

5. **Rédiger** selon le gabarit de `docs/SEO-GEO-REDACTION.md §12`
   correspondant au `Format` de la ligne (`blog` / `comparatif` / `avis`) :
   - Frontmatter complet : `title`, `description` (< 155 c.), `date` (jour du
     run, ISO), `updatedAt` (idem), `author: "camille"`, `keyword`, `tags`
     (3-5), `tldr` (2-3 puces).
   - 1 200-2 000 mots (blog), 1 400-2 200 (comparatif), 900-1 500 (avis).
   - H2 en questions, réponse < 60 mots sous chaque H2 (chunks GEO autonomes).
   - Multi-produits : 2-3 H3 questions **variées** par produit (boileau §25),
     jamais de `**Ce qui marche / cloche**` parallèle.
   - `<ProductComparison asins="B0AAA, B0BBB" />` (chaîne, pas de tableau JSX)
     + `<ProductRef asin="..." />` pour chaque produit.
   - FAQ : 6+ questions, via `<FaqItem question="...">` (rend un `<h3>`).
   - 2-4 liens internes contextuels, dont **au moins un vers le `Hub` de la
     ligne** et un vers un contenu existant (`getAllContentDocs` / le blog).
   - `<ProductDisclosure />` en fin d'article.
   - Style : appliquer les 25 règles boileau **dès le premier jet**. Aucun
     mot de la liste §2 sans chiffre derrière. Typo FR (guillemets `« »`,
     insécables). Au moins un défaut par produit, au moins un anti-conseil.

6. **Publier.** `github_write_file` sur
   `content/{blog|comparatifs|tests}/{slug}.mdx` (le `Slug` de la ligne ;
   `tests/` pour le format `avis`). `overwrite: false` — si le fichier existe
   déjà, marquer la ligne `done` sans réécrire et passer.

7. **Mettre à jour la file.** Réécrire `content/calendrier-edito.md` en
   passant la ligne traitée de `todo` à `done`. Commit groupé avec l'étape 6
   si possible.

8. **Rapport.** Résumer : ligne traitée, slug publié, ASIN synchronisés,
   nombre de mots, commit. En cas d'échec (aucun ASIN résolu, file vide,
   serveur injoignable), le dire clairement — pas de contenu bâclé publié.

## Garde-fous

- **Jamais** de prix `price_from` / `price_to` à l'écran — `price_display` seul.
- **Jamais** d'ASIN inventé. **Jamais** de statistique non sourcée.
- **Un seul** contenu par run. Pas de rattrapage multiple.
- Si le score anti-IA mental n'est pas bon (§13 checklist boileau), réécrire
  avant commit — ne pas publier une V1 douteuse.
- La tâche ne touche qu'à `content/` et `content/calendrier-edito.md`. Jamais
  au code, aux composants, aux hubs.

## Modifier la cadence / la file

- Ajouter des sujets : nouvelles lignes dans `content/calendrier-edito.md`.
- Mettre en pause un sujet : statut `hold`.
- Changer la fréquence : éditer la tâche planifiée (voir `/tasks` dans Claude
  Code, ou le gestionnaire de routines).
