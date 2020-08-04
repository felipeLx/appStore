import React, { useEffect } from 'react';

import classes from './Order.module.css';

const order = React.memo(props => {
    const orders = [];
    console.log(props);
    const {products, total, userId} = props;
    
    useEffect(() => {
        populateOrders();
    }, []);

    const populateOrders = () =>{
        for(let product in products) {

            orders.push({
                    name: product.name,
                    total: total,
                    quantity: product.qty,
                    price: product.price,
                    id: Math.random()
            });
        };
    };

    const productOutput = orders.map(prod => {
        console.log(prod);
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}
            key={prod.id}>{prod.name} ({prod.price})</span>;
    });

    return (
        <div className={classes.Order}>
            <p>productos: {productOutput}</p>
            {/* <p>Total: <strong>R$ {Number.parseFloat( props.price ).toFixed( 2 )}</strong></p> */}
        </div>
    );
});

export default order;