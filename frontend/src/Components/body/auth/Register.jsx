/** @format */

import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Validation from "../../util/Validation";
import Loading from "../../util/Loading";
import useForm from "../../Hooks/UseForm";
import { Link } from "react-router-dom";
import { register } from "../../../actions/action";
import { useDispatch, useSelector } from "react-redux";
import "./auth.css";
const Register = ({ err, setErr }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector(
    (state) => state.regiserUser,
  );

  const initialObj = {
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
    password: "",
  };
  const { formData, validationErr, handelChange, setValidationErr } =
    useForm(initialObj);

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const submitHandeler = async (e) => {
    e.preventDefault();
    if (!Object.values(Validation(formData)).length) {
      dispatch(register(formData));
    } else {
      setValidationErr(Validation(formData));
    }
  };

  return (
    <>
      {loading && <Loading />}
      {error && <h3>{error.message}</h3>}
      <div
        className='container w-100 d-flex justify-content-center'
        id='formDiv'>
        <form onSubmit={submitHandeler} method='POST'>
          <input
            type='text'
            name='fname'
            placeholder={validationErr ? validationErr.fname : "First Name"}
            className='form-control mb-3 text-center w-100 mt-4 registerClass'
            onChange={handelChange}
            value={formData.fname}
          />
          <input
            type='text'
            name='lname'
            placeholder={validationErr ? validationErr.lname : "Last Name"}
            className='form-control mb-3 text-center w-100 mt-4 registerClass'
            onChange={handelChange}
            value={formData.lname}
          />

          <input
            type='email'
            name='email'
            placeholder={validationErr ? validationErr.email : "email"}
            className='form-control mb-3 text-center w-100 mt-4 registerClass'
            onChange={handelChange}
            value={formData.email}
          />
          <input
            type='text'
            name='mobile'
            placeholder={validationErr ? validationErr.mobile : "mobile"}
            className='form-control mb-3 text-center w-100 mt-4 registerClass'
            onChange={handelChange}
            value={formData.mobile}
          />

          <input
            type='password'
            name='password'
            placeholder={validationErr ? validationErr.password : "password"}
            className='form-control mb-3 text-center w-100 mt-4 registerClass'
            onChange={handelChange}
            value={formData.password}
          />
          <input
            type='text'
            name='pincode'
            placeholder={validationErr ? validationErr.pincode : "pincode"}
            className='form-control mb-3 text-center w-100 mt-4 registerClass'
            onChange={handelChange}
            value={formData.pincode}
          />
          <textarea
            name='address'
            type='text'
            rows='3'
            cols='10'
            placeholder={validationErr ? validationErr.address : "Address"}
            className='form-control mb-3 text-center w-100 mt-4 registerClass'
            onChange={handelChange}
            value={formData.address}
          />

          <button className='btn btn-success w-50 mt-4' type='submit'>
            Register
          </button>
        </form>
      </div>
      <Link to='/login'>
        <button className='btn btn-info mt-4 ' id='switchBtn'>
          Switch To Login
        </button>
      </Link>
      {err && <h3>{err}</h3>}
    </>
  );
};

export default Register;
