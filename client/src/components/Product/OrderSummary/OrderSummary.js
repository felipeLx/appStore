import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = props => (
            <>
                <h3>Carrinho de compras</h3>
                <p>Sua compra com os seguintes produtos:</p>
                <span style={{ textTransform: 'capitalize' }}>{props.products}</span>: {props.name}
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
            </>
);


export default orderSummary;