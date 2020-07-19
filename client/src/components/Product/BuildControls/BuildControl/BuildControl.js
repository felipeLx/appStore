import React from 'react';

import classes from './BuildControl.module.css';

const buildControl = (props) => (
    <div className='card-body' style={{textAlign: 'center', display: 'flex'}}>
        <button 
            className={classes.Less} 
            onClick={props.removed} 
            disabled={props.disabled}>-</button>
        <button 
            className={classes.More} 
            onClick={props.added}>+</button>
        <div className={classes.DinamicFields}>
            <p><strong>Quantidade: {props.quantity}</strong></p>
            <p><strong>Total: R$ {props.total.toFixed(2)}</strong></p>
        </div>
    </div>
);

export default buildControl;