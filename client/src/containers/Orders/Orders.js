import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from 'axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {
    const {userId} = props;

    useEffect(() => {
        showOrderFromUser(userId)
    },);
    
    const showOrderFromUser = async(userId) => {
        try{
            await props.onFetchOrders(userId);
        } catch(err) {
            console.log(err);
        }
    };

        let orders = <Spinner />;
        if ( props.orders.length > 0 ) {
            orders = props.orders.map( order => (
                <Order
                    key={order._id}
                    products={order.products}
                    total = {order.total}
                    userId = {order.userId}
                 />
             ))
        }
        return (
            <div>
                {orders}
                
            </div>
        );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        userId: state.auth.userId|| state.sigunp.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (userId) => dispatch( actions.fetchOrders(userId) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Orders, axios ) );