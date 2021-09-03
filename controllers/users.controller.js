const { User, validate } = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.me = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};

exports.register = async (req, res) => {
  const { error } = validate(req.body);
  const { name, email, password } = req.body;
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({ name, email, password });
  user.password = await bcrypt.hash(password, 10);

  await user.save();

  const { _id } = user;
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({ _id, name, email });
};
