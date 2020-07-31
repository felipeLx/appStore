import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import Button from '../../UI/Button/Button';

const controls = [
    { label: '' }
];

const buildControls = (props) => (
    <div style={{padding: '10px'}}>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                // added={() => props.productAdded(ctrl.type)}
                // removed={() => props.productRemoved(ctrl.type)}
                // quantity={props.quantity}
                // total={props.total}
                disabled={props.purchasable} 
            />
        ))}
        <Button 
            btnType="Warning"
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuth ? ' ADICIONE AO CARRINHO' : ' LOGIN PARA COMPRAS'}</Button> 
    </div>
);

export default buildControls;