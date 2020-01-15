import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import userReducer from './reducers/userReducer';
import cartReducer from './reducers/cartReducer';
import productReducer from './reducers/productReducer';

const rootReducer = combineReducers({
    userReducer,
    cartReducer,
    productReducer
});

export default createStore(rootReducer, applyMiddleware(promise));