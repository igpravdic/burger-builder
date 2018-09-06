import React, { Component }from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../Ui/Button';

class OrderSummary extends Component {
    componentWillUpdate(){
        //console.log('[OrderSummery] WillUpdate');
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}: {this.props.ingredients[igKey]}</span></li>;
        });
        return(
            <Aux>
                <h3>Your order:</h3>
                <p>A delicious burger with falowing ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <h3><strong>Total: {this.props.total.toFixed(2)}</strong></h3>
                <Button 
                    clicked={this.props.purchaseCancelled}
                    buttonClass="danger">CANCEL</Button>
                <Button 
                    clicked={this.props.purchaseContinued}
                    buttonClass="success">CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary;