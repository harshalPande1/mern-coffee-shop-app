/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const {
  fetchUsers,
  fetchSingleUser,
  registerUser,
  updateUser,
  deleteUser,
  logInUser,
  fetchAdminInfo,
  adminStatus,
} = require("../controllers/userController");
const { check } = require("express-validator");
const authontication = require("../middelware/authontication");

const route = express.Router();

route.use(bodyParser.json());

// route.use((req,res,next)=>{
//   console.log(req);
//   next()
// })

route.get('/fetchusers',authontication,fetchUsers);



route.post(
  "/login",
  check("email").not().isEmpty().normalizeEmail().isEmail(),
  check("password").not().isEmpty().isLength({ min: 3, max: 5 }),
  logInUser,
);
route.post(
  "/register",
  check("fname").not().isEmpty(),
  check("lname").not().isEmpty(),
  check("email").not().isEmpty().normalizeEmail().isEmail(),
  check("mobile").not().isEmpty().isLength({ min: 10, max: 10 }),
  check("password").not().isEmpty().isLength({ min: 3, max: 5 }),
  check("pincode").not().isEmpty(),
  check("address").not().isEmpty(),
  registerUser,
);
route.get("/profile", authontication, fetchSingleUser);
route.get('/admin',authontication,fetchAdminInfo);

route.patch(
  "/update",
  check("fname").not().isEmpty(),
  check("lname").not().isEmpty(),
  check("email").not().isEmpty().normalizeEmail().isEmail(),
  check("mobile").not().isEmpty().isLength({ min: 10, max: 10 }),
  check("password").not().isEmpty().isLength({ min: 3, max: 5 }),
  check("address").not().isEmpty(),
  check("pincode").not().isEmpty(),
  authontication,
  updateUser,
);
route.patch(
  "/adminstatus",
  authontication,
  adminStatus,
  );

route.delete("/delete/:userid", authontication, deleteUser);
module.exports = route;
