/** @format */

import { Table } from "react-bootstrap";
import React from "react";
import "./profile.css";
const ProfileCard = ({ order }) => {

  return (
    <>
      <Table striped bordered hover id="profileTable">
        <thead>
          <tr>  
            <th>Order Id</th> 
            <th>Product</th>
            <th>price</th>
            <th>Payment</th>
            <th>deliverd</th>
          </tr>
        </thead>
        <tbody className='tableBody'>
          <tr>
            <td className='tableData'>{order._id}</td>
            <td className='tableData'>{order.product.map(item => item.name + ", ")}</td>
            <td className='tableData'>{order.totalPrice}</td>
            <td className='tableData'>{order.paymentBy}</td>
            <td className='tableData' style={!order.isDeliverd ? {color : "red" } : {color : "green"}}>{order.isDeliverd ? 'Deliverd' :'Not Deliverd'}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ProfileCard;
