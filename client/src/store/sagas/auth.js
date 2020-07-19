import { put, call, delay } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

const api = axios.create({
    baseURL: '/'
});

const delayAsync = ms => new Promise(res => setTimeout(res, ms));

export function* logoutSaga(action) {
    yield call(delayAsync, 1000);
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "expirationDate");
    yield call([localStorage, 'removeItem'], "userId");
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga (action){
    yield delay(new Date().getTime() * 10000);
    yield put(actions.logout());
}

export function* registerUserSaga(action) {
    yield put(actions.signupStart());
        const authData = {
            username: action.username,
            email: action.email,
            password: action.password,
        };
        
        let url = '/users/signup';
        
        try{
            const response = api.post(url, authData); 
                // yield put(actions.checkAuthTimeout(expirationDate - new Date().getTime()));
                yield put(actions.signupSuccess(response.data._id, response.data.email));
        } catch(error) {
            console.log('not possible to auth: ' + error);
            yield put(actions.signupFail('error to signup!'));
        }
}

export function* loginUserSaga(action) {
    yield put(actions.authStart());

        const loginData = {
            email: action.email,
            password: action.password
        };
        
        let url = '/users/login';
        
        try{
            const response = api.post(url, loginData);

            if(response.email !== 'admin@admin.com') {
                yield put(actions.authSuccess(response._id, response.email));
            } else if (response.email === 'admin@admin.com') {
                yield put(actions.adminSuccess(response._id, response.email));
            } else {
                yield put(actions.authFail('no email was found!'));
            }
        } catch(error) {
                console.log('not possible to login: ' + error);
                yield put(actions.authFail('not possible to login!'));
            }                    
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
        if(!token) {
            yield put(actions.logout());
        } 
        else {
            // const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
            //     if(expirationDate <= new Date()) { yield put(actions.logout());}
            const userId = yield localStorage.getItem('userId');
                if(userId !== 'admin@admin.com') {
                    yield put(actions.authSuccess(token, userId));
                }
                if(userId === 'admin@admin.com') {
                    yield put(actions.adminSuccess(token, userId));
                }
                // yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
}

// export function* getAllSaga(action) {
//     try {
//         api.get(USERURL).then(handleResponse).then(response => response)
//     } catch(err) {
//         console.log('getAllSaga fail: ' + err);
        
//     }
// }

// const handleResponse = response => {
//     console.log(response);
//     return response.text()
//         .then(text => {
//             const data = text && JSON.parse(text);
//             if (!response.ok) {
//                 if (response.status === 401) {
//                     // auto logout if 401 response returned from api
//                     logoutSaga();
//                     window.location.reload(true);
//                 }
    
//                 const error = (data && data.message) || response.statusText;
//                 return Promise.reject(error);
//             }
    
//             return data;
//         });
// }
// export function* getUserSaga(action) {
//     yield put(actions.getUser());
//         const id =  yield localStorage.getItem('token');
//         let url = `/user/${id}`;

//         try{
//         const response = yield api.get(url);
//         console.log(response);
        
//         } catch(error) {
//                 console.log(error);
//             }        
// }

// export function* getAdminSaga(action) {
//     yield put(actions.adminCheckState());
//         const id = action.id;
//         const authData = {
//             username: action.username
//         };
//         let url = '/user/';

//         try{
//         const response = yield api.get(url + id, authData);
//             console.log(response);
            
//         } catch(error) {
//                 console.log(error);
//             }        
// }