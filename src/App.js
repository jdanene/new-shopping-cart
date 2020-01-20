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
      <Container>
        <ShoppingCart products={products}/>

        <div style={{height: "60%", width:"50%","margin": "auto"}}>
          <CardGrid products={products} />
        </div>

      </Container>
  );
};

export default App;