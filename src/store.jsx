import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { loginUserReducer, registerUserReducer } from './reducers/userReducer';
import { getDemReducer, getPieceReducer } from './reducers/pceReducer';

//import { placeCartReducer } from './reducers/cartReducer';


const middleware = [thunk];
const rootReducer = combineReducers({
  registerUserReducer:registerUserReducer,
  loginUserReducer:loginUserReducer, 
  getDemReducer:getDemReducer,
  getPieceReducer:getPieceReducer,
  //placeCartReducer:placeCartReducer
  // Use 
  // Use
  // other reducers...
});
const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[];
const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) :null;


const initialState = {
  cartReducer : {
    cartItems: cartItems
  },
  loginUserReducer : {
    currentUser: currentUser
  }
  
}


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState
});

export default store;




