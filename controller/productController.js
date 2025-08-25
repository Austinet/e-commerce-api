const getAllProducts = (req, res, next) => {
  res.send("E-commerce API APP");
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
