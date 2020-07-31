import React from 'react';

import classes from './BuildControl.module.css';

const buildControl = (props) => {
    const {products} = props;
    // console.log(products); 
    return (
    <div>
        {/* <button 
            className={classes.Less} 
            onClick={props.removed} 
            disabled={props.disabled}>-</button>
        <button 
            className={classes.More} 
            onClick={props.added}>+</button>
        <div className={classes.DinamicFields}>
            <div>
                <p><strong>Quantidade: {props.quantity}</strong></p>
            </div>
            <div>
                <p><strong>Total: R$ {props.total.toFixed(2)}</strong></p>
            </div>
        </div> */}
    </div>
    )
    };

export default buildControl;