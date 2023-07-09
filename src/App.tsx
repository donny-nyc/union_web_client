import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductSearch from './pages/product_search';

function App() {
  return (
    <>
      <h1>Sedo</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<ProductSearch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
