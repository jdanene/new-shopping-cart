import 'rbx/index.css';
import {
    Button,
    Container,
    Tile,
    Title,
    Tag,
    Media,
    Card,
    Column,
    Image,
    Box,
    Notification,
    Dropdown,
    Icon,
    Generic,
    Level,
    Content, Footer
} from 'rbx';
import React, {Fragment, useState} from "react";
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const SHIRT_SIZES = ['S', 'M', 'L', 'XL'];


const SizeAndBuy = ({openCart,addToCart,item}) => {
    const [size, setSize] = useState(null);


    const openCartAndAddToCart= ()=> {
        openCart();
        addToCart({size,item});
    };

    const onClick = (newSize) => {
        console.log(newSize);
        setSize(newSize)
    };


    return (
        <Level>
            <Level.Item align="left">
                < Level.Item>
                    <div style={{width: "70%", margin: 0, padding: 0}}>
                        <Column.Group>
                            <Column>
                                <div>
                                    <b><small>Size:</small></b>
                                    <br/>
                                </div>
                                <Column.Group breakpoint="mobile">
                                    <Column>
                                        <Dropdown>

                                            <div style={{width: "90%", margin: 0, padding: 0}}>
                                                <Dropdown.Trigger>
                                                    <Button size={"small"} fullwidth>
                                                        <small>{(size === null) ? "Select" : `${size}`}</small>
                                                        <Icon size="small"><FontAwesomeIcon icon={faAngleDown}/></Icon>
                                                    </Button>
                                                </Dropdown.Trigger>
                                            </div>

                                            <Dropdown.Menu>
                                                <div style={{width: "50%"}}>
                                                    <Dropdown.Content>
                                                        <Dropdown.Item onClick={() => onClick("S")}>S</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => onClick("M")}>M</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => onClick("L")}>L</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => onClick("XL")}>XL</Dropdown.Item>
                                                    </Dropdown.Content>
                                                </div>

                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Column>
                                </Column.Group>
                            </Column>
                        </Column.Group>
                    </div>
                </Level.Item>
                <Level.Item>
                    <div style={{marginTop: "30%", marginRight: "-60%"}}>
                        <Button backgroundColor={"black"} textColor={"white"} fullwidth disabled={size===null}
                                size={"small"}
                                color="primary"
                                tooltip={size===null? "Select Size":""}
                                tooltipPosition="top"
                                tooltipResponsive={{desktop: 'bottom'}}
                                onClick={openCartAndAddToCart}>
                            <small>Add to Cart</small>
                        </Button>
                    </div>
                </Level.Item>
            </Level.Item>
        </Level>
    );
};

const ProductTitle = ({title}) => {
    return (
        <Fragment>
            <p style={{fontSize: "smaller", textAlign: "center"}}>{title} </p>
        </Fragment>
    );
};



const ProductImg = ({sku}) => {
    return (
        <Image.Container size="4by10">
            <Image
                src={`data/products/${sku}_1.jpg`}
            />
        </Image.Container>
    );
};

const ShoppingCard = ({item, openCart,addToCart}) => {

    return (


        <Column size="one-third">
            <div style={{borderStyle: "solid", margin: 0, padding: 0, width: "20vw"}}>
                <ProductImg sku={item.sku}/>

                <Generic
                    style={{cursor: item.description === "" ? 'default' : 'pointer'}}
                    color="primary"
                    tooltip={item.description}
                    tooltipPosition="top"
                    tooltipResponsive={{desktop: 'bottom'}}>
                    <ProductTitle title={item.title}/>
                    <ColoredLine color="orange"/>
                    <Price price={item.price} currencyFormat={item.currencyFormat}/>
                </Generic>


                <div style={{width: "100%", padding: 0, margin: 0, backgroundColor: '#F5F5F5'}}>
                        <SizeAndBuy openCart={openCart} addToCart={addToCart} item={item}/>
                </div>
            </div>


        </Column>

    );
};

export const Price = ({price, currencyFormat}) => {
    const pattern = /(?<dollars>[0-9]+)\.(?<cents>[0-9]+)/;
    const match = pattern.exec(price);
    let priceActual = parseFloat(price).toFixed(2);



    return (
        <Fragment>
            <p style={{fontSize: "smaller", textAlign: "center"}}>{currencyFormat + priceActual} </p>
        </Fragment>
    )
};

const ColoredLine = ({color}) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: "%1",
            width: "9%",
            marginLeft: "46%",
            marginTop: "0%",
            marginBottom: "0%",

        }}
    />
);


//https://bulma.io/documentation/columns/options/
const CardGrid = ({products, shoppingCartState}) => {
    return (
        <Column.Group multiline centered>
            {products.map((item) => <ShoppingCard key={item.sku} item={item} openCart={shoppingCartState.openCart} addToCart = {shoppingCartState.addToCart}
            />)}
        </Column.Group>
    );
};


export default CardGrid;