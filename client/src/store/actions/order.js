import * as actionTypes from './actionTypes';

export const purchaseProductSuccess = ( id, orderData ) => {
    return {
        type: actionTypes.PURCHASE_PRODUCT_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const addItemToOrder = ( id, orderData, userId ) => {
    return {
        type: actionTypes.PURCHASE_PRODUCT,
        orderId: id,
        orderData: orderData,
        userId: userId
    };
};

export const purchaseProductFail = ( error ) => {
    return {
        type: actionTypes.PURCHASE_PRODUCT_FAIL,
        error: error
    };
}

export const purchaseProductStart = () => {
    return {
        type: actionTypes.PURCHASE_PRODUCT_START
    };
};

export const purchaseProduct = ( orderData, token ) => {
    return {
        type: actionTypes.PURCHASE_PRODUCT,
        orderData: orderData,
        token: token
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        token: token,
        userId: userId
    }
};