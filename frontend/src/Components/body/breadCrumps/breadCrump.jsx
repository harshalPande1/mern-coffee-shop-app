/** @format */

import React from "react";
import { Link } from "react-router-dom";
import "./breadcrump.css";
const BreadCrumps = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      <nav className='breadCrump_nav'>
        <ul>
          <li>
            {step1 ? (
              <Link to='/sing-up'>
                
                <button  style={{ backgroundColor: "green"   }} id='breadCrump_btn'>SingUP</button>
              </Link>
            ) : (
              <Link to='/sing-up'>
                
                <button  style={{ backgroundColor: "gray"  }} id='breadCrump_btn' disabled>
                  SingUP
                </button>
              </Link>
            )}
          </li>
          <li>
            {step1 && step2 ? (
              <Link to='/shippingaddress'>
                
                <button
                  style={{ backgroundColor: "green"   }}
                  id='breadCrump_btn'>
                  Shipping Address
                </button>
              </Link>
            ) : (
              <Link to='/shippingaddress'>
                <button
                  style={{ backgroundColor: "gray" }}
                  id='breadCrump_btn'
                  disabled>
                  Shipping Address
                </button>
              </Link>
            )}
          </li>
          <li>
            {step2 && step3 ? (
              <Link to='/paymentmethod'>
                
                <button  style={{ backgroundColor: "green"   }} id='breadCrump_btn'>Payment Method</button>
              </Link>
            ) : (
              <Link to='/paymentmethod'>
                <button  style={{ backgroundColor: "gray" }} id='breadCrump_btn' disabled>
                  Payment Method
                </button>
              </Link>
            )}
          </li>
          <li>
            {step3 && step4 ? (
              <Link to='/placeorder'>
                
                <button  style={{ backgroundColor: "green"   }} id='breadCrump_btn'>Place Order</button>
              </Link>
            ) : (
              <Link to='/placeorder'>
                <button  style={{ backgroundColor: "gray" }} id='breadCrump_btn' disabled>
                  Place Order
                </button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default BreadCrumps;
