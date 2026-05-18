# Sprint 3 - Narration, Contenu et Scenario

## Etat D'Avancement

Statut global : **En cours**.

Le sprint 3 est lance. Les dettes techniques liees au scenario ont fortement avance : ids centralises, recuperation de chapitre par id, validateur renforce, tests unitaires, documentation narrative, nettoyage des placeholders jouables, relecture des chapitres actifs, refactors courts, cards illustrees, textes d'ambiance, ecran de fin harmonise et signature projet sont en place. Les points restants sont les decisions narratives sur les chapitres brouillons/non references et une verification UI finale des accents.

| Item | Statut | Notes |
| --- | --- | --- |
| 1. Audit narratif de `stories.json` | Valide | `scenario_audit.md` existe et le validateur liste les problemes restants. |
| 2. Corriger les tournures sans changer le contenu | Valide avec reserves | Les chapitres jouables ont ete relus et corriges sans changer les transitions. Les chapitres `draft` restent hors contenu final. |
| 3. Corriger les problemes d'encodage | Valide avec reserves | Les fichiers sont en UTF-8 et le validateur ne detecte plus de mojibake. Une verification UI reste utile avant livraison finale. |
| 4. Traiter les placeholders et chapitres brouillons | Valide avec reserves | Les placeholders involontaires ont ete retires des chapitres jouables. Les chapitres `4`, `5`, `7`, `8`, `12`, `18` restent marques `draft`. |
| 5. Analyser les chapitres non references | Valide avec reserves | Statut documente dans `scenario_audit.md`; decisions narratives finales encore a prendre. |
| 6. Normaliser progressivement le format narratif | Valide avec reserves | Format documente dans `narrative_guide.md`; JSON Schema ou migration stricte reportes. |
| 7. Documenter objets et preconditions | Valide | Clef et preconditions documentees dans `narrative_guide.md`; constantes dans `storyConstants.js`. |
| 8. Integrer les diagrammes de decision | Valide | Les fichiers Draw.io sont references dans `architecture.md` et `narrative_guide.md`. |
| 9. Guide d'ecriture de chapitre | Valide | `narrative_guide.md`. |
| 10. Remplacer la recuperation de chapitre par index | Valide | `getStoryById` utilise dans `Book`. |
| 11. Centraliser les ids et regles speciales | Valide | `src/game/storyConstants.js`. |
| 12. Renforcer le validateur de scenario | Valide | Warnings sur champs vides, placeholders, draft, actions alignees, avec regroupement par categorie. |
| 13. Ajouter des tests unitaires sur `src/game` | Valide | `npm run test` couvre `resolveAction`, `inventory`, `storyNavigation`. |
| 14. Preparer l'extraction de l'etat de `Book` | Valide | Etat minimal serialisable documente dans ce sprint ; `Book` est mieux prepare pour une extraction future. |
| 15. Clarifier les noms et l'etat dans `Book` | Valide | `flag` est remplace par `isReadingChapter`, `precendentAction` par `previousActionText`, et le mapping de resultats sort de `Book`. |
| 16. Rendre le validateur plus actionnable | Valide | Les warnings sont maintenant categories : priorite, draft, encodage, information. |
| 17. Nettoyer les placeholders des chapitres jouables | Valide | Les placeholders techniques ont ete remplaces par des textes de contexte coherents sur les chapitres jouables. |
| 18. Simplifier `TheEnd` | Valide | La copie du prompt utilise une variable React et un etat de confirmation, sans acces DOM direct. |
| 19. Preparer une phase de resolution dans `Events` | Valide | Le cycle action/de/resultat utilise une phase explicite et remonte un objet resultat au parent. |
| 20. Evaluer le remplacement interne de `ChoiceCard` par un bouton | Valide | `ChoiceCard` utilise un `<button>` simple ; le code swipe mort et la dependance `react-swipeable` ont ete retires. |
| 21. Ajouter des dessins contextuels aux cards | Valide | `ChoiceCard` integre `SketchIcon` avec des pictogrammes differencies par intention de choix, pas seulement par type technique. |
| 22. Ajouter du texte d'ambiance sur les cards | Valide | `ChoiceCard` affiche un flavor text court derive du pictogramme, sans modifier `stories.json`. |
| 23. Harmoniser le prompt final avec le theme | Valide | Le prompt final utilise un panneau sombre important, avec bordure doree et bouton de copie coherent avec le reste de l'interface. |
| 24. Ajouter la signature et le contact | Valide | Les pages principales affichent la mention `Developpe, ecrit par Pierre-Olivier B. (Powered by Codex)` avec lien LinkedIn. |

Verification actuelle :

- `npm run validate:story` : ne remonte plus que les chapitres `draft` et les chapitres non references.
- `npm run test` : passe, 16 tests.
- `npm run lint` : passe.
- `npm run build` : passe.
- Recommandations UX/UI continues : les trois corrections ajoutees sont appliquees (`ChoiceCard` sans swipe, cartes personnage responsives, scrollbars personnalisees).
- Relecture narrative : chapitres jouables `6` a `28` relus, champs `txt` realignes, placeholders actifs retires.
- Dessins de cards : pictogrammes contextuels integres par intention de choix, par exemple observer, fouiller, main pour tatonner, bureau, canape, meuble, porte ouverte, television, volet, voiture, pied rapide, pied leger, dialogue, force et livre ouvert pour continuer.
- Prompt final : le bloc de copie n'utilise plus de fond blanc et reste visuellement important dans le theme sombre.
- Signature : mention projet ajoutee sur les pages principales avec contact LinkedIn vers Pierre-Olivier B.

## Objectif

Ameliorer la qualite narrative et la maintenabilite du scenario sans changer le fond de l'histoire.

Le sprint 3 doit rendre les textes plus fluides, plus corrects et plus coherents, tout en preservant les evenements, les choix, les consequences, les objets, les fins et la structure actuelle du graphe narratif.

Ce sprint continue la roadmap apres la stabilisation technique et l'amelioration d'experience du sprint 2. Le projet dispose maintenant de helpers de jeu, d'une validation de scenario, de composants communs et d'une architecture documentee. Le prochain effort doit porter sur la qualite du contenu et la solidite du modele narratif.

## Principe Important - Ameliorer Sans Changer Le Contenu

Les textes peuvent etre reformules, corriges et rendus plus naturels, mais ils ne doivent pas changer ce qui se passe.

Autorise :

- corriger l'orthographe, la grammaire, les accords et la ponctuation ;
- corriger les problemes d'encodage ;
- rendre les phrases plus fluides ;
- clarifier une phrase confuse ;
- harmoniser le ton horrifique contemporain ;
- eviter les repetitions maladroites ;
- ameliorer les transitions entre deux idees ;
- remplacer une tournure bancale par une tournure plus naturelle ;
- conserver le meme niveau d'information, de danger, d'objet, d'action et de consequence.

Interdit :

- ajouter un nouvel evenement narratif ;
- supprimer une information utile au joueur ;
- changer le resultat d'une action ;
- changer la difficulte implicite d'une scene ;
- changer un choix, une transition ou une fin ;
- ajouter du lore non present ;
- transformer le style en quelque chose de trop litteraire si cela rend le jeu moins clair ;
- modifier les ids de chapitres sans refonte dediee.

Exemple de transformation attendue :

```text
Avant : Tu va doucement vers le bureau en essayant de ne pas faire de bruit, ton stress monte.
Apres : Tu avances doucement vers le bureau en essayant de ne pas faire de bruit. Ton stress monte.
```

Le contenu reste identique : le personnage avance vers le bureau, tente d'etre discret, et le stress augmente.

## Resultat Attendu

A la fin du sprint, le projet doit avoir :

- des textes narratifs relus et corriges ;
- une orthographe plus propre sur les ecrans principaux ;
- les problemes d'encodage les plus visibles corriges ;
- les placeholders narratifs remplaces ou marques comme brouillons ;
- les chapitres non references analyses ;
- une structure de scenario mieux documentee ;
- une table simple des objets et preconditions ;
- des diagrammes de decision integres ou references dans la documentation ;
- une base claire pour ajouter de nouveaux chapitres sans casser le jeu ;
- moins de dette technique autour des ids de chapitres, des cas speciaux et du validateur.

## Dettes Techniques A Traiter Pendant Ce Sprint

Le sprint 3 reste d'abord narratif, mais plusieurs dettes techniques sont directement liees au contenu. Les traiter maintenant evitera que la correction des textes se fasse sur un modele fragile.

### Dette 1 - Chapitres utilises comme index de tableau

Aujourd'hui, les ids de chapitres sont des chaines (`"0"`, `"1"`, etc.) et l'application recupere souvent un chapitre via sa position dans le tableau. Cela fonctionne tant que `numero_chapitre` correspond exactement a l'index du tableau, mais cela cassera si le JSON est trie autrement ou si un chapitre est deplace.

Resolution proposee :

- creer un helper `getStoryById(stories, chapterId)` ;
- remplacer progressivement `stories[Number(choice)]` par une recherche par `numero_chapitre` ;
- garder les ids sous forme de chaine pour eviter une migration massive ;
- ajouter une validation qui signale si deux chapitres ont le meme id.

Critere d'acceptation :

- deplacer un chapitre dans `stories.json` ne casse pas la navigation ;
- le validateur continue de verifier l'unicite des ids.

### Dette 2 - Cas speciaux encore codes par ids fixes

Certaines regles restent liees a des ids en dur : clef au chapitre `10`, utilisation au chapitre `19`, retour porte au chapitre `15`, changement de fond aux chapitres `1`, `17`, `19`.

Resolution proposee :

- regrouper ces ids dans un fichier de constantes, par exemple `src/game/storyConstants.js` ;
- remplacer les chaines magiques par des noms explicites ;
- documenter chaque constante ;
- preparer une future migration vers des metadonnees dans `stories.json`.

Critere d'acceptation :

- les ids speciaux ne sont plus disperses dans plusieurs fichiers ;
- lire les constantes permet de comprendre les regles speciales.

### Dette 3 - Validateur encore tolerant mais peu expressif

Le validateur detecte deja les transitions invalides et les longueurs incoherentes, mais il peut mieux accompagner l'ecriture narrative.

Resolution proposee :

- signaler les chapitres avec `txt`, `card_context` ou `mj_question` vides ;
- signaler les placeholders connus : `blabla`, `adipisicing`, `Txt qu'on doit pas voir`, etc. ;
- signaler les actions dont `actions.btn` et `actions.carac` n'ont pas la meme longueur ;
- signaler les chapitres marques `draft` en warning ;
- garder les warnings non bloquants tant que les donnees historiques ne sont pas nettoyees.

Critere d'acceptation :

- `npm run validate:story` aide vraiment la relecture narrative ;
- les erreurs bloquantes restent reservees aux incoherences qui cassent le jeu.

### Dette 4 - Absence de tests sur la couche `src/game`

Les helpers de jeu sont maintenant separes, mais pas testes. Ce sont pourtant les fonctions les plus faciles a securiser.

Resolution proposee :

- ajouter un runner de test leger si le projet l'accepte, par exemple Vitest ;
- tester `resolveRoll`, `getResultKey`, `addChoiceToHistory`, `updateInventoryFromChoices` ;
- tester les cas de clef : obtenue, non dupliquee, retiree ;
- tester les choix speciaux prepares par `getDisplayChoices`.

Critere d'acceptation :

- les regles de base peuvent etre verifiees sans lancer l'interface ;
- une regression sur l'inventaire ou les resultats de de est detectee rapidement.

### Dette 5 - `Book` reste responsable de trop d'etat

`Book` a ete allege au sprint 2, mais il reste le point central de l'etat global. Cela reste acceptable pour le prototype, mais deviendra limitant avec la sauvegarde du sprint 4.

Resolution proposee :

- preparer un hook `useGameState` sans migration totale immediate ;
- identifier les actions de jeu : `goToChapter`, `resolveAction`, `finishGame`, `updateInventory` ;
- documenter l'etat minimal a sauvegarder ;
- eviter d'ajouter de nouveaux etats directement dans `Book` pendant ce sprint.

Critere d'acceptation :

- une future extraction de l'etat vers un reducer est documentee ;
- le sprint 4 peut ajouter `localStorage` sans deviner tout l'etat necessaire.

### Dette 6 - Documentation technique encore separee du processus narratif

`architecture.md` decrit l'application, mais il manque une documentation pratique pour ecrire ou corriger un chapitre.

Resolution proposee :

- creer ou enrichir un document de contribution narrative ;
- expliquer les champs obligatoires ;
- expliquer les resultats par caracteristique ;
- expliquer la validation ;
- expliquer comment reformuler sans changer le contenu.

Critere d'acceptation :

- un contributeur peut corriger ou ajouter un chapitre simple sans lire tout le code.

## Analyse Complementaire Du Code

Nouvelle analyse apres les premiers travaux du sprint 3 :

### Amelioration A - Clarifier l'etat de `Book`

`Book` reste lisible mais porte encore trop d'etat local. Certains noms rendent aussi la logique moins claire, par exemple `flag` pour alterner chapitre/evenement et `precendentAction` avec une faute de frappe.

Resolution proposee :

- renommer `flag` en etat explicite, par exemple `isReadingChapter` ;
- renommer `precendentAction` en `previousActionText` ;
- deplacer `RESULT_ACTION_BY_KEY` dans `resolveAction.js` ;
- documenter l'etat minimal d'une partie avant le sprint 4 ;
- preparer un futur reducer sans tout migrer dans ce sprint.

Priorite : haute, car cela prepare sauvegarde et reprise.

Statut : **Valide**.

Ce point a ete applique : `Book` utilise maintenant `isReadingChapter` et `previousActionText`, et le mapping des resultats d'action est porte par `resolveAction.js`.

### Amelioration B - Separer le cycle d'action dans `Events`

`Events` gere encore beaucoup de details locaux : action selectionnee, valeur de caracteristique, jet, resultat, affichage du bouton continuer. Ce n'est pas bloquant, mais cela deviendra fragile si on ajoute critiques, statistiques ou historique des jets.

Resolution proposee :

- extraire `getCharacterStat` dans un helper pur ;
- representer l'etat de resolution par une petite phase : `choosing`, `rolling`, `resolved` ;
- faire remonter au parent un objet resultat plus lisible qu'un tableau `[flag, next]` ;
- ajouter des tests sur le mapping action/resultat si la logique sort du composant.

Priorite : moyenne.

Statut : **Valide**.

`Events` utilise maintenant une phase explicite (`choosing`, `rolling`, `resolved`), extrait la lecture de caracteristique via un helper pur, et renvoie un objet resultat au parent.

### Amelioration C - Remplacer les acces DOM directs dans `TheEnd`

`TheEnd` utilise `document.getElementById` pour copier le prompt et pour recuperer le toast. Cela fonctionne, mais c'est moins idiomatique React et plus fragile.

Resolution proposee :

- construire le texte du prompt dans une variable ou un memo ;
- copier cette variable plutot que lire le DOM ;
- utiliser un etat React pour afficher une confirmation de copie ;
- garder Bootstrap seulement si necessaire.

Priorite : moyenne.

Statut : **Valide**.

`TheEnd` construit le prompt dans une variable, copie cette variable avec `navigator.clipboard`, et affiche la confirmation de copie avec un etat React.

### Amelioration D - Rendre le validateur moins bruyant mais plus actionnable

Le validateur signale maintenant beaucoup de placeholders, y compris dans des chapitres `draft`. C'est utile, mais le bruit peut masquer les vrais problemes du parcours principal.

Resolution proposee :

- distinguer warnings `blocking-soon`, `draft`, `info` ;
- separer les placeholders des chapitres jouables et ceux des chapitres `draft` ;
- afficher un resume final par categorie ;
- conserver un exit code 0 tant que la navigation n'est pas cassee.

Priorite : haute pour le sprint 3, car cela guide la correction narrative.

Statut : **Valide**.

Le validateur regroupe maintenant les warnings par categorie : priorite, chapitres draft, encodage et information.

### Amelioration E - Nettoyer les placeholders des chapitres jouables

Les chapitres non marques `draft` contenaient plusieurs placeholders techniques comme `Txt qu'on doit pas voir`. Meme si ces champs n'etaient pas toujours affiches dans le parcours actuel, ils polluaient les donnees et le prompt potentiel.

Resolution proposee :

- verifier si chaque champ `txt` est reellement affiche ;
- remplacer les placeholders des chapitres jouables par un texte coherent ou un champ vide documente ;
- ne pas modifier les resultats d'action sans relecture narrative ;
- garder les chapitres `draft` identifies mais non prioritaires.

Priorite : haute.

Statut : **Valide avec reserves**.

Les placeholders involontaires ont ete retires des chapitres jouables. Les chapitres `draft` restent volontairement identifies comme brouillons.

### Amelioration F - Remplacer progressivement `window.confirm`

Les confirmations natives sont simples mais peu controlees. Elles bloquent aussi l'interface et sont difficiles a styliser.

Resolution proposee :

- creer une petite confirmation React reutilisable ;
- commencer par les choix narratifs ;
- traiter `Rejouer` dans le meme composant.

Priorite : basse pour sprint 3, haute pour une future passe UX.

Statut : **Valide**.

Les choix narratifs et l'action `Rejouer` utilisent maintenant une modale React reutilisable via `ConfirmModal`.

### Amelioration G - Stabiliser `ChoiceCard`

`ChoiceCard` est maintenant activable au clic et au clavier via un vrai `<button>` stylise. Le code de swipe residuel a ete retire pour eviter les activations accidentelles sur mobile.

Resolution proposee :

- evaluer le remplacement interne par un `<button>` stylise ;
- conserver les layouts existants ;
- verifier focus, disabled et activation clavier ;
- supprimer le swipe tant qu'il n'apporte pas une interaction indispensable.

Priorite : basse.

Statut : **Valide**.

### Amelioration H - Indexer les chapitres pour eviter les recherches repetees

`getStoryById` rend la navigation plus robuste, mais fait une recherche lineaire. Ce n'est pas un probleme avec 29 chapitres, mais une map preparee serait plus propre si le scenario grandit.

Resolution proposee :

- ajouter `createStoryIndex(stories)` ;
- utiliser une map dans `Book` ;
- tester `getStoryById` et l'index ;
- ne pas optimiser prematurement tant que le scenario reste petit.

Priorite : basse.

## Perimetre

### Inclus

- Relecture et correction des textes de `stories.json`.
- Relecture des textes d'interface encore visibles dans les composants.
- Correction des tournures sans changement de contenu.
- Analyse des chapitres non references : `4`, `5`, `7`, `8`, `12`, `18`.
- Marquage explicite des chapitres de test, brouillons ou branches mortes.
- Normalisation progressive des champs narratifs.
- Documentation du format d'un chapitre.
- Documentation des objets, preconditions et transitions speciales.
- Integration ou reference des diagrammes de decision.
- Resolution ciblee des dettes techniques liees au scenario.
- Amelioration du validateur de scenario.
- Preparation de tests sur la couche `src/game`.

### Exclu

- Ajout massif de nouveaux chapitres.
- Refonte complete du modele JSON.
- Migration TypeScript.
- Systeme de sauvegarde.
- Refonte graphique complete.
- Reecriture creative qui change le sens des scenes.
- Ajout de generation IA dans l'application.
- Refonte complete de `Book` en reducer.
- Migration complete du modele narratif.
- Correction exhaustive de toute la dette technique du projet.

## Backlog Sprint 3

### 1. Faire un audit narratif de `stories.json`

Priorite : haute

But : obtenir une vision claire des textes a corriger avant de modifier le fichier narratif.

Taches :

- Lister les chapitres avec problemes d'encodage visibles.
- Lister les placeholders ou textes de test.
- Lister les chapitres avec textes vides ou trop faibles.
- Lister les champs narratifs utilises : `txt`, `card_context`, resultats `c_w`, `d_l`, etc.
- Identifier les textes affiches dans le parcours principal.

Critere d'acceptation :

- Une liste claire des corrections narratives est disponible.
- Les chapitres prioritaires sont identifies.
- Les corrections peuvent etre faites sans toucher aux transitions.

### 2. Corriger les tournures sans changer le contenu

Priorite : haute

But : rendre la narration plus fluide, correcte et agreable a lire.

Taches :

- Corriger les fautes d'orthographe et de grammaire.
- Corriger les accords et conjugaisons.
- Couper les phrases trop longues quand cela ameliore la lisibilite.
- Remplacer les formulations maladroites par des tournures plus naturelles.
- Harmoniser le tutoiement et le ton.
- Garder les memes informations et consequences.

Critere d'acceptation :

- Le sens de chaque scene reste identique.
- Les choix et resultats ne changent pas.
- Les textes sont plus lisibles et plus propres.
- `npm run validate:story` passe apres les modifications.

### 3. Corriger les problemes d'encodage

Priorite : haute

But : supprimer les caracteres casses qui abiment l'experience de lecture.

Taches :

- Corriger les textes affichant `Ã©`, `Ã¨`, `Ã `, `Ãª`, etc.
- Verifier les composants React avec textes visibles.
- Verifier `README.md`, `master_plan.md`, `architecture.md` seulement si necessaire.
- S'assurer que les fichiers restent en UTF-8.

Critere d'acceptation :

- Les ecrans principaux n'affichent plus de caracteres casses.
- Les textes narratifs prioritaires sont propres.
- Les corrections ne changent pas les transitions.

### 4. Traiter les placeholders et chapitres brouillons

Priorite : haute

But : eviter qu'un texte de test apparaisse dans une partie jouable.

Taches :

- Identifier les textes comme `adipisicing elit`, `blabla`, textes vides ou placeholders.
- Decider pour chaque chapitre s'il est jouable, brouillon ou test.
- Marquer les chapitres brouillons avec un champ explicite, par exemple `status: "draft"`.
- Mettre a jour le validateur pour signaler les brouillons si utile.
- Ne pas supprimer un chapitre sans verifier ses references.

Critere d'acceptation :

- Aucun placeholder involontaire n'est present dans le parcours principal.
- Les chapitres de test sont identifies.
- Le validateur continue de passer.

### 5. Analyser les chapitres non references

Priorite : moyenne

But : comprendre si les chapitres `4`, `5`, `7`, `8`, `12`, `18` sont des branches mortes, des brouillons ou des contenus a reconnecter.

Taches :

- Lire chaque chapitre non reference.
- Identifier son role narratif probable.
- Decider : conserver comme brouillon, reconnecter plus tard, supprimer plus tard.
- Documenter la decision dans un fichier de suivi ou dans la documentation narrative.
- Ne pas reconnecter automatiquement dans ce sprint si cela change le parcours.

Critere d'acceptation :

- Chaque chapitre non reference a un statut clair.
- Les warnings du validateur sont compris.
- Aucune nouvelle transition n'est ajoutee sans decision narrative.

### 6. Normaliser progressivement le format narratif

Priorite : moyenne

But : rendre `stories.json` plus facile a maintenir.

Taches :

- Documenter les champs obligatoires et optionnels.
- Identifier les champs aux formats variables.
- Proposer une structure cible pour les resultats et transitions.
- Eviter une migration massive dans ce sprint.
- Preparer une future validation plus stricte.

Critere d'acceptation :

- Le format actuel est documente.
- Les differences de format sont listees.
- Une cible de normalisation est proposee pour un futur sprint.

### 7. Documenter objets et preconditions

Priorite : moyenne

But : preparer l'ajout futur d'objets sans multiplier les cas speciaux.

Taches :

- Documenter la clef actuelle.
- Documenter les conditions d'obtention et d'utilisation.
- Lister les chapitres lies a la clef.
- Proposer une structure future pour plusieurs objets.
- Preciser ce qui reste code dans `src/game/inventory.js`.

Critere d'acceptation :

- La regle de la clef est comprehensible sans lire tout `Book`.
- Les futures preconditions d'objets ont une direction claire.

### 8. Integrer les diagrammes de decision dans la documentation

Priorite : basse

But : rendre les branches narratives plus faciles a comprendre.

Taches :

- Referencer les fichiers existants dans `arbre_de_decision`.
- Ajouter une section dans `architecture.md` ou un fichier narratif dedie.
- Expliquer le role des diagrammes.
- Si les diagrammes sont obsoletes, le signaler.

Critere d'acceptation :

- Un contributeur sait ou trouver les diagrammes.
- La documentation indique s'ils sont a jour ou a verifier.

### 9. Preparer un guide d'ecriture de chapitre

Priorite : basse

But : permettre d'ajouter du contenu de facon coherente.

Taches :

- Expliquer comment creer un chapitre simple.
- Expliquer comment ajouter des actions et resultats.
- Expliquer la regle des cles `c_w`, `c_l`, `d_w`, `d_l`, `i_w`, `i_l`.
- Expliquer comment lancer la validation.
- Donner un exemple minimal de chapitre.

Critere d'acceptation :

- Un nouveau chapitre simple peut etre ajoute sans deviner le format.
- Le guide rappelle de lancer `npm run validate:story`.

### 10. Remplacer la recuperation de chapitre par index

Priorite : haute

But : ne plus dependre de l'ordre physique des chapitres dans `stories.json`.

Taches :

- Ajouter `getStoryById(stories, chapterId)` dans `storyNavigation.js` ou un helper dedie.
- Utiliser ce helper dans `Book`.
- Verifier que les transitions continuent de fonctionner.
- Ajouter un controle dans le validateur si necessaire.

Critere d'acceptation :

- La navigation utilise `numero_chapitre`, pas seulement l'index du tableau.
- Reordonner le JSON ne devrait plus casser le chapitre courant.

### 11. Centraliser les ids et regles speciales

Priorite : moyenne

But : remplacer les chaines magiques par des constantes explicites.

Taches :

- Creer `src/game/storyConstants.js`.
- Centraliser les ids de la clef, de la porte, de la victoire et des backgrounds.
- Remplacer les usages directs dans `Book`, `inventory.js` et `storyNavigation.js`.
- Documenter les limites de ces constantes.

Critere d'acceptation :

- Les ids speciaux sont consultables a un seul endroit.
- Les helpers restent lisibles.

### 12. Renforcer le validateur de scenario

Priorite : moyenne

But : faire du validateur un outil utile pour la correction narrative.

Taches :

- Detecter les champs narratifs vides.
- Detecter les placeholders connus.
- Detecter les actions dont les tableaux ne sont pas alignes.
- Signaler les chapitres `draft`.
- Garder les warnings non bloquants quand ils ne cassent pas le jeu.

Critere d'acceptation :

- Le validateur aide a prioriser les corrections de texte.
- Les erreurs bloquantes restent limitees aux problemes qui cassent la navigation.

### 13. Ajouter des tests unitaires sur `src/game`

Priorite : moyenne

But : securiser les regles extraites avant d'ajouter sauvegarde et rejouabilite.

Taches :

- Choisir un runner de test compatible Vite, idealement Vitest.
- Ajouter un script `test`.
- Tester `resolveAction.js`.
- Tester `inventory.js`.
- Tester les cas principaux de `storyNavigation.js`.

Critere d'acceptation :

- Les helpers principaux ont une couverture minimale.
- Les tests se lancent sans ouvrir l'application.

### 14. Preparer l'extraction de l'etat de `Book`

Priorite : basse

But : preparer le sprint 4 sans refondre tout de suite l'etat global.

Taches :

- Lister l'etat minimal d'une partie.
- Identifier les actions de jeu manipulant cet etat.
- Documenter une cible `useGameState` ou reducer.
- Eviter d'ajouter de nouveaux etats locaux dans `Book`.

Critere d'acceptation :

- La future sauvegarde locale sait quoi serialiser.
- La refonte de `Book` est mieux cadree pour le sprint 4.

Etat minimal serialisable pour le sprint 4 :

- `choice` : id du chapitre courant.
- `isReadingChapter` : indique si l'ecran affiche un chapitre ou une resolution d'action.
- `inventory` : liste des objets possedes.
- `win` et `action` : dernier resultat utile pour calculer les choix conditionnels.
- `choiceAlreadyDone` : historique technique des chapitres deja traverses.
- `previousActionText` : texte narratif actuellement affiche dans le chapitre.
- `activeBackground` : decor courant.
- `choiceAfterDiceRoll` : dernier chapitre resolu par un jet, utile pour le changement de decor.
- `save.current` : historique narratif qui alimente le prompt de fin.
- `perso` : personnage choisi au lancement de la partie.

Actions de jeu a extraire plus tard dans un hook ou reducer :

- aller vers un chapitre ;
- enregistrer un choix dans l'historique ;
- appliquer un choix direct ou confirme ;
- resoudre une action avec jet de de ;
- mettre a jour l'inventaire ;
- terminer la partie.

### 15. Clarifier les noms et l'etat dans `Book`

Priorite : haute

But : reduire la confusion avant la sauvegarde du sprint 4.

Taches :

- Renommer `flag` en nom explicite.
- Renommer `precendentAction`.
- Deplacer le mapping des resultats hors de `Book`.
- Documenter l'etat minimal serialisable.

Critere d'acceptation :

- Lire `Book` permet de comprendre le flux sans deviner le sens des booleens.
- Aucune regression de navigation n'est introduite.

Statut : **Valide**. `Book` utilise des noms explicites, et le mapping des resultats est centralise dans `src/game/resolveAction.js`.

### 16. Rendre le validateur plus actionnable

Priorite : haute

But : transformer les warnings nombreux en rapport exploitable.

Taches :

- Separer warnings de chapitres jouables et warnings de chapitres `draft`.
- Ajouter un resume par categorie.
- Signaler les placeholders du parcours principal en priorite.
- Garder les erreurs bloquantes pour les transitions invalides.

Critere d'acceptation :

- Le rapport de `npm run validate:story` indique clairement quoi corriger en premier.

Statut : **Valide**. Le rapport est groupe par categories pour separer les corrections prioritaires, les brouillons et les informations.

### 17. Nettoyer les placeholders des chapitres jouables

Priorite : haute

But : eviter que des textes techniques polluent les donnees narratives.

Taches :

- Identifier les chapitres non `draft` contenant `Txt qu'on doit pas voir`.
- Verifier si le champ est affiche dans le parcours actuel.
- Remplacer ou documenter ces champs sans changer les evenements.

Critere d'acceptation :

- Les chapitres jouables ne contiennent plus de placeholder involontaire.

Statut : **Valide**. Les placeholders techniques ont ete retires des chapitres jouables ; les brouillons restent explicites.

### 18. Simplifier `TheEnd`

Priorite : moyenne

But : supprimer les acces DOM directs pour la copie du prompt.

Taches :

- Construire le prompt dans une variable.
- Copier la variable avec `navigator.clipboard`.
- Remplacer le toast DOM par un etat React simple ou un composant dedie.

Critere d'acceptation :

- La copie fonctionne sans `document.getElementById`.

Statut : **Valide**. Le prompt est construit comme donnee React et la confirmation de copie ne depend plus du DOM Bootstrap.

### 19. Preparer une phase de resolution dans `Events`

Priorite : moyenne

But : rendre le cycle action/de/resultat plus extensible.

Taches :

- Introduire une phase explicite : choix, jet, resultat.
- Extraire `getCharacterStat`.
- Faire remonter un objet resultat au parent.

Critere d'acceptation :

- Ajouter plus tard critiques ou statistiques ne demande pas de reecrire tout `Events`.

Statut : **Valide**. `Events` utilise une phase de resolution claire et renvoie un objet resultat au parent.

### 20. Evaluer le remplacement interne de `ChoiceCard` par un bouton

Priorite : basse

But : ameliorer l'accessibilite sans changer l'apparence.

Taches :

- Tester un rendu interne avec `<button>`.
- Verifier les styles existants.
- Retirer le swipe si l'interaction n'apporte pas de valeur claire.

Critere d'acceptation :

- Le composant reste compatible avec les usages actuels.

### 21. Ajouter des dessins contextuels aux cards

Priorite : moyenne

But : rendre les cartes plus lisibles et plus immersives sans changer leur logique.

Taches :

- Integrer `SketchIcon` dans `ChoiceCard`.
- Differencier les pictogrammes selon le type de carte : action, de, objet, chapitre, continuer, fin, special, personnage.
- Supprimer la double iconographie pour garder un seul langage visuel.
- Ajouter des styles par type de carte.

Critere d'acceptation :

- Les cartes indiquent visuellement leur role.
- Les dessins restent decoratifs pour l'accessibilite et ne remplacent pas les textes.
- L'interface conserve le meme flux de jeu.

Statut : **Valide**.

## Ordre Recommande

1. Audit narratif de `stories.json`.
2. Correction des problemes d'encodage prioritaires.
3. Correction des tournures sans changement de contenu.
4. Traitement des placeholders et brouillons.
5. Analyse des chapitres non references.
6. Remplacement de la recuperation de chapitre par index.
7. Centralisation des ids et regles speciales.
8. Renforcement du validateur.
9. Documentation du format narratif.
10. Documentation objets/preconditions.
11. Integration des diagrammes.
12. Guide d'ecriture de chapitre.
13. Tests unitaires sur `src/game`.
14. Preparation de l'extraction de l'etat de `Book`.
15. Clarification des noms et de l'etat dans `Book`.
16. Rapport de validation plus actionnable.
17. Nettoyage des placeholders dans les chapitres jouables.
18. Simplification de `TheEnd`.
19. Preparation d'une phase explicite dans `Events`.
20. Evaluation accessibilite de `ChoiceCard`.

## Tests et Verification

Commandes a executer apres chaque passe importante :

```bash
npm run validate:story
npm run lint
npm run build
npm run test
```

`npm run test` est a executer seulement si le runner de test est ajoute pendant ce sprint.

Verification manuelle minimale :

- Lancer une partie depuis l'accueil.
- Choisir chaque personnage.
- Lire le debut et verifier les accents.
- Faire au moins une action reussie et une action echouee.
- Verifier que la clef apparait et disparait toujours correctement.
- Atteindre au moins une fin.
- Copier le prompt final.
- Relire l'historique genere pour verifier que les reformulations restent coherentes.

## Definition of Done Sprint 3

Le sprint est termine si :

- les textes principaux sont corriges sans changement de contenu ;
- les problemes d'encodage visibles sont corriges sur les parcours principaux ;
- les placeholders involontaires sont supprimes ou marques comme brouillons ;
- les chapitres non references ont un statut documente ;
- le format narratif est documente ;
- la regle des objets/preconditions est documentee ;
- les ids speciaux sont centralises ou documentes ;
- la recuperation des chapitres par id est preparee ou implementee ;
- le validateur signale les principaux problemes narratifs ;
- `npm run validate:story` passe ;
- `npm run lint` passe ;
- `npm run build` passe ;
- les limites restantes sont listees pour le sprint 4.

## Livrables

- `stories.json` relu et corrige sur les textes prioritaires.
- Documentation du format narratif.
- Documentation des objets et preconditions.
- Statut des chapitres non references.
- References aux diagrammes de decision.
- Guide d'ecriture de chapitre.
- Eventuelle mise a jour de `scripts/validate-story.mjs` pour signaler les brouillons.
- Helper de recuperation de chapitre par id.
- Constantes de scenario pour les ids speciaux.
- Tests unitaires de base sur `src/game`, si le runner est ajoute.
- Note technique preparant `useGameState` ou un reducer.
- Liste des dettes techniques restantes priorisees.
- Rapport de validation plus lisible si le validateur est ajuste.
- Nettoyage des placeholders des chapitres jouables si la passe narrative avance.

## Risques et Parades

- Risque : une reformulation change le sens d'une scene.
  Parade : relire chaque correction avec la question : "est-ce que le joueur apprend ou subit exactement la meme chose ?"

- Risque : corriger l'encodage cree des differences trop larges.
  Parade : travailler par lots de chapitres et verifier le diff.

- Risque : reconnecter une branche morte change le gameplay.
  Parade : documenter d'abord, reconnecter seulement dans un sprint dedie.

- Risque : les textes deviennent plus litteraires mais moins utiles au joueur.
  Parade : privilegier la clarte d'action, de consequence et d'ambiance.

- Risque : le JSON devient difficile a relire apres beaucoup de corrections.
  Parade : garder les modifications limitees aux champs textuels et lancer la validation souvent.

- Risque : traiter trop de dette technique ralentit la correction narrative.
  Parade : limiter les changements techniques a ceux qui protegent directement le scenario.

- Risque : les tests demandent trop de configuration.
  Parade : commencer par les helpers purs et reporter les tests React.

## Sprint 4 Propose Ensuite

Apres la correction narrative et la clarification du scenario, le sprint 4 devrait viser la sauvegarde et la rejouabilite :

- sauvegarde locale via `localStorage` ;
- reprise de partie ;
- export/import de l'historique ;
- recapitulatif des choix ;
- statistiques de partie : personnage choisi, jets, reussites, echecs ;
- premiere separation de l'etat global dans un hook ou reducer.

---

## Recommandations UX/UI Continues (Suite Sprint 2)

Suite à l'analyse complète de l'interface et de l'expérience utilisateur actuelle, l'application est sur la bonne voie (les animations de dé avec le pulse et les couleurs de succès/échec sont très premium !). Cependant, il reste 3 points techniques UX/UI importants à corriger pour avoir un rendu parfait :

### 1. Danger critique : Code mort du Swipe dans `ChoiceCard.jsx`
Bien que l'icône de la main ait été supprimée, le composant `<ChoiceCard>` utilise toujours le hook `useSwipeable` et possède toujours son état `swiped`. 
**Le problème :** Si un joueur sur mobile essaie de faire défiler la page et fait un léger mouvement vers la droite sur le bouton, le composant va déclencher l'action et ajouter la classe `.swiped`. Le bouton va alors se décaler de 50% sur le côté (à cause de `transform: translateX(50%);` toujours présent dans le CSS) et le joueur ne verra rien d'autre puisqu'il n'y a plus de fond vert/rouge derrière.
* **Correction à faire :** Supprimez complètement l'import de `react-swipeable`, supprimez le state `swiped`, enlevez `{...handlers}` du `<button>`, et supprimez la classe CSS `.cardChoice.swiped` dans `App.css`. Le composant doit devenir un simple bouton React !

### 2. Responsivité oubliée sur les Cartes Personnages
Sur les petits écrans (téléphones), les cartes d'actions (`cardChoiceSize`, `cardChoiceSizeDice`, etc.) sont bien redimensionnées grâce au bloc `@media (width<=600px)` à la fin de `App.css`. 
**Le problème :** La classe de la carte personnage (`.cardChoiceSizeCarac`) n'y figure pas ! Elle reste figée à `225px` de large, ce qui risque de casser l'affichage sur des téléphones étroits et provoquer l'apparition de barres de défilement horizontales.
* **Correction à faire :** Ajoutez `.cardChoiceSizeCarac` dans le `@media` (ou réduisez ses dimensions) pour garantir un bel affichage mobile.

### 3. Esthétique des barres de défilement (Scrollbars)
L'utilisation d'encadrés semi-transparents (`backdrop-filter`) et d'ombres est excellente. Cependant, quand les textes sont longs (comme dans l'historique ou les règles), l'apparition des barres de défilement "natives" du système (grises et épaisses sur Windows) casse l'ambiance sombre et immersive de "La Maison de l'Oubli".
* **Correction à faire :** Ajoutez des styles CSS personnalisés dans `index.css` pour affiner les barres de défilement. Exemple rapide :
```css
/* Custom Scrollbar pour un thème premium */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: hsla(43, 55%, 86%, 0.3); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: hsla(43, 82%, 68%, 0.6); }
```

### Validation Des Recommandations UX/UI Continues

Statut : **Valide**.

- Le code mort du swipe a ete retire de `ChoiceCard.jsx` : plus d'import `react-swipeable`, plus d'etat `swiped`, plus de handlers tactiles, plus de classe `.swiped`.
- La dependance `react-swipeable` a ete retiree de `package.json` et `package-lock.json`.
- Les styles morts lies a `.cardChoice.swiped`, `.card-ok-choice` et `.card-dis-choice` ont ete retires de `App.css`.
- Les cartes personnage ont maintenant un format mobile dedie via `.cardChoiceSizeCarac` dans le `@media (width<=600px)`.
- Les barres de defilement sont personnalisees dans `index.css` pour rester coherentes avec le theme sombre.

---

## Suite UX/UI : Nouvelles Fonctionnalités à Implémenter

Suite aux dernières discussions, deux nouvelles fonctionnalités visuelles et narratives doivent être intégrées à l'expérience utilisateur :

### 21. Adapter les Esquisses Animées aux Actions (`SketchIcon`)
Le prototype de tracé géométrique en arrière-plan des cartes (`SketchIcon.jsx`) a été validé visuellement, mais les tracés doivent désormais correspondre précisément aux types d'actions spécifiques du jeu.
* **Tâches :**
  - Mapper les différents `choiceType` (action, chapter, dice, item, etc.) avec des dessins abstraits/géométriques précis (ex: clé, porte, symbole occulte).
  - Nettoyer le code de `SketchIcon.jsx` pour pouvoir facilement ajouter de nouveaux tracés à l'avenir.
  - S'assurer que les tracés ne gênent jamais la lisibilité du texte (contrôle du `opacity` et `z-index`).

* **Statut : Valide.** `ChoiceCard` utilise maintenant `SketchIcon` comme langage visuel principal. Les dessins ne dependent plus seulement du type technique de carte : les libelles de choix produisent des esquisses concretes comme observer, fouiller, main pour tatonner, bureau, canape, meuble, porte ouverte, television, volet, voiture, pied rapide, pied leger, dialogue, force ou livre ouvert. L'iconographie FontAwesome redondante a ete retiree des cards.

### 22. Ajouter du Texte d'Ambiance (Flavor Text) sur les Cartes
Pour combler l'espace vide des cartes "Action" (qui mesurent 264px de haut) de manière immersive, un texte d'ambiance en italique viendra s'afficher en bas de la carte, façon jeu de société/tarot.
* **Tâches :**
  - Identifier comment passer ce texte additionnel au composant `ChoiceCard` (par exemple via une nouvelle propriété JSON dans `stories.json` ou une génération automatique liée au type d'action).
  - Modifier le composant `<ChoiceCard>` pour inclure une zone de texte secondaire (`.flavor-text`) stylisée en italique, plus petite, et avec une opacité réduite.
  - Mettre à jour l'alignement (`justify-content: space-between` par exemple) pour que le texte principal reste en haut ou au centre, et le flavor text calé en bas.

* **Statut : Valide.** Les cartes affichent maintenant un court texte d'ambiance en bas de carte, dans l'esprit d'une carte de jeu. Le texte est derive automatiquement du pictogramme (`sketchType`) via `getChoiceFlavorText`, ce qui garde `stories.json` centre sur le contenu narratif et evite d'y ajouter de la dette de presentation.

### 23. Harmoniser le Prompt Final avec le Theme
Le prompt final etait volontairement tres visible, mais son fond blanc jurait avec l'identite sombre de l'application.
* **Taches :**
  - Retirer le conteneur `bg-white` du prompt final.
  - Remplacer le bloc par un panneau sombre, lisible et plus coherent avec les autres surfaces.
  - Garder une emphase visuelle forte pour que le joueur comprenne que ce texte est important.

* **Statut : Valide.** Le prompt final utilise maintenant `.prompt-panel`, avec fond sombre, bordure doree, ombre et bouton de copie harmonise.

### 24. Ajouter la Signature et le Contact
Les pages doivent identifier clairement l'auteur et donner un moyen de contact.
* **Taches :**
  - Creer une signature reutilisable.
  - Afficher la mention `Developpe, ecrit par Pierre-Olivier B. (Powered by Codex)`.
  - Lier le nom a LinkedIn : `https://www.linkedin.com/in/pierre-olivier-baudino/`.

* **Statut : Valide.** Le composant `SiteSignature` est affiche sur les pages principales et conserve le lien LinkedIn sur le nom.
