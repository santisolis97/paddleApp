import React, { useState, useEffect } from "react";
import Card from "./Card";
import Navbar from "./Navbar";
import AddCourtModal from "./AddCourtModal";
import db from "../firebase.config";

function Home() {
  // Required for side-effects
  const initialCourts = [];
  const [courts, setCourts] = useState(initialCourts);

  const fetchCourts = async () => {
    db.collection("courts")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("aca", data);
        setCourts(data);
      });
  };
  useEffect(() => {
    fetchCourts();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      {courts.map(function (item, i) {
        return (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            address={item.address}
            price={item.price}
            photo={item.photo}
          ></Card>
        );
      })}
    </div>
  );
}

export default Home;
