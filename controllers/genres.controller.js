const { Genre, validate } = require("../models/genre.model");

exports.get = async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
};

exports.create = async (req, res) => {
  const { name } = req.body;
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let genre = await Genre.findOne({ name });
  if (genre) return res.status(400).send("This genre already exists.");

  genre = new Genre({ name });
  genre = await genre.save();

  res.send(genre);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(id, { name }, { new: true });

  if (!genre) return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
};

exports.delete = async (req, res) => {
  res.status(401).send("Unauthorized.");
};
