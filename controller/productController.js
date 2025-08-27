const productModel = require("../schema/products");
const joi = require("joi");

//Get all products controller
const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find();
    res.send(products);
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

const addProduct = (req, res, next) => {
  res.send("E-commerce API APP - Add");
};

const deleteProduct = (req, res, next) => {
  const id = req.params.id;
  res.send("E-commerce API APP - Delete " + id);
};

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct,
};
