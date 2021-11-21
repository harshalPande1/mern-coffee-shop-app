/** @format */

const userModel = require("../Model/Users");
const ordersModel = require("../Model/orders");
require("dotenv").config();
const htmlError = require("../HtmlError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const fetchUsers = async (req, res, next) => {
  try {
    const foundUsers = await userModel.find().populate({path : 'orders' , populate : {path : 'product' }});
    
    if (foundUsers) {
      res.status(200).send(foundUsers);
    } else {
      throw new htmlError("user not found", 404);
    }
  } catch (error) {
    next(error);
  }
};


const fetchSingleUser = async (req, res, next) => {
  try {
    const foundUser = await userModel
      .findOne({ _id: req.userId })
      .populate({ path: "orders", populate: { path: "product" } });

    if (foundUser) {
      res.status(200).send({
        fname: foundUser.fname,
        lname: foundUser.lname,
        email: foundUser.email,
        mobile: foundUser.mobile,
        address: foundUser.address,
        pincode: foundUser.pincode,
        orders: foundUser.orders,
      });
    } else {
      throw new htmlError("user not found", 404);
    }
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.json({
        Type: "Error",
        status: 404,
        data: err,
      });
    } else {
      const { fname, lname, email, password, mobile, address, pincode } =
        req.body;
      const existEmail = await userModel.findOne({ email: email });
      if (existEmail) {
        throw new htmlError("email id already exist", 302);
      } else {
        const newUser = new userModel({
          fname,
          lname,
          email,
          mobile,
          address,
          pincode,
          password,
        });
        const token = await newUser.generateToken();
        const data = await newUser.save();
        if (data) {
          await res.send({
            fname,
            lname,
            email,
            mobile,
            token,
          });
        } else {
          throw new htmlError("data not saved", 404);
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

const logInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await userModel.findOne({ email: email });
    if (userExist && (await bcrypt.compare(password, userExist.password))) {
      const token = await userExist.generateToken(userExist._id);
      res.status(200).send({
        fname: userExist.fname,
        lname: userExist.lname,
        email: userExist.email,
        address: userExist.address,
        mobile: userExist.mobile,
        pincode: userExist.pincode,
        expireIn: jwt.decode(token).exp,
        token,
        admin : userExist.isAdmin
      });
    } else {
      throw new Error("invalid Email or password", 401);
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const Id = req.userId;
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.send({
        type: "error",
        status: 400,
        data: err,
      });
    } else {
      const updateUser = await userModel.findByIdAndUpdate(
        { _id: Id },
        {
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          mobile: req.body.mobile,
          password: await bcrypt.hash(req.body.password, 12),
          address: req.body.address,
          pincode: req.body.pincode,
        },
      );
      if (updateUser) {
        await updateUser.save();
        res.status(200).send(updateUser);
      } else {
        throw new htmlError("user not found", 500);
      }
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.userid;
  try {
    const deleteUser = await userModel.findOneAndDelete({ _id: userId });
    if (deleteUser) {
      res.json({
        type: "delete",
        status: 200,
        data: deleteUser,
      });
    } else {
      throw new htmlError("user not deleted...", 402);
    }
  } catch (error) {
    next(error);
  }
};
const fetchAdminInfo = async(req,res,next) =>{
try {
  const userId = req.userId;
  const {isAdmin} = await userModel.findById(userId);
  if(isAdmin){
    const users = await userModel.find();
    const orders = await ordersModel.find();
    if(orders && users) {
      res.status(200).send({
        users,
        orders
      });
    }else{
      throw new htmlError('data not found',400);
    }
   
  }else{
    throw  new htmlError('you are not allowed to access ',401);
  }

} catch (error) {
  next(error);
}
}
const adminStatus = async (req, res, next) => {
  const Id = req.body._id;
  try {
    
    const update_Status = await userModel.findByIdAndUpdate(
      { _id: Id },
      {
        ...req.body
      },
      );
      if (update_Status) {
        await update_Status.save();
        res.status(200).send(update_Status);
      } else {
        throw new htmlError("user not found", 500);
      }
    
  } catch (error) {
    next(error);
  }
};
module.exports = {
  fetchUsers,
  logInUser,
  fetchSingleUser,
  registerUser,
  updateUser,
  deleteUser,
  fetchAdminInfo,
  adminStatus,
};
