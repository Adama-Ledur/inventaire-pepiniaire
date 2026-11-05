// Rechercher et trier les plants.
// Fiche : fiches/4-rechercher-trier.md · Vérifier : npm run test:recherche

// Renvoie un NOUVEAU tableau avec les plants dont le nom commun CONTIENT le texte cherché,
// sans tenir compte des majuscules : 'PALM' trouve 'palmier à huile'. Éventuellement vide.
export function rechercherParNom(plants, texte) {

  const texteRecherche = new RegExp(`${texte}`, 'i');
  const resultatRecherche = [];

  for (let plant of plants) {

    if (plant.nomCommun.search(texteRecherche) !== -1) {
      resultatRecherche.push(plant);
    };

  };
  return resultatRecherche;

};

// Renvoie un NOUVEAU tableau avec les plants de ce groupe botanique (éventuellement vide).
export function filtrerParGroupe(plants, groupe) {

  return plants.filter( plant => plant.groupe === groupe );

}

// Renvoie une COPIE triée par nombre de plants croissant, avec un comparateur numérique.
// Deux plants de même nombre gardent leur ordre d'origine. Le tableau reçu ne doit pas changer d'ordre.
export function trierParNombrePlants(plants) {

  const plantsTrie = [...plants];
  plantsTrie.sort((a, b) => a.nombrePlants - b.nombrePlants);
  return plantsTrie;
  
}
