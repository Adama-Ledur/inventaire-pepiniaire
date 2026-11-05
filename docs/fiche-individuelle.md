# Fiche individuelle

## Adama, Konaté, Adama-Ledur

1. J'ai écrit la fonction **prendreSaisie()** : Elle permet de `poser automatique des questions dans un ordre prédéfini`. Pour ce faire, elle initialise `2 objets` ayant les mêmes clés. l'une stocke les questions à poser et l'autre les variables destinées à enregistrer les reponses aux questions, raison pour laquelle elles sont initialisées avec le mot-clé `undefined` qui indique une absence de valeur. Une boucle `for...of` combiné à la méthode `Object.entries()` permettent de parcourir simultanément les clés et valeurs de l'objet contenant les questions. A chaque itération une question différente est posée à l'aide d'une fonction asynchrone existant de l'`espace de recherche global`. La fonction renvoie ainsi un objet contenant toutes les réponses de l'utilisateur.


```text
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
```

2. **Difficultés rencontrées** : 

**Démarrage de l'app** : J'ai été confronté à des difficultés au niveau du **Démarrage de l'app**. Ces difficultés concernent la gestion des questions et reponses à l'aide des outils du kit qui sont déjà fourni, qui font notamment intervenir la notion de programmation asynchrone en javascript. La soumission du problème à un camarade m'a permi d'avoir des élements de reponse quant à leur fonctionnement et notamment de resoudre le problème auquel je faisais face. J'ai appris que la valeur d'une promesse, valeur retournée par une fonction asynchrone, peut être accédée à l'aide du mot clé `await` par simple affectation.


**fonctionnement du kit de démarrage avec les boucles** : J'ai constaté que l'ouverture et la fermeture répétées d'une interface de saisie crée un artefact d'affichage qui fait que chaque caractère saisi est affiché en plusieur répétitions, bien que les valeurs enregistrées étaient celle qu'on attendait. Après plusieurs essais, j'ai résolu le problème en plaçant les instructions d'ouverture et de fermeture de l'interface de saisie hors de la boucle. J'ai donc compris que lorsqu'une instance de `readline.createInterface()` est en cours, elle gère toutes les interactions avec l'utilisateur sans problème.

**Conception de la fonction d'arrêt de l'app** : Une autre difficulté que j'ai rencontré conçernait la **méthode d'arrêt de l'app** que j'ai écrite. J'avais utilisé une `switch...case` implémentée directement dans une boucle `do...while` pour gérer les différentes options de l'app. Ce qui créait un artefact dans la console. La solution était d'implémenter ma `switch...case` dans une fonction hors de la boucle. Le lien entre l'espace de recherche de la fonction et l'environnement global était assuré par une variable `drapeau` qui changeait d'état seulement dans les situations prévues (la saisie au clavier de la valeur `0` pendant les questions et la commande d'arrêt `Ctrl-C`).

3. **L'entraide** :

Ceux qui m'ont aidé
    - Kamagaté Salia Abdallah : dans la résolution des problèmes avec le kit fourni
    - Kouassi Konan Anglovia  : dans  la résoltuion des problème relatifs à l'utilisation des `switch...case`

