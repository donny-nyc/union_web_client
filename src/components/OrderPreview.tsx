import React, { useState, useEffect } from 'react';

import './OrderPreview.css';

export interface OrderPreviewProps {
};

type Product = {
  id: string;
  name: string;
  price: number;
  count: number;
  keywords: string[];
};

export default function OrderPreview(props: OrderPreviewProps) {
  const [results, setResults] 
    = useState<Product[]>([] as Product[]);

  const [orderId, setOrderId]
    = useState<string>(""); 

  const [orderStatus, setOrderStatus]
    = useState<string>("");

  function getOrderItems(event: any): void {
    setOrderId(event.detail.orderId);

    fetch(`http://localhost:8080/orders/${event.detail.orderId}/items`)
      .then((res) => res.json())
      .then((data) => {
        const products: Product[] = data.products;

        if(!products.length) {
          return;
        }

        setResults(products);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  function handle(event: any) {
    console.log("[OrderPreview] add to order", event);

    getOrderItems(event)
  }

  useEffect(() => {
    console.log('add event listener');
    document.addEventListener("addToOrder", handle, false);
  }, []);

  return (
    <>
    <h2>OrderId: {orderId}</h2>
    <h2>OrderStatus: {orderStatus}</h2>
    {results.map((result: Product) => {
      return (
        <div>
        name: {result.name}, count: {result.count}
        </div>
      )
    })}
    </>
  )
}
