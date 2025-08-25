const express = require("express");
const app = express();
const { authRouter } = require("./router/authRouter");
const { productRouter } = require("./router/productRouter");
app.use(express.json());

app.use("/auth", authRouter);
app.use("/products", productRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
