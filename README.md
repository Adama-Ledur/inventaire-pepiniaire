# Inventaire de la pépinière

## Contexte
<div align=justify>
Cet outil est destiné au responsable d'une pépinière pédagogique. Son geste professionnel consiste à observer les étiquettes et les organes des plantes, à les classer, les compter et saisir l'origine du relevé. Son besoin est de structurer son inventaire et y appliquer une classification botanique (Angiosperme VS Gymnosperme) simple à partir d'une fiche de référence. Ce responsable veut pouvoir sélectionner une espèce, et en retour voire le groupe botanique auquel elle appartient ainsi que les quantités disponibles.
<br>
<br>
Cet outil permettra à ce responsable de lister les plants de l'inventaire et d'en ajouter de nouveaux, de les rechercher et les trier selon plusieurs critères (id, nom, groupe, nombre). Il permettra aussi de faire une synthèse présentant les quantités, l'abondance et le stock des différentes espèces. L'outil ne dispose actuellement d'aucune interface graphique. D'autre par il ne permet ni d'enregistrer les sorties de plants de la pépinière ni d'évaluer les ventes de plants. Il ne permet pas non plus d'évaluer la rentabilité de la pépinière.
</div>

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-2-inventaire-pepiniere.git
cd brief-2-inventaire-pepiniere
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [ ] Données lues et enregistrées dans `donnees/plants.json`
- [ ] Ajouter un plant, saisies invalides refusées sans arrêter le programme
- [ ] Lister l'inventaire, message si l'inventaire est vide
- [ ] Rechercher par code ou par nom ; filtrer par groupe botanique
- [ ] Trier par nombre de plants
- [ ] Synthèse : stock total, espèces et plants par groupe, espèce la plus abondante, stocks faibles (≤ 10 plants)
- [ ] Bonus : supprimer et modifier un plant (choix 6 et 7)
- [ ] Bonus : tri décroissant, groupe le plus fourni

## Données

✏️ *Le fichier, le nombre de lignes, les champs (voir [docs/dictionnaire-donnees.md](docs/dictionnaire-donnees.md)), l'unité. Rappelez qu'elles sont fictives et que les groupes sont fournis par le coach.*

## Limites

✏️ *Au moins trois. Par exemple : le seuil de 10 plants est un repère de suivi, pas une recommandation de production.*

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

**Adama KONATE, Adama-Ledur**<br>
Entraide :
Konan Anglovia Kouassi, dans la programmation du comportement de `app.js` face à un `Ctrl-C`.<br>
Kamagaté Salia Abdallah : dans l'utilisation du kit fourni au niveau de `app.js`
