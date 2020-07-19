import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: '' }
];

const buildControls = (props) => (
    <div>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                added={() => props.productAdded(ctrl.type)}
                removed={() => props.productRemoved(ctrl.type)}
                quantity={props.quantity}
                total={props.total}
                disabled={props.purchasable} 
            />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;