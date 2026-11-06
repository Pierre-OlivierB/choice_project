import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

function InventoryList({ inventory = [] }) {
  return (
    <section className="inventory-list">
      <p className="inventory-title">Inventaire</p>
      {inventory.length ? (
        <div className="inventory-items">
          {inventory.map((item) => (
            <span className="inventory-item" key={item}>
              <FontAwesomeIcon icon={faKey} />
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="inventory-empty">Vide</p>
      )}
    </section>
  );
}

export default InventoryList;
