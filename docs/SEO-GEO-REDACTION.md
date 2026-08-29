# Guide SEO & GEO — Rédaction (10minutescafe)

Référence unique pour tout contenu rédigé sur le site. Lire AVANT la première
ligne de tout article ou page de contenu. Le skill `.claude/skills/boileau`
complète ce guide côté style français anti-marqueurs-IA.

---

## 1. Philosophie rédactionnelle

Chaque contenu répond à une seule question : **pourquoi lire cette page plutôt qu'une autre ?**

Trois piliers : **expertise, preuve, utilité.**

- **Expertise** : chaque affirmation est traçable (fiche constructeur, test nommé, mesure perso, raisonnement)
- **Preuve** : données chiffrées (bar, dB, g, €, secondes), exemples concrets, cas réels
- **Utilité** : chaque paragraphe fait avancer le lecteur vers une décision d'achat ou un geste (détartrage, réglage broyeur)

**Posture** : écrire comme un ancien barista qui parle à un ami qui veut s'équiper. Voix directe, parfois tranchée, jamais neutre au point d'être creuse.

---

## 2. Anti-patterns IA — à bannir dès le premier jet

Le détail complet est dans `.claude/skills/boileau/SKILL.md` (25 règles). L'essentiel :

**Mots interdits sans fait derrière** : crucial, essentiel, incontournable, révolutionnaire, game-changer, robuste, innovant, véritable (antéposé), expérience ultime.
Si tu veux dire « crucial », mets un chiffre : *« sans filtre à eau, le détartrage tombe tous les 200 cafés au lieu de 400 »*.

**Formules creuses** : « Dans le monde actuel… », « Il est important de noter que… », « Nous allons voir dans cet article… », « En conclusion, nous pouvons dire… ».

**Structures interdites** : *Ce n'est pas X, c'est Y* · *Bien plus qu'une simple machine* · *Loin d'être X* · *La vraie question n'est pas* · *X est moins Y qu'on ne le pense*.

**Structurel** : introduction > 3 bullets > conclusion ; chaque H2 suivi de 3 puces identiques ; sections de longueur égale ; définition systématique de chaque terme ; conclusion qui referme au lieu d'ouvrir.

**Test avant publication** : au moins 2 détecteurs IA, seuil « humain » ≥ 85 %.

---

## 3. Avant de rédiger

### Analyse concurrentielle (obligatoire)
- Les 3 premiers résultats Google sur le mot-clé cible
- Noter : angle, structure H2, longueur, FAQ, données structurées
- Trouver le *content gap* : la mesure ou l'arbitrage que personne ne donne (coût par tasse réel, bruit mesuré, pression utile vs annoncée)

### Intention de recherche
| Type | Signal | Réponse attendue |
|---|---|---|
| Informationnelle | « qu'est-ce que », « comment », « pourquoi » | Réponse directe dès le premier paragraphe |
| Transactionnelle | « meilleure », « comparatif », « avis », « prix » | `<ProductComparison>` + `<ProductRef>` + verdict |
| Navigationnelle | nom de marque, nom de modèle | Fiche produit ou guide d'achat de la marque |

### Questions satellites
Lister les 5 questions les plus cherchées autour du sujet (People Also Ask, autocomplétion Google, forums café). Chacune est couverte dans le corps ou la FAQ.

---

## 4. Structure d'article

### Squelette obligatoire
```
H1 — mot-clé principal + année dynamique si « édition courante »
  Chapô — réponse directe en 2-3 phrases (position zéro)
  TL;DR — 3 bullets max (si article > 600 mots)

H2 — sous-thème 1 (question si possible)
  Réponse directe dès la première phrase (< 60 mots)
  Développement, données, exemple
  Lien interne contextuel

H2 — sous-thème 2
  ...

H2 — FAQ (6 questions minimum, 1 H3 par question)
  JSON-LD FAQPage généré automatiquement

AuthorBox en bas d'article
```

### Longueur cible
| Type | Mots | FAQ min |
|---|---|---|
| Article blog | 1 200 – 2 000 | 6 |
| Page pilier / guide | 2 000 – 3 500 | 8 |
| Avis / test produit | 900 – 1 500 | 6 |
| Comparatif | 1 400 – 2 200 | 6 |

### Densité et lisibilité
| Élément | Cible |
|---|---|
| Densité mot-clé principal | 0,5 % – 1,5 % |
| Longueur paragraphe | 3 – 5 phrases |
| Longueur phrase | 15 – 25 mots, alternées avec des phrases courtes |
| Ratio texte / listes | ≥ 70 % texte courant |

**Règle des 3 premiers paragraphes** : le mot-clé principal, sa définition contextuelle et la promesse de valeur apparaissent avant le premier H2.

---

## 5. SEO on-page

### Titres et meta
- `title` : mot-clé en début + différenciateur en fin — max 60 caractères
- `description` : réponse directe à l'intention + verbe d'action — max 155 caractères
- H1 unique, variante naturelle du title (jamais identique mot pour mot)
- Hiérarchie stricte H1 > H2 > H3, aucun saut

### H2 formulés en questions
Les H2 interrogatifs correspondent aux requêtes réelles (PAA, recherche vocale) et signalent aux LLM une section extractible.

| Format | Exemple café |
|---|---|
| Comment… | Comment choisir son broyeur ? |
| Pourquoi… | Pourquoi mon espresso coule trop vite ? |
| Quelle différence… | Broyeur acier ou céramique ? |
| Quand… | Quand détartrer sa machine à grains ? |
| Faut-il… | Faut-il vraiment 15 bars pour un bon espresso ? |

**Règle** : le premier paragraphe sous un H2 interrogatif contient la réponse en moins de 60 mots.

### Années dynamiques
« Meilleure machine à café 2026 », « Guide 2026 » → `currentYear()` côté serveur, jamais en dur. Date historique (« sortie en 2019 ») → string littérale.

### Mots-clés et enrichissement sémantique
- Mot-clé principal dans : H1, premier paragraphe, 1 H2, meta description, alt image
- 3 à 5 variantes sémantiques (LSI) dans les autres H2/H3 : *machine automatique*, *percolateur*, *cafetière à grains*, *broyeur intégré*, *système lait*
- Entités attendues : marques (De'Longhi, Philips, Jura, Sage, Krups, Melitta, Nespresso), concepts (crema, TDS, pré-infusion, purge, LatteGo)

### Images
- `alt` descriptif (le contenu de l'image, pas « photo de machine »)
- `next/image` uniquement — jamais de `<img>` nu, sauf visuel produit Amazon (`m.media-amazon.com`, hotlink, cf. `data/products/README.md`)
- `priority` sur la seule image LCP above-fold

---

## 6. GEO — moteurs génératifs

Les moteurs génératifs (ChatGPT, Perplexity, Gemini, Claude) cherchent la source qui mérite d'être citée. Le contenu doit être **extractible, citable, attribuable**.

### Les 6 critères GEO
1. **Citabilité directe** — chaque section a au moins une phrase autonome : `[Sujet] est/fait [attribut] parce que [raison concrète].`
2. **Autorité de source** — `Selon [source] ([année]), [stat].` Fiche constructeur, test nommé, mesure perso datée.
3. **Structuration Q&R** — questions en H2/H3, réponse dans les 50 premiers mots.
4. **Définitions opérationnelles** — pour tout concept central, une définition courte et originale dans les 200 premiers mots.
5. **Données chiffrées** — au moins un tableau, une comparaison ou une stat mise en contexte par article.
6. **Fraîcheur signalée** — date de mise à jour visible + `dateModified` en JSON-LD.

### Architecture en chunks autonomes
Chaque H2 doit exister comme réponse standalone à sa question de titre.
```
[CHUNK 1] Intro : réponse directe en < 80 mots
[CHUNK 2] H2 interrogatif + réponse (< 60 mots) + développement (100-200 mots)
[CHUNK 3] Tableau précis + phrase de verdict
[CHUNK 4] Liste numérotée d'étapes avec verbes d'action (si tutoriel)
[CHUNK 5] Nuance / exception (« sauf si… », « attention quand… »)
[CHUNK 6] FAQ : questions telles que tapées, réponses < 80 mots
```
**Transitions** : pas de phrase-pont générique (« Maintenant que nous avons vu X… »). Terminer le chunk sur sa conclusion, commencer le suivant directement.

### E-E-A-T
- **Experience** : un test réel, une mesure, un cas vécu (« trois semaines, deux cafés/jour »)
- **Expertise** : vocabulaire maîtrisé, nuances, limites exposées
- **Authoritativeness** : citation de fiches constructeur, de tests tiers
- **Trustworthiness** : sources datées, auteur identifié (`data/authors.ts`), date visible

---

## 7. Listes et tableaux

### Tableau si
- Comparaison de 3+ items sur 3+ critères
- Données chiffrées (prix, specs, scores)
- Toujours un header descriptif, suivi d'une phrase de verdict

### Liste à puces si
- Énumération sans ordre naturel, 4 à 8 items
- Sous 4 items : écrire en prose
- Items de longueur variée, au moins un qui nuance ou contredit l'intuition

```
Robotique :
- Optimiser le réglage du broyeur
- Améliorer la mousse de lait
- Choisir de bons grains

Humain :
- Broyeur : commencer au cran du milieu, affiner par quart de tour selon le temps d'écoulement
- Mousse : lait entier bien froid, buse juste sous la surface les 3 premières secondes
- Grains : torréfaction espresso achetée en petite quantité, jamais les grains huileux très foncés
```

### Liste numérotée si
Processus où l'ordre compte (détartrage, réglage, top N avec justification de rang).

### Format featured snippet
Puces pour les « top X » et « comment faire », tableau pour les comparatifs, paragraphe 40-60 mots pour les définitions.

---

## 8. Maillage interne

- 2 à 4 liens internes contextuels par article
- Lien vers la page pilier de la catégorie (`/machines/[type]`, `/machines/besoin/[besoin]`)
- Lien vers 1-2 articles de la même catégorie + 1 d'une autre (maillage transversal)
- Ancres descriptives, jamais « cliquez ici » / « lire la suite »
- Max 1 lien externe par 500 mots (vers source de référence)
- Breadcrumbs : Accueil > Catégorie > Article + JSON-LD BreadcrumbList sur toutes les pages sauf Home

### Pages piliers
`/machines/[type]` (grains, capsules, filtre, expresso) et `/machines/besoin/[besoin]` sont les piliers. Tout article de la catégorie pointe vers son pilier.

---

## 9. Liens externes, sources, affiliation

- Chiffres et stats : toujours sourcés (fiche constructeur, test nommé et daté, mesure perso)
- Sources primaires préférées (constructeur, études publiées, médias reconnus)
- Liens externes : `target="_blank" rel="noopener"` (sauf affiliés)

### Liens affiliés Amazon
- Toujours via `<ProductRef>` / `<ProductComparison>` / `affiliate_url` de `data/products/{ASIN}.json`
- `rel="sponsored nofollow noopener"`, `target="_blank"`
- Prix : jamais `price_from` / `price_to` bruts — uniquement `price_display` (« à partir de X € ») + `price_checked_at`
- Images produit : hotlink `m.media-amazon.com`, jamais de copie dans `public/`
- Mention de divulgation (`<ProductDisclosure />`) visible sur toute page avec lien affilié

---

## 10. Données structurées (JSON-LD)

| Page | Schemas obligatoires |
|---|---|
| Home | WebSite |
| Article / blog | Article + Person + BreadcrumbList + FAQPage |
| Comparatif | Article + BreadcrumbList + FAQPage + ItemList |
| Avis / test | Article + Person + BreadcrumbList + FAQPage |
| Page auteur | Person |
| Hub (`/machines/*`, `/marques/*`) | BreadcrumbList + ItemList |

### Article (champs)
```json
{
  "@type": "Article",
  "headline": "...",
  "author": { "@type": "Person", "name": "Camille Ferrand", "url": "/auteurs/camille" },
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "publisher": { "@type": "Organization", "name": "10minutescafe" },
  "description": "..."
}
```

---

## 11. FAQ

- **6 questions minimum** par article, 8 pour les pages piliers
- **1 H3 par question** — jamais une question en simple gras ou en `<summary>` nu. Le composant `<FaqItem>` rend un `<h3>` : l'utiliser systématiquement.
- Questions formulées comme les utilisateurs les tapent (langage naturel)
- Réponse directe en première phrase (< 60 mots), développement ensuite
- JSON-LD FAQPage généré côté serveur (via `extractFaqs()` de `lib/mdx.ts`)
- Pas de FAQ générique : chaque question apporte une info unique

### Sources de questions
1. Google « People Also Ask » sur le mot-clé
2. Autocomplétion Google
3. Forums café (Reddit r/Coffee, forums torréfaction FR)
4. Questions réelles des utilisateurs du site

---

## 12. Gabarits par format

### Guide d'achat / top X (multi-produits)
```
H1 — Meilleure machine à café [type] en [année]
  Intro (100-150 mots) : ce qui distingue vraiment ces machines + méthode de sélection
H2 — Comment on a choisi (critères + pondération)
## 1. [Marque Modèle] — [angle en une ligne]
  ### [H3 question variée nº1] → réponse < 60 mots + chiffre
  ### [H3 question variée nº2]
  <ProductRef asin="B0..." />
## 2. [Marque Modèle] — …
  (H3 questions DIFFÉRENTES du produit 1 — voir boileau §25)
H2 — Tableau comparatif → <ProductComparison asins="..." /> + phrase de verdict
H2 — Pour quel profil chaque machine
H2 — FAQ (H3 par question)
```

### Comparatif A vs B
```
H1 — [A] vs [B] : lequel choisir en [année]
  Intro : contexte + critères annoncés
<ProductComparison asins="B0AAA, B0BBB" />
H2 — Présentation [A]  → <ProductRef asin="B0AAA" />
H2 — Présentation [B]  → <ProductRef asin="B0BBB" />
H2 — Ce qui les sépare vraiment (2-3 critères d'arbitrage, pas la liste des specs)
H2 — Pour quel profil choisir [A] ?
H2 — Pour quel profil choisir [B] ?
H2 — Notre verdict  → <Verdict>
H2 — FAQ
```

### Avis / test solo
```
H1 — [Marque Modèle] : test et avis après [durée]
  Intro : verdict en 2 phrases + prix à date
H2 — Prise en main et installation
H2 — La qualité en tasse (mesures : TDS, température, temps d'écoulement)
H2 — Le système lait à l'usage
H2 — Bruit et entretien (dB mesuré, cycle de détartrage)
H2 — Ce qui pourrait mieux faire (au moins 2 défauts réels)
H2 — Pour qui c'est le bon choix / pour qui non
<ProductRef asin="B0..." />
H2 — FAQ
```

### Article informatif (définition, « comment »)
```
H1 — Qu'est-ce que [concept] / Comment [faire X]
  Intro : définition + contexte + promesse
H2 — Définition / concept central
  H3 — Origine / ce que ce n'est pas
H2 — Comment ça marche concrètement
  H3 — Mécanisme + exemple
H2 — Cas d'usage
H2 — Limites et points de vigilance
H2 — FAQ (H3 par question)
Conclusion (80-120 mots) : synthèse + prochaine étape (jamais « défis et perspectives »)
```

---

## 13. Checklist avant publication

### SEO technique
- [ ] Meta title unique, < 60 chars, mot-clé en début
- [ ] Meta description unique, < 155 chars, verbe d'action
- [ ] H1 unique, variante du title
- [ ] Hiérarchie H1 > H2 > H3 stricte
- [ ] JSON-LD Article + Person + BreadcrumbList + FAQPage
- [ ] Canonical défini
- [ ] Images : alt descriptif, next/image (hors visuels Amazon)

### Contenu
- [ ] Réponse directe dès le premier paragraphe (< 60 mots)
- [ ] Mot-clé principal dans H1, intro, 1 H2, meta description
- [ ] 3-5 variantes sémantiques dans les H2/H3
- [ ] 2-4 liens internes contextuels
- [ ] ≥ 1 200 mots (article blog)
- [ ] Année « édition courante » via `currentYear()`, jamais en dur

### Anti-patterns IA (boileau)
- [ ] Zéro mot de la liste sans fait concret derrière
- [ ] Paragraphes de longueur variable
- [ ] Puces à items variés (pas de parallélisme parfait)
- [ ] Au moins 1 prise de position tranchée + 1 anti-conseil
- [ ] Au moins 1 mesure ou retour d'expérience daté
- [ ] Score détecteur IA ≥ 85 % humain

### GEO
- [ ] Chaque H2 = chunk autonome extractible
- [ ] ≥ 3 phrases citables
- [ ] ≥ 1 tableau avec verdict textuel
- [ ] `dateModified` dans le JSON-LD
- [ ] Multi-produits : 2-3 H3 questions variées par produit, zéro `**label**` parallèle (boileau §25)

### E-E-A-T
- [ ] Signature auteur en haut (nom + date + temps de lecture)
- [ ] `<AuthorBox>` en bas
- [ ] Page `/auteurs/camille` publiée et indexable
- [ ] Person JSON-LD dans l'article

### Affiliation / conformité
- [ ] Liens Amazon via `<ProductRef>` / `data/products/*.json`
- [ ] Aucun `price_from` / `price_to` affiché
- [ ] `<ProductDisclosure />` présent
- [ ] Chaque ASIN cité existe dans `data/products/` (sinon `amazon_sync_product` d'abord)

### Rendu
- [ ] `curl` de la page retourne le H1 sans JS
- [ ] Pas de contenu dans `useEffect` / `useState`
