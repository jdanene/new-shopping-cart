import 'rbx/index.css';
import {Button, Container, Tile, Title, Tag, Media, Card, Column, Image, Box, Notification} from 'rbx';
import React, {Fragment} from "react";

const SHIRT_SIZES = ['S', 'M', 'L', 'XL'];

const SizeButtons = () => {
    return (
        <Fragment>

            <Button.Group size="small">
                <span> Sizes: </span>
                <Button>S</Button>
                <Button>M</Button>
                <Button>L</Button>
                <Button>XL</Button>
            </Button.Group>
        </Fragment>);
};

const ProductTitle = ({title}) => {
    return (
        <Fragment>
            <p style={{fontSize: "smaller", textAlign: "center"}}>{title} </p>
        </Fragment>
    );
};

const ProductDescription = ({description}) => {
    let actualDescription = (description==="")? "": "Description: "+description;
    return (
        <Fragment>
            <p style={{fontSize: "smaller", textAlign: "center"}}>{actualDescription} </p>
        </Fragment>
    )

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

const ShoppingCard = ({title, sku, price, currencyFormat, description}) => {
    return (
        <Column size="one-third">
            <ProductImg sku={sku}/>
            <ProductTitle title={title}/>
            <ColoredLine color="orange"/>
            <Price price={price} currencyFormat={currencyFormat}/>
            <ProductDescription description={description}/>
            <SizeButtons/>
        </Column>
    );
};

const Price = ({price, currencyFormat, currencyId}) => {
    const pattern = /(?<dollars>[0-9]+)\.(?<cents>[0-9]+)/;
    const match = pattern.exec(price);
    let priceActual;

    if (match) {
        console.log(match.groups.cents, match.groups.dollars)
        let cents = match.groups.cents.length > 1 ? match.groups.cents : match.groups.cents + "0";
        priceActual = match.groups.dollars + "." + cents;
    } else {
        priceActual = price + ".00";
    }

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
const CardGrid = ({products}) => {
    return (
        <Column.Group multiline vcentered desktop mobile>
            {products.map(({title, sku, price, currencyFormat, description}) => <ShoppingCard key={sku} title={title}
                                                                                              sku={sku} price={price}
                                                                                              currencyFormat={currencyFormat}
                                                                                              description={description}/>)}
        </Column.Group>
    );
};


export default CardGrid;