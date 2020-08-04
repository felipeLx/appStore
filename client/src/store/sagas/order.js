import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';


const api = axios.create({
    baseURL: '/orders',
    'Content-Type': 'application/json',
});

export function* purchaseProductSaga(action) {
    yield put( actions.purchaseProductStart() );

    const token = localStorage.getItem('token');
    const headers = {"Authorization" : `${token}`}

    try{
        yield api.post( '/', action.orderData, {headers} );
        yield put(actions.addItemToOrder( action.orderData ));
        } catch(error)  {
                yield put( actions.purchaseProductFail( error ) );
        } 
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const headers = {"Authorization" : `${token}`};
        try{
            const response = yield api.get(`/${userId}`, {headers} );
            yield put(actions.fetchOrdersSuccess(response.data.order));
        } catch(error) {
            yield put(actions.fetchOrdersFail(error));
          }
    } 