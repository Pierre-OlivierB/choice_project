# Recherches UX - Cycle d'action

## Objectif

Ce document rassemble une premiere recherche sur les interfaces de fiction interactive, de gamebooks numeriques et d'outils de jet de des pour ameliorer le cycle d'action de `La maison de l'oubli`.

L'application fonctionne deja avec une base claire : lecture, choix, action, jet de D100, resultat, continuation. L'objectif n'est donc pas de tout remplacer, mais d'identifier les ameliorations qui peuvent rendre l'experience plus fluide, plus lisible et plus satisfaisante.

## Systeme Actuel - Avantages Et Inconvenients

### Avantages

- Le cycle est simple a comprendre : choix, action, de, resultat, suite.
- Le systeme est rapide : le joueur n'attend pas une animation longue.
- La logique est lisible : un D100 inferieur ou egal a la caracteristique reussit.
- Le resultat est facile a tester techniquement, surtout depuis l'extraction dans `src/game/resolveAction.js`.
- L'interface reste legere et ne depend pas d'un moteur 3D ou physique.
- Le systeme fonctionne sur desktop et mobile sans contrainte materielle particuliere.
- Le jet numerique evite les problemes de performance, de compatibilite WebGL ou d'accessibilite.

### Inconvenients

- Le lancer manque de sensation physique et de tension dramatique.
- Le joueur peut percevoir le resultat comme un simple nombre genere par l'ordinateur.
- L'action de lancer le de n'est pas encore un moment fort de l'experience.
- Le lien entre action, caracteristique, chance de reussite et consequence pourrait etre plus visible.
- Il n'y a pas encore d'historique detaille des jets.
- Le systeme ne montre pas encore de statistiques de partie : reussites, echecs, caracteristiques utilisees.
- Le bouton `Lancer le De` donne peu de feedback sensoriel.

Conclusion provisoire :

Le systeme actuel est une bonne base fonctionnelle. Le principal axe d'amelioration n'est pas de changer la regle du D100, mais de rendre le moment du lancer plus clair, plus tendu et plus memorable.

## Sources Consultees

- Zap Code - Interactive stories and UI/UX design : https://www.zapcode.dev/learn/interactive-stories-with-ui-ux-design
- Peerdh - Game design principles in interactive fiction : https://peerdh.com/blogs/programming-insights/understanding-game-design-principles-in-interactive-fiction
- DBohdan - Designing Episode's interactive fiction : https://dbohdan.com/episode-interactive-fiction
- Shard Tabletop - Digital dice and inline roll interactions : https://www.shardtabletop.com/blog/dice-dice-baby
- Group RPG Dice Roller - App Store feature list : https://apps.apple.com/us/app/group-rpg-dice-roller/id1496041058
- Day & Zhu - Agency informing techniques in interactive narratives : https://www.researchgate.net/publication/319364506_Agency_informing_techniques_communicating_player_agency_in_interactive_narratives
- Discussion Reddit - Branching fiction and remembered choices : https://www.reddit.com/r/interactivefiction/comments/1rvadqq/the_branching_fiction_problem_when_choices_dont/
- RollFate - 3D dice roller with physics : https://rollfate.com/
- Dice Box - 3D dice roller module : https://github.com/3d-dice/dice-box
- Dice Box documentation summary : https://context7.com/3d-dice/dice-box
- threejs-dice - Three.js and Cannon.js dice : https://aaboyles.github.io/threejs-dice/
- Three.js manual - physics engines : https://threejs.org/manual/en/physics.html
- enable3d - Three.js and Ammo.js physics : https://enable3d.io/

## Enseignements Principaux

### 1. Les choix doivent etre visibles, lisibles et suivis d'un feedback

Les interfaces de fiction interactive reposent sur un principe simple : le joueur lit, choisit, puis voit clairement ce qui s'est passe. Les sources UX consultes insistent sur des boutons lisibles, des etats clairs et un feedback immediat apres action.

Application au projet :

- les cartes sont deja visibles ;
- le clic/tap/clavier a ete ajoute ;
- le feedback pourrait etre plus riche apres un choix ou un jet.

Suggestion :

- ajouter un court etat de confirmation visuelle apres activation : carte selectionnee, choix resume, puis transition ;
- afficher clairement `Choix confirme` ou `Action choisie` dans une zone de statut ;
- eviter que le joueur ait l'impression que la carte disparait sans explication.

### 2. Le joueur doit comprendre pourquoi il lance un de

Dans les interfaces de jeu de role numeriques, le jet est plus satisfaisant quand il est contextualise. Shard Tabletop met en avant des jets accessibles directement depuis le texte et des valeurs visibles au moment du lancer. Les applications de dice roller mettent aussi en avant l'historique, les labels de jets et les profils.

Application au projet :

- l'app indique deja la caracteristique cible ;
- le joueur voit le resultat ;
- mais le cycle pourrait mieux expliquer le rapport entre action, caracteristique, chance et consequence.

Suggestion :

- avant le lancer, afficher une carte de resolution :
  - action choisie ;
  - caracteristique utilisee ;
  - score du personnage ;
  - regle courte : `Reussite si D100 <= score`.
- apres le lancer, afficher :
  - `Jet : 42 / 75` ;
  - `Reussite` ou `Echec` ;
  - une micro phrase de consequence avant de continuer.

### 2 bis. Un de physique peut renforcer la tension du moment

Les outils specialises comme RollFate ou Dice Box montrent qu'un lancer 3D avec physique est techniquement possible dans un navigateur. Les bibliotheques modernes s'appuient souvent sur un moteur 3D et un moteur de physique : BabylonJS/AmmoJS, Three.js/Cannon, Three.js/Ammo ou variantes.

Application au projet :

- le jeu utilise un D100, donc une visualisation physique doit representer soit un de percentile, soit deux D10, soit une animation abstraite de D100 ;
- l'interet principal n'est pas la precision physique, mais la sensation de rituel avant le resultat ;
- il faut rester prudent sur mobile, performance et accessibilite.

Suggestion :

- ne pas remplacer immediatement le systeme actuel ;
- ajouter d'abord une option visuelle progressive ;
- garder le resultat logique calcule par `resolveRoll` comme source de verite ;
- utiliser l'animation comme feedback, pas comme unique source de resultat.

### 3. La perception d'agence compte autant que le nombre reel de branches

Les recherches sur l'agence en narration interactive distinguent l'agence reelle et l'agence percue. Un joueur peut avoir peu de branches, mais sentir que ses choix comptent si l'interface lui montre les effets, conserve une memoire et fait reference aux decisions passees.

Application au projet :

- `choiceAlreadyDone` et l'historique existent deja ;
- certains choix sont verrouilles ou modifies par l'inventaire ;
- l'ecran final recupere le parcours.

Suggestion :

- afficher ponctuellement une indication douce du type `Ce choix restera dans ton histoire` ;
- afficher les choix deja effectues sous forme de journal compact ;
- dans l'ecran de fin, separer clairement :
  - personnage ;
  - objets obtenus ;
  - actions importantes ;
  - historique narratif ;
  - prompt final.

### 4. Les choix doivent indiquer une intention, pas seulement une destination

Les bonnes interfaces de fiction interactive evitent les choix trop abstraits. Un choix comme `Atteindre le bureau` est comprehensible, mais un choix encore plus fort indique l'intention ou le risque : `Atteindre le bureau sans faire de bruit`.

Application au projet :

- plusieurs choix sont deja verbaux et concrets ;
- certains sont courts : `Autour de toi`, `Tes poches`, `Tu te leves`.

Suggestion :

- harmoniser les boutons de choix avec des verbes d'action ;
- preferer `Fouiller autour de toi` a `Autour de toi` ;
- preferer `Fouiller tes poches` a `Tes poches` ;
- garder les libelles courts, mais porteurs d'intention.

### 5. Le mobile demande des sequences courtes et un rythme plus decoupe

Les notes sur la fiction interactive mobile recommandent des experiences courtes, lisibles en interruptions, avec peu de personnages visibles a la fois et des sequences qui avancent vite.

Application au projet :

- les textes peuvent etre longs ;
- les cartes occupent une place importante ;
- les panneaux regles/personnage prennent beaucoup d'espace.

Suggestion :

- sur mobile, transformer les regles en panneau repliable ;
- afficher le personnage sous forme compacte ;
- garder le texte principal prioritaire ;
- limiter le nombre de cartes visibles simultanement ou les organiser en liste verticale.

## Proposition De Nouveau Cycle D'action

### Cycle actuel simplifie

1. Lecture du chapitre.
2. Choix d'une action.
3. Affichage du bouton `Lancer le De`.
4. Jet.
5. Resultat.
6. Continuer.

### Cycle propose

1. **Lecture**
   - Texte narratif.
   - Question du maitre du jeu.
   - Personnage et inventaire visibles, mais secondaires.

2. **Choix**
   - Liste de choix ou cartes.
   - Chaque choix contient un verbe clair.
   - Confirmation non intrusive.

3. **Preparation de l'action**
   - Resume : `Tu choisis de fouiller rapidement.`
   - Caracteristique : `Dexterite 50`.
   - Regle : `Reussite si D100 <= 50`.
   - Bouton : `Lancer le D100`.

4. **Lancer**
   - Animation courte ou feedback visuel.
   - Variante possible : lancer de de physique ou pseudo-physique.
   - Resultat mis en avant : `42 / 50`.
   - Badge : `Reussite` ou `Echec`.

5. **Consequence**
   - Afficher le texte de resultat.
   - Montrer si un objet est gagne ou perdu.
   - Bouton : `Continuer`.

6. **Memoire**
   - Ajouter l'action au journal.
   - Mettre a jour l'inventaire.
   - Garder l'historique pour le prompt final.

## Suggestions UX Priorisees

### Priorite 1 - Clarifier la phase de resolution

Probleme :

Le joueur voit le bouton de de, mais le lien entre son action, sa statistique et la probabilite peut etre plus clair.

Solution :

- creer un composant `ActionResolutionPanel` ;
- afficher action, caracteristique, score, condition de reussite ;
- afficher le resultat dans le meme bloc.

Impact :

- meilleure comprehension ;
- plus de tension avant le jet ;
- moins de confusion sur les regles.

### Priorite 2 - Ajouter un journal compact

Probleme :

Les choix sont memorises, mais le joueur ne les voit vraiment qu'a la fin.

Solution :

- ajouter un panneau `Journal` repliable ;
- afficher les 3 dernieres actions importantes ;
- afficher une entree quand la clef est obtenue ou utilisee.

Impact :

- meilleure perception d'agence ;
- meilleure comprehension de l'histoire ;
- preparation naturelle de l'ecran final.

### Priorite 2 bis - Explorer un lancer de de physique

Probleme :

Le lancer actuel est efficace, mais peu sensoriel. Le joueur clique, obtient un nombre, puis continue. Pour un jeu de role, le de peut devenir un vrai moment de tension.

Solution :

- ajouter une experience de lancer visuel ;
- commencer avec une version optionnelle ou progressive ;
- conserver le calcul actuel pour eviter de complexifier les regles ;
- afficher toujours le resultat numerique clairement.

Impact :

- plus de tension avant le resultat ;
- meilleure impression de jeu de role ;
- moment plus memorable ;
- risque de complexite technique et de performance.

### Priorite 3 - Repenser les choix en liste verticale sur mobile

Probleme :

Le defilement horizontal de cartes est utilisable, mais peut etre moins naturel sur mobile.

Solution :

- desktop : cartes horizontales possibles ;
- mobile : liste verticale de boutons/cartes compactes ;
- garder le swipe comme bonus, pas comme structure principale.

Impact :

- meilleure ergonomie tactile ;
- moins de debordement ;
- choix plus faciles a comparer.

### Priorite 4 - Rendre les consequences visibles

Probleme :

Le texte raconte la consequence, mais les changements systeme comme l'inventaire pourraient etre plus explicites.

Solution :

- afficher un mini feedback : `Objet obtenu : clef` ;
- afficher `Objet utilise : clef` ;
- afficher `Ton historique a ete mis a jour`.

Impact :

- meilleure lisibilite du systeme ;
- sentiment que les actions comptent ;
- moins de surprise si un objet disparait.

### Priorite 5 - Ameliorer l'ecran de fin

Probleme :

L'ecran final donne un prompt, mais il pourrait mieux valoriser le parcours.

Solution :

- separer `Recapitulatif` et `Prompt a copier` ;
- afficher personnage choisi ;
- afficher objets obtenus/utilises ;
- afficher jets reussis/echoues si les statistiques sont ajoutees ;
- proposer deux copies :
  - copier l'historique brut ;
  - copier le prompt complet.

Impact :

- meilleure conclusion ;
- prompt plus clair ;
- rejouabilite plus lisible.

## Suggestions Techniques Liees

### 1. Ajouter une phase explicite dans `Events`

Remplacer les booleens `waitingForRoll` et `actionSelected` par une phase :

```js
const ACTION_PHASES = {
  CHOOSING: "choosing",
  READY_TO_ROLL: "ready_to_roll",
  RESOLVED: "resolved"
};
```

Cela rendra le cycle plus lisible et facilitera les futures animations ou statistiques.

### 2. Faire remonter un objet de resultat

Au lieu de remonter `[!flag, next]`, `Events` pourrait remonter :

```js
{
  resultKey: "d_w",
  action: "dexterite",
  roll: 42,
  stat: 50,
  success: true,
  label: "Fouiller rapidement"
}
```

Cela permettra de creer un journal, des statistiques et un meilleur ecran final.

### 3. Creer `ActionResolutionPanel`

Ce composant pourrait remplacer une partie du JSX de `Events` :

- etat avant jet ;
- affichage du resultat ;
- bouton continuer ;
- feedback visuel.

### 4. Creer `GameJournal`

Le journal pourrait etre alimente par `Book` ou par un futur `useGameState`.

Entrees possibles :

- chapitre visite ;
- action choisie ;
- resultat de de ;
- objet obtenu/utilise ;
- fin atteinte.

### 5. Preparer les statistiques de partie

Stocker progressivement :

- nombre de jets ;
- reussites ;
- echecs ;
- caracteristiques utilisees ;
- personnage choisi ;
- objets obtenus.

Ces donnees seront utiles au sprint 4 pour sauvegarde, recapitulatif et rejouabilite.

## Faisabilite D'un Lancer De De Physique

### Option 1 - Garder le D100 logique et ajouter une animation simple

Principe :

- `rollD100()` genere le resultat ;
- une animation CSS/React simule un de qui tourne ;
- le resultat final apparait apres un court delai.

Avantages :

- facile a integrer ;
- tres peu de dependances ;
- compatible mobile ;
- accessible si le resultat reste textuel ;
- ne change pas la logique de jeu.

Inconvenients :

- ce n'est pas un vrai lancer physique ;
- moins spectaculaire qu'une scene 3D ;
- peut sembler artificiel si l'animation est trop simple.

Complexite estimee :

- faible.

Recommendation :

- bonne premiere etape.

### Option 2 - Utiliser `@3d-dice/dice-box`

Principe :

- integrer une bibliotheque specialisee de des 3D ;
- Dice Box utilise BabylonJS et AmmoJS ;
- elle supporte plusieurs types de des, dont D100 selon sa documentation ;
- elle fournit rendu 3D, physique, themes et resultats.

Avantages :

- experience visuelle riche ;
- bibliotheque specialisee, donc moins de code maison ;
- support de plusieurs types de des ;
- possibilite de themes et personnalisation.

Inconvenients :

- ajout de dependances lourdes ;
- integration avec Vite et assets statiques a verifier ;
- besoin de gerer chargement, WebGL, performance mobile ;
- risque d'alourdir une app actuellement simple ;
- accessibilite a prevoir : fallback texte obligatoire.

Complexite estimee :

- moyenne.

Recommendation :

- option interessante pour un prototype dedie, apres stabilisation du cycle d'action.

### Option 3 - Three.js + moteur physique

Principe :

- construire une scene 3D avec Three.js ;
- ajouter un moteur physique comme Cannon.js, cannon-es, Ammo.js ou enable3d ;
- modeliser un D100, deux D10, ou un objet symbolique.

Avantages :

- controle total sur le rendu ;
- possibilite de creer une ambiance forte ;
- compatible avec une direction artistique sur mesure.

Inconvenients :

- beaucoup plus long ;
- risque de bugs physiques ;
- besoin de modeles, textures, camera, lumieres, collisions ;
- maintenance plus lourde ;
- mauvais rapport effort/gain a court terme.

Complexite estimee :

- elevee.

Recommendation :

- a eviter pour l'instant, sauf si le lancer de de devient une signature centrale du projet.

### Option 4 - Deux D10 physiques au lieu d'un D100

Principe :

- representer un D100 par deux D10 :
  - un de des dizaines ;
  - un de des unites.

Avantages :

- plus proche de la pratique tabletop percentile ;
- plus simple visuellement qu'un vrai D100 ;
- permet une animation plus lisible ;
- compatible avec des bibliotheques 3D de des classiques.

Inconvenients :

- demande d'expliquer la lecture du resultat ;
- peut etre plus long qu'un affichage direct ;
- il faut gerer le cas `00`.

Complexite estimee :

- moyenne.

Recommendation :

- bonne option si l'app veut renforcer son ADN jeu de role.

## Recommendation Sur Le De Physique

Ne pas commencer par une physique 3D complete. La meilleure trajectoire est progressive :

1. Ajouter un `DiceRollPanel` simple avec animation courte et resultat clair.
2. Ajouter l'historique du jet : action, caracteristique, score, resultat, succes/echec.
3. Tester l'impact UX : est-ce que cela rend le jeu plus tendu ou juste plus lent ?
4. Prototyper `@3d-dice/dice-box` dans une branche ou un composant isole.
5. Garder un fallback texte pour mobile, accessibilite et performance.

Regle importante :

Le resultat logique doit rester centralise dans `resolveAction.js`. Si une animation 3D est ajoutee, elle doit se synchroniser avec ce resultat ou remonter un resultat verifie, mais ne doit pas disperser la logique de jeu dans un composant visuel.

## Proposition De Roadmap UX

### Sprint court A - Cycle d'action

- Ajouter phase explicite dans `Events`.
- Creer `ActionResolutionPanel`.
- Remonter un objet resultat.
- Ajouter feedback objet obtenu/utilise.
- Ajouter un premier `DiceRollPanel` anime sans moteur 3D.

### Sprint court B - Journal et recapitulatif

- Creer `GameJournal`.
- Afficher les dernieres actions.
- Enrichir `TheEnd` avec recapitulatif.

### Sprint court C - De physique experimental

- Prototyper `@3d-dice/dice-box` dans un composant isole.
- Tester D100 ou deux D10.
- Mesurer poids, performance et confort mobile.
- Decider si l'animation devient optionnelle ou standard.

### Sprint court D - Mobile

- Passer les choix en liste verticale mobile.
- Rendre regles et personnage repliables.
- Tester 390px et 768px.

## Conclusion

L'app a deja une bonne boucle de base. Les recherches suggerent que le plus gros gain UX ne vient pas d'ajouter beaucoup plus de branches, mais de mieux faire sentir au joueur :

- ce qu'il choisit ;
- pourquoi il lance un de ;
- ce que le resultat change ;
- ce que le jeu retient de lui.

La priorite recommandee est donc de retravailler le cycle d'action autour de trois idees : preparation, feedback, memoire.
