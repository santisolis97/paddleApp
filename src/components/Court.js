import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./Court.css";
import db from "../firebase.config";
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

  const fetchHours = async () => {
    db.collection("hours")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setHours(data);
        console.log("hola", hours);
        setIsLoadingHours(false);
      });
  };

  const fetchCourt = async () => {
    var docRef = db.collection("courts").doc(id);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setThisCourt(doc.data());
          setIsLoading(false);
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
    console.log(currentHour);
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
      <div className="container">
        <p>Direccion: {thisCourt.address}</p>
        <div className="row">
          <h3 className="horariosdisponibles">Horarios Disponibles</h3>
        </div>
        <div className="row align-items-center">
          <form>
            <label htmlFor="cars">Choose a car:</label>
            <select name="cars" id="cars">
              {!isLoadingHours &&
                hours.map(function (item, i) {
                  return (
                    <option
                      key={item.id}
                      value={item.hour}
                      disabled={currentHour > item.hour ? true : false}
                    >
                      {item.hour}
                    </option>
                  );
                })}
            </select>
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Court;
