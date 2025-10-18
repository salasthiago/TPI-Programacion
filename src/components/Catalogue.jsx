import { useState } from "react";
import Product from "./Product";
import Header from "./Header";
import "./Catalogue.css";

export default function Catalogo({products}){
    console.log(products)
return (
    <div className="catalogue-page">
      <div className="catalogue-container">
        <div className="products-container">       
          {products.map(product => (
            <Product key={product.id} id={product.id} name={product.name} artist={product.artist} price={product.price} year={product.year}></Product>
          ))}
        </div>
      </div>
    </div>
  )
}
