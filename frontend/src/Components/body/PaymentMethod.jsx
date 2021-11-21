/** @format */

import React, { useState } from "react";
import BreadCrumps from "./breadCrumps/breadCrump";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "./paymentmethod.css";
import { payment_method } from "../../actions/action";
const PaymentMethod = () => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  const history = useHistory();
  if (shippingAddress === null) {
    history.push("/shippingaddress");
  }
  const [paymentMethod, setPaymentMethod] = useState();
  const dispatch = useDispatch();
  const paymentSelectHandler = (e) => {
    setPaymentMethod(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (paymentMethod) {
      dispatch(payment_method(paymentMethod));
      history.push('/placeorder');
    }
  };
  return (
    <div>
      <BreadCrumps step1 step2 step3 />
      <div className='container'>
        <form method='post' className='mt-5' onSubmit={submitHandler}>
          <div className='radio1'>
            <input
              type='radio'
              name='payment_method'
              id='pay_on_delivery'
              value='PAY ON DELIVERY'
              onClick={paymentSelectHandler}
            />
            <label htmlFor='pay_on_delivery'>PAY ON DELIVERY</label>
          </div>
          <div className='radio2'>
            <input
              type='radio'
              name='payment_method'
              id='pay_with_card'
              value='PAY WITH CARD '
              onClick={paymentSelectHandler}
            />
            <label htmlFor='pay_with_card'>PAY WITH CARD </label>
          </div>
          <button type='submit' className='btn btn-success'>
            place order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethod;
