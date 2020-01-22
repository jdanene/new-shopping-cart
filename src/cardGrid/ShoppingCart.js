import React, {useEffect, useState, Fragment} from 'react';
import Sidebar from "react-sidebar";
import {
    Button,
    Icon,
    Tile,
    Box,
    Title,
    Media,
    Image,
    Container,
    Level,
    Delete,
    Content,
    Card,
    Column,
    Notification,
    Message
} from 'rbx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart, faPlusSquare, faMinusSquare} from '@fortawesome/free-solid-svg-icons'
import {Price} from "./CardGrid";
import {checkIfHasInventory,isTooManyItems} from "./useShoppingCart";


const selectedItemStyle = {color: "#92a8d1"};


const test = {
    "12064273040195392": {
        "sku": 12064273040195392,
        "title": "Cat Tee Black T-Shirt",
        "description": "4 MSL",
        "style": "Black with custom print",
        "price": 10.9,
        "currencyId": "USD",
        "currencyFormat": "$",
        "isFreeShipping": true,
        "numberSelected": 1,
        "size": "L"

    },
    "51498472915966370": {
        "sku": 51498472915966370,
        "title": "Dark Thug Blue-Navy T-Shirt",
        "description": "",
        "style": "Front print and paisley print",
        "price": 29.45,
        "currencyId": "USD",
        "currencyFormat": "$",
        "isFreeShipping": true,
        "numberSelected": 5,
        "size": "XL"

    },
    "10686354557628304": {
        "sku": 10686354557628304,
        "title": "Sphynx Tie Dye Wine T-Shirt",
        "description": "GPX Poly 1",
        "style": "Front tie dye print",
        "price": 9,
        "currencyId": "USD",
        "currencyFormat": "$",
        "isFreeShipping": true,
        "numberSelected": 10,
        "size": "M"

    }
};


const ProductImg = ({sku}) => {
    return (<Image.Container as="p" size={64}>
        <Image
            alt="64x64"
            src={`data/products/${sku}_1.jpg`}
        />
    </Image.Container>)
};



const SelectedItem = ({item, decrementCart, incrementCart, removeFromCart,inventory, incrementInventory,decrementInventory}) => {

    const hasInventory = ({inventory}) => Object.values(inventory[item.sku]).reduce((a,b)=>a+b,0);


    const onDelete = () => {
        removeFromCart({item});
    };

    const onCartAdd = () => {
        incrementCart({item});
    };

    const onCartDecrement = () => {

        decrementCart({item});
    };

    let isTooMany = isTooManyItems({inventory,item});
    return (
        <div style={
            {
                border: '2px solid red',
                margin: '1%',
                padding: 0
            }
        }>

            <Tile kind="child">
                <Card paddingless>

                    <Card.Content>
                        {isTooMany>0?
                        <Message >
                            <Message.Header>
                                <p>Only {-1*(-item["numberSelected"]+isTooMany)} items in stock!</p>
                            </Message.Header>
                        </Message>:''}
                        <Media>
                            <Media.Item as="figure" align="left">
                                <ProductImg sku={item.sku}/>
                            </Media.Item>

                            <Media.Item align="center">
                                <Title as="p" size={6}>
                                    {item.title}
                                </Title>
                                <Title as="p" subtitle size={6}>
                                    <small>{item.size + "|" + item.style}</small>
                                </Title>
                            </Media.Item>

                            <Media.Item align="right">
                                <div style={{float: "right"}}>
                                    <Delete onClick={onDelete}/>
                                </div>
                                <br/>
                                <div style={{
                                    margin: "16%",
                                    color: "green"
                                }}>
                                    <Price price={item.price} currencyFormat={item.currencyFormat}/>
                                </div>
                                <Level breakpoint="mobile">
                                    <Level.Item align="left">
                                        <Level.Item as="a">
                                            <Button.Group hasAddons align="right">
                                                <Button onClick={onCartAdd}
                                                        unselectable={!(hasInventory({inventory})) || (isTooMany>=0)}
                                                        disabled={!(hasInventory({inventory}))|| (isTooMany>=0)}
                                                        tooltip= {
                                                            isTooMany>0? "Remove Items or Update Cart":hasInventory({inventory})?'':"Out of Stock"
                                                        }
                                                        tooltipPosition="bottom"
                                                        tooltipColor="dark">
                                                    <Icon size="small">
                                                        <FontAwesomeIcon icon={faPlusSquare}/>
                                                    </Icon>
                                                </Button>
                                                <Button onClick={onCartDecrement}>
                                                    <Icon size="small">
                                                        <FontAwesomeIcon icon={faMinusSquare}/>
                                                    </Icon>
                                                </Button>
                                            </Button.Group>
                                        </Level.Item>
                                    </Level.Item>
                                </Level>
                                <Content>
                                    <p>
                                        <small>Quantity: {item.numberSelected}</small>
                                        <br/>
                                    </p>
                                </Content>


                            </Media.Item>
                        </Media>
                    </Card.Content>

                </Card>
            </Tile>
        </div>
    )
};

const SelectedGrid = ({itemsInCart,decrementCart,removeFromCart,incrementCart,decrementInventory, incrementInventory,inventory}) => {

    return (
        <Container>
            <Tile kind="ancestor">
                <Tile kind="parent" vertical>

                    {Object.keys(itemsInCart).length === 0?'':Object.values(itemsInCart).map((item) => <SelectedItem
                        item={item}
                        key={`${item.sku}${item.size}`}
                        decrementCart={decrementCart}
                        removeFromCart={removeFromCart}
                        incrementCart={incrementCart}
                        inventory={inventory}
                        decrementInventory={decrementInventory}
                        incrementInventory={incrementInventory}
                    />)}
                </Tile>
            </Tile>
        </Container>


    );

};


//ToDo: Catch when its equal to zero
const buyLessItem = (itemJson) => {
    itemJson["numberSelected"]--;
    return itemJson;
};

const buyMoreItem = (itemJson) => {
    itemJson["numberSelected"]++;
    return itemJson;
};

const addNewItemToCart = (itemJson) => {
    itemJson["numberSelected"] = 0;
    return itemJson;
};

const GetTotalCost = ({itemSelected}) => {

    console.log(itemSelected)

    const {cost, numItems} = Object.values(itemSelected).reduce((accumulator, currentValue) => {
        return (
            {
                cost: (currentValue.numberSelected * currentValue.price + accumulator.cost),
                numItems: (currentValue.numberSelected + accumulator.numItems)
            })
    }, {cost: 0, numItems: 0});



    return (
        <p>
            <small>Cost: ${cost.toFixed(2)}</small>
            <br/>
            <small>Items : {numItems}</small>
        </p>
    )
};




const ShoppingCart = ({shoppingCartState}) => {
    //const [data, setData] = useState({sidebarOpen: false, itemSelected: test});
    const hasInventory = () =>
    {
        const SHIRT_SIZES = ['S', 'M', 'L', 'XL'];

        let i;
        let keys = Object.keys(shoppingCartState.itemsInCart);
        console.log(shoppingCartState.itemsInCart);
        for (i in keys){
            let id = keys[i];
            let sku = shoppingCartState.itemsInCart[id]["sku"];
            let size = shoppingCartState.itemsInCart[id]["size"];


                if (shoppingCartState.inventory[sku][size]< shoppingCartState.itemsInCart[id].numberSelected)
                    return false;


        }

        return true;
    };

    const balanceCart = () =>{

        console.log("balancing")
        let i;
        let keys = Object.keys(shoppingCartState.itemsInCart);
        for (i in keys){
            let id = keys[i];
            let sku = shoppingCartState.itemsInCart[id]["sku"];
            let size = shoppingCartState.itemsInCart[id]["size"];

            if ((shoppingCartState.inventory[sku][size]< shoppingCartState.itemsInCart[id].numberSelected)){
                shoppingCartState.itemsInCart[id].numberSelected = shoppingCartState.inventory[sku][size];
            }

        }
        shoppingCartState.setItemInCart(shoppingCartState.itemsInCart);
        shoppingCartState.setCartOpen({sidebarOpen: true});
        shoppingCartState.uploadToCartToDp(); 

    };

    const isGood = hasInventory();


    const onSetSidebarOpen = (open) => {
        shoppingCartState.setCartOpen({sidebarOpen: open});
    };

    return (
        <div style={{
            float: "right"
        }}>
            <Sidebar
                sidebar={
                    <div>
                        <Box>
                            <Column.Group multiline gapSize={1}>
                                <Column>

                                    <Box color="primary" textAlign="centered">
                                        <GetTotalCost itemSelected={shoppingCartState.itemsInCart}/>
                                    </Box>
                                    <Column.Group breakpoint="mobile">
                                        <Column>
                                            <div style={{padding: "5%"}}>
                                                {!(isGood)?
                                                <Button onClick={balanceCart} backgroundColor="danger" textColor={"white"} fullwidth
                                                        size={"medium"}> Update Cart </Button>:
                                                    <Button  backgroundColor="black" textColor={"white"} fullwidth
                                                            size={"medium"}>  Checkout</Button>
                                                }
                                            </div>
                                        </Column>
                                    </Column.Group>
                                </Column>
                            </Column.Group>
                        </Box>

                        <SelectedGrid
                            itemsInCart={shoppingCartState.itemsInCart}
                            decrementCart={shoppingCartState.decrementCart}
                            removeFromCart={shoppingCartState.removeFromCart}
                            incrementCart={shoppingCartState.incrementCart}
                            decrementInventory={shoppingCartState.decrementInventory}
                            incrementInventory={shoppingCartState.incrementInventory}
                            inventory={shoppingCartState.inventory}
                        />
                    </div>

                }
                open={shoppingCartState.cartOpen.sidebarOpen}
                onSetOpen={onSetSidebarOpen}
                styles={{
                    sidebar:
                        {background: "white", width: "30%", height: "100%"}
                }}
            >
                <div style={{paddingTop: "1%", paddingLeft: "1%"}}>
                    <Button size={"large"} onClick={() => onSetSidebarOpen({sidebarOpen: true})}>
                        <Icon>
                            <FontAwesomeIcon icon={faShoppingCart}/>
                        </Icon>
                        <span> Shopping Cart</span>
                    </Button>
                </div>
            </Sidebar>
        </div>

    );

};

export default ShoppingCart;


/*
{10412368723880252:{
     "sku": 10412368723880252,
        "title": "Short Sleeve T-Shirt",
        "description": "",
        "style": "Grey",
        "price": 75,
        "currencyId": "USD",
        "currencyFormat": "$",
        "isFreeShipping": true,
         "numberSelected":0
}}
*/