import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "../ui/confirm-modal";
import RulesPanel from "./rules-panel";

function RulesButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Afficher les règles"
        className="icon-button"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <FontAwesomeIcon icon={faCircleQuestion} />
      </button>
      <ConfirmModal
        isOpen={isOpen}
        title="Les règles"
        confirmLabel="Fermer"
        onConfirm={() => setIsOpen(false)}
        compact
      >
        <RulesPanel />
      </ConfirmModal>
    </>
  );
}

export default RulesButton;
