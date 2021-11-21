/** @format */

import React from "react";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { updateProduct } from "../../../actions/action";
import useForm from "../../Hooks/UseForm";
import Validation from "../../util/Validation";
const MenuUpdateModal = ({ showFun }) => {
  const { data } = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams();
  let singleproduct = data.filter((item) => (item._id === id ? item : null));
  singleproduct = singleproduct[0];
  const intitalData = {
    name: singleproduct ? singleproduct.name : "",
    ingredients: singleproduct ? singleproduct.ingredients : "",
    price: singleproduct ? singleproduct.price : "",
    image: singleproduct ? singleproduct.image : "",
    productID: singleproduct ? singleproduct.productID : "",
  };
  const { formData, handelChange, setValidationErr, validationErr } =
    useForm(intitalData);
  const submitHandler = (e) => {
    e.preventDefault();
    if (Object.values(Validation(formData)).length === 0) {
      dispatch(updateProduct(formData,id))
      history.push('/admin/menu')
    } else {
      setValidationErr(Validation(formData));
    }
  };
  const updateMenuModal = (
    <div className='container' id='profile_modal'>
      <div className='header d-flex'>
        <h2>Update Profile</h2>
        <button onClick={() => history.push('/admin/menu')}>X</button>
      </div>
      <div className='bodyContent'>
        <form method='POST' onSubmit={submitHandler}>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control w-50 m-auto mt-4'
              value={formData.name}
              onChange={handelChange}
              name='name'
              placeholder={validationErr ? validationErr.name : "Name"}
            />
          </div>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control w-50 m-auto mt-4'
              value={formData.ingredients}
              onChange={handelChange}
              name='ingredients'
              placeholder={
                validationErr ? validationErr.ingredients : "ingredients"
              }
            />
          </div>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control w-50 m-auto mt-4'
              value={formData.price}
              onChange={handelChange}
              name='price'
              placeholder={validationErr ? validationErr.price : "price"}
            />
          </div>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control w-50 m-auto mt-4'
              value={formData.image}
              onChange={handelChange}
              name='image'
              placeholder={validationErr ? validationErr.image : "image"}
            />
          </div>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control w-50 m-auto mt-4'
              value={formData.productID}
              onChange={handelChange}
              name='productID'
              placeholder={
                validationErr ? validationErr.productID : "productID"
              }
            />
          </div>

          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
  return ReactDom.createPortal(
    updateMenuModal,
    document.getElementById("updateMenu"),
  );
};

export default MenuUpdateModal;
