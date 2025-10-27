import Catalogo from "./Catalogue";
import "./FatherCatalogue.css";
import Header from "./Header";
import Filtered from "./Filter";
import { filterValues } from "./Filter";
import { useState } from "react";
import { useEffect } from "react";

export default function Fathercatalogue() {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState(filterValues.PRICE_ASC);
  const [visibleProducts, setVisibleProducts] = useState(products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/productos", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          console.error("Error al obtener productos");
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    };

    fetchData();
  }, []); // Array vacío para ejecutar solo una vez al montar
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
  }, [filter, products]); // Agregar products como dependencia
  return (
    <div>
      <Header></Header>
      <div className="father">
      <div className="catalogue-hero">
        <h1>Nuestro Catálogo</h1>
        <p>Descubrí la mejor colección de vinilos. Desde clásicos atemporales hasta los lanzamientos más recientes.</p>
      </div>
        <div className="filter-section">
          <Filtered filter={filter} setFilter={setFilter}></Filtered>
        </div>
        <Catalogo products={visibleProducts}></Catalogo>
      </div>
    </div>
  );
}
