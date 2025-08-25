const express = require("express");
const productRouter = express.Router();
const {
  getAllProducts,
  addProduct,
  deleteProduct,
} = require("../controller/productController");

productRouter.get("/", getAllProducts);
productRouter.post("/", addProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = {
  productRouter,
};
