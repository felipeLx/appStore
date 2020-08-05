import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './Order.css';
import * as actions from '../../store/actions/index';

const order = React.memo(props => {
    const [orders, setOrders] = useState([]);
    const [enable, setEnable] = useState(true);

    useEffect(() => {
        setOrders(props.products);
    }, []);

    const lessQtyHandler = (event) => {
        event.preventDefault();
        const orderId = event.target.id;
        const orIndex = (element) => element._id === orderId;
        const index = orders.findIndex(orIndex);
        
        let items =[...orders];
        let item = {...items[index], qty: items[index].qty - 1, total: items[index].qty * items[index].price };
        items[index] = item;
        setOrders([...items]);
        console.log(orders);
        props.onSubtractQuantity(orderId, 1);
    };


    const moreQtyHandler = (event) => {
        event.preventDefault();
        const orderId = event.target.id;
        const orIndex = (element) => element._id === orderId;
        const index = orders.findIndex(orIndex);
        
        let items =[...orders];
        let item = {...items[index], qty: items[index].qty + 1};
        items[index] = item;
        setOrders([...items]);
        console.log(orders);
        props.onAddQuantity(orderId, 1);
    };

    const removeFromOrderHandler = (event) => {
        event.preventDefault();
        const orderId = event.target.id;
        const orIndex = (element) => element._id === orderId;
        const index = orders.findIndex(orIndex);

        let items =orders.filter(or => or._id !== orderId);
        
        setOrders([...items]);
        props.onRemoveItem(orderId);
        
    };
 
    const productOutput = orders.map(prod => {
        return <div key={prod._id}>
            <div className='col resume'>
                <p><strong>Nome: </strong>{prod.products.name}</p>
                <p><strong>Preço: </strong>{prod.products.price.toFixed(2)}</p>
                <p><strong>Quantidade: </strong>{prod.products.qty}</p>
                <button type='button' id={prod._id} className='btn btn-sm btn-info' onClick={lessQtyHandler} >-</button>
                <button type='button' id={prod._id} className='btn btn-sm btn-warning' onClick={moreQtyHandler}>+</button>
                <p><strong>Total: </strong>{prod.products.total.toFixed(2)}</p>
                <hr row='2' />
                <button type='button' id={prod._id} className='btn btn-md btn-danger' style={{borderRadius: '100%'}} onClick={removeFromOrderHandler}>X</button>
            </div>
            </div>
    });

    return (
        <div className='row order'>
                {productOutput}
            <button>CHECK OUT</button>
        </div>
    );
});


const mapDispatchToProps = dispatch => {
    return {
        onAddQuantity: (id, val)=> dispatch(actions.addToCart(id, val)),
        onSubtractQuantity: (id, val)=> dispatch(actions.removeToCart(id, val)),
        onRemoveItem: (id)=> dispatch(actions.removeWholeItem(id)),
    };
};

export default connect(null, mapDispatchToProps) (order);