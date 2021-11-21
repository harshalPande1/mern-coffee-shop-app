/** @format */

import {
  //   REQ_UPDATE,
  //   REQ_UPDATE_SUCCESS,
  //   REQ_UPDATE_ERROR,
  REQ_USERDETAILES,
  REQ_USERFETCH_SUCCESS,
  REQ_USERFETCH_ERROR,
  REQ_FETCH_ALL_USER,
  REQ_FETCH_ALL_USER_SUCCESS,
  REQ_FETCH_ALL_USER_ERROR,
} from "../types";

export const fetchUser = (state = {userDetailes:{}}, action) => {
  switch (action.type) {
    case REQ_USERDETAILES:
      return { loading: true , userDetailes :{} };
    case REQ_USERFETCH_SUCCESS: {
      return { loading: false, userDetailes: action.payload };
    }
    case REQ_USERFETCH_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const FetchAllUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REQ_FETCH_ALL_USER:
      return { loading: true };
    case REQ_FETCH_ALL_USER_SUCCESS: {
      return { loading: false, users: action.payload };
    }
    case REQ_FETCH_ALL_USER_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// export const updateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case REQ_UPDATE:
//       return { loading: true };
//     case REQ_UPDATE_SUCCESS:
//       return { loading: false, updateUser: action.payload };
//     case REQ_UPDATE_ERROR:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
