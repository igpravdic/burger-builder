import * as actionType from './index';
import axios from '../axios-orders';

export const orderPurchaseSuccess = (id, orderData) => {
    return{
        type: actionType.ORDER_PURCHASE_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const orderPurchaseFail = (error) => {
    return{
        type: actionType.ORDER_PURCHASE_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionType.ORDER_PURCHASE_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
        .then(response => {
            // this.setState({ loading: false})
            // this.props.history.push('/');
            console.log(response.data)
            dispatch(orderPurchaseSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(orderPurchaseFail(error));
        });
    }
}

export const orderPurchaseRedirect = () => {
   return {
       type: actionType.ORDER_PURCHASE_REDIRECT
   }
}

export const fetchOrderStart = () => {
    return {
        type: actionType.FETCH_ORDER_START
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionType.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return{
        type: actionType.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrder = () => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
        .then(res => {
            //console.log(res.data);
            const fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            //console.log(fetchedOrders);
            dispatch(fetchOrderSuccess(fetchedOrders));
        })
        .catch(err => {
            dispatch(fetchOrderFail(err));
        })
    }
}