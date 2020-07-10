import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    products: null,
    totalPrice: 0,
    error: false,
    building: false
};

const PRODUCTS_PRICES = {
     borracha: 0.5
};

const addProduct = ( state, action ) => {
    const updatedProduct = { [action.productName]: state.products[action.productName] + 1 }
    const updatedProducts = updateObject( state.products, updatedProduct );
    const updatedState = {
        products: updatedProducts,
        totalPrice: state.totalPrice + PRODUCTS_PRICES[action.productName],
        building: true
    }
    return updateObject( state, updatedState );
};

const removeProduct = (state, action) => {
    const updatedProd = { [action.productName]: state.products[action.productName] - 1 }
    const updatedProds = updateObject( state.products, updatedProd );
    const updatedSt = {
        products: updatedProds,
        totalPrice: state.totalPrice - PRODUCTS_PRICES[action.productName],
        building: true
    }
    return updateObject( state, updatedSt );
};

const setProducts = (state, action) => {
    return updateObject( state, {
        products: {
            borracha: action.products.borracha
        },
        totalPrice: 0,
        error: false,
        building: false
    } );
};

const fetchProductsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_PRODUCT: return addProduct( state, action );
        case actionTypes.REMOVE_PRODUCT: return removeProduct(state, action);
        case actionTypes.SET_PRODUCTS: return setProducts(state, action);    
        case actionTypes.FETCH_PRODUCTS_FAILED: return fetchProductsFailed(state, action);
        default: return state;
    }
};

export default reducer;