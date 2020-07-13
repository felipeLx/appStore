import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

const api = axios.create({
    baseURL: '/',
});

export function* initProductsSaga(action) {
    try{
        const response = yield api.get( '/api' );
        console.log(response);
        yield put(actions.setProducts(response.data));
    } catch(error) {
        yield put(actions.fetchProductsFailed());
    }
}

export function* productDetailSaga(action) {
    try{
        const response = yield api.get( '/api', action.userId );
        console.log(response);
        yield put(actions.setProducts(response.data));
    } catch(error) {
        yield put(actions.fetchProductsFailed());
    }
}