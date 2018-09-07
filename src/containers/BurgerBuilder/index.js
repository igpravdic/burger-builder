import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import { connect } from 'react-redux';

import Burger from '../../components/Burger';
import BurgerControls from '../../components/Burger/BuildControls'
import Modal from '../../components/Ui/Modal'
import OrderSummary from '../../components/Burger/OrderSummary'
import Spinner from '../../components/Ui/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';

import { addIngredient, removeIngredient, initIngredients } from '../../actions/action_burger';
import { orderPurchaseRedirect } from '../../actions/action_order';
import { setAuthRedirectPath } from '../../actions/action_auth';


export class BurgerBuilder extends Component {
    state = {
        modalOpen: false,
        loading: false
    }
    componentDidMount() {
        this.props.onInitIngredients();
    }
    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el
        },0)
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);

    // } 
    // deleteIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount - 1;
    //     if(updatedCount >= 0){
    //         const updatedIngredients = {
    //             ...this.state.ingredients
    //         }
    //         updatedIngredients[type] = updatedCount;
    //         const priceDediction = INGREDIENT_PRICES[type];
    //         const oldPrice = this.state.totalPrice;
    //         const newPrice = oldPrice - priceDediction;

    //         this.setState({ totalPrice: newPrice, ingredients: updatedIngredients }); 
    //         this.updatePurchaseState(updatedIngredients);
    //     }
    // } 

    modalHendler = () => {
        if(this.props.isAuthenticated){
            this.setState({ modalOpen: !this.state.modalOpen })
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
    }
    purchaseContinued = () => {
        // //alert('Continue');

        // const queryParams = [];
        // for (let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.props.price);
        // const queryString = queryParams.join('&');
        this.props.onPurchaseRedirect();
        this.props.history.push({
            pathname: '/checkout',
            // search: '?' + queryString
        });
    }
    render () {
        
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //console.log(disabledInfo);
        let modalContent = null;
        if(this.props.ings){
            modalContent = <OrderSummary 
            total={this.props.price}
            purchaseCancelled={this.modalHandler}
            purchaseContinued={this.purchaseContinued}
            ingredients={this.props.ings}/>;
        }
        
        if(this.state.loading){
            modalContent = <Spinner />;
        }
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BurgerControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.modalHendler}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>    
            )
        }
        return(
            <Aux>
                <Modal hideModal={this.modalHendler} showModal={this.state.modalOpen}>
                    {modalContent}
                </Modal>
                {burger}
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return{
        ings: state.ing.ingredients,
        price: state.ing.totalPrice,
        error: state.ing.error,
        purchased: state.ord.purchased,
        isAuthenticated: state.aut.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
        onInitIngredients: () => dispatch(initIngredients()),
        onPurchaseRedirect: () => dispatch(orderPurchaseRedirect()),
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));