/** @format */

const express = require("express");
const route = express.Router();
const bodyParser = require("body-parser");
const authication = require("../middelware/authontication");
const {
  products,
  product_pID,
  addProduct,
  UpdateProduct,
  fetchOneProduct,
  deleteProduct,
} = require("../controllers/productController");
const {  check } = require("express-validator");
route.use(bodyParser.json());

route.get("/product", products);
route.get("/product/:pID", product_pID);
route.post(
  "/addproduct",
  check("name").not().isEmpty(),
  check("ingredients").not().isEmpty(),
  check("productID").not().isEmpty(),
  check("price").not().isEmpty(),
  check("image").not().isEmpty(),
  authication,
  addProduct,
);
route.patch(
  "/updateproduct/:id",
  check("name").not().isEmpty(),
  check("ingredients").not().isEmpty(),
  check("productID").not().isEmpty(),
  check("price").not().isEmpty(),
  check("image").not().isEmpty(),
  authication,
  UpdateProduct,
);
route.delete('/deleteproduct/:id',authication,deleteProduct);

module.exports = route;
