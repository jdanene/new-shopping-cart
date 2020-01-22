import React, {Fragment, useEffect, useState} from 'react';
import CardGrid from "./cardGrid/CardGrid";
import {Button, Container, Title, Message} from 'rbx';
import ShoppingCart from "./cardGrid/ShoppingCart";
import useShoppingCart from "./cardGrid/useShoppingCart";
import {db} from "./cardGrid/Db";
import {useAsync} from 'react-use';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import Banner from "./cardGrid/LogIn";
import {uiConfig} from "./cardGrid/Db";


const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setUser);
    }, []);

    const shoppingCartState = useShoppingCart(user);

    const [data, setData] = useState({});


    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('./data/products.json');
            const json = await response.json();
            setData(json);
        };
        fetchProducts();
    }, []);

console.log("heeeee",Object.keys(shoppingCartState.itemsInCart))
    return (

        <div>

            <Fragment>
            {
            (Object.keys(shoppingCartState.inventory).length !== 0 && Object.keys(data).length !==0)?
                <div>

                    <div style={{height: "60%", width:"30%"}}>

                        <ShoppingCart products={Object.values(data)} shoppingCartState={shoppingCartState}/>
                    </div>
                    <div style={{float: "right", width: "70%"}}>
                        <Banner user={ user } />

                        <CardGrid products={Object.values(data)} shoppingCartState={shoppingCartState}/>
                    </div>
                </div>
                : <small> '' </small>
        }
            </Fragment>

        </div>
    );
};

export default App;