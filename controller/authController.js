const transporter = require("../utility/sendEmail");
const userModel = require("../schema/users");
const joi = require("joi");
const bcrypt = require("bcrypt");

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

    const checkMail = await userModel.findOne({ email });
    console.log(checkMail);
    if (checkMail) {
      res.status(400).send({
        message: "Email address already used",
      });
      return;
    }

    // Save to Database
    const hashedPassword = bcrypt.hashSync(password, 10);
    await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).send({
      message: "Registered successfully",
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

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //Check if account exists and if password is correct
    const checkAccount = await userModel.findOne({ email });

    if (!checkAccount) {
      res.status(404).send({
        message: "Account does not exist, please check email or create account",
      });
      return;
    } else if (!bcrypt.compareSync(password, checkAccount.password)) {
      res.status(400).send({
        message: "Invalid Credentials",
      });
      return;
    } else {
      res.status(200).send({
        message: "Logged in Successfully",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

module.exports = {
  register,
  login,
};
