import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = React.memo(props => {
    let resume = (
        props.products.map(res => {
            return (
                <p key={res._id} style={{ textTransform: 'capitalize' }}>
                R$ {res.products.total.toFixed(2)}: {res.products.name}</p>
            )}
        )
    );

    return(
        <>
            <h3>Carrinho de compras</h3>
            <p>Sua compra com os seguintes produtos:</p>

            <p>Continue to Checkout?</p>
            {resume} 
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </>
    );
});


export default orderSummary;