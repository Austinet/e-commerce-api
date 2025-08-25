const register = (req, res, next) => {
  res.send("Registered Successfully");
};

const login = (req, res, next) => {
  res.send("Logged in Successfully");
};

module.exports = {
  register,
  login,
};
