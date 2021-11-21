/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUser } from "../../actions/action";
import { Button } from "react-bootstrap";
import Loading from "../util/Loading";
import "./profile.css";
import UpdateProfile from "./Modal/UpdateProfile";
import { useHistory } from "react-router";
import ProfileCard from "./ProfileCard";
const Profile = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.LogInUser);
  const { loading, error, userDetailes } = useSelector(
    (state) => state.fetchUser,
  );

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchUser(userInfo.token));
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);

  return (
    <>
      {loading && <Loading />}
      {error && <h2>{error}</h2>}
      {showModal && (
        <UpdateProfile
          showFun={setShowModal}
          userDetailes={userDetailes}
          token={userInfo.token}
        />
      )}
      <div className='profile_container d-flex w-100 h-100'>
        <div className='profile_card' style={{ width: "18rem" }}>
          <h2>
            {userDetailes && userDetailes.fname} {userDetailes.lname}
          </h2>
          <p>
            <strong>Email :</strong>
            {userDetailes && userDetailes.email}
          </p>
          <p>
            <strong>Contact no:</strong>
            {userDetailes && userDetailes.mobile}
          </p>
          <p>
            <strong>Address :</strong>
            {userDetailes && userDetailes.address}
          </p>
          <p>
            <strong>Pincode :</strong>
            {userDetailes && userDetailes.pincode}
          </p>

          <div>
            <Button variant='outline-info' onClick={() => setShowModal(true)}>
              Edit
            </Button>
          </div>
        </div>
        <div className='sub_container' style={{overflow:"scroll"}}>
          My Orders
          {userDetailes &&
            userDetailes.orders &&
            userDetailes.orders.map((ele) => <ProfileCard key={ele._id} order={ele}/> )}
        </div>
      </div>
    </>
  );
};

export default Profile;
