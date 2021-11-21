/** @format */

const productModel = require("../Model/Product");
const userModel = require("../Model/Users");
const htmlError = require("../HtmlError");
const { validationResult } = require("express-validator");

const products = async (req, res, next) => {
  try {
    const FoundProducs = await productModel.find({});
    if (!FoundProducs) {
      throw new htmlError("data not found", 500);
    } else {
      res.send(FoundProducs);
    }
  } catch (error) {
    next(error);
  }
};

const product_pID = async (req, res, next) => {
  try {
    const FoundProduct = await productModel.findOne({
      productID: req.params.pID,
    });
    if (!FoundProduct) {
      throw new htmlError("product not found", 500);
    } else {
      res.send(FoundProduct);
    }
  } catch (error) {
    next(error);
  }
};
const addProduct = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.json({
        Type: "Error",
        status: 404,
        data: err,
      });
    }
    if (!user.isAdmin) {
      throw new htmlError("not allow", 500);
    } else {
      const newProduct = new productModel({ ...req.body });
      await newProduct.save();
    }
  } catch (error) {
    next(error);
  }
};

const UpdateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    const user = await userModel.findById(userId);
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.json({
        Type: "Error",
        status: 404,
        data: err,
      });
    }
    if (!user.isAdmin) {
      throw new htmlError("not allow", 500);
    } else {
      const product = await productModel.findByIdAndUpdate({_id : id},{...req.body});
      res.send(product)
    }
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async(req,res,next) =>{
try {
  const userId = req.userId;
  const pId = req.params.id;
  const user = await userModel.findById({_id : userId});
  if(!user.isAdmin){
    throw new htmlError("not allow", 500);
  }else{
        const product = await productModel.findByIdAndDelete({_id : pId});
        res.status(200).send(product);
  }
} catch (error) {
  next(error);
}
}
module.exports = {
  products,
  product_pID,
  addProduct,
  UpdateProduct,
  deleteProduct,
};
