const productModel = require("../schema/products");
const userModel = require("../schema/users");
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

//Add products controller
const addProduct = async (req, res, next) => {
  const {
    productName,
    description,
    cost,
    productImages,
    stockStatus,
    ownerId,
  } = req.body;
  try {
    //Validation
    const schema = joi
      .string()
      .valid("in-stock", "low-stock", "out-of-stock")
      .required()
      .messages({
        "string.invalid": "",
      });
    const { error } = schema.validate(stockStatus);

    if (error) {
      res.status(422).send({
        message: error.message,
      });
      return;
    }

    // Check if the user is an Admin
    const user = await userModel.findById(ownerId);
    if (user.role !== "admin") {
      res.status(400).send({
        message: "Products can only be added by an admin",
      });
      return;
    }

    // Save to Database
    const newProduct = await productModel.create({
      productName,
      description,
      cost,
      productImages,
      stockStatus,
      ownerId,
    });

    res.status(201).send({
      message: `${productName} Added Successfully`,
      newProduct,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  const ownerId = req.body.ownerId;

  try {
    // Check if product exists and if the user is the owner and Admin
    const user = await userModel.findById(ownerId);
    const product = await productModel.findById(id);

    if (!product) {
      res.status(404).send({
        message: "Product not found",
      });
      return;
    } else if (user?.role !== "admin" || product.ownerId !== ownerId) {
      res.status(400).send({
        message:
          "Products can only be deleted by an admin and the owner of the product",
      });
      return;
    } else {
      //Delete product from database
      await productModel.findByIdAndDelete(id);
      res.status(201).send({
        message: `${product.productName} Deleted Successfully`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct,
};
