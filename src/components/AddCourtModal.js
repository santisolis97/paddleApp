import React, { useState, useEffect } from "react";
import db from "../firebase.config";
import Navbar from "./Navbar";
function AddCourtModal() {
  const [newCourt, setNewCourt] = useState({
    name: "",
    address: "",
    price: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newCourt);
    db.collection("courts")
      .add({
        name: newCourt.name,
        address: newCourt.address,
        price: newCourt.price,
      })
      .then((result) => {
        console.log("Guardado correctamente");
      });

    // this.setState({ title: "", author: "" });
  };
  const handleInputChange = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    setNewCourt({
      ...newCourt,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="div">
      <Navbar></Navbar>
      <div className="container mt-20">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Dirección
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Precio
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddCourtModal;
