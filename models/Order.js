const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: String,
  product_name: String,
  size: String,
  price: Number,
  quantity: Number,
});

const orderSchema = new mongoose.Schema({
  orderid: Number,
  products: [productSchema],
  total_amount: Number,
  delivery_address: String,
});

module.exports = mongoose.model('OrderCollection', orderSchema);
