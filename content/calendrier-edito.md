# Calendrier éditorial — 10minutescafe

Source de la tâche planifiée quotidienne (`docs/SCHEDULED-TASK-REDACTION.md`).
Un contenu par jour, pris dans l'ordre : priorité `P1` avant `P2` avant `P3`,
et à priorité égale, la ligne la plus haute non `done`.

## Règles de la file

- **Statut** : `todo` → `done` (mis à jour par la tâche après commit). `hold` = à ne pas prendre.
- **Format** : `blog` (guide/informatif), `comparatif` (A vs B), `avis` (test solo).
- **Mot-clé** : requête cible principale, telle que tapée.
- **Hub** : page hub à lier en maillage interne (au moins un lien vers ce hub dans l'article).
- **ASIN** : produits à synchroniser via `amazon_sync_product` avant rédaction. `—` si aucun.
- La tâche NE prend jamais une ligne dont un ASIN ne se résout pas (produit introuvable) : elle passe à la suivante et le signale.

| Prio | Format | Titre de travail | Mot-clé principal | Intention | Hub cible | Slug | ASIN | Statut |
|---|---|---|---|---|---|---|---|---|
| P1 | blog | Meilleure machine à café à grains (année en cours) | meilleure machine à café à grains | transactionnelle | /machines/a-grains | meilleure-machine-cafe-grains | B00400OMU0, B0CDCCZ9K8, B09TKRNWJX, B0CTCQKJ1B | todo |
| P1 | blog | Meilleure machine à café à capsules | meilleure machine à café à capsules | transactionnelle | /machines/a-capsules | meilleure-machine-cafe-capsules | B0G5RW6CJP, B08BLSVNFQ | todo |
| P1 | comparatif | De'Longhi Eletta Evo vs Philips 5500 LatteGo | eletta evo ou philips 5500 | transactionnelle | /machines/besoin/cappuccino | delonghi-eletta-evo-vs-philips-5500 | B09TKRNWJX, B0CTCQKJ1B | todo |
| P1 | blog | Combien coûte vraiment un café à la maison ? | coût d'un café maison | informationnelle | /machines/besoin/pas-chere | cout-cafe-maison | B00400OMU0, B0G5RW6CJP | todo |
| P1 | avis | De'Longhi Magnifica S : test et avis | avis de'longhi magnifica s | navigationnelle | /marques/delonghi | avis-delonghi-magnifica-s | B00400OMU0 | todo |
| P1 | blog | Machine à café silencieuse : laquelle choisir ? | machine à café silencieuse | transactionnelle | /machines/besoin/silencieuse | machine-cafe-silencieuse | B00400OMU0, B0CDCCZ9K8 | todo |
| P1 | comparatif | Nespresso vs Dolce Gusto : quelles capsules ? | nespresso ou dolce gusto | transactionnelle | /machines/a-capsules | nespresso-vs-dolce-gusto | B0G5RW6CJP, B08BLSVNFQ | todo |
| P2 | blog | Broyeur acier ou céramique : quelle différence ? | broyeur acier ou céramique | informationnelle | /machines/avec-broyeur | broyeur-acier-ou-ceramique | — | todo |
| P2 | blog | Quelle pression faut-il vraiment pour un espresso ? | pression espresso 9 ou 15 bars | informationnelle | /machines/expresso | pression-espresso-9-15-bars | — | todo |
| P2 | blog | Comment détartrer sa machine à café sans l'abîmer | détartrer machine à café | informationnelle | /machines/a-grains | detartrer-machine-cafe | — | todo |
| P2 | avis | De'Longhi Eletta Evo : test et avis | avis de'longhi eletta evo | navigationnelle | /machines/besoin/cappuccino | avis-delonghi-eletta-evo | B09TKRNWJX | todo |
| P2 | avis | Philips série 2300 LatteGo : test et avis | avis philips 2300 lattego | navigationnelle | /marques/philips | avis-philips-2300-lattego | B0CDCCZ9K8 | todo |
| P2 | blog | Meilleure machine à café moins de 300 € | machine à café pas chère | transactionnelle | /machines/budget/200-300 | meilleure-machine-cafe-moins-300-euros | B0G5RW6CJP, B08BLSVNFQ | todo |
| P2 | comparatif | Machine à grains vs machine à piston | machine à grains ou piston | informationnelle | /machines/a-grains | machine-grains-vs-piston | B00400OMU0 | todo |
| P2 | blog | LatteGo, carafe ou buse vapeur : quel système lait ? | système lait machine à café | informationnelle | /machines/besoin/cappuccino | systeme-lait-machine-cafe | B0CDCCZ9K8, B00400OMU0 | todo |
| P2 | avis | Severin cafetière filtre à broyeur : test | avis severin filtre broyeur | navigationnelle | /machines/filtre | avis-severin-filtre-broyeur | B0GMXNJJ4V | todo |
| P2 | blog | Machine à café pour une famille : les critères | machine à café familiale | transactionnelle | /machines/besoin/familiale | machine-cafe-familiale | B0CTCQKJ1B, B09TKRNWJX | todo |
| P3 | blog | Bien régler son broyeur en 5 minutes | régler broyeur machine à café | informationnelle | /machines/avec-broyeur | regler-broyeur-machine-cafe | — | todo |
| P3 | blog | Quel café en grains pour une machine automatique ? | café en grains pour machine automatique | informationnelle | /machines/a-grains | cafe-grains-machine-automatique | — | todo |
| P3 | comparatif | De'Longhi La Specialista Touch vs Sage Barista Express | specialista touch ou barista express | transactionnelle | /machines/expresso | specialista-touch-vs-barista-express | B0DVM1T4NP | todo |
| P3 | blog | Nettoyer le circuit lait d'une machine automatique | nettoyer circuit lait machine à café | informationnelle | /machines/besoin/cappuccino | nettoyer-circuit-lait | — | todo |
| P3 | avis | Nespresso Essenza Mini : test et avis | avis nespresso essenza mini | navigationnelle | /machines/a-capsules | avis-nespresso-essenza-mini | B0G5RW6CJP | todo |
| P3 | blog | Machine à café compacte : le comparatif petit espace | machine à café compacte | transactionnelle | /machines/compactes | machine-cafe-compacte | B0G5RW6CJP, B08BLSVNFQ | todo |
| P3 | blog | Faut-il un filtre à eau sur sa machine à café ? | filtre à eau machine à café | informationnelle | /machines/a-grains | filtre-eau-machine-cafe | — | todo |
| P3 | blog | Espresso, lungo, ristretto : quelles différences ? | différence espresso lungo ristretto | informationnelle | /machines/expresso | espresso-lungo-ristretto | — | todo |
| P3 | comparatif | Philips 2300 vs Philips 5500 : laquelle choisir ? | philips 2300 ou 5500 | transactionnelle | /marques/philips | philips-2300-vs-5500 | B0CDCCZ9K8, B0CTCQKJ1B | todo |
| P3 | blog | Machine à café au bureau : quel modèle pour 10 personnes ? | machine à café bureau | transactionnelle | /machines/besoin/familiale | machine-cafe-bureau | B0CTCQKJ1B | todo |
| P3 | blog | Combien de temps dure une machine à café à grains ? | durée de vie machine à café à grains | informationnelle | /machines/a-grains | duree-vie-machine-cafe-grains | — | todo |
| P3 | blog | Grains huileux et broyeur : pourquoi les éviter | grains huileux broyeur | informationnelle | /machines/avec-broyeur | grains-huileux-broyeur | — | todo |
| P3 | avis | Philips série 5500 LatteGo : test et avis | avis philips 5500 lattego | navigationnelle | /marques/philips | avis-philips-5500-lattego | B0CTCQKJ1B | todo |
| P3 | blog | Machine à café et eau calcaire : ce qu'il faut savoir | machine à café eau calcaire | informationnelle | /machines/a-grains | machine-cafe-eau-calcaire | — | todo |
| P3 | comparatif | Capsules réutilisables : bon plan ou fausse économie ? | capsules nespresso réutilisables | informationnelle | /machines/a-capsules | capsules-reutilisables | B0G5RW6CJP | todo |
| P3 | blog | Quelle machine pour passer des capsules aux grains ? | passer des capsules aux grains | transactionnelle | /machines/a-grains | passer-capsules-aux-grains | B00400OMU0, B0CDCCZ9K8 | todo |
| P3 | blog | Mousser le lait à la buse vapeur : la méthode | mousser lait buse vapeur | informationnelle | /machines/besoin/cappuccino | mousser-lait-buse-vapeur | — | todo |
| P3 | avis | De'Longhi La Specialista Touch : test et avis | avis la specialista touch | navigationnelle | /machines/expresso | avis-la-specialista-touch | B0DVM1T4NP | todo |
| P3 | blog | Machine à café haut de gamme : à partir de quel prix ça vaut le coup ? | machine à café haut de gamme | transactionnelle | /machines/budget/800-1500 | machine-cafe-haut-de-gamme | B0DVM1T4NP | todo |
| P3 | blog | Consommation électrique d'une machine à café : le vrai calcul | consommation électrique machine à café | informationnelle | /machines/a-grains | consommation-electrique-machine-cafe | — | todo |
| P3 | blog | Dolce Gusto : avantages, limites et coût par tasse | machine dolce gusto avis | navigationnelle | /machines/a-capsules | dolce-gusto-avis-cout-tasse | B08BLSVNFQ | todo |
| P3 | blog | Machine à café pour deux personnes : quel modèle | machine à café pour 2 personnes | transactionnelle | /machines/besoin/pas-chere | machine-cafe-deux-personnes | B0G5RW6CJP, B00400OMU0 | todo |
| P3 | blog | Entretien machine à café : le calendrier annuel | entretien machine à café | informationnelle | /machines/a-grains | entretien-machine-cafe-calendrier | — | todo |
