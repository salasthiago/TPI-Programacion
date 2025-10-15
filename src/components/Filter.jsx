import { useState } from "react";

export const filterValues = {
  PRICE_DESC: "pricedesc",
  PRICE_ASC: "priceasc",
  YEAR_DESC: "year_desc",
  YEAR_ASC: "year_asc"
};

export default function Filtered({ filter, setFilter }) {
  return (
    <div>
      <span>Ordenar por: </span>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value={filterValues.PRICE_DESC}>De mayor a menor precio</option>
        <option value={filterValues.PRICE_ASC}>De menor a mayor precio</option>
        <option value={filterValues.YEAR_ASC}>Año más reciente</option>
        <option value={filterValues.YEAR_DESC}>Mas antiguo</option>
      </select>
    </div>
  );
}
