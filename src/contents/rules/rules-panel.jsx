// Single source of the rules, shown from the character screen and during play.
function RulesPanel() {
  return (
    <div className="rules-panel">
      <p>Chaque action dépend d'une caractéristique, de 1 à 100.</p>
      <p>
        On lance alors un dé à 100 faces : l'action réussit si le résultat est égal ou
        inférieur à la caractéristique. Plus elle est élevée, plus la réussite est
        probable.
      </p>
      <p>
        Réussir ou échouer ne change pas toujours le but de l'action. Tu peux trouver
        un objet dans les deux cas, mais il te faudra plus ou moins de temps.
      </p>
      <p>
        Dans un vrai jeu de rôle, le maître du jeu peut sortir du script et enrichir
        ton histoire.
      </p>
    </div>
  );
}

export default RulesPanel;
