import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a href="/" className="navbar-brand">
            PaddleApp
          </a>
          <Link to="/AddCourt" className="btn btn-primary">
            Agregar cancha
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
