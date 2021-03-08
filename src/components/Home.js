import React from "react";
import Card from "./Card";
import Navbar from "./Navbar";

function Home() {
  var courts = [
    {
      id: 1,
      name: "La cortada",
      address: "San Lorenzo 546",
      price: 500,
    },
    {
      id: 2,
      name: "San Fernando",
      address: "Guemes 1900",
      price: 500,
    },
    {
      id: 3,
      name: "Alea",
      address: "Fontana 4321",
      price: 500,
    },
    {
      id: 4,
      name: "San Jose",
      address: "Jujuy 900",
      price: 500,
    },
    {
      id: 5,
      name: "Las Palmeras Paddle Club",
      address: "San Lorenzo 546",
      price: 500,
    },
  ];
  return (
    <div>
      <Navbar></Navbar>
      {courts.map(function (item, i) {
        return (
          <Card
            id={item.id}
            name={item.name}
            address={item.address}
            price={item.price}
          ></Card>
        );
      })}
    </div>
  );
}

export default Home;
