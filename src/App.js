import React, {Fragment, useEffect, useState} from 'react';
import CardGrid from "./cardGrid/CardGrid";
import {Button, Container, Title, Message} from 'rbx';
import ShoppingCart from "./cardGrid/ShoppingCart";
import useShoppingCart from "./cardGrid/useShoppingCart";
import {db} from "./cardGrid/Db";
import {useAsync} from 'react-use';

const App = () => {
    const shoppingCartState = useShoppingCart();

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('./data/products.json');
            const json = await response.json();
            setData(json);
        };
        fetchProducts();
    }, []);

    
    return (

        <Fragment>
        {
            Object.keys(shoppingCartState.inventory).length !== 0 ?
                <div>
                    <div style={{height: "60%"}}>
                        <ShoppingCart products={Object.values(data)} shoppingCartState={shoppingCartState}/>
                    </div>
                    <div style={{float: "right", width: "70%"}}>
                        <CardGrid products={Object.values(data)} shoppingCartState={shoppingCartState}/>
                    </div>
                </div>
                : <small> loading </small>
        }
        </Fragment>
    );
};

export default App;