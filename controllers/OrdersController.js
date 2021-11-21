/** @format */

const HtmlError = require("../HtmlError");
const orderModel = require("../Model/orders");
const userModel = require("../Model/Users");

const placeOrder = async (req, res, next) => {
  try {
    const {
      product,
      payment,
      shippingAddress,
      mobileNumber,
      paymentBy,
      totalPrice,
      deliverd,
      qty,
    } = req.body;

    const newOrder = new orderModel({
      product: product,
      qty: qty,
      payment: payment,
      shippingAddress: shippingAddress,
      mobileNumber: mobileNumber,
      paymentBy: paymentBy,
      totalPrice: totalPrice,
      deliverd: deliverd,
      users: req.userId,
    });
    const user = await userModel.findById(req.userId);
    await user.orders.push(newOrder._id);
    await user.save();
    const orderRes = await newOrder.save();
    res.send(orderRes);
  } catch (error) {
    next(error);
  }
};

const GetOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const FoundOrder = await orderModel
      .findOne({ _id: id })
      .populate("users", "name email");
    if (!FoundOrder) {
      throw new HtmlError("order not found", 401);
    } else {
      res.status(200).send(FoundOrder);
    }
  } catch (error) {
    next(error);
  }
};
const getAllOrders = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (user.isAdmin) {
      const orders = await orderModel.find().populate("product");
      if (!orders) {
        throw new HtmlError("Orders Not Availabes", 500);
      } else {
        res.status(200).send(orders);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
const modifyOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (user.isAdmin && req.body && req.params.id) {
      const Order = await orderModel.findById(req.params.id);
      if (req.body.paymentStatus === true) {
        Order.payment = true;
      } else if(req.body.paymentStatus === false) {
        Order.payment = false;
      }
    
      if (req.body.isDeliverdStatus === true) {
        Order.isDeliverd = true;
      } else if(req.body.isDeliverdStatus === false){
        Order.isDeliverd = false;
      }
      await Order.save();
      res.status(200).send(Order);
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { placeOrder, GetOrder, getAllOrders, modifyOrder };
