import React, { useEffect, useState } from 'react';
import CardGrid from "./cardGrid/CardGrid";
import { Button, Container, Title, Message } from 'rbx';
import ShoppingCart from "./cardGrid/ShoppingCart";

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
      <div>
          <div style={{height:"60%"}}>
        <ShoppingCart products={products}/>
          </div>
          <div style={{float:"right", width:"70%"}}>
        <CardGrid products={products} />
          </div>
      </div>
  );
};

export default App;