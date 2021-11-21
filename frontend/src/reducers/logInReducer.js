import {  REQ_LOGIN,
    REQ_LOGIN_SUCCESS,
    REQ_LOGIN_ERROR,
    REQ_LOGOUT_SUCCESS,} from '../types'

const logIn = (state = {} , action) =>{
    switch (action.type){
      case REQ_LOGIN : return { loading : true}
      case REQ_LOGIN_SUCCESS :{ return {
        loading : false ,
        userInfo : action.payload
      }}
      case REQ_LOGIN_ERROR : {return {
        loading : false,
        error : action.payload
      }}
      case REQ_LOGOUT_SUCCESS : return {};
      default  :  return state
    }
    }

    export  { logIn}