import { combineReducers } from 'redux';
import ingredientReducer from './reducer_ingredient';
import orderReducer from './reducer_order';
import authReducer from './reducer_auth';

const rootReducer = combineReducers({
    ing: ingredientReducer,
    ord: orderReducer,
    aut: authReducer
});

export default rootReducer;