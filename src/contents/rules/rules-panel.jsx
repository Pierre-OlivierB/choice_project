import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

function RulesPanel() {
  return (
    <article className="p-2">
      <h1>Rappel des règles</h1>
      <section className="rules-color p-2 rounded overflow-x-auto max-h-160">
        <div className="d-flex">
          <FontAwesomeIcon className="me-1" icon={faExclamation} />
          <p>Chaque action disponible correspond à une caractéristique.</p>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon className="me-1" icon={faExclamation} />
          <p>
            L'issue du choix est liée à la probabilité de réussite correspondant
            à cette caractéristique.
          </p>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon className="me-1" icon={faExclamation} />
          <p>
            Plus la caractéristique est grande, plus la réussite est probable.
          </p>
        </div>
      </section>
    </article>
  );
}

export default RulesPanel;
