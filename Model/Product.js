const Mongoose = require('mongoose');


const ProductSchema = new Mongoose.Schema({
name : String ,
ingredients : String,
image : String,
productID : Number,
price : Number
});

const productModel = Mongoose.model('Products',ProductSchema);


module.exports = productModel;
