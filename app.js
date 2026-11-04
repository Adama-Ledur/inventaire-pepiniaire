// Inventaire de la pépinière — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { GROUPES, ajouterPlant, formaterPlant, listerPlants, trouverParId } from './src/registre.js';
import { filtrerParGroupe, rechercherParNom, trierParNombrePlants } from './src/recherche.js';
import { SEUIL_STOCK_FAIBLE, especeLaPlusAbondante, stocksFaibles, syntheseParGroupe, totalPlants } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/plants.json';


// afficher la page d'accueil
function afficherPageAccueil () {

  const accueil = [
    '==================================================',
    'INVENTAIRE DE LA PÉPINIÈRE',
    'Pépinière pédagogique',
    '=================================================='
  ]

  console.log(accueil.join('\n'));
};


// afficher le menu
function afficherMenu () {

  const menu = [
    '--------------------- MENU ---------------------',
    '1. Ajouter un plant',
    '2. Lister l\'inventaire',
    '3. Rechercher (code, nom, groupe)',
    '4. Trier (nombre de plants)',
    '5. Synthèse des quantités',
    '0. Quitter'
  ]

  console.log(menu.join('\n'));

};


// charger les plants
async function chargerPlants() {
  
  try {
    const plants = await chargerJson(FICHIER_DONNEES);
    console.log(`${plants.length} espèce(s) chargée(s) depuis ${FICHIER_DONNEES}`);
    return plants
  } catch (erreur) {
    console.error(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}`);
    return []
  };
};


// Une fonction pour demander à l'utilisateur d'entrer les informations
// relatives aux plants
async function prendreSaisie() {

  // une matrice pour les saisies de l'utilisateur
  const reponses = {
    id: undefined,
    nomCommun: undefined,
    groupe: undefined,
    nombrePlants: undefined,
    dateReleve: undefined};

  // les questions à poser à l'utilisateur
  const questions = {
    id: 'Code du plant (ex. N11) : ',
    nomCommun: 'Nom commun (ex. papayer) : ',
    groupe: 'Groupe botanique (angiosperme ou gymnosperme) : ',
    nombrePlants: 'Nombre de plants (entier) : ',
    dateReleve: 'Date du relevé (AAAA-MM-JJ) : '
  };

  // créer l'interface de saisie avant car un seul 
  // interface gère l'ensemble des instruction qui y ont lieu
 // ouvrirSaisie();

  // poser les différentes questions
  for (const [cle, question] of Object.entries(questions)) {
    reponses[cle] = await demander(question);
  };

  // fermer l'interface de service
  // fermerSaisie();
  
  // renvoyer les reponses
  return reponses
};

// convertir les textes de miniscule à majuscule et vice-versa
function changerCasse(saisie){

  for (let val of Object.keys(saisie)) {
    if (val !== "id") {
      saisie[val] = saisie[val].toLowerCase();
    } else {
      saisie[val] = saisie[val].toUpperCase();
    };
  };
  
};


// Une fonction pour demander à l'utilisateur d'entrer les informations
// relatives aux plants
async function ajouter(plants, saisie){
  const erreurs = ajouterPlant(plants, saisie);
  let message = [];

  // ajouter le plant
  if (erreurs.length !== 0) {
    message = [...erreurs]
    message = erreurs.map(erreur => `- ${erreur}`)
    message.unshift('Ajout refusé : ')
    message.push(`L'inventaire compte toujours ${plants.length} espèce(s).`)
    
    console.log(message.join('\n'));
  };
  
};


async function main() {


  // Affichage de l'ecran d'accueil
  afficherPageAccueil();

  // chargement du fichier contenant les données
  let plants = await chargerPlants();


  let choix;
  ouvrirSaisie();
  do {
    // afficher le menu
    afficherMenu();
    // enregistrer le choix de l'utilisateur
    const QUESTION_CHOIX = 'Votre choix : '
    choix = await demander(QUESTION_CHOIX);
    choix = choix.trim();

    
    switch (choix) {

      case '1' :
        const saisie = await prendreSaisie();
        changerCasse(saisie);
        ajouter(plants, saisie);
        break;

      case '2' :
        console.log(listerPlants(plants));
        break;

      case '3' :
        // todo
        console.log('À compléter : …' );
        break;

      case '4' :
        // todo
        console.log('À compléter : …' );
        break;

      case '5' :
        // todo
        console.log('À compléter : …' );
        break;

      case '0' :
        // le menu ne s'affiche pas quand l'utilisateur souhaite quitter la session
        console.log('Au revoir !' );
        break;
        
      default :
        console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
    };
  } while ( choix !== "0");
  fermerSaisie();
}

main();
