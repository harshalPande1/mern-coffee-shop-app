/** @format */

import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FetchAllUser, updateAdmin } from "../../../actions/action";
import { useHistory } from "react-router";
import Loading from "../../util/Loading";
import "./Allusers.css";
const AllUsers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(FetchAllUser());
  }, [dispatch]);
  const { users, error, loading } = useSelector((state) => state.FetchAllUser);

  const changeAdminHandler = (value, id) => {
    dispatch(updateAdmin({ isAdmin: value, _id: id }));
    history.push("/admin/user");
  };

  return (
    <>
      {loading && <Loading />}
      {error && <h4>{error.message}</h4>}
      <div className='usersMainContainer'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.fname + " " + user.lname}</td>

                    <td>
                      <button
                        id='switchBTN'
                        style={
                          user.isAdmin ? { color: "green" } : { color: "red" }
                        }
                        onClick={() =>
                          changeAdminHandler(!user.isAdmin, user._id)
                        }>
                        {user.isAdmin ? "Admin" : "User"}
                      </button>
                    </td>

                    <td>
                      <Link to='/admin/orders' id='tableLink'>
                        {user.orders && user.orders.length}
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

      <div className='smallScreen'>
          {users &&
            users.map((user) => {
              return (
        <table key={user._id}>
                
                  <thead >
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      
                      <td>{user._id}</td>
                      <td>{user.fname + " " + user.lname}</td>
                      <td>
                      <button
                      id="switchBTN"
                        style={
                          user.isAdmin ? { color: "green" } : { color: "red" }
                        }
                        onClick={() =>
                          changeAdminHandler(!user.isAdmin, user._id)
                        }>
                        {user.isAdmin ? "Admin" : "User"}
                      </button>
                    </td>

                    <td>
                      <Link to='/admin/orders' id='tableLink'>
                        {user.orders && user.orders.length}
                      </Link>
                    </td>
                    </tr>
                  </tbody>
                
        </table>
              );
            })}
      </div>
    </>
  );
};

export default AllUsers;
