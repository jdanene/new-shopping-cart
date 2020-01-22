import React, {useEffect, useState, Fragment} from 'react';
import {db} from "./Db";
import firebase from "firebase";

/*
{10412368723880252#L:{
     "sku": 10412368723880252,
        "title": "Short Sleeve T-Shirt",
        "description": "",
        "style": "Grey",
        "price": 75,
        "currencyId": "USD",
        "currencyFormat": "$",
        "isFreeShipping": true,
         "numberSelected":0
         "size": "L"
}}
*/
const mergeCarts = (cart, saveCart) => {

    let currentCart = Object.assign({}, cart);

    if (Object.keys(cart).length !==0){
        for (let key in Object.keys(saveCart)){
            if (key in currentCart){
                currentCart[key].numberSelected+= saveCart[key].numberSelected;
            }else{
                currentCart[key] = saveCart[key];
            }
        }
    }else{
        currentCart = saveCart;
    }

    return currentCart;
};


/*
Check if has inventory
 */
export const checkIfHasInventory = ({sku,inventory}) => {
    if (sku in inventory) {
        if (Object.keys(inventory[sku]).length === 0) {
            return false;
        } else {
            let i = 0;
            let inventoryValues = Object.values(inventory[sku]);
            while (i < inventoryValues.length) {
                if (inventoryValues[i] > 0) {
                    return true;
                }
                i++
            }
            return false;
        }
    } else {
        return false;
    }
};

export const getId = ({item}) => {
    if ("size" in item){
        return `${item.sku}${item.size}`
    }

};


const useShoppingCart = (user) =>{
    const [cartOpen, setCartOpen] =  React.useState({sidebarOpen: false});
    const [itemsInCart, setItemInCart] = React.useState({});
    const [inventory, setInventory] = React.useState({});
    const [isLoggedIn, setLogin] = React.useState(false);

    useEffect(()=>{
        if (user!==null) setLogin(true);


        if (Object.keys(itemsInCart).length !==0 && user!==null){
            let json = {};
            json[user.uid] = itemsInCart;
            db.ref('/carts/' + user.uid).set(itemsInCart);
        }

    });


    /**
     * Runs anytime loggin or logged out.
     */
    useEffect(()=>{

        const fetch =  () =>
        {

            const handleData = snap => {
                console.log("snap")
                console.log(snap.val())
                if (snap.val()) {
                    let savedCart = snap.val();
                    let newCart = mergeCarts(itemsInCart, savedCart);
                    setItemInCart(newCart);
                    console.log("new new")
                    console.log(newCart)

                    if (Object.keys(newCart).length !== 0) {
                        setCartOpen({sidebarOpen: true})
                    }
                }
            };
            db.ref('/carts/' + user.uid).once('value', handleData, (error) => alert(error));

        };

        if (user!==null) fetch();
    },[user]);


    useEffect(() => {

        const handleData = snap => {
            if (snap.val()) setInventory(snap.val());
        };
        db.ref('/inventory/').on('value', handleData, error => alert(error));

    }, []);



    const decrementInventory = ({sku,size})=>{
        inventory[sku][size]--;
        console.log(inventory)
        setInventory(inventory);
        setCartOpen(cartOpen);
    };

    const incrementInventory = ({sku,size})=>{
        inventory[sku][size]++;
        setInventory(inventory);
        setCartOpen(cartOpen);
    };


    /**
     * Add item to shopping cart
     * @param item
     * @param size
     */
    const addToCart = ({item,size}) =>{
        let id = `${item.sku}${size}`;

        // simply iterate up the number of selected items
        if (id in itemsInCart){
            itemsInCart[id].numberSelected++;
        }else{
            // create new item, then iterate up the number of selected items
            let newItem = Object.assign({}, item);
            newItem["numberSelected"]=1;
            newItem["size"]=size;
            itemsInCart[id] = newItem;

        }
        setItemInCart(itemsInCart);
    };

    const incrementCart =({item})=>{
        let id = getId({item});
        if (id in itemsInCart){
            itemsInCart[id].numberSelected++;
            setItemInCart(itemsInCart);

            // decrement inventory
            inventory[item.sku][item.size]--;
            setInventory(inventory);

        }
        setCartOpen({sidebarOpen: true});
    };

    const decrementCart = ({item}) =>{
        let id = getId({item});
        // simply iterate up the number of selected items
        if (id in itemsInCart){

            itemsInCart[id].numberSelected--;
            if (itemsInCart[id].numberSelected === 0){
                removeFromCart({item})
            }else{
                setItemInCart(itemsInCart);
            }
            // increment inventory
            inventory[item.sku][item.size]++;
            setInventory(inventory);

        }
        setCartOpen({sidebarOpen: true});
    };

    /**
     * Removes a item entirely
     */
    const removeFromCart = ({item}) =>{

        let id = getId({item});
        // simply iterate up the number of selected items
        if (id in itemsInCart){

            // increment inventory
            inventory[item.sku][item.size]+=item.numberSelected;
            // delete item
            delete itemsInCart[id];

            // set states
            setItemInCart(itemsInCart);
            setInventory(inventory);

        }
        setCartOpen({sidebarOpen: true});
    };

    const openCart=()=>{
        setCartOpen({sidebarOpen: true});
    };

    return{
        cartOpen,
        setCartOpen,
        itemsInCart,
        setItemInCart,
        addToCart,
        decrementCart,
        removeFromCart,
        incrementCart,
        openCart,
        inventory,
        decrementInventory,
        incrementInventory
    };
};


export default useShoppingCart;