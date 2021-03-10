import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./Court.css";
import db from "../firebase.config";
import firebase from "firebase";
import Navbar from "./Navbar";
function Court() {
  let { id } = useParams();
  let newDate = new Date();
  const [currentHour, setCurrentHour] = useState(newDate.getHours());
  id = id.toString();
  const [thisCourt, setThisCourt] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingHours, setIsLoadingHours] = useState(true);
  const [hours, setHours] = useState({});
  const [selectedHour, setSelectedHour] = useState(0);

  const fetchHours = async () => {
    db.collection("hours")
      .orderBy("hour")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHours(data);
        console.log(data);
        setIsLoadingHours(false);
      });
  };

  const cargarHorasDefault = () => {
    var courtRef = db.collection("courts").doc(id);

    var setWithMerge = courtRef.set(
      {
        hoursreserved: [16, 17, 18],
      },
      { merge: true }
    );
    return setWithMerge;
  };

  const cargarHoras = (e) => {
    e.preventDefault();
    var courtRef = db.collection("courts").doc(id);
    console.log(e.target.value);
    var setWithMerge = courtRef.set(
      {
        hoursreserved: firebase.firestore.FieldValue.arrayUnion(
          parseInt(selectedHour)
        ),
      },
      { merge: true }
    );
    return setWithMerge;
  };

  const handleInputChange = (e) => {
    setSelectedHour(e.target.value);
  };

  const fetchCourt = async () => {
    var docRef = db.collection("courts").doc(id);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setThisCourt(doc.data());
          setIsLoading(false);
          console.log(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };
  useEffect(() => {
    fetchCourt();
    fetchHours();
    setCurrentHour(newDate.getHours());
    console.log(thisCourt.hoursreserved);
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <h1>{thisCourt.name}</h1>
      {isLoading && (
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {!isLoading && (
        <img className="courtPicture" src={thisCourt.photo} alt="Foto Cancha" />
      )}
      <div className="container ">
        <p>Direccion: {thisCourt.address}</p>
        <div className="row d-flex justify-content-center">
          <h3 className="horariosdisponibles">Horarios Disponibles</h3>
        </div>
        <div className="row d-flex justify-content-center">
          <form onSubmit={cargarHoras}>
            <label htmlFor="hours">Seleccionar horario:</label>
            <select
              value={selectedHour}
              name="hours"
              id="hours"
              onChange={handleInputChange}
            >
              {!isLoadingHours &&
                hours.map(function (item, i) {
                  return (
                    <option
                      key={item.id}
                      value={item.hour}
                      disabled={
                        currentHour > item.hour ||
                        thisCourt.hoursreserved.includes(item.hour)
                          ? true
                          : false
                      }
                    >
                      {item.hour}
                    </option>
                  );
                })}
            </select>
            <br />
            <button type="submit" className="btn btn-primary">
              Solicitar
            </button>
          </form>
        </div>
        <br />
        <button
          onClick={cargarHorasDefault}
          type="submit"
          className="btn btn-primary"
        >
          Add array hours
        </button>
      </div>
    </div>
  );
}

export default Court;
