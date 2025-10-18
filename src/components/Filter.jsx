import { useState } from "react";
import "./Filter.css";

export const filterValues = {
  PRICE_DESC: "pricedesc",
  PRICE_ASC: "priceasc",
  YEAR_DESC: "year_desc",
  YEAR_ASC: "year_asc"
};

export default function Filtered({ filter, setFilter }) {
  return (
    <div className="filter-container">
      <div className="filter-content">
        <span className="filter-label">Ordenar por:</span>
        <select 
          className="filter-select"
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value={filterValues.PRICE_DESC}>De mayor a menor precio</option>
          <option value={filterValues.PRICE_ASC}>De menor a mayor precio</option>
          <option value={filterValues.YEAR_ASC}>Año más reciente</option>
          <option value={filterValues.YEAR_DESC}>Más antiguo</option>
        </select>
      </div>
    </div>
  );
}
