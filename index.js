/** @format */

const express = require("express");
const app = express();
const Mongoose = require("mongoose");
const cors = require("cors");

const userController = require('./Routes/userRoute');
const productsController = require('./Routes/productRoute');
const ordersController = require('./Routes/Orders');

app.use(cors({origin : "*"}));



app.use('/user',userController);
app.use('/product/api',productsController);
app.use('/orders',ordersController);


app.use((err, req, res, next) => {
  const {message , status} = err
  res.status(500).send( {message : message, status :status }|| "Something broke!" );
});

app.listen(process.env.PORT, () => {
  Mongoose.connect(process.env.DB)
    .then(() => {
      console.log("server and database running");
    })
    .catch((e) => {
      console.log(e);
    });
});
