const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  addProduct,
  deleteProduct,
} = require("../controller/productController");

router.get("/", getAllProducts);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
