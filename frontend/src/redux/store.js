import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {createNftReducer,getAllNftReducer} from './reducers/nftReducer'
const reducer = combineReducers({
    nft:createNftReducer,
    nfts:getAllNftReducer

});

let initialState = {};

const middleware = [ thunk ];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
