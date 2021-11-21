/** @format */

import React, {useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  fecthData } from "../../../actions/action";
import EditIcon from "@material-ui/icons/Edit";
import "./AllMenu.css";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import Loading from "../../util/Loading";

import { Link } from "react-router-dom";
const AllMenu = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fecthData());
  }, [dispatch]);
  const { data, loading, error } = useSelector((state) => state.allProducts);

  return (
    <div style={{ height: "100%", overflow: "scroll" }}>
    
      {loading && <Loading />}
      {loading && <h1>{error}</h1>}
      <table className='table table-striped table-hover'>
        <thead>
          <tr className='table-active'>
            <th>name</th>
            <th>ingredients</th>
            <th>price</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => {
              return (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.image}
                      alt='pic'
                      style={{ width: "100px", height: "100px", float: "left" }}
                      className='me-2'
                    />
                    {item.name}
                  </td>
                  <td> {item.ingredients}</td>
                  <td> {item.price}Rs</td>
                  <td>
                    <Link to={`/admin/menu/${item._id}`}>
                      <EditIcon className='edit_delete' />
                    </Link>
                    ,
                   <Link to={`/admin/menu/delete/${item._id}`}> <button
                      className='edit_delete'
                     >
                      <DeleteIcon />
                    </button></Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AllMenu;
