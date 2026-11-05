# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : refaites à la main les résultats de référence de `SUJET.md`, puis comparez avec votre programme. ✏️

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
| Ajout du code `S11` | SUCCES | SUCCES | Junior DJONGON |
| Ajout du code `chaine vide` | ECHEC | ECHEC | Junior DJONGON |
| Ajout du nom commnun `chaine vide` | ECHEC | ECHEC | Junior DJONGON |
| Ajout du groupe `angyogymonsperme` | ECHEC  | ECHEC | Junior DJONGON |
| Ajout du nombre de plant `-5` | ECHEC | ECHEC | Junior DJONGON |
| Ajout du nombre de plant `2,5`  | ECHEC | ECHEC | Junior DJONGON |
| Ajout du nombre de plant `douze`  | ECHEC | ECHEC | Junior DJONGON |
| Ajout du nombre de plant ``  | ECHEC | ECHEC | Junior DJONGON |
| Ajout du nombre de la date `05-05-1990`  | ECHEC | ECHEC | Junior DJONGON |
| Recherche par code `N09` | SUCCES | SUCCES | Kamenan Kouamé Guy Christopher |
| Recherche par code `N99` | ECHEC | ECHEC | Kamenan Kouamé Guy Christopher |
| Recherche par nom `palmier`| SUCCES | SUCCES | Kamenan Kouamé Guy Christopher |
| Recherche par groupe `gymnosperme` | SUCCES | SUCCES | Kamenan Kouamé Guy Christopher |
| Synthèse affiche les espèces au stock faible y compris une espèce ajoutée ayant `5 plants` | SUCCES | SUCCES | Mahan Jean Marc |



**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : ✏️
