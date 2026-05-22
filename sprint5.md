# Sprint 5 - Refonte Architecturale : Scalabilité et Standards React

## 🎯 Objectif du Sprint
L'objectif de ce sprint n'est pas d'ajouter de nouvelles fonctionnalités de jeu, mais de réorganiser le code (Refactoring Structurel). L'architecture actuelle contient d'excellents fondamentaux (séparation de la logique métier), mais la partie visuelle (le dossier `src/contents`) souffre de conventions de nommage maison qui vont rendre le projet difficile à maintenir à mesure qu'il grandit.
Ce sprint vise à adopter une **Architecture Feature-Driven** moderne et standardisée pour préparer sereinement les évolutions futures.

## 🏗️ Analyse de l'Architecture Actuelle vs Cible

### 1. Les Points Forts Conservés (Clean Architecture)
L'intelligence du jeu est parfaitement isolée.
*   **`src/game/`** : Contient la logique pure (reducers, sauvegarde, jets de dés, règles). Il reste inchangé et ne doit jamais importer React. Ses tests (`.test.js`) restent à côté de chaque fichier.
*   **`src/hooks/`** : Contient l'orchestration React (`useGameState.js`). C'est un standard, il reste tel quel.

### 2. Le Problème Actuel : Le dossier `src/contents/`
Ce dossier mélange les **Écrans** (Pages complètes gérant le flux) et les **Composants** (petites briques d'interface). Le nom "contents" n'est pas un standard de l'industrie (on s'attend plutôt à trouver `screens`, `pages`, `components` ou `features`).

---

## 🗺️ Plan de Migration (Structure Cible)

Voici la structure de dossiers standard à mettre en place. Lors de ce sprint, vous allez déplacer et renommer vos fichiers pour correspondre à cette arborescence.

```text
src/
 ├── assets/         # 🖼️ Images, polices, SVG (existant, inchangé)
 │
 ├── game/           # 🧠 Core Logic : Ne contient que du pur JS (existant, inchangé)
 │
 ├── hooks/          # 🎣 Hooks React réutilisables (existant, inchangé)
 │
 ├── utils/          # 🛠️ NOUVEAU : Fonctions utilitaires génériques (formatage, maths...)
 │
 ├── components/     # 🧱 NOUVEAU : Briques UI Réutilisables ("Dumb components")
 │   ├── ui/         # Éléments très génériques (ex: Button.jsx, Modal.jsx, Tooltip.jsx)
 │   └── layout/     # Conteneurs de mise en page (ex: GameShell.jsx)
 │
 ├── features/       # 🧩 NOUVEAU : Briques UI Métier (Fortement couplées au jeu)
 │   ├── story/      # Tout ce qui touche au récit (Chapter, Events, ChoiceCard)
 │   ├── player/     # Tout ce qui touche au personnage (CharacterStats, InventoryList, GameJournal)
 │   └── system/     # Interfaces système (RulesDrawer, ConfirmModal, GameError)
 │
 ├── screens/        # 📱 NOUVEAU : (ou "pages/") Les Écrans globaux d'orchestration
 │   ├── HomeScreen.jsx  (Anciennement contents/home.jsx)
 │   ├── GameScreen.jsx  (Anciennement contents/book.jsx - orchestrateur de la partie)
 │   └── EndScreen.jsx   (Le futur écran de fin de partie avec le carrousel)
 │
 ├── styles/         # 🎨 NOUVEAU : Regroupement de tous les CSS/SCSS globaux
 │   ├── scss/           (Anciennement scss/ à la racine)
 │   ├── App.css         (À déplacer ici)
 │   └── index.css       (À déplacer ici)
 │
 ├── App.jsx         # Point d'entrée de routage et Layout racine (très léger)
 └── main.jsx        # Point d'entrée Vite
```

---

## 🛠️ Étapes de Réalisation (Definition of Done)

### Étape 1 : Création de la coquille vide
1. Créer les nouveaux répertoires à la racine de `src/` : `screens/`, `components/` (avec ses sous-dossiers `ui/` et `layout/`), `features/` (avec ses sous-dossiers `story/`, `player/`, `system/`), `styles/` et `utils/`.

### Étape 2 : Migration des Écrans (Screens)
1. Déplacer `src/contents/home.jsx` vers `src/screens/HomeScreen.jsx`.
2. Déplacer `src/contents/book.jsx` vers `src/screens/GameScreen.jsx` (ou le renommer si souhaité).
3. Modifier le fichier `App.jsx` pour qu'il importe ses écrans depuis le nouveau dossier `screens/`.

### Étape 3 : Migration des "Features" (Le métier)
1. Déplacer l'intégralité du contenu de `src/contents/chapter/` et `src/contents/events/` vers `src/features/story/`.
2. Déplacer l'intégralité du contenu de `src/contents/characters/` et `src/contents/player/` vers `src/features/player/`.
3. Déplacer les composants relatifs aux règles (`rules/`) et aux erreurs (`errors/`) vers `src/features/system/`.
4. *Important* : Cette étape va nécessiter de vérifier et de corriger un grand nombre d'imports relatifs dans chaque fichier.

### Étape 4 : Migration des Composants Globaux (Layout & UI)
1. Déplacer les composants de mise en page, comme `GameShell.jsx`, vers `src/components/layout/`.
2. Déplacer vos composants purement visuels ou génériques de `src/contents/ui/` vers `src/components/ui/`.

### Étape 5 : Regroupement des Styles
1. Déplacer `App.css` et `index.css` dans le dossier `src/styles/`.
2. Déplacer le dossier `scss/` existant dans `src/styles/scss/`.
3. Mettre à jour les imports CSS dans `main.jsx` (`import './styles/index.css'`) et dans les autres fichiers nécessaires.

### Étape 6 : Nettoyage final de l'ancienne structure
1. Vérifier que le dossier `src/contents/` est désormais complètement vide.
2. Supprimer définitivement le dossier `src/contents/`.
3. Lancer la compilation pour s'assurer que tout fonctionne.

---

## ⚠️ Risques et Points de Vigilance

1. **L'enfer des Imports (Import Hell)** : Le déplacement massif de fichiers va briser de nombreux chemins d'accès (ex: `import '../../../game/...'`).
    *   *Parade* : Utilisez la fonctionnalité de refactoring automatique de votre éditeur (VSCode par exemple : déplacez les fichiers via l'arborescence graphique de l'éditeur, et acceptez lorsqu'il vous propose de mettre à jour les imports automatiquement).
2. **Lancement Test** : Assurez-vous d'avoir un terminal qui fait tourner `npm run dev` en continu. Il vous alertera instantanément en rouge à chaque import manquant.
3. **Double Démarche** : **Ne commencez aucune nouvelle fonctionnalité** (comme le Carrousel UI/UX du Sprint 4) tant que ce sprint structurel n'est pas totalement achevé. L'application doit pouvoir se lancer et être jouée comme avant sans aucune régression.

## ✅ Vérification technique de fin de Sprint
*   `npm run lint` : passe (aucune erreur d'import signalée par ESLint).
*   `npm run test` : passe (les tests du dossier `src/game/` trouvent bien leurs cibles).
*   `npm run build` : passe avec succès.
*   Un parcours complet de test manuel (Accueil -> Jeu -> Fin) a été effectué avec succès.
