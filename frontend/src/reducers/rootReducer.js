import { combineReducers } from 'redux';
import {getProducts , getSingleProduct , addNewMenu,  updateProductReducer, deleteProductReducer } from './product_reducer';
import {  logIn  } from './logInReducer'
import {  FetchAllUserReducer, fetchUser } from './userDetailesReducer';
import { register } from './registerReduser';
import { updateUser } from './UpdateReducer';
import {GetOrder, OrderReducer ,ALLOrdersReducer, changeStatusReducer} from './ordersReducer'
import { AdminReducer } from './AdminPanelReducer';
const rootReducer = combineReducers({
   allProducts : getProducts,
    cart : getSingleProduct, 
    LogInUser : logIn,
    regiserUser : register,
    FetchAllUser:FetchAllUserReducer,
    fetchUser : fetchUser,
    updateUser : updateUser,
    placeOrders : OrderReducer,
    GetOrder : GetOrder,
    modifyOrder : changeStatusReducer,
    GetAllOrders : ALLOrdersReducer,
    Admin : AdminReducer,
    AddNewMenu : addNewMenu,
    updateProductReducer : updateProductReducer,
    deleteProductReducer :deleteProductReducer,
}    
);

export default rootReducer;