import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';


const api = axios.create({
    baseURL: '/orders',
    'Content-Type': 'application/json',
});

export function* purchaseProductSaga(action) {
    yield put( actions.purchaseProductStart() );
    const userId = action.userId;
    const tempQty = {qty: 1, total: action.orderData.price};
    const orderData = {...action.orderData, userId, ...tempQty };
    console.log(orderData);
    const token = localStorage.getItem('token');
    const headers = {"Authorization" : `${token}`}
    try{
        const response = yield api.post( '/', orderData, {headers} )
        yield put( actions.addItemToOrder( response.config.data.userId, orderData ) );
        } catch(error)  {
                yield put( actions.purchaseProductFail( error ) );
        } 
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const headers = {"Authorization" : `${token}`}
        try{
            const response = yield api.get(`/${userId}`, {headers} );
            console.log(response);
            const fetchedOrders = [];
                for ( let key in response.data ) {
                    fetchedOrders.push( {
                        ...response.data[key],
                        id: key
                    } );
                }
                yield put(actions.fetchOrdersSuccess(fetchedOrders));    
        } catch(error) {
            yield put(actions.fetchOrdersFail(error));
          }
    } 