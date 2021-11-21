/** @format */

import React from "react";
import useForm from "../../Hooks/UseForm";
import Validation from '../../util/Validation'
import {useDispatch } from 'react-redux';
import {addNewMenu} from '../../../actions/action';
import { useHistory } from "react-router";
import './Addmenu.css';
const AddMenu = () => {
    const dispatch = useDispatch();
    const history = useHistory();
  const intitalData = {
    name: "",
    ingredients: "",
    price: "",
    image: "",
    productID :""
  };
  const { handelChange, formData, setValidationErr, validationErr } =
    useForm(intitalData);

  const submitHandler = (e) => {
    e.preventDefault();
    if(Object.values(Validation(formData)).length === 0 ){
        dispatch(addNewMenu(formData));
        history.push('/admin/menu');
    }
    else{
        setValidationErr((Validation(formData)))
    }
  };
  return (
    <>
      <form method='POST' onSubmit={submitHandler}>
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            value={formData.name}
            onChange={handelChange}
            name='name'
            placeholder={validationErr ? validationErr.name : 'Name'}
          />
        </div>
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            value={formData.ingredients}
            onChange={handelChange}
            name='ingredients'
            placeholder={validationErr ? validationErr.ingredients : 'ingredients'}
          />
        </div>
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            value={formData.price}
            onChange={handelChange}
            name='price'
            placeholder={validationErr ? validationErr.price : 'price'}
          />
        </div>
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            value={formData.image}
            onChange={handelChange}
            name='image'
            placeholder={validationErr ? validationErr.image : 'image'}
          />
        </div>
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            value={formData.productID}
            onChange={handelChange}
            name='productID'
            placeholder={validationErr ? validationErr.productID : 'productID'}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </>
  );
};

export default AddMenu;
