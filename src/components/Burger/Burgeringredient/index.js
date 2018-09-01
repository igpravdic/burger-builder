import React, { Component } from 'react';
import { BreadTop, BreadBottom, Seeds1, Seeds2, Meat, Cheese, Salad, Bacon } from './styles';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {

    render(){
        let ingredient = null;
        switch(this.props.type){
            case ('bread-bottom'):
                ingredient = <BreadBottom/>;
                break;
            case ('bread-top'):
                ingredient = <BreadTop><Seeds1/><Seeds2/></BreadTop>;
                break;
            case ('meat'):
                ingredient = <Meat/>;
                break;
            case ('cheese'):
                ingredient = <Cheese/>;
                break;            
            case ('salad'):
                ingredient = <Salad/>;
                break;
            case ('bacon'):
                ingredient = <Bacon/>;
                break;
            default: 
                ingredient = null;        
    
        }
        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;