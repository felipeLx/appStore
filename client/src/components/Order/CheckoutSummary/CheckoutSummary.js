import React from 'react';
import { Button } from 'react-bootstrap';

import Product from '../../Product/Product';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Product products={props.products}/>
            </div>
            <Button 
                className="btn btn-danger"
                clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button 
                className="btn btn-primary"
                clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;