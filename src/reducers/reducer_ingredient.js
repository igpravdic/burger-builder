import * as actionTypes from '../actions';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    builing: false
}
const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 1.5,
    meat: 2.5,
    bacon: 1.5
}
export default (state = initialState, action) =>{
	switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILD:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
}