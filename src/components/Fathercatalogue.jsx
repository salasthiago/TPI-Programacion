import Catalogo from "./Catalogue";
import "./FatherCatalogue.css";
import Header from "./Header";
import Filtered from "./Filter";
import { filterValues } from "./Filter";
import { useState } from "react";
import { useEffect } from "react";

const products = [
  {
    id: 5,
    name: "Plastic Beach",
    artist: "Gorillaz",
    price: 25.99,
    year: 1300,
  },
  { id: 6, name: "Ballads 1", artist: "Joji", price: 28.99, year: 1999 },
  {
    id: 7,
    name: "Thriller",
    artist: "Michael Jackson",
    price: 24.99,
    year: 666,
  },
  { id: 8, name: "Demon Days", artist: "Gorillaz", price: 22.99, year: 991 },
  { id: 9, name: "Mint Jams", artist: "Casiopea", price: 69.99, year: 1995 },
  { id: 10, name: "Dirt", artist: "Alice In Chains", price: 22.99, year: 2000 },
  {
    id: 44,
    name: "Oktubre",
    artist: "Patricio rey y sus redonditos de ricota",
    price: 22.99,
    year: 2006,
  },
  {
    id: 92,
    name: "Gulp",
    artist: "Patricio rey y sus redonditos de ricota",
    price: 22.99,
    year: 2003,
  },
  {
    id: 54,
    name: "Audioslave",
    artist: "Audioslave",
    price: 22.99,
    year: 2069,
  },
  {
    id: 423,
    name: "Verde Paisaje del infierno",
    artist: "Los piojos",
    price: 22.99,
    year: 22233,
  },
  {
    id: 898,
    name: "Cuarteto Característico (A2000)",
    artist: "Rodrigo",
    price: 22.99,
    year: 1123,
  },
  {
    id: 873,
    name: "Master of puppets",
    artist: "Metallica",
    price: 23.99,
    year: 2025,
  },
  {
    id: 8766,
    name: "Porfiado",
    artist: "El Cuarteto de Nos",
    price: 79.99,
    year: 2015,
  },
];

export default function Fathercatalogue() {
  // aca iria llamada a la api
  // conseguir productos etc
  const [filter, setFilter] = useState(filterValues.PRICE_ASC);
  const [visibleProducts, setVisibleProducts] = useState(products);

  useEffect(() => {
    const arr = [...products];

    switch (filter) {
      case filterValues.PRICE_ASC:
        arr.sort((a, b) => a.price - b.price); // asc
        break;
      case filterValues.PRICE_DESC:
        arr.sort((a, b) => b.price - a.price); // desc
        break;

      case filterValues.YEAR_DESC:
        arr.sort((a, b) => a.year - b.year); // asc

        break;

      case filterValues.YEAR_ASC:
        arr.sort((a, b) => b.year - a.year); // desc
        break;

      default:
        // sin ordenar (orden original)
        break;
    }

    setVisibleProducts(arr);
  }, [filter]);
  return (
    <div>
      <Header></Header>
      <div className="father">
        <Filtered filter={filter} setFilter={setFilter}></Filtered>
        <Catalogo products={visibleProducts}></Catalogo>
      </div>
    </div>
  );
}
