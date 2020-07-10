import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionType from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authCheckStateSaga, loginUserSaga, registerUserSaga } from './auth';
import { initProductsSaga } from './product';
import { purchaseProductSaga, fetchOrdersSaga } from './order';   

export function* watchAuth() {
    yield all([
        takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionType.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionType.AUTH_USER, loginUserSaga),
        takeEvery(actionType.SIGNUP_USER, registerUserSaga),
        // takeEvery(actionType.AUTH_CHECK_STATE, authCheckStateSaga)  
    ]);
}

export function* watchProductBuilder() {
    yield takeEvery(actionType.INIT_PRODUCTS, initProductsSaga);
}

export function* watchOrder() {
    yield takeLatest(actionType.PURCHASE_PRODUCT, purchaseProductSaga);
    yield takeEvery(actionType.FETCH_ORDERS, fetchOrdersSaga);
}