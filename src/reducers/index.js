import { combineReducers } from 'redux';
import ingredientReducer from './reducer_ingredient';
import orderReducer from './reducer_order';

const rootReducer = combineReducers({
    ing: ingredientReducer,
    ord: orderReducer
});

export default rootReducer;