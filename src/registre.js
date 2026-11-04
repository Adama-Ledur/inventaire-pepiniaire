// Ajouter et lister les plants.
// Fiche : fiches/3-ajouter-lister.md · Vérifier : npm run test:registre
import { estDateValide, versNombre } from './outils.js';

// Liste fermée des groupes botaniques acceptés, fournie et validée par le coach agronomie.
export const GROUPES = ['angiosperme', 'gymnosperme'];

// Renvoie une ligne de texte qui décrit le plant.
// Exemple : 'N09 | pin | gymnosperme | 8 plants | 2026-10-24'
export function formaterPlant(plant) {
  return `${plant.id} | ${plant.nomCommun} | ${plant.groupe} | ${plant.nombrePlants} plants | ${plant.dateReleve}`;
}

// Renvoie un texte avec un plant par ligne (lignes séparées par '\n'),
// ou 'Aucun plant enregistré.' si la liste est vide.
export function listerPlants(plants) {
  return plants.length > 0 ? plants.map((plant) => formaterPlant(plant)).join("\n") : 'Aucun plant enregistré.';
}

// Renvoie le plant qui a ce code (identifiant), ou undefined s'il n'existe pas.
export function trouverParId(plants, id) {
  return plants.find((plant) => plant.id === id)
}

// Contrôle une saisie AVANT de l'ajouter. Tous les champs arrivent sous forme de TEXTE :
// { id: 'N11', nomCommun: 'papayer', groupe: 'angiosperme', nombrePlants: '15', dateReleve: '2026-10-27' }
// Renvoie un tableau de messages d'erreur, un message par règle non respectée ;
// un tableau vide signifie « saisie valide ».
// Règles : id obligatoire et unique · nomCommun obligatoire · groupe présent dans GROUPES
// · nombrePlants nombre ENTIER positif ou nul · dateReleve réelle au format AAAA-MM-JJ.
export function verifierPlant(saisie, plants) {
  const listeErreurs = [];

  // vérifier que l'id n'est pas vide
  if (saisie.id === "") {
    listeErreurs.push("Le code du plant est obligatoire.");
  };

  // vérification de l'unicité de l'id
  if (plants.some((plant) => plant.id === saisie.id)) {
    listeErreurs.push("Le code du plant doit être unique.");
  };

  // vérifier que nomCommun n'est pas vide
  if (saisie.nomCommun === "") {
    listeErreurs.push("Le nom commun est obligatoire.");
  };

  // vérification du groupe
  if (!GROUPES.includes(saisie.groupe)) {
    listeErreurs.push("Le groupe doit être < angiosperme > ou <gymnosperme>.");
  };

  // Vérifier que nombrePlants est un entier
  const nombrePlants = versNombre(saisie.nombrePlants);
  if (!Number.isInteger(nombrePlants)) {
    listeErreurs.push("Le nombre de plants n'est pas un entier.");
  };

  // vérification du signe du nombre
  if ( Math.sign(nombrePlants) === -1 ) {
    listeErreurs.push("Le nombre de plants ne doit pas être négatif.");
  };

  // vérification de la date de relevé
  if (!estDateValide(saisie.dateReleve)) {
    listeErreurs.push("La date doit être au format AAAA-MM-JJ.");
  };

  return listeErreurs}

// Fabrique le plant à enregistrer à partir d'une saisie VALIDE : nombrePlants devient un nombre.
export function creerPlant(saisie) {
  const nouveauPlant = saisie;
  nouveauPlant.nombrePlants = versNombre(nouveauPlant.nombrePlants);
  return nouveauPlant
}

// Ajoute la saisie à l'inventaire si elle est valide (verifierPlant, puis creerPlant).
// Renvoie les erreurs : [] si le plant a été ajouté ; sinon les messages, et rien n'est ajouté.
export function ajouterPlant(plants, saisie) {

  const erreurs = verifierPlant(saisie, plants)

  if ( erreurs.length === 0 ) {
    plants.push(creerPlant(saisie))
    return [];
  } else { 
      return erreurs
  };
};
