import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary'; 
import ContactData from './ContactData';

class Checkout extends Component{
    //Old code
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()){
    //         if(param[0] === 'price'){
    //             price = param[1];
    //         }else{
    //             ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     this.setState({ingredients, totalPrice: price});
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        let summary = <Redirect to="/" />;
        if(this.props.ings){
            const purshasedRedirect = this.props.purshased ? <Redirect to="/" /> : null;
           
            summary = (
                <div>
                     {purshasedRedirect}
                    <CheckoutSummary 
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        ingredients={this.props.ings}/>
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData}/>
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return{
        ings: state.ing.ingredients,
        price: state.ing.totalPrice,
        purshased: state.ord.purshased
    }
}

export default connect(mapStateToProps)(Checkout);