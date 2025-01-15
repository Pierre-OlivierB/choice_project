import { useState } from "react";
import "./App.css";
import Book from "./pages/book";

function App() {
  const [page, setPage] = useState(true);

  function handleClick() {
    setPage(false);
  }

  return (
    <>
      {" "}
      {page ? (
        <div className="test">
          <div className="main-content container-fluid d-flex flex-column justify-content-evenly">
            <div className="row justify-content-md-center">
              <div className="col col-6">
                <h1 className="text-center">
                  Bienvenue dans la maison de l'oubli
                </h1>
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col col-2 d-flex justify-content-center">
                <button className="btn btn-primary" onClick={handleClick}>
                  Entrez dans l'aventure
                </button>
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col col-10">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut
                  nobis recusandae id voluptas vel aperiam exercitationem
                  tempore veritatis beatae aut alias similique ad, voluptatum
                  illo dolore blanditiis nostrum est sunt? Nam magnam assumenda
                  laboriosam libero ex minima dicta ut ducimus laborum. Neque
                  nihil animi debitis quibusdam cupiditate necessitatibus.
                  Expedita recusandae laborum eius voluptatibus reiciendis
                  inventore? Distinctio incidunt rem voluptate aliquid. Officiis
                  pariatur at molestiae. Laborum eaque temporibus reprehenderit
                  eius similique earum alias maxime architecto consequatur
                  nobis? Minus totam optio similique neque? Eum omnis sed autem
                  perferendis, ducimus aut nemo amet.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Book />
      )}
    </>
  );
}

export default App;
