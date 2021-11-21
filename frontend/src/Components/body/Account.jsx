/** @format */

import React, { useState } from "react";
import "./auth/auth.css";
import Register from "./auth/Register";
import { Link } from "react-router-dom";
const Account = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  return (
    <div className='container' id='regi_div'>
      <Register
        loading={loading}
        setLoading={setLoading}
        err={err}
        setErr={setErr}
      />
      <Link to='/login'>
        <button className='btn btn-info mt-2'>Switch To Login</button>
      </Link>
    </div>
  );
};

export default Account;
