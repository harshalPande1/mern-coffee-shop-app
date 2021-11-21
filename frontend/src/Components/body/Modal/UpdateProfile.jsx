/** @format */

import React from "react";
import reactDom from "react-dom";

import { Button } from "react-bootstrap";
import "./prfileModal.css";

import Validation from "../../util/Validation";
import useForm from "../../Hooks/UseForm";
import { updateUser } from "../../../actions/action";

import { useDispatch } from "react-redux";

const UpdateProfile = ({ showFun, userDetailes, token }) => {
  const dispatch = useDispatch();
  // const {updateUserData} = useSelector(state => state.UpdateData)
  userDetailes = { ...userDetailes,password: "" };
  const { handelChange, validationErr, formData, setValidationErr } =
    useForm(userDetailes);
  const submitHandler = (e) => {
    e.preventDefault();
    if (Object.values(Validation(formData)).length === 0) {
      dispatch(updateUser(formData, token));
    } else {
      setValidationErr(Validation(formData));
    }
  };
  const content = (
    <div className='container' id='profile_modal'>
      <div className='header d-flex'>
        <h2>Update Profile</h2>
        <button onClick={() => showFun()}>X</button>
      </div>
      <div className='bodyContent'>
        <form
          className='d-flex flex-column'
          method='Patch'
          onSubmit={submitHandler}>
          <input
            type='text'
            placeholder={validationErr ? validationErr.message : "First Name"}
            value={formData.fname}
            name='fname'
            onChange={handelChange}
          />
          <input
            type='text'
            placeholder={validationErr ? validationErr.message : "Last Name"}
            value={formData.lname}
            name='lname'
            onChange={handelChange}
          />
          <input
            type='email'
            placeholder={validationErr ? validationErr.message : "Email"}
            value={formData.email}
            name='email'
            onChange={handelChange}
          />
          <input
            type='password'
            placeholder={validationErr ? validationErr.password : "Password"}
            value={formData.password}
            name='password'
            onChange={handelChange}
          />
          <input
            type='text'
            placeholder={validationErr ? validationErr.message : "Mobile"}
            value={formData.mobile}
            name='mobile'
            onChange={handelChange}
          />
          <input
            type='text'
            value={formData.pincode}
            placeholder={validationErr ? validationErr.pincode : "pincode"}
            name='pincode'
            onChange={handelChange}
          />
          <textarea
            value={formData.address}
            placeholder={validationErr ? validationErr.address : "address"}
            name='address'
            onChange={handelChange}
          />
          <Button variant='outline-info' type='submit'>
            Update
          </Button>
        </form>
      </div>
    </div>
  );
  return reactDom.createPortal(
    content,
    document.getElementById("Update_Profile"),
  );
};

export default UpdateProfile;
