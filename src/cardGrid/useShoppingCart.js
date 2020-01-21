import React, {useEffect, useState, Fragment} from 'react';

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

export const getId = ({item}) => {
    if ("size" in item){
        return `${item.sku}#${item.size}`
    }

};


const useShoppingCart = () =>{
    const [cartOpen, setCartOpen] =  React.useState({sidebarOpen: false});
    const [itemsInCart, setItemInCart] = React.useState({});

    /**
     * Add item to shopping cart
     * @param item
     * @param size
     */
    const addToCart = ({item,size}) =>{
        let id = `${item.sku}#${size}`;

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
            delete itemsInCart[id];
            setItemInCart(itemsInCart);
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
        openCart
    };
};


export default useShoppingCart;