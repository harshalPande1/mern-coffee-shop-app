import {REQ_REGISTER , REQ_REGISTER_SUCCESS , REQ_REGISTER_ERROR} from '../types'
const register = (state = {} , action) =>{
    switch (action.type) {
        case  REQ_REGISTER : return {loading : true}
        case REQ_REGISTER_SUCCESS : return { loading : false , userInfo : action.payload }
        case REQ_REGISTER_ERROR : return { loading : false , error : action.payload }
        default: return state;
    }
}

export {register}