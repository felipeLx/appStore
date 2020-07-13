import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const adminSuccess = (token,id) => {
    return {
        type: actionTypes.ADMIN_SUCCESS,
        token: token,
        userId: id
    };
};

export const authSuccess =  (token, id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: id
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSucceed = () => {
    return {type: actionTypes.AUTH_LOGOUT};
};

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
};

export const login = (email, password) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
    };
};

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    };
};

export const signup = (username, email, password) => {
    return {
        type: actionTypes.SIGNUP_USER,
        username: username,
        email: email,
        password: password
    }
};

export const setSignupRedirectPath = (path) => {
    return {
        type: actionTypes.SET_SIGNUP_REDIRECT_PATH,
        path: path
    }
};

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signupSuccess = (token, id) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        token: token,
        userId: id
    };
};

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    };
};