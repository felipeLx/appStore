import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loggedIn: false,
    registering: false
};

const signupStart = (state, action) => {
    return updateObject(state, { registering: true });
};

const signupSuccess = (state, action) => {
    return updateObject(state, {});
};

const signupFail = (state, action) => {
    return updateObject(state, {});
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_START: return signupStart(state, action);
        case actionTypes.SIGNUP_SUCCESS: return signupSuccess(state, action);
        case actionTypes.SIGNUP_FAIL: return signupFail(state, action);
        default:
            return state;           
    }
};

export default reducer;