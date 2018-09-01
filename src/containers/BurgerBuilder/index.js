import React, { Component } from 'react';
import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger';
import BurgerControls from '../../components/Burger/BuildControls'
import Modal from '../../components/Ui/Modal'
import OrderSummary from '../../components/Burger/OrderSummary'
import Spinner from '../../components/Ui/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 1.5,
    meat: 2.5,
    bacon: 1.5
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
        purchaseable: false,
        modalOpen: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        axios.get('/ingredients.json')
        .then(response => {
            //console.log(response);
            this.setState({ ingredients: response.data })
        })
        .catch( error => {
            this.setState( { error: true })
        })
    }
    updatePurchaseState (ingredients){
    
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el
        },0)
        this.setState({ purchaseable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);

    } 
    deleteIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        if(updatedCount >= 0){
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = updatedCount;
            const priceDediction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDediction;

            this.setState({ totalPrice: newPrice, ingredients: updatedIngredients }); 
            this.updatePurchaseState(updatedIngredients);
        }
    } 

    modalHendler = () => {
        this.setState({ modalOpen: !this.state.modalOpen })
    }
    purchaseContinued = () => {
        // //alert('Continue');

        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //console.log(disabledInfo);
        let modalContent = null;
        if(this.state.ingredients){
            modalContent = <OrderSummary 
            total={this.state.totalPrice}
            purchaseCancelled={this.modalHandler}
            purchaseContinued={this.purchaseContinued}
            ingredients={this.state.ingredients}/>;
        }
        
        if(this.state.loading){
            modalContent = <Spinner />;
        }
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BurgerControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.deleteIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.modalHendler}
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

export default BurgerBuilder;