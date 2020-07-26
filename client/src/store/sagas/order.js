import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';

const api = axios.create({
    baseURL: '/',
    
});

export function* purchaseProductSaga(action) {
    yield put( actions.purchaseProductStart() );
    console.log(action);

    try{
        const response = yield api.post( '/', action.orderData )
        //console.log( response.data );
        yield put( actions.purchaseProductSuccess( response.data.name, action.orderData ) );
        } catch(error)  {
                yield put( actions.purchaseProductFail( error ) );
        } 
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
        const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        try{
            const response = yield api.get( '/orders.json' + queryParams );
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