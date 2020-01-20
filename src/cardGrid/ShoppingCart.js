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
    Notification
} from 'rbx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart, faPlusSquare, faMinusSquare} from '@fortawesome/free-solid-svg-icons'

//https://dfee.github.io/rbx/components/media

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
    console.log(`data/products/${sku}_1.jpg`);
    return (<Image.Container as="p" size={64}>
        <Image
            alt="64x64"
            src={`data/products/${sku}_1.jpg`}
        />
    </Image.Container>)
};

const ProductCost = ({numberSelected, currencyFormat, price}) => {

};
/*
<ProductImg sku={sku}/>


<Media.Item>
    <Title as="p" size={6}>
        {title}
    </Title>
    <Title as="p" subtitle size={6}>
        {description}
    </Title>
</Media.Item>
*/

const SelectedItem = ({sku, title, style, numberSelected, size}) => {
    return (
        <div style={
            {
                border: '2px solid red',
                margin: '1%',
                padding:0
            }
        }>

            <Tile kind="child">
                <Card paddingless>

                    <Card.Content>
                        <Media>
                            <Media.Item as="figure" align="left">
                                <ProductImg sku={sku}/>
                            </Media.Item>

                            <Media.Item align="center">
                                <Title as="p" size={6}>
                                    {title}
                                </Title>
                                <Title as="p" subtitle size={6}>
                                    <small>{size + "|" + style}</small>
                                </Title>
                            </Media.Item>

                            <Media.Item align="right">
                                <div style={{float: "right"}}>
                                    <Delete/>
                                </div>
                                <br/>
                                <div style={{
                                    margin: "16%",
                                    color: "green"
                                }}>
                                    <small>$10.75</small>
                                </div>
                                <Level breakpoint="mobile">
                                    <Level.Item align="left">
                                        <Level.Item as="a">
                                            <Button.Group hasAddons align="right">
                                                <Button>
                                                    <Icon size="small">
                                                        <FontAwesomeIcon icon={faPlusSquare}/>
                                                    </Icon>
                                                </Button>
                                                <Button>
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
                                        <small>Quantity: {numberSelected}</small>
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

const SelectedGrid = ({itemSelected}) => {
    return (
                <Container>
                    <Tile kind="ancestor">
                        <Tile kind="parent" vertical>

                            {itemSelected.map(({sku, title, style, numberSelected, size}) => <SelectedItem
                                key={sku + "#" + size}
                                sku={sku}
                                title={title} style={style}
                                numberSelected={numberSelected} size={size}/>)}
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
    const {cost, numItems} = itemSelected.reduce((accumulator, currentValue) => {
        return (
            {
                cost: (currentValue.numberSelected * currentValue.price + accumulator.cost),
                numItems: (currentValue.numberSelected + accumulator.numItems)
            })
    }, {cost: 0, numItems: 0});

    return (
        <p>
            <small>Cost: ${cost}</small>
            <br/>
            <small>Items : {numItems}</small>
        </p>
    )
};


const ShoppingCart = ({products}) => {


    const [data, setData] = useState({sidebarOpen: false, itemSelected: test});

    const onSetSidebarOpen = (open) => {
        setData({sidebarOpen: open, itemSelected: data.itemSelected})
    };

    return (
        <div style={{
            float: "right"
        }}>
            <Sidebar
                sidebar={

                    <div >

                        <Box>
                            <Column.Group multiline gapSize={1}>
                                <Column>

                                    <Box color="primary" textAlign="centered">
                                        <GetTotalCost itemSelected={Object.values(data.itemSelected)}/>
                                    </Box>
                                    <Column.Group breakpoint="mobile">
                                        <Column>
                                            <div style={{padding: "5%"}}>
                                                <Button backgroundColor={"black"} textColor={"white"} fullwidth
                                                        size={"medium"}> Checkout </Button>
                                            </div>
                                        </Column>
                                    </Column.Group>
                                </Column>
                            </Column.Group>
                        </Box>

                        <SelectedGrid itemSelected={Object.values(data.itemSelected)}/>
                    </div>

                }
                open={data.sidebarOpen}
                onSetOpen={onSetSidebarOpen}
                styles={{
                    sidebar:
                        {background: "white", width: "30%",height:"50%"}
                }}
            >
                <div style={{paddingTop: "3%"}}>
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