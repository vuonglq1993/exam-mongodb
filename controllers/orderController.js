const Order = require('./../models/order');

// 1. Insert many orders
exports.insertManyOrders = async (req, res) => {
  try {
    const orders = req.body;
    const result = await Order.insertMany(orders);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Update delivery_address by orderid
exports.updateAddress = async (req, res) => {
  const { orderid } = req.params;
  const { delivery_address } = req.body;
  try {
    const result = await Order.findOneAndUpdate(
      { orderid: parseInt(orderid) },
      { delivery_address },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Delete order by orderid
exports.deleteOrder = async (req, res) => {
  const { orderid } = req.params;
  try {
    const result = await Order.findOneAndDelete({ orderid: parseInt(orderid) });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Calculate total amount
exports.getTotalAmount = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total_amount" } } }
    ]);
    res.json(result[0] || { total: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Count product_id = "somi"
exports.countSomi = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $unwind: "$products" },
      { $match: { "products.product_id": "somi" } },
      {
        $group: {
          _id: "$products.product_id",
          totalQuantity: { $sum: "$products.quantity" }
        }
      }
    ]);
    res.json(result[0] || { product_id: "somi", totalQuantity: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
