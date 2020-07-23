import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment';

import authService from '../../api/authService';
import * as actions from '../actions/index';

const api = axios.create({
    baseURL: '/users'
});

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "expirationDate");
    yield put(actions.logoutSucceed());
}

export function* getExpiration (action){
    const expiration = yield call(localStorage.getItem('expirationDate'));
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
}

export function* isLoggedIn() {
    return yield call(moment().isBefore(getExpiration()) ? true : logoutSaga());
}

export function* isLoggedOut() {
    return yield call(!isLoggedIn());
}


export function* registerUserSaga(action) {
    yield put(actions.signupStart());
        const authData = {
            username: action.username,
            email: action.email,
            password: action.password,
        };

        const headers = {
            'Content-Type': 'application/json'
        };
        
        let url = '/signup';
        
        try{
            const response = api.post(url, authData, {headers: headers});

            console.log(response);            
            // const idToken = localStorage.getItem("token");
            // if (idToken) {
            //     const cloned = req.clone({
            //         headers: req.headers.set("Authorization", idToken)
            //     })
            // }

                // yield put(actions.checkAuthTimeout(expirationDate - new Date().getTime()));
                // yield put(actions.signupSuccess(response.data.expiresIn, response.data.email));
        } catch(error) {
            console.log('not possible to auth: ' + error);
            yield put(actions.signupFail('error to signup!'));
        }
}

export function* loginUserSaga(action) {
    yield put(actions.authStart());

        const loginData = {
            username: action.username,
            password: action.password
        };
        
        const headers = {
            'Content-Type': 'application/json'
        };

        let url = '/login';
        
        // try{
            const response = api.post(url, loginData, {headers: headers});
            console.log(response);
            authService.setLocalStorage(response);

            if(response.email !== 'admin@admin.com') {
                yield put(actions.authSuccess(response._id, response.email));
            } else if (response.email === 'admin@admin.com') {
                yield put(actions.adminSuccess(response._id, response.email));
            } else {
                yield put(actions.authFail('no email was found!'));
            }
        // } catch(error) {
        //         console.log('not possible to login: ' + error);
        //         yield put(actions.authFail('not possible to login!'));
        //     }                    
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
        if(!token) {
            yield put(actions.logout());
        } 
}