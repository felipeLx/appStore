import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    products: [],
    product: '',
    totalPrice: 0,
    quantityPerId: [],
    error: false,
    building: false
};

const addProduct = ( state, action ) => {
    const updatedProduct = { [action.productName]: state.products[action.productName] + 1 }
    const updatedProducts = updateObject( state.products, updatedProduct );
    const updatedState = {
        products: updatedProducts,
        quantity: action.quantity + 1,
        totalPrice: state.totalPrice + state.products.price[action.productName],
        building: true
    }
    return updateObject( state, updatedState );
};

const removeProduct = (state, action) => {
    const updatedProd = { [action.productName]: state.products[action.productName] - 1 }
    const updatedProds = updateObject( state.products, updatedProd );
    const updatedState = {
        products: updatedProds,
        quantity: action.quantity - 1,
        totalPrice: state.totalPrice - state.products.price[action.productName],
        building: true
    }
    return updateObject( state, updatedState );
};

const setProducts = (state, action) => {
    return updateObject( state, {
        products: {
            products: action.products
        },
        totalPrice: 0,
        error: false,
        building: false
    });
};

const openDetail = (state, action) => {
    return updateObject(state, {
        product: action.product
    })
}

const fetchProductsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};



const addToCart = (state, action) => {
    let itemFound = '';
    let index = '';
    if(state.quantityPerId.length > 0) {
        itemFound = state.quantityPerId.map(item => {
            if(item.id === action.id) {
                item.quantity += action.up;
                }})
    } else {
        state.quantityPerId.push({ id: action.id, quantity: action.up})
    }
    return updateObject(state, {});
} 
  
const removeToCart = (state, action) => {
    if(state.quantityPerId.length > 0) {
        state.quantityPerId.map((item, index) => {
            if(item.id === action.id && item.quantity >= 0) {
                item.quantity -= action.down;
            } 
            if(item.quantity === 0) {
                removeWholeItem(state, index);
            }
        })
    } 
    return updateObject(state, {});
};

const removeWholeItem = (state, index) => {
    state.quantityPerId.splice(index, 1);
    return updateObject(state, {quantityPerId: {}})
};

const purchase = (state, action) => {
    const ids = action.cart.map(item => item.id);
      return Object.assign([], state.map(item => {
        if(ids.includes(item.id)){
          item.inventory -= action.cart.filter(p => p.id === item.id)[0].quantity;
        }
        return item;
      }))
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_PRODUCT: return addProduct( state, action );
        case actionTypes.REMOVE_PRODUCT: return removeProduct(state, action);
        case actionTypes.SET_PRODUCTS: return setProducts(state, action);    
        case actionTypes.OPEN_DETAIL: return openDetail(state, action);    
        case actionTypes.FETCH_PRODUCTS_FAILED: return fetchProductsFailed(state, action);
        case actionTypes.ADD_TO_CART: return addToCart(state, action);
        case actionTypes.REMOVE_FROM_CART: return removeToCart(state, action);
        case actionTypes.REMOVE_WHOLE_ITEM: return removeWholeItem(state, action);
        case actionTypes.PURCHASE: return purchase(state, action);
        default: return state;
    }
};

export default reducer;