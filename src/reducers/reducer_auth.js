import * as actionType from '../actions';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionType.AUTH_START:
            return{
                ...state,
                loading: true,
                error: null
            }
        case actionType.AUTH_SUCCESS:
            return{
                ...state,
                token: action.idToken,
                userId: action.userId,
                loading: false,
                error: null
            }
        case actionType.AUTH_FAIL:
            return{
                ...state,
                loading: false,
                error: action.error
            }
        case actionType.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        case actionType.AUTH_REDIRECT_PATH:
            return{
                ...state,
                authRedirectPath: action.path
            }
        default:
            return state;
    }
}

export default reducer;