const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    customerId: String,
    items: [
      {
        product: {
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
        unit: { type: Number, require: true },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
      timestamps: true,
    },
  }
);

module.exports = mongoose.model("cart", CartSchema);
