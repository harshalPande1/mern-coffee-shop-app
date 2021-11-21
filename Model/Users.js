/** @format */

const Mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new Mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    mobile: { type: String , required: true },
    address: { type: String , required: true },
    pincode: { type: String , required: true },
    orders: [{ type: Mongoose.Schema.Types.ObjectId, ref: "orders" }],
    productid: [String],
    isAdmin : {
      type : Boolean,
      default: false
    }
  },
  { timeStamp: true },
);

userSchema.methods.generateToken = async function (id) {
  const token = await jwt.sign(
    { id: this._id, firstName: this.fname },
    process.env.SECRET_KEY,
    { expiresIn: "24h" },
    );
    
  return token;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const userModel = Mongoose.model("users", userSchema);

module.exports = userModel;
