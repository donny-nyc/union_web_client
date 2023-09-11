import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './product_search.css';

export default function ProductSearch() {
  const [results, setResults] = useState<productSearchResult[]>([] as productSearchResult[]);

  type productSearchResult = {
    name: string,
    id: string,
    price: number,
    unit?: string,
  };

  function setProductResults(event: React.ChangeEvent<HTMLInputElement>): void {
    if(!event.target.value) {
      setResults([]);
      return;
    }

    fetch(`http://localhost:8080/search?name=${event.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        const products: productSearchResult[] = data.results;

        if(!products.length) {
          return;
        }

        setResults(products);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <h2>Product Search</h2>
      <input type={'text'} onChange={setProductResults} />
      {results.length} results
      {results.map((result: productSearchResult) => {
        return (
          <ProductCard id={result.id} name={result.name} price={result.price} unit={result.unit} />
        )
      })}
      <div>
      </div>
    </>
  )
};
