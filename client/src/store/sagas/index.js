import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionType from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga, loginUserSaga, getAdminSaga } from './auth';
import { initProductsSaga } from './productBuilder';
import { purchaseProductSaga, fetchOrdersSaga } from './order';   

export function* watchAuth() {
    yield all([
        takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionType.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionType.AUTH_USER, authUserSaga),
        takeEvery(actionType.LOGIN_USER, loginUserSaga),
        takeEvery(actionType.AUTH_CHECK_STATE, authCheckStateSaga),  
        takeEvery(actionType.ADMIN_CHECK_STATE, getAdminSaga),
    ]);
}

export function* watchProductBuilder() {
    yield takeEvery(actionType.INIT_PRODUCTS, initProductsSaga);
}

export function* watchOrder() {
    yield takeLatest(actionType.PURCHASE_PRODUCT, purchaseProductSaga);
    yield takeEvery(actionType.FETCH_ORDERS, fetchOrdersSaga);
}