import React, { useState, useEffect } from 'react';
import './product_search.css';

export default function ProductSearch() {
  const [results, setResults] = useState([]);

  type productSearchResult = {
    name: string,
    id: string,
  };

  function setProductResults(event: React.ChangeEvent<HTMLInputElement>): void {
    fetch(`http://localhost:8080/search?name=${event.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        const products = data.results.map((result: productSearchResult) => {
          return (
            <div>
              name: {result.name}, id: {result.id}
            </div>
          )
        });

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
      <div>
        {results}
      </div>
    </>
  )
};
