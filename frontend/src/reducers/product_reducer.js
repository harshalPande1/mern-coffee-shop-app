/** @format */

import {
  GETDATA,
  GET_SINGLE_PRODUCT,
  REQDATA,
  ERROR_FROM_SERVER,
  REQ_SHIPPING_ADDRESS,
  REQ_PAYMENT_METHOD,
  REQ_SHIPPING_ADDRESS_REMOVE,
  REQ_ADD_NEW_MENU,
  REQ_ADD_NEW_MENU_ERROR,
  REQ_ADD_NEW_MENU_SUCCESS,
  REQ_UPDATE_MENU,
  REQ_UPDATE_MENU_SUCCESS,
  REQ_UPDATE_MENU_ERROR,
  REQ_DELETE_MENU,
  REQ_DELETE_MENU_SUCCESS,
  REQ_DELETE_MENU_ERROR,

} from "../types";
const getProducts = (state = { data: [] }, action) => {
  switch (action.type) {
    case REQDATA: {
      return { loading: true };
    }
    case GETDATA: {
      return { loading: false, data: [...action.payload] };
    }
    case ERROR_FROM_SERVER: {
      return { loading: false, error: [action.payload] };
    }

    default:
      return state;
  }
};

const getSingleProduct = (state = { cartItem: [] }, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      const item = action.payload;
      const existItem = state.cartItem.find((ele) => ele._id === item._id);
      if (existItem) {
        return {
          ...state,
          cartItem: state.cartItem.map((ele) =>
            ele._id === existItem._id ? item : ele,
          ),
        };
      }

      return { ...state, cartItem: [...state.cartItem, item] };
    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cartItem: state.cartItem.filter((ele) => ele._id !== action.payload),
      };
    case "REMOVE_CART_All_ITEM":
      return {
        ...state,
        cartItem: [],
      };

    case REQ_SHIPPING_ADDRESS:
      return { loading: false, ...state, shippingAddress: action.payload };
    case REQ_SHIPPING_ADDRESS_REMOVE:
      return { loading: false, ...state, shippingAddress: {} };
    case REQ_PAYMENT_METHOD:
      return { loading: false, ...state, payment_method: action.payload };
    default:
      return state;
  }
};

const addNewMenu = (state = { newProduct: {} }, action) => {
  switch (action.type) {
    case REQ_ADD_NEW_MENU:
      return { loading: true };
    case REQ_ADD_NEW_MENU_SUCCESS:
      return { loading: false, newProduct: action.paload };
    case REQ_ADD_NEW_MENU_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const updateProductReducer = (state = {updateProduct:{}}, action) => {
  switch (action.type) {
    case REQ_UPDATE_MENU:
      return { loading: true };
    case REQ_UPDATE_MENU_SUCCESS:
      return { loading: false, updateProduct: action.paload };
    case REQ_UPDATE_MENU_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case REQ_DELETE_MENU:
      return { loading: true };
    case REQ_DELETE_MENU_SUCCESS:
      return { loading: false, delete : action.payload };
    case REQ_DELETE_MENU_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



export { getProducts, getSingleProduct, addNewMenu ,updateProductReducer , deleteProductReducer};
