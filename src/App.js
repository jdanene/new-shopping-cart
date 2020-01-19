import React, { useEffect, useState } from 'react';
import CardGrid from "./cardGrid/CardGrid";
import { Button, Container, Title, Message } from 'rbx';

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
        <CardGrid products={products} />
      </Container>
  );
};

export default App;