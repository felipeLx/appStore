import { delay } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';
// import { loginUser } from '../../api';

const api = axios.create({
    baseURL: '/',
});

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "expirationDate");
    yield call([localStorage, 'removeItem'], "username");
    yield call([localStorage, 'removeItem'], "email");
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga (action){
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
        const authData = {
            username: action.username,
            email: action.email,
            password: action.password,
            password2: action.password2,
        };
        
        let url = '/user/auth';
        
        try{
        const response = yield api.post(url, authData);
            console.log(response);
            
            const expirationDate = yield new Date().getTime() * 10000;
            yield localStorage.setItem('token', response.data._id);
            yield localStorage.setItem('expirationDate', expirationDate);
            yield localStorage.setItem('username', response.data.username);
            yield put(actions.authSuccess(response.data._id, response.data.username));
            yield put(actions.checkAuthTimeout(expirationDate - new Date().getTime()));
            console.log('Register successfully!');

            } catch(error) {
                console.log('not possible to auth: ' + error);
                yield put(actions.authFail(error.response.data.error));
            }        
}

export function* loginUserSaga(action) {
    yield put(actions.authStart());
        
        const loginData = {
            email: action.email,
            password: action.password,
        };
            let url = '/user/login';
        
        try{
            const response = yield api.post(url, loginData);
            console.log(response);
            
            const expirationDate = yield new Date().getTime() * 10000;
            yield localStorage.setItem('token', response.data._id);
            yield localStorage.setItem('expirationDate', expirationDate);
            yield localStorage.setItem('username', response.data.username);
            yield put(actions.authSuccess(response.data._id, response.data.username));
            yield put(actions.checkAuthTimeout(expirationDate - new Date().getTime()));
            
            console.log('token: ' + localStorage.getItem('token') + ' ' + 
                        'expirationDate: ' + localStorage.getItem('expirationDate') + 
                        'username: ' + localStorage.getItem('username'));

            console.log('Login successfully!');
            
        } catch(error) {
                console.log('not possible to login: ' + error);
                yield put(actions.authFail(error.response.data.error));
            }        
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
        if(!token) {
            yield put(actions.logout());
        } else {
            const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                yield put(actions.logout());
            } else {
                const username = yield localStorage.getItem('username');
                yield put(actions.authSuccess(token, username));
                yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
}

export function* getUserSaga(action) {
    yield put(actions.getUser());
        const id =  yield localStorage.getItem('token');
        let url = `/user/${id}`;

        try{
        const response = yield api.get(url);
        console.log(response);
        
        } catch(error) {
                console.log(error);
            }        
}

export function* getAdminSaga(action) {
    yield put(actions.adminCheckState());
        const id = action.id;
        const authData = {
            username: action.username
        };
        let url = '/user/';

        try{
        const response = yield api.get(url + id, authData);
            console.log(response);
            
        } catch(error) {
                console.log(error);
            }        
}