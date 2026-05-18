import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

function InventoryList({ inventory = [] }) {
  const items = Array.isArray(inventory) ? inventory : [];

  if (items.length === 0) {
    return null;
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
