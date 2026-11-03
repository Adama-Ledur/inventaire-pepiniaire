# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, et absent de l'inventaire reçu | — | N09 |
| `nomCommun` | Nom commun de l'espèce | texte | n'importe quel texte non vide | — | cacao |
| `groupe` | groupe botanique de l'espèce | texte | nom présent dans GROUPES | — | angiosperme |
| `nombrePlants` | Nombre de plants disponibles | entier | un nombre entier positif ou nul | plants | 1000 |
| `dateReleve` | date de comptage | date | 	une date qui existe, au format AAAA-MM-JJ | — | 2026-10-24 |

**Listes de valeurs autorisées** : <br>
`id :` N09, N10, ... <br>
`nomCommun :` pin, cacao, tomate, ...<br>
`groupe :` angiosperme ou gymnosperme<br>
`nombrePlants :` '2,5', '-3', 'douze' et '' sont refusés<br>
`dateReleve :` 2026-10-24, 2026-11-03<br>

**Sources** :<br>
SUJET.md<br>
donnees/plants.json<br>
docs/ajouter-lister.md<br>