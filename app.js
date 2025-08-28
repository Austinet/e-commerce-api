const express = require("express");
const app = express();
const authRouter = require("./router/authRouter");
const productRouter = require("./router/productRouter");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1/e-commerce")
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log(
      "An error occurred while trying to connect to the database :: ",
      err
    );
  });
app.use(express.json());

app.use("/auth", authRouter);
app.use("/products", productRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
