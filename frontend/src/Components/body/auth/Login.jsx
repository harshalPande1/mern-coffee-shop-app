/** @format */

import React ,{useEffect} from "react";

import Validation from "../../util/Validation";
import { useHistory } from "react-router";
import { logIn } from "../../../actions/action";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../Hooks/UseForm";
import { Link } from "react-router-dom";
import Loading from "../../util/Loading";
const Login = ({ err, setErr }) => {
const history = useHistory();
const  data = useSelector(state => state.LogInUser);
const {loading , userInfo , error} = data
  const dispatch = useDispatch();
  const initialObj = {
    email: "",
    password: "",
  };
  
  useEffect(()=>{
    if(userInfo){history.push('/') }
  },[userInfo,history])

  const { formData, validationErr, handelChange, setValidationErr } =
    useForm(initialObj);
  const submitHandeler = async (e) => {
    e.preventDefault();
    if (!Object.values(Validation(formData)).length) {
      try {
        dispatch(logIn(formData.email , formData.password));
      } catch (error) {
        setErr(error);
      }
    } else {
      setValidationErr(Validation(formData));
    }
  };
  return (
    <div>
    {loading && <Loading/>}
    {error && <h2>{error.message}</h2>}
    <div className="logInForm container w-100 d-flex justify-content-center" id='formDiv'>
      <form onSubmit={submitHandeler}>
        <input
          type='text'
          name='email'
          placeholder={validationErr ? validationErr.email : "email"}
          value={formData.email}
          className='form-control mb-3 text-center'
          onChange={handelChange}
        />

        <input
          type='password'
          autoComplete="off"
          name='password'
          placeholder={validationErr ? validationErr.password : "password"}
          value={formData.password}
          className='form-control mb-3 text-center'
          onChange={handelChange}
        />

        <button className='btn btn-success'>LogIn</button>
      </form>

      </div>
      <Link to='/register'>
        <button className='btn btn-info mt-2'  id='switchBtn' >Switch To Register</button>
        </Link>
    </div>
  );
};

export default Login;
