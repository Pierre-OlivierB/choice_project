import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

// Inventory is optional and currently very small. Returning null when empty
// avoids reserving visual space for a system the player has not unlocked yet.
function InventoryList({ inventory = [] }) {
  const items = Array.isArray(inventory) ? inventory : [];

  if (items.length === 0) {
    return (
      <section className="inventory-list px-2 pb-2">
        <p className="card-text fw-bold mb-1">Inventaire</p>
        <p className="small m-0" style={{ fontStyle: "italic", opacity: 0.7 }}>Vide</p>
      </section>
    );
  }

  return (
    <section className="inventory-list px-2 pb-2">
      <p className="card-text fw-bold mb-1">Inventaire</p>
      <div className="d-flex flex-wrap gap-1">
        {items.map((item) => (
          <span className="inventory-item" key={item} title={`Objet: ${item}`}>
            <FontAwesomeIcon className="inventory-icon" icon={faKey} />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

export default InventoryList;
