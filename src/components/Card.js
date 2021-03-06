import React from "react";
import { Link } from "react-router-dom";
function Card(props) {
  var id = props.id;
  return (
    <div>
      <div className="card " styles="width: 18rem;">
        <img src={props.photo} alt="Not working" />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">
            Dirección: <b>{props.address}</b>{" "}
          </p>
          <p className="card-text">
            Precio: <b>${props.price}/hr.</b>
          </p>
          <Link to={`/court/${id}`} className="btn btn-primary">
            Ver turnos disponibles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
