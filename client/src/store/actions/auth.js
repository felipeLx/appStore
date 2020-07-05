import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        error: error
    };
};

export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
}


export const getUser = (userId) => {
    return {
        type: actionTypes.GET_SUCCESS,
        userId: userId
    };
};

export const logoutSucceed = () => {
    return {type: actionTypes.AUTH_LOGOUT};
};

export const checkAuthTimeout = (expirationTime) => {
    // return dispatch => {
    //     setTimeout(() => {  
    //         dispatch(this.logout()); 
    //     }, expirationTime * 1000);
    // };
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
};

export const auth = (username, email, password, password2, isSignUp) => {
    return {
        type: actionTypes.AUTH_USER,
        username: username,
        email: email,
        password: password,
        password2: password2,
        isSignUp: isSignUp
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    };
};