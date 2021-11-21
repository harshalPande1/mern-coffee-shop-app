/** @format */
import axios from "axios";
import {
  GETDATA,
  GET_SINGLE_PRODUCT,
  REQDATA,
  ERROR_FROM_SERVER,
  REQ_LOGIN,
  REQ_LOGIN_SUCCESS,
  REQ_LOGIN_ERROR,
  REQ_LOGOUT,
  REQ_LOGOUT_SUCCESS,
  REQ_REGISTER_SUCCESS,
  REQ_REGISTER,
  REQ_REGISTER_ERROR,
  REQ_USERDETAILES,
  REQ_USERFETCH_SUCCESS,
  REQ_USERFETCH_ERROR,
  REQ_UPDATE,
  REQ_UPDATE_SUCCESS,
  REQ_UPDATE_ERROR,
  REQ_ORDER,
  REQ_ORDER_SUCCESS,
  REQ_ORDER_ERROR,
  REQ_SHIPPING_ADDRESS,
  REQ_PAYMENT_METHOD,
  REQ_SHIPPING_ADDRESS_REMOVE,
  REQ_GET_ORDER,
  REQ_GET_ORDER_SUCCESS,
  REQ_GET_ORDER_ERROR,
  REQ_ADMIN_INFO,
  REQ_ADMIN_INFO_SUCCESS,
  REQ_ADMIN_INFO_ERROR,
  REQ_ADD_NEW_MENU,
  REQ_ADD_NEW_MENU_SUCCESS,
  REQ_ADD_NEW_MENU_ERROR,
  REQ_UPDATE_MENU,
  REQ_UPDATE_MENU_ERROR,
  REQ_UPDATE_MENU_SUCCESS,
  REQ_DELETE_MENU,
  REQ_DELETE_MENU_SUCCESS,
  REQ_DELETE_MENU_ERROR,
  REQ_FETCH_ALL_USER,
  REQ_FETCH_ALL_USER_SUCCESS,
  REQ_FETCH_ALL_USER_ERROR,
  REQ_ADMIN_UPDATE_INFO,
  REQ_ADMIN_UPDATE_INFO_ERROR,
  REQ_ADMIN_UPDATE_INFO_SUCCESS,
  REQ_GET_ALL_ORDER,
  REQ_GET_ALL_ORDER_ERROR,
  REQ_GET_ALL_ORDER_SUCCESS,
  REQ_CHANGE_ORDER_STATUS,
  REQ_CHANGE_ORDER_STATUS_SUCCESS,
  REQ_CHANGE_ORDER_STATUS_ERROR,
} from "../types";

const fecthData = () => async (Dispatch) => {
  try {
    Dispatch({ type: REQDATA });
    const data = await axios.get("http://localhost:5000/product/api/product");
    Dispatch({
      type: GETDATA,
      payload: data.data,
    });
  } catch (error) {
    Dispatch({
      type: ERROR_FROM_SERVER,
      payload:
        error.response && error.response.data.message
          ? error.response.data
          : error.message,
    });
  }
};

const fetchSingleProduct = (pID, qty) => async (Dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/product/api/product/${pID}`,
    );
    Dispatch({
      type: GET_SINGLE_PRODUCT,
      payload: {
        _id: data._id,
        image: data.image,
        ingredients: data.ingredients,
        name: data.name,
        price: data.price,
        productID: data.productID,
        qty,
      },
    });
    const {
      cart: { cartItem },
    } = getState();
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  } catch (error) {}
};

const removeItemFormCart = (_id) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_CART_ITEM",
    payload: _id,
  });
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItem));
};
const removeItemAllFormCart = () => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_CART_All_ITEM",
  });
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItem));
};

const logIn = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REQ_LOGIN });
      const { data } = await axios.post(
        "http://localhost:5000/user/login",
        { email, password },
        { headers: { "Content-Type": "Application/json" } },
      );
      dispatch({
        type: REQ_LOGIN_SUCCESS,
        payload: data,
      });
      const expirationTime = new Date(
        new Date().getTime() + 1000 * 60 * 60 * 24,
      ).getTime();
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...data, expirationTime }),
      );
    } catch (error) {
      dispatch({
        type: REQ_LOGIN_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data
            : error.message,
      });
    }
  };
};

const logOut = () => (dispatch) => {
  dispatch({ type: REQ_LOGOUT });
  dispatch({ type: REQ_LOGOUT_SUCCESS });
  dispatch({ type: REQ_SHIPPING_ADDRESS_REMOVE });
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("userInfo");
};

const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REQ_REGISTER });
    const { data } = await axios.post(
      "http://localhost:5000/user/register",
      formData,
      { headers: { "Content-Type": "Application/json" } },
    );
    dispatch({
      type: REQ_REGISTER_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({
      type: REQ_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQ_REGISTER_ERROR,
      payload:
        error.response && error.response.message
          ? error.response.data
          : error.message,
    });
  }
};

const fetchUser = (token) => async (dispatch) => {
  try {
    dispatch({ type: REQ_USERDETAILES });
    const { data } = await axios.get("http://localhost:5000/user/profile", {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `barer ${token}`,
      },
    });
    dispatch({ type: REQ_USERFETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REQ_USERFETCH_ERROR,
      payload:
        error.response && error.response.message
          ? error.response.data
          : error.response.data.message.message,
    });
  }
};

const updateUser = (formData, token) => async (dispatch) => {
  try {
    dispatch({ type: REQ_UPDATE });

    const { data } = await axios.patch(
      "http://localhost:5000/user/update",
      formData,
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `barer ${token}`,
        },
      },
    );
    dispatch({
      type: REQ_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQ_UPDATE_ERROR,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

const shippingAddress = (formData) => (dispatch) => {
  dispatch({ type: REQ_SHIPPING_ADDRESS, payload: formData });
  localStorage.setItem("shippingAddress", JSON.stringify(formData));
};
const payment_method = (paymentSelect) => (dispatch) => {
  dispatch({ type: REQ_PAYMENT_METHOD, payload: paymentSelect });
  localStorage.setItem("payment_method", JSON.stringify(paymentSelect));
};

const placeOrders = (order, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REQ_ORDER });

      const { data } = await axios.post(
        "http://localhost:5000/orders/placeorder",
        order,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `barer ${token}`,
          },
        },
      );
      dispatch({
        type: REQ_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REQ_ORDER_ERROR,
        payload:
          error.response && error.response.data
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

const orderStatus = (status,id) => {
  return async (dispatch,getState) => {
  const {LogInUser} = getState();
  console.log(status);
    try {
      dispatch({ type: REQ_CHANGE_ORDER_STATUS });

      const { data } = await axios.patch(
        `http://localhost:5000/orders/changeorder/${id}`,
        status,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `barer ${LogInUser.userInfo.token}`,
          },
        },
      );
      dispatch({
        type: REQ_CHANGE_ORDER_STATUS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REQ_CHANGE_ORDER_STATUS_ERROR,
        payload:
          error.response && error.response.data
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

const getOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REQ_GET_ORDER });
    const { LogInUser } = getState();
    const { data } = await axios.get(
      `http://localhost:5000/orders/placeorder/${id}`,
      {
        headers: {
          Authorization: `barer ${LogInUser.userInfo.token}`,
        },
      },
    );

    dispatch({ type: REQ_GET_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REQ_GET_ORDER_ERROR,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

const getAllOrders = () => async (dispatch, getState) => {
  try {
    const { LogInUser } = getState();
    dispatch({ type: REQ_GET_ALL_ORDER });
    const { data } = await axios.get(
      `http://localhost:5000/orders/orders`,
      {
        headers: {
          Authorization: `barer ${LogInUser.userInfo.token}`,
        },
      },
    );
        dispatch({type : REQ_GET_ALL_ORDER_SUCCESS , payload : data } );
  } catch (error) {
    dispatch({
      type : REQ_GET_ALL_ORDER_ERROR,
      payload :  error.response && error.response.data
      ? error.response.data.message
      : error.message
    })
  }
};

const isAdmin = (token) => async (dispatch) => {
  try {
    dispatch({ type: REQ_ADMIN_INFO });
    const { data } = await axios.get("http://localhost:5000/user/admin", {
      headers: {
        Authorization: `barer ${token}`,
      },
    });
    dispatch({ type: REQ_ADMIN_INFO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REQ_ADMIN_INFO_ERROR,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};
const addNewMenu = (formData) => async (dispatch, getState) => {
  const { LogInUser } = getState();
  try {
    dispatch({ type: REQ_ADD_NEW_MENU });
    const { data } = await axios.post(
      "http://localhost:5000/product/api/addproduct",
      formData,
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `barer ${LogInUser.userInfo.token}`,
        },
      },
    );
    dispatch({ type: REQ_ADD_NEW_MENU_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REQ_ADD_NEW_MENU_ERROR,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};
const updateProduct = (formData, id) => async (dispatch, getState) => {
  const { LogInUser } = getState();
  try {
    dispatch({ type: REQ_UPDATE_MENU });
    const { data } = await axios.patch(
      `http://localhost:5000/product/api/updateproduct/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `barer ${LogInUser.userInfo.token}`,
        },
      },
    );
    dispatch({ type: REQ_UPDATE_MENU_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REQ_UPDATE_MENU_ERROR,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    const { LogInUser } = getState();
    dispatch({ type: REQ_DELETE_MENU });
    const { data } = await axios.delete(
      `http://localhost:5000/product/api/deleteProduct/${id}`,
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `barer ${LogInUser.userInfo.token}`,
        },
      },
    );
    dispatch({
      type: REQ_DELETE_MENU_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQ_DELETE_MENU_ERROR,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};
const FetchAllUser = () => async (dispatch, getState) => {
  try {
    const { LogInUser } = getState();
    dispatch({ type: REQ_FETCH_ALL_USER });
    const { data } = await axios.get(`http://localhost:5000/user/fetchusers`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `barer ${LogInUser.userInfo.token}`,
      },
    });
    dispatch({
      type: REQ_FETCH_ALL_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQ_FETCH_ALL_USER_ERROR,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

const updateAdmin = (adminStatus) => async (dispatch, getState) => {
  try {
    dispatch({ type: REQ_ADMIN_UPDATE_INFO });
    const { LogInUser } = getState();
    const { data } = await axios.patch(
      "http://localhost:5000/user/adminstatus",
      adminStatus,
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `barer ${LogInUser.userInfo.token}`,
        },
      },
    );
    dispatch({
      type: REQ_ADMIN_UPDATE_INFO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQ_ADMIN_UPDATE_INFO_ERROR,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};
export {
  fecthData,
  fetchSingleProduct,
  removeItemFormCart,
  removeItemAllFormCart,
  logIn,
  logOut,
  register,
  fetchUser,
  updateUser,
  shippingAddress,
  payment_method,
  placeOrders,
  getOrder,
  getAllOrders,
  isAdmin,
  addNewMenu,
  updateProduct,
  deleteProduct,
  FetchAllUser,
  updateAdmin,
  orderStatus,
};
