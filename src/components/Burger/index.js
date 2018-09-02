import React from 'react';
import BurgerIngredient from '../Burger/Burgeringredient';
import { BurgerWrap } from './styles';

const Burger = (props) => {
    
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        //return [...Array(props.ingredients[igKey])];
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            //return igKey;
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        });
    }).reduce((arr,el) => {
        return arr.concat(el);
    },[]);
    //console.log(transformedIngredients);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    return(
        <BurgerWrap>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </BurgerWrap>
    )
}

export default Burger;