import * as actionType from '../actions';

const inititalState = {
    orders: [],
    loading: false,
    purshased: false
}

const orderReducer = (state = inititalState, action) => {
    switch(action.type){
        case actionType.ORDER_PURCHASE_REDIRECT:
            return{
                ...state,
                purshased: false
            }
        case actionType.ORDER_PURCHASE_START:
            return{
                ...state,
                loading: true
            }
        case actionType.ORDER_PURCHASE_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return{
                ...state,
                loading: false,
                purshased: true,
                orders: state.orders.concat(newOrder)
            }
        case actionType.ORDER_PURCHASE_FAIL:
            return{
                ...state,
                loading: false
            }
        case actionType.FETCH_ORDER_START:
            return{
                ...state,
                loading: true
            }
        case actionType.FETCH_ORDER_SUCCESS:
            return{
                ...state,
                loading: false,
                orders: action.orders
            }
        case actionType.FETCH_ORDER_FAIL:
            return{
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default orderReducer;