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
function afficherMenuPrincipal () {

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


function afficherMenuRecherche () {

	const menu = [
		'--- Rechercher ---',
		'1. Par code',
		'2. Par nom commun',
		'3. Les espèces d\'un groupe botanique'
	];

	console.log(menu.join('\n'))

};


function afficherMenuTrier () {

	const menu = [
		'--- Trier ---',
		'1. Par nombre de plants croissant'
	];

	console.log(menu.join('\n'))

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


// demander à l'utilisateur d'entrer les informations relatives aux plants
async function prendreSaisie() {

// une matrice pour les saisies de l'utilisateur
	const reponses = {
		id: undefined,
		nomCommun: undefined,
		groupe: undefined,
		nombrePlants: undefined,
		dateReleve: undefined
	};

	// les questions à poser à l'utilisateur
	const questions = {
		id: 'Code du plant (ex. N11) : ',
		nomCommun: 'Nom commun (ex. papayer) : ',
		groupe: 'Groupe botanique (angiosperme ou gymnosperme) : ',
		nombrePlants: 'Nombre de plants (entier) : ',
		dateReleve: 'Date du relevé (AAAA-MM-JJ) : '
	};

	// poser les différentes questions
	for (const [cle, question] of Object.entries(questions)) {
		reponses[cle] = await demander(question);
	};

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


// demander à l'utilisateur de faire un choix
async function choixOption() {

	return await demander('Votre choix : ')

}


// demander un indice pour la recherche à l'utilisateur
async function demanderIndiceRecherche(option) {

	const questions = [
		'Code : ',
		'Nom ou partie du nom : ',
		'Groupe (angiosperme ou gymnosperme) : '
	]

	return await demander(questions[option-1])

};


// sélection de l'action à réaliser
function executionRecherche(plants, option, indice) {

	if (option === 1) {
		const issueRecherche = trouverParId(plants, indice)
		return issueRecherche? issueRecherche : [];
	} else if (option === 2) {
		return rechercherParNom(plants, indice);
	} else {
		return filtrerParGroupe(plants, indice);
	};

};


// surcharge de listerPlant pour masquer l'absence de plants trouvés
function listerRecherche(plants, option, ts) {

	let liste;

	if (option === 1) {
		let plantsRecherches = [Object.create(plants)];
		plantsRecherches = plantsRecherches.map((plant) => formaterPlant(plant) );
		liste = plantsRecherches.join('\n');
	} else if (option == 2) {
		let plantsRecherches = [...plants];
		plantsRecherches = plantsRecherches.map( (plant) => formaterPlant(plant));
		plantsRecherches.unshift(`${plantsRecherches.length} espèce(s) dont le nom contient < ${ts} > :`);
		liste = plantsRecherches.join('\n');
	} else {
		let plantsRecherches = [...plants];
		plantsRecherches = plantsRecherches.map( (plant) => formaterPlant(plant) );
		plantsRecherches.unshift(`${plantsRecherches.length} espèce(s) du groupe < ${ts} > :`);
		liste = plantsRecherches.join('\n');
	};

	return liste !== 'Aucun plant enregistré.' ? liste : ''

};


function listerTrie(plants, option) {

	const liste = listerPlants(plants);

	return liste !== 'Aucun plant enregistré.' ? liste : ''

};


function afficherSynthese (plants) {

	const nombreEspeces = plants.length ;
	const nombreTotalPlants = totalPlants(plants);
	const syntheseGroupe = syntheseParGroupe(plants);
	const STOCK_FAIBLES = stocksFaibles(plants, SEUIL_STOCK_FAIBLE).map(plant => formaterPlant(plant));
	const especePlusAbondante = formaterPlant(especeLaPlusAbondante(plants))

	const synthese = [
		'--- Synthèse de l\'inventaire ---',
		`Nombre d'espèces : ${nombreEspeces}`,
		`Stock total : ${nombreTotalPlants} plants`,
		`Par groupe botanique :`,
		`\tangiosperme : ${syntheseGroupe.angiosperme.especes} espèce(s), ${syntheseGroupe.angiosperme.plants} plants`,
		`\tgymnosperme : ${syntheseGroupe.gymnosperme.especes} espèce(s), ${syntheseGroupe.gymnosperme.plants} plants`,
		`Espèce la plus abondante : ${especePlusAbondante}`,
		`Stocks faibles (≤ ${SEUIL_STOCK_FAIBLE} plants) : ${STOCK_FAIBLES.length}`,
		`\t${STOCK_FAIBLES.join('\n\t')}`,
		`Rappel : le seuil de ${SEUIL_STOCK_FAIBLE} plants est un repère pédagogique de suivi, pas une recommandation de production`
	]

	console.log(synthese.join('\n'));
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


async function executerChoix (plants, choix) {
	let optionPrincipale = choix;

	switch (optionPrincipale) {

		case '1' :
			const saisie = await prendreSaisie();
			changerCasse(saisie);
			ajouter(plants, saisie);
		break;

		case '2' :
			console.log(listerPlants(plants));
		break;

		case '3' :
			// afficher un menu de recherche à trois (3) options
			afficherMenuRecherche();
			let optionRecherche = await choixOption();

			// retourner au menu si l'utilisateur entre une valeur invalide
			if (!['1', '2', '3'].includes(optionRecherche)) {
				console.log('Choix inconnu : retour au menu.');
				return true
			};

			// Demander un indice correspondant à l'option de recherche,
			// et enfin afficher le resultat de la recherche
			optionRecherche = parseInt(optionRecherche);
			const indiceRecherche = await demanderIndiceRecherche(optionRecherche);
			const resultatRecherche = executionRecherche(plants, optionRecherche, indiceRecherche);

			// Gestion de l'affichage du résultat: prise en compte de l'echec pour l'option 1
			if (optionRecherche === 1 && resultatRecherche.length === 0) {
				console.log(`Plant ${indiceRecherche} introuvable.`);
				} else {
				console.log(listerRecherche(resultatRecherche, optionRecherche, indiceRecherche));
			};
		break;

		case '4' :
			afficherMenuTrier();
			let optionTrie = await choixOption();

			// retourner au menu si l'utilisateur entre une valeur invalide
			if (!['1',].includes(optionTrie)) {
				console.log('Choix inconnu : retour au menu.');
				return true
			};

			console.log( listerTrie( trierParNombrePlants(plants) ) );
		break;

		case '5' :
			afficherSynthese(plants);
		break;

		case '0' :
			// le menu ne s'affiche pas quand l'utilisateur souhaite quitter la session
			console.log('Au revoir !' );
			return false
		break;

		case null :
			return false
		default :
			if (optionPrincipale !== null){
				console.log(`Choix inconnu : « ${optionPrincipale} ». Tapez un chiffre du menu.`);
			}
		break;

	};

	return true

};


async function main() {

	// Affichage de l'ecran d'accueil
	afficherPageAccueil();

	// chargement du fichier contenant les données
	let plants = await chargerPlants();
	let optionPrincipale;
	let redemarrerMenu = true;

	ouvrirSaisie();

		do {
			// afficher le menu
			afficherMenuPrincipal();
			// enregistrer le choix de l'utilisateur
			const QUESTION_CHOIX = 'Votre choix : '
			optionPrincipale = await choixOption(QUESTION_CHOIX);
			redemarrerMenu = await executerChoix(plants, optionPrincipale)
			// instruction à exécuter pour chaque option 
		} while ( redemarrerMenu);

	fermerSaisie();

}


main();
