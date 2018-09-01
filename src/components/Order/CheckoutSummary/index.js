import React from 'react';
import Burger from '../../Burger';
import Button from '../../Ui/Button';
import { CheckoutWrap } from './styles';

const checkoutSummary = (props) => {
    return(
        <CheckoutWrap>
            <h1>We hope it tastes well!</h1>
            <div style={{ width: '660px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                buttonClass="danger"
                clicked={props.checkoutCancelled}>Cancel</Button>
            <Button 
                buttonClass="success"
                clicked={props.checkoutContinued}>Continue</Button>
        </CheckoutWrap>
    );
}

export default checkoutSummary;