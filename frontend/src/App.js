/** @format */

import React, { useEffect, useState } from "react";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./Components/body/Home";
import About from "./Components/body/About";
import Header from "./Components/head/Header";
import Footer from "./Components/footer/Footer";
import Login from "./Components/body/auth/Login";
import Register from "./Components/body/auth/Register";
import Kart from "./Components/body/Cart/Cart";
import Sidemenu from "./Components/head/Sidemenu";

import Profile from "./Components/body/Profile";
import Shippingaddr from "./Components/body/Shippingaddr";
import PaymentMethod from "./Components/body/PaymentMethod";
import Placeorder from "./Components/body/Placeorder";
import GetOrder from "./Components/body/GetOrder";
import { useDispatch } from "react-redux";
import { logOut } from "./actions/action";
import AdminPanel from "./Components/body/Dashbord/AdminPanel";
let logOutTimer;
function App() {
  const [expireTime, setExpireTime] = useState();
  const dispatch = useDispatch();
  const [showSideMenu, setshowSideMenu] = useState(false);
  const showMenu = () => {
    showSideMenu ? setshowSideMenu(false) : setshowSideMenu(true);
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (userInfo) {
      setExpireTime(userInfo.expirationTime);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo && expireTime) {
      const remainingTime = expireTime - new Date().getTime();
      logOutTimer = setTimeout(() => {
        dispatch(logOut());
      }, remainingTime);
    } else {
      clearTimeout(logOutTimer);
    }
  }, [dispatch, userInfo, expireTime]);

  return (
    <div>
      <BrowserRouter>
        <Header showSideBar={showMenu} />
        {showSideMenu && <Sidemenu showMenu={showMenu} />}
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/about' exact>
            <About />
          </Route>
          <Route path='/sing-up' exact>
            <Register />
          </Route>
          <Route path='/login' exact>
            <Login />
          </Route>
          <Route path='/register' exact>
            <Register />
          </Route>
          <Route path='/cart/' exact>
            <Kart />
          </Route>
          <Route path='/cart/:pID?'>
            <Kart />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/shippingaddress'>
            <Shippingaddr />
          </Route>
          <Route path='/paymentmethod' exact>
            <PaymentMethod />
          </Route>
          <Route path='/placeorder' exact>
            <Placeorder />
          </Route>
          <Route path='/placeorder/:id'>
            <GetOrder />
          </Route>
          <Route path='/admin'>
            <AdminPanel />
          </Route>
          <Redirect to='/' />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
