// lib/hub-content.ts — contenu éditorial des pages hub (SEO + GEO).
// Importé uniquement par components/hub/HubPage.tsx (server component) pour
// ne pas alourdir le bundle client du Header qui importe lib/hubs.ts.
//
// Rédaction : voir docs/SEO-GEO-REDACTION.md + .claude/skills/boileau.
// `chapo` = réponse directe < 80 mots (position zéro). `sections[].body` =
// paragraphes séparés par une ligne vide. `faq` = 5-8 paires, rendues en <h3>.

export type HubContent = {
  chapo: string;
  keyFacts?: { label: string; value: string }[];
  sections: { h2: string; body: string }[];
  faq: { q: string; a: string }[];
};

export const HOW_WE_RANK =
  "Le classement combine notre note éditoriale (qualité en tasse, facilité, entretien, bruit mesuré au sonomètre à 1 m, rapport prix-prestations) et, quand le produit est suivi sur Amazon, sa note client et son nombre d'avis. Les prix affichés sont relevés sur Amazon et rafraîchis chaque mois, avec la date de relevé. Aucun placement n'est payé.";

export const HUB_CONTENT: Record<string, HubContent> = {
  // ─────────────────────────── PAR TECHNOLOGIE ───────────────────────────
  "a-grains": {
    chapo:
      "Une machine à café à grains moud la dose juste avant l'extraction. Résultat : un café plus aromatique et moins cher à la tasse (0,10 à 0,15 € contre 0,35 à 0,45 € en capsules), en échange d'un entretien régulier et d'un investissement de départ plus élevé. Le choix se joue sur trois points : le broyeur, la gestion du lait, la facilité de nettoyage.",
    keyFacts: [
      { label: "Prix du marché", value: "environ 250 € à 2 000 €" },
      { label: "Coût par tasse", value: "0,10 – 0,15 € en grains" },
      { label: "Bruit au broyage", value: "62 – 70 dB à 1 m" },
      { label: "Détartrage", value: "tous les 200 à 400 cafés selon la dureté de l'eau" },
    ],
    sections: [
      {
        h2: "Comment choisir une machine à café à grains ?",
        body:
          "Trois paramètres décident presque tout : le type de broyeur, la gestion du lait et l'accès au groupe d'infusion. Le reste — nombre de recettes, écran couleur, application mobile — pèse beaucoup moins dans l'usage quotidien qu'on ne l'imagine au moment de l'achat.\n\nUn broyeur en acier suffit largement pour un usage domestique et donne une mouture souvent plus précise. La céramique tourne plus lentement, chauffe moins, dure plus longtemps et gagne 5 à 7 dB au sonomètre. Sur des grains torréfiés pour espresso, la différence en tasse reste discrète.\n\nLe passage d'un mousseur manuel à un système lait automatique change concrètement le quotidien de qui boit un cappuccino chaque matin : vingt secondes de geste et un rinçage en moins par tasse. Un groupe d'infusion amovible, lui, se rince sous le robinet en dix secondes ; les groupes fixes imposent des cycles de nettoyage chimiques plus fréquents.",
      },
      {
        h2: "Grains ou capsules : qu'est-ce qui revient le moins cher ?",
        body:
          "Les grains, dès que la consommation dépasse un à deux cafés par jour. Comptez 0,10 à 0,15 € la tasse en grains contre 0,35 à 0,45 € en capsules. Pour un foyer à trois cafés quotidiens, l'écart couvre l'investissement d'une machine à grains milieu de gamme en un à deux ans.\n\nEn dessous d'un café par jour, ou si l'entretien vous rebute, la capsule garde l'avantage : zéro détartrage, résultat constant, aucun réglage.",
      },
      {
        h2: "Faut-il une machine automatique ou une machine expresso à porte-filtre ?",
        body:
          "Automatique si vous voulez un café d'une pression, sans geste : la machine moud, dose, tasse et extrait toute seule. C'est le cas de la quasi-totalité des modèles listés ici.\n\nPorte-filtre si vous acceptez de doser et tasser vous-même pour contrôler l'extraction. Le résultat peut être supérieur une fois la technique acquise, mais la courbe d'apprentissage est réelle et le café du matin devient un petit rituel.",
      },
    ],
    faq: [
      {
        q: "Quelle est la meilleure machine à café à grains rapport qualité-prix ?",
        a: "Autour de 300 €, la De'Longhi Magnifica S reste la référence : broyeur à 13 crans, groupe d'infusion amovible, espresso régulier. Au-delà de 500 €, on paie surtout le système lait automatique et la finition, pas un meilleur espresso.",
      },
      {
        q: "Une machine à grains fait-elle beaucoup de bruit ?",
        a: "Le broyage dure 5 à 10 secondes à 62-70 dB selon le modèle, mesuré à 1 m. En dessous de 65 dB, on parle de machine silencieuse. Les broyeurs céramique (Philips, Jura) gagnent 5 à 7 dB sur l'acier.",
      },
      {
        q: "À quelle fréquence faut-il détartrer une machine à café à grains ?",
        a: "Tous les 200 à 400 cafés selon la dureté de l'eau. La machine déclenche l'alerte elle-même. Un filtre à eau espace les cycles sans les supprimer. Le détartrage prend 20 à 25 minutes.",
      },
      {
        q: "Quel café en grains utiliser dans une machine automatique ?",
        a: "Des grains torréfiés pour espresso, achetés en petite quantité. Évitez les grains très foncés et huileux : ils encrassent le broyeur et la conduite. Un réglage de mouture au cran du milieu convient à la plupart des torréfactions du commerce.",
      },
      {
        q: "Combien de temps dure une machine à café à grains ?",
        a: "Cinq à dix ans pour un modèle entretenu (détartrage régulier, groupe nettoyé, grains non huileux). La disponibilité des pièces détachées compte autant que la marque : De'Longhi et Philips sont bien suivis, certains modèles premium le sont moins.",
      },
      {
        q: "Broyeur acier ou céramique : lequel choisir ?",
        a: "Acier pour une mouture précise et un prix contenu, céramique pour le silence et la durée de vie. Sur des grains d'espresso du commerce, la différence de goût en tasse est faible. Le vrai écart se mesure au sonomètre et sur dix ans d'usage.",
      },
    ],
  },

  "a-capsules": {
    chapo:
      "Une machine à café à capsules donne un résultat constant d'une pression, sans entretien ni réglage. Le compromis se paie à la tasse : 0,25 à 0,45 € la capsule selon l'écosystème (Nespresso, Dolce Gusto, compatibles). Elle convient à un à deux cafés par jour, un bureau, une chambre, un logement d'appoint.",
    keyFacts: [
      { label: "Prix des machines", value: "environ 50 € à 200 €" },
      { label: "Coût par capsule", value: "0,25 – 0,45 €" },
      { label: "Chauffe", value: "20 à 40 secondes" },
      { label: "Écosystèmes", value: "Nespresso Original / Vertuo, Dolce Gusto, compatibles" },
    ],
    sections: [
      {
        h2: "Quel système de capsules choisir ?",
        body:
          "Nespresso Original pour des espressos serrés et un large choix de capsules compatibles à bas prix. Nespresso Vertuo pour des cafés longs et des mugs, avec un système propriétaire et moins d'alternatives. Dolce Gusto pour la variété de boissons, y compris les recettes lactées en poudre, mais un coût par tasse plus élevé et peu de compatibles.\n\nLe prix de la machine compte moins que le prix de la capsule sur la durée : à trois cafés par jour, l'écart de 0,15 € entre deux systèmes représente environ 160 € par an.",
      },
      {
        h2: "Une machine à capsules vaut-elle le coup face à une machine à grains ?",
        body:
          "Oui pour une faible consommation ou un refus total de l'entretien. Non dès que vous buvez plusieurs cafés par jour et que la qualité prime : une machine à grains d'entrée de gamme rembourse son surcoût en un à deux ans grâce au prix du café.\n\nÀ éviter si vous cherchez un espresso avec une vraie crema dense et un corps prononcé : même à 19 bars, la capsule reste en retrait d'une extraction sur grain frais.",
      },
    ],
    faq: [
      {
        q: "Quelle est la meilleure machine à café à capsules ?",
        a: "Pour un espresso serré, une Nespresso Original compacte type Essenza Mini ou Pixie. Pour la variété de boissons, une Dolce Gusto. Le choix se fait sur l'écosystème de capsules, pas sur la machine : c'est lui qui fixe le coût et le goût.",
      },
      {
        q: "Combien coûte une capsule de café ?",
        a: "0,25 à 0,45 € selon le système. Les capsules Nespresso compatibles (marques distributeurs) descendent autour de 0,20 €. Dolce Gusto se situe plutôt vers 0,35 à 0,45 €, notamment sur les recettes lactées.",
      },
      {
        q: "Les capsules réutilisables sont-elles un bon plan ?",
        a: "Sur le papier oui : on remplit avec son propre café moulu, le coût tombe autour de 0,10 € la tasse. En pratique, le résultat est irrégulier et le remplissage prend du temps chaque matin. Intéressant pour un usage occasionnel, pas pour remplacer les capsules du quotidien.",
      },
      {
        q: "Une machine à capsules fait-elle du vrai espresso ?",
        a: "Elle en approche le format et propose 15 à 19 bars de pression, mais l'extraction reste en dessous d'une machine sur grain frais : crema plus fine, corps plus court. Pour un espresso de niveau café, il faut passer aux grains ou au porte-filtre.",
      },
      {
        q: "Peut-on faire un cappuccino avec une machine à capsules ?",
        a: "Avec une Dolce Gusto, oui, via des capsules de lait en poudre. Avec Nespresso, il faut un mousseur à lait séparé (Aeroccino ou équivalent). Le résultat lacté reste correct sans égaler une carafe automatique de machine à grains.",
      },
    ],
  },

  filtre: {
    chapo:
      "La cafetière filtre reste la solution la moins chère pour du café long servi en quantité. Avec un broyeur intégré, elle moud le grain juste avant l'infusion et garde l'essentiel du bénéfice du grain frais, sans passer à l'espresso ni à ses contraintes d'entretien.",
    keyFacts: [
      { label: "Prix", value: "environ 40 € à 200 €" },
      { label: "Capacité", value: "8 à 15 tasses selon le modèle" },
      { label: "Verseuse", value: "verre sur plaque chauffante ou isotherme" },
    ],
    sections: [
      {
        h2: "Faut-il une cafetière filtre avec broyeur intégré ?",
        body:
          "Oui si vous voulez le goût du grain frais sans machine à espresso : le broyeur moud la dose au démarrage du cycle, ce qui change nettement la tasse par rapport au café pré-moulu. Non si vous achetez déjà du moulu de qualité et que le budget est serré : une bonne filtre sans broyeur suffit alors.\n\nLa verseuse isotherme évite la plaque chauffante qui « cuit » le café après vingt minutes. C'est le premier critère à regarder après le broyeur.",
      },
      {
        h2: "Cafetière filtre ou machine à grains : laquelle choisir ?",
        body:
          "Filtre si vous buvez surtout du café allongé, en pichet, pour plusieurs personnes, et que l'espresso serré ne vous manque pas. Machine à grains si vous voulez des espressos, des cafés courts d'une pression et, éventuellement, des boissons lactées.\n\nLa filtre coûte moins cher à l'achat, consomme moins et s'entretient en quelques secondes. Elle ne fait ni espresso ni mousse de lait.",
      },
    ],
    faq: [
      {
        q: "Quelle est la meilleure cafetière filtre avec broyeur ?",
        a: "Regardez d'abord la verseuse isotherme et la présence d'un vrai broyeur (pas d'un simple hachoir à lames). Melitta et Severin proposent des modèles autour de 80 à 150 € qui cochent ces cases.",
      },
      {
        q: "Une cafetière filtre à broyeur fait-elle du bon café ?",
        a: "Pour du café long, oui : moudre juste avant l'infusion libère des arômes que le pré-moulu a déjà perdus. Ce n'est pas de l'espresso, mais la tasse est nettement au-dessus d'une filtre classique au café moulu du commerce.",
      },
      {
        q: "Verseuse en verre ou isotherme ?",
        a: "Isotherme. La verseuse en verre repose sur une plaque chauffante qui dégrade le café après vingt à trente minutes. L'isotherme garde la température sans continuer à cuire le café.",
      },
      {
        q: "Peut-on faire un espresso avec une cafetière filtre ?",
        a: "Non. Une filtre infuse par gravité, sans pression. L'espresso demande 9 bars utiles en sortie de groupe, ce qu'on ne trouve que sur les machines à porte-filtre ou automatiques.",
      },
    ],
  },

  expresso: {
    chapo:
      "Une machine expresso à porte-filtre demande un geste — doser, tasser, purger — mais donne le contrôle total sur l'extraction. Avec un broyeur intégré et une vapeur puissante, elle vise le résultat de niveau café. La courbe d'apprentissage est réelle : comptez quelques semaines avant des tasses régulières.",
    keyFacts: [
      { label: "Prix", value: "environ 90 € à 1 500 €" },
      { label: "Pression utile", value: "9 bars en sortie de groupe (pour 15 bars de pompe annoncés)" },
      { label: "Prise en main", value: "2 à 6 semaines pour un espresso régulier" },
    ],
    sections: [
      {
        h2: "Pour qui une machine expresso à porte-filtre est-elle faite ?",
        body:
          "Pour qui veut apprendre l'extraction et accepte d'y passer du temps : régler la mouture, doser à 0,1 g près, tasser d'aplomb, lire le temps d'écoulement. Le résultat, une fois calé, dépasse une automatique du même prix.\n\nÀ éviter si vous voulez un café d'une pression le matin sans y penser : dans ce cas, une automatique à grains est le bon choix.",
      },
      {
        h2: "Faut-il vraiment 15 bars pour un bon espresso ?",
        body:
          "Non. Un espresso s'extrait à environ 9 bars en sortie de groupe. Les 15 ou 19 bars affichés correspondent à la pression maximale de la pompe, pas à la pression d'extraction. Au-delà de 9-10 bars utiles, on sur-extrait et le café devient amer.\n\nLe chiffre marketing à surveiller n'est donc pas la pression, mais la stabilité de la température et la qualité du broyeur.",
      },
    ],
    faq: [
      {
        q: "Quelle machine expresso pour débuter ?",
        a: "Un modèle avec broyeur intégré et vapeur, type Sage Barista Express ou De'Longhi La Specialista, pour apprendre le geste complet sans jongler avec un moulin séparé. Comptez 500 à 700 €.",
      },
      {
        q: "Combien de temps pour réussir un espresso à la maison ?",
        a: "Deux à six semaines d'usage régulier pour caler mouture, dose et tassage sur vos grains. Chaque nouveau paquet de café demande un léger réajustement du broyeur.",
      },
      {
        q: "Machine expresso ou machine à grains automatique ?",
        a: "Porte-filtre pour le contrôle et un meilleur plafond de qualité, automatique pour la simplicité et la régularité sans effort. Le porte-filtre récompense la pratique ; l'automatique non.",
      },
      {
        q: "Faut-il un moulin séparé ou un broyeur intégré ?",
        a: "Intégré pour débuter et gagner de la place. Un moulin séparé de qualité (sur meules, pas à lames) améliore la régularité de la mouture, mais ajoute 150 à 400 € et un appareil sur le plan de travail.",
      },
    ],
  },

  automatiques: {
    chapo:
      "Une machine à café automatique enchaîne broyage, dosage et extraction d'une pression, sans intervention. Sur les modèles à grains, l'automatisation porte aussi sur le lait : buse vapeur manuelle ou carafe qui se nettoie seule. Les machines à capsules sont automatiques par nature.",
    keyFacts: [
      { label: "Prix (à grains)", value: "environ 250 € à 2 000 €" },
      { label: "Système lait", value: "buse manuelle, cappuccinatore, ou carafe automatique" },
      { label: "Recettes mémorisées", value: "4 à 50 selon la gamme" },
    ],
    sections: [
      {
        h2: "Qu'est-ce qui différencie deux machines automatiques à grains ?",
        body:
          "Le système lait d'abord : une buse manuelle demande vingt secondes de geste par boisson lactée, une carafe automatique fait le cappuccino d'un bouton et se rince en dix à quinze secondes.\n\nEnsuite l'accès à l'entretien : groupe d'infusion amovible (rinçage sous le robinet) contre groupe fixe (cycles chimiques). Le nombre de recettes et l'écran couleur arrivent loin derrière dans l'usage réel.",
      },
      {
        h2: "One-touch ou buse vapeur : quelle différence au quotidien ?",
        body:
          "One-touch : la machine moud, extrait l'espresso, fait mousser le lait et assemble le tout d'une pression. C'est le confort d'une carafe LatteCrema ou LatteGo, au prix d'un surcoût de 200 à 400 € et d'une carafe à ranger.\n\nBuse vapeur : plus de contrôle sur la texture du lait une fois le coup de main pris, mais un geste et un rinçage à chaque tasse. Le bon choix si le cappuccino reste occasionnel.",
      },
    ],
    faq: [
      {
        q: "Quelle est la meilleure machine à café automatique ?",
        a: "Pour un usage familial polyvalent, une automatique à grains milieu de gamme (300 à 500 €) : bon café, entretien simple, coût par tasse bas. Le haut de gamme n'a de sens que si la mousse de lait automatique est non négociable.",
      },
      {
        q: "Une machine automatique à grains est-elle difficile à entretenir ?",
        a: "Non : rinçage automatique à l'allumage, détartrage guidé tous les 200 à 400 cafés, nettoyage du groupe une fois par semaine s'il est amovible. Rien de complexe, mais ce n'est pas « zéro geste » comme les capsules.",
      },
      {
        q: "Faut-il payer plus cher pour une carafe à lait automatique ?",
        a: "Seulement si vous buvez un cappuccino ou un latte chaque jour. Pour un usage occasionnel, la buse manuelle d'une machine à 300 € fait le travail et coûte 200 à 400 € de moins.",
      },
      {
        q: "Machine automatique à grains ou à capsules ?",
        a: "À grains dès plusieurs cafés par jour : meilleur goût, 0,10 à 0,15 € la tasse. À capsules pour une faible consommation sans entretien, à 0,25 à 0,45 € la capsule.",
      },
    ],
  },

  "avec-broyeur": {
    chapo:
      "Le broyeur intégré moud la dose juste avant l'extraction, ce qui préserve les arômes et abaisse le coût par tasse à 0,10-0,15 €. Acier ou céramique, c'est le nombre de crans réellement exploitables et le bruit mesuré qui comptent, pas le nombre affiché.",
    keyFacts: [
      { label: "Type de meule", value: "acier (précis, abordable) ou céramique (silencieux, durable)" },
      { label: "Écart de bruit", value: "5 à 7 dB en faveur de la céramique" },
      { label: "Bac à grains", value: "150 à 400 g selon la gamme" },
    ],
    sections: [
      {
        h2: "Broyeur acier ou céramique : quelle différence concrète ?",
        body:
          "La céramique tourne plus lentement, chauffe moins le café pendant la mouture et dure plus longtemps. Elle gagne 5 à 7 dB au sonomètre. L'acier offre une mouture souvent plus fine et précise, pour un prix plus contenu.\n\nSur des grains d'espresso du commerce, la différence de goût en tasse est faible. L'écart se mesure au bruit et sur la durée de vie, pas dans la tasse du matin.",
      },
      {
        h2: "Combien de réglages de mouture faut-il vraiment ?",
        body:
          "Cinq à sept crans utiles suffisent pour couvrir toutes les torréfactions du commerce. Les machines annoncent parfois 13 ou 15 positions, mais les extrêmes servent rarement.\n\nLe bon réflexe : partir du cran du milieu, puis ajuster d'un quart de tour selon le temps d'écoulement de l'espresso. Trop rapide, on resserre ; trop lent ou goutte à goutte, on desserre.",
      },
    ],
    faq: [
      {
        q: "Faut-il éviter les grains huileux avec un broyeur ?",
        a: "Oui. Les torréfactions très foncées et brillantes encrassent les meules et la conduite, et finissent par bloquer la mouture. Préférez une torréfaction espresso mate, achetée en petite quantité.",
      },
      {
        q: "À quelle fréquence nettoyer le broyeur ?",
        a: "Un dépoussiérage tous les un à deux mois suffit sur un usage domestique avec des grains non huileux. Certaines machines proposent des pastilles de nettoyage à passer dans le broyeur une à deux fois par an.",
      },
      {
        q: "Un moulin séparé fait-il mieux qu'un broyeur intégré ?",
        a: "Un moulin sur meules de qualité améliore la régularité de la mouture, utile en porte-filtre. Sur une machine automatique, le broyeur intégré suffit largement : la machine compense elle-même les petites variations.",
      },
      {
        q: "Le broyeur d'une machine à café est-il bruyant ?",
        a: "Le broyage dure 5 à 10 secondes, entre 62 et 70 dB à 1 m. En dessous de 65 dB, la machine est considérée comme silencieuse. Les modèles à meules céramique sont les plus discrets.",
      },
    ],
  },

  compactes: {
    chapo:
      "Pour un plan de travail réduit, l'encombrement passe avant le nombre de recettes. Une machine compacte garde l'essentiel — un espresso correct, un réservoir amovible — dans moins de 25 cm de large, parfois moins de 15 cm pour les modèles à capsules.",
    keyFacts: [
      { label: "Largeur", value: "12 à 25 cm selon le type" },
      { label: "Accès réservoir", value: "à vérifier : par le dessus ou par l'avant" },
      { label: "Profondeur", value: "souvent 33 à 43 cm, à mesurer sous les meubles hauts" },
    ],
    sections: [
      {
        h2: "Quelle machine à café choisir pour une petite cuisine ?",
        body:
          "Pour le plus compact, une machine à capsules type Nespresso Essenza Mini ou Pixie : 11 à 15 cm de large. Pour garder le grain frais sans exploser l'encombrement, une machine à grains d'entrée de gamme (Philips 2200, De'Longhi Magnifica) reste sous 24 cm de large.\n\nMesurez aussi la profondeur et la hauteur libre : beaucoup de machines demandent de soulever le couvercle du bac à grains ou de tirer le réservoir vers le haut, impossible sous un meuble haut.",
      },
    ],
    faq: [
      {
        q: "Quelle est la machine à café à grains la plus compacte ?",
        a: "Les modèles d'entrée de gamme De'Longhi Magnifica et Philips série 2200 tournent autour de 24 cm de large, ce qui reste le minimum pour loger un broyeur, un réservoir et un groupe d'infusion.",
      },
      {
        q: "Une machine à capsules est-elle plus adaptée à un petit espace ?",
        a: "Oui pour l'encombrement pur : 11 à 15 cm de large contre 24 cm minimum en grains. Le compromis est le coût par tasse, plus élevé.",
      },
      {
        q: "Que vérifier avant d'acheter pour une petite cuisine ?",
        a: "La largeur, mais aussi la profondeur et surtout la hauteur libre au-dessus : le remplissage du réservoir ou du bac à grains se fait souvent par le dessus. Vérifiez aussi que le tiroir à marc s'extrait par l'avant.",
      },
    ],
  },

  // ─────────────────────────── PAR BESOIN ───────────────────────────
  "meilleure-machine-cafe": {
    chapo:
      "La meilleure machine à café dépend d'abord de ce que vous buvez et de votre budget. Pour un usage familial polyvalent, une automatique à grains milieu de gamme (300 à 500 €) reste le choix le plus sûr : bon café, entretien simple, coût par tasse bas. Pour un à deux cafés par jour sans entretien, une machine à capsules suffit.",
    sections: [
      {
        h2: "Quel type de machine à café choisir selon son usage ?",
        body:
          "Un à deux cafés par jour, zéro envie d'entretien : machine à capsules, 50 à 150 €, 0,25 à 0,45 € la tasse.\n\nPlusieurs cafés par jour, exigeant sur le goût : machine à grains automatique, 300 à 600 €, 0,10 à 0,15 € la tasse, un détartrage tous les un à deux mois.\n\nEnvie d'apprendre l'extraction : machine expresso à porte-filtre avec broyeur, 500 à 700 €, quelques semaines de prise en main.\n\nCafé long en quantité pour la maisonnée : cafetière filtre à broyeur, 80 à 150 €.",
      },
      {
        h2: "Quel budget prévoir pour une bonne machine à café ?",
        body:
          "Sous 300 €, on trouve des machines à capsules et de premières machines à grains simples (De'Longhi Magnifica S vers 279 €, Philips série 2200). La régularité en tasse compte plus que les options à ce niveau.\n\nEntre 300 et 600 €, les vraies automatiques à espresso arrivent : broyeur réglable, système lait, entretien guidé. C'est la tranche du meilleur rapport qualité-prix.\n\nAu-delà de 800 €, on paie l'extraction, les finitions et l'automatisation complète du lait. L'écart de goût avec le milieu de gamme est réel mais moins marqué que l'écart de prix.",
      },
    ],
    faq: [
      {
        q: "Quelle machine à café acheter en 2026 ?",
        a: "Pour la polyvalence familiale, une automatique à grains autour de 300 à 400 € (type De'Longhi Magnifica S ou Philips série 2300). Pour un petit foyer sans entretien, une machine à capsules Nespresso. Pour apprendre l'espresso, un porte-filtre à broyeur.",
      },
      {
        q: "Machine à grains ou à capsules : que choisir ?",
        a: "Grains dès plusieurs cafés par jour : meilleur goût et 0,10 à 0,15 € la tasse, ce qui rembourse le surcoût en un à deux ans. Capsules pour une faible consommation sans entretien.",
      },
      {
        q: "Faut-il mettre plus de 500 € dans une machine à café ?",
        a: "Seulement si la mousse de lait automatique ou la finition premium sont des critères non négociables. L'espresso d'une machine à 350 € et d'une machine à 900 € est proche ; c'est le confort d'usage qui change.",
      },
      {
        q: "Quelle marque de machine à café est la plus fiable ?",
        a: "De'Longhi et Philips offrent le meilleur suivi en pièces détachées et un réseau de réparation dense, ce qui pèse autant que la fiabilité brute sur la durée de vie réelle d'une machine.",
      },
      {
        q: "Combien de temps garde-t-on une machine à café ?",
        a: "Cinq à dix ans pour une machine à grains entretenue, un peu moins pour une machine à capsules. La disponibilité des pièces et du service après-vente détermine souvent la fin de vie avant la panne elle-même.",
      },
    ],
  },

  cappuccino: {
    chapo:
      "Pour un cappuccino quotidien sans effort, le seul critère qui compte est le système lait : une carafe automatique qui se nettoie en dix à quinze secondes plutôt qu'une buse manuelle qui demande vingt secondes de geste et un rinçage à chaque tasse. Le système LatteGo de Philips (2 pièces, sans tuyau) et le LatteCrema Hot de De'Longhi sont les plus pratiques.",
    keyFacts: [
      { label: "Systèmes automatiques", value: "LatteGo (Philips), LatteCrema Hot (De'Longhi), cappuccinatore (Melitta)" },
      { label: "Nettoyage carafe", value: "10 à 15 secondes sous l'eau" },
      { label: "Geste buse manuelle", value: "environ 20 secondes + rinçage par boisson" },
    ],
    sections: [
      {
        h2: "Carafe automatique ou buse vapeur pour le cappuccino ?",
        body:
          "Carafe automatique si vous buvez un cappuccino ou un latte chaque jour : la machine moud, extrait, fait mousser le lait et assemble d'une pression. Le LatteGo se démonte en deux pièces sans conduit interne et passe sous le robinet en quinze secondes.\n\nBuse vapeur si le cappuccino reste occasionnel : plus de contrôle sur la texture une fois le coup de main pris, mais un geste et un rinçage systématiques. On peut faire un excellent cappuccino à la buse, ce n'est simplement pas automatique.",
      },
      {
        h2: "Faut-il payer plus cher pour une machine à cappuccino automatique ?",
        body:
          "Le surcoût d'une carafe automatique face à une buse manuelle est de 200 à 400 €. Il se justifie uniquement par la fréquence : à un cappuccino par jour, le temps et le confort gagnés sur un an sont réels. À un cappuccino par semaine, la buse d'une machine à 300 € fait le travail.",
      },
    ],
    faq: [
      {
        q: "Quelle est la meilleure machine à café pour cappuccino ?",
        a: "Une automatique à grains avec carafe à lait : Philips série 2300 ou 5500 (système LatteGo), De'Longhi Eletta ou Rivelia (LatteCrema Hot). Le choix se fait sur la facilité de nettoyage de la carafe, pas sur le nombre de recettes.",
      },
      {
        q: "Le système LatteGo se nettoie-t-il vraiment sans effort ?",
        a: "Deux pièces, aucun conduit interne, un passage sous l'eau ou au lave-vaisselle. C'est le principal argument des Philips face à la buse manuelle et aux carafes à tuyaux plus longues à entretenir.",
      },
      {
        q: "Peut-on faire un bon cappuccino avec une buse vapeur manuelle ?",
        a: "Oui, avec du lait entier bien froid et la buse placée juste sous la surface les premières secondes. Le résultat peut égaler une carafe automatique ; il demande un geste d'une vingtaine de secondes à chaque tasse.",
      },
      {
        q: "Quel lait utiliser pour un cappuccino réussi ?",
        a: "Du lait entier, sorti du réfrigérateur, dans un pichet froid. Les laits demi-écrémés moussent moins bien. Les boissons végétales « barista » fonctionnent, les versions classiques tiennent mal la mousse.",
      },
      {
        q: "Cappuccino, latte, flat white : quelle différence pour la machine ?",
        a: "C'est surtout une question de proportions lait-mousse que la machine ajuste par un réglage de quantité et de durée de moussage. Toutes les machines à carafe automatique proposent ces trois recettes en preset.",
      },
    ],
  },

  silencieuse: {
    chapo:
      "Une machine à café à grains produit 66 à 70 dB au broyage en moyenne, mesuré à 1 m. En dessous de 65 dB, on parle de machine silencieuse ; sous 68 dB, le niveau reste acceptable pour une cuisine ouverte. Les broyeurs à meules céramique tournent plus lentement et gagnent 5 à 7 dB sur l'acier.",
    keyFacts: [
      { label: "Broyage moyen", value: "66 – 70 dB à 1 m" },
      { label: "Seuil « silencieux »", value: "moins de 65 dB" },
      { label: "Écart céramique / acier", value: "5 à 7 dB" },
      { label: "Repères marché", value: "Jura E4 ~62 dB, Philips 5400 ~65 dB, Jura Z10 ~57 dB" },
    ],
    sections: [
      {
        h2: "Qu'est-ce qui rend une machine à café silencieuse ?",
        body:
          "Le broyeur, d'abord. Les meules céramique tournent à vitesse réduite et produisent un son plus sourd, moins agressif, 5 à 7 dB en dessous d'un broyeur acier équivalent. Jura et Philips misent sur la céramique et signent les modèles les plus discrets du marché.\n\nEnsuite l'isolation du carter et la position du broyeur dans le châssis. À prix égal, deux machines de la même marque peuvent se tenir dans deux décibels ; entre deux technologies de meule, l'écart grimpe à sept.",
      },
      {
        h2: "Quel niveau sonore viser pour une cuisine ouverte ?",
        body:
          "Moins de 68 dB au broyage pour ne pas réveiller la maison le matin, moins de 65 dB si le coin café donne directement sur le séjour ou une chambre. Le broyage ne dure que 5 à 10 secondes, mais c'est le pic sonore que l'oreille retient.\n\nÀ éviter si le silence est un critère fort : les machines à broyeur acier d'entrée de gamme, souvent au-dessus de 70 dB.",
      },
    ],
    faq: [
      {
        q: "Quelle est la machine à café à grains la plus silencieuse ?",
        a: "Les modèles à broyeur céramique de Jura et Philips. Les Jura haut de gamme descendent autour de 57 à 62 dB au broyage ; les Philips série 5400 se situent vers 65 dB. En entrée de gamme, viser une Philips à meules céramique.",
      },
      {
        q: "Un broyeur céramique est-il vraiment plus silencieux ?",
        a: "Oui, de 5 à 7 dB en moyenne face à un broyeur acier. La meule céramique tourne moins vite et génère moins de friction métallique, d'où un son plus grave et moins perçant.",
      },
      {
        q: "Combien de décibels fait une machine à café à grains ?",
        a: "66 à 70 dB au broyage pour la moyenne du marché, mesuré à 1 m. Les modèles silencieux tombent entre 57 et 65 dB. L'extraction elle-même est nettement plus discrète que le broyage.",
      },
      {
        q: "Peut-on réduire le bruit d'une machine à café existante ?",
        a: "Un peu : un tapis anti-vibration sous la machine et un support qui ne fait pas caisse de résonance gagnent un à deux décibels perçus. Le broyeur lui-même ne se modifie pas.",
      },
    ],
  },

  familiale: {
    chapo:
      "Un foyer où chacun boit un café différent a besoin de profils mémorisés, d'un grand réservoir (au moins 1,8 L) et d'un bac à grains généreux (au moins 250 g). La polyvalence — nombre de recettes, réglages par utilisateur — prime sur la finesse d'extraction.",
    keyFacts: [
      { label: "Réservoir conseillé", value: "1,8 L ou plus" },
      { label: "Bac à grains", value: "250 g minimum, 400 g sur le haut de gamme" },
      { label: "Profils utilisateurs", value: "utile dès 3 buveurs réguliers" },
    ],
    sections: [
      {
        h2: "Quelle machine à café choisir pour toute la famille ?",
        body:
          "Une automatique à grains avec profils utilisateurs et carafe à lait : chacun retrouve son réglage, et le cappuccino se fait d'une pression. Melitta (double trémie à grains sur certains modèles), De'Longhi Eletta et Philips série 3200 à 5500 couvrent ce besoin.\n\nRegardez le remplissage : à cinq ou six cafés par jour, un réservoir de 1,5 L se remplit tous les jours. Un bac à marc qui s'extrait par l'avant sans bouger la machine change le quotidien.",
      },
    ],
    faq: [
      {
        q: "Quelle machine à café pour une famille de 4 personnes ?",
        a: "Une automatique à grains avec réservoir d'au moins 1,8 L, bac à grains de 250 g et profils mémorisés. Une carafe à lait automatique évite les files d'attente le matin quand plusieurs personnes veulent un cappuccino.",
      },
      {
        q: "Les profils utilisateurs sont-ils vraiment utiles ?",
        a: "Dès trois buveurs réguliers avec des goûts différents (café court serré, café long, latte). Chacun sélectionne son profil et retrouve sa longueur, son intensité et sa température sans re-régler la machine.",
      },
      {
        q: "Quel réservoir d'eau pour un usage familial intensif ?",
        a: "1,8 L couvre une journée pour un foyer à quatre. En dessous de 1,5 L, le remplissage devient quotidien voire biquotidien. Vérifiez que le réservoir se retire par l'avant si la machine est sous un meuble haut.",
      },
      {
        q: "Une machine à double trémie à grains, pour quoi faire ?",
        a: "Pour proposer deux cafés différents sans vider le bac : un décaféiné et un classique, ou deux torréfactions. Melitta en propose sur plusieurs modèles ; c'est un vrai plus dans un foyer aux goûts variés.",
      },
    ],
  },

  "pas-chere": {
    chapo:
      "Sous 250 €, le choix se fait entre une machine à capsules sans entretien (50 à 150 €, 0,25 à 0,45 € la tasse) et une première machine à grains simple (De'Longhi Magnifica S vers 279 €, Krups et Philips dès 112 à 250 €). Le coût par tasse sur deux ans départage souvent plus que le prix d'achat.",
    keyFacts: [
      { label: "Première machine à grains", value: "à partir d'environ 250 €" },
      { label: "Machine à capsules", value: "à partir d'environ 50 €" },
      { label: "Économie grains vs capsules", value: "environ 0,25 € par tasse" },
    ],
    sections: [
      {
        h2: "Machine à café pas chère : grains ou capsules ?",
        body:
          "Capsules si vous buvez peu et voulez zéro entretien : la machine coûte 50 à 150 €, mais chaque café revient à 0,25 à 0,45 €.\n\nGrains si vous buvez plusieurs cafés par jour : une machine d'entrée de gamme autour de 250 à 280 € coûte plus cher à l'achat, mais 0,10 à 0,15 € la tasse ensuite. Sur deux ans à trois cafés quotidiens, l'écart de coût du café dépasse largement l'écart de prix des machines.",
      },
      {
        h2: "Que vérifier sur une machine à grains d'entrée de gamme ?",
        body:
          "La capacité du bac à grains, l'accès au réservoir, la présence d'un groupe d'infusion extractible (pour un nettoyage simple) et la compatibilité avec un filtre à eau si votre eau est calcaire. Ces quatre points comptent plus que le nombre de recettes à ce niveau de prix.\n\nÀ éviter : les modèles sans groupe amovible, qui imposent des cycles de nettoyage chimiques plus fréquents et plus chers.",
      },
    ],
    faq: [
      {
        q: "Quelle est la meilleure machine à café à grains pas chère ?",
        a: "La De'Longhi Magnifica S, autour de 279 €, reste la référence de l'entrée de gamme : broyeur 13 crans, groupe amovible, espresso régulier. En dessous, Krups et Philips proposent des modèles à partir de 112 à 250 € avec des compromis assumés sur les réglages.",
      },
      {
        q: "Peut-on avoir une bonne machine à grains pour moins de 200 € ?",
        a: "Oui, avec des modèles Krups à broyeur acier autour de 112 à 180 €. Les réglages sont limités et la finition basique, mais le café en grains frais est déjà nettement au-dessus des capsules.",
      },
      {
        q: "Une machine à café pas chère dure-t-elle longtemps ?",
        a: "Cinq à sept ans avec un entretien régulier. Le point faible des modèles bon marché n'est pas la mécanique mais la disponibilité des pièces : privilégiez une marque bien distribuée comme De'Longhi ou Philips.",
      },
      {
        q: "Machine à capsules à 50 € : bon plan ou fausse économie ?",
        a: "Bon plan si vous buvez un café par jour. Fausse économie au-delà : à trois cafés quotidiens, les capsules coûtent environ 400 € par an, soit le prix d'une machine à grains milieu de gamme en douze mois.",
      },
    ],
  },

  // ─────────────────────────── PAR BUDGET ───────────────────────────
  "moins-de-200": {
    chapo:
      "Sous 200 €, le grain frais reste accessible avec des machines à broyeur acier d'entrée de gamme (Krups dès 112 €), mais la plupart des modèles à ce prix sont des machines à capsules. Le coût par tasse sur deux ans départage souvent plus que le prix d'achat : 0,10-0,15 € en grains contre 0,25-0,45 € en capsules.",
    keyFacts: [
      { label: "Type dominant", value: "machines à capsules, premières machines à grains" },
      { label: "Machine à grains la moins chère", value: "environ 112 € (Krups, broyeur acier)" },
      { label: "Compromis", value: "réglages limités, finition basique, pas de système lait auto" },
    ],
    sections: [
      {
        h2: "Que peut-on avoir pour moins de 200 € ?",
        body:
          "Une machine à capsules complète (50 à 150 €) ou une première machine à grains à broyeur acier (112 à 199 € chez Krups). À ce niveau, on ne trouve ni carafe à lait automatique, ni écran, ni profils utilisateurs.\n\nLe grain frais, même sur une machine basique, donne un café nettement au-dessus des capsules. À éviter : les modèles à grains sans groupe d'infusion amovible, qui imposent des cycles de nettoyage chimiques plus fréquents.",
      },
    ],
    faq: [
      {
        q: "Peut-on avoir une bonne machine à café à grains pour moins de 200 € ?",
        a: "Oui, avec des modèles Krups à broyeur acier autour de 112 à 180 €. Les réglages sont réduits et la finition simple, mais le café en grains frais est déjà bien au-dessus des capsules.",
      },
      {
        q: "Machine à grains ou à capsules sous 200 € ?",
        a: "Capsules si vous buvez un à deux cafés par jour et refusez l'entretien. Grains dès trois cafés quotidiens : le surcoût se rembourse en un à deux ans par le prix du café.",
      },
      {
        q: "Une machine à café à moins de 200 € dure-t-elle ?",
        a: "Cinq à sept ans avec un détartrage régulier. Le point faible n'est pas la mécanique mais la disponibilité des pièces : privilégiez une marque très distribuée comme Krups, De'Longhi ou Philips.",
      },
    ],
  },
  "200-300": {
    chapo:
      "Entre 200 et 300 €, on passe aux vraies machines à café à grains automatiques d'entrée de gamme. La De'Longhi Magnifica S (environ 279 €) est la référence du segment : broyeur à 13 crans, groupe d'infusion amovible, espresso régulier. La régularité en tasse compte plus que les options à ce prix.",
    keyFacts: [
      { label: "Référence du segment", value: "De'Longhi Magnifica S (~279 €)" },
      { label: "Alternatives", value: "Krups EA81 (~250 €), Philips série 2200" },
      { label: "Ce qu'on n'a pas encore", value: "carafe à lait automatique, écran couleur" },
    ],
    sections: [
      {
        h2: "Quelle machine à café à grains choisir entre 200 et 300 € ?",
        body:
          "La De'Longhi Magnifica S domine par son groupe d'infusion amovible (rinçage sous le robinet en dix secondes), ses 13 crans de mouture et la disponibilité de ses pièces. La Krups EA81 est une alternative plus compacte. La Philips série 2200 mise sur un broyeur céramique plus silencieux, avec des réglages plus limités.\n\nÀ ce niveau de prix, le lait se fait à la buse vapeur manuelle : comptez une vingtaine de secondes de geste et un rinçage par cappuccino.",
      },
    ],
    faq: [
      {
        q: "La De'Longhi Magnifica S vaut-elle son prix ?",
        a: "Oui : à environ 279 €, elle offre un espresso régulier, un entretien simple grâce au groupe amovible et un large réseau de pièces détachées. C'est la référence de l'entrée de gamme depuis plusieurs années.",
      },
      {
        q: "Peut-on faire un cappuccino avec une machine à 250-300 € ?",
        a: "Oui, à la buse vapeur manuelle : on fait mousser le lait au pichet, on rince ensuite. Pour un cappuccino automatique d'une pression, il faut monter à 350 € minimum (Philips série 2300 LatteGo).",
      },
      {
        q: "Broyeur acier ou céramique dans cette gamme ?",
        a: "De'Longhi privilégie l'acier (mouture précise), Philips la céramique (plus silencieuse et durable). Sur des grains d'espresso du commerce, la différence en tasse est faible ; elle se mesure au sonomètre.",
      },
    ],
  },
  "300-500": {
    chapo:
      "Entre 300 et 500 €, les machines à café à grains gagnent la carafe à lait automatique, un écran et davantage de recettes. C'est la tranche du meilleur rapport qualité-prix : broyeur réglable, système lait, entretien guidé, sans le surcoût du haut de gamme.",
    keyFacts: [
      { label: "Ce qui apparaît", value: "carafe à lait automatique (LatteGo, LatteCrema)" },
      { label: "Repères", value: "Philips 2300 (~355 €), De'Longhi Magnifica Evo, Philips 3200 LatteGo" },
      { label: "Rapport qualité-prix", value: "le meilleur du marché sur ce segment" },
    ],
    sections: [
      {
        h2: "Qu'obtient-on entre 300 et 500 € de plus qu'à 250 € ?",
        body:
          "Le cappuccino automatique, surtout. La carafe LatteGo de Philips (2 pièces, sans tuyau, nettoyage en 15 secondes) ou la LatteCrema de De'Longhi remplacent la buse manuelle : la machine moud, extrait, fait mousser et assemble d'une pression.\n\nOn gagne aussi un écran, quelques recettes mémorisées et parfois des profils utilisateurs. L'espresso lui-même n'est pas meilleur qu'à 300 € : c'est le confort d'usage qui change.",
      },
      {
        h2: "Faut-il dépasser 500 € pour une machine à café à grains ?",
        body:
          "Seulement si la finition premium, le nombre de recettes ou les boissons glacées sont des critères réels. L'écart de goût entre une machine à 400 € et une machine à 900 € est faible ; l'écart de prix ne l'est pas.\n\nÀ éviter : payer 700 € pour un espresso qu'une machine à 350 € fait aussi bien, juste pour un écran couleur.",
      },
    ],
    faq: [
      {
        q: "Quelle est la meilleure machine à café à grains entre 300 et 500 € ?",
        a: "La Philips série 2300 LatteGo (~355 €) pour le cappuccino automatique au meilleur prix. La De'Longhi Magnifica Evo pour un espresso régulier avec un mousseur revu. Les deux couvrent l'essentiel sans surpayer.",
      },
      {
        q: "La carafe à lait automatique vaut-elle le surcoût ?",
        a: "Si vous buvez un cappuccino par jour, oui : le temps et le geste économisés sur un an sont réels. Pour un cappuccino occasionnel, une machine à buse manuelle à 300 € suffit.",
      },
      {
        q: "300-500 € : grains ou machine expresso à porte-filtre ?",
        a: "Grains pour un café d'une pression sans effort. Porte-filtre à broyeur (Sage Barista Express, autour de 600 €) si vous voulez apprendre l'extraction et acceptez quelques semaines de prise en main.",
      },
    ],
  },
  "500-800": {
    chapo:
      "Entre 500 et 800 €, on trouve les machines à café à grains milieu-haut de gamme (De'Longhi Eletta, Philips série 5500) et les machines expresso à porte-filtre avec broyeur (Sage Barista Express). On paie le système lait complet, l'écran couleur et une meilleure finition.",
    keyFacts: [
      { label: "À grains", value: "De'Longhi Eletta, Philips 5400/5500, Melitta Barista" },
      { label: "Porte-filtre", value: "Sage Barista Express / Pro" },
      { label: "Ce qu'on paie", value: "système lait complet, écran, finition, plus de recettes" },
    ],
    sections: [
      {
        h2: "Qu'apporte une machine à café entre 500 et 800 € ?",
        body:
          "Sur les automatiques à grains : une carafe à lait automatique de série, un écran couleur, jusqu'à 20 boissons chaudes et glacées, des profils utilisateurs. L'extraction reste proche du milieu de gamme.\n\nSur les porte-filtre : un broyeur intégré de qualité et une vapeur puissante pour apprendre le geste complet. À ce prix, on peut choisir entre le confort automatique et le contrôle manuel.",
      },
    ],
    faq: [
      {
        q: "Quelle machine à café choisir entre 500 et 800 € ?",
        a: "Une De'Longhi Eletta ou une Philips série 5500 pour le confort automatique complet. Une Sage Barista Express si vous voulez apprendre l'espresso à porte-filtre. Le choix se fait sur automatique contre manuel, pas sur le prix.",
      },
      {
        q: "L'espresso est-il meilleur à 700 € qu'à 350 € ?",
        a: "Marginalement, sur une automatique à grains. L'écart se joue sur les prestations lactées, l'écran, les profils et la finition, pas sur la tasse de base. Sur un porte-filtre bien réglé, le plafond de qualité est plus haut.",
      },
      {
        q: "Faut-il un moulin séparé avec une Sage Barista Express ?",
        a: "Non pour débuter : le broyeur intégré suffit. Un moulin dédié améliore la régularité, mais ajoute 200 à 400 € et un appareil sur le plan de travail.",
      },
    ],
  },
  "800-1500": {
    chapo:
      "Entre 800 et 1 500 €, on entre dans le haut de gamme des machines à café à grains : De'Longhi PrimaDonna, Jura E8, Philips série 5500 haute. Écran couleur tactile, application, réservoir de 2 L, bac à grains de 400 g, entretien entièrement guidé. On paie la finition et la constance, pas un espresso deux fois meilleur.",
    keyFacts: [
      { label: "Repères", value: "De'Longhi PrimaDonna, Jura E8, De'Longhi Eletta Explore" },
      { label: "Ce qu'on gagne", value: "one-touch complet, écran, app, gros réservoir et bac à grains" },
      { label: "Réservoir / bac", value: "jusqu'à 2 L d'eau et 400 g de grains" },
    ],
    sections: [
      {
        h2: "Qu'est-ce qui justifie 800 à 1 500 € pour une machine à café ?",
        body:
          "La finition, la constance d'extraction sur la durée, un broyeur souvent céramique et silencieux, et l'automatisation complète : one-touch pour toutes les boissons lactées, écran couleur, application, cartouche filtrante intégrée.\n\nCe niveau de prix a du sens pour un foyer qui enchaîne les boissons variées chaque jour et veut zéro geste. À éviter si vous buvez surtout des espressos : une machine à 400 € les fait aussi bien.",
      },
    ],
    faq: [
      {
        q: "Une machine à café à 1 000 € fait-elle un meilleur espresso ?",
        a: "À peine, sur une automatique à grains. L'espresso d'une machine à 400 € et d'une machine à 1 000 € est proche. Ce qui change : le système lait, l'écran, les profils, la finition et la régularité sur cinq ans.",
      },
      {
        q: "Jura ou De'Longhi dans cette gamme ?",
        a: "Jura pour l'extraction soignée et le broyeur céramique le plus silencieux du marché. De'Longhi PrimaDonna pour un one-touch complet, un écran couleur et l'application, souvent à prix un peu plus bas à prestations comparables.",
      },
      {
        q: "Le haut de gamme est-il plus fiable ?",
        a: "Pas mécaniquement. La finition est meilleure et l'entretien mieux guidé, mais la durée de vie réelle dépend surtout du détartrage régulier et de la disponibilité des pièces, comme sur le milieu de gamme.",
      },
    ],
  },
  "plus-de-1500": {
    chapo:
      "Au-delà de 1 500 €, on paie l'extraction la plus soignée, les broyeurs céramique à ultra-basse vitesse (jusqu'à ~57 dB), les écrans tactiles larges, la connectivité et parfois la double chaudière. Jura Z10 et De'Longhi Maestosa dominent ce segment. La différence de goût avec le milieu de gamme est réelle mais mesurée.",
    keyFacts: [
      { label: "Repères", value: "Jura Z10, De'Longhi Maestosa, Eletta Explore haute" },
      { label: "Ce qu'on paie", value: "extraction, silence, finition, connectivité, double système" },
      { label: "Bruit au broyage", value: "jusqu'à ~57 dB sur les broyeurs céramique premium" },
    ],
    sections: [
      {
        h2: "Une machine à café à plus de 1 500 € en vaut-elle la peine ?",
        body:
          "Pour un amateur exigeant qui boit plusieurs cafés variés par jour et veut le meilleur sans compromis d'usage : oui. Broyeur céramique ultra-silencieux, pré-infusion pulsée, double réservoir de lait (chaud et froid), écran large, application complète.\n\nPour un usage familial classique, non : une machine à 400 à 600 € couvre 90 % du besoin. À éviter : payer 2 000 € pour un écran et une connectivité qu'on n'utilisera pas.",
      },
    ],
    faq: [
      {
        q: "Quelle est la meilleure machine à café haut de gamme ?",
        a: "La Jura Z10 pour l'extraction et le silence (broyeur céramique à ultra-basse vitesse, ~57 dB), la De'Longhi Maestosa pour la double chaudière et le one-touch complet. Les deux visent l'amateur exigeant, pas l'usage familial standard.",
      },
      {
        q: "Le café est-il vraiment meilleur au-dessus de 1 500 € ?",
        a: "Plus régulier et un peu plus fin, grâce à la stabilité de température et à des broyeurs supérieurs. L'écart avec une bonne machine à 500 € existe mais reste inférieur à l'écart de prix.",
      },
      {
        q: "Faut-il une double chaudière sur une machine automatique ?",
        a: "Utile seulement si vous enchaînez espresso et vapeur sans temps mort, plusieurs fois de suite. Pour un usage domestique normal, un thermoblock rapide suffit largement.",
      },
    ],
  },
};

// ─────────── Marques : contenu réutilisable par gamme ───────────
export const MARQUE_CONTENT: Record<string, HubContent> = {
  delonghi: {
    chapo:
      "De'Longhi couvre presque tout le marché domestique, de l'expresso à porte-filtre à 120 € à la machine à grains connectée à plus de 1 500 €. Sa force : une gamme lisible, des pièces détachées faciles à trouver et un rapport prix-prestations rarement pris en défaut sous 600 €.",
    sections: [
      {
        h2: "Quelles sont les gammes de machines à café De'Longhi ?",
        body:
          "Dedica et Stilosa : expresso à porte-filtre, très compact, 120 à 250 €, pour qui accepte de doser lui-même.\n\nMagnifica : machines à grains grand public, 300 à 600 €, entretien simple, buse vapeur manuelle sur la plupart des modèles. C'est le cœur du catalogue.\n\nDinamica et Rivelia : milieu de gamme, écran, davantage de recettes, carafe à lait sur les versions hautes.\n\nEletta : système lait automatique LatteCrema Hot, 700 à 1 000 €.\n\nPrimaDonna : haut de gamme one-touch, écran couleur tactile, application, réservoir 2 L, bac à grains 400 g, au-delà de 1 100 €.",
      },
      {
        h2: "Quelle machine à café De'Longhi choisir ?",
        body:
          "Pour une première machine à grains, une Magnifica autour de 300 à 350 € : elle fait un espresso régulier et se nettoie simplement.\n\nPasser à une Eletta ou une PrimaDonna n'améliore pas l'espresso : cela ajoute la carafe à lait automatique, l'écran et les profils. La seule question à se poser avant de payer 300 à 800 € de plus : le cappuccino automatique quotidien est-il indispensable ?",
      },
    ],
    faq: [
      {
        q: "Quelle est la meilleure machine à café De'Longhi ?",
        a: "Pour le rapport qualité-prix, la Magnifica S ou Magnifica Evo autour de 300 à 450 €. Pour le cappuccino automatique, une Eletta. Pour le haut de gamme complet, une PrimaDonna. L'espresso reste proche d'un bout à l'autre de la gamme.",
      },
      {
        q: "Quelle différence entre la Magnifica S et la Magnifica Evo ?",
        a: "L'Evo ajoute un panneau à touches sensitives, un mousseur revu et une meilleure isolation acoustique. Le broyeur et l'extraction restent proches. À moins de 60 € d'écart, l'Evo se justifie ; au-delà, la S reste un très bon choix.",
      },
      {
        q: "Les pièces détachées De'Longhi sont-elles faciles à trouver ?",
        a: "Oui, c'est un des points forts de la marque : groupe d'infusion, joints, buse et bac à marc sont largement distribués, y compris pour des modèles anciens. Cela pèse sur la durée de vie réelle.",
      },
      {
        q: "De'Longhi ou Philips pour une machine à grains ?",
        a: "De'Longhi pour une mouture précise sur broyeur acier et un large réseau de pièces. Philips pour un broyeur céramique plus silencieux et le système lait LatteGo, simple à nettoyer. À budget égal, les deux se valent sur la tasse.",
      },
    ],
  },
  philips: {
    chapo:
      "Philips mise sur le broyeur à meules céramique (silencieux, durable) et le système lait LatteGo, une carafe en deux pièces sans tuyau qui se rince en quinze secondes. La gamme va de la série 800 d'entrée de gamme à la série 5500 avec écran et boissons glacées.",
    sections: [
      {
        h2: "Comment se répartissent les séries Philips ?",
        body:
          "Séries 800 à 2200 : entrée de gamme, buse vapeur classique ou mousseur simple, 250 à 350 €.\n\nSérie 2300 : première à intégrer la carafe LatteGo, 4 boissons, autour de 350 €.\n\nSéries 3200 à 4400 : plus de recettes, écran, LatteGo de série.\n\nSérie 5400 à 5500 : jusqu'à 20 boissons chaudes et glacées, écran couleur, autour de 550 €.",
      },
      {
        h2: "Quelle machine à café Philips choisir ?",
        body:
          "Pour un cappuccino automatique au meilleur prix, la série 2300 avec LatteGo. Pour la polyvalence familiale, une série 3200 ou 4400. La série 5500 n'a de sens que si les boissons glacées et l'écran couleur sont des critères réels.\n\nToutes partagent le broyeur céramique, plus silencieux que la moyenne du marché.",
      },
    ],
    faq: [
      {
        q: "Quelle est la meilleure machine à café Philips ?",
        a: "La série 2300 LatteGo pour le rapport qualité-prix sur le cappuccino automatique, la série 5500 pour la polyvalence maximale. Le broyeur céramique commun à la gamme la place parmi les plus silencieuses.",
      },
      {
        q: "Le système LatteGo est-il vraiment plus simple à nettoyer ?",
        a: "Oui : deux pièces, aucun conduit interne, un passage sous l'eau ou au lave-vaisselle en quinze secondes. C'est l'argument principal de Philips face aux carafes à tuyaux et à la buse manuelle.",
      },
      {
        q: "Les machines Philips sont-elles silencieuses ?",
        a: "Plus que la moyenne, grâce au broyeur céramique : la série 5400 se situe vers 65 dB au broyage, la série 3200 vers 68 dB, contre 70 dB et plus pour beaucoup de broyeurs acier.",
      },
      {
        q: "Quelle différence entre la série 2300 et la série 5500 ?",
        a: "La 2300 propose 4 boissons, sans écran. La 5500 en propose jusqu'à 20, chaudes et glacées, avec un écran couleur et des profils. Le café de base est proche ; c'est le confort et la variété qui séparent les deux.",
      },
    ],
  },
  jura: {
    chapo:
      "Jura est une marque suisse positionnée sur le haut de gamme, avec des broyeurs céramique à basse vitesse (parmi les plus silencieux du marché, jusqu'à ~57 dB), des systèmes lait automatiques et un entretien très guidé. Les prix démarrent autour de 700 € et dépassent 2 000 € sur les modèles connectés.",
    sections: [
      {
        h2: "Pour qui les machines Jura sont-elles faites ?",
        body:
          "Pour qui veut une extraction soignée, un fonctionnement silencieux et un entretien assisté de bout en bout, et accepte d'y mettre le prix. Les modèles E8 et Z10 concentrent ce positionnement : broyeur céramique, écran, pré-infusion pulsée, cartouche filtrante intégrée.\n\nÀ éviter si le budget est un critère : à prestations lactées comparables, une De'Longhi Eletta ou une Philips 5500 coûtent 300 à 500 € de moins.",
      },
    ],
    faq: [
      {
        q: "Quelle est la meilleure machine à café Jura ?",
        a: "La E8 pour un premier Jura polyvalent autour de 1 300 €, la Z10 pour le haut de gamme avec broyeur céramique ultra-basse vitesse et boissons froides. Les deux visent l'extraction soignée et le silence.",
      },
      {
        q: "Les machines Jura sont-elles vraiment silencieuses ?",
        a: "Oui, c'est un de leurs points forts : broyeur céramique à vitesse réduite, autour de 57 à 62 dB au broyage sur les modèles hauts, contre 66 à 70 dB pour la moyenne du marché.",
      },
      {
        q: "Jura vaut-il son prix face à De'Longhi ou Philips ?",
        a: "Sur l'extraction et le silence, l'écart est réel mais mesuré. Sur les prestations lactées et le nombre de recettes, une Eletta ou une 5500 à 300-500 € de moins font jeu égal. Jura se paie surtout sur la finition et la constance.",
      },
    ],
  },
  sage: {
    chapo:
      "Sage (Breville hors Europe) est spécialiste des machines expresso à porte-filtre avec broyeur intégré, orientées apprentissage de l'extraction. La Barista Express et la Barista Pro sont les références pour débuter le café « comme au comptoir », autour de 600 à 900 €.",
    sections: [
      {
        h2: "Pour qui les machines Sage sont-elles faites ?",
        body:
          "Pour qui veut apprendre le geste complet — mouture, dose, tassage, texture du lait à la vapeur — sans acheter un moulin séparé. La Barista Express intègre tout dans un seul appareil.\n\nÀ éviter si vous voulez un café d'une pression sans y penser : Sage ne fait pas d'automatique à grains. Dans ce cas, une De'Longhi ou une Philips automatique est le bon choix.",
      },
    ],
    faq: [
      {
        q: "Quelle machine Sage pour débuter l'espresso ?",
        a: "La Barista Express : broyeur intégré, vapeur, tout-en-un autour de 600 à 700 €. La Barista Pro ajoute une chauffe plus rapide et un écran. Comptez quelques semaines de prise en main.",
      },
      {
        q: "Sage ou machine automatique à grains ?",
        a: "Sage pour le contrôle et un meilleur plafond de qualité si vous acceptez d'apprendre. Automatique pour la régularité sans effort. Le porte-filtre Sage récompense la pratique ; il punit la précipitation.",
      },
      {
        q: "Faut-il un moulin séparé avec une Sage Barista Express ?",
        a: "Non pour débuter : le broyeur intégré suffit largement. Un moulin dédié de qualité améliore la régularité, mais ajoute 200 à 400 € et un appareil sur le plan de travail.",
      },
    ],
  },
  krups: {
    chapo:
      "Krups couvre l'entrée et le milieu de gamme des machines à grains, souvent au prix le plus bas du marché (à partir d'environ 112 €), ainsi qu'une large offre de machines à capsules Nespresso et Dolce Gusto. Le compromis se fait sur la finition et les réglages, pas sur le principe du grain frais.",
    sections: [
      {
        h2: "Que valent les machines à grains Krups ?",
        body:
          "Les modèles Evidence et Virtuoso proposent un broyeur acier, 15 bars et un espresso correct pour 112 à 350 €. Les réglages sont plus limités que chez De'Longhi, la finition plus basique, mais le café en grains frais est déjà nettement au-dessus des capsules.\n\nKrups fabrique aussi une bonne partie des machines à capsules Nespresso et Dolce Gusto vendues sous ces marques.",
      },
    ],
    faq: [
      {
        q: "Quelle est la meilleure machine à café à grains Krups ?",
        a: "La gamme Evidence pour un bon compromis autour de 300 à 350 € avec broyeur discret. La Virtuoso+ pour le prix plancher, autour de 112 à 180 €, avec des réglages réduits.",
      },
      {
        q: "Krups ou De'Longhi en entrée de gamme ?",
        a: "Krups pour le prix le plus bas. De'Longhi (Magnifica S vers 279 €) pour un groupe d'infusion amovible, plus de crans de mouture et un réseau de pièces plus dense. L'écart de prix se retrouve dans l'usage.",
      },
    ],
  },
  melitta: {
    chapo:
      "Melitta est une marque allemande reconnue pour ses cafetières filtre et ses machines à grains polyvalentes, souvent équipées d'un cappuccinatore ou d'une carafe à lait. Plusieurs modèles proposent une double trémie à grains, utile dans un foyer aux goûts variés.",
    sections: [
      {
        h2: "Qu'est-ce qui distingue les machines à grains Melitta ?",
        body:
          "La double trémie sur certains modèles (Barista) : deux cafés différents disponibles sans vider le bac, par exemple un décaféiné et un classique. Peu de constructeurs le proposent.\n\nLe reste de la gamme (Caffeo, Solo Perfect Milk) mise sur un cappuccinatore fixé à la machine : plus simple qu'une carafe amovible, un peu moins pratique à nettoyer.",
      },
    ],
    faq: [
      {
        q: "Quelle est la meilleure machine à café Melitta ?",
        a: "La gamme Barista pour la double trémie à grains et les profils utilisateurs, dans un foyer où chacun boit un café différent. La Caffeo Solo Perfect Milk pour un modèle compact avec cappuccinatore à prix contenu.",
      },
      {
        q: "À quoi sert la double trémie à grains Melitta ?",
        a: "À garder deux cafés en parallèle sans manipulation : un décaféiné et un classique, ou deux torréfactions. La machine bascule de l'un à l'autre au moment de la commande.",
      },
    ],
  },
};

// Marques sans fiche détaillée : un contenu générique mais réel.
export function genericMarqueContent(brand: string): HubContent {
  return {
    chapo: `Nous suivons les machines à café ${brand} du modèle d'entrée au haut de gamme. Cette page liste les références disponibles, classées par note, avec le prix relevé sur Amazon quand le produit y est vendu.`,
    sections: [
      {
        h2: `Comment choisir une machine à café ${brand} ?`,
        body: `Le raisonnement reste le même que pour les autres marques : type de machine (grains, capsules, expresso), gestion du lait (buse manuelle ou carafe automatique) et facilité d'entretien (groupe d'infusion amovible ou fixe). Le nom de la gamme compte moins que ces trois points.\n\nComparez toujours le prix à modèle équivalent chez De'Longhi et Philips, qui fixent la référence du marché sur la plupart des segments.`,
      },
    ],
    faq: [
      {
        q: `Les machines à café ${brand} sont-elles fiables ?`,
        a: `La fiabilité dépend surtout du modèle et de l'entretien (détartrage régulier, grains non huileux). Le point à vérifier avant l'achat : la disponibilité des pièces détachées et du service après-vente pour la référence visée.`,
      },
      {
        q: `Machine à café ${brand} ou De'Longhi ?`,
        a: `À budget égal, comparez le type de broyeur, le système lait et l'accès au groupe d'infusion. De'Longhi sert de référence de prix ; une autre marque se justifie si elle apporte un avantage concret (silence, système lait plus simple, format plus compact).`,
      },
    ],
  };
}
