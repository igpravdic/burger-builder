import * as actionType from './index';
import axios from 'axios';

export const authStart = () => {
    return{
        type: actionType.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return{
        type: actionType.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return{
        type: actionType.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('localId');
    return {
        type: actionType.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}
export const auth = (email, password, isSignedUp) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAEzsu1NhHPR7C2gsWeilRT95A9r6nvVBM';
        if(!isSignedUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAEzsu1NhHPR7C2gsWeilRT95A9r6nvVBM';
        }
        axios.post(url, authData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('localId', response.data.localId);

            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return{
        type: actionType.AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate >= new Date()){
                const localId = localStorage.getItem('localId');
                dispatch(authSuccess(token,localId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout())
            }
        }
    }
}