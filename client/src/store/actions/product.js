import * as actionTypes from './actionTypes';


export const addToCart = (item, i) => ({
    type: actionTypes.ADD_TO_CART,
    payload: item,
    index: i
  });
  
  export const removeFromCart = item => ({
    type: actionTypes.REMOVE_FROM_CART,
    payload: item
  });
  
  export const removeWholeItem = item => ({
    type: actionTypes.REMOVE_WHOLE_ITEM,
    payload: item
  })

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