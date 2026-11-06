# Sprint 6 - Finition Premium : Texte, Code et Design

## État d'avancement

Statut global : **Réalisé et déployé**.

L'objectif du sprint est de rendre le jeu le plus premium possible : un texte relu, un code remis en ordre, et une interface à la hauteur de l'ambiance. Le travail est poussé sur GitHub dans `choice_project`, et la compilation dans `choice_project_prod`.

| Item | Statut | Notes |
| --- | --- | --- |
| 1. Corriger la modale « Rejouer » | Validé | Le texte affichait `début` en prod. |
| 2. Empêcher de relancer un jet avec F5 | Validé | Le cycle du dé est sauvegardé, même avant le lancer. |
| 3. Corriger l'arrivée de la clef | Validé | La clef entre dans l'inventaire après le jet et la lecture du résultat. |
| 4. Réécrire le texte | Validé | 23 chapitres jouables, accueil, personnages, règles et journal. |
| 5. Déclarer les règles dans le scénario | Validé | Nouveau format de `stories.json`. |
| 6. Réorganiser le code React | Validé | Navigation, contexte, `GameLayout`, reducer. |
| 7. Retirer Bootstrap et découper le CSS | Validé | `src/styles/`, variables de thème dans `tokens.css`. |
| 8. Créer le dé 3D | Validé | Icosaèdre dessiné sur canvas, sans bibliothèque. |
| 9. Créer les cartes premium | Validé | Style tarot, sur ordinateur et mobile. Corrigé après retours. |
| 10. Refaire les écrans | Validé | Accueil, personnages, jeu, fin. |
| 11. Alléger le site | Validé | Environ 5 Mo à 941 Ko. |
| 12. Mettre à jour la documentation | Validé | `architecture.md`, `narrative_guide.md`, `scenario_audit.md`, `README.md`. |
| 13. Tester la copie du prompt | À faire | Voir « Points à vérifier ». |
| 14. Intégrer les retours | Validé | Voir « Retours ». |
| 15. Commiter et déployer | Validé | Sources et compilation poussées. |

## Contraintes

- Pas de compteur de bruit de pas : ajout explicitement interdit.
- Les transitions, les règles de jet et les objets du scénario ne changent pas.
- Le sprint ne déplace pas les dossiers : la migration de `sprint5.md` reste à faire.

## 1. Texte

Fichier principal : `src/contents/chapter/stories.json`.

### Corrections

- Fautes : « au toucher », « tu sens », « posée », « intérieures », « peut-être », « à bout de forces ».
- Graphie unique : `tu essaies`.
- Accents rétablis dans le journal et les libellés d'accessibilité.

### Incohérences levées

| Chapitre | Problème | Correction |
| --- | --- | --- |
| #3 | « Tu sens ton corps trembler, tu ne sens plus rien » | « Le tremblement te gagne, puis plus rien : tes jambes ont disparu. » |
| #6 | Le texte parlait d'écouter alors que le joueur fouille ses poches | Contexte réécrit autour des poches |
| #15 | Question du maître du jeu absente | « Que fais-tu ? » ajouté |
| #21 | Le personnage était déjà dans la voiture avant de choisir d'y entrer | Le résultat s'arrête à « La voiture est à portée de main. » |
| #23 | Le personnage était déjà parti avant de choisir de démarrer | Le résultat s'arrête au contact mis |

### Style

- Répétitions : « Te voilà » passe de 14 à 1, « Ton stress monte » de 10 à 0, « jambes en coton » de 12 à 0.
- Les longs textes sont découpés en paragraphes.
- La description commune à plusieurs issues est dans `resultEnding`.
- Tutoiement partout, y compris sur l'accueil.
- Boutons à l'infinitif, sans le code `(d)`, `(i)` ou `(c)` : la caractéristique s'affiche sur la carte.
- Accords neutres pour Chris, Jamie et Sacha (« persuadé », « drogué », « arrêté », « roué » retirés).

### Changements de contenu à valider

- **#19 :** ajout de « Il regarde ailleurs. », pour que « Essayer de ne pas te faire remarquer » reste logique.
- **#24, #26 et #28 :** « Veux-tu générer ton histoire ? » devient « Il est temps de reconstituer ton histoire. ».
- **Fin :** les textes jamais affichés ont été retirés (« Que penser ? », « Pourquoi ? »).
- **Personnages :** le type `costo` devient `Costaud`, les autres prennent une majuscule.
- **Accueil et personnages :** le texte d'initiation d'origine est conservé. L'essentiel reste visible et le détail se trouve dans un volet à ouvrir.
- **Texte d'origine :** seules adaptations, le passage au tutoiement sur l'accueil et les phrases sur Chris tournées sans « il ».

## 2. Bug de la clef et code

### Clef

- `grantsItem` sur le chapitre 10 : l'objet est donné par `RESOLVE_ACTION_RESULT`.
- `requiresItem` et `consumesItem` sur le choix « Utiliser la clef ».
- L'inventaire n'est plus déduit des chapitres visités.

### Réorganisation

| Point | Changement |
| --- | --- |
| Dépendances | `bootstrap`, `saas`, `@fortawesome/fontawesome-free` et `sass-embedded` retirés ; polices `@fontsource` ajoutées |
| Navigation | `App` enchaîne les écrans ; `Home` et `Characters` ne s'imbriquent plus |
| Mise en page | `GameLayout` partagé par `Chapter` et `Events` |
| Données de partie | `GameContext` et `useGame` remplacent les props répétées |
| Scénario | `choices: [{ label, target, on, requiresItem, ... }]`, `actions: [{ label, stat }]`, `results` ; stats en nombres |
| Cycle du dé | `SELECT_ACTION`, `ROLL_DICE`, `RESOLVE_ACTION_RESULT` dans le reducer |
| CSS | `tokens`, `base`, `layout`, `panels`, `cards`, `dice`, `screens` |
| Ménage | `useScrollToTop`, `useClipboard`, `CharacterIcon`, `getPlayerName` unique ; `onSwipeRight` et `save.current` retirés |
| Robustesse | `StrictMode`, `ErrorBoundary`, erreurs de copie gérées, touche Échap sur les fenêtres |
| Validateur | Vérifie aussi la présence des textes de résultat |

Fichiers retirés : `src/App.css`, `src/index.css`, `src/scss/`, `src/contents/rules/rules-drawer.jsx`, `public/vite.svg`, `public/mobile-check.html`.

## 3. Design

- **Dé :** vrai solide à 20 faces en 3D. Il tourne au repos, roule 1,5 s, puis finit doré sur une réussite et rouge sur un échec. Le résultat est décidé avant l'animation.
- **Jauge :** elle montre la zone de réussite et où tombe le jet.
- **Cartes :** noires, avec contour doré et lueur bleue discrète dans l'illustration. Cartes à jouer de style TCG, avec fenêtre d'illustration, plaque de nom et encart de description. Une gemme affiche la valeur de la caractéristique sur les actions. Léger soulèvement au survol.
- **Mobile :** lecture et choix séparés en deux étapes, dé centré, signature retirée pendant la partie.
- **Dessins :** 42 illustrations gravées, chacune déclarée dans le scénario avec le champ `sketch`.
- **Mobile :** cartes en grille, sans défilement horizontal.
- **Personnages :** emblème et jauges de stats.
- **Décors :** vignettage sombre et fondu lent entre les scènes ; lueur sombre pour la chambre.
- **Fin :** prompt visible directement, bouton « Copier mon histoire ». Le carrousel est retiré.
- **Typographie :** Cormorant Garamond et Spectral, auto-hébergées.
- **Divers :** favicon, `prefers-reduced-motion`.

| Poids | Avant | Après |
|---|---|---|
| CSS | 255 Ko | 23 Ko |
| JS | 374 Ko | 274 Ko |
| Fonds d'écran | 4,4 Mo | 287 Ko |
| Site complet | environ 5 Mo | 941 Ko |

## Vérifications

- `npm run test` : 46 tests sur 46, dont `src/game/scenario.test.js`, qui parcourt tous les états atteignables (aucune impasse, 3 fins).
- `npm run validate:story`, `npm run lint` et `npm run build` : sans erreur.
- `npm audit --omit=dev` : aucune vulnérabilité.
- Navigateur : une partie automatique complète sans erreur console, parcours de la clef, rechargement après un jet, fenêtres Journal et Règles. Écrans contrôlés en 1280 px et 375 px.

## Points à vérifier

- **Copie du prompt :** en test, le bouton a répondu « Copie impossible », car la page n'avait pas le focus. Le message d'erreur fonctionne, mais la copie réussie reste à confirmer à la main.
- **Tablette :** le rendu n'a pas été contrôlé.
- **Partie complète :** une seule partie automatique a été jouée dans le navigateur ; les autres chemins sont couverts par les tests de logique, pas à l'écran.
- **Hébergement :** l'adresse du site n'est pas connue, donc les chemins absolus `/assets/` restent à confirmer.

## Dette restante

- Le titre parle d'une maison alors que le récit se passe dans un hôtel.
- Les chapitres `draft` (4, 5, 7, 8, 12, 18) attendent une décision.
- Les anciens PNG de `src/assets` ne sont plus utilisés.
- `master_plan.md` garde des sections anciennes à relire, et deux « Sprint 5 » différents y coexistent avec `sprint5.md`.
- Aucun test de composants React.
- Le déploiement reste manuel.

## Retours

Section à compléter avec les retours sur ce sprint.

| Retour | Décision | Statut |
| --- | --- | --- |
| L'aura autour de la souris risque de ralentir le navigateur et n'est pas jolie. | Lumière et inclinaison retirées : plus aucun suivi de la souris. Flous d'arrière-plan et ombres animées retirés aussi. | Fait |
| Le texte des boutons est illisible. | Dégradé des boutons éclairci (plus de 9:1 partout), police de lecture Spectral en 600, boutons secondaires sur fond plein. Tailles relevées sur les cartes, le dé et les petits libellés. | Fait |
| Le texte du début a été supprimé alors que le projet est une initiation au jeu de rôle. | Texte d'origine récupéré dans git. Le début reste visible, le reste passe dans deux volets à ouvrir : « Qu'est-ce qu'un jeu de rôle ? » et « Comment fonctionne un personnage ? ». | Fait |
| Sur mobile, les cartes n'en sont plus, les textes sont trop longs et l'espace est mal réparti. L'idée de départ : des cartes à jouer style TCG, avec une partie dessin et une partie description. | Carte TCG sur tous les écrans, lire et choisir séparés sur mobile, libellés limités à 24 caractères par un test, dé au centre. | Fait |
| Répartition des couleurs : garder le noir et or, or dominant et bleu en accent, sans effet trop violent. | Validé : cartes noires, contour doré de 3 px, lueur bleue discrète dans les illustrations. Palettes bleu nuit dominant, or dominant et cartes dorées écartées. | Fait |
| Avoir une fiche design professionnelle avec les couleurs et l'écriture. | Fiche créée : `fiche_design.html`, fichier unique construit depuis les vrais styles et dessins. | Fait |
| Le dessin « Fouiller vite » des poches est cryptique. | Poche lisible, portable qui en jaillit et traits de vitesse. | Fait |
| Les dessins des actions normales et rapides devraient être différents. | 7 chapitres corrigés avec 12 nouveaux dessins selon un code commun : geste posé ou mouvement rapide. Un test interdit deux dessins identiques dans un même chapitre. | Fait |
| Le bouton Rejouer doit se différencier de Journal grâce à un logo sur chaque bouton. | Flèche circulaire sur Rejouer, livre ouvert sur Journal, y compris pendant la partie. | Fait |
| L'ouverture de l'espace d'explication est trop violente. | Dépliage progressif de 0,55 s avec fondu du texte. La page accompagne le volet pendant son ouverture, en un seul mouvement. | Fait |
| Les dessins des cards sont à revoir et doivent correspondre à l'action. | Dessins refaits. Le choix par mot-clé est remplacé par un champ `sketch` pour chaque action et chaque choix ; un test impose qu'il existe. | Fait |
