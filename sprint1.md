# Sprint 1 - Ameliorations Systeme

## Etat D'Avancement

Statut global : **Clos - valide avec reserves acceptees**.

Les fondations principales du sprint sont en place : validateur de scenario, helpers de resolution, helpers de navigation, composants communs et confirmation avant rejouer. Les reserves restantes sont acceptees et reportees vers les sprints suivants.

| Item | Statut | Notes |
| --- | --- | --- |
| 1. Ajouter un validateur de scenario | Valide | `scripts/validate-story.mjs` existe et `npm run validate:story` passe avec warnings documentes. |
| 2. Extraire la resolution des actions | Valide | `src/game/resolveAction.js` contient `rollD100`, `resolveRoll`, `getResultKey`. |
| 3. Centraliser les helpers de chapitre | Valide avec reserve | `src/game/storyNavigation.js` existe avec `getDisplayChoices`, `addChoiceToHistory`, `getStoryById`. Certaines fonctions prevues initialement (`getResultText`, `isEndingAction`) sont reportees. |
| 4. Creer un composant commun pour joueur + regles | Valide | `PlayerPanel`, `InventoryList` et `RulesPanel` sont utilises par `Chapter` et `Events`. |
| 5. Ajouter une confirmation avant rejouer | Valide | `TheEnd` demande confirmation avant reload. |
| 6. Premier nettoyage des donnees narratives | Valide avec reserve | Chapitres non references marques `draft`, debut du scenario relu. Les placeholders restants sont reportes au sprint 3. |
| 7. Ajouter une documentation technique courte | Valide | `architecture.md`, `narrative_guide.md`, `scenario_audit.md` existent. |

Verification actuelle :

- `npm run validate:story` : passe avec warnings narratifs.
- `npm run lint` : passe.
- `npm run build` : passe.
- `npm run test` : passe depuis le sprint 3.

Decision de cloture :

- Sprint 1 clos.
- Les warnings narratifs ne bloquent pas la cloture.
- Les corrections exhaustives de contenu sont reportees au sprint 3.
- Les ameliorations UX sont reportees au sprint 2 ou aux recherches UX.

## Bilan De Cloture

Le sprint est considere termine parce que les objectifs systeme principaux sont atteints : le scenario est verifiable, la resolution des actions est extraite, la navigation est en partie centralisee, les composants dupliques ont ete factorises, la confirmation avant rejouer existe, et la documentation technique minimale est disponible.

Les points non termines ne bloquent pas la cloture du sprint 1. Ils sont reportes vers les sprints suivants, principalement le sprint 2 pour l'UX et le sprint 3 pour la narration.

### Livrables Valides

| Livrable | Statut | Reference |
| --- | --- | --- |
| Validateur de scenario | Valide | `scripts/validate-story.mjs`, script `npm run validate:story` |
| Helpers de resolution | Valide | `src/game/resolveAction.js` |
| Helpers de navigation | Valide avec reserve | `src/game/storyNavigation.js` |
| Composants communs joueur/regles | Valide | `src/contents/player/player-panel.jsx`, `src/contents/player/inventory-list.jsx`, `src/contents/rules/rules-panel.jsx` |
| Confirmation avant rejouer | Valide | `src/contents/events/theend.jsx` |
| Documentation technique | Valide | `architecture.md`, `narrative_guide.md`, `scenario_audit.md` |
| Rapport des donnees narratives fragiles | Valide | `npm run validate:story`, `scenario_audit.md` |

### Definition Of Done

| Critere | Statut | Note |
| --- | --- | --- |
| Le jeu reste jouable de l'accueil jusqu'a une fin | Valide avec reserve | Build OK. Verification manuelle complete a refaire lors d'une passe UX. |
| `npm run validate:story` passe | Valide | Passe avec warnings narratifs connus. |
| `npm run lint` passe | Valide | Passe. |
| `npm run build` passe | Valide | Passe avec warnings Sass Bootstrap non bloquants. |
| Les transitions de scenario sont validees | Valide | Aucune transition vers un chapitre inexistant. |
| Les warnings restants sont documentes | Valide | Placeholders, drafts et chapitres non references sont signales. |
| La resolution des jets est extraite | Valide | `rollD100`, `resolveRoll`, `getResultKey`. |
| Les composants principaux sont moins dupliques | Valide | `PlayerPanel`, `InventoryList`, `RulesPanel`. |

### Reserves Acceptees

#### Navigation

Le helper `storyNavigation.js` couvre maintenant la preparation des choix et la recuperation de chapitre par id. Certaines fonctions prevues au depart, comme `getResultText` ou `isEndingAction`, n'existent pas encore sous ces noms.

Decision : reserve acceptee. Le besoin est partiellement couvert autrement et le nettoyage restant est reporte.

#### Donnees narratives

Des placeholders restent presents dans `stories.json`, y compris dans certains chapitres jouables. Les chapitres non references `4`, `5`, `7`, `8`, `12`, `18` sont marques ou documentes comme brouillons.

Decision : reserve acceptee. La correction exhaustive des textes appartient au sprint 3.

#### UX et mobile

Le sprint 1 n'avait pas pour objectif une vraie refonte mobile. Les ajustements faits ensuite ne remplacent pas une verification visuelle complete.

Decision : reporte sprint 2.

### Reports Vers Les Sprints Suivants

| Sujet | Sprint cible | Raison |
| --- | --- | --- |
| Verification mobile/desktop approfondie | Sprint 2 | Sujet UX. |
| Modale custom a la place de `window.confirm` | Sprint 2 ou UX futur | Sujet experience joueur. |
| Nettoyage complet des textes et placeholders | Sprint 3 | Sujet narration. |
| Normalisation stricte du schema narratif | Sprint 3 ou sprint futur | Sujet contenu/outillage. |
| Extraction de l'etat global de `Book` | Sprint 4 | Prepare la sauvegarde locale. |
| Journal de partie et statistiques | Sprint 4 | Necessaire pour rejouabilite. |

### Commandes De Cloture

Commandes a conserver comme verification standard :

```bash
npm run validate:story
npm run test
npm run lint
npm run build
```

Etat observe lors de la cloture :

- `validate:story` passe avec warnings narratifs.
- `test` passe.
- `lint` passe.
- `build` passe avec warnings Sass Bootstrap non bloquants.

### Conclusion

Le sprint 1 a rempli son role : poser un socle plus fiable pour continuer le projet. La suite doit eviter de rouvrir les objectifs systeme deja valides et se concentrer sur les reports clairement identifies : UX, narration, puis sauvegarde.

## Objectif

Stabiliser le coeur du jeu sans changer son intention : un prototype de role play solo horrifique, jouable de bout en bout, mais plus fiable, plus lisible pour le developpeur, et plus simple a faire evoluer.

## Duree Proposee

1 a 2 semaines selon disponibilite.

## Resultat Attendu

A la fin du sprint, le projet doit avoir :

- une logique de jeu mieux separee des composants React ;
- un scenario verifiable automatiquement ;
- moins de duplication entre les ecrans ;
- une base plus saine pour ajouter sauvegarde, nouveaux chapitres et ameliorations UI ;
- une documentation minimale pour comprendre le systeme.

## Perimetre

### Inclus

- Validation des donnees de `stories.json`.
- Extraction de helpers de resolution.
- Nettoyage des cas speciaux les plus fragiles.
- Confirmation avant rejouer.
- Premier traitement des problemes d'encodage.
- Documentation technique courte.

### Exclu

- Refonte graphique complete.
- Ajout massif de nouveaux chapitres.
- Systeme de sauvegarde complet.
- Generation automatique par IA integree dans l'application.
- Migration TypeScript complete.

## Backlog Sprint 1

### 1. Ajouter un validateur de scenario

Priorite : haute

But : detecter automatiquement les erreurs de structure dans `src/contents/chapter/stories.json`.

Taches :

- Creer un script `scripts/validate-story.mjs`.
- Verifier que chaque `numero_chapitre` est unique.
- Verifier que chaque transition pointe vers un chapitre existant.
- Verifier que les listes `choix` et `btn_choix` ont la meme longueur.
- Verifier les paires `choix_win` / `btn_choix_win` et `choix_loose` / `btn_choix_loose`.
- Signaler les chapitres non references.
- Ajouter un script npm `validate:story`.

Critere d'acceptation :

- `npm run validate:story` affiche un rapport clair.
- Les transitions manquantes font echouer la commande.
- Les chapitres morts sont signales en warning, pas forcement en erreur.

### 2. Extraire la resolution des actions

Priorite : haute

But : sortir du composant `Events` la logique qui decide si une action reussit ou echoue.

Taches :

- Creer `src/game/resolveAction.js`.
- Ajouter une fonction `rollD100()`.
- Ajouter une fonction `resolveRoll({ roll, stat })`.
- Ajouter une fonction `getResultKey({ characteristic, success })`.
- Remplacer la logique conditionnelle de `Events` par ces helpers.

Critere d'acceptation :

- La regle reste identique : un jet inferieur ou egal a la caracteristique reussit.
- Les resultats continuent a pointer vers `c_w`, `c_l`, `d_w`, `d_l`, `i_w`, `i_l`.
- La logique peut etre testee sans afficher React.

### 3. Centraliser les helpers de chapitre

Priorite : haute

But : reduire la complexite de `Book`.

Taches :

- Creer `src/game/storyNavigation.js`.
- Ajouter une fonction `getAvailableChoices({ chapter, win, action })`.
- Ajouter une fonction `getResultText({ chapter, resultKey })`.
- Ajouter une fonction `isEndingAction(actionId)`.
- Deplacer progressivement les conditions de branches win/loose hors du JSX.

Critere d'acceptation :

- `Book` reste responsable de l'etat, mais moins de la logique de calcul.
- Les branches speciales existantes continuent de fonctionner.

### 4. Creer un composant commun pour joueur + regles

Priorite : moyenne

But : supprimer la duplication entre `Chapter` et `Events`.

Taches :

- Creer `src/contents/player/player-panel.jsx`.
- Creer `src/contents/rules/rules-panel.jsx`.
- Remplacer les blocs dupliques dans `Chapter` et `Events`.

Critere d'acceptation :

- Les informations personnage restent identiques.
- L'inventaire reste visible quand il existe.
- Le rappel des regles est affiche au meme endroit logique.

### 5. Ajouter une confirmation avant rejouer

Priorite : moyenne

But : eviter une perte de partie accidentelle.

Taches :

- Modifier `TheEnd`.
- Remplacer le reload direct par une confirmation navigateur simple.
- Plus tard, cette confirmation pourra devenir une modale custom.

Critere d'acceptation :

- Cliquer sur `Rejouer` demande confirmation.
- Annuler conserve l'ecran de fin.
- Confirmer recharge la partie.

### 6. Premier nettoyage des donnees narratives

Priorite : moyenne

But : assainir le scenario sans reecrire tout le contenu.

Taches :

- Marquer explicitement les chapitres de test ou non utilises.
- Corriger les placeholders visibles comme `Txt qu'on doit pas voir` et `adipisicing elit` si accessibles.
- Corriger les problemes d'encodage les plus visibles dans les textes d'interface.
- Verifier les chapitres non references : `4`, `5`, `7`, `8`, `12`, `18`.

Critere d'acceptation :

- Le validateur signale clairement ce qui reste en brouillon.
- Aucun placeholder involontaire n'est affiche dans le parcours principal.

### 7. Ajouter une documentation technique courte

Priorite : basse

But : permettre de reprendre le projet facilement.

Taches :

- Ajouter une section architecture dans le README ou un fichier dedie.
- Documenter le format d'un chapitre.
- Documenter la regle du jet de de.
- Documenter comment lancer validation, lint et build.

Critere d'acceptation :

- Un nouveau contributeur peut comprendre ou ajouter un chapitre simple.

## Ordre Recommande

1. Validateur de scenario.
2. Helpers de resolution.
3. Helpers de navigation.
4. Refactor composants communs.
5. Confirmation rejouer.
6. Nettoyage donnees.
7. Documentation.

## Tests et Verification

Commandes a executer en fin de sprint :

```bash
npm run validate:story
npm run lint
npm run build
```

Verification manuelle minimale :

- Lancer une partie avec chaque personnage.
- Atteindre au moins une fin.
- Verifier que la clef apparait apres le bureau.
- Verifier que la clef est consommable a la porte.
- Verifier que l'ecran de fin conserve l'historique.
- Verifier que `Rejouer` demande confirmation.

## Definition of Done Sprint 1

Le sprint est termine si :

- les scripts de verification passent ou documentent clairement les warnings restants ;
- la boucle de jeu complete fonctionne encore ;
- la resolution des jets est extraite et reutilisable ;
- les donnees du scenario ont un premier filet de securite ;
- les composants principaux sont moins dupliques ;
- les problemes restants sont listes pour le sprint 2.

## Livrables

- `scripts/validate-story.mjs`
- `src/game/resolveAction.js`
- `src/game/storyNavigation.js`
- composants communs `PlayerPanel` et `RulesPanel`
- mise a jour npm scripts
- documentation courte
- rapport des chapitres non references et placeholders

## Risques et Parades

- Risque : le refactor casse une branche narrative rare.
  Parade : garder le premier sprint petit et verifier les fins principales.

- Risque : les donnees actuelles melangent plusieurs formats.
  Parade : le validateur doit commencer tolerant, puis devenir plus strict progressivement.

- Risque : correction d'encodage trop large.
  Parade : corriger d'abord les textes d'interface et les placeholders, puis planifier une vraie passe narrative.

## Sprint 2 Propose Ensuite

Apres stabilisation systeme, le sprint 2 devrait viser l'experience joueur :

- remplacer le swipe par clic/tap confirme ;
- ameliorer mobile ;
- revoir les cartes ;
- rendre l'inventaire plus visuel ;
- ajouter sauvegarde locale simple ;
- enrichir l'ecran de fin avec recapitulatif des jets.
