import React, { useState, useEffect } from "react";
import db from "../firebase.config";
import Navbar from "./Navbar";
import { storage } from "../firebase.config";

function AddCourtModal() {
  const [newCourt, setNewCourt] = useState({
    name: "",
    address: "",
    price: "",
  });
  const [downloadUrl, setDownloadUrl] = useState(null);

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
    console.log(newCourt);
  };

  const handleStorage = (event) => {
    event.preventDefault();
    storage
      .ref(`images/${newCourt.photo.name}`)
      .put(newCourt.photo)
      .then(function (snapshot) {
        handleFirestore();
      });
    console.log(newCourt);
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
          });
      });
  };

  // const saveUrl = (photoName) => {
  //   storage
  //     .ref("images")
  //     .child(photoName)
  //     .getDownloadURL()
  //     .then((url) => {
  //       console.log(photoName);
  //       console.log(url);
  //       return url;
  //     });
  // };

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
      </div>
    </div>
  );
}
export default AddCourtModal;
