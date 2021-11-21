/** @format */

import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllOrders, orderStatus } from "../../../actions/action";
import Loading from "../../util/Loading";
import "./AllOrders.css";

const AllOrders = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  const { allOrders, error, loading } = useSelector(
    (state) => state.GetAllOrders,
  );
  const changeStatusHandler = (status, id) => {
    dispatch(orderStatus(status, id));
    history.go("/admin/orders");
  };

  return (
    <>
      {loading && <Loading />}
      {error && <h3>{error}</h3>}
      <div className='mainContainer'>
        <div className='divConatiner'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>User</th>
                <th>Products</th>
                <th>qty</th>
                <th>Total Price</th>
                <th>Payment</th>
                <th>isDelivered</th>
                <th>PaymentBy</th>
              </tr>
            </thead>
            <tbody>
              {allOrders &&
                allOrders[0] &&
                allOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.users}</td>
                    <td>
                      {order.product.map((product) => product.name) + " ,"}
                    </td>
                    <td>{order.qty}</td>
                    <td>{order.totalPrice} Rs</td>
                    <td
                      className={order.payment ? "successClass" : "failClass"}>
                      <button
                        id='switchBTN'
                        style={
                          order.payment ? { color: "green" } : { color: "red" }
                        }
                        onClick={() =>
                          changeStatusHandler(
                            { paymentStatus: !order.payment },
                            order._id,
                          )
                        }>
                        {order.payment ? "Success" : "Payment Pending"}
                      </button>
                    </td>
                    <td
                      className={
                        order.isDeliverd ? "successClass" : "failClass"
                      }>
                      <button
                        id='switchBTN'
                        style={
                          order.isDeliverd
                            ? { color: "green" }
                            : { color: "red" }
                        }
                        onClick={() =>
                          changeStatusHandler(
                            { isDeliverdStatus: !order.isDeliverd },
                            order._id,
                          )
                        }>
                        {order.isDeliverd ? "Success" : "Payment Pending"}
                      </button>
                    </td>
                    <td className='text-info'>{order.paymentBy}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <div className='smallScreen'>
          {allOrders &&
            allOrders[0] &&
            allOrders.map((order) => {
              return (
                <table id='innerDiv' key={order._id}>
                  <thead>
                    <tr>
                      <th className='th'>Order Id</th>
                      <th className='th'>User</th>
                      <th className='th' id='products'>
                        Products
                      </th>
                      <th className='th'>qty</th>
                      <th className='th'>Total Price</th>
                      <th className='th'>Payment</th>
                      <th className='th'>isDelivered</th>
                      <th className='th'>PaymentBy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={order._id}>
                      <td id='tdata'>{order._id}</td>
                      <td id='tdata'>{order.users}</td>
                      <td id='tdata'>
                        <div>
                          {order.product.map((product) => product.name) + " ,"}{" "}
                        </div>
                      </td>
                      <td id='tdata'>{order.qty}</td>
                      <td id='tdata'>{order.totalPrice} Rs</td>
                      <td
                        id='tdata'
                        className={
                          order.payment ? "successClass" : "failClass"
                        }>
                        <button
                          id='switchBTN'
                          style={
                            order.payment
                              ? { color: "green" }
                              : { color: "red" }
                          }
                          onClick={() =>
                            changeStatusHandler(
                              { paymentStatus: !order.payment },
                              order._id,
                            )
                          }>
                          {order.payment ? "Success" : "Payment Pending"}
                        </button>
                      </td>
                      <td
                        id='tdata'
                        className={
                          order.isDeliverd ? "successClass" : "failClass"
                        }>
                        <button
                          id='switchBTN'
                          style={
                            order.isDeliverd
                              ? { color: "green" }
                              : { color: "red" }
                          }
                          onClick={() =>
                            changeStatusHandler(
                              { isDeliverdStatus: !order.isDeliverd },
                              order._id,
                            )
                          }>
                          {order.isDeliverd ? "Success" : "Payment Pending"}
                        </button>
                      </td>
                      <td id='tdata' className='text-info'>
                        {order.paymentBy}
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default AllOrders;
