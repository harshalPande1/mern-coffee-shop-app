/** @format */

const Mongoose = require("mongoose");

const orderSchema = new Mongoose.Schema({
  product: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
  ],
  users: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  payment: { type: Boolean, required: true, default: false },
  totalPrice: { type: String, required: true, default: 0.0 },
  isDeliverd: { type: Boolean, required: true, default: false },
  paymentBy: { type: String, required: true },
  shippingAddress: { type: Object, required: true },
  mobileNumber: { type: String, required: true },
  qty: { type: String, required: true },
});

const orderModel = Mongoose.model("orders", orderSchema);

module.exports = orderModel;
