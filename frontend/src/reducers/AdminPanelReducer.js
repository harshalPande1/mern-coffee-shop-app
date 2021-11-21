import { REQ_ADMIN_INFO, REQ_ADMIN_INFO_ERROR, REQ_ADMIN_INFO_SUCCESS, REQ_ADMIN_UPDATE_INFO, REQ_ADMIN_UPDATE_INFO_ERROR, REQ_ADMIN_UPDATE_INFO_SUCCESS } from "../types";

export const AdminReducer = (state = {admin : {} ,admin_status :{} } , action)=>{
    switch (action.type) {
        case REQ_ADMIN_INFO : return {...state, loading : true };
        case REQ_ADMIN_INFO_SUCCESS : return {...state , loading : false , admin : action.payload};
        case REQ_ADMIN_INFO_ERROR : return { loading : false , error : action.payload}
        case REQ_ADMIN_UPDATE_INFO : return { loading : true };
        case REQ_ADMIN_UPDATE_INFO_SUCCESS : return { loading : false , admin_status : action.payload};
        case REQ_ADMIN_UPDATE_INFO_ERROR : return { loading : false , error : action.payload}
        default: return state;
    }
}

