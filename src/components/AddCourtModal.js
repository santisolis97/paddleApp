import React, { useState } from "react";
import db from "../firebase.config";
import Navbar from "./Navbar";
import { storage } from "../firebase.config";
import "./AddCourtModal.css";
function AddCourtModal() {
  const [newCourt, setNewCourt] = useState({
    name: "",
    address: "",
    price: "",
    photo: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const handleInputChange = (event) => {
    if (
      event.target.name === "name" ||
      event.target.name === "address" ||
      event.target.name === "price"
    ) {
      setNewCourt({
        ...newCourt,
        [event.target.name]: event.target.value,
      });
    } else {
      setNewCourt({ ...newCourt, photo: event.target.files[0] });
    }
  };

  const handleStorage = (event) => {
    event.preventDefault();
    storage
      .ref(`images/${newCourt.photo.name}`)
      .put(newCourt.photo)
      .then(function (snapshot) {
        handleFirestore();
      });
  };

  const handleFirestore = () => {
    storage
      .ref("images")
      .child(newCourt.photo.name)
      .getDownloadURL()
      .then((url) => {
        db.collection("courts")
          .add({
            name: newCourt.name,
            address: newCourt.address,
            price: newCourt.price,
            photo: url,
          })
          .then((result) => {
            console.log("Guardado correctamente");
            setIsLoaded(true);
            setTimeout(() => {
              setIsLoaded(false);
              setNewCourt({
                name: "",
                address: "",
                price: "",
                photo: "",
              });
            }, 5000);
          });
      });
  };

  return (
    <div className="div">
      <Navbar></Navbar>
      <div className="container mt-20">
        <form onSubmit={handleStorage}>
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
              value={newCourt.name}
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
              value={newCourt.address}
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
              value={newCourt.price}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Foto:
            </label>
            <input
              type="file"
              className="form-control"
              id="photo"
              name="photo"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </form>
        {isLoaded && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            Se ha cargado correctamente la cancha
          </div>
        )}
      </div>
    </div>
  );
}
export default AddCourtModal;
