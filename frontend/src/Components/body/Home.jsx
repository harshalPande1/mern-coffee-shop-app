/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fecthData } from "../../actions/action";
import Loading from "../util/Loading";
import Card from "./Card";
const Home = () => {
  const Dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts);
  const { loading, data, error } = products;
  useEffect(() => {
    Dispatch(fecthData());
  }, [Dispatch]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <h2> {error.map((e) => e.message + " " + e.status)} </h2>
      ) : data ? (
        <div className='container row'>
          {data.map((ele) => {
            return (
              <Card
                key={ele.productID}
                imgSrc={ele.image}
                title={ele.name}
                price={ele.price}
                productID={ele.productID}
              />
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default Home;
