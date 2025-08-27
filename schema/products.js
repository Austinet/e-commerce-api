const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    productName: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    stockStatus: {
      type: "string",
      enum: ["in-stock", "low-stock", "out-of-stock"],
      default: "out-of-stock",
    },
    ownerId: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", schema);
module.exports = productModel;
