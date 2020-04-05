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

export const purchaseBurger = (token, orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
            // this.setState({ loading: false})
            // this.props.history.push('/');
            //console.log(response.data)
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

export const fetchOrder = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"';
        axios.get('/orders.json' + queryParams)
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

export const deleteOrderStart = () => {
    return {
        type: actionType.DELETE_ORDER_START
    }
}

export const deleteOrderFail = (error) => {
    return {
        type: actionType.DELETE_ORDER_START,
        error: error
    }
}

export const deleteOrderSuccess = (deletedOrderItem) => {
    return {
        type: actionType.DELETE_ORDER_SUCCESS,
        delOrderItem: deletedOrderItem
    }
}

export const deleteOrder = (token, orderId, userId) => {
    return dispatch => {
       dispatch(deleteOrderStart())
       //Get object
       const queryDelParams = '?auth=' + token + '&orderBy="$key"&equalTo="' + orderId +'"';
       axios.get('/orders.json' + queryDelParams)
       .then(res => {
           for(let key in res.data){
                axios.delete('/orders/' + key+ '.json?auth=' + token)
                .then(res => {
                    //console.log('done')
                })
                .catch(err => {
                    dispatch(deleteOrderFail(err));
                })
           }
           const deletedOrderItem = [];
            for(let key in res.data){
                deletedOrderItem.push({
                    ...res.data[key],
                    id: key
                })
            }
           dispatch(deleteOrderSuccess(deletedOrderItem));
       })
       .catch(err => {
           dispatch(deleteOrderFail(err));
       })

       //dispatch(fetchOrder(token, userId));
       
    }
}