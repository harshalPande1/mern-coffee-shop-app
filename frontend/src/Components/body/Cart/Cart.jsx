/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";



import "./Cart.css";
import CartCard from "./CartCard";

import { useHistory } from "react-router";
import {
  removeItemFormCart,
  removeItemAllFormCart,
} from "../../../actions/action";
const Cart = () => {
 const history= useHistory();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const { cartItem } = cartData;
  const removeItem = (id) => {
    dispatch(removeItemFormCart(id));
  };
  return (
    <>
      <div className='container_main'>
        <div className='cart_items'>
          {cartItem.length === 0 ? (
            <h2>cart empty</h2>
          ) : (
            cartItem.map((ele) => (
              <CartCard
                items={ele}
                dispatch={dispatch}
                removeItem={removeItem}
                key={ele._id}
              />
            ))
          )}
        </div>
        <div className='cart_card_total'>
          <h1>
            Subtotal {cartItem.reduce((acc, item) => acc + Number(item.qty), 0)}
          </h1>
          total
          <p>
            {cartItem.reduce(
              (acc, item) => acc + item.qty * Number(item.price),
              0,
            )}
          </p>
        </div>
        <div className='cart_card_btn'>
          <span>
            <button
              className='btn btn-danger me-4'
              onClick={() => dispatch(removeItemAllFormCart())}
              variant='contained'
              color='secondary'
              id='delBTN'>
              Delete All
            </button>
            <button
              className='btn btn-success ms-4'
              id='buyBTN'
              onClick={() => history.push('/shippingaddress')}>
              Buy
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default Cart;
