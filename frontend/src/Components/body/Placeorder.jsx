/** @format */

import React, { useEffect } from "react";
import "./Placeorder.css";
import BreadCrump from "./breadCrumps/breadCrump";
import { useSelector, useDispatch } from "react-redux";
import { placeOrders } from "../../actions/action";
import { useHistory } from "react-router";
import Loading from "../util/Loading";
const Placeorder = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cartItem, shippingAddress, payment_method } = useSelector(
    (state) => state.cart,
  );

  const { userInfo } = useSelector((state) => state.LogInUser);
  const { error, success, loading, orders } = useSelector(
    (state) => state.placeOrders,
  );
  const totalPrice = cartItem.reduce(
    (acc, item) => acc + item.price * Number(item.qty),
    0,
  );
  const Quantity = cartItem.reduce(
    (acc, item) => acc + item.qty ,
    0,
  );

  const orderHandler = () => {
    if (cartItem && shippingAddress && payment_method) {
      dispatch(
        placeOrders(
          {
            product: cartItem.map((ele) => ele._id),
            payment: false,
            totalPrice: totalPrice,
            deliverd: false,
            qty:Quantity,
            paymentBy: payment_method,
            shippingAddress: shippingAddress,
            mobileNumber: shippingAddress.mobile,
          },
          userInfo.token,
        ),
      );
    }
  };
  useEffect(() => {
    if (success) {
      history.push(`/placeorder/${orders._id}`);
    }
  }, [history, orders._id, success]);
  return (
    <>
      {loading && <Loading />}
      <BreadCrump step1 step2 step3 step4 />
      <div className='conatiner d-flex' id="conatiner">
        <div className='subcontainer'>
          <div className='user_info'>
            <h1 className='h1'>
              <strong>Name :</strong>
              {shippingAddress.fname + " " + shippingAddress.lname}
            </h1>
            <p>
              <strong>Address :</strong> {shippingAddress.address + ",  "}
              <strong>Pincode :</strong>
              <strong>{shippingAddress.pincode}</strong>
            </p>
            <p>
              <strong>E-mail :</strong> {shippingAddress.email}
            </p>
            <p>
              <strong>Mobile :</strong>
              {shippingAddress.mobile}
            </p>
          </div>
          {cartItem.map((item) => (
            <div className='product_info' key={item._id}>
              <div className='product_card'>
                <img src={item.image} alt='productPic' />
                <strong className='p-3'> Quantity : </strong>
                <p>{item.qty}</p>
                <strong>Price : </strong> <p>{item.price} Rs</p>
              </div>
            </div>
          ))}
          <div className='paymentMethodDiv'>
          <h2>Payment Method :</h2><span> {payment_method}</span>
        </div>
        </div>
        
        <div className='outer_card'>
          <div className='subtotal_div'>
            <strong>subtotal :</strong>
            <span>{cartItem.reduce((acc, ele) => acc + ele.qty, 0)}</span>
            <div className='total_div'>
              <strong> total : </strong>
              <span>
                {cartItem.reduce(
                  (acc, item) => acc + item.price * Number(item.qty),
                  0,
                )}
              </span>
            </div>
          </div>
          <button className='btn btn-dark' onClick={orderHandler} id="btn">
            place order
          </button>
        </div>
        {error && <h4>{error.message}</h4>}
      </div>
    </>
  );
};

export default Placeorder;
