import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

// RulesPanel is reused in drawers and modals. The title can be hidden when the
// surrounding dialog already provides its own heading.
function RulesPanel({ showTitle = true }) {
  return (
    <article className="p-2">
      {showTitle ? <h1>Rappel des r&egrave;gles</h1> : null}
      <section className="rules-color p-2 rounded overflow-x-auto max-h-160">
        <div className="d-flex">
          <FontAwesomeIcon className="me-1" icon={faExclamation} />
          <p>Chaque action disponible correspond &agrave; une caract&eacute;ristique.</p>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon className="me-1" icon={faExclamation} />
          <p>
            L&apos;issue du choix est li&eacute;e &agrave; la probabilit&eacute; de
            r&eacute;ussite correspondant &agrave; cette caract&eacute;ristique.
          </p>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon className="me-1" icon={faExclamation} />
          <p>
            Plus la caract&eacute;ristique est grande, plus la r&eacute;ussite est
            probable.
          </p>
        </div>
      </section>
    </article>
  );
}

export default RulesPanel;
