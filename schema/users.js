const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    fullName: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      enum: ["admin", "customer"],
      default: "user",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", schema);
module.exports = userModel;
