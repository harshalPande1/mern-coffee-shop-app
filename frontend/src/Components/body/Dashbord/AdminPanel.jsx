/** @format */

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, useHistory, Redirect } from "react-router";
import MenuUpdateModal from "../Modal/MenuUpdateModal";
import AddMenu from "./AddMenu";
import AllMenu from "./AllMenu";
import AllOrders from "./AllOrders";
import AllUsers from "./AllUsers";
import "./dashbord.css";
import DeleteOneProduct from "./DeleteOneProduct";

const AdminPanel = () => {
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.LogInUser);
  useEffect(() => {
    if (userInfo && userInfo.admin === false) {
      history.push("/");
    }
  }, [history, userInfo]);
  return (
    <>
      <div className='main_container'>
        <div className='navDiv'>
          <button
            className='nabBtn'
            onClick={() => history.push("/admin/users")}>
            Users
          </button>
          <button
            className='nabBtn'
            onClick={() => history.push("/admin/orders")}>
            Orders
          </button>
          <button
            className='nabBtn'
            onClick={() => history.push("/admin/addmenu")}>
            Add New Menu
          </button>
          <button
            className='nabBtn'
            onClick={() => history.push("/admin/menu")}>
            All Menu
          </button>
        </div>
        <div className='panelScreen'>
          <Switch>
            <Route path='/admin/users' component={AllUsers} exact />

            <Route path='/admin/orders' component={AllOrders} exact/>

            <Route path='/admin/menu' component={AllMenu} exact />

            <Route path='/admin/addmenu' component={AddMenu} exact />

            <Route path='/admin/menu/:id' component={MenuUpdateModal} exact />

            <Route
              path='/admin/menu/delete/:id'
              component={DeleteOneProduct}
              exact
            />
            <Redirect to='/admin/users' />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
