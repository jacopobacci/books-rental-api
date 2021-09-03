const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

exports.login = async (req, res) => {
  const { error } = validate(req.body);
  const { email, password } = req.body;
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");
  const token = user.generateAuthToken();
  res.send({ token });
};

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(250).required().email(),
    password: new passwordComplexity(),
  });
  return schema.validate(req);
}
