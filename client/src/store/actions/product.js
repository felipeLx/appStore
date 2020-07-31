import * as actionTypes from './actionTypes';


export const addToCart = (id, val) => {
   return {
       type: actionTypes.ADD_TO_CART,
        id,
        up: val
    }
};
  
export const removeToCart = (id, val) => {
    return{
        type: actionTypes.REMOVE_FROM_CART,
        id,
        down: val
    }
};
  
export const removeWholeItem = id => {
    return{
        type: actionTypes.REMOVE_WHOLE_ITEM,
        payload: id
    }
};

export const puchase = cart => {
    return {
        type: actionTypes.PURCHASE,
        cart,
    }
}

export const addProduct = ( name ) => {
    return {
        type: actionTypes.ADD_PRODUCT,
        productName: name
    };
};

export const removeProduct = ( name ) => {
    return {
        type: actionTypes.REMOVE_PRODUCT,
        productName: name
    };
};

export const setProducts = ( products ) => {
    return {
        type: actionTypes.SET_PRODUCTS,
        products: products
    };
};

export const openDetail = ( product ) => {
    return {
        type: actionTypes.OPEN_DETAIL,
        product: product
    };
};

export const fetchProductsFailed = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAILED
    };
};

export const initProducts = () => {
    return {
        type: actionTypes.INIT_PRODUCTS
    };
};