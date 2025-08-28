const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    productImages: {
      type: Array,
      required: true,
    },
    stockStatus: {
      type: String,
      enum: ["in-stock", "low-stock", "out-of-stock"],
      default: "out-of-stock",
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", schema);
module.exports = productModel;
