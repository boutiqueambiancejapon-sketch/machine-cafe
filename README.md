# machine-cafe

**10minutescafe** — comparateur éditorial de machines à café.

Site Next.js (App Router) porté depuis le canvas Claude Design `10minutescafe.dc.html`.
Données de démonstration : les produits et prix sont donnés à titre d'exemple.

## Stack

- Next.js 16 (App Router, React 19, Turbopack)
- TypeScript
- Polices auto-hébergées via `next/font` (Instrument Serif, Manrope, JetBrains Mono)
- Aucune dépendance UI externe — styles inline + `app/globals.css`

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

## Structure

| Chemin | Rôle |
| --- | --- |
| `app/page.tsx` | Accueil : hero, configurateur, sélection, méthodologie, guides, newsletter |
| `app/comparateur/` | Comparateur à facettes (filtres besoin / budget / marque / note) |
| `app/tests/[slug]/` | Fiche test produit (accordéons specs + FAQ) |
| `app/comparatifs/[slug]/` | Face-à-face entre deux machines |
| `app/machines/[slug]/` | Page catégorie SEO (classement) |
| `app/marques/[slug]/` | Page marque |
| `app/guides/[slug]/` | Article guide d'achat |
| `components/` | Header, Footer, cartes produit, barre de comparaison, configurateur… |
| `lib/data.ts` | Toutes les données (produits, notes, FAQ, specs, pondérations…) |
| `lib/format.ts` | Helpers `euro()`, `num()`, `barColor()` |

## Déploiement

Connecté à Vercel : chaque push sur `main` déclenche un déploiement.
