import React from "react";

function Characters() {
  return (
    <div className="test">
      <div className="main-content container-fluid d-flex justify-content-center">
        <div className="main-content row d-flex justify-content-evenly">
          <div className="col col-4 d-flex justify-content-md-center align-items-center">
            <div className="card card-charac ">
              <div className="card-body">
                <h5 className="card-title">title card</h5>
                <p className="card-text">exmple de contenu d'une card</p>
                <button className="btn btn-primary">choix</button>
              </div>
            </div>
          </div>
          <div className="col col-4 d-flex justify-content-md-center align-items-center">
            <div className="card card-charac ">
              <div className="card-body">
                <h5 className="card-title">title card</h5>
                <p className="card-text">exmple de contenu d'une card</p>
                <button className="btn btn-primary">choix</button>
              </div>
            </div>
          </div>
          <div className="col col-4 d-flex justify-content-md-center align-items-center">
            <div className="card card-charac ">
              <div className="card-body">
                <h5 className="card-title">title card</h5>
                <p className="card-text">exmple de contenu d'une card</p>
                <button className="btn btn-primary">choix</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Characters;
