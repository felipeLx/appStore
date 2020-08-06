import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './Order.css';
import Modal from '../UI/Modal/Modal';
import OrderSummary from '../Product/OrderSummary/OrderSummary';
import * as actions from '../../store/actions/index';

const order = React.memo(props => {
    const [orders, setOrders] = useState([]);
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        setOrders(props.products);
    }, [props.products]);

    const lessQtyHandler = (event) => {
        event.preventDefault();
        const orderId = event.target.id;
        const orIndex = (element) => element._id === orderId;
        const index = orders.findIndex(orIndex);
        
        let items =[...orders];
        let item = {...items[index], qty: items[index].qty - 1, total: items[index].qty * items[index].price };
        items[index] = item;
        setOrders([...items]);
        props.onSubtractQuantity(orderId, 1);
    };


    const moreQtyHandler = (event) => {
        event.preventDefault();
        const orderId = event.target.id;
        const orIndex = (element) => element._id === orderId;
        const index = orders.findIndex(orIndex);
        
        let items =[...orders];
        let item = {...items[index], qty: items[index].qty + 1, total: items[index].qty * items[index].price};
        items[index] = item;
        setOrders([...items]);
        props.onAddQuantity(orderId, 1);
    };

    const removeFromOrderHandler = (event) => {
        event.preventDefault();
        const orderId = event.target.id;
        const prQty = orders.filter(or => {
            if(or._id === orderId) {
                return or.products.qty;
            }
        });
        const qty = prQty[0].products.qty;
        const productId = prQty[0].products._id;
        let items =orders.filter(or => or._id !== orderId);
        
        setOrders([...items]);
        props.onRemoveItem(orderId, qty, productId);
        
    };

    const checkoutHandler = event => {
        event.preventDefault();
        setPurchasing(true);
    }
 
    let orderSummary = null;

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        let userId = localStorage.getItem('userId');
        props.onConfirmOrder(userId, orders);
        window.location.assign(`/orders/checkout/${userId}`);
    }
 
    const productOutput = orders.map(prod => {
        const products = [...orders];
        orderSummary = <OrderSummary
                products={products}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler} />;
        
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
        <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
            {orderSummary}
        </Modal>
            <button type='button' onClick={checkoutHandler}>CHECK OUT</button>
        </div>
    );
});


const mapDispatchToProps = dispatch => {
    return {
        onAddQuantity: (id, val)=> dispatch(actions.addToCart(id, val)),
        onSubtractQuantity: (id, val)=> dispatch(actions.removeToCart(id, val)),
        onRemoveItem: (id, quantity, productId)=> dispatch(actions.removeWholeItem(id, quantity, productId)),
        onConfirmOrder: (userId, orderData) => dispatch(actions.confirmOrEditOrder(userId, orderData)),
    };
};

export default connect(null, mapDispatchToProps) (order);