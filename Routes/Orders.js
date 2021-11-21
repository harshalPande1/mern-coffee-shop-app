const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
route.use(bodyParser.json());
const authenticaion  = require('../middelware/authontication')
const {placeOrder, GetOrder, getAllOrders, modifyOrder} = require('../controllers/OrdersController');

route.get('/placeorder/:id',authenticaion,GetOrder);
route.post('/placeorder',authenticaion,placeOrder);
route.patch('/changeorder/:id',authenticaion,modifyOrder);
route.get('/orders',authenticaion,getAllOrders);
module.exports = route;