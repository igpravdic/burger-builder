import React, { Component } from 'react';
import Order from '../../components/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import { connect } from 'react-redux';
import { fetchOrder } from '../../actions/action_order';
import Spinner from '../../components/Ui/Spinner';

class Orders extends Component{
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }
    render(){
        let orders = <Spinner />;
        if(!this.props.loading){
            orders = (
                <div style={{'display':'flex', 'padding': '0 15px'}}>
                    {this.props.orders.map( order => (
                        <Order 
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    ))}
                </div>
            )
        }
        return orders;
    }
}
const mapStateToProps = (state) => {
    return {
        orders: state.ord.orders,
        loading: state.ord.loading,
        token: state.aut.token,
        userId: state.aut.userId
    }
}
const mapDispatchToProps = dispatch => {
    return{
        fetchOrders: (token, userId) => dispatch(fetchOrder(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));