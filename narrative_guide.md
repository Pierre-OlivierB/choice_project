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

Champs courants :

- `numero_chapitre` : id du chapitre sous forme de chaine.
- `status` : optionnel, par exemple `draft` pour un chapitre brouillon.
- `card_context` : contexte affiche au joueur.
- `mj_question` : question ou relance.
- `txt` : texte initial ou texte de fallback.
- `choix` : ids des chapitres cibles.
- `btn_choix` : textes des choix classiques.
- `actions.btn` : libelles des actions.
- `actions.carac` : caracteristiques associees aux actions.
- `c_w`, `c_l`, `d_w`, `d_l`, `i_w`, `i_l` : resultats narratifs.

## Transitions

Les tableaux de transition doivent rester alignes.

```json
{
  "choix": ["1", "2"],
  "btn_choix": ["Regarder autour de toi", "Fouiller tes poches"]
}
```

Ici, le bouton `Regarder autour de toi` mene au chapitre `1`, et `Fouiller tes poches` mene au chapitre `2`.

## Diagrammes De Decision

Les fichiers Draw.io sont disponibles dans `arbre_de_decision/`.

- `arbre_de_decision/arbre_de_décision.drawio`
- `arbre_de_decision/Diagramme sans nom.drawio`

Ils peuvent aider a comprendre les branches, mais ils ne remplacent pas `stories.json`. Avant de valider une modification narrative ou une reconnexion de chapitre, il faut verifier :

- que le diagramme et le JSON racontent le meme chemin ;
- que chaque cible de choix existe ;
- que les boutons et les ids restent alignes ;
- que `npm run validate:story` passe.

Statut sprint 3 :

- les diagrammes sont references ;
- aucune reconnexion de chapitre n'est faite sans decision narrative ;
- `stories.json` reste la source de verite.

## Actions Et Resultats

Chaque action associe un libelle joueur a une caracteristique.

```json
{
  "actions": {
    "btn": ["Fouiller rapidement (d)."],
    "carac": ["dexterite"]
  }
}
```

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

- Elle est obtenue apres le chapitre `10`.
- Elle est utilisable autour de la porte, chapitres `15` et `16`.
- Elle est consommee apres le chapitre `19`.

Ces ids sont centralises dans `src/game/storyConstants.js`.

Pour un futur objet, eviter d'ajouter directement des conditions dans les composants React. Preferer une fonction nommee dans `src/game/inventory.js` ou une future table de preconditions.

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
- `npm run validate:story` passe.

## Commandes

```bash
npm run validate:story
npm run test
npm run lint
npm run build
```
