/** @format */

import React from "react";
import Navbar from "../head/Navbar";
import Heading from "../head/Heading";

import './head.css';
function Header(props) {
  return (
    <div className='nav_container'>
      <div>
        <Heading />
      </div>
      <Navbar />
       
      <button className='nav_handberger' onClick={()=>props.showSideBar()}>
          <span className='handberger_span'></span>
          <span className='handberger_span'></span>
          <span className='handberger_span'></span>
        </button>
    </div>
  );
}

export default Header;
