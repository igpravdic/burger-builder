import { combineReducers } from 'redux';
import ingredientReducer from './reducer_ingredient';

const rootReducer = combineReducers({
    ing: ingredientReducer
});

export default rootReducer;