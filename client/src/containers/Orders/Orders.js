import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from 'axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const api = axios.create({
    baseURL: '/'
});

const Orders = props => {
    const {token, userId, onFetchOrders} = props;
    useEffect(() => {
        onFetchOrders(token, userId);
    },[onFetchOrders, token, userId]);
    
        let orders = <Spinner />;
        if ( !props.loading ) {
            orders = props.orders.map( order => (
                <Order
                    key={order.id}
                    products={order.products}
                    price={order.price} />
            ) )
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
        token: state.auth.token || state.sigunp.token,
        userId: state.auth.userId|| state.sigunp.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch( actions.fetchOrders(token, userId) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Orders, api ) );