import 'rbx/index.css';
import {Button, Container, Tile, Title, Tag, Media, Card, Column, Image, Box, Notification,Dropdown,Icon,Generic} from 'rbx';
import React, {Fragment, useState} from "react";
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const SHIRT_SIZES = ['S', 'M', 'L', 'XL'];

const SizeButtons = () => {
    const [size, setSize] = useState(null);

    const onClick = (newSize) =>{
        console.log(newSize);


        setSize(newSize)

    };



    return (
        <div style={{width:'90%', borderColor:"black" }}>
            <Dropdown>
                <div style={{width: "90%", height: "20px",padding: "1px"}}>

                <Dropdown.Trigger>
                    <Button>
                        <span><small>
                            {(size===null)? "Select Size": `   ${size}   `}

                        </small></span>
                        <Icon size="small">
                            <FontAwesomeIcon icon={faAngleDown} />
                        </Icon>
                    </Button>
                </Dropdown.Trigger>
                </div>

                <Dropdown.Menu>
                    <Dropdown.Content>
                        <Dropdown.Item onClick={()=>onClick("S")}>S</Dropdown.Item>
                        <Dropdown.Item onClick={()=>onClick("M")}>M</Dropdown.Item>
                        <Dropdown.Item onClick={()=>onClick("L")}>L</Dropdown.Item>
                        <Dropdown.Item onClick={()=>onClick("XL")}>XL</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Menu>
            </Dropdown>
        </div>);
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

            <Generic
                style={{ cursor: description===""? 'default': 'pointer'}}
                color="primary"
                       tooltip={description}
                       tooltipPosition="top"
                       tooltipResponsive={{ desktop: 'bottom' }}>
            <ProductTitle title={title}/>
            <ColoredLine color="orange"/>
            <Price price={price} currencyFormat={currencyFormat}/>
            </Generic>
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
        <Column.Group multiline centered >
            {products.map(({title, sku, price, currencyFormat, description}) => <ShoppingCard key={sku} title={title}
                                                                                              sku={sku} price={price}
                                                                                              currencyFormat={currencyFormat}
                                                                                              description={description}/>)}
        </Column.Group>
    );
};


export default CardGrid;