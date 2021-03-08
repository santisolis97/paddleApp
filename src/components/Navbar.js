import React from "react";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a href="/" className="navbar-brand">
            PaddleApp
          </a>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-dark " disabled="true">
              Buscar
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
