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


const resetInventoryAfterMerge=({newCart,inventory})=>{


};

const mergeCarts = (cart, saveCart) => {
    //let newCart = mergeCarts(itemsInCart, savedCart);

    console.log("---MERGING---")
    console.log(saveCart)
    console.log(cart)
    let currentCart = {};
    let cartKeys = Object.keys(cart);
    for (let c in cartKeys){
        currentCart[cartKeys[c]] = cart[cartKeys[c]]
    }
    console.log(currentCart)



    let cartKeys1 = Object.keys(saveCart);
    for (let key in cartKeys1){
        let keyActual = cartKeys1[key];
        if (keyActual in currentCart){
            currentCart[keyActual]["numberSelected"]+= saveCart[keyActual].numberSelected;
            console.log(saveCart[keyActual].numberSelected,saveCart[keyActual], "debuggg")
        }else{
            currentCart[keyActual] = saveCart[keyActual];
            console.log(saveCart[keyActual])

        }
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

/**
 * If>0 the user has too many items. The return is how much the useer is over by
 * and the inventory[sku][size] is amount in stock
 */
export const isTooManyItems = ({inventory,item}) =>{
    let numItemsInInventory = inventory[item.sku][item.size];
    console.log(numItemsInInventory)
    return item["numberSelected"]-numItemsInInventory
};

const useShoppingCart = (user) =>{
    const [cartOpen, setCartOpen] =  React.useState({sidebarOpen: false});
    const [itemsInCart, setItemInCart] = React.useState({});
    const [inventory, setInventory] = React.useState({});
    const [isLoggedIn, setLogin] = React.useState(false);



    const uploadToCartToDp=()=>{
        if (Object.keys(itemsInCart).length !==0 && user!==null){
            let json = {};
            json[user.uid] = itemsInCart;
            db.ref('/carts/' + user.uid).set(itemsInCart);
        }
    };

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
                uploadToCartToDp();
            };
            db.ref('/carts/' + user.uid).once('value', handleData, (error) => alert(error));

        };

        if (user!==null) fetch();
    },[user]);

    /**
    useEffect(()=>{
        if (user!==null) setLogin(true);


        if (Object.keys(itemsInCart).length !==0 && user!==null){
            let json = {};
            json[user.uid] = itemsInCart;
            db.ref('/carts/' + user.uid).set(itemsInCart);
        }

    },[user,itemsInCart,cartOpen]);
*/

    useEffect(() => {

        const handleData = snap => {
            if (snap.val()) setInventory(snap.val());
        };
        db.ref('/inventory/').on('value', handleData, error => alert(error));

    }, []);




    const decrementInventory = ({item})=>{

            inventory[item.sku][item.size]--;
            console.log(inventory);
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
        uploadToCartToDp();

    };

    const incrementCart =({item})=>{
        let id = getId({item});
        if (id in itemsInCart){
            itemsInCart[id].numberSelected++;
            setItemInCart(itemsInCart);

            // decrement inventory
           // if (isTooManyItems({inventory,item})<=0) {
            //    inventory[item.sku][item.size]--;
            //    setInventory(inventory);
           // }

        }
        setCartOpen({sidebarOpen: true});
        uploadToCartToDp();
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
           // if (isTooManyItems({inventory,item})<=0){
           //     inventory[item.sku][item.size]++;
           //     setInventory(inventory);
           // }


        }
        setCartOpen({sidebarOpen: true});
        uploadToCartToDp();
    };

    /**
     * Removes a item entirely
     */
    const removeFromCart = ({item}) =>{

        let id = getId({item});
        // simply iterate up the number of selected items
        if (id in itemsInCart){
                // increment inventory
                //inventory[item.sku][item.size]+=item.numberSelected;
                // delete item
                delete itemsInCart[id];

                // set states
                setItemInCart(itemsInCart);
                //setInventory(inventory);
        }
        setCartOpen({sidebarOpen: true});
        uploadToCartToDp();
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
        incrementInventory,
        uploadToCartToDp
    };
};


export default useShoppingCart;