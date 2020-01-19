import 'rbx/index.css';
import {Button, Container, Title, Media, Card, Content, Image} from 'rbx';
import React, {Fragment} from "react";


const ProductTitle = ({title}) => {
    return (
        <Fragment>
            <p style={{fontSize: "smaller"}}>{title} </p>
        </Fragment>
    );
};


const ProductImg = ({sku}) => {
    return (
        <Image.Container>
            <Image
                src={`data/products/${sku}_2.jpg`}
            />
        </Image.Container>
    );
};

const ShoppingCard = ({title, sku}) => {
    return (
        <div style={{width: "20vw", height: "50vh", backgroundColor: 'powderblue'}}>
            <Card >
                <div>
                    <Card.Image>
                        <Image.Container size="4by2">
                            <ProductImg sku={sku}/>
                        </Image.Container>
                    </Card.Image>
                </div>

                        <Card.Content>

                            <Content>
                                <ProductTitle title={title}/> <br/>
                                <a href="#css">#css</a> <a href="#responsive">#responsive</a>
                                <br/>
                                <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                            </Content>
                        </Card.Content>
            </Card>
        </div>
);

};

//https://bulma.io/documentation/columns/options/
const CardGrid = ({products}) => {
    return (
    <Container>
    {products.map(({title, sku}) => <ShoppingCard key={sku} title={title} sku={sku}/>)}
    </Container>
    );
};

export default CardGrid;