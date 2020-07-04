import React from 'react';

import classes from './Order.module.css';

const order = props => {
    const orders = [];

    for ( let productName in props.products ) {
        orders.push(
            {
                name: productName,
                amount: props.products[productName]
            }
        );
    }

    const productOutput = orders.map(prod => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}
            key={prod.name}>{prod.name} ({prod.price})</span>;
    });

    return (
        <div className={classes.Order}>
            <p>productos: {productOutput}</p>
            <p>Total: <strong>R$ {Number.parseFloat( props.price ).toFixed( 2 )}</strong></p>
        </div>
    );
};

export default order;