// BONUS — Pour aller plus loin. Facultatif : commencez seulement quand le socle est complet.
// Fiche : fiches/7-bonus.md · Vérifier : npm run test:bonus
// Pas de modèle pour ce fichier : à vous de combiner ce que vous avez appris.
import { versNombre } from './outils.js';
import { trouverParId, verifierPlant } from './registre.js';
import { syntheseParGroupe } from './synthese.js';

// Les champs qu'on a le droit de modifier. L'identifiant n'en fait pas partie.
export const CHAMPS_MODIFIABLES = ['nomCommun', 'groupe', 'nombrePlants', 'dateReleve'];

// Supprime de l'inventaire le plant qui a cet identifiant.
// Renvoie le plant supprimé, ou undefined s'il n'existe pas (l'inventaire ne change pas).
export function supprimerPlant(plants, id) {
  
	const INDEX = plants.map(plant => plant.id ).indexOf(id);

	if (INDEX !== -1 ) {

		return plants.splice(INDEX, 1)[0];

	};
	
}


// Modifie un champ d'un plant. valeur arrive sous forme de TEXTE, comme dans le menu.
// Renvoie un tableau d'erreurs : [] si la modification est faite.
// Erreurs : identifiant inconnu · champ 'id' (l'identifiant n'est pas modifiable) · champ absent de
// CHAMPS_MODIFIABLES · valeur refusée par les règles de l'ajout. S'il y a une erreur, rien ne change.
// nombrePlants est enregistré comme un nombre.
export function modifierPlant(plants, id, champ, valeur) {

	if (CHAMPS_MODIFIABLES.includes(champ)) {
		const plant = trouverParId(plants, id);
		const INDEX = plants.indexOf(plant => plant.id === id);
		plant[champ] = valeur;
		const ERREURS = verifierPlant(plant, plants);
		if (ERREURS.length === 0) {
		plant = creerPlant(plant)
		plants.splice(INDEX, 1, plant);
		};
		return ERREURS;

	} else if (champ == 'id') {
		console.log("Erreurs : · champ 'id' (l'identifiant n'est pas modifiable)");
	} else {
		console.log("Erreurs : · champ 'id' (l'identifiant n'est pas modifiable)");
	};

}

// Renvoie une COPIE triée par nombre de plants décroissant.
// Deux plants de même nombre gardent leur ordre d'origine. Le tableau reçu ne change pas.
export function trierParNombrePlantsDecroissant(plants) {
	const plantsTries = [...plants];
	return plantsTries.sort((a, b) => -(a.nombrePlants - b.nombrePlants));
}

// Renvoie { groupe, plants } pour le groupe botanique qui a le plus de plants au total,
// le premier rencontré en cas d'égalité, ou null si l'inventaire est vide.
// Exemple : groupeLePlusFourni(donnees) → { groupe: 'angiosperme', plants: 222 }
export function groupeLePlusFourni(plants) {
	const GROUPES = ['angiosperme', 'gymnosperme']
	if (plants.length !== 0) {
		let premierGroupeRencontre = plants[0].groupe;
		const bilanGroupe = {};

		for ( let groupe of GROUPES) {

			const plantsTries = plants.filter(plant => plant.groupe === groupe)
										.map(plant => plant.nombrePlants);
			bilanGroupe[groupe] = {
				'groupe': groupe,
				'plants': plantsTries.reduce((acc, valCour) => acc + valCour , 0)
			}
		};

		if ( bilanGroupe[GROUPES[0]].plants < bilanGroupe[GROUPES[1]].plants ) {
			return bilanGroupe[GROUPES[1]]
		} else if ( bilanGroupe[GROUPES[0]].plants > bilanGroupe[GROUPES[1]].plants  ) {
			return bilanGroupe[GROUPES[0]]
		} else {
			return bilanGroupe[premierGroupeRencontre]
		};
	} else {
		return null
	};
}
