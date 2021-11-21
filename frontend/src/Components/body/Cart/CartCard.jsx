/** @format */

import React from "react";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import "./Cart.css";

import { fetchSingleProduct } from "../../../actions/action";
const CartCard = (props) => {
  const {
    items: { name, image, ingredients, price, productID, qty, _id },
  } = props;
  const { dispatch, removeItem } = props;
  return (
    <>
      <div className='container-md'>
        <div className='cart_card_col'>
          <img
            src={image}
            alt='coffee'
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className='cart_card_col'>
          <h4>{name ? name.substring(0, 20) : null} </h4>
          <p>{ingredients}</p>
          <p>Rs {price}</p>
          {
            <span className='qty'>
              <AddIcon
                className='me-3'
                style={{ cursor: "pointer" }}
                onClick={() =>
                  dispatch(fetchSingleProduct(productID, Number(qty + 1)))
                }>
                +
              </AddIcon>
              <p>{qty}</p>
              <RemoveIcon
                className='ms-3'
                style={{ cursor: "pointer" }}
                onClick={() =>
                  dispatch(fetchSingleProduct(productID, Number(qty - 1)))
                }>
                -
              </RemoveIcon>
            </span>
          }
        </div>
        <div className='cart_card_col'>
        <div className="qtyDiv">
          <strong className='d-block'>
            Qty <strong>{qty}</strong>
          </strong>
          </div>
        </div>
        <div className='cart_card_col'>
          <DeleteOutlineIcon
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => removeItem(_id)}>
            X
          </DeleteOutlineIcon>
        </div>
      </div>
    </>
  );
};

export default CartCard;
