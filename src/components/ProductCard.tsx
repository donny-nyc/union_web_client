import React, { useState } from 'react';
import './ProductCard.css';

export interface productCardProps {
  id: string,
  name: string,
  price: number,
  unit?: string
};

export default function ProductCard(props: productCardProps) {
  const [count, setCount] = useState<number>(1);

  function formatPrice(price: number) {
    return (price / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD', 
    });
  }

  async function createOrder(): Promise<void> {
    const raw = await fetch(`http://localhost:8080/orders/start-order`, {
      method: 'POST'
    });

    const data = await raw.json();

    const orderId = data.results.id;

    document.cookie = `order=${orderId}; SameSite=Lax; Secure`;

    console.log('new order', document.cookie);
  }

  function getOrderId(): string | undefined {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("order="))
      ?.split("=")[1];

    console.log('get order ID', cookieValue);

    return cookieValue;
  }

  async function addToOrder(): Promise<void> {
    let orderId = getOrderId();

    if(!orderId) {
      await createOrder();
      orderId = getOrderId();
    }

    console.log(`adding ${props.name } to order ${orderId}`);

    const putBody = JSON.stringify({
      productId: props.id,
      count
    });

    fetch(`http://localhost:8080/orders/${orderId}/add-to-order`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: putBody,
    }).then((res) => res.json())
    .then((data) => {
      console.log('add to order results', data);
      
      document.dispatchEvent(
        new CustomEvent(
          "addToOrder", 
          { 
            detail: {
              orderId
            }
          }
        )
      );
    });
  }

  function setProductCount(event: React.ChangeEvent<HTMLInputElement>): void {
    const value: number = parseInt(event.target.value);

    if(isNaN(value)) {
      setCount(1);
      return
    }

    setCount(parseInt(event.target.value));
  }

  return (
    <div className='ProductCard'>
      <div className='ProductImage'>
        <img />
      </div>
      <div className='ProductDetails'>
        <div>id: {props.id}</div>
        <div>name: {props.name}</div>
        <div>price: {formatPrice(props.price)} { props.unit ? ` per ${props.unit}` : '' }</div>
        <input type={"text"} pattern="[0-9]+" onChange={setProductCount} value={count} />
        <button onClick={addToOrder}>Add To Order</button>
      </div>
    </div>
  )
}
