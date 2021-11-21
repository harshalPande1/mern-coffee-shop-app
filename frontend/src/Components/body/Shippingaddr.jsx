/** @format */

import React, { useEffect } from "react";
import BreadCrumps from "./breadCrumps/breadCrump";
import "./shippingModal.css";

import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, shippingAddress } from "../../actions/action";

import useForm from "../Hooks/UseForm";
import Validation from "../util/Validation";
const Shippingaddr = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.LogInUser);
  useEffect(() => {
    dispatch(fetchUser(userInfo.token));
  }, [dispatch, userInfo.token]);
  if (userInfo === null) {
    history.push("/login");
  }

    const initialObj = {
      fname: userInfo ? userInfo.fname : "",
      lname: userInfo ? userInfo.lname : "",
      mobile: userInfo ? userInfo.mobile : "",
      email: userInfo ? userInfo.email : "",
      address: userInfo ? userInfo.address : "",
      pincode: userInfo ? userInfo.pincode : "",
    };
  
  const { formData, handelChange, validationErr, setValidationErr } =
    useForm(initialObj);
  const submitHandler = (e) => {
    e.preventDefault();
    if (Object.values(Validation(formData)).length === 0) {
      dispatch(shippingAddress(formData));
      history.push("/paymentmethod");
    } else {
      setValidationErr(Validation(formData));
    }
  };
  return (
    <>
      <BreadCrumps step1 step2 />
      <div className='shipping_form'>
        <form method='post' onSubmit={submitHandler}>
          <input
            type='text'
            name='fname'
            className='input-control'
            onChange={handelChange}
            value={formData.fname}
            placeholder={validationErr ? validationErr.fname : "First Name"}
          />
          <input
            type='text'
            name='lname'
            className='input-control'
            onChange={handelChange}
            value={formData.lname}
            placeholder={validationErr ? validationErr.lname : "Last Name"}
          />
          <input
            type='text'
            name='mobile'
            className='input-control'
            onChange={handelChange}
            value={formData.mobile}
            placeholder={validationErr ? validationErr.mobile : "Mobile Number"}
          />
          <input
            type='email'
            name='email'
            className='input-control'
            onChange={handelChange}
            value={formData.email}
            placeholder={validationErr ? validationErr.email : "E-mail"}
          />
          <input
            type='text'
            name='pincode'
            className='input-control'
            onChange={handelChange}
            value={formData.pincode}
            placeholder={validationErr ? validationErr.pincode : "pincode"}
          />
          <textarea
            name='address'
            className='textarea-control'
            onChange={handelChange}
            value={formData.address}
            placeholder={validationErr ? validationErr.address : "Address"}
          />
          <button type='submit' className='btn btn-success'>
            submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Shippingaddr;
