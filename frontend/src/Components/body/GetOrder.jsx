/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Loading from "../util/Loading";
import { getOrder } from "../../actions/action";
const GetOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {  order , loading ,error } = useSelector((state) => state.GetOrder);
  useEffect(() => { 
    dispatch(getOrder(id));
  }, [dispatch,id]);
  return (
    <>
      {loading && <Loading />}
      {error ? <h4>{error.message}</h4> :
      <div className='container'>
        <h3 className='h3'>Order ID : {order._id}</h3>
     
       <div className="mt-2 border-top">
       <p className='mt-4  fs-4 lh-md'><strong>Name : </strong>{ order.shippingAddress && order.shippingAddress.fname +  " " + order.shippingAddress.lname }</p>
        <p className='mt-3 fs-4 lh-md'><strong>Email : </strong>{ order.shippingAddress && order.shippingAddress.email }</p>
        <p className='mt-3 fs-4 lh-md'><strong>Address : </strong>{ order.shippingAddress && order.shippingAddress.address }</p>
        <p className='mt-3 fs-4 lh-md'><strong>Payment Method : </strong>{order.paymentBy}</p>
       </div>
       <div className=' border-top'>
         <span className=' fs-5'><strong className='m-3'>Payment :</strong> {order.payment ? 'SuccessFull' : 'Not At'} <strong className='m-3'>TotalPrice :</strong>  {order.totalPrice} <strong className='m-3'>Deliverd :</strong>  {order.isDeliverd ? 'successFull' : 'Not At'}</span>
       </div>
     <h4 className='mt-5'>{order && 'Order Place'} </h4>
      </div> 
      }
    </>
  );
};

export default GetOrder;
