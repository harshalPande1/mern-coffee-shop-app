/** @format */

import {
  REQ_ORDER,
  REQ_ORDER_SUCCESS,
  REQ_ORDER_ERROR,
  REQ_GET_ORDER,
  REQ_GET_ORDER_SUCCESS,
  REQ_GET_ORDER_ERROR,
  REQ_GET_ALL_ORDER,
  REQ_GET_ALL_ORDER_SUCCESS,
  REQ_GET_ALL_ORDER_ERROR,
  REQ_CHANGE_ORDER_STATUS,
  REQ_CHANGE_ORDER_STATUS_SUCCESS,
  REQ_CHANGE_ORDER_STATUS_ERROR,
} from "../types";
export const OrderReducer = (state = { orders: {} }, action) => {
  switch (action.type) {
    case REQ_ORDER:
      return { loading: true, success : false ,orders: {} };
    case REQ_ORDER_SUCCESS:
      return { loading: false, success: true, orders: action.payload };
    case REQ_ORDER_ERROR:
      return { loading: false, success: false ,error: action.payload };

    default:
      return state;
  }
};
export const ALLOrdersReducer = (state = { allOrders: {} }, action) => {
  switch (action.type) {
    case REQ_GET_ALL_ORDER:
      return { loading: true };
    case REQ_GET_ALL_ORDER_SUCCESS:
      return { loading: false, allOrders: action.payload };
    case REQ_GET_ALL_ORDER_ERROR:
      return { loading: false,error: action.payload };

    default:
      return state;
  }
};
export const GetOrder = (state = { order:{} , shippingAddress : {} }, action) => {
  switch (action.type) {
    case REQ_GET_ORDER:
      return { ...state ,loading: true  };
    case REQ_GET_ORDER_SUCCESS:
      return { loading: false, order: action.payload , };
    case REQ_GET_ORDER_ERROR:
      return { loading: false ,error: action.payload };

    default:
      return state;
  }
};
export const changeStatusReducer = (state =  {modifyOrder : {} }, action) => {
  switch (action.type) {
    case REQ_CHANGE_ORDER_STATUS:
      return { loading: true  };
    case REQ_CHANGE_ORDER_STATUS_SUCCESS:
      return { loading: false, modifyOrder: action.payload , };
    case REQ_CHANGE_ORDER_STATUS_ERROR:
      return { loading: false ,error: action.payload };

    default:
      return state;
  }
};
