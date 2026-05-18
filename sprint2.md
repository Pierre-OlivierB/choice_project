# Sprint 2 - Experience Joueur et Refonte Ciblee

## Etat D'Avancement

Statut global : **Clos avec reserves reportees**.

Le sprint 2 a livre les principaux changements structurels : `ChoiceCard` activable au clic/clavier, extraction des choix, inventaire clarifie, composants communs, resolution nettoyee, erreur de jeu reutilisable, ecran de fin enrichi et traces Vite nettoyees. Les reserves restantes sont reportees vers les sprints suivants, car elles relevent d'une finition produit plus large ou d'une refonte d'etat.

| Item | Statut | Notes |
| --- | --- | --- |
| 1. Transformer `ChoiceCard` en composant d'action robuste | Valide | Clic, clavier et swipe sont supportes. Le composant utilise maintenant un vrai `<button>`. |
| 2. Sortir la construction des choix de `Book` | Valide | `getDisplayChoices` prepare les choix affichables. |
| 3. Ajouter une confirmation sur les choix critiques | Valide | Confirmation native sur les choix narratifs et `Rejouer`. Une modale custom reste a faire. |
| 4. Factoriser joueur, inventaire et regles | Valide | `PlayerPanel`, `InventoryList`, `RulesPanel`. |
| 5. Clarifier la logique d'inventaire | Valide | `src/game/inventory.js` gere la clef, avec constantes depuis sprint 3. |
| 6. Ameliorer la lisibilite desktop et mobile | Valide avec reserves | Ajustements CSS faits, verification automatique OK. La verification visuelle approfondie reste a faire lors d'une passe produit. |
| 7. Revoir l'aspect des cartes de choix | Valide avec reserves | Animation permanente reduite, focus visible ajoute, rendu bouton stabilise. Differenciation visuelle avancee reportee. |
| 8. Rendre l'inventaire plus explicite | Valide | Inventaire affiche en badges via `InventoryList`. |
| 9. Ajouter des etats d'erreur lisibles | Valide | `GameError` centralise les erreurs de chapitre et d'action. |
| 10. Nettoyer `Events` autour de la resolution | Valide avec reserves | Helpers utilises, import `TheEnd` retire. Reste a introduire une phase explicite et remonter un objet resultat. |
| 11. Ameliorer l'ecran de fin et le prompt | Valide avec reserves | Prompt, copie, confirmation et recapitulatif simple presents. Recapitulatif narratif avance reporte. |
| 12. Ajouter identite minimale et liens | Valide avec reserves | Titre HTML, README, marque d'accueil et lien GitHub generique ajoutes. Logo dedie et URL finale restent a personnaliser. |

Verification actuelle :

- `npm run validate:story` : passe avec warnings narratifs.
- `npm run lint` : passe.
- `npm run build` : passe.
- `npm run test` : passe depuis le sprint 3.
- Verification navigateur locale tentee, mais le serveur lance en arriere-plan n'est pas reste disponible dans cette session. Le build Vite reste valide.

Application des recommandations UX/UI ajoutees : **premiere passe appliquee**.

- theme sombre plus immersif avec panneaux semi-transparents ;
- typographie de narration plus litteraire et interligne augmente ;
- cartes de choix differenciees par type via `choiceType` ;
- icones contextuelles sur les cartes de choix ;
- inventaire plus visuel avec icone d'objet ;
- feedback visuel avant le jet de D100 ;
- fond d'ecran affiche en `cover` pour renforcer l'immersion.

Restent reportes : installation d'une bibliotheque d'animation, refonte complete du layout en trois colonnes, historique recent sous forme de fil narratif et icones metier fines par type d'action.

Corrections appliquees suite a l'analyse des bugs CSS :

- remplacement de `overflow-wrap: anywhere` par une coupure de mots moins agressive ;
- transitions de `ChoiceCard` ramenees a 0.2s pour eviter l'impression de latence ;
- animation `mouse-move-right` simplifiee pour utiliser uniquement `transform` ;
- contrastes renforces sur les etats de swipe vert/rouge ;
- halo visuel ajoute sur les resultats de jet selon reussite ou echec.
- styles `.card-title` limites aux cartes de choix pour eviter le debordement du `PlayerPanel` ;
- modale React `ConfirmModal` ajoutee pour remplacer les confirmations natives.
- classe dediee `choice-card-title` ajoutee pour eviter que les cartes personnage heritent des styles de titre des cartes de choix ;
- titres de selection personnage remplaces par `choice-character-title` et `choice-character-subtitle` pour garder l'icone visible.
- icone de main et animation de swipe supprimees de `ChoiceCard` pour eviter la confusion avec le clic ;
- styles natifs du bouton nettoyes sur `.cardChoice` tout en conservant le focus clavier visible.

## Objectif

Ameliorer le confort de jeu et la comprehension du parcours sans changer le coeur narratif, tout en evitant d'ajouter de la dette technique sur les composants deja fragiles.

Le joueur doit pouvoir faire ses choix plus naturellement, comprendre ce qui se passe, lire l'histoire sans friction, et terminer une partie avec un recapitulatif plus clair. Cote code, les changements doivent aussi rendre le projet plus facile a maintenir : les interactions, la navigation, l'inventaire et l'affichage du joueur ne doivent plus etre disperses dans plusieurs composants.

Ce sprint part du principe que le sprint 1 a commence a stabiliser la logique de scenario, la resolution des actions et les helpers principaux. Si certaines fondations du sprint 1 ne sont pas terminees, elles restent prioritaires avant les changements d'interface les plus larges.

## Duree Proposee

1 a 2 semaines selon disponibilite.

## Resultat Attendu

A la fin du sprint, le projet doit avoir :

- une interaction possible par clic ou tap, en plus ou a la place du swipe ;
- une confirmation claire avant les choix importants ;
- une meilleure lisibilite sur desktop et mobile ;
- un inventaire plus visible et comprehensible ;
- un ecran de fin plus utile pour relire et copier l'historique ;
- des messages d'erreur simples si une donnee narrative manque ;
- une logique d'interface mieux separee de la logique de jeu ;
- moins de duplication entre `Chapter`, `Events` et les panneaux joueur/regles ;
- un `Book` moins charge en conditions speciales et en generation JSX ;
- une identite minimale : titre, logo, lien GitHub et signature.

## Analyse Technique Actuelle

L'analyse du code montre que l'experience joueur et la dette technique sont liees. Les ameliorations UX ne doivent donc pas etre faites uniquement en ajoutant du JSX ou des conditions dans les composants existants.

### Points de dette observes

- `Book` orchestre presque tout : chapitre courant, historique, inventaire, victoire/echec, choix disponibles, branches speciales, changement de fond et fin de partie.
- `Events` contient encore la logique de jet de de, de mapping caracteristique/resultat, de choix d'action et de fin de partie.
- `Chapter` et `Events` dupliquent l'affichage des regles, du personnage et de l'inventaire.
- `ChoiceCard` est fortement pensee pour le swipe, alors qu'elle devient le composant central de toutes les actions.
- Les ids de chapitres sont des chaines, mais sont utilises comme index de tableau via `stories[choice]`.
- Les regles d'inventaire, notamment la clef, sont codees directement dans des effets React.
- Les cas speciaux comme le retour a la porte, le chapitre `19` et certains backgrounds sont disperses dans `Book`.
- Les textes d'interface contiennent des problemes d'encodage qui brouillent l'experience.

### Intention de refonte pendant ce sprint

Le sprint 2 ne doit pas devenir une refonte totale. Il doit cependant poser des limites claires :

- `ChoiceCard` doit devenir un composant d'action generique, utilisable au clic, au clavier et au swipe si conserve.
- L'affichage du joueur et des regles doit etre factorise dans des composants communs.
- La construction des choix affiches doit sortir progressivement du JSX de `Book`.
- L'inventaire doit passer par des fonctions ou helpers lisibles, pas par des conditions cachees dans un `useEffect`.
- Les composants React doivent recevoir des donnees deja preparees autant que possible.

## Perimetre

### Inclus

- Remplacement progressif du swipe par des boutons clic/tap confirmables.
- Refonte ciblee de `ChoiceCard` pour en faire un composant d'action reutilisable.
- Extraction ou consolidation des helpers d'interface lies aux choix et a l'inventaire.
- Factorisation des blocs joueur, inventaire et regles.
- Amelioration responsive des ecrans principaux.
- Refonte legere des cartes de choix.
- Clarification de l'inventaire.
- Amelioration de l'ecran de fin.
- Ajout d'etats d'erreur lisibles.
- Ajout d'un lien GitHub, d'un logo et d'une signature.

### Exclu

- Refonte graphique complete.
- Ajout massif de nouveaux chapitres.
- Systeme de sauvegarde complet.
- Reprise de partie apres fermeture du navigateur.
- Systeme de creation de personnage personnalise.
- Generation IA integree directement dans l'application.
- Refonte complete de `Book` en machine d'etat.
- Migration TypeScript complete.
- Changement complet du modele narratif JSON.

## Backlog Sprint 2

### 1. Transformer `ChoiceCard` en composant d'action robuste

Priorite : haute

But : rendre les interactions accessibles au clavier, a la souris et au tactile sans imposer le geste de swipe, tout en evitant de multiplier les variantes de cartes.

Taches :

- Modifier `ChoiceCard` pour declencher une action au clic/tap.
- Garder le swipe temporairement si utile, mais ne plus en faire le seul moyen de jouer.
- Ajouter un role de bouton, un `tabIndex` et une activation clavier si le composant reste base sur une `div`.
- Renommer les props si besoin pour clarifier l'intention : par exemple `onActivate` au lieu de `onSwipeRight`.
- Conserver une compatibilite temporaire avec `onSwipeRight` pour limiter le risque de regression.
- Ajouter un etat visuel clair au survol, au focus et a l'activation.
- Supprimer ou reduire l'animation permanente qui suggere uniquement le swipe.
- Verifier que les choix de personnage, de navigation, d'action, de de et de continuation fonctionnent au clic.

Critere d'acceptation :

- Le joueur peut terminer une partie sans utiliser le swipe.
- Les cartes restent utilisables avec une souris et un ecran tactile.
- Les actions principales sont accessibles via tabulation et touche Entree si possible.
- Les composants parents n'ont pas besoin de connaitre le detail swipe/clic.

### 2. Sortir la construction des choix de `Book`

Priorite : haute

But : reduire la dette technique du composant `Book`, qui genere aujourd'hui beaucoup de JSX et contient des regles de navigation speciales.

Taches :

- Creer ou enrichir un helper de preparation des choix affichables, par exemple `getDisplayChoices`.
- Isoler les choix standards, les choix apres reussite/echec et les choix supplementaires.
- Donner a chaque choix une structure stable : `id`, `label`, `targetChapter`, `type`, `requiresConfirmation`.
- Deplacer progressivement la logique `btnList` / `choix` hors du rendu.
- Garder dans `Book` uniquement l'orchestration d'etat et les callbacks.

Critere d'acceptation :

- `Book` ne construit plus directement toutes les cartes dans une grande boucle JSX.
- Les cas speciaux existants continuent de fonctionner : retour porte, clef, victoire.
- Ajouter un nouveau type de choix ne demande pas de modifier plusieurs blocs JSX.

### 3. Ajouter une confirmation sur les choix critiques

Priorite : haute

But : eviter les choix accidentels, tout en gardant le rythme du jeu.

Taches :

- Ajouter une confirmation simple pour les choix de chapitre.
- Ajouter une confirmation specifique avant `Rejouer` si elle n'a pas ete faite au sprint 1.
- Prevoir un libelle court qui rappelle le choix selectionne.
- Ne pas demander confirmation pour les actions de confort comme copier le prompt.

Critere d'acceptation :

- Un choix narratif ne part pas par erreur au simple contact involontaire.
- Annuler une confirmation conserve l'ecran courant.
- Confirmer declenche exactement la meme logique qu'avant.

### 4. Factoriser joueur, inventaire et regles

Priorite : haute

But : supprimer la duplication entre `Chapter` et `Events`, et preparer une interface plus coherente.

Taches :

- Creer un composant `PlayerPanel`.
- Creer un composant `RulesPanel`.
- Creer un petit composant ou helper `InventoryList`.
- Remplacer les blocs dupliques dans `Chapter` et `Events`.
- Centraliser le choix d'icone personnage au lieu de le repeter dans plusieurs fichiers.

Critere d'acceptation :

- Les informations personnage restent identiques.
- Les regles s'affichent au meme endroit logique dans les deux ecrans.
- L'inventaire est rendu par un seul composant ou une seule fonction.
- Une modification du rendu joueur ne demande pas de changer `Chapter` et `Events` separement.

### 5. Clarifier la logique d'inventaire

Priorite : haute

But : rendre les objets de jeu plus maintenables avant d'en ajouter de nouveaux.

Taches :

- Extraire les regles d'ajout et de retrait d'objet dans un helper ou une fonction dediee.
- Remplacer les tests directs sur `choiceAlreadyDone.includes("10")` et `choiceAlreadyDone.includes("19")` par des fonctions nommees.
- Documenter la regle actuelle de la clef.
- Prevoir une structure simple pour plusieurs objets.
- Verifier que l'inventaire ne peut pas contenir deux fois le meme objet.

Critere d'acceptation :

- La clef apparait au bon moment.
- La clef disparait au bon moment.
- La logique d'inventaire peut etre testee sans parcourir le JSX.
- Ajouter un objet plus tard ne demande pas de modifier plusieurs effets React.

### 6. Ameliorer la lisibilite desktop et mobile

Priorite : haute

But : rendre les textes, cartes et panneaux plus confortables, notamment sur mobile.

Taches :

- Revoir les hauteurs fixes `h-65`, `h-35`, `max-h-160` et les contraintes qui compriment les textes.
- Eviter les zones horizontales trop larges sur mobile, notamment la selection de personnage.
- Ameliorer l'espacement entre regles, personnage, narration et choix.
- Verifier que les boutons/cartes ne debordent pas avec les textes longs.
- Ajouter des styles de focus visibles.

Critere d'acceptation :

- L'accueil, le choix de personnage, un chapitre, un evenement et la fin sont lisibles sur mobile.
- Les textes ne se superposent pas.
- Les zones scrollables sont evidentes et utilisables.

### 7. Revoir l'aspect des cartes de choix

Priorite : moyenne

But : donner aux choix une apparence plus lisible et moins dependante de l'effet de carte swipeable.

Taches :

- Simplifier le style de `cardChoice`.
- Differencier visuellement les types de cartes : choix, action, de, continuer, personnage.
- Remplacer l'icone de main ou la rendre contextuelle si le swipe est encore disponible.
- Ajouter un style disabled si un choix devient indisponible.
- Reduire les animations permanentes qui fatiguent la lecture.

Critere d'acceptation :

- Le joueur comprend qu'une carte est cliquable.
- Les cartes gardent une taille stable.
- Les types d'actions sont reconnaissables sans ajouter de long texte explicatif.

### 8. Rendre l'inventaire plus explicite

Priorite : moyenne

But : transformer l'inventaire actuel en information de jeu claire.

Taches :

- Afficher un etat vide explicite ou masquer proprement l'inventaire vide.
- Afficher les objets sous forme de liste ou badges simples.
- Ajouter un libelle stable : `Inventaire`.
- Prevoir une fonction d'affichage pour eviter d'afficher un tableau brut.
- Verifier le cas de la clef : apparition apres le bureau, consommation a la porte.

Critere d'acceptation :

- Le joueur voit clairement quand il possede la clef.
- La disparition de la clef apres utilisation est visible et coherente.
- L'affichage ne casse pas si plusieurs objets sont ajoutes plus tard.

### 9. Ajouter des etats d'erreur lisibles

Priorite : moyenne

But : eviter l'ecran casse si une donnee de chapitre, d'action ou de transition est incomplete.

Taches :

- Ajouter un composant simple `GameError` ou un bloc d'erreur reutilisable.
- Afficher un message si le chapitre courant est introuvable.
- Afficher un message si une action attendue n'a pas de caracteristique.
- Afficher un message si une transition pointe vers une donnee absente.
- Garder ces messages utiles pour le developpeur, sans exposer une stack technique au joueur.

Critere d'acceptation :

- Une donnee incomplete n'affiche pas une page blanche.
- Le message permet d'identifier le chapitre ou le champ en cause.
- Le jeu reste recuperable via retour accueil ou rejouer.

### 10. Nettoyer `Events` autour de la resolution

Priorite : moyenne

But : garder `Events` comme composant d'affichage et d'interaction, pas comme moteur de resolution.

Taches :

- Utiliser les helpers de resolution crees au sprint 1 si disponibles.
- Remplacer la logique `result / caracChoice > 1` par une fonction nommee.
- Remplacer le mapping manuel `constitution/dexterite/intelligence` vers `c_w/d_w/i_w` par une fonction dediee.
- Clarifier les etats locaux : action choisie, valeur de caracteristique, resultat du de, succes/echec.
- Supprimer l'import de `TheEnd` dans `Events` si la fin est uniquement geree par le parent.

Critere d'acceptation :

- La regle de succes reste identique : le jet doit etre inferieur ou egal a la caracteristique.
- La resolution peut etre comprise sans lire tout le JSX.
- `Events` remonte un resultat clair au parent.

### 11. Ameliorer l'ecran de fin et le prompt

Priorite : moyenne

But : rendre la fin de partie plus satisfaisante et le prompt plus facilement exploitable.

Taches :

- Corriger les textes visibles de l'ecran de fin.
- Separarer visuellement le recapitulatif de partie et le prompt a copier.
- Ajouter un bouton de copie clair avec retour utilisateur.
- Nettoyer le prompt pour eviter les formulations confuses.
- Prevoir un recapitulatif simple : personnage, objets clefs, choix importants, resultat final.

Critere d'acceptation :

- Le joueur comprend ce qu'il copie.
- Le prompt copie contient l'historique dans l'ordre.
- Le bouton copier donne une confirmation visible.

### 12. Ajouter identite minimale et liens

Priorite : basse

But : donner au prototype une presentation plus finie.

Taches :

- Remplacer le logo Vite par un logo du projet ou un visuel temporaire coherent.
- Ajouter un lien GitHub dans l'accueil ou le pied de page.
- Ajouter une signature discrete.
- Verifier le titre de page dans `index.html`.
- Nettoyer les references visibles au template Vite.

Critere d'acceptation :

- Le projet ne ressemble plus a un template Vite.
- Le nom `La maison de l'oubli` est clairement visible.
- Le lien GitHub est accessible sans gener l'experience de jeu.

## Ordre Recommande

1. Transformer `ChoiceCard` en composant d'action robuste.
2. Sortir la construction des choix de `Book`.
3. Factoriser joueur, inventaire et regles.
4. Clarifier la logique d'inventaire.
5. Ajouter les confirmations critiques.
6. Nettoyer `Events` autour de la resolution.
7. Ameliorer la lisibilite responsive.
8. Revoir l'aspect des cartes.
9. Ajouter les etats d'erreur.
10. Ameliorer l'ecran de fin et le prompt.
11. Ajouter identite minimale et liens.

## Tests et Verification

Commandes a executer en fin de sprint :

```bash
npm run validate:story
npm run lint
npm run build
```

Verification manuelle minimale :

- Lancer une partie depuis l'accueil.
- Choisir chaque personnage au clic.
- Faire au moins une action avec jet de de.
- Continuer apres reussite et apres echec.
- Obtenir la clef puis l'utiliser a la porte.
- Atteindre au moins une fin.
- Copier le prompt final.
- Rejouer et verifier la confirmation.
- Tester une largeur mobile, par exemple 390px.
- Tester une largeur desktop, par exemple 1440px.
- Verifier que `Chapter` et `Events` utilisent les composants communs joueur/regles.
- Verifier que les choix supplementaires restent disponibles dans les memes conditions qu'avant.

## Definition of Done Sprint 2

Le sprint est termine si :

- le jeu reste jouable de l'accueil jusqu'a une fin ;
- le swipe n'est plus obligatoire ;
- les choix importants demandent confirmation ;
- `Book` est allege de la construction directe des cartes de choix ;
- `Chapter` et `Events` ne dupliquent plus les panneaux joueur/regles ;
- la logique d'inventaire est nommee et isolee ;
- les ecrans principaux sont lisibles sur mobile et desktop ;
- l'inventaire est comprehensible ;
- l'ecran de fin permet de relire et copier proprement le prompt ;
- `npm run build` passe ;
- les warnings ou limites restantes sont notes pour le sprint 3.

## Livrables

- `ChoiceCard` utilisable au clic/tap.
- Helper ou hook de preparation des choix affichables.
- Composants communs `PlayerPanel`, `RulesPanel` et affichage d'inventaire.
- Helpers ou fonctions nommees pour la logique de clef/inventaire.
- Nettoyage de la resolution dans `Events`.
- Styles responsive ajustes dans `App.css` et/ou les fichiers de style existants.
- Inventaire affiche proprement.
- Ecran de fin clarifie.
- Gestion minimale des erreurs de jeu.
- Logo, titre, lien GitHub et signature.
- Courte note de verification dans le README ou dans un fichier de suivi.

## Risques et Parades

- Risque : changer `ChoiceCard` casse plusieurs parcours.
  Parade : modifier le composant de facon compatible, puis verifier accueil, personnage, chapitre, evenement, de et fin.

- Risque : extraire la logique de `Book` change une branche rare.
  Parade : deplacer d'abord la logique telle quelle dans des helpers, puis seulement ensuite la simplifier.

- Risque : la confirmation ralentit trop le jeu.
  Parade : commencer par une confirmation simple et courte, puis ajuster seulement si l'experience devient lourde.

- Risque : la refonte responsive devient une refonte graphique complete.
  Parade : limiter le sprint aux problemes de lisibilite, taille, debordement et navigation.

- Risque : les textes mal encodes rendent les corrections UI moins visibles.
  Parade : corriger au minimum les textes d'interface affiches sur les ecrans modifies.

## Sprint 3 Propose Ensuite

Apres l'amelioration de l'experience joueur, le sprint 3 devrait viser la narration et le contenu :

- relire et corriger tous les textes ;
- normaliser les champs de `stories.json` ;
- documenter le format narratif ;
- integrer les diagrammes de decision ;
- ajouter des fins alternatives ;
- preparer un guide d'ecriture pour nouveaux chapitres.

## Recommandations Supplémentaires d'Amélioration UX/UI

Suite à l'analyse du projet et des standards actuels pour les jeux narratifs interactifs, voici des propositions concrètes pour transformer l'interface actuelle (jugée "austère") en une expérience plus immersive et premium :

### 1. Identité Visuelle et Thème (Direction Artistique)
* **Palette de couleurs immersive** : Éloignez-vous des styles par défaut de Bootstrap. Pour "La maison de l'oubli", adoptez un thème sombre par défaut (Dark Mode) avec des teintes profondes (bleu nuit, violet sombre, gris anthracite) contrastées par des accents lumineux (or, parchemin, ou lueur spectrale) pour les éléments interactifs.
* **Glassmorphism** : Utilisez des fonds semi-transparents avec un flou d'arrière-plan (`backdrop-filter: blur()`) pour les panneaux de règles, l'inventaire et les cartes de choix. Cela donne de la profondeur et laisse deviner les images de fond (backgrounds) sans nuire à la lisibilité.
* **Typographie soignée** : Le texte est le cœur de votre jeu. Utilisez une police Serif élégante pour la narration (ex: *Merriweather*, *Playfair Display* ou *Crimson Text*) pour le côté littéraire/RP, et une police Sans-Serif propre (ex: *Inter*, *Outfit* ou *Roboto*) pour l'interface (boutons, inventaire). Augmentez l'interligne (`line-height: 1.6` ou `1.8`) pour un meilleur confort de lecture.

### 2. Layout et Mise en Page
* **Structure de l'écran** : Séparez clairement la "Zone de Jeu" (narration centrale) des "Méta-informations" (personnage, inventaire). Sur desktop, une disposition en 3 colonnes ou avec un panneau latéral (sidebar) escamotable pour le personnage/inventaire permettrait de laisser toute la place au texte narratif au centre.
* **Gestion de l'historique** : Plutôt que de remplacer le texte brutalement lors d'un nouveau chapitre, pourquoi ne pas afficher l'historique récent sous forme de fil de discussion ou de parchemin qui se déroule ? Cela permet au joueur de relire l'action précédente avant de faire son choix.

### 3. Micro-interactions et Animations (Feedbacks)
* **Apparition du texte** : Au lieu d'un affichage instantané, utilisez un fondu enchaîné (fade-in) ou un effet d'apparition progressive pour donner vie à la narration.
* **Feedbacks sur les choix (ChoiceCard)** : Les cartes de choix doivent réagir au survol (hover) avec un léger soulèvement (`transform: translateY(-2px)`), une ombre portée (box-shadow) accentuée ou un effet de lueur (glow). L'utilisation de curseurs personnalisés peut aussi aider.
* **Jets de dés et Résolution** : Actuellement, la résolution est abrupte. Introduire une petite animation (même en CSS) de dés qui roulent ou d'une jauge de tension pendant 1 ou 2 secondes avant d'afficher le résultat créerait de l'anticipation et du drame.

### 4. Interface Utilisateur (UI) Spécifique
* **Iconographie** : Intégrez des icônes contextuelles (via FontAwesome, déjà présent dans le package.json) sur les cartes de choix pour indiquer d'un coup d'œil le type d'action : 🎲 pour un jet de dé, 🗡️ pour un combat, 👁️ pour l'observation, 🏃 pour la fuite.
* **Inventaire Visuel** : Au lieu de simples badges texte, utilisez des petites icônes pour représenter la "Clé" ou d'autres objets, avec une infobulle (tooltip) au survol expliquant à quoi sert l'objet.
* **Indicateurs de succès/échec** : Utilisez des couleurs sémantiques subtiles lors des résolutions d'actions (un halo vert très léger pour une réussite, rouge pour un échec) pour renforcer le sentiment de réussite ou de danger.

**Prochaine étape possible** : Introduire une bibliothèque d'animation légère comme `framer-motion` et refondre les fichiers `index.css` / SCSS pour y intégrer des variables CSS correspondant à cette nouvelle charte graphique premium.

---

## Analyse des Bugs CSS Actuels (Suite à vos retours)

Après une analyse approfondie des fichiers `App.css` et `index.css` actuels, j'ai identifié les causes exactes des problèmes que vous rencontrez sur les contrastes, la structure des mots et les animations :

### 1. Structure des mots complètement cassée
Le problème vient de la classe `.card-title` dans `App.css` (vers la ligne 164) :
```css
.card-title {
  /* ... */
  overflow-wrap: anywhere; 
}
```
La propriété `overflow-wrap: anywhere;` force la coupure des mots n'importe où (même au milieu d'une lettre) pour éviter les débordements, ce qui détruit totalement la lisibilité (ex: "Bonj-our"). 
**Solution :** Remplacer par `overflow-wrap: break-word;` ou `word-break: normal;` pour que les mots ne soient coupés qu'à la fin de la ligne ou si le mot est vraiment trop long (ce qui est rare).

### 2. Animations cassées ou trop lentes
Il y a deux problèmes majeurs d'animations dans `App.css` :
* **Conflit de transitions sur les cartes de choix** : La classe `.cardChoice` déclare une transition de `0.3s` (ligne 32), mais l'écrase quelques lignes plus bas (ligne 38) avec `transition: box-shadow 1s, transform 1s;`. Cela rend le hover et le swipe extrêmement lents (1 seconde entière), donnant une impression de "lag" très désagréable.
* **L'animation du "mouse-move-right" glitchée** :
```css
@keyframes mouse-move-right {
  0% { left: 50px; }
  50% { transform: translateX(150px); }
  100% { left: 50px; }
}
```
Cette animation mélange la modification de la propriété `left` avec celle de `transform: translateX()`. C'est une mauvaise pratique qui crée des sauts visuels (glitch).
**Solution :** Il faut choisir soit l'un soit l'autre (privilégier `transform: translateX` de 0px à 150px pour de meilleures performances) et supprimer les doublons de propriétés `transition`.

### 3. Problème critique de Contrastes (Accessibilité)
Plusieurs éléments posent un grave problème de contraste, rendant le texte illisible :
* **Les choix de Swipe (Vert / Rouge)** : `.card-ok-choice` utilise un fond vert clair (`hsl(120, 40%, 50%)`) et `.card-dis-choice` un rouge (`hsl(350, 40%, 50%)`). Le texte à l'intérieur hérite de la couleur de `.card` qui est un blanc/jaune très clair (`hsl(43, 55%, 92%)`). Le contraste entre blanc et vert/rouge clair est bien inférieur au ratio de 4.5:1 requis. 
**Solution :** Il faut soit foncer drastiquement le fond vert/rouge, soit forcer le texte des boutons de swipe en noir ou gris très foncé (`color: hsl(0, 0%, 10%);`).
* **Les fonds globaux vs Textes** : L'utilisation intensive de fonds semi-transparents (`hsla`) superposés sur le fond noir de `index.css` rend le contrôle du contraste difficile. Certains textes cyan (`.project-mark` en `hsl(176, 100%, 52%)`) sur des fonds gris peuvent "vibrer" visuellement.

### 4. Débordement du texte dans le panneau joueur (PlayerPanel)
Dans le composant `.player-panel`, le texte sort du composant. Cela est dû à un **conflit de classes CSS globales** :
Dans `App.css`, vous avez stylisé la classe Bootstrap `.card-title` pour qu'elle s'affiche en plein centre des grandes cartes de swipe (`display: flex; min-height: 100%; align-items: center; justify-content: center;`). Le problème est que cette classe affecte *tous* les `.card-title` de votre application, y compris le `<h4>Chris</h4>` et `<h5>costo</h5>` de votre `.player-panel` ! 
**Solution :** 
1. Ciblez précisément les titres de vos cartes de choix dans le CSS (ex: `.cardChoice .card-title { ... }`) au lieu de redéfinir la classe globale `.card-title`.
2. Assurez-vous que le `<section>` qui contient les stats du personnage a bien un `display: flex; flex-direction: column;` pour que les éléments s'empilent proprement sans déborder.

### 5. Remplacement des alertes natives (`window.confirm`) par une Modale
L'utilisation de `window.confirm()` ou `window.alert()` bloque le thread JavaScript et affiche une popup système dont le design ne peut pas être modifié (très "disgracieux" pour un jeu narratif immersif).
**Solution :**
* Créer un composant React `<ConfirmModal />` personnalisé (par exemple avec un fond assombri `position: fixed; inset: 0; background: rgba(0,0,0,0.8);` centré au-dessus du jeu).
* Dans `Book.jsx`, au lieu de faire `if (window.confirm(...)) { ... }`, mettez le choix en attente dans un état (`const [pendingChoice, setPendingChoice] = useState(null);`).
* Affichez la modale si `pendingChoice` n'est pas nul. Si le joueur clique sur "Oui" dans la modale, exécutez la transition de chapitre et videz l'état (`setPendingChoice(null)`). Sinon, videz simplement l'état pour annuler.

### 6. Icône cachée derrière le texte (Cartes Personnage)
Dans la carte de sélection de personnage que vous avez partagée, l'icône SVG se retrouve cachée/écrasée par le texte. C'est en réalité la conséquence directe du même bug soulevé au point 4 (le conflit sur `.card-title`) ! 
Si vous regardez la structure HTML de votre carte :
```html
<div class="card-title"> <!-- Hérite de min-height: 100% -->
  <article>
    <section>
      <h4 class="card-title">Nom : Chris</h4> <!-- Hérite AUSSI de min-height: 100% -->
      <h5 class="card-title">Fonction : costo</h5> <!-- Hérite ENCORE de min-height: 100% -->
```
La classe `.card-title` est appliquée à répétition sur de multiples éléments imbriqués. Comme vous avez défini globalement `.card-title { display: flex; min-height: 100%; }` dans `App.css`, chaque titre force le conteneur à prendre 100% de la hauteur de la carte de choix (`330px`), ce qui pousse l'image (`<div class="card-img">`) en dehors de la carte ou provoque un chevauchement !
**Solution :**
* Supprimez la classe `.card-title` des balises `<h4>` et `<h5>` (ou remplacez par des classes génériques pour le texte, comme `.mb-1`, `.fw-bold`, etc.).
* Ciblez `.cardChoice .card-title` dans votre CSS, ou mieux, retirez le `min-height: 100%` qui casse les comportements flexibles verticaux de vos cartes. Laissez simplement la boîte prendre la hauteur dont elle a besoin, l'image trouvera sa place naturellement en dessous.

### 7. Suppression de l'animation de Swipe (La Main) et Encadré Noir sur les Boutons
Vous venez de transformer vos cartes de choix (auparavant prévues pour être "swipées") en de vrais `<button type="button">`. C'est une excellente pratique pour l'accessibilité ! Cependant, cela a révélé deux nouveaux éléments :

**1. L'encadré noir (Bug visuel du bouton)** :
Contrairement à une `<div>`, un élément `<button>` possède des styles par défaut injectés par votre navigateur web (Chrome, Firefox, Safari). S'il n'est pas "réinitialisé" (reset), le navigateur lui ajoute un encadré noir (outline/border), un fond grisâtre ou une surbrillance lors du clic.
* **Solution :** Ajoutez ces propriétés CSS à votre classe `.cardChoice` dans `App.css` pour "nettoyer" le style par défaut du bouton avant d'appliquer le vôtre :
```css
.cardChoice {
  /* ... vos autres styles ... */
  border: 1px solid hsla(43, 55%, 86%, 0.24); /* Assurez-vous que cette bordure écrase la bordure noire par défaut */
  outline: none; /* Enlève le contour noir au clic */
  background-color: transparent; /* Force la suppression du fond par défaut du bouton */
}
```
*(Attention : Ne laissez pas `outline: none;` sans fournir un style au focus pour l'accessibilité au clavier, comme le `.cardChoice:focus-visible` que vous avez déjà avec la bordure jaune !)*

**2. La main qui sort du cadre (Animation de swipe)** :
Comme la mécanique de Swipe "n'est plus d'actualité" et que vous êtes passé sur un système de clic, cette icône de main (`fa-hand-pointer`) qui glisse vers la droite crée de la confusion : le joueur va chercher à swiper un bouton fait pour être cliqué. Elle sort du cadre car la structure Flex/Hauteur a changé.
* **Ma proposition : Supprimez-la purement et simplement.**
* Dans vos composants React (probablement `ChoiceCard.jsx` ou `Characters.jsx`), retirez la balise `<svg ... class="... fa-hand-pointer mouse-move-right">`.
* Dans `App.css`, vous pouvez supprimer toute la classe `.mouse-move-right` et l'animation `@keyframes mouse-move-right`.
* *L'alternative pour guider l'utilisateur :* Le fait qu'un bouton grossisse ou se soulève au survol (le `hover` que vous avez déjà sur `.cardChoice`) est le standard universel sur le web pour indiquer qu'un élément est cliquable. Rien d'autre n'est nécessaire !
