/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../actions/action";

import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";

function Nav() {
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.cart);
  const {userInfo} = useSelector((state) => state.LogInUser);
  const logOutHandler = ()=> dispatch(logOut());
  return (
    <>
      <NavLink activeClassName='active_link' className='link' exact to='/'>
        Home
      </NavLink>
      <NavLink activeClassName='active_link' className='link' exact to='/about'>
        About
      </NavLink>
      {userInfo ? (
        <>
        {userInfo && userInfo.admin &&<NavLink
            activeClassName='active_link'
            className='link'
            exact
            to='/admin'>
          Dashboard
          </NavLink>}
        <NavLink
            activeClassName='active_link'
            className='link'
            exact
            to='/cart/pID'>
            <AddShoppingCartOutlinedIcon>
              {cartItem.reduce((acc, ele) => acc + Number(ele.qty), 0)}
            </AddShoppingCartOutlinedIcon>
          </NavLink>
          <NavLink
            activeClassName='active_link'
            className='link'
            exact
            to='/profile'>
           { userInfo ? userInfo.fname :'Profile'}
          </NavLink>
          
          <NavLink activeClassName='active_link' className='link' exact to='/' onClick={logOutHandler}>
            LogOut
          </NavLink>
        </>
      ) : (
        <NavLink
          activeClassName='active_link'
          className='link'
          exact
          to='/sing-up'>
          singUp
        </NavLink>
      )}
    </>
  );
}

export default Nav;
