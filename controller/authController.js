const transporter = require("../utility/sendEmail");
const userModel = require("../schema/users");
const joi = require("joi");

//Register controller
const register = async (req, res, next) => {
  const { fullName, email, password, role } = req.body;

  try {
    //Validation
    const schema = joi.string().valid("admin", "customer").required().messages({
      "string.invalid": 'Role can only be "admin" or "customer"',
    });
    const { error } = schema.validate(role);

    if (error) {
      res.status(422).send({
        message: error.message,
      });
      return;
    }

    const checkMail = await userModel.find({ email });

    if (checkMail) {
      res.status(400).send({
        message: "Email address already used",
      });
      return;
    }

    // Save to Database
    const user = await userModel.create({
      fullName,
      email,
      password,
      role,
    });

    res.status(201).send({
      message: "Registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }

  // Send mail
  // transporter.sendMail({
  //   from: process.env.USER_EMAIL,
  //   to: email,
  //   subject: "Registered Successfully",
  //   html: `
  //   <h2>Registered Successfully</h2>
  //   <p>Dear ${fullName}, your account has been created successfully</p>
  //   `,
  // });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  res.send("Logged in Successfully");
};

module.exports = {
  register,
  login,
};
