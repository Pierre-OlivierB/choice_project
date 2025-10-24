# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## install

npm install

## run

npm run dev

## next

change buttons by swipes

## histoire

petit jeu d'essai pour découvrir le role play.

## test histoire

Tu es en position assise, il fait noir, tu ne sais pas qui tu es, tu ne sais pas ce que tu fais là. L'amnèsie es total. Plusieurs option s'offrent à toi. Tu peux chercher autour de toi ou fouiller tes poches.
Tu tâtes autour de toi et tu sens un objet coincé entre 2 coussins derrière toi. Visiblement tu es assis sur un canapé. Au touché cet objet ressemble à une manette de télévison. En la prenant en main tu ne sais pas très bien comment et la télévision s'allume. Grâce à la lumière tu vois ce qui t'entoure. A ta droite un bureau à côté d'une fenêtre fermée par un volet. Devant toi la télévision. Derrière la télévision une porte fermée. Grâce à la lumière tu en es sûr il n'y a plus rien à fouiller autour de toi
Tu va doucement vers le bureau en essayant de ne pas faire de bruit, ton stress monte. Tes jambes sont en coton et tu atteinds le bureau avec difficulté et les planches sous tes pieds font à chaque pas un bruit à réveillé le diable.
Tu fouilles rapidement dans le tiroir. A première vue le tiroir semble vide, la recherche lente prends un tournur infini comme si tu devais chercher un objet dedans. Enfin ta main sens un objet petit et froid. En sortant l'objet du tiroir te voilà en possesion d'une clef. Mais à quoi peut bien t elle servir?
Tu vas doucement vers la porte en essayant de ne pas faire de bruit, ton stress monte. Tes jambes sont en coton mais tu atteinds la porte sans difficulté et sans faire de bruit.
Tu ouvres la porte sans faire attention. Par réflexe tu fais un pas en arrière. Devant toi se dévoile un parking. Il semble que tu sors d'une chambre d'hôtel. Un homme se tient contre une voiture, une cigarette à la bouche. Il fume sa cigarette et se tiends contre la seule voiture du parking.
Tu essayes de contourner mais l'inconnu t'attrape par l'épaule
Tu pensais bien faire mais tu finis à terre rouer de coups.

## test prompt

Tu es un écrivain de livre d'horreur. Tu t'adresses à un publique adulte. Le contexte se déroule dans la période actuelle. A partir de l'histoire, écrit moi un texte qui met du lien à cette histoire et rends-la la plus épique possible. histoire {{}}

## DOING

Clean les log

## TODO

Améliorer le texte (histoire)
Ajouter bouton sauvegarder
Mettre le composants "characteres" à la place dans le composant "chapter" et "events".
Ajouter un bouton rejouer

Faire une gestion des erreurs
Gestion Réussite/Echec Critique.
Mettre le résultat du dé en exergue
Inverser les couleurs de l'explication des règles et de l'histoire en cours.
Vérifier les correspondance caractéritiques et actions montré au joueur

## DONE

//Si on arrive à la télé et qu'on écoute autour de nous on ne peut plus fouiller la télé.
//Mettre un background contextuel (look begin caution)
//Améliorer le prompt
//Améliorer les explications
//Ajouter au début de chaque card_contexte dans le json l'action effectuée. Afin d'avoir un texte finale compréhensible.
//revoir le positionnement des cards
//Mettre une image en background
//Après être jusqu'à la porte (15) l'action suivante (9 ou 11) n'est plus enregistrée => proposition par gemini d'un code réparateur, fonctionnel ?
//Il nous faut la page du win PUIS la génération de l'historique.
//Correction des erreurs du texte. STOP Chapitre 10 déjà fait
