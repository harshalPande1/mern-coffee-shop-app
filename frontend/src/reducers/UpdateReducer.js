import {REQ_UPDATE,REQ_UPDATE_SUCCESS,REQ_UPDATE_ERROR} from '../types'
export const updateUser = (state = {updateData : {} } , action ) =>{
    switch (action.type) {
        case REQ_UPDATE: return {loading:true , updateData :{} }
        case REQ_UPDATE_SUCCESS : return { loading : false , updateData : action.payload }
        case REQ_UPDATE_ERROR : return {loading : false , error : action.payload}
    
        default: return state;
    }
}
