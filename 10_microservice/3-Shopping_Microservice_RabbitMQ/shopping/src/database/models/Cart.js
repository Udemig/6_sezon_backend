const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  customerId: String,
  items: [
    {
      _id: String,
      name: String,
      desc: String,
      price: Number,
      banner: String,
      type: String,
      unit: Number,
      available: Boolean,
      suplier: String,
    },
  ],
});

module.exports = mongoose.model("cart", CartSchema);
