// data/authors.ts — auteurs du site (E-E-A-T). Utilisé par AuthorBox,
// AuthorByline, le JSON-LD Person et les pages /auteurs/[slug].
// Voir docs/AUTHOR-camille.md pour la voix éditoriale détaillée.

export type Author = {
  slug: string;
  name: string;
  jobTitle: string;
  bio: string;
  /** Phrase courte affichée sous la signature en haut d'article. */
  byline: string;
  expertise: string[];
  /** Profils externes pour le schema Person > sameAs. */
  sameAs: string[];
};

export const AUTHORS: Record<string, Author> = {
  camille: {
    slug: "camille",
    name: "Camille Ferrand",
    jobTitle: "Testeur machines à café, ancien barista",
    bio: "Ancien barista passé derrière la machine de deux cafés de spécialité entre 2014 et 2018, je teste des machines domestiques depuis. J'ai fait passer une trentaine d'automatiques, de percolateurs et de machines à capsules par la même routine : quinze jours d'usage réel, mesures au sonomètre et au réfractomètre, coût par tasse calculé.",
    byline: "Ancien barista, teste des machines à café à domicile depuis 2018",
    expertise: [
      "Extraction espresso : pression réelle, température, TDS au réfractomètre",
      "Broyeurs : acier vs céramique, réglage, bruit mesuré au sonomètre",
      "Systèmes lait manuels et automatiques, entretien et détartrage",
      "Coût par tasse : grains, capsules, filtre, sur la durée",
    ],
    sameAs: [],
  },
};

export const DEFAULT_AUTHOR = AUTHORS.camille;
