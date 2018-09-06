import React from 'react';
import BuildControl from './BuildControl'
import { BuildControlsWrap, OrderButton } from './styles';

const BuildControls = (props) => {

    const controls = [
        {label: 'Salad', type: 'salad'},
        {label: 'Meat', type: 'meat'},
        {label: 'Cheese', type: 'cheese'},
        {label: 'Bacon', type: 'bacon'}
    ]
    return (
        <BuildControlsWrap>
            <p>Current price: <strong>{ props.price.toFixed(2) }</strong></p>
            {controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    added={() => props.ingredientAdded(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                    />
            ))}
            <OrderButton disabled={!props.purchaseable} onClick={props.ordered}>{props.isAuth ? 'Order now' : 'Sign In'}</OrderButton>
        </BuildControlsWrap>  
    )
}

export default BuildControls;