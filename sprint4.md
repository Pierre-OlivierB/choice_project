# Sprint 4 - Sauvegarde et Rejouabilite

## Etat D'Avancement

Statut global : **Lance**.

Le sprint 4 commence apres la validation du sprint 3. L'objectif est de permettre au joueur de quitter, revenir, reprendre une partie, consulter son parcours et rejouer plus facilement sans perdre la boucle narrative existante.

| Item | Statut | Notes |
| --- | --- | --- |
| 1. Definir l'etat sauvegardable | Valide | Snapshot minimal defini : chapitre, phase, inventaire, historique, personnage, resultat courant et decor. |
| 2. Ajouter une couche de sauvegarde locale | Valide | `src/game/saveGame.js` gere version, lecture, ecriture, suppression et snapshots invalides. |
| 3. Sauvegarder automatiquement la partie | Valide | `Book` persiste son etat apres les changements utiles, sans sauvegarder les modales temporaires. |
| 4. Reprendre une partie depuis l'accueil | Valide | L'accueil affiche `Reprendre la partie` si une sauvegarde locale valide existe. |
| 5. Effacer la sauvegarde lors d'un nouveau depart | Valide | Un nouveau choix de personnage et l'action `Rejouer` suppriment la sauvegarde precedente. |
| 6. Ajouter un journal de partie visible | Valide | `GameJournal` affiche l'historique pendant la partie via un bouton desktop et le HUD mobile. |
| 7. Exporter / importer l'historique | En cours | Export texte du journal valide ; import volontairement reporte tant que le format public n'est pas stabilise. |
| 8. Ajouter des statistiques de partie | Valide avec reserves | Premier niveau affiche pendant la partie et a la fin : personnage, etapes, jets, reussites, echecs, objets et detail des jets. |
| 9. Preparer l'extraction de l'etat de `Book` | Valide | `Book` est allege : l'etat metier est dans `gameReducer` et les effets React sont regroupes dans `useGameState`. |
| 10. Valider les parcours critiques | A faire | Nouveau jeu, reprise, fin, rejouer, sauvegarde corrompue. |
| 11. Ajouter des commentaires utiles dans le code | Valide | Commentaires courts ajoutes sur sauvegarde, reducer, navigation, resolution D100, inventaire, journal, hook et ecrans clefs. |
| 12. Stabiliser le systeme de layouts responsive | En cours | Dette identifiee : les corrections UI reposent encore sur des regles CSS fragiles, parfois redondantes, et peuvent casser mobile ou desktop. |

## Objectif

Rendre le prototype plus rejouable et plus confortable sans transformer immediatement toute l'architecture.

Le joueur doit pouvoir :

- commencer une partie ;
- quitter ou recharger la page ;
- reprendre depuis le dernier etat sauvegarde ;
- atteindre une fin avec un historique toujours coherent ;
- recommencer proprement sans ancienne sauvegarde parasite.

## Etat Minimal A Sauvegarder

La sauvegarde locale doit rester volontairement simple et serialisable.

Etat de partie :

- `choice` : id du chapitre courant ;
- `isReadingChapter` : indique si l'ecran affiche un chapitre ou une resolution d'action ;
- `inventory` : objets possedes ;
- `win` : dernier resultat de resolution ;
- `action` : derniere caracteristique resolue ;
- `choiceAlreadyDone` : historique technique des chapitres visites ;
- `previousActionText` : texte actuellement affiche ;
- `storyEnd` : indique si la partie a atteint une fin ;
- `activeBackground` : decor courant ;
- `choiceAfterDiceRoll` : dernier chapitre resolu par un jet ;
- `storyHistory` : historique narratif utilise pour le prompt final ;
- `perso` : personnage choisi.

## Strategie Technique

### 1. Couche `saveGame`

Creer un helper pur dans `src/game/saveGame.js`.

Responsabilites :

- definir une cle `localStorage` unique ;
- ajouter une version de format ;
- lire une sauvegarde ;
- verifier que les champs principaux existent ;
- ecrire une sauvegarde ;
- supprimer une sauvegarde ;
- echouer sans casser l'application si `localStorage` est indisponible.

### 2. Sauvegarde automatique

`Book` reste responsable de l'etat pendant cette premiere passe.

Principe :

- construire un snapshot a partir de l'etat React ;
- sauvegarder apres les changements importants ;
- ne pas sauvegarder les modales temporaires comme `pendingChoice`.

### 3. Reprise depuis l'accueil

L'accueil peut detecter une sauvegarde locale.

Si une sauvegarde valide existe :

- afficher une action "Reprendre la partie" ;
- restaurer le personnage ;
- ouvrir directement `Book` avec l'etat sauvegarde.

### 4. Rejouer proprement

Quand le joueur recommence :

- supprimer la sauvegarde ;
- revenir au debut.

## Premiere Passe Realisee

- `src/game/saveGame.js` cree avec une cle versionnee `localStorage`.
- Tests unitaires ajoutes pour lecture, ecriture, suppression, validation et JSON invalide.
- `Book` restaure un etat initial quand une sauvegarde est reprise.
- `Book` sauvegarde automatiquement le snapshot courant.
- L'accueil propose `Reprendre la partie` si une sauvegarde valide existe.
- Le choix d'un nouveau personnage et le bouton `Rejouer` nettoient la sauvegarde.
- `GameJournal` ajoute un journal visible pendant la partie.
- Les jets de de sont historises dans `rollHistory`.
- Les premieres statistiques sont affichees dans le journal.
- Le journal peut etre copie sous forme de texte exportable.
- Les jets sont detailles dans le journal et dans l'export.
- L'ecran final donne acces au journal et aux statistiques.
- La carte de lancer affiche `D100` pour eviter un libelle technique ou incoherent.
- Premiere passe de simplification de `Book` realisee : `GameShell`, `ChoiceFooter` et `GameJournalModal` extraient le rendu repetable sans changer la logique metier.
- `src/game/gameState.js` cree pour centraliser l'etat initial et le snapshot sauvegardable.
- Tests unitaires ajoutes sur `createInitialGameState` et `createSaveableGameState`.
- Une tache dediee aux commentaires utiles a ete ajoutee au sprint.
- Premier reducer pur ajoute dans `gameState.js` pour confirmation, journal, historique narratif, jets et fin de partie.
- `Book` utilise ce reducer pour reduire les setters locaux sur les zones simples.
- La navigation de chapitre, la confirmation de choix et la resolution d'action sont migrees dans `gameReducer`.
- `Book` ne garde plus en etat local `choice`, `isReadingChapter`, `choiceAlreadyDone`, `previousActionText`, `action` et `win`.
- L'inventaire, le dernier chapitre resolu par le de et le background actif sont egalement portes par `gameReducer`.
- `src/hooks/useGameState.js` regroupe l'orchestration React : chapitre courant, choix affichables, sauvegarde, scroll, journal, confirmation, jets et fin.
- `Book` devient principalement un composant de composition entre `Chapter`, `Events`, `ChoiceFooter`, `GameJournalModal` et `TheEnd`.
- Commentaires utiles ajoutes sur les intentions metier et techniques non evidentes.

Note sur l'import :

L'import d'historique est reporte pour eviter de restaurer des donnees partielles ou incompatibles. La sauvegarde locale restaure deja une vraie partie ; l'import devra utiliser un format versionne distinct si l'on veut restaurer un parcours depuis un texte externe.

Verification actuelle :

- `npm run validate:story` : passe avec les warnings attendus sur les chapitres `draft`.
- `npm run test` : passe, 37 tests.
- `npm run lint` : passe.
- `npm run build` : passe avec les warnings Sass/Bootstrap attendus.

## Dettes Techniques A Surveiller

### Dette 0 - Manque de commentaires utiles

Etat : **valide pour la couche actuelle**.

Le code reste majoritairement lisible, mais certaines zones commencent a porter des intentions metier qui ne sont pas evidentes au premier regard : sauvegarde versionnee, restauration de partie, choix speciaux, historique narratif, jets et transition chapitre/evenement.

Objectif :

- ajouter des commentaires courts la ou ils expliquent une intention durable ;
- eviter les commentaires descriptifs inutiles du type "met a jour la variable" ;
- commenter les decisions de conception, pas chaque ligne ;
- documenter les fonctions pures exposees dans `src/game` quand elles deviennent des points d'extension.

Zones prioritaires :

- `saveGame.js` : expliquer la sauvegarde versionnee et la tolerance aux erreurs de `localStorage` ;
- `gameState.js` : expliquer la creation d'etat initial et le snapshot sauvegardable ;
- `storyNavigation.js` : expliquer les choix speciaux comme retour porte, clef et victoire ;
- `Book` ou futur `useGameState` : expliquer les effets de sauvegarde et de scroll ;
- `gameJournal.js` : expliquer le format texte exportable.

Critere d'acceptation :

- les commentaires aident a comprendre une regle ou une limite ;
- aucun commentaire ne repete simplement le nom d'une fonction ou d'une variable ;
- les tests, lint et build passent apres ajout.

Realisation :

- `saveGame.js` documente la sauvegarde versionnee et la tolerance aux erreurs de stockage.
- `gameState.js` documente l'etat initial, le snapshot, l'application d'un choix, l'historique et le background.
- `storyNavigation.js` documente les choix speciaux et la normalisation des formes du scenario.
- `resolveAction.js` documente la regle D100 et le mapping vers les champs narratifs.
- `inventory.js` documente l'inventaire derive des chapitres visites.
- `gameJournal.js` documente le calcul des statistiques et l'export texte.
- `useGameState.js` documente la frontiere React, la sauvegarde, le scroll et le changement de decor.
- `Book`, `Events`, `Home` et `TheEnd` ont des commentaires courts sur leurs decisions non evidentes.
- Les composants structurants ont maintenant un commentaire d'intention : `App`, `Characters`, `Chapter`, `ChoiceCard`, `ChoiceFooter`, `GameShell`, `GameJournalModal`, `GameJournal`, `PlayerPanel`, `MobileHud`, `ConfirmModal`, `GameError`, `InventoryList` et `RulesPanel`.

Convention retenue :

- chaque fichier structurant doit expliquer son role humain en debut de fichier ou de composant ;
- chaque regle metier non evidente doit etre accompagnee d'un commentaire ;
- chaque compatibilite heritee doit etre signalee ;
- chaque effet React important doit expliquer pourquoi il existe ;
- les commentaires doivent aider une reprise du projet, pas seulement decrire la syntaxe.

### Dette 1 - `Book` portait trop de responsabilites

Etat : **fortement reduite**.

`Book` etait devenu le point central du sprint 4. C'etait logique : il portait le parcours, la sauvegarde, la reprise, l'historique et la fin. Il ne jouait plus seulement le role d'un composant React. Il servait aussi de moteur de jeu, d'orchestrateur d'effets, de routeur d'ecrans et de conteneur de modales.

La dette principale a ete traitee en deux mouvements :

- `gameState.js` porte maintenant l'etat initial, le snapshot sauvegardable et les mutations metier testables ;
- `useGameState.js` porte maintenant les effets React et les handlers de jeu ;
- `Book` conserve surtout la composition de l'ecran et les branches de rendu.

La dette n'est pas totalement terminee, car `Book` assemble encore directement les composants d'ecran. En revanche, elle n'est plus concentree au meme endroit : les prochaines evolutions pourront se faire dans `gameState`, `useGameState` ou des composants specialises.

#### Responsabilites deplacees hors de `Book`

`Book` ne gere plus directement :

- l'initialisation de l'etat de partie ;
- la restauration d'une sauvegarde locale ;
- l'indexation et la recuperation du chapitre courant ;
- la navigation entre chapitre et evenement ;
- la confirmation des choix ;
- l'enregistrement des choix deja effectues ;
- le calcul des choix affichables ;
- la mise a jour de l'inventaire ;
- le changement de background narratif ;
- l'enregistrement de l'historique narratif ;
- l'enregistrement des jets de de ;
- la sauvegarde automatique dans `localStorage` ;
- l'ouverture et la fermeture du journal ;
- le scroll automatique lors des changements d'etape.

`Book` conserve encore :

- le rendu conditionnel entre chapitre, evenement et ecran final ;
- la transmission des props vers `Chapter`, `Events`, `TheEnd` et `GameJournalModal`.

Le risque principal est donc reduit. La prochaine dette logique est plutot d'extraire un `GameScreen` pour que `Book` devienne un composant encore plus court.

#### Objectif de simplification

La simplification ne doit pas seulement reduire le nombre de lignes. Elle doit clarifier les frontieres :

- `Book` orchestre l'ecran de jeu, mais ne contient pas les regles ;
- la logique d'etat est testable sans React ;
- les composants d'affichage sont reutilisables ;
- les effets comme la sauvegarde et le scroll sont isoles ;
- les choix, le journal et les modales ne sont pas recodes a plusieurs endroits.

L'objectif final est que `Book` ressemble davantage a un composant de composition :

```jsx
function Book({ perso, initialGameState }) {
  const game = useGameState({ perso, initialGameState });

  if (game.error) {
    return <GameError {...game.error} />;
  }

  if (game.state.storyEnd) {
    return <TheEnd {...game.endProps} />;
  }

  return <GameScreen game={game} />;
}
```

Cette cible n'est pas a atteindre en une seule passe. Elle sert de direction.

## Proposition D'Architecture Pour Decouper `Book`

### Couche 1 - Moteur d'etat pur

Fichier cible :

```text
src/game/gameState.js
```

Role :

- creer l'etat initial ;
- restaurer un etat sauvegarde ;
- appliquer des actions de jeu ;
- garder les mutations de partie dans des fonctions pures ;
- permettre des tests unitaires sans rendu React.

Fonctions proposees :

```js
createInitialGameState({ perso, initialGameState, storyIndex })
gameReducer(state, action)
createGameSnapshotFromState(state)
```

Actions proposees :

```js
GAME_ACTIONS.GO_TO_CHAPTER
GAME_ACTIONS.OPEN_CONFIRMATION
GAME_ACTIONS.CLOSE_CONFIRMATION
GAME_ACTIONS.CONFIRM_CHOICE
GAME_ACTIONS.RECORD_CHOICE
GAME_ACTIONS.RECORD_STORY_STEP
GAME_ACTIONS.RECORD_DICE_ROLL
GAME_ACTIONS.RESOLVE_ACTION_RESULT
GAME_ACTIONS.UPDATE_BACKGROUND
GAME_ACTIONS.UPDATE_INVENTORY
GAME_ACTIONS.FINISH_GAME
GAME_ACTIONS.RESTORE_GAME
```

Etat gere par cette couche :

- `choice` ;
- `isReadingChapter` ;
- `inventory` ;
- `win` ;
- `action` ;
- `choiceAlreadyDone` ;
- `previousActionText` ;
- `storyEnd` ;
- `activeBackground` ;
- `choiceAfterDiceRoll` ;
- `storyHistory` ;
- `rollHistory` ;
- `pendingChoice`.

Points importants :

- le reducer ne doit pas acceder au DOM ;
- le reducer ne doit pas lire ou ecrire `localStorage` ;
- le reducer ne doit pas importer React ;
- les actions doivent avoir des noms metier, pas des noms d'implementation.

Exemple d'action :

```js
{
  type: GAME_ACTIONS.RECORD_DICE_ROLL,
  payload: {
    actionLabel: "Courir vers la porte",
    characteristic: "dexterite",
    roll: 42,
    stat: 75,
    success: true
  }
}
```

### Couche 2 - Hook d'orchestration React

Fichier cible :

```text
src/hooks/useGameState.js
```

Role :

- brancher `useReducer` sur `gameReducer` ;
- calculer `currentStory` et `displayChoices` ;
- declencher la sauvegarde automatique ;
- exposer des handlers propres pour les composants ;
- centraliser les effets React lies au jeu.

Responsabilites du hook :

- memoriser `storyIndex` ;
- lire le chapitre courant ;
- sauvegarder l'etat via `writeGameSnapshot` ;
- remonter en haut de page lors d'un changement d'etape ;
- exposer `activateChoice`, `confirmPendingChoice`, `recordDiceRoll`, `finishGame`, `openJournal`, `closeJournal`.

Exemple d'API attendue :

```js
const game = useGameState({ perso, initialGameState });

game.state;
game.currentStory;
game.displayChoices;
game.activateChoice(displayChoice);
game.confirmPendingChoice();
game.closePendingChoice();
game.recordDiceRoll(roll);
game.resolveAction(actionResolution);
game.openJournal();
game.closeJournal();
```

Cette couche est le bon endroit pour les effets React, mais pas pour les regles metier pures.

### Couche 3 - Composants de rendu reutilisables

Nouveaux composants cibles :

```text
src/contents/game/GameScreen.jsx
src/contents/game/ChoiceFooter.jsx
src/contents/game/GameJournalModal.jsx
src/contents/game/GameShell.jsx
```

#### `GameShell`

Responsabilite :

- porter `app-shell` ;
- appliquer le background courant ;
- contenir `main-content` ;
- rester neutre sur le contenu affiche.

Exemple :

```jsx
<GameShell activeBackground={state.activeBackground}>
  {children}
</GameShell>
```

#### `ChoiceFooter`

Responsabilite :

- rendre une liste de `ChoiceCard` ;
- gerer uniquement le layout horizontal/scrollable ;
- etre reutilisable pour les choix de chapitre et, plus tard, les actions si necessaire.

Props proposees :

```js
choices
onActivateChoice
choiceCss
```

#### `GameJournalModal`

Responsabilite :

- encapsuler `ConfirmModal` + `GameJournal` ;
- eviter de repeter le meme bloc dans `Book`, `MobileHud` et `TheEnd` ;
- garantir un titre, un bouton fermer et des props homogenes.

Props proposees :

```js
isOpen
onClose
perso
inventory
storyHistory
rollHistory
```

#### `GameScreen`

Responsabilite :

- choisir entre `Chapter` et `Events` ;
- afficher `ChoiceFooter` si l'etat est en lecture de chapitre ;
- afficher les modales globales ;
- recevoir une API `game` deja preparee par le hook.

Cette couche garde le rendu lisible sans contenir les details du reducer.

### Couche 4 - Composants metier existants ajustes

#### `Chapter`

Objectif :

- rester un composant d'affichage de chapitre ;
- recevoir un objet `gameHudData` ou des props groupees pour eviter l'accumulation.

Props actuelles a simplifier :

- `perso` ;
- `inventory` ;
- `storyHistory` ;
- `rollHistory`.

Proposition :

```jsx
<Chapter
  storyText={state.previousActionText}
  mjQuestion={currentStory.mj_question}
  hud={game.hud}
/>
```

#### `Events`

Objectif :

- garder la resolution locale si l'on veut limiter la refonte ;
- ou extraire plus tard la phase de resolution dans le reducer.

Option prudente :

- laisser `resolutionPhase`, `dice`, `success`, `selectedAction` dans `Events` dans un premier temps ;
- continuer a remonter `onDiceRolled` et `onSendData` ;
- extraire seulement le rendu commun et le HUD.

Option plus ambitieuse :

- faire entrer toute la phase de resolution dans `gameState.js`.

Recommandation : commencer par l'option prudente. La phase de resolution est autonome et fonctionne deja.

## Ordre De Refactor Recommande

### Etape 1 - Extraire les composants visuels sans changer la logique

Priorite : haute.

Statut : **Valide**.

Fichiers a creer :

- `src/contents/game/GameShell.jsx` ;
- `src/contents/game/ChoiceFooter.jsx` ;
- `src/contents/game/GameJournalModal.jsx`.

Changements attendus :

- `Book` garde ses `useState` ;
- le JSX de `Book` diminue ;
- aucune regle metier n'est deplacee ;
- risque faible.

Critere d'acceptation :

- le rendu ne change pas ;
- `npm run lint`, `npm run test`, `npm run build` passent ;
- `Book` contient moins de blocs JSX repetitifs.

Realisation :

- `src/contents/game/GameShell.jsx` porte maintenant `app-shell` et `main-content`.
- `src/contents/game/ChoiceFooter.jsx` rend les choix de chapitre avec `ChoiceCard`.
- `src/contents/game/GameJournalModal.jsx` encapsule `ConfirmModal` et `GameJournal`.
- `Book` conserve encore la logique de jeu, mais son rendu est plus lisible.

### Etape 2 - Extraire les helpers de snapshot d'etat

Priorite : haute.

Statut : **Valide**.

Fichier a creer :

- `src/game/gameState.js`.

Premieres fonctions :

```js
createInitialGameState({ perso, initialGameState, storyIndex })
createGameSnapshot(state)
```

Objectif :

- sortir l'initialisation complexe de `Book` ;
- rendre la sauvegarde plus claire ;
- ne pas encore introduire de reducer si l'on veut limiter le risque.

Critere d'acceptation :

- les valeurs initiales sont testees ;
- une sauvegarde incomplete restaure des valeurs par defaut coherentes ;
- `Book` ne construit plus manuellement tout son etat initial.

Realisation :

- `src/game/gameState.js` expose `createInitialGameState`.
- `src/game/gameState.js` expose `createSaveableGameState`.
- `Book` utilise ces helpers via `useGameState` pour initialiser le reducer et construire la sauvegarde.
- Les tests couvrent une nouvelle partie, une restauration et l'exclusion de `pendingChoice` du snapshot sauvegardable.

### Etape 3 - Introduire un reducer pur

Priorite : moyenne.

Statut : **Valide**.

Actions a traiter en premier :

- `RECORD_STORY_STEP` ;
- `RECORD_DICE_ROLL` ;
- `OPEN_CONFIRMATION` ;
- `CLOSE_CONFIRMATION` ;
- `FINISH_GAME`.

Pourquoi celles-ci d'abord :

- elles sont simples ;
- elles sont faciles a tester ;
- elles reduisent deja plusieurs setters dans `Book`.

Actions a traiter ensuite :

- `GO_TO_CHAPTER` ;
- `CONFIRM_CHOICE` ;
- `RESOLVE_ACTION_RESULT` ;
- mise a jour de l'inventaire via la navigation ;
- `UPDATE_BACKGROUND`.

Critere d'acceptation :

- chaque action a au moins un test ;
- `Book` ne contient plus les mutations correspondantes ;
- le comportement de sauvegarde reste identique.

Realisation actuelle :

- `GAME_ACTIONS` ajoute les actions de jeu principales.
- `gameReducer` gere `OPEN_CONFIRMATION`, `CLOSE_CONFIRMATION`, `CONFIRM_CHOICE`, `GO_TO_CHAPTER`, `OPEN_JOURNAL`, `CLOSE_JOURNAL`, `RECORD_STORY_STEP`, `RECORD_DICE_ROLL`, `RESOLVE_ACTION_RESULT`, `UPDATE_BACKGROUND` et `FINISH_GAME`.
- L'inventaire est recalcule dans le reducer lorsque la navigation modifie les choix deja effectues.
- `Book` ne porte plus les mutations metier correspondantes.
- Les tests couvrent l'ouverture/fermeture des modales, la navigation, la confirmation, l'inventaire, l'historique sans doublon, l'ajout de jet, la resolution d'action, le background et la fin de partie.

Reste a faire dans cette etape :

- rien de bloquant ; les futures actions dependront des prochains ajouts de gameplay.

### Etape 4 - Creer `useGameState`

Priorite : moyenne.

Statut : **Valide**.

Responsabilites :

- exposer l'etat ;
- exposer les handlers ;
- brancher la sauvegarde ;
- brancher le scroll top ;
- calculer `currentStory` et `displayChoices`.

Critere d'acceptation :

- `Book` n'a presque plus de `useState` ;
- les effets sont regroupes dans le hook ;
- `Book` devient un composant de composition.

Realisation :

- `src/hooks/useGameState.js` cree.
- Le hook expose l'etat, le chapitre courant, les choix affichables et les handlers de jeu.
- La sauvegarde automatique et le scroll top sont regroupes dans le hook.
- `Book` n'a plus de `useState`, `useReducer`, `useEffect`, `useMemo` ou `useCallback` directs.
- `Book` se limite maintenant au rendu conditionnel et a la distribution des props.

### Etape 5 - Evaluer l'extraction de la phase de resolution

Priorite : basse.

Question a trancher :

- garder `Events` autonome pour la phase `choosing / rolling / resolved` ;
- ou faire gerer cette phase par le reducer global.

Recommandation actuelle :

- garder `Events` autonome tant que les statistiques et la sauvegarde fonctionnent ;
- envisager l'extraction seulement si les critiques, echecs critiques, relances ou modificateurs deviennent plus complexes.

## Architecture Cible

```text
src/
  contents/
    book.jsx
    game/
      GameShell.jsx
      GameScreen.jsx
      ChoiceFooter.jsx
      GameJournalModal.jsx
    chapter/
      chapter.jsx
    events/
      events.jsx
      theend.jsx
      choicecard.jsx
    player/
      game-journal.jsx
  hooks/
    useGameState.js
  game/
    gameState.js
    gameState.test.js
    saveGame.js
    saveGame.test.js
    gameJournal.js
    gameJournal.test.js
    storyNavigation.js
    storyNavigation.test.js
    resolveAction.js
    resolveAction.test.js
    inventory.js
    inventory.test.js
```

## Etat Cible De `Book`

`Book` devrait a terme ressembler a ceci :

```jsx
function Book({ perso, initialGameState }) {
  const game = useGameState({ perso, initialGameState });

  if (game.error) {
    return <GameError {...game.error} />;
  }

  if (game.state.storyEnd) {
    return (
      <TheEnd
        save={game.state.storyHistory}
        inventory={game.state.inventory}
        rollHistory={game.state.rollHistory}
      />
    );
  }

  return <GameScreen game={game} />;
}
```

Cette forme rend le composant plus stable. Les prochaines evolutions se feront surtout dans `gameState`, `useGameState` ou les composants specialises.

## Risques Du Refactor Et Parades

- Risque : casser la reprise de sauvegarde.
  Parade : tester `createInitialGameState` et relancer un parcours manuel reprise/rejouer.

- Risque : changer sans le vouloir l'ordre de l'historique.
  Parade : tester `RECORD_STORY_STEP` avec doublon et nouvelle entree.

- Risque : perdre la mise a jour d'inventaire.
  Parade : garder `updateInventoryFromChoices` comme helper pur et tester l'action reducer qui l'appelle.

- Risque : introduire trop de fichiers trop vite.
  Parade : extraire d'abord les composants visuels, puis seulement le reducer.

- Risque : deplacer la phase de de trop tot.
  Parade : laisser `Events` gerer localement `choosing / rolling / resolved` dans un premier temps.

## Definition Of Done Pour Cette Refactorisation

La dette `Book` sera consideree traitee si :

- `Book` ne contient plus directement toute l'initialisation de l'etat ;
- les composants de rendu repetables sont extraits ;
- la sauvegarde est construite depuis une fonction claire ;
- les mutations principales sont testables hors React ;
- `npm run validate:story`, `npm run test`, `npm run lint` et `npm run build` passent ;
- un parcours manuel confirme : nouvelle partie, reprise, journal, fin, rejouer.

### Dette 2 - Historique sous forme de tableau libre

`save.current` contient des tableaux `[texte, chapitre, perso]`. Cela fonctionne, mais un objet `{ text, chapterId, player }` serait plus lisible a terme.

### Dette 3 - Absence de statistiques structurees

Les jets de de sont maintenant historises dans `rollHistory` et exploites par `GameJournal`. La dette restante porte plutot sur la profondeur des statistiques et leur modele de donnees.

Ameliorations possibles :

- calculer un taux de reussite global ;
- calculer un taux de reussite par caracteristique ;
- identifier la caracteristique la plus utilisee ;
- afficher le meilleur jet et le pire jet ;
- calculer la marge de reussite ou d'echec ;
- indiquer la fin atteinte ;
- transformer `storyHistory` en objets nommes pour eviter les tableaux libres.

### Dette 4 - Layouts responsive instables

Etat : **en cours**.

Les derniers ajustements UI ont corrige plusieurs problemes visibles, mais ils ont aussi revele une dette plus profonde : le systeme de layout n'est pas encore assez stable. Les ecrans utilisent un melange de classes Bootstrap, de CSS global, de media queries locales, de hauteurs fixes en `vh/svh`, de scroll horizontal et de correctifs ponctuels. Cette accumulation rend les regressions faciles, notamment entre desktop et mobile.

Constat :

- certains ecrans utilisent encore des wrappers Bootstrap (`row`, `col-*`) alors que leur comportement est gere par du CSS maison ;
- plusieurs composants partagent des classes globales comme `.main-content`, `.inside-content`, `.footer-content`, `.description` ou `.max-h-160`, ce qui rend les effets de bord probables ;
- les layouts de jeu, de choix, de personnages et de fin de partie n'ont pas encore de contrats CSS clairs ;
- les corrections mobiles ont parfois ete ajoutees en reaction a un rendu casse, sans normaliser le systeme global ;
- la verification responsive repose encore trop sur des tests visuels manuels.

Objectif :

- definir des composants de layout explicites : `GameLayout`, `ChoiceStrip`, `EndLayout`, eventuellement `ResponsivePanel` ;
- limiter l'usage des classes Bootstrap structurelles dans les ecrans critiques quand un layout maison existe deja ;
- documenter les contrats CSS de chaque zone : hauteur disponible, largeur maximale, scroll autorise, comportement mobile/desktop ;
- remplacer les correctifs disperses par des classes dediees et previsibles ;
- ajouter une verification responsive minimale sur les ecrans clefs : accueil, choix personnage, chapitre, resolution de de, ecran final.

Critere d'acceptation :

- chaque ecran principal tient dans son conteneur attendu en mobile et desktop ;
- les panneaux textuels scrollent a l'interieur de leur cadre au lieu d'agrandir toute la page ;
- les carrousels et listes horizontales scrollent dans leur zone sans faire deborder le viewport ;
- il n'existe plus de double definition contradictoire pour un meme layout ;
- les changements de layout sont regroupes dans des composants ou classes dedies, pas disperses dans des overrides globaux.

Premiere consolidation realisee :

- `GameShell` expose maintenant une classe de layout explicite `game-main`.
- `Chapter` et `Events` utilisent `game-stage` et `game-stage-content` au lieu de dependre directement des anciennes classes de hauteur generiques.
- `ChoiceFooter` et les choix d'action utilisent `game-choice-strip`, qui porte le contrat de scroll horizontal.
- Le HUD mobile ne porte plus de dimensions en styles inline ; elles sont centralisees dans `App.css`.
- Les anciennes classes `h-65`, `h-35`, `inside-content` et `footer-content` restent presentes pour compatibilite, mais ne sont plus le contrat principal des ecrans de jeu.
- `Home` utilise maintenant `home-screen`, `home-header`, `home-choice-row` et `home-description` au lieu d'une structure `row/col` Bootstrap.
- `Characters` utilise maintenant `character-screen`, `character-description`, `character-choice-strip` et `character-choice-item` pour isoler la selection de personnage du layout Bootstrap.
- `TheEnd` utilise maintenant des classes internes dediees (`end-panel`, `end-prompt-panel`, `end-copy-button`, `end-prompt-scroll`, `end-prompt-content`) et ne depend plus des anciennes classes `padding-prompt`, `enter-end-component`, `copy-texte` ou `copy-button`.

## Tests Et Verification

Commandes standard :

```bash
npm run validate:story
npm run test
npm run lint
npm run build
```

Parcours manuel minimal :

- commencer une nouvelle partie ;
- faire un choix direct ;
- faire une action avec jet de de ;
- recharger la page et reprendre ;
- verifier l'inventaire apres reprise ;
- atteindre une fin ;
- copier le prompt final ;
- cliquer sur `Rejouer` et verifier que l'ancienne sauvegarde ne revient pas.

## Definition Of Done Sprint 4

Le sprint 4 sera considere termine si :

- une partie est sauvegardee automatiquement ;
- une partie peut etre reprise depuis l'accueil ;
- une nouvelle partie peut ignorer ou effacer l'ancienne sauvegarde ;
- le prompt final reste coherent apres reprise ;
- les erreurs de sauvegarde ne cassent pas le jeu ;
- les tests de helpers passent ;
- `npm run validate:story`, `npm run test`, `npm run lint` et `npm run build` passent.

---

## 🎨 Recommandation UI/UX : Rationalisation et Cohérence des Couleurs

Statut : **En cours - premiere passe appliquee**.

Suite aux audits de la charte graphique et des parcours utilisateurs, une recommandation majeure de refonte visuelle a été identifiée et documentée. Elle est planifiée pour garantir le rendu premium de l'interface en éliminant la dette esthétique :

### 1. La Règle des 3 Couleurs Max (Fini les cartes multicolores)
Actuellement, le système de cartes utilise de trop nombreux dégradés colorés (teintes vertes, rouges, olive, violettes, slates, etc.), ce qui morcelle l'identité graphique.
*   **Dominante (60%)** : `hsl(220, 19%, 9%)` (Noir ardoise profond). Toutes les cartes du jeu adopteront le *même* fond sombre unifié. La distinction du type de carte se fera subtilement par son symbole tracé SVG (`SketchIcon`) et son flavor text.
*   **Secondaire (30%)** : `hsl(36, 34%, 92%)` (Blanc crème / Papier). Utilisé pour tous les textes, fiches d'aide, et contours géométriques neutres.
*   **Accentuation (10%)** : `hsl(43, 82%, 68%)` (Or Occulte). Réservé uniquement pour les boutons d'action et les états actifs/survolés.

### 2. Résolution de l'Anomalie du Bouton "Rejouer" (`.btn-retry`)
*   **Le problème** : Ce bouton utilise un dégradé cyan saturé (`hsl(176, 100%, 52%)`) cyberpunk hérité du tout premier prototype, créant une rupture violente avec le style ésotérique.
*   **La solution** : Le bouton devra adopter l'**Or Occulte plein** (`hsl(43, 82%, 68%)`) avec du texte noir (`hsl(220, 19%, 9%)`) pour s'imposer comme le bouton d'action principal et éliminer ce reliquat de prototype.

### 3. Hiérarchie Harmonisée des Boutons
*   **Bouton Majeur/CTA (Rejouer, validation critique)** : Fond Or Occulte plein, texte noir ardoise, lueur d'or intense au survol.
*   **Choix standards (Cartes d'actions)** : Fond ardoise sombre uniforme, texte crème, développement d'une fine bordure dorée avec lueur externe diffuse au survol (`box-shadow: 0 0 20px hsla(43, 82%, 68%, 0.35)`).

### Analyse et décision

Ces recommandations sont pertinentes, mais la règle des 3 couleurs doit rester une direction de palette plutôt qu'une contrainte absolue. Les signaux fonctionnels comme réussite/échec peuvent conserver un vert ou un rouge discret, car ils aident le joueur à comprendre l'état de la partie.

Première passe appliquée :

*   Les cartes partagent maintenant un fond sombre unifié ; les différences passent surtout par la bordure, le symbole et le flavor text.
*   Le bouton `Rejouer` n'utilise plus le cyan hérité du prototype et adopte l'or occulte.
*   Les accents cyan de marque, liens et dessins de cartes ont été remplacés par l'or de la charte.
*   Les boutons principaux et secondaires ont des états hover/focus plus cohérents.

Reste volontairement à vérifier visuellement :

*   que la réduction des couleurs ne rend pas les types de cartes trop semblables ;
*   que les exceptions vert/rouge des résultats restent assez lisibles ;
*   que l'identité sombre/or ne devient pas trop monotone sur une partie complète.

## 📱 Recommandations UI/UX Supplémentaires (Multiplateforme)

Statut : **En cours - premiere passe prudente appliquee**.

Afin d'assurer une expérience utilisateur (UX) optimale et "user-friendly" sur l'ensemble des plateformes (Mobile, Tablette, Desktop), voici les recommandations prioritaires à implémenter :

### 1. Fluidité et Adaptabilité (Responsive Design)
*   **Le problème** : Certaines tailles de cartes sont fixes en pixels pour la version Desktop (`.cardChoiceSize` à 180x264px), ce qui peut casser la mise en page sur des écrans intermédiaires (comme les tablettes).
*   **La solution** : Privilégier les grilles dynamiques (`CSS Grid`) ou `Flexbox` avec des unités relatives (`rem`, `%`, `vw`) pour que les cartes se redimensionnent de manière fluide selon l'espace disponible, sans jamais utiliser de valeurs fixes strictes en pixels.

### 2. Approche "Touch-First" (Priorité Mobile)
*   **Le problème** : Les animations de survol (hover) fonctionnent très bien sur Desktop mais n'offrent aucun retour sur Mobile.
*   **La solution** : 
    *   **Feedback tactile** : Ajouter des états actifs (`:active`) avec un léger changement d'échelle (`transform: scale(0.98)`) ou une surbrillance brève au toucher.
    *   **Accessibilité** : S'assurer que les choix cruciaux et le bouton "Continuer" soient situés dans le tiers inférieur ou central de l'écran (la "Thumb Zone" - facilement accessible avec les pouces).

### 3. Lisibilité et Fatigue Visuelle
*   **Le problème** : Sur les petits écrans, la densité de texte narrative peut être difficile à lire confortablement.
*   **La solution** : Garantir un interligne (`line-height`) d'au moins `1.5` ou `1.6` pour les descriptions. Utiliser systématiquement les unités `rem` pour la taille de police (`font-size`) afin de respecter les préférences d'affichage (zoom texte) configurées par les utilisateurs sur leur téléphone.

### 4. Performance Graphique (Glassmorphism)
*   **Le problème** : L'utilisation intensive de flou d'arrière-plan (`backdrop-filter: blur(14px)`) est très élégante mais demande beaucoup de ressources GPU sur les téléphones d'entrée et milieu de gamme.
*   **La solution** : Limiter cet effet visuel aux seuls panneaux structurels primaires (ex: les modales ou le panneau d'inventaire). S'assurer de conserver une couleur de fond partiellement opaque en solution de repli (fallback) au cas où le navigateur peine à le rendre fluidement.

### 5. Micro-interactions et Continuité Narrative
*   **Le problème** : Les coupures brutes lors de la transition entre deux chapitres peuvent briser la sensation d'immersion et perturber le suivi visuel du joueur.
*   **La solution** : Intégrer de subtiles transitions de fondu (`fade-in` / `fade-out`) lors de l'apparition d'un nouveau bloc de texte ou d'un nouveau panneau, guidant ainsi l'attention de l'utilisateur tout en douceur.

Première passe appliquée :

*   Ajout d'un état `:active` sur les cartes et boutons importants pour donner un retour tactile.
*   Interligne mobile des descriptions remonté à `1.55`.
*   Flou de `.description` réduit sur mobile afin de limiter le coût GPU tout en conservant l'ambiance.
*   Les tailles fixes des cartes ne sont pas refondues maintenant, car le rendu mobile actuel est validé et le scroll horizontal fonctionne.

### 6. Résolution des anomalies d'interactions (Modale, Hover, Superpositions)

Statut : **Valide techniquement - vérification visuelle en cours**.

Suite à notre revue de conception, voici les solutions techniques approuvées pour corriger 4 points de friction spécifiques :

#### A. Fermeture intuitive de la modale du journal (Click outside)
*   **Problème** : La modale du journal ne se ferme pas lorsque l'on clique à l'extérieur. C'est contre-intuitif.
*   **Solution technique** : Ajouter un événement `onClick` sur le fond assombri (`.confirm-modal-backdrop`) pour déclencher la fermeture (`onClose`). Il est indispensable d'ajouter `e.stopPropagation()` sur le conteneur central (`.confirm-modal`) afin d'éviter qu'un clic à l'intérieur ne ferme accidentellement la modale.
*   **Réalisation** : `ConfirmModal` ferme maintenant au clic extérieur. Le panneau central stoppe la propagation pour éviter les fermetures involontaires.

#### B. Cartes rognées au survol (Z-index)
*   **Problème** : Au survol (`hover`), l'effet de zoom de la carte la fait passer en dessous des composants adjacents, brisant l'effet de profondeur.
*   **Solution technique** : Assurer que l'élément survolé soit mis au premier plan. Dans la classe CSS `.cardChoice:hover`, s'assurer de définir `position: relative;` et ajouter `z-index: 10;`.
*   **Réalisation** : `.cardChoice:hover` passe au premier plan avec `z-index: 10`, et le footer desktop laisse respirer le zoom vertical.

#### C. Superposition de la "Signature" sur la zone interactive (PC)
*   **Problème** : Sur Desktop, si on a 4 cartes, celle tout à droite est superposée (et cachée) par la signature du site.
*   **Solution technique retenue (Option B)** : Rendre la signature adaptative. La conserver en `position: fixed` uniquement sur mobile. Sur version Desktop (via `@media`), la repasser dans le flux normal d'affichage comme un pied de page classique (footer) tout en bas de page pour qu'elle ne masque plus jamais la zone interactive.
*   **Réalisation** : la signature n'est plus en `fixed` par défaut et revient dans le flux. Le comportement mobile existant est conservé pour ne pas casser le rendu validé.

#### D. Panneau de règles encombrant sur Desktop
*   **Problème** : Le bloc de rappel des règles prend un espace permanent trop important et disgracieux, alors qu'il n'est utile qu'occasionnellement.
*   **Solution technique retenue** : Remplacer l'affichage permanent par de l'information "à la demande". Le bloc statique sera transformé en "Side Drawer" (panneau latéral coulissant / Offcanvas) activable au clic sur un petit bouton d'aide discret, ne prenant de la place que lorsque le joueur souhaite vérifier une règle.
*   **Réalisation** : `RulesDrawer` remplace le panneau permanent sur desktop dans `Chapter` et `Events`. Le HUD mobile continue d'utiliser sa modale de règles dédiée.

#### E. Refonte de l'écran de fin (Carrousel et Actions)
*   **Problème** : L'écran de fin de partie est actuellement beaucoup trop chargé. Les éléments débordent du cadre, l'espacement est insuffisant, et la charge cognitive est trop élevée pour le joueur qui vient de terminer son aventure.
*   **Solution technique retenue** :
    *   **Carrousel de présentation** : Diviser les informations finales en un carrousel interactif composé de 3 pages distinctes :
        *   Page 1 : Le récapitulatif de la partie (Statistiques, Fin atteinte).
        *   Page 2 : Explication contextuelle du Prompt IA.
        *   Page 3 : Le texte brut du Prompt IA, prêt à être copié par le joueur.
    *   **Agencement des boutons** : Placer les boutons d'action clés ("Rejouer" et "Journal") au-dessus de ce carrousel. Les disposer horizontalement l'un à côté de l'autre (via `display: flex; gap: 16px;` par exemple) plutôt que verticalement, afin de garantir un accès immédiat sans forcer le scrolling.
*   **Réalisation** : `TheEnd` utilise maintenant trois panneaux simples (`Résumé`, `Explication`, `Prompt`) contrôlés par onglets. Les boutons `Rejouer` et `Journal` sont regroupés horizontalement au-dessus des panneaux.

#### F. Rééquilibrage du Layout Desktop et ancrage de l'Aide
*   **Problème** : Le futur bouton d'aide "Point d'interrogation" risque de sembler flotter au milieu de l'écran. Par ailleurs, la suppression du lourd panneau de règles va générer un grand vide inexploité sur l'interface PC.
*   **Solution technique retenue** :
    *   **Position du Bouton d'aide (`?`)** : L'intégrer de manière compacte juste à droite de l'encart "Personnage". Cela crée une association logique et visuelle très claire (Aide relative aux mécaniques du personnage).
    *   **Équilibre de l'interface** : Utiliser l'espace laissé vacant par le retrait des règles pour y faire remonter le bloc "Historique de partie" (Journal). Le layout PC sera ainsi parfaitement symétrique : le panneau du Personnage à gauche, l'Histoire interactive au centre, et l'Historique narratif aligné à droite, exactement à la même hauteur que le panneau de gauche.
*   **Réalisation** : le bouton d'aide est intégré à côté du panneau personnage dans `Chapter` et `Events`. Le bouton `Journal` est remonté dans la zone d'information desktop avec un compteur d'entrées, au lieu de rester flottant sur le bord de l'écran.

#### G. Nettoyage des redondances (Titre en doublon)
*   **Problème** : Le titre du panneau des règles apparaît deux fois actuellement, dont une occurrence non accentuée ("rappel").
*   **Solution technique retenue** : Effectuer un nettoyage JSX du composant lié aux règles afin de supprimer l'en-tête superflu. Conserver uniquement le titre principal, correctement accentué et mis en forme.
*   **Réalisation** : `RulesPanel` accepte `showTitle`. Les modales et le drawer masquent le titre interne lorsque leur conteneur fournit déjà un titre.

### 7. Ajustements UI/UX Finaux (Corrections et Layout PC)

Suite à une seconde revue visuelle, voici les directives techniques pour corriger les derniers comportements inattendus :

#### H. Le "Vrai" Carrousel Tactile (Écran de Fin)
*   **Problème** : L'utilisation de boutons type "onglets" casse la métaphore de la progression et de la page qui se tourne. L'utilisateur souhaite un véritable carrousel glissant.
*   **Solution technique** : Créer un carrousel léger en pur CSS (Scroll Snap) sans librairie externe.
    1.  Sur le conteneur parent des pages : `display: flex; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory;`.
    2.  Sur chacune des 3 pages (divs enfants) : `min-width: 100%; scroll-snap-align: center;`.
    3.  Créer deux boutons fléchés (Précédent / Suivant) qui exécuteront en JavaScript un décalage du scroll horizontal (par exemple : `containerRef.current.scrollBy({ left: window.innerWidth, behavior: 'smooth' })`).

#### I. Redimensionnement de l'encart final sur PC
*   **Problème** : L'encart de l'écran de fin est contraint par des limites de taille strictes pensées pour le jeu (ex: `max-width: 440px`), ce qui le rend minuscule et illisible au milieu d'un grand écran de bureau.
*   **Solution technique** : Dans la media query Desktop (`@media (min-width: 601px)`), supprimer les restrictions de taille sur le conteneur du carrousel de fin et lui attribuer de larges proportions : `max-width: 1000px; width: 85%; min-height: 60vh; margin: 0 auto;`.

#### J. Conflit Z-Index entre Cartes et Titre (Page Home)
*   **Problème** : Au survol, la carte Home passe sous la section Titre malgré son `z-index: 10`. C'est un problème de contexte d'empilement global (Stacking Context).
*   **Solution technique** : Élever le parent des cartes. Cibler le conteneur englobant **toutes** les cartes (`.footer-content` ou `.home-footer`) et lui appliquer `position: relative; z-index: 20;` afin qu'il passe tout entier au-dessus du bloc Titre.

#### K. Suppression de la bordure du bouton Journal
*   **Problème** : Le bouton d'accès au Journal possède un encadré indésirable hérité des styles par défaut.
*   **Solution technique** : Cibler le composant en CSS (ex: `.game-journal-button`) et forcer la neutralisation des bordures : `border: none !important; outline: none !important; box-shadow: none;`.

#### L. Layout PC : Histoire large (3/4) et Personnage ancré à droite (1/4)
*   **Problème** : Actuellement, le Personnage est situé à gauche et le panneau d'Histoire prend 100% de la largeur de l'écran, ce qui ne correspond pas à la maquette cible (Profil ancré à droite).
*   **Solution technique** : Mettre en place un agencement Flexbox asymétrique dédié au Desktop.
    1.  Envelopper l'Histoire et le Personnage dans une `div` parente commune (`.layout-pc-parent`).
    2.  Dans `@media (min-width: 601px)` : 
        `.layout-pc-parent { display: flex; flex-direction: row; align-items: flex-start; gap: 24px; max-width: 1200px; margin: 0 auto; width: 100%; }`
    3.  L'Histoire reçoit `flex: 0 0 75%;` (3/4 de l'espace).
    4.  Le Personnage reçoit `flex: 0 0 25%;` (1/4 de l'espace).
    5.  Afin que le Personnage soit mécaniquement positionné à droite de l'écran, assurez-vous que le composant de l'Histoire soit déclaré **en premier** dans le flux JSX.

Realisation :

*   `TheEnd` utilise maintenant un vrai carrousel horizontal en CSS Scroll Snap avec boutons `Precedent` et `Suivant`.
*   L'encart final desktop est agrandi a `max-width: 1000px`, `width: 85%` et `min-height: 60vh`.
*   Les anciennes classes d'onglets de fin ont ete retirees du CSS pour eviter les conflits.
*   Le parent des cartes de la page Home est eleve en `z-index` afin que le hover ne passe plus sous le titre.
*   Les boutons de journal n'ont plus de bordure ni d'outline force par defaut.
*   `Chapter` et `Events` utilisent un layout desktop asymetrique : histoire en premier a gauche, panneau personnage/journal/aide a droite.
*   Le layout mobile garde une largeur pleine pour l'histoire, afin de ne pas subir le ratio desktop 75/25.

Vérification technique :

*   `npm run lint` : passe.
*   `npm run test` : passe, 37 tests.
*   `npm run validate:story` : passe avec les warnings `draft` connus.
*   `npm run build` : passe avec les warnings Sass/Bootstrap connus.

### 8. Correctifs Layout Mobile et Inventaire HUD

Suite aux tests sur mobile, plusieurs ajustements ont été apportés pour corriger des régressions de mise en page (Flexbox) et améliorer l'UX globale :

*   **Inventaire Mobile** : Intégration d'une barre d'inventaire défilable horizontalement directement dans le composant `MobileHud`, placée sous les boutons principaux pour un accès visuel direct sans avoir à ouvrir le panneau Personnage.
*   **Centrage du bloc de lecture PC** : Ajout d'une classe ciblee `game-reading-layout` sur `Chapter` et `Events`. Le centrage vertical du texte narratif et du panneau lateral se fait uniquement dans `@media (min-width: 601px)`, sans etendre les effets de `.layout-pc-parent` aux autres ecrans.
*   **Correction du défilement horizontal (Choix et Personnages)** : 
    * Remplacement de la classe Bootstrap `justify-content-evenly` par `justify-content-md-evenly` dans `events.jsx` et `characters.jsx`. Cela empêche le navigateur de centrer de force les cartes qui débordent de l'écran sur mobile, réactivant ainsi le défilement de gauche à droite (`flex-start` naturel).
    * Ajout d'une largeur explicite `width: 100%` sur `.footer-content` (mobile) pour contrer l'effet `align-items: center` du parent `.main-content`. Sans cela, le conteneur adaptait sa largeur à son contenu (444px), sortait de l'écran et neutralisait le défilement interne.
    * Protection des cartes contre le rétrécissement forcé via `flex-shrink: 0 !important;` sur les enfants directs de `.footer-content`.

Note de fin de journee :

Les correctifs de layout ameliorent la situation mais ne ferment pas la dette. La stabilite responsive reste a traiter comme un chantier dedie : il faudra rationaliser les layouts, supprimer les doubles definitions CSS, clarifier les conteneurs responsables du scroll et verifier les ecrans clefs mobile/desktop.
