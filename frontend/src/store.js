/** @format */

import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";
const cartItemFromLocalStorage = localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItem"))
  : [];
const logInUserInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddressFromlocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : null;
const payment_methodFromLoacalStorage = localStorage.getItem("payment_method")
  ? JSON.parse(localStorage.getItem("payment_method"))
  : null;


const initialValue = {
  cart: {
    cartItem: cartItemFromLocalStorage,
    payment_method: payment_methodFromLoacalStorage,
    shippingAddress: shippingAddressFromlocalStorage,
  },
  LogInUser: { userInfo: logInUserInfo },
};


const store = createStore(
  rootReducer,
  initialValue,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
