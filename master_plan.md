# Master Plan - La maison de l'oubli

## Vision

La maison de l'oubli est une experience narrative interactive construite avec React et Vite. Le joueur choisit un personnage, explore une scene d'horreur contemporaine, prend des decisions, effectue des jets de caracteristiques, gere un inventaire simple, puis recupere en fin de parcours un historique transformable en prompt de narration.

L'objectif du projet est de proposer un prototype jouable de role play solo, simple a comprendre, rejouable, et suffisamment structure pour ajouter de nouveaux chapitres, personnages, objets, fins et systemes de jeu sans casser l'existant.

## Etat Actuel

## Suivi D'Avancement

| Sprint | Statut | Resume |
| --- | --- | --- |
| Sprint 1 - Stabilisation Systeme | Clos | Fondations techniques validees. Reserves acceptees et reportees dans `sprint1.md`. |
| Sprint 2 - Experience Joueur et Refonte Ciblee | Clos avec reserves | Interaction clic/clavier, helpers, composants communs, inventaire, erreurs lisibles, ecran de fin et identite minimale valides. Finitions produit reportees. |
| Sprint 3 - Narration, Contenu et Scenario | Valide avec reserves narratives | Documentation narrative, tests, constantes, recuperation par id indexee, validateur, cards illustrees, textes d'ambiance, prompt final sombre, signature projet, accents visibles et mobile valides. Les chapitres draft restent a arbitrer plus tard. |
| Sprint 4 - Sauvegarde et Rejouabilite | En cours | Sauvegarde, reprise, journal, statistiques simples et export texte en place. `Book` est allege via `gameState`, `gameReducer` et `useGameState`. Dette ouverte : stabiliser les layouts responsive. |
| Sprint 5 - Qualite Produit | Non demarre | Depend des sprints 3 et 4. |

### Points Valides

- Validation scenario via `npm run validate:story`.
- Tests unitaires de base via `npm run test`.
- Lint et build passent.
- Couche `src/game` creee.
- `ChoiceCard` utilisable au clic/tap/clavier.
- `ChoiceCard` rendu comme un vrai bouton accessible.
- `PlayerPanel`, `InventoryList`, `RulesPanel` crees.
- `GameError` cree pour les erreurs de jeu lisibles.
- Inventaire extrait dans un helper.
- Ecran de fin enrichi avec recapitulatif simple.
- Ecran de fin harmonise avec un prompt final sombre et un bouton de copie.
- Signature projet ajoutee avec contact LinkedIn : Pierre-Olivier B.
- Titre HTML et README nettoyes des traces Vite.
- Premiere passe UX/UI immersive appliquee : theme sombre, panneaux semi-transparents, cartes typees, icones contextuelles, inventaire visuel et feedback D100.
- Dessins contextuels et textes d'ambiance ajoutes sur les cards.
- Chapitres non references marques/documentes comme brouillons.
- Architecture et guide narratif documentes.
- Recuperation des chapitres indexee avec `createStoryIndex`.
- Compatibilite mobile validee visuellement.
- Accents visibles de l'UI corriges sur les ecrans principaux.
- `sprint4.md` cree pour cadrer sauvegarde, reprise, journal et statistiques.
- Sauvegarde locale versionnee ajoutee via `src/game/saveGame.js`.
- Reprise de partie disponible depuis l'accueil si une sauvegarde valide existe.
- Nettoyage de sauvegarde lors d'un nouveau depart ou de `Rejouer`.
- Journal de partie visible pendant la partie.
- Premieres statistiques de partie : personnage, etapes, jets, reussites, echecs et objets.
- Export texte du journal de partie.
- Journal et statistiques accessibles depuis l'ecran final.
- Simplification visuelle de `Book` amorcee avec `GameShell`, `ChoiceFooter` et `GameJournalModal`.
- `gameState.js` centralise l'etat initial et le snapshot sauvegardable.
- Une tache de commentaires utiles est ajoutee au sprint 4.
- Reducer `gameReducer` ajoute pour modales, navigation, confirmation, resolution d'action, inventaire, background, historique, jets et fin de partie.
- Hook `useGameState` cree pour regrouper l'orchestration React, la sauvegarde automatique, le scroll, les choix affichables et les handlers de jeu.
- Documentation interne du code ajoutee sur les regles metier, les limites techniques, les composants structurants et les effets React importants.
- Dette responsive identifiee : les layouts mobile/desktop doivent etre stabilises avec des conteneurs et contrats CSS plus explicites.
- Premiere consolidation layout appliquee : `game-main`, `game-stage`, `game-stage-content`, `game-choice-strip`, `game-reading-layout`, `home-screen`, `character-screen` et les classes dediees de `TheEnd` remplacent progressivement les contrats implicites `h-65/h-35/footer-content`, les grilles Bootstrap structurelles et les anciennes classes du prompt final.

### Points En Cours

- Clarification de l'etat de `Book` avant sauvegarde.
- Arbitrage narratif des chapitres `draft` et non references, volontairement reporte.
- Statistiques de partie.
- Import de l'historique.
- Extraction eventuelle d'un `GameScreen` pour reduire encore le rendu de `Book`.
- Stabilisation des layouts responsive : normaliser les conteneurs, supprimer les overrides contradictoires et verifier les ecrans clefs mobile/desktop.

### Points Non Demarres

- Logo dedie.
- Composants `ChoiceList`, `StoryPanel`.
- Journal de partie visible.
- Sauvegarde locale via `localStorage`.
- JSON Schema ou migration stricte du format narratif.

### Stack

- Application front-end React 18.
- Build et dev server avec Vite.
- Styles en CSS global, Bootstrap, Sass et Font Awesome.
- Interactions par clic/tap/clavier.
- Contenu narratif stocke dans `src/contents/chapter/stories.json`.
- Personnages stockes dans `src/contents/characters/data.json`.
- Helpers de jeu dans `src/game`.
- Validation de scenario via `scripts/validate-story.mjs`.

### Parcours Joueur

1. Page d'accueil et entree dans l'aventure.
2. Selection d'un personnage predefini.
3. Lecture d'un chapitre ou d'un resultat d'action.
4. Choix d'une direction ou d'une action.
5. Confirmation des choix narratifs importants.
6. Jet de D100 contre une caracteristique.
7. Resultat narratif selon reussite ou echec.
8. Gestion simple d'inventaire, notamment la clef.
9. Fin de partie avec prompt a copier.

### Modules Principaux

- `src/App.jsx` : point d'entree applicatif.
- `src/contents/home.jsx` : accueil et lancement de l'aventure.
- `src/contents/characters/characters.jsx` : choix du personnage.
- `src/contents/book.jsx` : orchestration de l'etat de partie, chapitre courant, historique, inventaire, navigation et fin.
- `src/contents/chapter/chapter.jsx` : affichage d'un chapitre narratif.
- `src/contents/events/events.jsx` : affichage des actions, jet de de et retour du resultat au parent.
- `src/contents/events/choicecard.jsx` : carte d'action generique, activable au clic et au clavier, avec dessin contextuel et texte d'ambiance.
- `src/contents/events/theend.jsx` : ecran de fin, confirmation rejouer et copie du prompt.
- `src/contents/player/player-panel.jsx` : affichage personnage.
- `src/contents/player/inventory-list.jsx` : affichage de l'inventaire.
- `src/contents/rules/rules-panel.jsx` : rappel des regles.
- `src/game/resolveAction.js` : jet de D100, resolution succes/echec, cle de resultat.
- `src/game/storyNavigation.js` : preparation des choix affichables et historique des choix.
- `src/game/inventory.js` : regles d'ajout/retrait d'objet.
- `scripts/validate-story.mjs` : validation structurelle du scenario.

## Modele Narratif

Chaque chapitre est un noeud de graphe. Les champs principaux observes sont :

- `numero_chapitre` : identifiant du noeud.
- `card_context` : contexte affiche au joueur.
- `mj_question` : question ou relance du maitre du jeu.
- `txt` : texte initial ou texte de fallback.
- `choix` / `btn_choix` : transitions classiques.
- `choix_win` / `btn_choix_win` : transitions apres reussite.
- `choix_loose` / `btn_choix_loose` : transitions apres echec.
- `btn_choix_sup` : transition supplementaire pour certains cas speciaux.
- `actions.btn` : libelles des actions disponibles.
- `actions.carac` : caracteristiques associees aux actions.
- `c_w`, `c_l`, `d_w`, `d_l`, `i_w`, `i_l` : textes selon caracteristique et resultat.

Analyse actuelle du scenario :

- 29 chapitres declares, de `0` a `28`.
- Aucune transition ne pointe vers un chapitre inexistant.
- Chapitres non references detectes en warning : `4`, `5`, `7`, `8`, `12`, `18`.
- Actions declarees : dexterite 21 fois, intelligence 12 fois, constitution 10 fois, fin 3 fois.
- `npm run validate:story` passe, avec warnings sur les chapitres non references.

## Points Forts

- Prototype jouable avec boucle complete : personnage, choix, resolution, inventaire, fin.
- Separation plus nette entre interface React, contenu narratif et logique de jeu.
- Systeme de probabilite simple, lisible et extrait dans des helpers.
- Historique de partie conserve pour generer une histoire finale.
- Cartes utilisables au clic/tap/clavier, sans dependance au swipe.
- Inventaire isole dans un helper et un composant d'affichage.
- Validation automatique du scenario disponible.
- Presence de diagrammes de decision dans `arbre_de_decision`, utile pour documenter les branches.

## Fragilites Actuelles

### Donnees

- Le fichier narratif contient encore logique de jeu, textes, transitions et cas speciaux dans une seule structure.
- Certains chapitres semblent etre des tests ou des branches mortes.
- Une verification UI finale des accents reste utile avant livraison publique.
- Des champs ont des formats variables : tableaux, objets, champs optionnels, champs supplementaires.
- Les ids de chapitres sont encore des chaines, avec quelques cas speciaux a documenter si le scenario grandit.

### Logique React

- `Book` est allege par `gameReducer` et `useGameState`, mais assemble encore directement les ecrans de jeu.
- Certains cas speciaux restent relies a des ids fixes : clef, retour porte, chapitre `19`, backgrounds.
- Les erreurs de donnees sont mieux gerees via `GameError`.
- Les confirmations principales utilisent une modale React dediee.

### Experience Joueur

- L'interface mobile a recu des ajustements, mais merite encore une vraie verification visuelle.
- Les layouts ne sont pas encore assez stables : l'application melange Bootstrap, CSS global, media queries et correctifs ponctuels. Un chantier dedie doit clarifier les conteneurs de page, les zones scrollables et les comportements mobile/desktop.
- L'inventaire est plus clair, mais le systeme d'objets reste minimal.
- L'ecran de fin est plus propre, mais le recapitulatif de partie pourrait etre enrichi.
- Un logo dedie reste a finaliser.

### Qualite

- `npm run validate:story`, `npm run test`, `npm run lint` et `npm run build` passent.
- Des tests unitaires de base existent pour `src/game`.
- Les warnings Sass viennent de Bootstrap/Sass et ne bloquent pas le build.
- PowerShell affiche un warning `Test-Path : Acces refuse` autour de `npm.ps1`, sans faire echouer les commandes.
- Le README reste a mettre a jour pour remplacer la base Vite.

## Architecture Actuelle

L'architecture est maintenant organisee en trois zones :

### 1. Contenu

- `stories.json` contient le graphe narratif.
- `data.json` contient les personnages jouables.
- Les assets visuels sont dans `src/assets`.

### 2. Domaine de jeu

La couche `src/game` contient les fonctions pures reutilisables :

- resolution du jet de de ;
- calcul de la cle de resultat (`c_w`, `d_l`, etc.) ;
- preparation des choix affichables ;
- gestion de l'inventaire et de la clef ;
- ajout de choix a l'historique.

### 3. Interface React

Les composants React gerent l'affichage et l'orchestration :

- `Book` assemble l'ecran de jeu tandis que `useGameState` porte l'orchestration et `gameReducer` porte les mutations metier.
- `Chapter` affiche une situation narrative.
- `Events` affiche les actions et les jets.
- `ChoiceCard` porte l'interaction generique.
- `PlayerPanel`, `InventoryList` et `RulesPanel` evitent la duplication.
- `TheEnd` affiche le prompt final.
- `SiteSignature` affiche la mention auteur et le contact LinkedIn.

Une description plus detaillee est disponible dans `architecture.md`.

## Architecture Cible

### 1. Etat de Partie

Centraliser progressivement l'etat dans un reducer ou un hook dedie :

- personnage ;
- chapitre courant ;
- historique ;
- inventaire ;
- resultat precedent ;
- etat de fin ;
- fond actif.

### 2. Scenario

Formaliser la structure des chapitres :

- schema JSON plus strict ;
- identifiants normalises ;
- transitions toutes validees ;
- distinction claire entre chapitre, action, resultat, objet et fin ;
- marquage explicite des chapitres brouillons ou de test.

### 3. Interface

Poursuivre la decomposition :

- `ChoiceList` pour afficher les choix prepares ;
- `StoryPanel` pour le texte courant ;
- `ActionResolver` ou hook equivalent pour le cycle action/de/resultat ;
- `ChoiceList` et `StoryPanel` pour reduire encore la taille de `Book`.

### 4. Outillage

Ajouter des controles decisifs :

- tests unitaires sur `src/game` ;
- tests de parcours critiques ;
- documentation de contribution narrative ;
- mise a jour complete du README.

## Roadmap

### Sprint 1 - Stabilisation Systeme

Objectif : rendre le prototype plus fiable sans changer massivement le gameplay.

Etat : **Clos**.

Decision : les objectifs systeme du sprint sont valides. Les reserves restantes sont documentees dans `sprint1.md` et reportees aux sprints suivants.

- Documenter le modele de jeu actuel.
- Ajouter une validation de scenario.
- Extraire la logique de resolution dans des fonctions pures.
- Remplacer les points les plus fragiles de navigation par des helpers.
- Nettoyer les branches mortes ou les marquer comme brouillons.
- Corriger les problemes d'encodage les plus visibles.
- Ajouter une confirmation avant rejouer.

### Sprint 2 - Experience Joueur et Refonte Ciblee

Objectif : rendre le jeu plus confortable et reduire la dette technique immediate.

Etat : **Clos avec reserves reportees**.

- `ChoiceCard` utilisable au clic/tap/clavier, sans dependance au swipe.
- Preparation des choix sortie en partie de `Book`.
- `PlayerPanel`, `InventoryList` et `RulesPanel` crees.
- Logique d'inventaire extraite.
- Resolution du de extraite.
- Confirmation avant choix narratif et avant rejouer.
- Ecran de fin et prompt simplifies.
- Recapitulatif simple ajoute a l'ecran de fin.
- `GameError` cree pour les erreurs de chapitre et d'action.
- Titre HTML, README et marque d'accueil nettoyes.
- Validation scenario ajoutee.

Reserves reportees :

- logo dedie ;
- composants `ChoiceList` et `StoryPanel` ;
- nettoyage plus large des textes narratifs hors parcours principal.

### Sprint 3 - Narration et Contenu

Objectif : renforcer la qualite narrative et la maintenabilite du scenario.

Etat : **Valide avec reserves narratives**.

- Relire et corriger tous les textes jouables : valide avec reserves sur les chapitres `draft`.
- Normaliser les noms de champs et les formats : documente, migration stricte reportee.
- Integrer les diagrammes de decision dans la documentation : valide.
- Marquer ou supprimer les chapitres non references : reporte, chapitres marques `draft`.
- Ajouter des fins alternatives : non demarre.
- Ajouter une table des objets et preconditions : valide pour la clef, extensible plus tard.
- Preparer un guide d'ecriture pour nouveaux chapitres : valide.
- Ajouter tests unitaires sur `src/game` : valide.
- Centraliser les ids speciaux : valide.
- Remplacer la recuperation par index : valide.
- Indexer les chapitres via `createStoryIndex` : valide.
- Ajouter dessins contextuels et textes d'ambiance sur les cards : valide.
- Harmoniser le prompt final avec le theme sombre : valide.
- Ajouter la signature et le contact LinkedIn : valide.
- Valider la compatibilite mobile : valide.
- Corriger les accents visibles de l'UI : valide.

### Sprint 4 - Sauvegarde et Rejouabilite

Objectif : permettre de quitter, revenir, comparer et rejouer.

Etat : **En cours**.

- Ajouter sauvegarde locale via `localStorage` : valide.
- Ajouter reprise de partie : valide.
- Ajouter export/import de l'historique : export texte valide, import reporte.
- Ajouter recapitulatif des choix : valide via le journal visible.
- Ajouter statistiques de partie : premier niveau valide pendant la partie et a la fin, approfondissement restant.
- Reduire la dette de `Book` : valide pour l'etat metier et les effets React ; reste une extraction possible de `GameScreen`.
- Ajouter des commentaires utiles : valide comme documentation interne sur les zones metier, techniques et composants structurants.
- Stabiliser les layouts responsive : en cours, dette technique ouverte apres les regressions mobile/desktop observees.
  Premiere passe appliquee sur le layout de jeu principal, l'accueil, la selection de personnage et l'ecran de fin.

### Sprint 5 - Qualite Produit

Objectif : preparer une version demo propre.

- Tests unitaires principaux.
- Tests de parcours critiques.
- Build, lint et validation scenario en verification standard.
- README complet.
- Captures ou GIF de demonstration.
- Nettoyage des assets inutilises.

## Definition of Done Generale

Une evolution est consideree terminee si :

- le jeu reste jouable de l'accueil jusqu'a une fin ;
- `npm run validate:story` passe ;
- `npm run lint` passe ;
- `npm run build` passe ;
- les transitions de scenario sont validees ;
- les textes visibles ne contiennent pas de placeholder involontaire ;
- le comportement est documente si une regle metier est ajoutee ;
- aucune regression evidente n'est introduite dans l'historique ou l'inventaire.

## Priorites Produit

1. Finaliser la stabilisation de l'architecture de jeu.
2. Corriger les textes et l'encodage narratif.
3. Rendre les choix et l'interface mobile plus confortables.
4. Clarifier les donnees narratives pour pouvoir ecrire plus vite.
5. Ameliorer la fin de partie et le prompt genere.
6. Ajouter sauvegarde et rejouabilite.

## Risques

- Plus le scenario grossit, plus les branches invalides seront difficiles a maintenir sans schema plus strict.
- Garder tout l'etat global dans `Book` risque de limiter les evolutions longues.
- Les problemes d'encodage peuvent abimer l'experience narrative si les textes deviennent plus nombreux.
- Les ids de chapitres utilises comme index de tableau peuvent casser si le JSON est reorganise.
- L'absence de tests unitaires laisse encore un risque de regression sur les branches rares.

## Decision Recommandee

Le prochain mouvement le plus rentable est de terminer la stabilisation amorcee : tester les helpers de `src/game`, documenter l'architecture, corriger les textes/encodages, puis normaliser le scenario avant d'ajouter beaucoup de contenu. Le projet a deja une boucle complete ; il faut maintenant rendre cette boucle durable, testable et confortable.
