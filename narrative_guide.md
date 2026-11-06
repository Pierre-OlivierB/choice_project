# Guide Narratif - La maison de l'oubli

## Intention

Ce guide explique comment corriger ou ajouter un chapitre sans casser la structure du jeu. Il complete `architecture.md` et sert de reference pour le sprint 3.

## Regle De Relecture

Les textes peuvent etre ameliores, mais le contenu ne doit pas changer.

Une correction acceptable :

- corrige une faute ;
- clarifie une phrase ;
- rend le rythme plus naturel ;
- conserve les memes actions, objets, dangers et consequences.

Une correction non acceptable :

- ajoute un evenement ;
- retire une information utile au joueur ;
- change une issue de jet ;
- ajoute du lore absent ;
- change une transition.

## Structure D'un Chapitre

Un chapitre est un objet dans `src/contents/chapter/stories.json`.

Champs d'un chapitre :

- `id` : id du chapitre sous forme de chaine.
- `status` : optionnel, `draft` pour un chapitre brouillon.
- `context` : contexte affiche pendant le choix de l'action.
- `question` : question ou relance.
- `intro` : texte d'ouverture du chapitre de depart.
- `background` : optionnel, decor active au moment du jet (`tv`, `car`).
- `grantsItem` : optionnel, objet obtenu une fois le resultat lu.
- `actions` : actions possibles, voir plus bas.
- `results` : texte de chaque issue (`c_w`, `c_l`, `d_w`, `d_l`, `i_w`, `i_l`).
- `resultEnding` : optionnel, texte commun ajoute a toutes les issues.
- `choices` : suites possibles, voir plus bas.

Une ligne vide (`\n\n`) dans un texte cree un nouveau paragraphe.

## Transitions

Chaque choix porte son libelle, sa cible et ses conditions :

```json
{
  "choices": [
    { "label": "Fouiller le bureau", "target": "10" },
    { "label": "Utiliser la clef", "target": "19", "type": "item", "requiresItem": "clef", "consumesItem": "clef" },
    { "label": "Affronter l'inconnu", "target": "27", "on": "failure" }
  ]
}
```

Un choix est masque des que sa cible a ete visitee. Champs optionnels :

- `on` : `success` ou `failure`, selon le dernier jet.
- `onAction` : `c`, `d` ou `i`, selon la caracteristique du dernier jet.
- `requiresItem` : objet necessaire.
- `requiresVisited` : chapitre deja visite necessaire.
- `repeatable` : le choix reste propose et n'entre pas dans l'historique.
- `consumesItem` : objet retire en faisant ce choix.
- `alsoVisits` : chapitres consideres comme visites avec celui-ci.
- `type` : aspect de la carte (`item`, `special`).
- `sketch` : dessin de la carte, a choisir dans `src/contents/events/sketches.js`.

Un libelle est le nom d'une carte : 24 caracteres maximum, verifies par un test.

## Diagrammes De Decision

Les fichiers Draw.io sont disponibles dans `arbre_de_decision/`.

- `arbre_de_decision/arbre_de_décision.drawio`
- `arbre_de_decision/Diagramme sans nom.drawio`

Ils peuvent aider a comprendre les branches, mais ils ne remplacent pas `stories.json`. Avant de valider une modification narrative ou une reconnexion de chapitre, il faut verifier :

- que le diagramme et le JSON racontent le meme chemin ;
- que chaque cible de choix existe ;
- que les conditions des choix sont toujours justes ;
- que `npm run validate:story` passe.

Statut sprint 3 :

- les diagrammes sont references ;
- aucune reconnexion de chapitre n'est faite sans decision narrative ;
- `stories.json` reste la source de verite.

## Actions Et Resultats

Chaque action associe un libelle joueur a une caracteristique.

```json
{
  "actions": [{ "label": "Fouiller vite", "stat": "dexterite", "sketch": "drawer" }]
}
```

La caracteristique est affichee sur la carte : ne pas la repeter dans le libelle.

Chaque action et chaque choix jouables ont un champ `sketch` : le dessin doit montrer ce que fait le joueur a ce moment-la. Un test verifie qu'il existe et que deux actions d'un meme chapitre n'ont jamais le meme dessin : une action posee a des traits fins et peu de mouvement, une action rapide des traits de vitesse et des objets en mouvement.

Les caracteristiques reconnues sont :

- `constitution`
- `dexterite`
- `intelligence`
- `fin`

Les resultats sont lus avec les cles suivantes :

- `c_w` : constitution reussie ;
- `c_l` : constitution echouee ;
- `d_w` : dexterite reussie ;
- `d_l` : dexterite echouee ;
- `i_w` : intelligence reussie ;
- `i_l` : intelligence echouee.

## Objets Et Preconditions

La clef est l'objet principal actuel.

- Elle est obtenue a la fin du chapitre `10`, une fois le resultat lu (`grantsItem`).
- Elle est utilisable autour de la porte, chapitres `15` et `16` (`requiresItem`).
- Elle est consommee en choisissant de l'utiliser (`consumesItem`).

Pour un futur objet, utiliser ces memes champs dans `stories.json` plutot qu'une condition dans le code.

## Chapitres Non References

Le validateur signale actuellement :

- `4`
- `5`
- `7`
- `8`
- `12`
- `18`

Statut recommande pour le sprint 3 :

- les relire ;
- determiner s'ils sont brouillons, tests ou branches a reconnecter plus tard ;
- ne pas les reconnecter sans decision narrative ;
- ajouter `status: "draft"` si ce sont des brouillons.

Decision actuelle :

- les chapitres `4`, `5`, `7`, `8`, `12` et `18` sont conserves comme brouillons ;
- ils ne doivent pas etre consideres comme du contenu final ;
- ils pourront etre supprimes, reecrits ou reconnectes dans un sprint dedie.

## Checklist Avant Validation

Avant de terminer une passe narrative :

- les transitions n'ont pas change ;
- les resultats d'action n'ont pas change ;
- les objets apparaissent aux memes moments ;
- aucun placeholder involontaire ne reste dans le parcours principal ;
- les accents sont lisibles ;
- le ton reste en tutoiement ;
- aucun accord ne suppose le genre du personnage ;
- `npm run validate:story` passe.

## Commandes

```bash
npm run validate:story
npm run test
npm run lint
npm run build
```
