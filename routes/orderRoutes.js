const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Question 2 Insert orders 
router.post('/insert', orderController.insertManyOrders);

//  Edit delivery_address 
router.put('/update-address/:orderid', orderController.updateAddress);

//  Remove an order 
router.delete('/:orderid', orderController.deleteOrder);

//  Read all order 
router.get('/', orderController.getAllOrders);

// Calculate total amount 
router.get('/total-amount', orderController.getTotalAmount);

// Count total product_id 
router.get('/count-somi', orderController.countSomi);

module.exports = router;
