import React from 'react'
import {render, fireEvent, waitForElement} from '@testing-library/react'
import {SizeAndBuy} from "../CardGrid";


test('SizeAndBuy should open and add to the shopping cart if there is inventory',
    () => {
        const openCart = jest.fn();
        const addToCart = jest.fn();
        const item = {
            "sku": 12064273040195392,
            "title": "Cat Tee Black T-Shirt",
            "description": "4 MSL",
            "style": "Black with custom print",
            "price": 10.9,
            "currencyId": "USD",
            "currencyFormat": "$",
            "isFreeShipping": true
        };


        const itemsInCart = {
            "12064273040195392L": {numberSelected: 1, size: "L"},
            "51498472915966370M": {numberSelected: 1, size: "L"}
        };


        const inventory = {
            "12064273040195392": {
                "S": 0,
                "M": 0,
                "L": 2,
                "XL": 0
            },
            "51498472915966370": {
                "S": 0,
                "M": 2,
                "L": 3,
                "XL": 2
            },
            "10686354557628304": {
                "S": 1,
                "M": 2,
                "L": 2,
                "XL": 1
            },
            "11033926921508488": {
                "S": 3,
                "M": 2,
                "L": 0,
                "XL": 1
            },
            "39876704341265610": {
                "S": 2,
                "M": 0,
                "L": 0,
                "XL": 0
            },
            "10412368723880252": {
                "S": 3,
                "M": 2,
                "L": 2,
                "XL": 2
            },
            "8552515751438644": {
                "S": 2,
                "M": 0,
                "L": 0,
                "XL": 2
            },
            "18644119330491310": {
                "S": 3,
                "M": 3,
                "L": 2,
                "XL": 0
            },
            "11854078013954528": {
                "S": 1,
                "M": 1,
                "L": 1,
                "XL": 0
            },
            "876661122392077": {
                "S": 3,
                "M": 1,
                "L": 0,
                "XL": 1
            },
            "9197907543445676": {
                "S": 3,
                "M": 3,
                "L": 1,
                "XL": 2
            },
            "10547961582846888": {
                "S": 2,
                "M": 2,
                "L": 0,
                "XL": 0
            },
            "6090484789343891": {
                "S": 2,
                "M": 0,
                "L": 2,
                "XL": 3
            },
            "18532669286405344": {
                "S": 2,
                "M": 3,
                "L": 0,
                "XL": 2
            },
            "5619496040738316": {
                "S": 1,
                "M": 3,
                "L": 3,
                "XL": 2
            },
            "11600983276356164": {
                "S": 3,
                "M": 3,
                "L": 3,
                "XL": 1
            },
            "27250082398145996": {
                "S": 1,
                "M": 0,
                "L": 0,
                "XL": 2
            }
        };

        const {getByTestId} = render(<SizeAndBuy
            openCart={openCart}
            addToCart={addToCart}
            item={item}
            inventory={inventory}
            itemsInCart={itemsInCart}/>);

        // clicks the item size to select
        fireEvent.click(getByTestId("12064273040195392$L"));
        // adds to shopping cart
        fireEvent.click(getByTestId("addToShoppingCart"));


        expect(addToCart).toBeCalledWith(
            {
                "item": {
                    "currencyFormat": "$",
                    "currencyId": "USD",
                    "description": "4 MSL",
                    "isFreeShipping": true,
                    "price": 10.9,
                    "sku": 12064273040195392,
                    "style": "Black with custom print",
                    "title": "Cat Tee Black T-Shirt",
                },
                "size": "L",
            }
        );
        expect(openCart).toBeCalledWith();


    }
);

//data-testid={`item.sku/$${key}`}
//data-testid="addToShoppingCart"